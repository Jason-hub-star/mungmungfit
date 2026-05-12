# Instagram Publishing Cycle — 마누스 발행 사이클의 Claude 짝

> **역할**: 마누스가 발행을 담당하는 동안 Claude는 **시드 생성 + 발행 결과 점검**을 담당.
> **모델**: `sonnet` (콘텐츠 창작 + 룰 적용 + 폴더 점검; 인사이트 심층 분석은 `content-metrics-weekly.prompt.md` 가 별도 담당)
> **워크플로우 짝**: 마누스 스킬 `mungmungfit-instagram-publisher` 와 1:1 정합

---

## 0. 트리거 (3개 cron, 동일 prompt)

| Cron | KST | 분기 작업 |
|------|-----|----------|
| `0 18 * * 2` | 매주 화요일 18:00 | **수요일 시드 자동 생성** (다음날 20시 발행 26시간 전) |
| `0 18 * * 6` | 매주 토요일 18:00 | **토요일 훈련일지 메모 요청 알림** (오늘 21시 발행 3시간 전) |
| `0 9 * * 4,0` | 매주 목요일·일요일 09:00 | **발행 결과 점검** (전날 발행 + 24h 인사이트 수집 확인) |

수동 트리거: `claude --automation .claude/automations/instagram-publishing-cycle.prompt.md`
실행 시 `WEEKDAY=$(date +%u)` 와 `HOUR=$(date +%H)` 로 분기 자동 판단.

---

## Step 0 — 환경 점검 (모든 분기 전 필수 선행)

자동화가 막힐 때마다 반복되는 4가지를 **실행 시작 직후** 한 번에 점검.

### 0-1. 환경변수 로드
```bash
# 정본: mungmungfit/.env.local (vibehub-media와 동일 값 사용)
set -a
[ -f .env.local ] && source .env.local
set +a

# 필수 키 7종 확인
REQUIRED=(MUNGMUNG_BOT_TOKEN MUNGMUNG_CHAT_ID MUNGMUNG_DRIVE_REMOTE MUNGMUNG_DRIVE_FOLDER SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY NEXT_PUBLIC_SITE_URL)
MISSING=()
for k in "${REQUIRED[@]}"; do
  [ -z "${!k}" ] && MISSING+=("$k")
done
```

### 0-2. 누락 키 발견 시 → 즉시 중단 + 안내
누락된 키 1개라도 있으면 **분기 작업 진행 금지**. 사용자에게 출력:

```
⛔ 자동화 중단 — 필수 환경변수 누락
누락: {MISSING[@]}

해결 방법:
1. /Users/family/jason/mungmungfit/.env.local 열기
2. /Users/family/jason/mungmungfit/.env.example 와 비교
3. vibehub-media/.env.local 에서 같은 키 복사
4. 자동화 재실행

상세: docs/automation-runbook.md § "환경변수 누락"
```

### 0-3. rclone 가용성 점검
```bash
if ! command -v rclone >/dev/null 2>&1; then
  echo "⛔ rclone 미설치. 'brew install rclone' 후 'rclone config' 로 ${MUNGMUNG_DRIVE_REMOTE}: remote 등록 필요"
  exit 1
fi

# remote 존재 여부
if ! rclone listremotes | grep -q "^${MUNGMUNG_DRIVE_REMOTE}:$"; then
  echo "⛔ rclone remote '${MUNGMUNG_DRIVE_REMOTE}:' 미설정. 'rclone config' 실행 필요"
  exit 1
fi
```

### 0-4. 샌드박스 제약 감지 (Claude 측 실행 환경)
자동화가 Claude Code 샌드박스에서 돌면 rclone 실행 권한이 없을 수 있음.
이 경우 **명령 실행을 시도하지 말고**, 사용자가 직접 실행할 명령을 출력 + 텔레그램 알림.

