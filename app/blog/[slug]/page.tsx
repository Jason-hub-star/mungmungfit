import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import {
  ContactAside,
  FinalCta,
  Footer,
  Header,
  InternalLinks,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import { BlogImage } from "@/components/blog-image";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { buildBreadcrumbJsonLd, getSiteUrl } from "@/content/site";
import { alpha, colors, font, space } from "@/styles/tokens";

type Props = { params: Promise<{ slug: string }> };

// ISR: 1시간마다 백그라운드 재생성 (큰 변경 빈도는 git push 시 자동)
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const siteUrl = getSiteUrl();
  const ogImage =
    frontmatter.coverImage ??
    frontmatter.ogImage ??
    `${siteUrl}/api/og?title=${encodeURIComponent(frontmatter.title)}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    alternates: { canonical: `/blog/${frontmatter.slug}` },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${siteUrl}/blog/${frontmatter.slug}`,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function SourceNotice({
  channel,
  url,
}: {
  channel?: string;
  url?: string;
}) {
  if (!channel) return null;
  return (
    <aside
      className="card sub-card"
      style={{
        background: alpha.honeyBg12,
        borderLeft: `4px solid ${colors.honey}`,
        padding: `${space.lg} ${space.xl}`,
        marginBottom: space.xxl,
      }}
    >
      <strong>💡 이 글은 {channel}의 영상을 한국 환경에 맞게 재해석한 글입니다.</strong>
      {url && (
        <>
          <br />
          <a href={url} target="_blank" rel="nofollow noopener">
            원본 영상 보기 →
          </a>
        </>
      )}
    </aside>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, computedReadingMinutes } = post;
  const related = getRelatedPosts(slug, 3);
  const siteUrl = getSiteUrl();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "블로그", path: "/blog" },
    { name: frontmatter.title, path: `/blog/${frontmatter.slug}` },
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: { "@type": "Person", name: frontmatter.author },
    publisher: {
      "@type": "Organization",
      name: "멍멍피트",
      url: siteUrl,
    },
    keywords: frontmatter.keywords.join(", "),
    articleSection: frontmatter.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${frontmatter.slug}`,
    },
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <Breadcrumb
          crumbs={[
            { name: "홈", path: "/" },
            { name: "블로그", path: "/blog" },
            { name: frontmatter.title },
          ]}
        />
        <span className="eyebrow">{frontmatter.category}</span>
        <h1>{frontmatter.title}</h1>
        <p className="lead">{frontmatter.description}</p>
        <div
          style={{
            display: "flex",
            gap: space.md,
            fontSize: font.small,
            color: alpha.inkSoft60,
            marginTop: space.lg,
            marginBottom: frontmatter.coverImage ? space.xl : space.xxl,
          }}
        >
          <span>{frontmatter.author}</span>
          <span>·</span>
          <span>{formatDate(frontmatter.date)}</span>
          <span>·</span>
          <span>읽는데 약 {computedReadingMinutes}분</span>
        </div>

        {frontmatter.coverImage && (
          <div className="blog-post-cover">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.coverAlt ?? frontmatter.title}
              fill
              sizes="(max-width: 940px) 100vw, 1000px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}

        <SourceNotice
          channel={frontmatter.sourceChannel}
          url={frontmatter.sourceUrl}
        />

        <div className="sub-grid">
          <article className="blog-article">
            <MDXRemote
              source={content}
              components={{ BlogImage }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      { behavior: "wrap" },
                    ],
                  ],
                },
              }}
            />

            {frontmatter.tags.length > 0 && (
              <div className="tag-row" style={{ marginTop: space.xxl }} aria-label="태그">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <InternalLinks />
          </article>
          <ContactAside />
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: space.xxxl }}>
            <h2>관련 글</h2>
            <div className="grid grid-3" style={{ marginTop: space.lg }}>
              {related.map((p) => (
                <article className="card sub-card" key={p.frontmatter.slug}>
                  <span className="eyebrow">{p.frontmatter.category}</span>
                  <h3 style={{ marginTop: space.sm }}>
                    <Link href={`/blog/${p.frontmatter.slug}`}>
                      {p.frontmatter.title}
                    </Link>
                  </h3>
                  <p>{p.frontmatter.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
