---
name: release-qa
description: 릴리즈 전 핵심 페이지와 전환 흐름을 P0/P1 시나리오로 나눠 검증한다.
user_invocable: true
tags: [qa, release, responsive, browser, regression]
trigger: "배포 전, 큰 프론트 변경 후, 사진/콘텐츠를 많이 교체한 뒤"
version: 1
source: "/Users/family/jason/jason-agent-harness-template/harnesses/parallel-qa.md"
---

# Release QA

## P0 Scenarios

- 홈 `/`: hero 사진, 카카오 CTA, 전화 CTA, sticky CTA
- 모바일 내비게이션: hamburger open/close, CTA 가림 없음
- 가격 `/pricing`: 패키지 가격, 상담 CTA, 전화 CTA
- 자가진단 `/diagnosis`: 모든 문항 선택, 결과 노출, 결과 공유 fallback
- SEO public routes: `/robots.txt`, `/sitemap.xml`, `/feed.xml`

## P1 Scenarios

- 블로그 목록/상세/category
- 사례 목록/상세
- 후기 이미지 wall
- 지역/서비스 페이지
- 404, error/loading surface

## Commands

```bash
npm run typecheck
npm run media:budget
npm run qa:responsive
npm run seo:dry-run -- --no-write
```

## Result Format

```markdown
TC-home-cta: PASS
TC-mobile-nav: PASS
TC-diagnosis-share: FAIL - reason
TC-seo-public-routes: BLOCKED - reason
```

## Verify

- [ ] P0/P1 시나리오가 분리되어 있다.
- [ ] `tmp/responsive/report.json`에 console/page/network error가 남아 있다.
- [ ] 390/768/1440 screenshots를 확인했다.
- [ ] 실패는 재현 경로와 다음 조치가 있다.

