import type { Metadata } from "next";
import {
  Concerns,
  DogFitnessTools,
  Faq,
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
  TargetDogs,
  TrainerProfile,
} from "@/components/site-sections";
import { faqs, getSiteUrl, site } from "@/content/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "강아지 독피트니스 방문훈련",
  description:
    "CSCC 국제 독피트니스 트레이너 김주영이 진행하는 강아지 독피트니스 방문훈련. 밸런스볼·카발레티·디스크로 강아지 코어·균형·자신감을 키워 비만·노령·줄당김·문제행동을 근본부터 풀어갑니다. 하남, 서울, 경기, 인천, 충청.",
  alternates: {
    canonical: "/",
  },
};

const localBusinessJsonLd = {
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
    jobTitle: "CSCC 국제 독피트니스 트레이너",
  },
  areaServed: ["하남", "서울", "경기", "인천", "충청도"],
  makesOffer: [
    {
      "@type": "Offer",
      name: "강아지 독피트니스 방문훈련",
      description: "밸런스볼·카발레티·디스크로 강아지 코어·균형·자신감을 키우는 1:1 방문훈련",
      price: "90000",
      priceCurrency: "KRW",
    },
    {
      "@type": "Offer",
      name: "노령견 재활 독피트니스",
      description: "관절염·수술 후 회복기 노령견을 위한 저강도 균형 운동",
      price: "90000",
      priceCurrency: "KRW",
    },
    {
      "@type": "Offer",
      name: "비만견 다이어트 독피트니스",
      description: "관절 부담 없이 코어를 자극해 체중을 줄이는 운동 프로그램",
      price: "90000",
      priceCurrency: "KRW",
    },
    {
      "@type": "Offer",
      name: "퍼피 사회화 독피트니스",
      description: "8~16주 사회화기 퍼피의 환경 자신감을 만드는 도구 경험 수업",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Dog Fitness Home Training",
  name: "강아지 독피트니스 방문훈련",
  alternateName: ["Dog Fitness Training", "Canine Fitness", "독피트니스"],
  provider: {
    "@type": "LocalBusiness",
    name: "멍멍피트",
    url: siteUrl,
  },
  areaServed: ["하남", "서울", "경기", "인천", "충청도"],
  description:
    "밸런스볼, 카발레티, 디스크 같은 전문 도구로 강아지 코어·균형·자신감을 키우고, 보호자 핸들링까지 결합한 1:1 방문훈련 서비스.",
  audience: {
    "@type": "PeopleAudience",
    audienceType: "비만견, 노령견, 소심한 강아지, 활동량 많은 견종, 퍼피, 줄당김 강아지 보호자",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <Hero />
      <TrainerProfile />
      <Concerns />
      <Method />
      <DogFitnessTools />
      <TargetDogs />
      <Process />
      <Pricing />
      <ReviewsPreview />
      <Gallery />
      <Faq />
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
