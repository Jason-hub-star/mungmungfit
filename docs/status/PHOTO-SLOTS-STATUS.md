# 사진 슬롯 진행률

> 정본: `content/placeholders.ts`
> 시각 가이드: `docs/photo-slots-reference.md`
> 본 문서는 진행률·우선순위 한눈에 보기용.

Last Updated: 2026-05-27 (KST) — #1 hero 사진을 주인님 제공 사진(`/images/slots/hero-1.jpg`)으로 교체. #4 메이 슬롯은 화면에서 삭제, #17 프로세스 사진 슬롯도 삭제하고 컴포넌트형 단계 시각화로 전환.

---

## 전체 진행률

| 범위 | 슬롯 수 | 채워짐 | 대기 | 진행률 |
|------|---------|--------|------|--------|
| 전체 | 29 | 19 | 10 | 66% |
| P1 | 7 | 7 | 0 | 100% |
| P2 | 11 | 9 | 2 | 82% |
| P3 | 11 | 3 | 8 | 27% |

대기 슬롯: **#18~#23, #29~#32**

> #4, #17, #28은 retired 번호.

---

## 대기 슬롯

| 번호 | 슬롯 ID | 우선순위 | 필요한 이미지 | 상태 |
|------|---------|----------|---------------|------|
| #18 | `before-1` | P2 | 케이스 1 수업 전 | 대기 |
| #19 | `after-1` | P2 | 케이스 1 수업 후 | 대기 |
| #20 | `before-2` | P3 | 케이스 2 수업 전 | 대기 |
| #21 | `after-2` | P3 | 케이스 2 수업 후 | 대기 |
| #22 | `before-3` | P3 | 케이스 3 수업 전 | 대기 |
| #23 | `after-3` | P3 | 케이스 3 수업 후 | 대기 |
| #29 | `area-seoul` | P3 | 서울 지역 수업 또는 산책 현장 | 대기 |
| #30 | `area-gyeonggi` | P3 | 경기 지역 수업 현장 | 대기 |
| #31 | `area-incheon` | P3 | 인천 지역 수업 현장 | 대기 |
| #32 | `area-chungcheong` | P3 | 충청 지역 수업 현장 | 대기 |

---

## 채워진 슬롯

| 번호 | 슬롯 ID | 현재 이미지 |
|------|---------|-------------|
| #1 | `hero-1` | `/images/slots/hero-1.jpg?v=20260527-1` |
| #2 | `hero-2` | `/images/slots/hero-2.jpg` |
| #3 | `hero-3` | `/images/slots/hero-3.jpg` |
| #5 | `tool-balance-ball` | `/images/slots/tool-balance-ball.jpg?v=20260515-3` |
| #6 | `tool-cavaletti` | `/images/slots/tool-cavaletti.jpg?v=20260515-3` |
| #7 | `tool-fitpaws` | `/images/slots/tool-fitpaws.jpg?v=20260515-3` |
| #8 | `tool-proprioception` | `/images/slots/tool-proprioception.jpg?v=20260515-3` |
| #9 | `tool-hurdle` | `/images/slots/tool-hurdle.jpg?v=20260515-3` |
| #10 | `tool-routine` | `/images/slots/tool-routine.jpg?v=20260515-3` |
| #11 | `target-obese` | `/images/slots/target-obese.jpg` |
| #12 | `target-senior` | `/images/slots/target-senior.jpg` |
| #13 | `target-shy` | `/images/slots/target-shy.jpg` |
| #14 | `target-energetic` | `/images/slots/target-energetic.jpg` |
| #15 | `target-puppy` | `/images/slots/target-puppy.jpg` |
| #16 | `target-leash` | `/images/slots/target-leash.jpg` |
| #24 | `concern-obese-senior` | `/images/slots/concern-obese-senior.jpg?v=20260515-3` |
| #25 | `concern-leash` | `/images/slots/concern-leash.jpg` |
| #26 | `concern-confidence` | `/images/slots/concern-confidence.jpg?v=20260515-3` |
| #27 | `concern-handler` | `/images/slots/concern-handler.jpg` |

---

## 사진 받았을 때 반영 절차

1. 화면 번호를 `content/placeholders.ts`의 `number`와 매칭한다.
2. 파일을 `/public/images/slots/{slot-id}.{ext}`에 저장한다.
3. `src`가 비어 있으면 `/images/slots/{slot-id}.{ext}`로 채운다. 이미 채워진 슬롯이면 같은 경로로 교체하고 필요 시 cache-buster를 갱신한다.
4. `docs/photo-slots-reference.md`와 본 문서의 상태를 맞춘다.
5. `npm run typecheck`를 실행한다.
6. 로컬 사이트에서 해당 `#N` 배지가 보이는지 확인한다.
