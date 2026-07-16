# 멍멍피트 사진 슬롯 매핑표

> 사용법: 사진 준비되면 "이 사진을 #5에 넣어줘"처럼 번호로 알려주세요.
> 정본은 `content/placeholders.ts`이고, 화면에는 빈 슬롯과 채워진 슬롯 모두 번호 배지가 표시됩니다.
>
> 사진 저장 경로: `/public/images/slots/{slot-id}.jpg`

---

## 현재 대기 슬롯

| 번호 | 슬롯 ID | 위치 | 필요한 사진 | 화면비 |
|------|---------|------|------------|--------|
| **#18** | `before-1` | 비포애프터 | BEFORE 1: 수업 전 문제 상황 | 1:1 |
| **#19** | `after-1` | 비포애프터 | AFTER 1: 같은 강아지 수업 후 안정된 모습 | 1:1 |
| **#20** | `before-2` | 비포애프터 | BEFORE 2: 두 번째 케이스 수업 전 | 1:1 |
| **#21** | `after-2` | 비포애프터 | AFTER 2: 두 번째 케이스 수업 후 | 1:1 |
| **#22** | `before-3` | 비포애프터 | BEFORE 3: 세 번째 케이스 수업 전 | 1:1 |
| **#23** | `after-3` | 비포애프터 | AFTER 3: 세 번째 케이스 수업 후 | 1:1 |
| **#29** | `area-seoul` | 지역 페이지 | 서울 지역 수업 또는 산책 현장 | 16:9 |
| **#30** | `area-gyeonggi` | 지역 페이지 | 경기 지역 수업 현장 | 16:9 |
| **#31** | `area-incheon` | 지역 페이지 | 인천 지역 수업 현장 | 16:9 |
| **#32** | `area-chungcheong` | 지역 페이지 | 충청 지역 수업 현장 | 16:9 |

> #4는 트레이너 섹션 슬롯 삭제, #17은 프로세스 사진 슬롯 삭제, #28은 하남 지역 슬롯 제거로 retired 처리합니다. 기존 번호 참조가 섞이지 않도록 재사용하지 않습니다.

---

## 채워진 슬롯

### Hero

| 번호 | 슬롯 ID | 위치 | 현재 이미지 |
|------|---------|------|-------------|
| **#1** | `hero-1` | Hero 메인 | `/images/slots/hero-1.jpg` |
| **#2** | `hero-2` | Hero 보조 | `/images/slots/hero-2.jpg` |
| **#3** | `hero-3` | Hero 보조 | `/images/slots/hero-3.jpg` |

### 독피트니스 도구

| 번호 | 슬롯 ID | 도구 | 현재 이미지 |
|------|---------|------|-------------|
| **#5** | `tool-balance-ball` | 밸런스 플랫폼·스텝 | `/images/slots/tool-balance-ball.jpg` |
| **#6** | `tool-cavaletti` | 카발레티 | `/images/slots/tool-cavaletti.jpg` |
| **#7** | `tool-fitpaws` | 균형 디스크·도넛 | `/images/slots/tool-fitpaws.jpg` |
| **#8** | `tool-proprioception` | 감각 패드·블록 | `/images/slots/tool-proprioception.jpg` |
| **#9** | `tool-hurdle` | 낮은 바·매트 | `/images/slots/tool-hurdle.jpg` |
| **#10** | `tool-routine` | 보호자 루틴 | `/images/slots/tool-routine.jpg` |

### 대상 강아지

| 번호 | 슬롯 ID | 대상 | 현재 이미지 |
|------|---------|------|-------------|
| **#11** | `target-obese` | 체중 관리 | `/images/slots/target-obese.jpg` |
| **#12** | `target-senior` | 노령견 | `/images/slots/target-senior.jpg` |
| **#13** | `target-shy` | 소심한 강아지 | `/images/slots/target-shy.jpg` |
| **#14** | `target-energetic` | 활동량 많은 견종 | `/images/slots/target-energetic.jpg` |
| **#15** | `target-puppy` | 퍼피 사회화 | `/images/slots/target-puppy.jpg` |
| **#16** | `target-leash` | 줄당김·산책 짖음 | `/images/slots/target-leash.jpg` |

### 고민 카드

| 번호 | 슬롯 ID | 위치 | 현재 이미지 |
|------|---------|------|-------------|
| **#24** | `concern-obese-senior` | 노령·운동 부족 고민 | `/images/slots/concern-obese-senior.jpg` |
| **#25** | `concern-leash` | 산책 줄당김·짖음 | `/images/slots/concern-leash.jpg` |
| **#26** | `concern-confidence` | 환경 자신감 부족 | `/images/slots/concern-confidence.jpg` |
| **#27** | `concern-handler` | 보호자 핸들링 고민 | `/images/slots/concern-handler.jpg` |

---

## 사진 받았을 때 워크플로우

1. 번호로 슬롯을 찾습니다. 예: `#5` → `tool-balance-ball`.
2. 사진을 `/Users/family/jason/mungmungfit/public/images/slots/{slot-id}.jpg`에 저장합니다.
3. `content/placeholders.ts`에서 해당 슬롯의 `src`를 `/images/slots/{slot-id}.jpg`로 맞춥니다.
4. 캐시가 남을 수 있으면 `?v=YYYYMMDD-N`을 붙입니다.
5. `npm run typecheck`를 실행합니다.
6. 로컬 사이트에서 해당 번호 배지가 그대로 보이는지 확인합니다.

## 전체 슬롯 ID 매핑표

```text
#1  -> hero-1
#2  -> hero-2
#3  -> hero-3
#4  -> retired
#5  -> tool-balance-ball
#6  -> tool-cavaletti
#7  -> tool-fitpaws
#8  -> tool-proprioception
#9  -> tool-hurdle
#10 -> tool-routine
#11 -> target-obese
#12 -> target-senior
#13 -> target-shy
#14 -> target-energetic
#15 -> target-puppy
#16 -> target-leash
#17 -> retired
#18 -> before-1
#19 -> after-1
#20 -> before-2
#21 -> after-2
#22 -> before-3
#23 -> after-3
#24 -> concern-obese-senior
#25 -> concern-leash
#26 -> concern-confidence
#27 -> concern-handler
#28 -> retired
#29 -> area-seoul
#30 -> area-gyeonggi
#31 -> area-incheon
#32 -> area-chungcheong
```

최종 수정: 2026-05-27
