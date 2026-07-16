---
name: seo-submit-monitor
description: 배포 후 sitemap, robots, feed, Search Console, Naver 제출/모니터를 계층별로 검증한다.
user_invocable: true
tags: [seo, deploy, sitemap, indexnow, search-console, monitoring]
trigger: "배포 후 SEO 제출, 색인 모니터, sitemap/robots/feed health를 확인할 때"
version: 1
source: "/Users/family/jason/jason-agent-harness-template/harnesses/post-deploy-seo-submit-monitor.md"
---

# SEO Submit Monitor

## Use When

- Vercel 배포 후 `sitemap.xml`, `robots.txt`, `feed.xml` 상태를 확인할 때
- Google Search Console 또는 Naver IndexNow 제출을 실행하기 전
- DNS, 배포 보호, 앱 라우트, 검색 공급자 인증 중 어디가 문제인지 분리해야 할 때

## Rules

1. DNS/배포 보호/앱 라우트/검색 공급자 인증을 섞어 판단하지 않는다.
2. 처음에는 `--dry-run` 또는 `--no-write`로 health를 먼저 본다.
3. Google/Naver secret 누락은 health failure가 아니라 `skipped`로 기록한다.
4. raw 결과는 `docs/metrics/`에 두고, status 문서에는 요약만 남긴다.
5. 실서비스 제출은 health가 깨끗할 때만 실행한다.

## Commands

```bash
npm run seo:dry-run -- --base-url https://mungmungfit.kr --no-write
npm run seo:dry-run -- --base-url https://mungmungfit.vercel.app --no-write
npm run seo:submit -- --google-only --no-write
npm run seo:submit -- --naver-indexnow-only --no-write
npm run seo:monitor -- --google-only --no-write
```

## Manual Layer Checks

```bash
dig +short mungmungfit.kr A
nslookup mungmungfit.kr 8.8.8.8
node -e "for (const p of ['/', '/robots.txt', '/sitemap.xml', '/feed.xml']) fetch('https://mungmungfit.kr'+p,{redirect:'manual'}).then(async r=>console.log(p,r.status,r.headers.get('content-type')||'',(await r.text()).slice(0,80).replace(/\\s+/g,' '))).catch(e=>console.log(p,e.message))"
```

## Verify

- [ ] production domain resolves publicly
- [ ] public route smoke returns 200 for `/`, `/robots.txt`, `/sitemap.xml`, `/feed.xml`
- [ ] sitemap has nonzero loc count and includes canonical core pages
- [ ] robots points to the intended sitemap
- [ ] Google credential has Search Console scope and property access
- [ ] Naver IndexNow key URL returns the configured key
- [ ] raw result is saved only for intentional recorded runs
- [ ] `docs/status/SEO-HEALTH-STATUS.md` summarizes the latest result

## Failure Triage

| Symptom | Likely Cause | Next Check |
|---|---|---|
| `ENOTFOUND` or `NXDOMAIN` | DNS not connected | registrar DNS, Vercel domain binding |
| deployment URL returns `401` | Vercel Deployment Protection | public alias or project protection settings |
| sitemap loc count is `0` | blocked/wrong sitemap response | direct fetch `/sitemap.xml` |
| Google `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` | credential scope missing | re-auth or service account scope |
| Google `403 permissionDenied` | property access missing | Search Console user/property setup |
| Naver IndexNow skipped | key missing | env and key-location route |

