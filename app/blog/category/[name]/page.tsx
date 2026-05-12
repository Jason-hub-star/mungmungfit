import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FinalCta,
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import {
  getAllCategories,
  getPostsByCategory,
} from "@/lib/blog";
import { alpha, font, space } from "@/styles/tokens";

type Props = { params: Promise<{ name: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllCategories().map((name) => ({ name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: rawName } = await params;
  const name = decodeURIComponent(rawName);
  return {
    title: `${name} 블로그`,
    description: `${name} 카테고리 멍멍피트 블로그 글 모음`,
    alternates: { canonical: `/blog/category/${encodeURIComponent(name)}` },
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { name: rawName } = await params;
  const name = decodeURIComponent(rawName);
  const posts = getPostsByCategory(name);
  if (posts.length === 0) notFound();

  return (
    <main className="page">
      <Header />
      <section className="container subpage">
        <span className="eyebrow">Category</span>
        <h1>{name}</h1>
        <p className="lead">
          {name} 카테고리의 모든 글입니다. 총 {posts.length}편.
        </p>
        <Link className="tag" href="/blog" style={{ marginTop: space.lg, display: "inline-block" }}>
          ← 모든 글
        </Link>

        <div className="grid grid-3" style={{ marginTop: space.xxl }}>
          {posts.map((post) => (
            <article className="card sub-card" key={post.frontmatter.slug}>
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
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
