# 🤖 Manus → Instagram 자동 발행 핸드오프

> **대상 에이전트**: Manus AI (Meta-owned)
> **목적**: `instagram_queue` 테이블에 등록된 콘텐츠를 @mungmungfit 계정에 자동 발행하고 인사이트를 수집
> **연결 필요**: Supabase 프로젝트 `qufjlveukaoiokhpkhwj` (taillog) + Instagram Business 계정 (@mungmungfit)

---

## 1. 작업 흐름 (요약)

```
매 시간 또는 수요일 09:00 KST:
  1. instagram_queue SELECT WHERE status='pending' AND scheduled_at <= now()
  2. media_url 또는 Nano Banana Pro로 이미지 생성
  3. create_instagram (post / reel / carousel) 호출
  4. 성공 → status='published' + instagram_post_id 저장
  5. 24시간 후 → get_post_insights 호출 → insights_log INSERT + status='analyzed'
```

---

## 2. Supabase 연결 정보

| 항목 | 값 |
|------|-----|
| Project Ref | `qufjlveukaoiokhpkhwj` |
| URL | `https://qufjlveukaoiokhpkhwj.supabase.co` |
| 사용 키 | Service Role Key (별도 전달) |
| 주요 테이블 | `instagram_queue`, `insights_log` |

---

## 3. 큐에서 다음 작업 가져오기 (SQL)

```sql
-- 발행할 콘텐츠 1건 가져오기
SELECT id, content_type, media_urls, caption, hashtags, source, reference_url
FROM instagram_queue
WHERE status = 'pending'
  AND (scheduled_at IS NULL OR scheduled_at <= now())
ORDER BY scheduled_at ASC NULLS FIRST, created_at ASC
LIMIT 1;
```

발행 직전에 상태 변경:
```sql
UPDATE instagram_queue
SET status = 'published',
    instagram_post_id = $POST_ID,
    published_at = now()
WHERE id = $QUEUE_ID;
```

---

## 4. Instagram MCP 호출 패턴

### 4-1. 단일 게시물 (post)
```javascript
create_instagram({
  type: 'post',
  media: media_urls[0],
  caption: caption  // 본문 + 해시태그 합쳐서
});
```

### 4-2. 캐러셀 (carousel) — 권장
```javascript
create_instagram({
  type: 'carousel',
  media: media_urls,  // 2~10장
  caption: caption
});
```

### 4-3. 릴스 (reel)
```javascript
create_instagram({
  type: 'reel',
  media: media_urls[0],  // mp4 URL
  caption: caption
});
```

### 4-4. 스토리 (story)
```javascript
create_instagram({
  type: 'story',
  media: media_urls[0]
});
```

---

## 5. 이미지 생성 (Nano Banana Pro)

캡션에 `[GENERATE_IMAGE]` 플래그가 있거나 `media_urls`가 비어있으면 Nano Banana로 생성:

### 카드뉴스 (1080x1080 정사각형 5장)
```
Generate 5 square infographic cards (1080x1080) for Instagram carousel.
Topic: {caption의 첫 줄}
Style: Clean minimalist Korean infographic.
Brand: 멍멍피트 (Mungmungfit) - dog fitness home training.
Colors: Primary #1f3a2e (deep green), accent #ffb84d (golden), background #fbfaf5 (cream).
Each card layout:
  - Top: Korean title (32pt, bold)
  - Middle: 1 sentence explanation + simple line illustration of dog
  - Bottom: Card number "01/05"
Last (5th) card: CTA "전체 가이드 → mungmungfit.kr/blog"
Korean text must be perfectly rendered (no garbled hangul).
```

### 인포그래픽 (1080x1350)
```
Korean infographic for Instagram (1080x1350).
Topic: {topic}
Style: Modern editorial style, mungmungfit brand colors.
Include: 강아지 일러스트, 한국어 본문, 멍멍피트 로고 (bottom right).
```

### 사진형 (1080x1080)
```
Hyperrealistic photo of a {dog breed} doing {fitness exercise}.
Setting: clean Korean apartment / park.
Trainer's hand visible holding leash / treats.
Soft natural lighting, Instagram aesthetic.
Add Korean subtitle bar at bottom: {korean text}
```

---

## 6. 인사이트 수집 (게시 24시간 후)

```javascript
const insights = get_post_insights(instagram_post_id);
// {views, reach, likes, comments, shares, saves, ...}
```

