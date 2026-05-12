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
export const brandImages = siteContent.brandImages;
export const methodImages = siteContent.methodImages;
export const featuredGallery = siteContent.featuredGallery;
export const pageContent = siteContent.pageContent;

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
