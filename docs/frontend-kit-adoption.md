# Frontend Kit Adoption

> Source: `/Users/family/jason/jason-agent-harness-template/templates/frontend-kit`
> 목적: 멍멍피트에 이식할 프론트 기능을 작은 단위로 추적한다.

## Applied

| Kit ID | Feature | Location | Notes |
|---|---|---|---|
| `K-FILTER-01` | TagFilter | `/cases` | URL query 기반 서버 렌더 필터. 클라이언트 상태 없이 공유 가능. |

## Recommended Backlog

| Priority | Kit ID | Feature | Where | Why |
|---|---|---|---|---|
| P1 | `K-CONTENT-02` | BlogListWithPagination | `/blog`, category pages | 글이 6개 이상으로 늘면 목록 길이와 내부 링크 품질 관리에 필요 |
| P1 | `K-TRUST-01` | ReviewCardWithRating | `/reviews`, home preview | 보호자 후기와 별점 신뢰 신호를 더 직접적으로 표시 |
| P2 | `K-FORM-02` | ReservationForm | `/diagnosis`, `/pricing` | 네이버폼 의존을 줄이고 문의 데이터를 직접 구조화할 때 적용 |
| P2 | `K-CONTENT-01` | FaqAccordion | home/service/pricing | 현재 `details` 기반 FAQ를 공통 컴포넌트로 정리할 때 적용 |

## Guardrails

- `framer-motion`이 필요한 motion kit는 성능 이득보다 전환 가치가 명확할 때만 도입한다.
- 새 UI는 `styles/tokens.ts`와 `app/globals.css` 토큰을 먼저 사용한다.
- 주요 공개 페이지 변경 후 `npm run typecheck`, `npm run qa:responsive`, `npm run media:budget`를 실행한다.

