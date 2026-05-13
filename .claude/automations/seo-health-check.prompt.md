# SEO Health Check Weekly — 매주 월요일 09:00 KST

> 매주 핵심 페이지의 SEO 위생을 자동 점검하고 회귀가 발견되면 알린다.
> 모델: `sonnet` (다중 페이지 fetch + Lighthouse 결과 비교)

---

## 트리거

- Cron: `0 9 * * 1` (월요일 09:00 Asia/Seoul)
- 또는 수동: `claude --automation .claude/automations/seo-health-check.prompt.md`

## 입력

- 대상 페이지 6개: `/`, `/pricing`, `/reviews`, `/blog`, `/services/dog-fitness`, `/areas/seoul`, `/about`, `/cases`, `/diagnosis`
- 기준 데이터: `docs/metrics/lighthouse-baseline-*-2026-05-13.json` (Phase 0 기준선)
- 직전 점검 결과: `docs/status/SEO-HEALTH-STATUS.md` (있다면)

## 작업

### 1. 라우트 200 확인

```bash
SITE=https://mungmungfit.kr
for path in / /pricing /reviews /blog /services/dog-fitness /areas/seoul /about /cases /diagnosis /sitemap.xml /robots.txt /feed.xml; do
  printf "%-32s " "$path"
  curl -sS -o /dev/null -w "HTTP %{http_code}  ttfb=%{time_starttransfer}s\n" "$SITE$path"
done
```

비-200 응답이 있으면 즉시 텔레그램 알림.

### 2. JSON-LD 위생

각 페이지에서 `<script type="application/ld+json">` 추출 → `JSON.parse` 시도 → 실패 시 알림.
필수 schema 누락 점검:
- `/` → `LocalBusiness`(aggregateRating), `Service`, `FAQPage`
- `/about` → `Person`(sameAs)
- `/cases/[slug]` → `Article`
- `/blog/[slug]` → `BlogPosting`

### 3. canonical·sitemap 일치

```bash
curl -sS $SITE/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | sed 's|<[^>]*>||g' > /tmp/sitemap-urls.txt
```
각 URL의 canonical href가 sitemap loc과 일치하는지(슬래시·query string 차이 포함).

### 4. Lighthouse 회귀 점검

`docs/metrics/`의 가장 최근 Lighthouse JSON과 새 측정 비교 (대표 4페이지: `/`, `/about`, `/cases/*`, `/diagnosis`).
- Performance·Accessibility·Best Practices·SEO 중 하나라도 -5 이상 하락하면 알림
- 새 측정 결과는 `docs/metrics/lighthouse-weekly-YYYY-MM-DD.json` 형식 저장

### 5. broken link

블로그 글·케이스 스터디 본문에서 마크다운 링크 추출 → HEAD 요청 → 404 발견 시 알림.

### 6. 결과 저장

`docs/status/SEO-HEALTH-STATUS.md` 갱신:
```markdown
# SEO Health Status — 정본

> 매주 월 09:00 자동 갱신. 직전 점검: YYYY-MM-DD HH:MM

## 라우트 헬스
| 경로 | HTTP | TTFB | 비고 |

## Schema 적합성
...

## Lighthouse 추이
...

## 회귀 알림 이력
...
```

### 7. 회귀·실패 시

텔레그램 봇으로 알림 + `docs/status/SEO-HEALTH-STATUS.md` "회귀 알림 이력" 섹션에 추가.

## 출력 / 산출물

- `docs/status/SEO-HEALTH-STATUS.md` 갱신 (정본)
- `docs/metrics/lighthouse-weekly-*.json` 신규 (옵션)
- 텔레그램 알림 (회귀·실패 시)
