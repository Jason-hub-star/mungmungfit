import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FinalCta,
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import { brandImages, buildBreadcrumbJsonLd, getSiteUrl } from "@/content/site";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { alpha, font, space } from "@/styles/tokens";

// ISR: 1시간마다 재생성
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "독피트니스 블로그",
  description:
    "강아지 독피트니스·코어 운동·방문훈련에 대한 CSCC 국제 트레이너의 정통 가이드. 비만견·노령견·퍼피 등 견종·문제행동별 운동법을 정리합니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "독피트니스 블로그 | 멍멍피트",
    description:
      "강아지 독피트니스·코어 운동·방문훈련에 대한 CSCC 국제 트레이너의 정통 가이드.",
    url: `${getSiteUrl()}/blog`,
    images: [{ url: brandImages.hero.src, alt: brandImages.hero.alt }],
  },
};

const categoryOrder = [
  "독피트니스 기초",
  "강아지 근육 도감",
  "산책교육",
  "퍼피 사회화",
  "노령견 재활",
  "비만견 다이어트",
  "펫테크 리뷰",
  "해외 트레이너 가공",
];

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getAllCategories().sort(
    (a, b) =>
      (categoryOrder.indexOf(a) === -1 ? 99 : categoryOrder.indexOf(a)) -
      (categoryOrder.indexOf(b) === -1 ? 99 : categoryOrder.indexOf(b))
  );

  const featured = posts.find((p) => p.frontmatter.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "블로그", path: "/blog" },
  ]);

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <Breadcrumb
          crumbs={[
            { name: "홈", path: "/" },
            { name: "블로그" },
          ]}
        />
        <span className="eyebrow">Blog</span>
        <h1>독피트니스 블로그</h1>
        <p className="lead">
          CSCC 국제 독피트니스 트레이너 김주영이 정리하는 강아지 운동·문제행동·
          방문훈련 가이드. 우리 강아지에게 직접 적용할 수 있는 정보 위주로
          담았습니다.
        </p>

        {categories.length > 0 && (
          <div className="tag-row" aria-label="블로그 카테고리" style={{ marginTop: space.lg }}>
            {categories.map((cat) => (
              <Link
                key={cat}
                className="tag"
                href={`/blog/category/${encodeURIComponent(cat)}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <article
            className="card sub-card"
            style={{ marginTop: space.xxl, textAlign: "center", padding: `${space.xxxl} ${space.xl}` }}
          >
            <h2>곧 첫 글을 만나보실 수 있어요</h2>
            <p>
              독피트니스·강아지 코어 운동·방문훈련 가이드를 정리해서 곧 올라옵니다.
            </p>
          </article>
        ) : (
          <>
            {featured && (
              <article
                className="card sub-card blog-card-featured"
                style={{ marginTop: space.xxl, borderColor: alpha.greenSoft30, borderWidth: 2 }}
              >
                {featured.frontmatter.coverImage && (
                  <Link
                    href={`/blog/${featured.frontmatter.slug}`}
                    className="blog-card-cover"
                    aria-label={`${featured.frontmatter.title} 글 보기`}
                  >
                    <Image
                      src={featured.frontmatter.coverImage}
                      alt={featured.frontmatter.coverAlt ?? featured.frontmatter.title}
                      fill
                      sizes="(max-width: 940px) 100vw, 900px"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </Link>
                )}
                <span className="eyebrow">Featured</span>
                <h2 style={{ marginTop: space.sm }}>
                  <Link href={`/blog/${featured.frontmatter.slug}`}>
                    {featured.frontmatter.title}
                  </Link>
                </h2>
                <p className="section-text">{featured.frontmatter.description}</p>
                <div
                  style={{
                    display: "flex",
                    gap: space.md,
                    fontSize: font.small,
                    color: alpha.inkSoft60,
                    marginTop: space.lg,
                  }}
                >
                  <span>{featured.frontmatter.category}</span>
                  <span>·</span>
                  <span>{formatDate(featured.frontmatter.date)}</span>
                  <span>·</span>
                  <span>읽는데 약 {featured.computedReadingMinutes}분</span>
                </div>
              </article>
            )}

            {rest.length > 0 && (
              <div className="grid grid-3" style={{ marginTop: space.xxl }}>
                {rest.map((post) => (
                  <article className="card sub-card" key={post.frontmatter.slug}>
                    {post.frontmatter.coverImage && (
                      <Link
                        href={`/blog/${post.frontmatter.slug}`}
                        className="blog-card-cover blog-card-cover-sm"
                        aria-label={`${post.frontmatter.title} 글 보기`}
                      >
                        <Image
                          src={post.frontmatter.coverImage}
                          alt={post.frontmatter.coverAlt ?? post.frontmatter.title}
                          fill
                          sizes="(max-width: 940px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>
                    )}
                    <span className="eyebrow">{post.frontmatter.category}</span>
                    <h3 style={{ marginTop: space.sm }}>
                      <Link href={`/blog/${post.frontmatter.slug}`}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <p>{post.frontmatter.description}</p>
                    <div
                      style={{
                        display: "flex",
                        gap: space.sm,
                        fontSize: font.small,
                        color: alpha.inkSoft60,
                        marginTop: space.md,
                      }}
                    >
                      <span>{formatDate(post.frontmatter.date)}</span>
                      <span>·</span>
                      <span>{post.computedReadingMinutes}분</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
