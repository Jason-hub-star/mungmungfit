# Content Metrics Weekly — 매주 일요일 21:00 KST

> 매주 일요일 21시에 한 주 콘텐츠 성과를 집계해 weekly 리포트와 PROJECT-STATUS.md 요약을 생성한다.
> 모델: `opus` (인사이트 분석·다음 주 방향 제안 필요)

---

## 트리거

- Cron: `0 21 * * 0` (Asia/Seoul, 일요일)
- 또는 텔레그램 `/weekly` 수동 트리거

## 입력

- Supabase `instagram_queue`, `threads_queue`, `insights_log`, `content_calendar`
- `content/blog/*.mdx` (이번 주 발행)
- `docs/status/*` 모든 상태판
- 지난 주 weekly 리포트 (`docs/weekly/YYYY-W{NN-1}.md`)

## 작업

### 1. 이번 주 발행 집계

```sql
-- 이번 주 발행 인스타
SELECT id, caption, scheduled_at, source, blog_slug
FROM instagram_queue
WHERE published_at >= date_trunc('week', now())
ORDER BY published_at;

-- 인사이트 TOP 3 (도달 기준)
SELECT iq.caption, il.views, il.reach, il.likes, il.comments
FROM insights_log il
JOIN instagram_queue iq ON iq.id = il.queue_id
WHERE il.collected_at >= date_trunc('week', now())
ORDER BY il.reach DESC
LIMIT 3;
```

### 2. 블로그 발행 집계

```bash
git log --since='1 week ago' --diff-filter=A --name-only content/blog/ | grep mdx
```

### 3. 패턴 분석

- **잘 나간 콘텐츠 공통점**: 카테고리·시간대·해시태그·소스 분석
- **저성과 콘텐츠**: 도달 평균 이하 콘텐츠 원인 추정
- **요일별 도달**: 어느 요일 발행이 효과적이었는지

### 4. 다음 주 권장사항 작성

- 잘 나간 패턴 → 다음 주에 반복할 콘텐츠 3개 제안
- 저성과 카테고리 → 톤·이미지·시간대 조정안
- 신규 시도해볼 카테고리

### 5. Weekly 리포트 생성

`docs/weekly/YYYY-WNN.md` 생성:

```markdown
# Week NN 리포트 (MM월 DD일 ~ MM월 DD일)

## 📊 발행 통계
- 블로그: N편
- 인스타: M개 게시물
- 스레드: K개 게시물

## 🏆 TOP 3 콘텐츠 (도달 기준)
1. [제목] — 도달 X명, 좋아요 Y개
2. ...

## 📈 카테고리별 성과
| 카테고리 | 게시물 수 | 평균 도달 |
| --- | --- | --- |

## 💡 인사이트
- ...

## 🎯 다음 주 권장
1. ...
2. ...
3. ...

## ⚠️ 주의 사항
- 검수 대기 7일+: ...
- 실패 항목: ...
```

### 6. PROJECT-STATUS.md 상단 갱신

이번 주 핵심 1줄 추가:
"2026-WNN: 블로그 N편 / 인스타 M개 발행. TOP 콘텐츠는 [제목] (도달 X명). 다음 주: [핵심 권장사항]"

### 7. 텔레그램 보고

chat_id `8796384805`로 weekly 리포트 요약 + Drive 폴더 링크 (있다면):
```
📊 Week NN 리포트

블로그: N편 / 인스타: M개
🏆 TOP: [제목] (도달 X)

다음 주 권장:
1. ...
2. ...

전체 리포트: /docs/weekly/YYYY-WNN.md
```

## 출력

- `docs/weekly/YYYY-WNN.md` (생성)
- `docs/status/PROJECT-STATUS.md` (수정)
- 텔레그램 weekly 리포트
- (선택) Google Drive `05-인사이트-리포트/` 폴더에 사본 업로드 (Manus 호출)

## 룰

- 매주 일요일 21시에만 실행 (`date +%w` == 0 확인)
- 이미 같은 주 리포트 있으면 덮어쓰기 전 백업
- opus 사용은 이 자동화 한정 (다른 nightly는 sonnet)
- 다음 주 권장사항은 **데이터 기반**으로만 (추측 금지)
