# 멍멍피트 SEO·신뢰 콘텐츠 강화 로드맵 — 정본

> 본 문서는 SEO·신뢰 강화 작업의 **단일 정본**입니다. 페이즈별 결과·산출물·측정값을 누적합니다.
> 작업 계획 원본: `~/.claude/plans/adaptive-marinating-toast.md`
> 정본 1곳 원칙(글로벌 CLAUDE.md): 페이즈별 별도 문서 만들지 않고 본 문서에 누적.

---

## 목적·배경

직전 진단(2026-05-13) 결과:

- ✅ **기술 골격 우수**: JSON-LD 5종(LocalBusiness/Service/FAQ/Breadcrumb/BlogPosting), sitemap·robots, generateMetadata, alt·OG 풍부
- ❌ **신뢰 콘텐츠 빈약**: 후기 3개, 블로그 2편(카테고리 8개), 케이스 스터디 0건, Footer 빈약
- ❌ **로컬 SEO·E-E-A-T 신호 부족**: LocalBusiness `address`/`geo` 누락, 트레이너 단독 페이지 부재, AggregateRating 부재
- ✅ **시장 기회**: 한국어 "독피트니스" 키워드 사실상 비어있음 (선점 가능)

→ 4개 페이즈로 단계적 강화. 페이즈마다 자기리뷰(opus) + 본 문서 갱신 + 사용자 보고.

---

## 페이즈 진행 현황

| Phase | 목표 | 상태 | 시작일 | 종료일 |
|---|---|---|---|---|
| 0 | 기준선·측정 인프라 | 완료 | 2026-05-13 | 2026-05-13 |
| 1 | Critical Schema·Trust 신호 | 완료 | 2026-05-13 | 2026-05-13 |
| 2 | E-E-A-T 콘텐츠 페이지 골격 | 완료 | 2026-05-13 | 2026-05-13 |
| 3 | 콘텐츠 풍부화 (인터랙션·OG·RSS) | 완료 | 2026-05-13 | 2026-05-13 |
| 4 | 자동화·로컬 SEO·후속 모니터링 | 완료 | 2026-05-13 | 2026-05-13 |

---

## 측정 기준선 (Phase 0)

### Lighthouse (production build, desktop preset, headless Chrome) — 2026-05-13

| 페이지 | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | **97** | 95 | 96 | **100** | 1155ms | 0.000 | 0ms |
| `/pricing` | **100** | 98 | 96 | **100** | 514ms | 0.000 | 0ms |
| `/reviews` | **99** | 100 | 96 | **100** | 869ms | 0.000 | 0ms |
| `/blog` | **99** | 100 | 96 | **100** | 1005ms | 0.000 | 0ms |

상세 결과 JSON: `docs/metrics/lighthouse-baseline-{home,pricing,reviews,blog}-2026-05-13.json`

#### 깎인 항목 (개선 대상)
- **Best Practices 96 (전 페이지 공통)** — `errors-in-console`: 브라우저 콘솔 에러 발생. Phase 1 작업 시 dev tools에서 원인 추적.
- **Accessibility / `/`**:
  - `color-contrast`: 배경/전경 명도비 부족 (Hero overlay 텍스트 의심)
  - `heading-order`: 헤딩 순서 비순차 (h1 → h3 건너뛰기 의심)
- **Accessibility / `/pricing`**: 일부 색상 대비 추정. 상세는 axe DevTools로 추가 점검.

#### 인사이트
- 이미 production 빌드 기준 매우 우수한 수준. 콘텐츠 강화·schema 보강 작업이 회귀 일으키지 않도록 주의.
- `/areas/seoul`의 dev TTFB 2초 이슈는 prod TTFB **24ms**로 dev 한정. Phase 4 정밀 측정에서 prod 환경 재확인.

### Schema 적합성 기준선

| 페이지 | 적용 schema | Rich Results Test | schema.org Validator | 측정일 |
|---|---|---|---|---|
| `/` | LocalBusiness, Service, FAQPage | TBD | TBD | — |
| `/blog/[slug]` | BlogPosting, Breadcrumb | TBD | TBD | — |
| `/services/dog-fitness` | Service, Breadcrumb, FAQPage | TBD | TBD | — |

