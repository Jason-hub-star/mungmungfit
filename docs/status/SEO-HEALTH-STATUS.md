# SEO Health Status — 정본

> 매주 자동 갱신. 직전 갱신: 미실행 (Phase 4 골격 생성)
> 자동화: `.claude/automations/seo-health-check.prompt.md` (월), `.claude/automations/schema-validator.prompt.md` (화)
> 정본 문서: 본 파일.

---

## 라우트 헬스 (HTTP 응답)

| 경로 | 직전 HTTP | TTFB | 비고 |
|---|---|---|---|
| `/` | (대기) | — | — |
| `/pricing` | (대기) | — | — |
| `/reviews` | (대기) | — | — |
| `/blog` | (대기) | — | — |
| `/services/dog-fitness` | (대기) | — | — |
| `/areas/seoul` | (대기) | — | — |
| `/about` | (대기) | — | — |
| `/cases` | (대기) | — | — |
| `/diagnosis` | (대기) | — | — |
| `/sitemap.xml` | (대기) | — | — |
| `/robots.txt` | (대기) | — | — |
| `/feed.xml` | (대기) | — | — |

---

## Schema 적합성 (schema-validator)

(첫 자동화 실행 후 채워짐)

---

## Lighthouse 추이

기준선: `docs/metrics/lighthouse-baseline-*-2026-05-13.json` (Phase 0)
Phase 1·2·3 측정: `docs/metrics/lighthouse-phase{1,2,3}-*-2026-05-13.json`

자동화가 매주 새 측정을 `docs/metrics/lighthouse-weekly-YYYY-MM-DD.json`에 저장하고 -5 이상 회귀 발견 시 본 섹션에 알림.

---

## 회귀 알림 이력

(없음)

---

## 직전 실패

(없음)
