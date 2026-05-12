// 멍멍피트 사진 슬롯 레지스트리
//
// ✅ 사용법:
//   1. 사이트에 각 슬롯이 번호와 함께 보임 (#1, #2, ...)
//   2. 주인님이 사진 받으면 "사진 X를 #N에 넣어줘" 라고 말씀
//   3. src 필드에 경로 채우면 자동 반영
//
// 📁 사진 저장 위치: /public/images/slots/{slot-id}.jpg

export type PhotoSlotDef = {
  /** 시각적 번호 (사이트에 표시됨) */
  number: number;
  /** 섹션 위치 */
  section: string;
  /** 어떤 사진이 필요한지 설명 */
  description: string;
  /** alt text (SEO용) */
  alt: string;
  /** 화면비 (1:1, 4:5, 16:9 등) */
  aspect: "1/1" | "4/5" | "3/4" | "16/9" | "3/2";
  /** 실제 파일 경로 (null이면 placeholder 표시) */
  src: string | null;
  /** 우선순위 (1=가장 시급) */
  priority: 1 | 2 | 3;
  /** 누가 만드는지 */
  source: "owner-photo" | "ai-generated" | "existing";
};

export const photoSlots: Record<string, PhotoSlotDef> = {
  // ─── Hero 슬라이드쇼 (3장) ───────────────────────────
  "hero-1": {
    number: 1,
    section: "Hero",
    description: "메인 히어로 (강아지 + 메이 또는 수업 현장 와이드샷)",
    alt: "독피트니스 방문훈련 메인 사진",
    aspect: "1/1",
    src: "/images/training/main.jpg", // 기존 사진 활용
    priority: 1,
    source: "existing",
  },
  "hero-2": {
    number: 2,
    section: "Hero",
    description: "독피트니스 도구 사용 액션샷 (예: 밸런스볼 위 강아지)",
    alt: "강아지 카발레티 보행 훈련 액션",
    aspect: "1/1",
    src: "/images/slots/hero-2.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "hero-3": {
    number: 3,
    section: "Hero",
    description: "비포애프터 또는 수업 후 보호자와 강아지 컷",
    alt: "푸들 카발레티 운동 후 트레이너 핸들링",
    aspect: "1/1",
    src: "/images/slots/hero-3.jpg",
    priority: 2,
    source: "owner-photo",
  },

  // ─── 메이 수업 참여 ─────────────────────────────────
  "mei-action": {
    number: 4,
    section: "TrainerProfile",
    description: "헬퍼견 메이가 수업에 참여하는 모습 (다른 강아지와 함께)",
    alt: "헬퍼견 메이가 사회화 수업에 함께 참여",
    aspect: "4/5",
    src: null,
    priority: 1,
    source: "owner-photo",
  },

  // ─── 독피트니스 도구 6종 (가장 시급) ────────────────
  "tool-balance-ball": {
    number: 5,
    section: "DogFitnessTools",
    description: "밸런스볼·스텝업 박스 클로즈업 (도구 단독 또는 강아지 사용 중)",
    alt: "강아지 균형 운동용 스텝업 박스",
    aspect: "1/1",
    src: "/images/slots/tool-balance-ball.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "tool-cavaletti": {
    number: 6,
    section: "DogFitnessTools",
    description: "카발레티(낮은 봉 5~6개 일렬) 사진",
    alt: "강아지 보행 훈련 카발레티 콘 세팅",
    aspect: "1/1",
    src: "/images/slots/tool-cavaletti.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "tool-fitpaws": {
    number: 7,
    section: "DogFitnessTools",
    description: "균형 디스크·도넛 클로즈업",
    alt: "강아지 균형 디스크 코어 운동",
    aspect: "1/1",
    src: "/images/slots/tool-fitpaws.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "tool-proprioception": {
    number: 8,
    section: "DogFitnessTools",
    description: "프로프리오셉션 패드 (감각 자극용 매트)",
    alt: "강아지 발바닥 감각 자극 프로프리오셉션 매트",
    aspect: "1/1",
    src: "/images/slots/tool-proprioception.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "tool-hurdle": {
    number: 9,
    section: "DogFitnessTools",
    description: "허들·점프 박스 사진",
    alt: "강아지 콘 허들 점프 훈련 라인",
    aspect: "1/1",
    src: "/images/slots/tool-hurdle.jpg",
    priority: 1,
    source: "owner-photo",
  },
  "tool-routine": {
    number: 10,
    section: "DogFitnessTools",
    description: "보호자가 집에서 강아지와 5분 루틴 수행 (쿠션·매트 활용). 거실 톤, 자연광, 다른 도구 카드와 같은 1:1 비율 클로즈업.",
    alt: "보호자가 집에서 진행하는 강아지 5분 코어 루틴",
    aspect: "1/1",
    src: null,
    priority: 2,
    source: "owner-photo",
  },

  // ─── 대상 강아지 6종 (Nano Banana로 일러스트 가능) ──
  "target-obese": {
    number: 11,
    section: "TargetDogs",
    description: "비만·과체중 강아지 일러스트 또는 실제 사진",
    alt: "비만 강아지 다이어트 독피트니스 대상",
    aspect: "1/1",
    src: "/images/slots/target-obese.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "target-senior": {
    number: 12,
    section: "TargetDogs",
    description: "노령견 일러스트 또는 사진",
    alt: "노령견 재활 독피트니스 대상",
    aspect: "1/1",
    src: "/images/slots/target-senior.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "target-shy": {
    number: 13,
    section: "TargetDogs",
    description: "소심한·자신감 부족 강아지 일러스트",
    alt: "소심한 강아지 자신감 훈련 대상",
    aspect: "1/1",
    src: "/images/slots/target-shy.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "target-energetic": {
    number: 14,
    section: "TargetDogs",
    description: "활동량 많은 견종 (보더콜리·말리노이즈 등) 일러스트",
    alt: "활동량 많은 강아지 체력 배출 운동 대상",
    aspect: "1/1",
    src: "/images/slots/target-energetic.jpg",
    priority: 3,
    source: "ai-generated",
  },
  "target-puppy": {
    number: 15,
    section: "TargetDogs",
    description: "퍼피 사회화기 강아지 일러스트",
    alt: "퍼피 사회화기 8주~16주 환경 자신감 대상",
    aspect: "1/1",
    src: "/images/slots/target-puppy.jpg",
    priority: 3,
    source: "ai-generated",
  },
  "target-leash": {
    number: 16,
    section: "TargetDogs",
    description: "줄당김·산책 짖음 강아지 일러스트",
    alt: "줄당김 강아지 산책 교정 대상",
    aspect: "1/1",
    src: "/images/slots/target-leash.jpg",
    priority: 3,
    source: "ai-generated",
  },

  // ─── Concerns 4종 (8→4 압축, 사진 카드) ─────────────
  "concern-obese-senior": {
    number: 24,
    section: "Concerns",
    description: "체중 관리 중인 강아지 또는 노령견이 천천히 산책하는 모습 (불독·퍼그처럼 견종 정상 체형은 피할 것)",
    alt: "체중 관리·노령견 케어가 필요한 강아지",
    aspect: "1/1",
    src: "/images/slots/concern-obese-senior.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "concern-leash": {
    number: 25,
    section: "Concerns",
    description: "산책 중 줄당김·짖음 강아지 모습",
    alt: "산책 줄당김 짖음 강아지",
    aspect: "1/1",
    src: "/images/slots/concern-leash.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "concern-confidence": {
    number: 26,
    section: "Concerns",
    description: "낯선 환경 무서워하는 강아지 (계단·차·낯선 바닥)",
    alt: "환경 자신감 부족 강아지",
    aspect: "1/1",
    src: "/images/slots/concern-confidence.jpg",
    priority: 2,
    source: "ai-generated",
  },
  "concern-handler": {
    number: 27,
    section: "Concerns",
    description: "보호자가 강아지 옆에서 고민하는 모습",
    alt: "보호자 핸들링 고민",
    aspect: "1/1",
    src: "/images/slots/concern-handler.jpg",
    priority: 2,
    source: "ai-generated",
  },

  // ─── Process 인포그래픽 1장 ─────────────────────────
  "process-flow": {
    number: 17,
    section: "Process",
    description: "상담(Consultation)→평가(Assessment)→수업(Class)→루틴(Routine) 4단계 가로 인포그래픽. 배경 크림(#faf9f5), 강조 그린(#1c4032), 단계 사이 화살표. 단계마다 작은 아이콘(전화·체크·도구·집).",
    alt: "멍멍피트 수업 4단계 프로세스 — 상담 평가 수업 루틴",
    aspect: "16/9",
    src: null,
    priority: 2,
    source: "ai-generated",
  },

  // ─── 지역 페이지 헤더 이미지 4개 ────────────────────
  "area-seoul": {
    number: 29,
    section: "Areas",
    description: "서울 지역 수업 또는 산책 현장",
    alt: "서울 강아지 방문훈련 지역",
    aspect: "16/9",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "area-gyeonggi": {
    number: 30,
    section: "Areas",
    description: "경기 지역 수업 현장",
    alt: "경기 강아지 방문훈련 지역",
    aspect: "16/9",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "area-incheon": {
    number: 31,
    section: "Areas",
    description: "인천 지역 수업 현장",
    alt: "인천 강아지 방문훈련 지역",
    aspect: "16/9",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "area-chungcheong": {
    number: 32,
    section: "Areas",
    description: "충청 지역 수업 현장",
    alt: "충청 강아지 방문훈련 지역",
    aspect: "16/9",
    src: null,
    priority: 3,
    source: "owner-photo",
  },

  // ─── 비포·애프터 3쌍 (신규 섹션) ─────────────────────
  "before-1": {
    number: 18,
    section: "BeforeAfter",
    description: "BEFORE 1: 수업 전 강아지 (줄당김/짖음/회피 등 문제 상황)",
    alt: "수업 전 강아지 문제행동 비포",
    aspect: "1/1",
    src: null,
    priority: 2,
    source: "owner-photo",
  },
  "after-1": {
    number: 19,
    section: "BeforeAfter",
    description: "AFTER 1: 같은 강아지 수업 후 (편안한·안정된 모습)",
    alt: "수업 후 강아지 안정된 변화 애프터",
    aspect: "1/1",
    src: null,
    priority: 2,
    source: "owner-photo",
  },
  "before-2": {
    number: 20,
    section: "BeforeAfter",
    description: "BEFORE 2: 다른 케이스 수업 전",
    alt: "수업 전 강아지 두 번째 케이스 비포",
    aspect: "1/1",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "after-2": {
    number: 21,
    section: "BeforeAfter",
    description: "AFTER 2: 다른 케이스 수업 후",
    alt: "수업 후 강아지 두 번째 케이스 애프터",
    aspect: "1/1",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "before-3": {
    number: 22,
    section: "BeforeAfter",
    description: "BEFORE 3: 세 번째 케이스 비포",
    alt: "수업 전 강아지 세 번째 케이스 비포",
    aspect: "1/1",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
  "after-3": {
    number: 23,
    section: "BeforeAfter",
    description: "AFTER 3: 세 번째 케이스 애프터",
    alt: "수업 후 강아지 세 번째 케이스 애프터",
    aspect: "1/1",
    src: null,
    priority: 3,
    source: "owner-photo",
  },
};

/**
 * 슬롯 ID로 사진 정보 가져오기
 */
export function getSlot(id: keyof typeof photoSlots): PhotoSlotDef {
  return photoSlots[id];
}

/**
 * 모든 채워야 할 슬롯 목록 (priority 순)
 */
export function getPendingSlots(): Array<PhotoSlotDef & { id: string }> {
  return Object.entries(photoSlots)
    .filter(([, slot]) => slot.src === null)
    .map(([id, slot]) => ({ id, ...slot }))
    .sort((a, b) => a.priority - b.priority || a.number - b.number);
}
