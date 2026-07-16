import casesData from "./cases.json" assert { type: "json" };
import galleryData from "./gallery.json" assert { type: "json" };
import siteContent from "./site-content.json" assert { type: "json" };

export const site = siteContent.site;
export const credentials = siteContent.credentials;
export const eventOffer = siteContent.eventOffer;
export const trustStats = siteContent.trustStats;
export const guarantees = siteContent.guarantees;
export const comparisonRows = siteContent.comparisonRows;
export const concerns = siteContent.concerns;
export const methods = siteContent.methods;
export const dogFitnessTools = siteContent.dogFitnessTools;
export const targetDogs = siteContent.targetDogs;
export const faqs = siteContent.faqs;
export const trainingProcess = siteContent.trainingProcess;
export const servicePages = siteContent.servicePages;
export const areaPages = siteContent.areaPages;
export const reviews = siteContent.reviews;
export const businessInfo = siteContent.businessInfo;
export const cases = casesData.cases;
export type CaseStudy = (typeof cases)[number];
export const brandImages = siteContent.brandImages;
export const methodImages = siteContent.methodImages;
export const featuredGallery = siteContent.featuredGallery;
export const pageContent = siteContent.pageContent;
export const intakeForm = siteContent.intakeForm;

/**
 * 노출용 사업장 주소 (시·구 단위까지만). 상세 주소는 주거지 보호 차원에서 노출 X.
 * Footer, /privacy, /terms 책임자/공급자 영역에서 공통 사용.
 */
export function getBusinessAddressDisplay(): string {
  return [businessInfo.address.addressRegion, businessInfo.address.addressLocality]
    .filter(Boolean)
    .join(" ");
}

/**
 * 후기 평균 별점 + 리뷰 수 계산. AggregateRating JSON-LD 부착에 사용.
 * rating 필드가 빠진 후기는 무시. 빈 배열이면 null 반환 (graceful).
 */
export function getAggregateRating() {
  const rated = reviews.filter(
    (r): r is typeof r & { rating: number } =>
      typeof (r as { rating?: unknown }).rating === "number",
  );
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, r) => acc + r.rating, 0);
  return {
    ratingValue: Number((sum / rated.length).toFixed(2)),
    reviewCount: rated.length,
    bestRating: 5,
    worstRating: 1,
  };
}

/**
 * 후기 1건 → schema.org Review JSON-LD 객체.
 * itemReviewed는 호출자(LocalBusiness 또는 Service)에서 주입.
 */
export function buildReviewJsonLd(
  review: (typeof reviews)[number],
  itemReviewed: { "@type": string; name: string; url?: string },
) {
  const r = review as typeof review & {
    rating?: number;
    datePublished?: string;
    authorName?: string;
  };
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed,
    reviewBody: r.body,
    name: r.title,
    author: {
      "@type": "Person",
      name: r.authorName ?? "보호자(익명)",
    },
    ...(typeof r.rating === "number"
      ? {
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(r.datePublished ? { datePublished: r.datePublished } : {}),
  };
}

/**
 * LocalBusiness 공통 필드를 graceful로 조립.
 * 사용자 미입력 항목(주소·이메일·SNS)은 자동 생략.
 * 호출자는 founder/makesOffer/contactPoint 등 페이지 고유 필드를 spread로 덧붙인다.
 */
export function buildLocalBusinessJsonLd(opts: {
  name?: string;
  url: string;
  description: string;
  image?: string;
  areaServed?: string | string[];
  geo?: { latitude: number; longitude: number };
  addressRegionOverride?: string;
}): Record<string, unknown> {
  const info = businessInfo;
  const agg = getAggregateRating();
  const region = opts.addressRegionOverride ?? info.address.addressRegion;
  const sns = info.sameAs ?? [];

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: opts.name ?? site.name,
    alternateName: site.englishName,
    url: opts.url,
    logo: `${getSiteUrl()}/images/brand/mungmungfit-icon.png`,
    telephone: site.phoneHref.replace(/^tel:/, "").replace(/^0/, "+82-").replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3"),
    priceRange: "89000 KRW~",
    description: opts.description,
    areaServed: opts.areaServed ?? ["서울", "경기", "인천", "충청도"],
  };

  if (opts.image) node.image = opts.image;

  if (region || info.address.addressLocality || info.address.streetAddress) {
    node.address = {
      "@type": "PostalAddress",
      addressCountry: info.address.country ?? "KR",
      ...(region ? { addressRegion: region } : {}),
      ...(info.address.addressLocality
        ? { addressLocality: info.address.addressLocality }
        : {}),
      ...(info.address.streetAddress
        ? { streetAddress: info.address.streetAddress }
        : {}),
      ...(info.address.postalCode ? { postalCode: info.address.postalCode } : {}),
    };
  }

  if (opts.geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: opts.geo.latitude,
      longitude: opts.geo.longitude,
    };
  }

  if (Array.isArray(info.openingHoursSpec) && info.openingHoursSpec.length > 0) {
    node.openingHoursSpecification = info.openingHoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    }));
  }

  if (sns.length > 0) {
    node.sameAs = sns;
  }

  if (agg) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: agg.ratingValue,
      reviewCount: agg.reviewCount,
      bestRating: agg.bestRating,
      worstRating: agg.worstRating,
    };
  }

  return node;
}