```bash
# 테스트: 임시 파일 1바이트 업로드 시도
echo "test" > /tmp/_rclone-probe-$$
if ! rclone copyto /tmp/_rclone-probe-$$ "${MUNGMUNG_DRIVE_REMOTE}:${MUNGMUNG_DRIVE_FOLDER}/.probe" 2>/dev/null; then
  SANDBOX_MODE=true
  echo "⚠️ 샌드박스 모드 감지 — 명령은 사용자 손동작용으로만 출력"
else
  SANDBOX_MODE=false
  rclone delete "${MUNGMUNG_DRIVE_REMOTE}:${MUNGMUNG_DRIVE_FOLDER}/.probe" 2>/dev/null
fi
rm -f /tmp/_rclone-probe-$$
```

→ `SANDBOX_MODE=true` 이면 모든 후속 단계에서 명령 실행 대신 **명령 텍스트를 텔레그램으로 전송** + 로컬 콘솔 출력.

---

## 1. 분기 A — 화요일 18:00 / 수요일 시드 자동 생성

### 입력
- Google Drive `멍멍피트/3-발행완료/` 의 가장 최근 수요일 시드 → 시리즈 진행 상태 파악
- `docs/learning-references.md` → 다음 편 입력 자료
- `docs/claude-content-handoff.md` § 톤 가이드·금지어
- 시리즈 캘린더:

| 회차 | 컨셉 |
|------|------|
| #1 | 척추기립근 (Erector Spinae) |
| #2 | 복근 (Rectus Abdominis) |
| #3 | 둔근/후지 (Gluteus) |
| #4 | 어깨/견갑 (Shoulder) |
| #5 | 발바닥 고유감각 (Proprioception) |

격주 사이 수요일은 도구 매트릭스 시리즈 (페덕 X, "스텝업 박스" 사용).

### 작업

#### Step A-1: 다음 회차 결정
```bash
# 가장 최근 수요일 발행 시드 확인
rclone lsf "gdrive:멍멍피트/3-발행완료/" | grep "wednesday\|muscle-series" | sort -r | head -3
```
→ 마지막 발행이 #1 척추기립근이면 다음은 **#2 복근**.

#### Step A-2: 시드 .md 생성
`docs/samples/wednesday-instagram-carousel-sample.md` 를 **그대로 템플릿**으로 사용. 
**변경할 곳만**:
- 한국어 근육명 + 영문명
- 카드 2 (어디에 있나) 일러스트 영역 — 해당 근육 위치
- 카드 3 (이 근육이 하는 일) 3가지 — 본 근육 역할
- 카드 4 (사람으로 치면) — 인간 비유
- 카드 5 (다음 편 예고) — 다음 회차 근육
- 캡션 본문 전체
- 해시태그 (앞 5개 코어 고정 + 뒤 5개 회차별 변경)
- 발행 일정 (`scheduled_at`)

#### Step A-3: 룰 검사 (자동 차단)
다음 표현 발견 시 시드 생성 중단 + 텔레그램 알림:
- "운동" + ("추천"·"하세요"·"시키세요"·"세트"·"회씩")
- "예방"·"재활"·"치료"·"진단" (의료 표현)
- "페덕"·"패덕"
- "메이" 단독 (수업 참여 언급은 OK)
- "시저밀란"·"도미넌스"
- "쿠팡"·"파트너스"

#### Step A-4: 구글 드라이브 업로드
```bash
SEED_LOCAL=/tmp/wednesday-muscle-series-${N}-$(date +%Y-%m-%d).md
SEED_REMOTE="${MUNGMUNG_DRIVE_REMOTE}:${MUNGMUNG_DRIVE_FOLDER}/1-발행대기/$(date -v+1d +%Y-%m-%d)-wednesday-muscle-series-${N}.md"

if [ "$SANDBOX_MODE" = "true" ]; then
  # 사용자 손동작 안내
  cat <<EOF
⚠️ 샌드박스 — 다음 명령을 터미널에서 직접 실행해주세요:

  rclone copyto "$SEED_LOCAL" "$SEED_REMOTE"

시드 파일 위치: $SEED_LOCAL
EOF
  # 텔레그램으로도 동일 안내 (Step A-5에 포함)
else
  rclone copyto "$SEED_LOCAL" "$SEED_REMOTE"
fi
```

