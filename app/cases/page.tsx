import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import {
  FinalCta,
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  cases,
  getSiteUrl,
  pageContent,
} from "@/content/site";
import { alpha, font, space } from "@/styles/tokens";

const siteUrl = getSiteUrl();
const casesContent = pageContent.sections.casesPage;

export const metadata: Metadata = {
  title: casesContent.metadataTitle,
  description: casesContent.metadataDescription,
  alternates: { canonical: "/cases" },
  openGraph: {
    title: `${casesContent.metadataTitle} | 멍멍피트`,
    description: casesContent.metadataDescription,
    url: `${siteUrl}/cases`,
    images: [
      {
        url: cases[0]?.coverImage ?? "/images/training/main.jpg",
        alt: cases[0]?.coverAlt ?? "멍멍피트 강아지 변화 사례",
      },
    ],
  },
};

export default async function CasesIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const selectedTag = (await searchParams)?.tag?.trim() ?? "";
  const tags = Array.from(new Set(cases.flatMap((c) => c.tags))).sort((a, b) =>
    a.localeCompare(b, "ko"),
  );
  const visibleCases = selectedTag
    ? cases.filter((c) => c.tags.includes(selectedTag))
    : cases;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: visibleCases.map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/cases/${c.slug}`,
      name: c.title,
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "변화 사례", path: "/cases" },
  ]);

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
            { name: "변화 사례" },
          ]}
        />
        <span className="eyebrow">{casesContent.eyebrow}</span>
        <h1>{casesContent.title}</h1>
        <p className="lead">{casesContent.lead}</p>

        {tags.length > 0 && (
          <nav
            className="tag-row"
            aria-label="사례 태그 필터"
            style={{ marginTop: space.lg }}
          >
            <Link
              className="tag"
              href={"/cases" as Route}
              aria-current={selectedTag === "" ? "page" : undefined}
            >
              전체
            </Link>
            {tags.map((tag) => (
              <Link
                className="tag"
                href={`/cases?tag=${encodeURIComponent(tag)}` as Route}
                key={tag}
                aria-current={selectedTag === tag ? "page" : undefined}
              >
                #{tag}
              </Link>
            ))}
          </nav>
        )}

        {visibleCases.length === 0 ? (
          <article
            className="card sub-card"
            style={{
              marginTop: space.xxl,
              textAlign: "center",
              padding: `${space.xxxl} ${space.xl}`,
            }}
          >
            <h2>{casesContent.comingSoonLabel}</h2>
            <p>
              {selectedTag
                ? `#${selectedTag} 태그의 사례가 아직 없습니다.`
                : "곧 공개됩니다."}
            </p>
          </article>
        ) : (
          <div className="grid grid-3" style={{ marginTop: space.xxl }}>
            {visibleCases.map((c) => {
              const isDraft = (c as { isDraft?: boolean }).isDraft === true;
              return (
                <article className="card sub-card" key={c.slug}>
                  {c.coverImage && (
                    <Link
                      href={`/cases/${c.slug}` as Route}
                      className="blog-card-cover blog-card-cover-sm"
                      aria-label={`${c.title} 사례 보기`}
                    >
                      <Image
                        src={c.coverImage}
                        alt={c.coverAlt ?? c.title}
                        fill
                        sizes="(max-width: 940px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  )}
                  {isDraft && (
                    <span
                      className="eyebrow"
                      style={{ color: "var(--orange)", marginTop: space.sm }}
                    >
                      {casesContent.draftBadge}
                    </span>
                  )}
                  <h3 style={{ marginTop: space.sm }}>
                    <Link href={`/cases/${c.slug}` as Route}>{c.title}</Link>
                  </h3>
                  <p>{c.summary}</p>
                  <p
                    className="review-meta"
                    style={{ marginTop: space.md }}
                  >
                    {c.dog.breed} · {c.dog.age} · {c.area} · {c.weeks}주
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: space.sm,
                      flexWrap: "wrap",
                      fontSize: font.small,
                      color: alpha.inkSoft60,
                      marginTop: space.md,
                    }}
                  >
                    {c.tags.map((t) => (
                      <span key={t}>#{t}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
