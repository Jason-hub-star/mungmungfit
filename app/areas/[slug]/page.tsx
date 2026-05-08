import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ContactAside,
  FinalCta,
  Footer,
  Header,
  InternalLinks,
  Method,
  StickyCta,
} from "@/components/site-sections";
import { areaPages, getSiteUrl, site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getArea(slug: string) {
  return areaPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return areaPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getArea(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/areas/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | 멍멍피트`,
      description: page.description,
      url: `${getSiteUrl()}/areas/${page.slug}`,
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const page = getArea(slug);
  if (!page) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `멍멍피트 ${page.name} 강아지 방문교육`,
    url: `${getSiteUrl()}/areas/${page.slug}`,
    telephone: "+82-10-2609-6593",
    areaServed: page.name,
    description: page.description,
    priceRange: "90000 KRW~",
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <span className="eyebrow">Area</span>
        <h1>{page.title}</h1>
        <p className="lead">
          {page.description} 멍멍피트는 방문교육과 독피트니스를 결합해 문제행동과
          자신감 부족을 보호자와 함께 다룹니다.
        </p>
        <InternalLinks />
        <div className="sub-grid">
          <article className="card sub-card">
            <h2>{page.name} 수업 안내</h2>
            <p>
              수업 시간은 약 1시간 15분에서 1시간 30분입니다. 상담 시 강아지의
              문제 상황, 나이, 생활환경, 산책 동선을 확인한 뒤 방문 가능 일정과
              비용을 먼저 안내합니다.
            </p>
            <ul className="plain-list">
              <li>기본 수업료: 90,000원</li>
              <li>출장비: {page.fee}</li>
              <li>상담 연락: {site.phoneDisplay} 또는 카카오 오픈채팅</li>
            </ul>
          </article>
          <ContactAside />
        </div>
      </section>
      <Method />
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
