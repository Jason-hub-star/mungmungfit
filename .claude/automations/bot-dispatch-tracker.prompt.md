# Bot Dispatch Tracker — 매일 20:00 KST

> 매일 20시에 멍멍피트 봇·Supabase 큐·Manus 발행 상태를 추적해 BOT-COMMAND-MATRIX.md를 갱신한다.
> 모델: `sonnet`

---

## 트리거

- Cron: `0 20 * * *` (Asia/Seoul)
- 또는 텔레그램 `/nightly bot` 수동 트리거

## 입력

- Supabase `qufjlveukaoiokhpkhwj` 큐 테이블 (`instagram_queue`, `threads_queue`, `content_calendar`)
- `docs/status/BOT-COMMAND-MATRIX.md` — 현재 명령어 매트릭스
- `docs/status/INSTAGRAM-THREAD-QUEUE.md` — 현재 큐 상태

## 작업

### 1. 큐 카운트 집계 (SQL)

```sql
-- 오늘 발행된 항목
SELECT COUNT(*) FROM instagram_queue
WHERE status = 'published' AND published_at >= CURRENT_DATE;

-- 대기 항목
SELECT COUNT(*), status FROM instagram_queue GROUP BY status;

-- 이번 주 발행 (월~일)
SELECT COUNT(*) FROM instagram_queue
WHERE published_at >= date_trunc('week', now())
  AND status IN ('published', 'analyzed');

-- 실패 항목
SELECT id, error, retry_count FROM instagram_queue
WHERE status = 'failed' AND retry_count < 3;
```

### 2. INSTAGRAM-THREAD-QUEUE.md 갱신

- "이번 주 발행 일정" 표 갱신 (status 컬럼)
- "발행 통계" 누적 카운트 갱신
- "실패 항목" 섹션 갱신 (있다면)

### 3. BOT-COMMAND-MATRIX.md 갱신

명령어 실행 카운트 (참고: 봇 명령어 트리거 시 로그 INSERT 필요):
- "주간 실행 카운트" 표 갱신
- 이번 주 vs 지난 주 비교

### 4. 인사이트 수집 점검

```sql
SELECT iq.id, iq.published_at,
       (now() - iq.published_at) as elapsed
FROM instagram_queue iq
LEFT JOIN insights_log il ON il.queue_id = iq.id
WHERE iq.status = 'published'
  AND il.id IS NULL
  AND iq.published_at < now() - interval '24 hours';
```

위 쿼리 결과가 있으면 → 인사이트 미수집 게시물. 텔레그램 알림:
"📊 인사이트 미수집 N건. Manus 점검 필요"

### 5. 텔레그램 보고

chat_id `8796384805`로:
```
🤖 Nightly Bot Report (YYYY-MM-DD)

큐 상태:
  - Pending: N
  - Published 오늘: M
  - Failed: K
  - 인사이트 미수집: L

이번 주 누적: P편 발행 (목표 7편)
```

## 실패 처리

- Supabase 연결 실패 시 즉시 텔레그램 알림
- lock 파일: `docs/status/.bot-tracker.lock`

## 출력

- `docs/status/BOT-COMMAND-MATRIX.md` (수정)
- `docs/status/INSTAGRAM-THREAD-QUEUE.md` (수정)
- 텔레그램 보고서

## 룰

- Supabase는 read-only로만 접근 (이 자동화는 쿼리 집계만)
- 큐 상태 직접 변경 금지 (Manus의 책임)
- 발견된 실패 항목은 알림만, 자동 재시도하지 않음