Supabase에 저장:
```sql
INSERT INTO insights_log (queue_id, platform, views, reach, likes, comments, shares, saves, raw)
VALUES ($QUEUE_ID, 'instagram', $views, $reach, $likes, $comments, $shares, $saves, $raw_json);

UPDATE instagram_queue
SET status = 'analyzed'
WHERE id = $QUEUE_ID;
```

---

## 7. 톤 가이드

### ✅ 사용할 표현
- "독피트니스", "방문훈련", "CSCC 트레이너", "코어", "균형", "자신감"
- "강아지 몸 만들기", "보호자 핸들링", "헬퍼견 메이와 함께"
- "포메라니안 어디 어디", "비숑의 OO" (견종 + 구체적 상황)

### ⛔ 피할 표현
- "혼낸다", "복종", "엄격한 훈련"
- "교정한다" (대신 "균형을 잡는다")
- 메이 단독 콘텐츠는 보류 (사회화 수업 참여 멘션만 OK)

---

## 8. 해시태그 풀 (자동 추출용)

### 항상 포함 (코어 5개)
`#독피트니스 #강아지방문훈련 #멍멍피트 #CSCC #김주영트레이너`

### 콘텐츠 종류별
| 콘텐츠 | 해시태그 |
|--------|----------|
| 비포애프터 | `#수업비포애프터 #강아지문제행동 #변화` |
| 코어운동 | `#강아지운동 #코어강화 #밸런스볼` |
| 근육 시리즈 | `#강아지근육 #반려견헬스 #독필라테스` |
| 노령견 | `#노령견재활 #시니어독 #관절건강` |
| 비만견 | `#비만견다이어트 #반려견다이어트 #저강도운동` |
| 펫테크 | `#펫테크 #반려동물용품 #리뷰` |
| 유튜브가공 | `#해외트레이너 #ZakGeorge #도그트레이닝` |
| 산책 | `#산책교육 #줄당김교정 #리드줄핸들링` |

### 지역 (1~2개)
`#하남강아지훈련 #서울방문훈련 #경기강아지훈련`

---

## 9. 출처 표기 규칙 (유튜브 가공시)

`source = 'youtube-adaptation'`이고 `reference_url`이 있으면 캡션 끝에 자동 추가:

```
💡 영감 출처: {channel_name}
원본 영상: 댓글에 링크 확인 👇
```

첫 댓글에 원본 URL 자동 게시 (`create_instagram_comment`).

---

## 10. 발행 스케줄

| 요일 | 시간 | 콘텐츠 유형 |
|------|------|-------------|
| 월 | 19:00 | 블로그 글 요약 캐러셀 |
| 화 | 19:00 | 견종별 팁 (자동 생성) |
| **수** | **20:00** | **🔥 메인: 블로그+근육시리즈+인사이트 3채널 동시** |
| 목 | 19:00 | FAQ 카드뉴스 |
| 금 | 19:00 | 펫테크 리뷰 또는 유튜브 가공 |
| 토 | 21:00 | 수업 비포애프터 (사진 있을 때만) |
| 일 | 19:00 | 주간 회고 |

수요일은 **메인 발행일**. 가장 공들인 콘텐츠.

---

## 11. 에러 처리

게시 실패 시:
```sql
UPDATE instagram_queue
SET status = 'failed',
    error = $error_message,
    retry_count = retry_count + 1
WHERE id = $QUEUE_ID;
```

`retry_count < 3`이면 다음 사이클에서 재시도, 3 이상이면 텔레그램으로 알림.

---

## 12. 텔레그램 알림 (선택)

발행 완료 후 텔레그램 채팅 ID `8796384805`로 알림:
```
✅ 인스타 발행 완료
{caption 첫 줄}
{instagram_post_url}
```

---

## 13. 첫 시작 체크리스트

- [ ] Supabase 프로젝트 `qufjlveukaoiokhpkhwj`에 연결 확인
- [ ] @mungmungfit 인스타그램 비즈니스 계정 연결 확인
- [ ] 테스트 큐 1건으로 발행 → 인사이트 수집까지 end-to-end 검증
- [ ] 수요일 자동 발행 cron/스케줄 설정
- [ ] 실패 알림 텔레그램 봇 연결

---

**작성**: Claude (mungmungfit dev)
**최종수정**: 2026-05-11
**문의/디버그 채널**: 텔레그램 chat_id `8796384805`
