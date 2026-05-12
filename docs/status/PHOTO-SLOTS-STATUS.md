# 사진 슬롯 진행률

> 정본: `content/placeholders.ts` (src 필드)
> 시각 가이드: `docs/photo-slots-reference.md`
> 본 문서는 진행률·우선순위 한눈에 보기용.

Last Updated: 2026-05-12 (concern-obese-senior·tool-routine·process-flow description 정밀화. manus-generated 시리즈 4장 자산 확보 — `mungmung-photos/manus-generated/2026-05-12-erector-spinae-{1..4}.png`은 사진 슬롯 시스템 외부에서 블로그 본문에 직접 사용 중)

---

## 📊 전체 진행률

| 우선순위 | 슬롯 수 | 채워짐 | 진행률 |
|----------|---------|--------|--------|
| 🥇 P1 (가장 시급) | 9 | 8 | 89% |
| 🥈 P2 (AI 가능) | 7 | 0 | 0% |
| 🥉 P3 (BeforeAfter) | 6 | 0 | 0% |
| **전체** | **22** | **8** | **36%** |

(*P1에서 #4 메이 액션만 미해결 — 메이 사진 부재. #10 보호자 집 루틴은 별도 촬영 필요로 분류*)

---

## 🥇 Priority 1 — 주인님 직접 촬영 필요 (9개)

### Hero (3개)

| 슬롯 | 번호 | 필요한 사진 | 상태 |
|------|------|------------|------|
| `hero-1` | #1 | 메인 (현재 `main.jpg` 사용 중) | ✅ 채워짐 |
| `hero-2` | #2 | 독피트니스 도구 사용 액션샷 | ✅ `new4_004.jpg` |
| `hero-3` | #3 | 비포애프터 / 수업 후 컷 | ✅ `DPyK9B6kta8_5.jpg` |

### TrainerProfile (1개)

| 슬롯 | 번호 | 필요한 사진 | 상태 |
|------|------|------------|------|
| `mei-action` | #4 | 헬퍼견 메이 수업 참여 모습 | ⚠️ **메이 사진 없음** — 별도 촬영 |

### 독피트니스 도구 6종 🔥

| 슬롯 | 번호 | 도구 | 상태 |
|------|------|------|------|
| `tool-balance-ball` | #5 | 밸런스볼·스텝업 박스 | ✅ `new3_016.jpg` |
| `tool-cavaletti` | #6 | 카발레티 | ✅ `new4_002.jpg` |
| `tool-fitpaws` | #7 | 균형 디스크·도넛 (FitPaws 라벨 재검토) | ✅ `DQta7c_kkkm_8.jpg` |
| `tool-proprioception` | #8 | 프로프리오셉션 매트 | ✅ `new4_006.jpg` |
| `tool-hurdle` | #9 | 콘 허들·점프 박스 | ✅ `DQGzZQSkvFr_3.jpg` |
| `tool-routine` | #10 | 보호자 5분 루틴 (집 환경) | ⚠️ 별도 촬영 필요 |

---

## 🥈 Priority 2 — Manus Nano Banana 생성 가능 (7개)

### 대상 강아지 일러스트 (6개)

| 슬롯 | 번호 | 대상 | 상태 |
|------|------|------|------|
| `target-obese` | #11 | 비만 강아지 | ⏳ 대기 |
| `target-senior` | #12 | 노령견 | ⏳ 대기 |
| `target-shy` | #13 | 소심한 강아지 | ⏳ 대기 |
| `target-energetic` | #14 | 활동량 많은 견종 | ⏳ 대기 |
| `target-puppy` | #15 | 퍼피 사회화 | ⏳ 대기 |
| `target-leash` | #16 | 줄당김 강아지 | ⏳ 대기 |

### Process 인포그래픽 (1개)

| 슬롯 | 번호 | 내용 | 상태 |
|------|------|------|------|
| `process-flow` | #17 | 상담→평가→수업→루틴 4단계 가로 | ⏳ 대기 |

---

## 🥉 Priority 3 — 비포애프터 3쌍 (6개)

| 슬롯 | 번호 | 위치 | 상태 |
|------|------|------|------|
| `before-1` / `after-1` | #18/#19 | BeforeAfter 케이스 1 | ⏳ 대기 |
| `before-2` / `after-2` | #20/#21 | BeforeAfter 케이스 2 | ⏳ 대기 |
| `before-3` / `after-3` | #22/#23 | BeforeAfter 케이스 3 | ⏳ 대기 |

---

## 🔄 사진 받았을 때 반영 절차

1. 파일을 `/public/images/slots/{slot-id}.{ext}` 에 저장
2. `content/placeholders.ts` 해당 슬롯의 `src: null` → `src: "/images/slots/{slot-id}.jpg"`
3. dev 서버 자동 갱신
4. 본 문서 ⏳ → ✅
5. `git add public/images/slots content/placeholders.ts docs/status/PHOTO-SLOTS-STATUS.md`
6. `git commit -m "feat(photos): 슬롯 #N 채움"`
7. `git push` → Vercel 자동 배포

---

## 🤖 자동화 (예정)

봇 명령어 `/슬롯 [번호]` (사진 첨부) 구현되면:
- 위 7단계가 1단계로 압축
- 텔레그램으로 사진 + "/슬롯 5" → 자동 저장·반영·푸시
