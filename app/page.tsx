import type { Metadata } from "next";
import {
  Concerns,
  FinalCta,
  Footer,
  Gallery,
  Header,
  Hero,
  Method,
  Pricing,
  Process,
  ReviewsPreview,
  StickyCta,
  TrainerProfile,
} from "@/components/site-sections";
import { getSiteUrl, site } from "@/content/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "강아지 방문교육 + 독피트니스",
  description:
    "하남, 서울, 경기, 인천, 충청도 강아지 방문교육. 김주영 독피트니스 트레이너가 문제행동, 산책 짖음, 줄당김, 자신감 부족을 보호자와 함께 훈련합니다.",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "멍멍피트",
  alternateName: "Mungmungfit",
  url: siteUrl,
  telephone: "+82-10-2609-6593",
  priceRange: "90000 KRW~",
  image: `${siteUrl}/images/training/main.jpg`,
  description: site.description,
  founder: {
    "@type": "Person",
    name: "김주영",
    jobTitle: "독피트니스 트레이너",
  },
  areaServed: ["하남", "서울", "경기", "인천", "충청도"],
  makesOffer: [
    {
      "@type": "Offer",
      name: "강아지 방문교육",
      price: "90000",
      priceCurrency: "KRW",
    },
    {
      "@type": "Offer",
      name: "강아지 독피트니스 방문수업",
      price: "90000",
      priceCurrency: "KRW",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-2609-6593",
    contactType: "customer service",
    availableLanguage: "Korean",
  },
};

export default function Home() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <TrainerProfile />
      <Concerns />
      <Method />
      <Process />
      <Pricing />
      <ReviewsPreview />
      <Gallery />
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
