# 🚨 자동화 런북 — 막혔을 때 어디를 봐야 하나

> 자동화가 멈추거나 사용자에게 무언가 요청할 때 **이 문서 1장만 보면** 해결 경로가 나오게 정리.
> Last Updated: 2026-05-12

---

## 0. 자동화 한눈에 보기

| 자동화 | 트리거 | 정본 파일 |
|--------|--------|----------|
| **instagram-publishing-cycle** | 화 18·토 18·목 09·일 09 | `.claude/automations/instagram-publishing-cycle.prompt.md` |
| **bot-dispatch-tracker** | 매일 20:00 | `.claude/automations/bot-dispatch-tracker.prompt.md` |
| **blog-publish-nightly** | 매일 22:00 | `.claude/automations/blog-publish-nightly.prompt.md` |
| **content-metrics-weekly** | 매주 일 21:00 (opus) | `.claude/automations/content-metrics-weekly.prompt.md` |

수동 실행: `claude --automation .claude/automations/{name}.prompt.md`

---

## 1. 환경변수 누락 — "필수 환경변수 누락" 메시지

### 증상
```
⛔ 자동화 중단 — 필수 환경변수 누락
누락: MUNGMUNG_BOT_TOKEN, ...
```

### 해결 (3분)
1. **`.env.local` 열기** — `/Users/family/jason/mungmungfit/.env.local`
2. **`.env.example` 와 비교** — 누락된 키 찾기
3. **값 가져오는 곳**:
   - `MUNGMUNG_*` 시리즈 → `/Users/family/jason/vibehub-media/.env.local` 에서 복사
   - `SUPABASE_*` → 같은 곳
   - `MUNGMUNG_VERCEL_DEPLOY_HOOK` → Vercel 대시보드 > Settings > Git > Deploy Hooks
4. **자동화 재실행** — `claude --automation .claude/automations/{name}.prompt.md`

### 키 ↔ 어디 쓰는지

| 키 | 누가 쓰나 | 값 출처 |
|----|----------|--------|
| MUNGMUNG_BOT_TOKEN | 자동화 (텔레그램 알림) | BotFather `@MUNGMUNG1_BOT` |
| MUNGMUNG_CHAT_ID | 자동화 (알림 받는 사람) | 주인님 telegram chat (`8796384805`) |
| MUNGMUNG_DRIVE_REMOTE | 자동화 (rclone remote 이름) | `gdrive` (기본) |
| MUNGMUNG_DRIVE_FOLDER | 자동화 (Drive 작업 폴더) | `멍멍피트` |
| SUPABASE_URL | 자동화 보조 + 마누스 | Supabase 대시보드 |
| SUPABASE_SERVICE_ROLE_KEY | 자동화 보조 + 마누스 | Supabase 대시보드 > API |
| MUNGMUNG_VERCEL_DEPLOY_HOOK | 봇 (사이트 재빌드) | Vercel 대시보드 |

---

## 2. rclone 미설치/미설정 — Drive 업로드 실패

### 증상
```
⛔ rclone 미설치
또는
⛔ rclone remote 'gdrive:' 미설정
```

### 해결
```bash
# 설치
brew install rclone

# Google Drive remote 등록 (대화형, 한 번만)
rclone config
# → n (new remote)
# → name: gdrive
# → type: drive
# → 나머지는 enter (기본값)
# → OAuth 브라우저 인증

# 검증
rclone listremotes
# → gdrive: 가 나오면 OK

rclone lsd gdrive: --max-depth 1
# → 루트 폴더 목록 나오면 OK
```

---

## 3. 샌드박스 모드 — "샌드박스에서 자동 업로드 실패"

### 증상
자동화가 텔레그램으로 다음과 같은 메시지 보냄:
```
⚠️ 샌드박스에서 자동 업로드 실패. 다음 명령 실행 필요:
rclone copyto "/tmp/wednesday-muscle-series-2-2026-05-19.md" "gdrive:멍멍피트/1-발행대기/..."
```

### 원인
Claude Code가 샌드박스 모드(권한 제한)에서 돌아서 외부 명령(rclone) 실행 못 함.
마누스도 마찬가지로 자기 샌드박스에서 rclone 못 돌리니 사용자에게 보고함.

### 해결 (5초)
1. 텔레그램으로 받은 명령을 **그대로 복사**
2. 로컬 터미널에서 붙여넣기 + 실행
3. 끝

### 영구 해결 (선택)
자동화를 cron으로 등록 (사용자 권한으로 실행되어 샌드박스 우회):
- macOS: `crontab -e` 또는 launchd plist
- Linux: 시스템 cron
- GitHub Actions: workflow schedule

---

## 4. 텔레그램 알림 안 옴

### 증상
자동화가 돌긴 했는데 텔레그램에 메시지 안 옴.

