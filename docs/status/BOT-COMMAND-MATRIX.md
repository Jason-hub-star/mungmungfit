# 멍멍피트 봇 명령어 매트릭스

> 텔레그램 봇(@MUNGMUNG1_BOT) 명령어 ↔ 액션 매핑.
> 봇 소스: `vibehub-media/apps/mungmung-bot/`

Last Updated: 2026-05-11

---

## 📥 현재 작동 중인 트리거

| 트리거 | 액션 | 상태 | 비고 |
|--------|------|------|------|
| 사진 앨범 (1~10장) | Sharp 가공 + Gemini 캡션 + Supabase 업로드 + gallery.json 갱신 + Vercel 재빌드 + 당근 패키지 회신 | ✅ Live | 8초 batch window |
| 단일 사진 | 동일 (single batch로 처리) | ✅ Live | |
| 텍스트 메시지 | "사진을 앨범으로 전송하세요" + 채팅 ID 안내 | ✅ Live | chat_id 디버그용 |
| `/start` | (현재 동작 없음 — 일반 텍스트 응답) | 🔵 미구현 | |

---

## 🆕 추가 예정 명령어 (Priority 1)

| 명령어 | 액션 | 큐 INSERT | 응답 |
|--------|------|----------|------|
| `/블로그 [주제]` | 주제로 MDX 초안 생성 → `content/blog/drafts/` 저장 | — | "초안 작성 완료. /검수 [slug] 확인" |
| `/검수 [slug]` | drafts에서 글 핵심(제목·요약·H2) 발췌 | — | 발췌 + "OK면 /발행, 수정하려면 /수정 [slug] [내용]" |
| `/수정 [slug] [내용]` | 검수 코멘트 반영해서 다시 작성 | — | "수정 반영. /검수 [slug] 다시 확인" |
| `/발행 [slug]` | drafts → content/blog 이동 + 인스타·스레드 큐 INSERT + git push | `instagram_queue` + `threads_queue` | "발행 완료. Vercel 빌드 5분 후 라이브" |
| `/폐기 [slug]` | drafts 삭제 | — | "폐기 완료" |
| `/검수목록` | drafts 폴더의 검수 대기 글 리스트 | — | 슬러그 목록 + 작성일 |

---

## 🆕 추가 예정 명령어 (Priority 2)

| 명령어 | 액션 | 큐 INSERT | 응답 |
|--------|------|----------|------|
| `/유튜브 [채널]` | 채널 최신 영상 transcript 가져와 youtube_inspirations에 저장 | `youtube_inspirations` | "N개 수집 완료" |
| `/펫테크` | 신상 펫테크 제품 검색 + pet_tech_products INSERT | `pet_tech_products` | "N개 제품 발견. /검수 후 발행" |
| `/인사이트` | 지난주 인스타 인사이트 요약 보고 | — | 도달·좋아요 TOP3 + 패턴 |
| `/캘린더` | 이번 주 콘텐츠 캘린더 조회 | — | content_calendar 현황 |
| `/큐` | 인스타 큐 대기 항목 수 | — | "pending: N건, scheduled: M건" |

---

## 🆕 추가 예정 명령어 (Priority 3)

| 명령어 | 액션 | 비고 |
|--------|------|------|
| `/근육 [부위]` | 특정 근육 시리즈 블로그 글 생성 (코어/후지/전지/척추/발바닥) | 5개 부위 시리즈 |
| `/슬롯 [번호]` (사진 첨부 시) | 첨부된 사진을 placeholders.ts 해당 슬롯에 저장·반영 | photo-slots 자동 채움 |
| `/상태` | PROJECT-STATUS.md 1줄 요약 | |

---

## 🚦 명령어 ↔ Supabase 큐 흐름

```
[텔레그램 명령]
  ↓
[봇 핸들러 (apps/mungmung-bot/src/handlers/commands.ts)]
  ↓
[Claude API or 직접 처리]
  ↓
[Supabase INSERT (큐 테이블)]
  ↓
[Manus 발행 또는 git push]
  ↓
[텔레그램 회신]
```

---

## 📊 명령어 실행 카운트 (주간)

> Nightly 자동화로 자동 갱신.

| 명령어 | 이번 주 | 지난 주 | 누적 |
|--------|---------|---------|------|
| 사진 batch | 0 | 0 | 0 |
| `/블로그` | 0 | 0 | 0 |
| `/검수` | 0 | 0 | 0 |
| `/발행` | 0 | 0 | 0 |

---

## 룰

- 모든 명령어는 `config.chatId` 인증 통과 후에만 작동 (현재 chat_id `8796384805`)
- 큐 INSERT 후 텔레그램으로 알림 보내야 함
- 에러 발생 시 텔레그램으로 에러 메시지 전송 + status='failed' 마킹
