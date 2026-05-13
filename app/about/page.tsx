import type { Metadata } from "next";
import Image from "next/image";
import {
  ContactAside,
  FinalCta,
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  brandImages,
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  getSiteUrl,
  pageContent,
  site,
} from "@/content/site";
import { alpha, font, space } from "@/styles/tokens";

const siteUrl = getSiteUrl();
const aboutContent = pageContent.sections.aboutPage;

export const metadata: Metadata = {
  title: aboutContent.metadataTitle,
  description: aboutContent.metadataDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${aboutContent.metadataTitle} | 멍멍피트`,
    description: aboutContent.metadataDescription,
    url: `${siteUrl}/about`,
    images: [
      { url: brandImages.trainer.src, alt: brandImages.trainer.alt },
    ],
  },
};

export default function AboutPage() {
  const personJsonLd = buildPersonJsonLd({
    url: `${siteUrl}/about`,
    image: `${siteUrl}${brandImages.trainer.src}`,
    description: aboutContent.lead,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "트레이너 소개", path: "/about" },
  ]);

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
            { name: "트레이너" },
          ]}
        />
        <span className="eyebrow">{aboutContent.eyebrow}</span>
        <h1>{aboutContent.title}</h1>
        <p className="lead">{aboutContent.lead}</p>

        <div className="sub-grid" style={{ marginTop: space.xxl }}>
          <div className="grid">
            <article className="card sub-card" style={{ padding: 0, overflow: "hidden" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "var(--paper-deep)",
                }}
              >
                <Image
                  src={brandImages.trainer.src}
                  alt={brandImages.trainer.alt}
                  fill
                  sizes="(max-width: 940px) 100vw, 720px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </article>

            <article className="card sub-card">
              <h2>{aboutContent.philosophyHeading}</h2>
              <p>{aboutContent.philosophyBody}</p>
            </article>

            <article className="card sub-card">
              <h2>{aboutContent.careerHeading}</h2>
              <ul className="plain-list">
                {aboutContent.careerItems.map((item: string) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </article>

            <article className="card sub-card">
              <h2>{aboutContent.certificationHeading}</h2>
              <ul className="plain-list">
                {aboutContent.certificationItems.map((item: string) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 480,
                  aspectRatio: "4 / 3",
                  marginTop: space.lg,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "var(--paper-deep)",
                }}
              >
                <Image
                  src={brandImages.certificate.src}
                  alt={brandImages.certificate.alt}
                  fill
                  sizes="(max-width: 940px) 100vw, 480px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </article>

            <article className="card sub-card">
              <h2>{aboutContent.helperHeading}</h2>
              <p>{aboutContent.helperBody}</p>
            </article>

            <article
              className="card sub-card"
              style={{ background: alpha.greenSoft08 }}
            >
              <h2>{aboutContent.mediaHeading}</h2>
              <p
                style={{
                  color: "var(--ink-muted)",
                  fontSize: font.small,
                  fontStyle: "italic",
                }}
              >
                {aboutContent.mediaPlaceholder}
              </p>
            </article>

            <article className="card sub-card">
              <h2>{aboutContent.ctaHeading}</h2>
              <p>{aboutContent.ctaBody}</p>
              <p style={{ marginTop: space.lg, fontSize: font.lead, fontWeight: 700 }}>
                {site.phoneDisplay} · 카카오 오픈채팅
              </p>
            </article>
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
