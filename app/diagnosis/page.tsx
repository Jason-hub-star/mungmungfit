import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ContactAside,
  FinalCta,
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  DiagnosisForm,
  type DiagnosisContent,
} from "@/components/diagnosis-form";
import {
  buildBreadcrumbJsonLd,
  getSiteUrl,
  pageContent,
} from "@/content/site";

const siteUrl = getSiteUrl();
const diagnosisContent = pageContent.sections.diagnosisPage as DiagnosisContent & {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
};

export const metadata: Metadata = {
  title: diagnosisContent.metadataTitle,
  description: diagnosisContent.metadataDescription,
  alternates: { canonical: "/diagnosis" },
  openGraph: {
    title: `${diagnosisContent.metadataTitle} | 멍멍피트`,
    description: diagnosisContent.metadataDescription,
    url: `${siteUrl}/diagnosis`,
    images: [
      {
        url: "/images/training/main.jpg",
        alt: "멍멍피트 강아지 코어·자신감 자가진단",
      },
    ],
  },
};

export default function DiagnosisPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: diagnosisContent.metadataTitle,
    description: diagnosisContent.metadataDescription,
    url: `${siteUrl}/diagnosis`,
    inLanguage: "ko-KR",
    isPartOf: {
      "@type": "WebSite",
      name: "멍멍피트",
      url: siteUrl,
    },
    about: {
      "@type": "Thing",
      name: "강아지 코어·자신감 평가",
    },
    primaryImageOfPage: `${siteUrl}/images/training/main.jpg`,
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "1분 자가진단", path: "/diagnosis" },
  ]);

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
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
            { name: "1분 자가진단" },
          ]}
        />
        <span className="eyebrow">{diagnosisContent.eyebrow}</span>
        <h1>{diagnosisContent.title}</h1>
        <p className="lead">{diagnosisContent.lead}</p>

        <h2 className="sr-only">자가진단 폼</h2>
        <div className="sub-grid">
          <Suspense fallback={<div className="diagnosis-form" aria-hidden />}>
            <DiagnosisForm content={diagnosisContent} />
          </Suspense>
          <ContactAside />
        </div>
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