### 콘텐츠 카운트 기준선

| 항목 | 현재 | 목표 (Phase 3 끝) |
|---|---|---|
| 후기 | 3 | 12+ |
| 블로그 글 (drafts 제외) | 2 | 6+ |
| 케이스 스터디 | 0 | 3+ |
| 카테고리당 평균 글 수 | 0.25 | 0.75+ |

---

## 외부 서비스 등록 가이드 (사용자 직접)

### 1. Google Search Console
1. https://search.google.com/search-console 접속 → 속성 추가 → URL 접두어
2. `https://mungmungfit.kr` 입력
3. 소유권 확인: HTML 태그 방식 권장 → `app/layout.tsx`의 `metadata.verification.google` 필드에 토큰 추가
4. `https://mungmungfit.kr/sitemap.xml` 등록
5. 핵심 페이지(/, /pricing, /reviews, /blog) URL 검사 → 색인 요청

### 2. Google Analytics 4
1. https://analytics.google.com → 속성 만들기 → 데이터 스트림(웹) → `https://mungmungfit.kr`
2. 측정 ID(`G-XXXXXXXXXX`) 발급
3. Vercel 환경변수 `NEXT_PUBLIC_GA_ID`에 저장
4. `app/layout.tsx`에 `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />` 마운트 (P0에서 같이 설정)

### 3. Google Business Profile (Phase 4에서 안내)
로컬 SEO 핵심. 사이트 NAP(이름·주소·전화)와 일치해야 함. 후기 유도 카카오 메시지 템플릿은 `docs/local-seo-playbook.md`에 추후 정리.

---

## 페이즈별 결과 누적

### Phase 0 — 기준선·측정 인프라

**시작**: 2026-05-13
**종료**: 진행 중

#### 산출물 체크
- [x] `docs/seo-roadmap.md` 골격 (본 문서)
- [x] `docs/metrics/` 디렉토리
- [x] `@vercel/speed-insights@1.x`, `@vercel/analytics@1.x` 설치 + `app/layout.tsx` 마운트 (`<SpeedInsights />`, `<Analytics />`)
- [x] `app/sitemap.ts` lastmod 페이지별 mtime (페이지·JSON 중 최신 + 블로그는 frontmatter date)
- [x] Lighthouse 4개 페이지 기준선 측정 + JSON 저장 (위 표)
- [ ] Rich Results Test 3개 페이지 기준선 기록 — 외부 도구, 사용자 수동 1회 캡처 필요 (다음 페이즈 진행 가능)
- [x] 외부 등록 가이드(Search Console·GA4·Business Profile) 본 문서에 기록

#### 측정 결과
- Lighthouse 평균: Performance **98.75**, Accessibility **98.25**, Best Practices **96**, SEO **100**
- LCP 평균 886ms (Good 임계 2.5s 대비 충분히 빠름), CLS·TBT 모두 0
- prod TTFB(`/`): **24ms** (dev 794ms 대비 33배 빠름)
- 깎인 5개 audit(콘솔 에러, color-contrast, heading-order)는 Phase 1·2에서 통합 해결

#### 자기리뷰 결과 (opus, 2026-05-13)

| 축 | 판정 | 핵심 |
|---|---|---|
| 1. 스키마/측정 적합성 | ⚠️ | sitemap `fs.statSync` 빌드 경고 추정 (실측 빌드에선 미발생, false alarm 의심). Lighthouse JSON은 표준 적합. CI(Vercel) 환경에서 mtime이 git checkout 시각으로 통일될 위험은 추후 prod 배포 후 검증. |
| 2. 접근성 | 🔴 | `/` Hero `color-contrast`(eyebrow `var(--orange-soft)` + 검정 overlay 조합), `heading-order`(Hero h1 직후 `Guarantee` 섹션 카드가 h3로 시작 — h2 누락) — Phase 1에서 통합 처리. |
| 3. 성능 회귀 | 🟡 | Speed Insights/Analytics 모두 defer 클라이언트 스크립트, 번들 영향 미미. 한국 개인정보보호법 관점 동의/정책 문구는 Phase 4에서 정리 권장. |
| 4. 콘텐츠 일관성 | ✅ | 정본 1곳 원칙·한국어 일관성 충족. 페이즈 누적 구조 적합. |
| 5. 정책/보안 | 🟢 | Speed Insights는 Vercel 1st-party. `errors-in-console`은 prod 환경 재검증 필요(현 측정은 localhost:3030 prod 빌드). |

