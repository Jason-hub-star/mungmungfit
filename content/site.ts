export const site = {
  name: "멍멍피트",
  englishName: "Mungmungfit",
  trainerName: "김주영",
  trainerTitle: "김주영 독피트니스 트레이너",
  phoneDisplay: "010-2609-6593",
  phoneHref: "tel:01026096593",
  kakaoUrl: "https://open.kakao.com/o/sOGIVLxe",
  defaultUrl: "https://mungmungfit.kr",
  description:
    "멍멍피트는 김주영 독피트니스 트레이너가 진행하는 강아지 방문교육 서비스입니다. 독피트니스와 보호자 핸들링 수업을 결합해 자신감 부족에서 시작되는 문제행동을 생활 공간에서 함께 다룹니다.",
  areas: "하남, 서울, 경기, 인천, 충청",
};

export const credentials = [
  "CSCC 국제 독피트니스 트레이너",
  "현 브리딩 방문교육 훈련사",
  "전 LG유플러스 포동 훈련사",
  "돌고래 훈련사 경력",
  "지자체 반려동물 행사 진행",
];

export const concerns = [
  "산책 중 사람이나 강아지를 보고 짖어요",
  "줄을 당기고 보호자와 호흡이 맞지 않아요",
  "낯선 공간에서 긴장하거나 움츠러들어요",
  "실내외 자극에 쉽게 흥분해요",
  "입질이나 반항처럼 보이는 행동이 있어요",
  "보호자가 어떻게 핸들링해야 할지 모르겠어요",
];

export const methods = [
  {
    title: "강아지 몸 사용 능력 향상",
    body: "균형, 중심 이동, 발 사용, 자세 안정감을 통해 환경에 대한 자신감을 키웁니다.",
  },
  {
    title: "보호자 핸들링 스킬 향상",
    body: "리드줄, 보상 타이밍, 거리 조절, 움직임 유도를 보호자가 직접 익힙니다.",
  },
  {
    title: "생활 환경 기반 방문교육",
    body: "집, 엘리베이터, 산책로처럼 실제 문제가 생기는 공간에서 수업합니다.",
  },
];

export const trainingProcess = [
  {
    title: "상담",
    body: "현재 고민, 생활환경, 산책 루틴을 함께 확인하며 시작점을 잡습니다.",
  },
  {
    title: "평가",
    body: "몸 사용, 긴장도, 보호자 핸들링, 문제 상황을 직접 관찰합니다.",
  },
  {
    title: "수업",
    body: "독피트니스, 행동수정, 보호자 실습을 한 수업 안에서 함께 진행합니다.",
  },
  {
    title: "루틴 제공",
    body: "집과 산책에서 반복할 수 있는 연습 과제를 정리해 드립니다.",
  },
];

export const servicePages = [
  {
    slug: "dog-fitness",
    title: "강아지 독피트니스 방문수업",
    h1: "강아지 독피트니스 방문수업",
    description:
      "강아지가 몸을 자유롭게 쓰는 경험을 쌓아 자신감과 안정감을 키우는 방문 독피트니스 수업입니다.",
    keywords: ["강아지 피트니스", "독피트니스", "강아지 자신감 훈련"],
  },
  {
    slug: "home-training",
    title: "강아지 방문교육",
    h1: "생활 공간에서 진행하는 강아지 방문교육",
    description:
      "집, 엘리베이터, 산책로처럼 실제 문제가 생기는 공간에서 보호자와 함께 훈련합니다.",
    keywords: ["강아지 방문교육", "방문훈련", "강아지 문제행동"],
  },
  {
    slug: "walk-training",
    title: "강아지 산책교육",
    h1: "줄당김과 짖음이 있는 강아지 산책교육",
    description:
      "리드줄 핸들링, 거리 조절, 보상 타이밍을 보호자가 직접 익혀 산책 자신감을 키웁니다.",
    keywords: ["강아지 산책교육", "줄당김 교육", "산책 짖음"],
  },
  {
    slug: "puppy-training",
    title: "퍼피 기초 방문교육",
    h1: "퍼피 기초 방문교육",
    description:
      "어린 강아지가 생활 규칙과 보호자 핸들링을 안정적으로 익히도록 돕는 방문교육입니다.",
    keywords: ["퍼피 교육", "강아지 기초교육", "새끼강아지 방문교육"],
  },
] as const;

