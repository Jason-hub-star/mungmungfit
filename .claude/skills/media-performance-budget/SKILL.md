---
name: media-performance-budget
description: 사진/영상이 많은 공개 페이지의 이미지 용량, LCP, public 배포 파일 예산을 점검한다.
user_invocable: true
tags: [frontend, performance, images, lcp, nextjs]
trigger: "사진 슬롯 교체, 후기 이미지 추가, 배포 전 이미지 성능 점검을 할 때"
version: 1
source: "/Users/family/jason/jason-agent-harness-template/harnesses/media-performance-budget.md"
---

# Media Performance Budget

## Use When

- `public/images/slots`, `public/images/training`, `public/images/reviews`에 이미지를 추가하거나 교체할 때
- 홈 hero, 후기, 사례, 블로그 cover 이미지가 느려 보일 때
- 배포 전 public media가 너무 커졌는지 확인할 때

## Budgets

| Asset | Target |
|---|---:|
| Hero image | WebP/AVIF/JPEG derivative, 100-300KB, 1600-1920px wide |
| Card thumbnail | usually <300KB |
| Review screenshot/photo | rendered size에 맞춘 derivative, usually <500KB |
| Logo/icon | dedicated 128-256px asset, usually <80KB |
| Backup/source files | `public/` 밖에 보관 |

## Rules

1. LCP hero media는 `next/image` 최적화 경로와 `priority`를 확인한다.
2. below-the-fold 이미지는 lazy 기본값을 유지한다.
3. `sizes`는 실제 그리드 폭에 맞춘다.
4. 원본/백업 이미지는 deploy되는 `public/`에 오래 두지 않는다.
5. 파일 교체 후 `npm run media:budget`과 `npm run qa:responsive`를 같이 본다.

## Commands

```bash
npm run media:budget
rg -n "<Image|<img|<video|poster=|preload=|priority|fetchPriority|sizes=|fill" app components
```

## Verify

- [ ] first-load로 쓰는 public 이미지가 500KB를 넘지 않는다. 넘으면 이유를 기록한다.
- [ ] hero slot uses `priority` and `sizes="100vw"`
- [ ] card/review images have realistic `sizes`
- [ ] backup/source media is outside deployable `public/`
- [ ] 390/768/1440 smoke screenshots are checked after replacement