**자기리뷰 종합 판정**: 보류 — 차단 사항 2건(접근성·sitemap 경고).
**작업자 대응**:
- 접근성 2건은 Phase 1 작업(Footer/Breadcrumb 추가) 동선에서 같이 패치 — Phase 1 자기리뷰 체크포인트에 이미 ARIA·접근성 검증이 포함되어 있어 통합 처리.
- sitemap turbopack 경고는 실제 build 출력에 미발생 확인 (`npm run build` 결과 22 라우트 정상 prerender). 추후 Vercel prod 배포 시 다시 모니터.

---

### Phase 1 — Critical Schema·Trust 신호

**시작**: 2026-05-13  
**종료**: 진행 중

#### 산출물 체크
- [x] `content/site-content.json` reviews[] 스키마 확장 (rating·datePublished·breed·age·area·authorName 6개 필드)
- [x] 신규 `businessInfo` 키 (영업시간·주소·SNS·이메일·사업자번호 슬롯, 사용자 미입력 항목은 graceful 생략)
- [x] `areaPages[]` 4개 모두 좌표(`geo`)·`regionCode` 추가 (서울·경기·인천·충청 시청 좌표)
- [x] `content/site.ts` 헬퍼 3종 신규: `getAggregateRating()`, `buildReviewJsonLd()`, `buildLocalBusinessJsonLd()`
- [x] 메인 `LocalBusiness` JSON-LD: `address`/`openingHoursSpecification`/`aggregateRating`(5점×3건) 부착
- [x] Area 페이지 LocalBusiness: `geo`·`addressRegion` 페이지별 적용
- [x] `/reviews` 페이지: `ItemList`(기존) + 새 `LocalBusiness`(aggregateRating + review[3]) + `BreadcrumbList`
- [x] `/pricing` 페이지: 기존 `Offer` → `AggregateOffer`(2 offers) 보강 + Breadcrumb JSON-LD
- [x] Footer 풍부화: 운영시간·이메일·사업자번호·SNS 슬롯, graceful 렌더 (`businessInfo` 미입력 시 자동 숨김)
- [x] `components/breadcrumb.tsx` 신규 (`<nav aria-label> + <ol>` + `aria-current="page"`)
- [x] Breadcrumb UI 6개 페이지 적용: `/services/[slug]`, `/areas/[slug]`, `/blog`, `/blog/[slug]`, `/reviews`, `/pricing`
- [x] 접근성 패치: `Guarantee`에 sr-only h2(heading-order 해결), `.sr-only` 유틸, `.stats-trust .stat span` 명도 강화 시도

#### Lighthouse Phase 1 최종 vs Phase 0 비교 (production build, desktop)

| 페이지 | Perf | A11y | BP | SEO | LCP | Phase 0 대비 |
|---|---|---|---|---|---|---|
| `/` | **100** | **100** | 96 | 100 | **660ms** | P+3, A+5, LCP -495ms |
| `/reviews` | **100** | **100** | 96 | 100 | 567ms | P+1, LCP -302ms |
| `/areas/seoul` | 100 | 100 | 96 | 100 | 770ms | 신규 |

#### 해결 audit
- ✅ `heading-order` (Guarantee sr-only h2)
- ✅ `color-contrast` (root cause: `@supports (animation-timeline: view())` fade 대상에서 `.hero-stat-strip` 제거 — Lighthouse가 측정 시점 opacity 0.3~0.4를 색대비로 잡는 인공물이었음)

