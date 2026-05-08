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
import { getSiteUrl, reviewImages, reviews } from "@/content/site";

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
  },
};

export default function ReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((review, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: review.title,
      description: review.body,
    })),
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className="container subpage">
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
            {reviews.map((review) => (
              <article className="card review-card" key={review.title}>
                <h2>{review.title}</h2>
                <p>{review.body}</p>
                <div className="tag-row">
                  {review.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
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
