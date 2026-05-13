import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  buildBreadcrumbJsonLd,
  buildCaseStudyJsonLd,
  cases,
  getSiteUrl,
  pageContent,
  site,
} from "@/content/site";
import { alpha, font, space } from "@/styles/tokens";

const siteUrl = getSiteUrl();
const casesContent = pageContent.sections.casesPage;

type Props = { params: Promise<{ slug: string }> };

function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/cases/${study.slug}` },
    openGraph: {
      type: "article",
      title: `${study.title} | 멍멍피트`,
      description: study.summary,
      url: `${siteUrl}/cases/${study.slug}`,
      publishedTime: study.datePublished,
      tags: study.tags,
      images: study.coverImage
        ? [{ url: study.coverImage, alt: study.coverAlt ?? study.title }]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const articleJsonLd = buildCaseStudyJsonLd(study, siteUrl);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "변화 사례", path: "/cases" },
    { name: study.title, path: `/cases/${study.slug}` },
  ]);

  const isDraft = (study as { isDraft?: boolean }).isDraft === true;

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            { name: "변화 사례", path: "/cases" },
            { name: `${study.dog.breed} ${study.weeks}주` },
          ]}
        />
        {isDraft && (
          <p
            className="eyebrow"
            style={{ color: "var(--orange)", marginBottom: space.sm }}
          >
            {casesContent.draftBadge}
          </p>
        )}
        <span className="eyebrow">Case study</span>
        <h1>{study.title}</h1>
        <p className="lead">{study.summary}</p>

        <p
          className="review-meta"
          style={{ marginTop: space.lg }}
        >
          {study.dog.breed} · {study.dog.age} · {study.dog.weight} · {study.area} · {study.sessions}회 / {study.weeks}주
        </p>

        {study.coverImage && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              marginTop: space.xl,
              marginBottom: space.xl,
              borderRadius: 18,
              overflow: "hidden",
              background: "var(--paper-deep)",
            }}
          >
            <Image
              src={study.coverImage}
              alt={study.coverAlt ?? study.title}
              fill
              sizes="(max-width: 940px) 100vw, 1000px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <div className="sub-grid">
          <div className="grid">
            <article className="card sub-card">
              <h2>문제</h2>
              <p>{study.problem}</p>
            </article>

            <article className="card sub-card">
              <h2>접근 — {study.weeks}주 흐름</h2>
              <ul className="plain-list">
                {study.approach.map((step, i) => (
                  <li key={i}>· {step}</li>
                ))}
              </ul>
            </article>

            <article
              className="card sub-card"
              style={{ background: alpha.greenSoft08 }}
            >
              <h2>결과</h2>
              <p>{study.outcome}</p>
            </article>

            {/* Before/After 슬롯 — 사진 정리 후 활성화 */}
            {(study.beforeImage || study.afterImage) ? (
              <article className="card sub-card">
                <h2>Before · After</h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  {study.beforeImage && (
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1 / 1",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={study.beforeImage}
                        alt={`${study.title} — Before`}
                        fill
                        sizes="(max-width: 940px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  {study.afterImage && (
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: "1 / 1",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={study.afterImage}
                        alt={`${study.title} — After`}
                        fill
                        sizes="(max-width: 940px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              </article>
            ) : null}

            {study.guardianQuote && (
              <article
                className="card sub-card"
                style={{
                  background: alpha.honeyBg12,
                  borderLeft: "4px solid var(--orange)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: font.lead,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{study.guardianQuote}&rdquo;
                </p>
                <p
                  style={{
                    marginTop: space.md,
                    fontSize: font.small,
                    color: "var(--ink-muted)",
                  }}
                >
                  — 보호자 (익명, {study.area})
                </p>
              </article>
            )}

            <article className="card sub-card">
              <h2>{site.trainerTitle}와 비슷한 고민이라면</h2>
              <p>
                같은 고민을 가진 강아지의 첫 수업·평가는 카카오톡으로 상담해주세요.
                강아지 상태에 맞춘 4회 패키지·1회 단발 옵션을 안내합니다.
              </p>
              <p style={{ marginTop: space.lg, fontSize: font.lead, fontWeight: 700 }}>
                {site.phoneDisplay}
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