#### Step A-5: 텔레그램 검토 알림
환경변수 `MUNGMUNG_BOT_TOKEN` + `MUNGMUNG_CHAT_ID` 사용 (Step 0에서 로드됨).

```bash
TG_MSG="📝 수요일 시드 자동 생성 — 시리즈 #${N} [근육 한국명] (영문명)

내일 20:00 KST 마누스 발행 예정.
검토·수정은 드라이브에서:
멍멍피트/1-발행대기/$(date -v+1d +%Y-%m-%d)-wednesday-muscle-series-${N}.md

학습 슬롯 3개 비워뒀으니 본인 표현으로 다듬어주세요."

# 샌드박스 모드면 업로드 명령도 동봉
if [ "$SANDBOX_MODE" = "true" ]; then
  TG_MSG="${TG_MSG}

⚠️ 샌드박스에서 자동 업로드 실패. 다음 명령 실행 필요:
rclone copyto \"$SEED_LOCAL\" \"$SEED_REMOTE\""
fi

curl -s -X POST "https://api.telegram.org/bot${MUNGMUNG_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${MUNGMUNG_CHAT_ID}" \
  --data-urlencode "text=${TG_MSG}" > /dev/null
```

토큰 누락 시 (Step 0 점검 통과 안 됐을 때) → 콘솔에만 출력 + 자동화 중단.

---

## 2. 분기 B — 토요일 18:00 / 훈련일지 메모 요청

### 작업

#### Step B-1: 오늘 수업 여부 확인
- 사용자 응답 기다리지 않고 **알림만** 발송. 사용자가 사진 송신 = "오늘 수업 있음" 신호.

#### Step B-2: 텔레그램 메모 템플릿 발송
chat_id `8796384805`:
```
🐾 토요일 훈련일지 발행 시간 (21:00 KST 마감)

오늘 수업 사진 10장 + 첫 사진 캡션에 6슬롯 메모 보내주세요:

🐕 [견종·나이·체중]
👋 호소: [보호자가 호소한 것]
👀 관찰: [근육·자세 관찰]
🔧 도구: [사용 도구 — "페덕" X, "스텝업 박스" O]
💪 한 일: [구체 시퀀스는 내부 메모만, 캡션엔 "자세 안정 평가" 같은 추상 표현]
📒 가이드: [보호자에게 전달한 일과 — 캡션엔 미공개]

수업 없으면 무시하셔도 됩니다 (자동 skip).
```

#### Step B-3: 봇 메모 수신 후 (별도 트리거 — 봇이 처리)
- 봇이 사진 + 메모 받으면 6슬롯 파싱 → `training_sessions` INSERT
- Claude가 봇 webhook 받으면:
  - `docs/samples/saturday-training-log-sample.md` 템플릿 + 6슬롯으로 시드 생성
  - 사진 10장 + .md → `1-발행대기/2026-MM-DD-saturday-training-log/` 폴더에 묶음 업로드
  - 텔레그램 검토 알림

---

## 3. 분기 C — 목요일·일요일 09:00 / 발행 결과 점검

### 입력
- Google Drive `3-발행완료/` (어제 발행)
- Google Drive `4-발행실패/` (실패 시)
- Google Drive `5-인사이트/` (24h 후 수집)

### 작업

#### Step C-1: 발행 완료 확인
```bash
# 어제 날짜 (전날 = 수 또는 토)
YESTERDAY=$(date -v-1d +%Y-%m-%d)
rclone lsf "gdrive:멍멍피트/3-발행완료/" | grep "$YESTERDAY"
```
→ 발견되면 정상, 없으면 **누락 알림**.

#### Step C-2: 실패 케이스 점검
```bash
rclone lsf "gdrive:멍멍피트/4-발행실패/" --files-only | head -10
```
→ 발견되면:
- `_error.txt` 다운로드 → 에러 분석
- 룰 위반 (운동 추천·페덕 등)이면 시드 수정 후 `1-발행대기/`로 재투입
- 시스템 에러(API·토큰)면 텔레그램 긴급 알림