### 점검 순서
```bash
# 1. 봇 토큰 유효성
curl -s "https://api.telegram.org/bot${MUNGMUNG_BOT_TOKEN}/getMe" | jq .ok
# → true 여야 함

# 2. chat_id 정확성
curl -s "https://api.telegram.org/bot${MUNGMUNG_BOT_TOKEN}/getUpdates" | jq '.result[].message.chat.id' | sort -u
# → 8796384805 가 보여야 함

# 3. 봇이 차단됐는지 확인 (텔레그램 앱에서 @MUNGMUNG1_BOT 직접 메시지 전송 → 응답 오는지)
```

### 흔한 원인
- 봇 토큰 회전 후 .env.local 미갱신
- chat_id 잘못 등록 (다른 사람 chat)
- 봇이 차단됨 (사용자가 텔레그램에서 봇 차단했을 때)

---

## 5. 마누스 발행 결과가 폴더에 안 보임

### 증상
- 분기 C (목·일 09시) 점검 시 `3-발행완료/` 에 어제 발행분 없음
- 또는 `4-발행실패/` 에 알 수 없는 파일

### 점검 순서
1. **마누스 발행 자체가 됐는지** — 인스타그램 앱에서 @mungmungfit 게시물 확인
2. **마누스가 폴더 이동을 안 했는지** — `2-처리중/` 에 파일 남아있으면 마누스 lock 해제 안 됨
3. **마누스 권한 문제** — Drive 폴더 공유 권한 (편집자) 확인
4. **`4-발행실패/_error.txt`** 읽기 — 룰 위반(운동 추천·페덕 등)이면 시드 수정 필요

### 마누스에게 직접 묻기
텔레그램 봇으로 메시지:
```
마누스, {date} 발행 상태 알려줘.
Drive 폴더에 처리 흔적이 없어.
```

---

## 6. 시드 자동 생성이 룰 위반

### 증상
```
⛔ 시드 생성 중단 — 룰 위반 감지
- "운동" + "추천" 패턴 발견 (line 47)
- "예방" 단어 발견 (line 89)
```

### 해결
1. `.claude/automations/instagram-publishing-cycle.prompt.md` § 1 Step A-3 룰 표 확인
2. 룰이 너무 엄격하면 prompt 수정 (예: "운동 추천" 패턴을 더 정교하게)
3. 또는 시드 텍스트 수동 수정 후 직접 Drive 업로드

### 금지어 목록 (정본)
- `docs/claude-content-handoff.md` § ⚕️ 의료 표현 금지 표
- `docs/claude-content-handoff.md` § 10-B 학습 슬롯 룰
- `.claude/automations/instagram-publishing-cycle.prompt.md` § 1 Step A-3

---

## 7. cron 등록은 어떻게?

### macOS launchd (가장 안정)
```xml
<!-- ~/Library/LaunchAgents/com.mungmungfit.instagram-cycle-tuesday.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.mungmungfit.instagram-cycle-tuesday</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>-lc</string>
    <string>cd /Users/family/jason/mungmungfit && claude --automation .claude/automations/instagram-publishing-cycle.prompt.md</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Weekday</key><integer>2</integer>
    <key>Hour</key><integer>18</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>/tmp/mungmungfit-cycle-tue.log</string>
  <key>StandardErrorPath</key><string>/tmp/mungmungfit-cycle-tue.err</string>
</dict>
</plist>
```

같은 형식으로 4개 plist (화 18·토 18·목 09·일 09) 등록:
```bash
launchctl load ~/Library/LaunchAgents/com.mungmungfit.instagram-cycle-*.plist
```

---

## 8. 자동화 실행 로그는 어디에?

| 자동화 | 로그 위치 |
|--------|----------|
| 수동 실행 시 | Claude Code 콘솔 + 텔레그램 |
| launchd cron | `/tmp/mungmungfit-cycle-{day}.log` + `.err` |
| GitHub Actions | Actions 탭 |

로그 보존 정책: launchd 로그는 매주 새로 덮어쓰기. 영구 보존 원하면 `~/Library/Logs/mungmungfit/` 로 경로 변경.

---

## 9. 막혔을 때 결정 트리

```
자동화 실패
  │
  ├─ "환경변수 누락" 메시지? → § 1
  ├─ "rclone 미설치/미설정"? → § 2
  ├─ "샌드박스에서 실패"? → § 3
  ├─ 텔레그램 알림 안 옴? → § 4
  ├─ Drive 폴더 결과 이상? → § 5
  ├─ 룰 위반 메시지? → § 6
  └─ 그 외 → 텔레그램 chat_id 8796384805 로 에러 메시지 캡처해서 보내주세요
```

---

## 10. 변경 기록

| 날짜 | 변경 | 작성 |
|------|------|------|
| 2026-05-12 | 초안 — 마누스 첫 발행 후 자동화 막힌 2지점 (rclone·텔레그램) 대응 | Claude |

---

**관련 정본**
- `.claude/automations/instagram-publishing-cycle.prompt.md` — 자동화 본체
- `.env.example` — 환경변수 목록
- `docs/MANUS-DRIVE-INSTRUCTIONS.md` — 마누스 측 워크플로우
- `docs/claude-content-handoff.md` — 톤·룰 정본
