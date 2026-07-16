# SEO Health Status — 정본

> 매주 자동 갱신. 직전 갱신: 2026-06-30 — 로컬 개발 서버 기준 SEO health dry-run, routes 12/12 OK, sitemap loc 20.
> 자동화: `.claude/automations/seo-health-check.prompt.md` (월), `.claude/automations/schema-validator.prompt.md` (화)
> 정본 문서: 본 파일.

---

## Phase 2 SEO 적용 (2026-05-13)

| 항목 | 위치 | 상태 |
|------|------|------|
| LocalBusiness `logo` 필드 | `content/site.ts::buildLocalBusinessJsonLd` | ✅ `${baseUrl}/images/brand/mungmungfit-icon.png` |
| Google Search Console verification | `app/layout.tsx::metadata.verification.google` (env `GOOGLE_SITE_VERIFICATION`) | ✅ 코드 슬롯 — 운영 환경 값 입력 대기 |
| Naver Webmaster verification | `app/layout.tsx::metadata.verification.other['naver-site-verification']` (env `NAVER_SITE_VERIFICATION`) | ✅ 코드 슬롯 — 운영 환경 값 입력 대기 |
| 이미지 sitemap | `app/sitemap.ts` — 홈 13장·about 5장·reviews 23장·cases/blog cover | ✅ entry별 `images:[]` 노출 |
| 블로그 카테고리 JSON-LD | `app/blog/category/[name]/page.tsx` — BreadcrumbList + CollectionPage(`hasPart`) | ✅ |
| 카테고리 metadata 키워드 강화 | 동상 — title `${name} 강아지 훈련 글 모음`, description 글 수 포함 | ✅ |
| 사업자 정보 sameAs | `content/site-content.json::businessInfo.sameAs`에 당근 로컬 프로필 URL 추가 — LocalBusiness JSON-LD 자동 흡수 | ✅ |
| 이미지 alt 다양화 | `trainingPhotosMeta`·`reviewPhotosMeta` 배열 + `composeTrainingAlt`/`composeReviewAlt` 동적 합성 | ⏳ 슬롯만 마련, 라벨링 채우기는 운영 작업 |

---

## 라우트 헬스 (HTTP 응답)

| 경로 | 직전 HTTP | TTFB | 비고 |
|---|---|---|---|
| `/` | 200 | 0.073s | dev warm |
| `/pricing` | 200 | 0.033s | — |
| `/reviews` | 200 | 0.068s | — |
| `/blog` | 200 | 0.024s | — |
| `/services/dog-fitness` | 200 | 0.041s | dev SSG params |
| `/areas/seoul` | 200 | 0.033s | dev SSG params |
| `/about` | 200 | 0.029s | — |
| `/cases` | 200 | 0.026s | — |
| `/diagnosis` | 200 | 0.026s | — |
| `/sitemap.xml` | 200 | 0.004s | sitemap loc 20개, 필수 경로 누락 0 |
| `/robots.txt` | 200 | 0.003s | Sitemap 지시 포함 |
| `/feed.xml` | 200 | 0.004s | XML 응답 확인 |

---

## Schema 적합성 (schema-validator)

로컬 Playwright 검사(2026-05-28):

| 경로 | JSON-LD | 파싱 | 주요 타입 | 비고 |
|---|---:|---|---|---|
| `/` | 3 | ✅ | LocalBusiness, Service, FAQPage | OG 이미지·canonical·H1 정상 |
| `/pricing` | 2 | ✅ | AggregateOffer, BreadcrumbList | OG 이미지 보정 완료 |
| `/reviews` | 3 | ✅ | ItemList, LocalBusiness, Review, BreadcrumbList | OG 이미지 보정 완료 |
| `/blog` | 1 | ✅ | BreadcrumbList | 이미지 전용 링크 aria-label 보정 |
| `/services/dog-fitness` | 3 | ✅ | BreadcrumbList, Service, FAQPage | OG 이미지 보정 완료 |
| `/areas/seoul` | 2 | ✅ | BreadcrumbList, LocalBusiness | OG 이미지 보정 완료 |
| `/about` | 2 | ✅ | Person, BreadcrumbList | 정상 |
| `/cases` | 2 | ✅ | ItemList, BreadcrumbList | 이미지 전용 링크 aria-label 보정 |
| `/diagnosis` | 2 | ✅ | WebPage, BreadcrumbList | OG 이미지 보정 완료 |
| `/blog/dog-fitness-intro` | 2 | ✅ | BlogPosting, BreadcrumbList | 정상 |
| `/cases/pomeranian-confidence` | 2 | ✅ | Article, Review, BreadcrumbList | 정상 |

---

## Lighthouse 추이

기준선: `docs/metrics/lighthouse-baseline-*-2026-05-13.json` (Phase 0)
Phase 1·2·3 측정: `docs/metrics/lighthouse-phase{1,2,3}-*-2026-05-13.json`

자동화가 매주 새 측정을 `docs/metrics/lighthouse-weekly-YYYY-MM-DD.json`에 저장하고 -5 이상 회귀 발견 시 본 섹션에 알림.

2026-05-28 수동 체크에서는 Lighthouse CLI 미설치로 점수 재측정은 생략. 대신 `npm run build`, route 200, 메타/JSON-LD/sitemap/robots/feed 검사를 수행.

---

## 회귀 알림 이력

(없음)

---

## 직전 실패

(없음)

## 2026-05-28 수동 체크 메모

- 11개 주요 페이지 모두 title/description/canonical/H1/lang 정상.
- 이미지 `alt` 누락 0건, JSON-LD parse error 0건.
- `/pricing`, `/reviews`, `/blog`, `/services/dog-fitness`, `/areas/seoul`, `/cases`, `/diagnosis`의 `og:image` 노출을 보강.
- `/blog`, `/cases` 이미지 전용 카드 링크에 `aria-label` 추가.
- `app/sitemap.ts`의 파일 mtime 기반 `fs.statSync`를 제거해 Turbopack NFT 추적 경고 해소.

## SEO 제출·모니터 파이프라인

직전 실행: 2026-06-30T01:27:17.038Z (dry-run, mode=all)

| 항목 | 결과 | 비고 |
|---|---|---|
| Health | ✅ | routes 12/12, sitemap loc 20 |
| Google sitemap submit | ⏭️ | dry-run |
| Google URL Inspection | ⏭️ | 10 URLs, skipped 10 |
| Naver IndexNow | ⏭️ | batches 1, skipped 1 |
| Naver Crawl API | ⏭️ | batches 1, skipped 1 |

Raw result: `docs/metrics/seo-pipeline-2026-06-30.json`

## 2026-06-30 수동 체크 메모

- `node scripts/seo-submit-monitor.mjs --dry-run --all --base-url=http://localhost:3001` 실행.
- 12개 필수 경로 모두 HTTP 200, TTFB 최대 73ms.
- `/sitemap.xml` loc 20개, `/robots.txt` Sitemap 지시 포함, `/feed.xml` 정상 XML.
- 10개 canonical 검사 모두 경로 일치.
- Google/Naver 실제 제출은 dry-run으로 skip; 운영 인증값 미설정.

## 2026-06-01 하네스 이식 메모

- `.claude/skills/seo-submit-monitor/SKILL.md`를 배포 후 SEO 제출·모니터 절차 정본으로 추가.
- 배포 전 smoke는 `npm run seo:dry-run -- --no-write`를 먼저 실행한다.
- 실서비스 제출 전 DNS/배포 보호/앱 라우트/공급자 인증을 분리해서 판단한다.
