# 🤖 마누스 — Google Drive 발행 워크플로우 안내

> **대상**: Manus AI
> **목적**: Google Drive `멍멍피트/` 폴더 기반 인스타·스레드 자동 발행
> **이 문서**: 마누스가 처음 폴더에 진입했을 때 읽는 첫 안내서

---

## 📁 폴더 구조

```
멍멍피트/
├── 1-발행대기/    ← 새 콘텐츠 .md (이게 너의 입력)
├── 2-처리중/      ← 너가 잡으면 즉시 이리로 이동 (lock)
├── 3-발행완료/    ← 발행 성공 후 이동 + Instagram URL 메타 적재
├── 4-발행실패/    ← 실패 시 이동 + 에러 메시지 파일 추가
├── 5-인사이트/    ← 발행 24h 후 인사이트 수집 결과
└── 참고자료/      ← 핸드오프 5종 (영구 참조)
```

---

## 🔄 처리 절차 (각 발행 1건)

### Step 1 — 폴더 폴링
- **빈도**: 수요일 19:00 KST + 토요일 20:00 KST (또는 매시간)
- **타겟**: `1-발행대기/` 폴더의 `.md` 파일

### Step 2 — 파일 잡기 (lock)
- 발견 즉시 `2-처리중/` 으로 **이동** (다른 인스턴스 중복 처리 방지)
- 이동에 실패하면 다른 인스턴스가 잡은 것 → skip

### Step 3 — 콘텐츠 파싱
- `.md` 파일 읽기 → frontmatter(YAML) + 본문 분리
- 본문 안의 섹션 헤더(`## 1. 캐러셀 카드`, `## 2. 캡션` 등) 추출
- 같은 폴더에 함께 올라온 사진(`*.jpg/png`)이 있으면 캐러셀 미디어로 사용

### Step 4 — 이미지 처리
- 사진 첨부 없음 + 카드 디자인 프롬프트 있음 → **Nano Banana로 카드 생성**
- 생성한 이미지를 임시 호스팅 (Supabase Storage `mungmung-photos/manus-generated/{slug}-{n}.jpg`)
- 호스팅 URL 확보

### Step 5 — 인스타 발행
- Instagram MCP `create_instagram(type='carousel', media=URLs, caption=caption+hashtags)`
- 발행 성공 → `instagram_post_id` 확보

### Step 6 — 스레드 동시 발행 (vibehub1030)
- 같은 .md의 § 5 부분 (스레드 본문) 추출
- Threads Graph API HTTP 호출 (Python 스크립트)

### Step 7 — 파일 이동
- 성공: `2-처리중/{file}.md` → `3-발행완료/{date}-{slug}/`
  - 같은 폴더에 `_meta.json` 생성:
    ```json
    {
      "instagram_post_id": "...",
      "instagram_url": "...",
      "threads_post_id": "...",
      "published_at": "2026-05-20T20:00:00+09:00",
      "media_urls": [...]
    }
    ```
- 실패: `2-처리중/{file}.md` → `4-발행실패/`
  - 같은 폴더에 `_error.txt` 생성 (에러 메시지·스택)

### Step 8 — 텔레그램 알림
- `chat_id 8796384805` 으로 발행 완료 또는 실패 알림
- 형식:
  ```
  ✅ 인스타 발행 완료
  근육 도감 #1 척추기립근
  https://www.instagram.com/p/...
  ```

### Step 9 — 24시간 후 인사이트 수집 (별도 스케줄)
- `3-발행완료/` 의 각 항목에서 `_meta.json` 읽기
- `published_at` + 24h 지난 항목만 → `get_post_insights(instagram_post_id)`
- 결과를 `5-인사이트/{date}-{slug}.json` 으로 적재
- 모든 처리 완료된 항목엔 `_meta.json` 의 `insights_collected: true` 표시

---

## 📝 .md 파일 형식 (입력 표준)

```markdown
# 제목 (사람용)

> **컨셉**: ...
> **채널**: @mungmungfit 인스타 캐러셀
> **발행 시점**: 수요일 20:00 KST (← 이게 발행 시간 신호)

## 1. 캐러셀 카드 N장 — Nano Banana 생성 프롬프트

### 카드 1: ...
\`\`\`
[Nano Banana 프롬프트]
\`\`\`

### 카드 2: ...
\`\`\`
[프롬프트]
\`\`\`

## 2. 캡션 (인스타 본문)
\`\`\`
[캡션 본문]
\`\`\`

## 3. 해시태그
\`\`\`
#태그 #태그 ...
\`\`\`

## 5. threads_queue INSERT (스레드 동시 발행)
\`\`\`sql
[스레드 본문은 여기 'text' 필드 안에]
\`\`\`
```

→ 두 개의 시드 파일 (`wednesday-instagram-carousel-sample.md`·`saturday-training-log-sample.md`)이 표준 예시.

---

## 🚨 절대 룰 (참고자료 폴더 핸드오프와 일치)

1. **운동 추천 ❌** — 캡션·카드 안에 "이 운동을 시켜주세요" 같은 표현 발견 시 발행 중단 + `4-발행실패/`로 이동
2. **의료 표현 ❌** — "예방·재활·치료·진단" 단어 발견 시 발행 중단
3. **"페덕"·"패덕" ❌** — 단어 발견 시 발행 중단
4. **메이 단독 콘텐츠 ❌**
5. **시저밀란 인용 ❌**
6. **출처 누락된 외부 인용 ❌**

→ 이 룰 위반 발견 시 **자동 발행하지 말고** `4-발행실패/`로 옮기고 텔레그램 알림.

---

## 🔑 필요한 권한

- ✅ Google Drive: `멍멍피트/` 폴더 전체 RW
- ⏳ Instagram MCP: 비즈니스 계정 @mungmungfit access token
- ⏳ Threads Graph API: `THREADS_ACCESS_TOKEN` (60일 자동 갱신)
- ⏳ Supabase: `mungmung-photos` Storage 버킷 RW (이미지 호스팅용)
- ⏳ Telegram Bot: chat_id 8796384805 메시지 권한
- ⏳ Nano Banana Pro 호출 권한

---

## 📞 문의 / 디버그

- 실패 시 텔레그램 chat_id `8796384805` 알림 + `4-발행실패/` 폴더에 에러 파일
- 의문 사항은 `참고자료/manus-instagram-handoff.md` 와 본 문서 우선 참고
- 룰 충돌 시 본 문서 + claude-content-handoff.md 가 우선

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-12
