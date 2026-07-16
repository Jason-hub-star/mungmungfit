# 멍멍피트 Agent Skills

> Source pattern: `/Users/family/jason/jason-agent-harness-template/templates/skills`
> 정본은 각 `SKILL.md` 안에 둔다.

## 이식한 스킬

| Skill | Use When |
|---|---|
| `photo-slot-replacement` | 주인님이 `#5 사진 교체`처럼 번호로 사이트 사진 교체를 요청할 때 |
| `docs-status-sync` | 슬롯, 자동화, 콘텐츠 큐처럼 문서와 구현 상태가 함께 바뀔 때 |
| `seo-submit-monitor` | 배포 후 sitemap·robots·feed·Google/Naver 제출 상태를 계층별로 검증할 때 |
| `media-performance-budget` | 사진 슬롯·후기·hero 이미지를 교체한 뒤 public media 용량과 LCP 위험을 볼 때 |
| `release-qa` | 배포 전 핵심 페이지·모바일 메뉴·전환 CTA를 P0/P1로 나눠 검증할 때 |

## 제외한 후보

- `page-skill-template`: 현재 요청은 특정 라우트 개선보다 사진 슬롯 시스템 작업에 가깝다.
- `feature-quality-skill-template`: `photo-slot-replacement` 안에 필요한 품질 체크만 흡수했다.
- `secret-scan-skill-template`: 배포·PR 직전 작업이 아니므로 이번 이식 범위에서 제외했다.
- `debug-success-capture-skill-template`: 디버깅 성공 패턴이 아니라 운영 절차 정리 작업이라 제외했다.