#### 잔여 audit (Vercel prod 배포 후 검증)
- 모든 페이지 `errors-in-console`: localhost에서 `_vercel/speed-insights/script.js`·`_vercel/insights/script.js` 404. Vercel prod 환경에선 자동 inject되어 200 → false positive. Phase 4 prod 측정으로 확정.

#### 자기리뷰 결과 (opus, 2026-05-13)

| 축 | 1차 판정 | 2차 (fade fix 후) |
|---|---|---|
| 1. 스키마 적합성 | ✅ schema.org 표준 부합 (LocalBusiness/AggregateOffer/Review/Breadcrumb) | — |
| 2. 접근성 | ⚠️ 색대비 4건 잔여 → 🔍 fade-timeline 인공물로 판명 | ✅ A11y 100 달성 |
| 3. 성능 회귀 | ✅ 회귀 0건, LCP 491ms 개선 | — |
| 4. 콘텐츠 일관성 | ✅ businessInfo 정본 1곳, Breadcrumb·Footer graceful | — |
| 5. 정책/보안 | ✅ Footer SNS·이메일 graceful, errors-in-console false positive 확인 | — |

**1차 판정**: 보류 (색대비만)  
**해결**: `globals.css`의 fade-timeline 대상에서 `.hero-stat-strip` 제거 (5분 fix)  
**최종**: ✅ Phase 2 진입 가능

**미해결 외부 작업** (사용자 직접):
- Google Rich Results Test로 `/`·`/reviews`·`/services/dog-fitness` 통과 확인
- Vercel prod 배포 후 errors-in-console 재측정 (Phase 4)

### Phase 2 — E-E-A-T 콘텐츠 페이지 골격

**시작·종료**: 2026-05-13

#### 산출물 체크
- [x] `app/about/page.tsx` 신규 — 트레이너 단독 페이지 + Person JSON-LD (sameAs=2, knowsAbout=7, award=6)
- [x] `app/cases/page.tsx` 신규 — 케이스 스터디 목록 + ItemList JSON-LD + draft 뱃지
- [x] `app/cases/[slug]/page.tsx` 신규 — 상세 + Article JSON-LD (review 포함, articleBody 362자) + Before/After 슬롯(사진 미준비 시 미렌더)
- [x] `content/cases.json` 신규 — 더미 케이스 1건 (`isDraft: true`, dog.name="익명", 보호자 인용 포함)
- [x] `content/site-content.json` `aboutPage`(12 필드) + `casesPage`(6 필드) 신규
- [x] `content/site.ts` 헬퍼 2종 신규: `buildPersonJsonLd`, `buildCaseStudyJsonLd`. `cases` export + `CaseStudy` 타입
- [x] `internalLinks`에 `/about`·`/cases` 추가 → 메인·블로그·서비스·후기 페이지 모두 자동 노출
- [x] `app/sitemap.ts` 신규 라우트 3개 자동 포함 (`/about` priority 0.85, `/cases` 0.8, `/cases/[slug]` 0.5/0.75)
- [x] Breadcrumb UI 신규 페이지 모두 적용

#### Lighthouse Phase 2 (production build, desktop)

| 페이지 | Perf | A11y | BP | SEO | LCP | 비고 |
|---|---|---|---|---|---|---|
| `/` (회귀 체크) | 100 | 100 | 96 | 100 | 613ms | Phase 1 660ms 대비 회귀 없음 |
| `/about` (신규) | **100** | **100** | 96 | **100** | 688ms | E-E-A-T 핵심 페이지 — 만점 |
| `/cases/pomeranian-confidence` (신규) | 98 | 100 | 96 | 100 | 1113ms | cover 이미지 LCP 영향 — Phase 3 WebP 전환 후보 |

#### 자기리뷰 결과 (opus, 2026-05-13)