#### Step C-3: 24h 인사이트 수집 확인
```bash
# 그저께 발행분의 인사이트 (24h 후) 수집 여부
DAY_BEFORE_YESTERDAY=$(date -v-2d +%Y-%m-%d)
rclone lsf "gdrive:멍멍피트/5-인사이트/" | grep "$DAY_BEFORE_YESTERDAY"
```
→ 누락이면 마누스에게 인사이트 재요청 텔레그램.

#### Step C-4: 텔레그램 보고
```
📊 발행 사이클 점검 ({요일} 09:00)

✅ 어제 발행 완료: [제목]
📈 그저께 인사이트:
  - 도달: N명
  - 좋아요: M개
  - 저장: K개

⚠️ 실패 케이스: [있으면 표기]

다음 발행: [요일] {시간} — [예정 콘텐츠]
```

---

## 4. 출력

### 분기 A (화)
- `gdrive:멍멍피트/1-발행대기/{date}-wednesday-{slug}.md` (생성)
- 텔레그램 검토 알림 1건

### 분기 B (토)
- 텔레그램 메모 요청 알림 1건
- (봇 webhook 후) `gdrive:멍멍피트/1-발행대기/{date}-saturday-training-log/` 폴더 (생성)

### 분기 C (목·일)
- 텔레그램 발행 사이클 보고 1건
- (실패 시) `1-발행대기/`로 시드 재투입

---

## 5. 룰

1. **시드 생성 시 톤 룰 검사 필수** — 룰 위반 발견 시 발행 중단 + 사용자 알림
2. **드라이브 업로드 후 마누스 발행 시각보다 최소 2시간 이상 여유** 확보 (마누스 풀링 + 사용자 검토 + 마누스 이미지 생성 + 사용자 승인 시간)
3. **0-시크릿/ 폴더 절대 건드리지 않음** (마누스 전용)
4. **시리즈 진행 상태는 `3-발행완료/` 폴더가 정본** (DB 동기화 안 됐을 수 있음)
5. **모델은 `sonnet` 고정** — 인사이트 깊이 분석은 `content-metrics-weekly.prompt.md`(opus) 가 담당
6. **사용자 학습 슬롯이 들어갈 자리는 비워두지 말고 1차 초안 작성** — 사용자가 검토하면서 자기 표현으로 다듬도록 유도
7. **마누스가 못 하는 일만 한다** — 발행 그 자체는 절대 직접 하지 않음

---

## 6. 마누스 워크플로우와의 정합 (1:1 매핑)

| 마누스 단계 (mungmungfit-instagram-publisher) | Claude 자동화 짝 |
|---|---|
| Step 1: 시드 .md 파싱 | **분기 A·B**: 시드 .md 자동 생성·업로드 |
| Step 2: Nano Banana 이미지 생성 | (Claude 손 X) |
| Step 3: 사용자 미리보기 + 승인 | (사용자가 직접) |
| Step 4: Supabase Storage 업로드 | (Claude 손 X) |
| Step 5: Instagram MCP 발행 | (Claude 손 X) |
| (사후) | **분기 C**: 발행 결과 점검 + 인사이트 추적 |
| (사후) | **`content-metrics-weekly`** (일 21시): 주간 인사이트 분석 |

→ **마누스 = 발행 실행자, Claude = 입력 생성자 + 결과 감독자**. 둘이 같은 Drive 폴더를 통신 채널로 사용.

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-12
**의존**: `mungmungfit-instagram-publisher` (마누스 스킬), Google Drive `멍멍피트/` 폴더 RW

---

## 📘 막혔을 때 참조

- 모든 실패·요청 메시지에는 다음 1줄 자동 첨부:
  ```
  💡 막혔을 때 → docs/automation-runbook.md 참고
  ```
- 환경변수 정본: `.env.example`
- 룰 정본: `docs/claude-content-handoff.md`
- 마누스 워크플로우: `docs/MANUS-DRIVE-INSTRUCTIONS.md`
