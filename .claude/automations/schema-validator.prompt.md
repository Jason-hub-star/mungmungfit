# Schema Validator — 매주 화요일 09:00 KST

> 핵심 페이지의 JSON-LD를 schema.org 표준에 맞게 검증.
> 모델: `haiku` (단순 fetch + 키 존재 검증)

---

## 트리거

- Cron: `0 9 * * 2` (화요일 09:00 Asia/Seoul)
- 또는 수동: `claude --automation .claude/automations/schema-validator.prompt.md`

## 검증 대상

| 페이지 | 필수 schema | 필수 필드 |
|---|---|---|
| `/` | `LocalBusiness` | `name`, `url`, `telephone`, `address.addressCountry`, `aggregateRating.ratingValue` |
| `/` | `Service` | `serviceType`, `provider`, `areaServed` |
| `/` | `FAQPage` | `mainEntity[].name`, `mainEntity[].acceptedAnswer.text` |
| `/about` | `Person` | `name`, `jobTitle`, `image`, `worksFor` |
| `/reviews` | `LocalBusiness` (with reviews) | `aggregateRating.reviewCount`, `review[].author.name`, `review[].reviewRating.ratingValue` |
| `/cases/[slug]` | `Article` | `headline`, `author`, `publisher`, `datePublished`, `mainEntityOfPage` |
| `/blog/[slug]` | `BlogPosting` | `headline`, `author`, `datePublished`, `mainEntityOfPage`, `keywords` |
| `/pricing` | `AggregateOffer` | `lowPrice`, `highPrice`, `priceCurrency`, `offers[]` |
| `/diagnosis` | `WebPage` | `name`, `description`, `inLanguage` |

모든 페이지: `BreadcrumbList` 존재 + `itemListElement[].position` 1부터 시작.

## 작업

### 1. JSON-LD 추출 + 파싱

```bash
SITE=https://mungmungfit.kr
for path in / /about /reviews /cases/pomeranian-confidence /blog/dog-fitness-intro /pricing /diagnosis; do
  curl -sS "$SITE$path" | grep -oE '<script type="application/ld\+json">[^<]+</script>' | sed 's|<[^>]*>||g' > /tmp/schema-$(echo $path | tr '/' '-').json
done
```

각 파일을 `JSON.parse` 시도 → 실패 시 즉시 실패 보고.

### 2. 필수 필드 존재 검증

위 표에 따라 각 필드 존재 여부 확인. 누락 발견 시 어느 페이지·어느 schema·어느 필드인지 명시.

### 3. schema.org 외부 검증 (선택)

가능하면 https://validator.schema.org/ 또는 Google Rich Results Test API 호출 (요금 없으면).

### 4. 결과 기록

`docs/status/SEO-HEALTH-STATUS.md`의 "## Schema 적합성" 섹션 갱신:
```markdown
| 페이지 | LocalBusiness | Service | Person | Article | Breadcrumb | 비고 |
|---|---|---|---|---|---|---|
| / | ✓ | ✓ | — | — | — | OK |
...
```

## 실패 시

- 즉시 텔레그램 알림
- `docs/status/SEO-HEALTH-STATUS.md` 하단에 "## 직전 실패" 섹션 추가
- 다음 SEO Health Check 자동화에서 우선 대상

## 출력 / 산출물

- `docs/status/SEO-HEALTH-STATUS.md` Schema 적합성 섹션 갱신
- 텔레그램 알림 (필수 필드 누락 시)