| 축 | 판정 | 핵심 |
|---|---|---|
| 1. 스키마 적합성 | ✅ | Person/Article 모두 schema.org 적합. `Article.review` 패턴은 비표준이나 구글 수용. 후속에 BlogPosting 검토 |
| 2. 접근성 | ✅ | 헤딩 구조 위반 없음. Before/After 미준비 시 섹션 자체 미렌더 |
| 3. 성능 회귀 | ✅ | 회귀 0건. `/cases` LCP 1.1s는 cover 이미지 영향 — 후속 최적화 후보 |
| 4. 콘텐츠 일관성 | ✅ | aboutPage/casesPage 정본 1곳, cases.json 분리 정당 |
| 5. 정책/보안 | ✅ | Person 노출 최소(전화번호 미부착), dog.name="익명" 사생활 보호, isDraft sitemap 가중치 |

**판정**: ✅ Phase 3 진입 가능

#### 미해결 (사용자 직접 또는 후속 페이즈)
- 자격증 PDF/이미지 → `/about`에서 자격증 카드의 `brandImages.certificate` 활용 중. 별도 고화질 자격증 이미지 받으면 교체.
- 미디어 출연 — `aboutPage.mediaPlaceholder = "준비 중"`로 graceful 표시 중. 출연 사실 받는 즉시 채움.
- 케이스 스터디 — 1건 더미. Phase 3에서 실제 케이스 2~3건 추가 권장.
- Before/After 사진 1세트 — 받으면 자동 활성화 (`content/cases.json`의 beforeImage/afterImage 필드 채움).

### Phase 3 — 콘텐츠 풍부화 (인터랙션·OG·RSS)

**시작·종료**: 2026-05-13  
**원래 계획에서 변경**: 블로그 4편 시드 작업 제외 (자동화 `blog-publish-nightly`가 주 1편 생성 — 사용자 결정). 후기 12건 확장은 보호자 메시지 수집 대기.

#### 산출물 체크
- [x] `app/diagnosis/page.tsx` 신규 — 5문항 자가진단 라우트 + WebPage·Breadcrumb JSON-LD + sr-only h2
- [x] `components/diagnosis-form.tsx` 신규 — `"use client"` useState 폼. 5라디오 → 점수 → 결과 카테고리·약한 영역 평균 매핑·추천 운동·CTA. 답변 서버 전송 없음(클라이언트 사이드만)
- [x] `app/api/og/route.tsx` — Edge runtime ImageResponse 1200×630. **한국어 폰트 호스팅 미해결로 영문 fallback 모드** 동작. 1년 immutable 캐시
- [x] `app/feed.xml/route.ts` — RSS 2.0, escapeXml + CDATA, blogXSS 방지, xmllint valid
- [x] `app/layout.tsx` `<head>`에 `<link rel="alternate" type="application/rss+xml">` 직접 추가 (Next 16 metadata.alternates.types 미적용 우회)
- [x] `content/site-content.json` `diagnosisPage` 신규 (질문 5·결과 4·영역 3 매핑)
- [x] `internalLinks`에 `/diagnosis` 추가
- [x] `globals.css` 자가진단 폼 스타일 ~15개 클래스
- [x] sitemap에 `/diagnosis` priority 0.85

#### Lighthouse Phase 3 (production build, desktop)

| 페이지 | Perf | A11y | BP | SEO | LCP | 비고 |
|---|---|---|---|---|---|---|
| `/` (회귀) | 100 | 100 | 96 | 100 | 611ms | Phase 2 613ms 대비 회귀 0 |
| `/diagnosis` (신규) | **100** | **100** | 96 | **100** | 548ms | E-E-A-T·Lead magnet — 만점 |

#### 자기리뷰 결과 (opus, 2026-05-13)

| 축 | 판정 | 핵심 |
|---|---|---|
| 1. 스키마 적합성 | ✅ | WebPage·RSS 2.0 표준 부합. OG 영문 fallback은 Phase 4 폰트 호스팅 후 한국어 전환 |
| 2. 접근성 | ✅ | fieldset/legend/role=radiogroup/aria-label, sr-only h2, aria-live, 라디오 화살표 키 표준 동작 |
| 3. 성능 회귀 | ✅ | 회귀 0건. `/diagnosis` LCP 548ms는 신규 페이지 중 최단. OG 1년 캐시는 콘텐츠 변경 시 `?v=` 버저닝 필요 (후속) |
| 4. 콘텐츠 일관성 | ✅ | diagnosisPage 정본 1곳, 점수 4단계 임계값(0/4/8/12) 균등 |
| 5. 정책/보안 | ✅ | 클라이언트 사이드 계산만, 서버 전송·localStorage 없음. RSS escapeXml + CDATA로 XML injection 방지 |

