import type { Metadata } from "next";
import Image from "next/image";
import {
  ContactAside,
  FinalCta,
  Footer,
  Header,
  InternalLinks,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
  buildReviewJsonLd,
  getSiteUrl,
  reviewImages,
  reviews,
  site,
} from "@/content/site";

export const metadata: Metadata = {
  title: "강아지 방문교육 후기",
  description:
    "멍멍피트 강아지 방문교육 후기. 산책 짖음, 줄당김, 생활환경, 보호자 핸들링 수업 후기를 정리합니다.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "강아지 방문교육 후기 | 멍멍피트",
    description:
      "멍멍피트 강아지 방문교육 후기. 보호자가 집과 산책에서 다시 연습할 수 있도록 남기는 수업입니다.",
    url: `${getSiteUrl()}/reviews`,
    images: [
      {
        url: reviewImages[0]?.src ?? "/images/training/main.jpg",
        alt: reviewImages[0]?.alt ?? "멍멍피트 강아지 방문교육 후기",
      },
    ],
  },
};

export default function ReviewsPage() {
  const siteUrl = getSiteUrl();

  // ItemList — 사이트 내 후기 컬렉션 신호
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((review, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: review.title,
      description: review.body,
    })),
  };

  // LocalBusiness with AggregateRating + Review[] — 검색 결과 별점 노출용
  const itemReviewed = {
    "@type": "LocalBusiness",
    name: site.name,
    url: siteUrl,
  };
  const businessWithReviewsJsonLd = {
    ...buildLocalBusinessJsonLd({
      url: `${siteUrl}/reviews`,
      description:
        "멍멍피트 보호자 후기 모음. 산책 짖음·줄당김·생활환경·보호자 핸들링 수업 후기.",
      image: `${siteUrl}/images/training/main.jpg`,
    }),
    review: reviews.map((r) =>
      // itemReviewed는 페이지 별점 표시용으로 review 안에는 포함 안 함 (top-level에서 attach)
      ({ ...buildReviewJsonLd(r, itemReviewed), itemReviewed: undefined }),
    ),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "강아지 방문교육 후기", path: "/reviews" },
  ]);

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessWithReviewsJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <Breadcrumb
          crumbs={[
            { name: "홈", path: "/" },
            { name: "후기" },
          ]}
        />
        <span className="eyebrow">Reviews</span>
        <h1>강아지 방문교육 후기</h1>
        <p className="lead">
          우리 강아지와 함께 수업받은 보호자들의 실제 후기입니다.
          문제행동이 어떻게 개선됐는지, 보호자가 무엇을 배웠는지 확인해보세요.
        </p>
        <InternalLinks />
        <div className="sub-grid">
          <div className="grid">
            <div className="review-wall">
              {reviewImages.map((image) => (
                <figure className="review-figure" key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 940px) 100vw, 46vw"
                    className="review-wall-img"
                  />
                </figure>
              ))}
            </div>
          </div>
          <ContactAside />
        </div>
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
