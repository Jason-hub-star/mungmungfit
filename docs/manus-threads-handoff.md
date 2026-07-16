# 🧵 Manus → Threads 자동 발행 핸드오프

> **대상 에이전트**: Manus AI
> **목적**: `threads_queue`에 등록된 콘텐츠를 **@vibehub1030** 스레드 계정으로 자동 발행
> **전략**: vibehub1030 기존 팔로워에게 자연스러운 스토리텔링으로 @mungmungfit + mungmungfit.kr 노출
> **API**: Threads Graph API (Meta)

---

## 1. 계정 정보

| 항목 | 값 |
|------|-----|
| 핸들 | `@vibehub1030` |
| User ID | `26406071412413302` |
| Access Token | `.env.local`의 `THREADS_ACCESS_TOKEN` |
| Token 만료 | `2026-05-25` (~60일 단위 재발급) |

---

## 2. 자연스러운 크로스 프로모션 톤

vibehub1030은 본인(주인님)의 라이프스타일 계정. **광고티 X, 스토리텔링 O**.

### ✅ 자연스러운 패턴
- "제가 강아지 훈련사로 일하면서 운영하는 블로그에 이번 주 새 글 올렸어요. {제목} → mungmungfit.kr/blog/{slug}"
- "헬퍼견 메이랑 같이 수업 다닌 후기. 보호자분이 이렇게 변했더라고요..."
- "독피트니스가 뭐냐고 자주 물어보셔서 정리한 글: {링크}"

### ⛔ 피할 패턴
- "🎉 신규 수업 오픈! 3회 187,000원!"
- 매 게시물에 #mungmungfit 도배
- 같은 카피 인스타와 1:1 복사

---

## 3. Supabase 큐에서 가져오기

```sql
SELECT id, text, media_url, link_url, source, blog_slug, scheduled_at
FROM threads_queue
WHERE status = 'pending'
  AND account_handle = 'vibehub1030'
  AND (scheduled_at IS NULL OR scheduled_at <= now())
ORDER BY scheduled_at ASC NULLS FIRST, created_at ASC
LIMIT 1;
```

---

## 4. Threads Graph API 호출

### 4-1. 텍스트 게시
```bash
curl -X POST \
  "https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads" \
  -d "media_type=TEXT" \
  -d "text=${text}" \
  -d "access_token=${THREADS_ACCESS_TOKEN}"
# → creation_id 반환

# 그 다음 publish
curl -X POST \
  "https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads_publish" \
  -d "creation_id=${creation_id}" \
  -d "access_token=${THREADS_ACCESS_TOKEN}"
```

### 4-2. 이미지 포함
```bash
curl -X POST \
  "https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads" \
  -d "media_type=IMAGE" \
  -d "image_url=${media_url}" \
  -d "text=${text}" \
  -d "access_token=${THREADS_ACCESS_TOKEN}"
```

### 4-3. 링크 포함 (자동 카드 미리보기)
링크는 그냥 `text` 본문에 `https://mungmungfit.kr/...` 형식으로 박으면 자동 카드 생성.

---

## 5. 게시 완료 후 업데이트

```sql
UPDATE threads_queue
SET status = 'published',
    threads_post_id = $POST_ID,
    published_at = now()
WHERE id = $QUEUE_ID;
```

---

## 6. 문자 길이 제약

Threads는 **500자 제한**. 인스타 캡션을 그대로 쓰면 안 됨.

### 자동 요약 룰 (캡션 → 스레드 변환)
1. 인스타 캡션 첫 2줄만 가져옴
2. 해시태그 1~2개로 축소
3. 끝에 mungmungfit.kr 링크
4. 메이/김주영 트레이너 멘션 자연스럽게

### 예시 변환

**인스타 (긴 캡션)**:
```
포메라니안 코어 강화 독피트니스 수업 ✨

비만이 시작된 4살 포메. 무릎 약해서 운동을 못 시키고 있다는 보호자 고민으로 시작했어요. 밸런스볼로 정적 균형부터 잡고, 카발레티로 보행 리듬을 정돈했습니다.

✓ 무릎 부담 없이 코어 자극
✓ 보호자가 집에서 반복할 5분 루틴 제공
✓ 다음주부터 변화 시작 예정

#독피트니스 #강아지방문훈련 ...
```

**스레드 (변환)**:
```
4살 포메가 비만 시작된 케이스. 무릎이 약해서 못 시키는 운동을 어떻게 풀어줄지가 핵심이었어요.

밸런스볼로 코어부터, 그다음 카발레티로 보행 리듬. 보호자분도 같이 5분 루틴 익히고 가셨습니다.

🔗 mungmungfit.kr/blog/pomeranian-core
```

→ 글자수 짧음, 자연스러운 일기 톤, 링크 1개.

---

## 7. 발행 스케줄

| 요일 | 시간 | 콘텐츠 |
|------|------|--------|
| **수요일** | **20:00** | **메인: 블로그 글 요약 + 링크** |
| 일요일 | 21:00 | 주간 회고 ("이번 주 만난 강아지들") |

→ vibehub1030은 **주 2회 멍멍피트 연결 콘텐츠**. 그 외는 기존 라이프스타일 콘텐츠 유지.

---

## 8. 첫 댓글 패턴 (선택)

긴 글이라면 첫 댓글에 부연 설명. Threads에 reply 기능 있음:
```bash
curl -X POST \
  "https://graph.threads.net/v1.0/${THREADS_USER_ID}/threads" \
  -d "media_type=TEXT" \
  -d "text=원본 영상은 여기: https://..." \
  -d "reply_to_id=${parent_post_id}" \
  -d "access_token=${THREADS_ACCESS_TOKEN}"
```

---

## 9. 토큰 갱신

`THREADS_ACCESS_TOKEN`은 **60일마다 만료**. 만료 7일 전 알림:

```bash
# 토큰 갱신
curl -X GET "https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${OLD_TOKEN}"
```

→ Manus가 매주 화요일 토큰 만료일 체크 후 7일 이내면 자동 갱신.

---

## 10. 첫 시작 체크리스트

- [ ] `.env.local`의 `THREADS_ACCESS_TOKEN`이 유효한지 테스트 (`GET /me`)
- [ ] `threads_queue`에 테스트 항목 1건 INSERT 후 end-to-end 게시 검증
- [ ] 텔레그램 알림 (chat_id `8796384805`)

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-11