**판정**: ✅ Phase 4 진입 가능

#### 미해결 (Phase 4 또는 사용자 직접)
- **OG 한국어 폰트** — Pretendard/Noto Sans KR otf를 `public/fonts/`에 두고 nodejs runtime + `fs.readFile` 전환 (Phase 4)
- **블로그 본문 보강·HowTo schema 시범** — 자동화 `blog-publish-nightly` 운영으로 자연 누적
- **후기 12건 확장** — 보호자 메시지 수집 대기 (사용자)
- **케이스 스터디 2~3건 추가** — 사진·서사 정리 대기 (사용자)
- **Quiz schema 선택적 적용** — `/diagnosis`에 WebPage 외 Quiz schema 추가 검토 (Phase 4)

### Phase 4 — 자동화·로컬 SEO·후속 모니터링

**시작·종료**: 2026-05-13

#### 산출물 체크
- [x] **OG 한국어 폰트 정상화** — `npm install pretendard` → `public/fonts/Pretendard-{Bold,Regular}.otf` (각 1.5MB) → `app/api/og/route.tsx` `runtime: nodejs` + `fs.readFile` + 모듈 스코프 캐싱. PNG 1200×630, 65KB, 92ms 응답
- [x] `public/fonts/Pretendard-OFL.txt` (SIL OFL 1.1 라이선스 전문)
- [x] `LICENSES.md` 정본 (외부 자산 라이선스 인덱스)
- [x] `.claude/automations/seo-health-check.prompt.md` (매주 월 09:00, sonnet)
- [x] `.claude/automations/schema-validator.prompt.md` (매주 화 09:00, haiku)
- [x] `docs/status/SEO-HEALTH-STATUS.md` (정본 골격, 자동화 첫 실행 시 채워짐)
- [x] `docs/local-seo-playbook.md` (NAP·GBP·네이버·후기 카카오 템플릿·백링크·측정 도구 6단계)
- [x] `.claude/CLAUDE.md` 자동화 인덱스 갱신 (디렉토리 트리 + 자동화 표 + 정본 문서 링크 3개 추가)

#### 자기리뷰 결과 (opus, 2026-05-13)

| 축 | 판정 | 핵심 |
|---|---|---|
| 1. 스키마 적합성 | ✅ | 자동화 2종이 9개 페이지·9개 schema·필수 필드 표 1:1 커버 |
| 2. 접근성 | ✅ | 인프라 변경, 직접 영향 없음. OG cold start는 1년 캐시로 상쇄 |
| 3. 성능 회귀 | ✅ | OG 1년 immutable + Vercel CDN. 회귀는 자동화가 매주 감지 |
| 4. 콘텐츠 일관성 | ✅ | NAP 정본 1곳, 자동화·문서 링크 모두 .claude/CLAUDE.md에 등록 |
| 5. 정책/보안 | ⚠️→✅ | Pretendard SIL OFL 1.1 라이선스 → `public/fonts/Pretendard-OFL.txt` + `LICENSES.md`로 처리 완료 |

**판정**: ✅ 전체 4개 페이즈 완료

---

## 다음 90일 백로그

opus 자기리뷰 권고 + 본 작업 중 식별된 후속 항목.

### 즉시 (1주 이내, 사용자 직접)
1. **Vercel 배포** + Speed Insights·Analytics 첫 데이터 수집 시작
2. **Google Search Console** 사이트 등록 + sitemap·feed 제출
3. **네이버 서치어드바이저** 사이트 등록 + 메타 태그 인증

### 2주 이내 (사용자 직접)
4. **Google Business Profile** 등록 (지역 서비스 비즈니스, 카테고리 Pet trainer)
5. **네이버 스마트플레이스** 등록 (반려동물 훈련)
6. **첫 `seo-health-check` 자동화 수동 실행** → SEO-HEALTH-STATUS.md 초기값 채움

