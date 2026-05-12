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
import { PhotoSlot } from "@/components/photo-slot";
import { areaPages, buildBreadcrumbJsonLd, getSiteUrl, site } from "@/content/site";
import { font, space } from "@/styles/tokens";

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
    priceRange: "89000 KRW~",
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: page.title, path: `/areas/${page.slug}` },
  ]);

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

        <div style={{ marginTop: space.xxl, borderRadius: 12, overflow: "hidden" }}>
          <PhotoSlot
            slotId={`area-${page.slug}`}
            sizes="(max-width: 940px) 100vw, 1120px"
          />
        </div>

        <div className="stats stats-full" style={{ marginTop: space.xl }}>
          <div className="stat">
            <strong>89,000원</strong>
            <span>1회 수업료</span>
          </div>
          <div className="stat">
            <strong>75~90분</strong>
            <span>1:1 방문훈련</span>
          </div>
          <div className="stat">
            <strong>{page.name}</strong>
            <span>출장 기준 적용</span>
          </div>
        </div>

        <div className="sub-grid" style={{ marginTop: space.xxl }}>
          <article className="card sub-card">
            <h2>{page.name} 수업 안내</h2>
            <p>
              상담 시 강아지의 문제 상황, 나이, 생활환경, 산책 동선을 확인한 뒤
              방문 가능 일정과 비용을 먼저 안내합니다.
            </p>
            <ul className="plain-list">
              <li style={{ fontSize: font.lead, fontWeight: 700 }}>
                출장비: {page.fee}
              </li>
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