export const areaPages = [
  {
    slug: "hanam",
    name: "하남",
    title: "하남 강아지 방문교육",
    description:
      "하남, 미사 지역은 기본 수업료 9만원 기준으로 강아지 방문교육과 독피트니스 수업을 진행합니다.",
    fee: "하남/미사 출장비 없음, 수업료 90,000원",
  },
  {
    slug: "seoul",
    name: "서울",
    title: "서울 강아지 방문교육",
    description:
      "서울 지역 강아지 방문교육은 하남 기준 수업료에 이동 시간과 거리를 반영한 출장비를 안내합니다.",
    fee: "수업료 90,000원 + 출장비 상담 후 안내",
  },
  {
    slug: "gyeonggi",
    name: "경기",
    title: "경기 강아지 방문교육",
    description:
      "경기권 강아지 방문교육과 독피트니스 수업은 실제 생활 동선과 산책 환경에서 진행합니다.",
    fee: "수업료 90,000원 + 출장비 20,000~50,000원 기준",
  },
  {
    slug: "incheon",
    name: "인천",
    title: "인천 강아지 방문교육",
    description:
      "인천 지역은 이동 거리와 시간에 따라 출장비를 안내하고 방문 독피트니스 수업을 진행합니다.",
    fee: "수업료 90,000원 + 출장비 상담 후 안내",
  },
  {
    slug: "chungcheong",
    name: "충청",
    title: "충청도 강아지 방문교육",
    description:
      "충청권 장거리 방문교육은 일정과 이동 조건을 상담한 뒤 독피트니스 기반 수업 가능 여부를 안내합니다.",
    fee: "장거리 출장비 상담 후 안내",
  },
] as const;

export const reviews = [
  {
    title: "산책 짖음과 줄당김 수업",
    body: "리드줄을 제대로 잡는 방법과 도구 사용법을 배웠어요. 보호자가 집에서도 반복 연습할 수 있는 동작들을 차근차근 알려줘서 많이 도움이 됐습니다.",
    tags: ["산책교육", "핸들링", "친절한 설명"],
  },
  {
    title: "실내외 자극 반응 수업",
    body: "우리 아이가 사람을 보고 짖을 때 거리를 어떻게 조절하고 언제 보상을 줄지 실제로 배웠어요. 이제 산책이 훨씬 덜 힘들어졌습니다.",
    tags: ["짖음", "거리조절", "보호자 실습"],
  },
  {
    title: "배변 공간과 생활 루틴 점검",
    body: "집에서 문제가 되는 상황을 선생님이 직접 보고 그 자리에서 바로 해결 방법을 보여주셨어요. 현장에서 바로 적용하니 효과가 빨랐습니다.",
    tags: ["방문교육", "생활환경", "루틴"],
  },
];

export const brandImages = {
  hero: {
    src: "/images/training/main.jpg",
    alt: "강아지 방문 독피트니스 메인 수업 사진",
  },
  trainer: {
    src: "/images/training/trainer.jpg",
    alt: "김주영 독피트니스 트레이너 사진",
  },
  certificate: {
    src: "/images/training/certificate.jpg",
    alt: "CSCC 국제 독피트니스 트레이너 자격증 사진",
  },
};

import galleryData from "./gallery.json" assert { type: "json" };

export interface GallerySession {
  date: string;
  src: string;
  alt: string;
  description: string;
}

// 파이프라인이 추가한 세션 + 기존 로컬 이미지 fallback
const sessionGallery: GallerySession[] = galleryData.sessions;

const localFallback = Array.from({ length: 25 }, (_, index) => ({
  date: "",
  src: `/images/training/training-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `멍멍피트 강아지 방문교육 훈련사진 ${index + 1}`,
  description: "",
}));

export const trainingGallery: GallerySession[] =
  sessionGallery.length > 0 ? sessionGallery : localFallback;

export const methodImages = [
  {
    src: "/images/training/method-body-use.jpg",
    alt: "강아지 몸 사용 능력 향상 독피트니스 수업 사진",
  },
  {
    src: "/images/training/method-handling.jpg",
    alt: "보호자 핸들링 스킬 향상 수업 사진",
  },
  {
    src: "/images/training/training-16.jpg",
    alt: "생활 환경 기반 강아지 방문교육 수업 사진",
  },
];

export const featuredGallery = [
  {
    src: "/images/training/gallery-dogfitness-01.jpg",
    alt: "멍멍피트 독피트니스 수업 사진 1",
    label: "독피트니스",
  },
  {
    src: "/images/training/gallery-dogfitness-02.jpg",
    alt: "멍멍피트 독피트니스 수업 사진 2",
    label: "독피트니스",
  },
  {
    src: "/images/training/gallery-guardian-practice.jpg",
    alt: "멍멍피트 보호자 실습 수업 사진",
    label: "보호자 실습",
  },
  {
    src: "/images/training/gallery-walk-handling.jpg",
    alt: "멍멍피트 산책 핸들링 수업 사진",
    label: "산책 핸들링",
  },
  {
    src: "/images/training/training-01.jpg",
    alt: "멍멍피트 강아지 방문교육 대표 수업 사진",
    label: "대표 수업 사진",
  },
  {
    src: "/images/training/training-03.jpg",
    alt: "멍멍피트 독피트니스 도구 수업 사진",
    label: "독피트니스",
  },
];

const reviewImageHeights = [
  1106, 736, 529, 1647, 745, 663, 539, 246, 489, 446, 577, 977, 1132, 833,
  1314, 539, 790, 680, 758, 834, 585, 1034, 507,
];

export const reviewImages = Array.from({ length: 23 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/images/reviews/review-${number}.jpg`,
    alt: `멍멍피트 강아지 방문교육 후기 ${index + 1}`,
    width: 1080,
    height: reviewImageHeights[index] ?? 1080,
  };
});

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? site.defaultUrl;
}