/**
 * 트레이너 김주영 Person JSON-LD. /about·메인에서 재사용.
 * sameAs는 businessInfo.sameAs를 자동 흡수.
 */
export function buildPersonJsonLd(opts: {
  url: string;
  image: string;
  description: string;
}) {
  const sns = businessInfo.sameAs ?? [];
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.trainerName,
    jobTitle: site.trainerTitle,
    image: opts.image,
    url: opts.url,
    description: opts.description,
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: getSiteUrl(),
    },
    knowsAbout: [
      "독피트니스",
      "Canine Fitness",
      "강아지 코어 운동",
      "강아지 균형 훈련",
      "강아지 재활",
      "퍼피 사회화",
      "보호자 핸들링",
    ],
    award: [...credentials],
  };
  if (sns.length > 0) node.sameAs = sns;
  return node;
}

/**
 * 케이스 스터디 1건 → Article JSON-LD.
 * guardianQuote가 있으면 review 필드로 부착 (보호자 인용 = Review).
 * isDraft=true이면 publisher만 두고 schema는 그대로 부착 (sitemap에서 priority 낮춤).
 */
export function buildCaseStudyJsonLd(study: CaseStudy, siteUrl: string) {
  const url = `${siteUrl}/cases/${study.slug}`;
  const articleBodyParts = [
    `문제: ${study.problem}`,
    `접근: ${study.approach.join(" / ")}`,
    `결과: ${study.outcome}`,
  ];

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    image: study.coverImage ? `${siteUrl}${study.coverImage}` : undefined,
    author: {
      "@type": "Person",
      name: site.trainerName,
      jobTitle: site.trainerTitle,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    datePublished: study.datePublished,
    dateModified: study.datePublished,
    articleBody: articleBodyParts.join("\n\n"),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: study.tags.join(", "),
  };

  if (study.guardianQuote) {
    node.review = {
      "@type": "Review",
      reviewBody: study.guardianQuote,
      author: { "@type": "Person", name: "보호자(익명)" },
      itemReviewed: {
        "@type": "LocalBusiness",
        name: site.name,
        url: siteUrl,
      },
    };
  }

  return node;
}

export interface GallerySession {
  date: string;
  src: string;
  alt: string;
  description?: string;
  label?: string;
}

// 파이프라인이 추가한 세션 + 기존 로컬 이미지 fallback
const sessionGallery: GallerySession[] = galleryData.sessions;

/**
 * 사진별 라벨 메타. site-content.json::trainingPhotosMeta·reviewPhotosMeta에 추가하면
 * alt가 동적으로 풍부해진다. 비어 있으면 기존 fallback alt를 그대로 사용.
 */
type PhotoMeta = {
  breed?: string;
  focus?: string;
  environment?: string;
  outcome?: string;
};
const trainingPhotosMeta: PhotoMeta[] =
  (siteContent as { trainingPhotosMeta?: PhotoMeta[] }).trainingPhotosMeta ?? [];
const reviewPhotosMeta: PhotoMeta[] =
  (siteContent as { reviewPhotosMeta?: PhotoMeta[] }).reviewPhotosMeta ?? [];

function composeTrainingAlt(index: number): string {
  const m = trainingPhotosMeta[index];
  if (!m) return `멍멍피트 강아지 방문교육 훈련사진 ${index + 1}`;
  const parts = [m.breed, m.focus, m.environment].filter(Boolean);
  if (parts.length === 0) return `멍멍피트 강아지 방문교육 훈련사진 ${index + 1}`;
  return `${parts.join(" · ")} | 멍멍피트 방문교육`;
}

function composeReviewAlt(index: number): string {
  const m = reviewPhotosMeta[index];
  if (!m) return `멍멍피트 강아지 방문교육 후기 ${index + 1}`;
  const parts = [m.breed, m.outcome].filter(Boolean);
  if (parts.length === 0) return `멍멍피트 강아지 방문교육 후기 ${index + 1}`;
  return `${parts.join(" · ")} | 멍멍피트 후기`;
}

const localFallback = Array.from({ length: 25 }, (_, index) => ({
  date: "",
  src: `/images/training/training-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: composeTrainingAlt(index),
  description: "",
}));

export const trainingGallery: GallerySession[] =
  sessionGallery.length > 0 ? sessionGallery : localFallback;

const reviewImageHeights = [
  1106, 736, 529, 1647, 745, 663, 539, 246, 489, 446, 577, 977, 1132, 833,
  1314, 539, 790, 680, 758, 834, 585, 1034, 507,
];

export const reviewImages = Array.from({ length: 23 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/images/reviews/review-${number}.jpg`,
    alt: composeReviewAlt(index),
    width: 1080,
    height: reviewImageHeights[index] ?? 1080,
  };
});

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? site.defaultUrl;
}

/**
 * BreadcrumbList JSON-LD 생성.
 * crumbs[0]이 최상위. 마지막 항목은 현재 페이지.
 */
export function buildBreadcrumbJsonLd(
  crumbs: Array<{ name: string; path: string }>,
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path.startsWith("/") ? crumb.path : `/${crumb.path}`}`,
    })),
  };
}