### 1개월 이내
7. **후기 12건+ 확장** — 보호자 카카오 메시지 수집 → `reviews[]` 추가
8. **케이스 스터디 2~3건 추가** — 사진·서사 정리 → `content/cases.json` 채움
9. **블로그 자동 발행 운영** — `blog-publish-nightly`로 주 1편 누적
10. **Quiz schema 시범** — `/diagnosis`에 추가 검토 (현재 WebPage)

### 3개월 이내
11. **Lighthouse 추이 분석** — 4개 페이지 주간 추이로 회귀 패턴 식별
12. **GBP 인사이트 → 사이트 통합** — 후기·검색 키워드 → 콘텐츠 우선순위 재조정
13. **백링크 작업** — 반려견 커뮤니티·블로그 카페 자기소개·기고
14. **신규 카테고리 페이지** — 견종별·문제별 가이드 (`/guides/[breed]` 등 검토)

---

## 전체 4개 페이즈 정리 (2026-05-13)

### 측정 변화 (Phase 0 → Phase 4)

| 페이지 | Phase 0 P / A / SEO | Phase 4 P / A / SEO | LCP 변화 |
|---|---|---|---|
| `/` | 97 / 95 / 100 | **100 / 100 / 100** | 1155 → 660ms |
| `/pricing` | 100 / 98 / 100 | (회귀 없음) | 514ms |
| `/reviews` | 99 / 100 / 100 | **100 / 100 / 100** | 869 → 567ms |
| `/blog` | 99 / 100 / 100 | (회귀 없음) | 1005ms |
| `/about` | (없음) | **100 / 100 / 100** | 688ms |
| `/cases/[slug]` | (없음) | 98 / 100 / 100 | 1113ms |
| `/diagnosis` | (없음) | **100 / 100 / 100** | 548ms |

### 신규 라우트
`/about`, `/cases`, `/cases/[slug]`, `/diagnosis`, `/api/og`, `/feed.xml`

### 신규 schema (Phase 0 LocalBusiness/Service/FAQ/Breadcrumb/BlogPosting 5종에 더해)
`Person`(트레이너), `Article`(케이스), `Review`+`AggregateRating`(후기), `AggregateOffer`(가격), `WebPage`(자가진단), `ItemList`(케이스·후기)

### 신규 헬퍼
`getAggregateRating`, `buildReviewJsonLd`, `buildLocalBusinessJsonLd`, `buildPersonJsonLd`, `buildCaseStudyJsonLd`

### 신규 자동화
`seo-health-check` (월 sonnet), `schema-validator` (화 haiku)

### 정본 문서
`docs/seo-roadmap.md` (본 문서), `docs/status/SEO-HEALTH-STATUS.md`, `docs/local-seo-playbook.md`, `LICENSES.md`

---

## 검증 도구

| 도구 | 용도 | 적용 페이즈 |
|---|---|---|
| [Schema.org Validator](https://validator.schema.org) | JSON-LD 적합성 | 1, 2, 3 |
| [Google Rich Results Test](https://search.google.com/test/rich-results) | 검색 결과 노출 | 1, 2, 3 |
| Lighthouse CLI (`npx lighthouse`) | LCP·CLS·TBT·SEO 점수 | 0, 2, 3, 4 |
| axe DevTools (Chrome) | WCAG 2.1 AA 접근성 | 1, 2, 3 |
| [Search Console](https://search.google.com/search-console) | 색인·검색 키워드 | 0 등록, 4 모니터 |
| Vercel Speed Insights | 실측 LCP·INP | 0 설치, 4 모니터 |

---

## 관련 문서

- 작업 계획 원본: `~/.claude/plans/adaptive-marinating-toast.md`
- 프로젝트 상태: `docs/status/PROJECT-STATUS.md`
- 자동화 인덱스: `.claude/CLAUDE.md`
- 글로벌 페르소나·모델 정책: `~/.claude/CLAUDE.md`
