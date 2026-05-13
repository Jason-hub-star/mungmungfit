import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { areaPages, cases, getSiteUrl, servicePages } from "@/content/site";
import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/blog";

const CONTENT_JSON = "content/site-content.json";

function fileMtime(rel: string): Date | null {
  try {
    return fs.statSync(path.join(process.cwd(), rel)).mtime;
  } catch {
    return null;
  }
}

// 페이지 mtime은 페이지 컴포넌트 변경 + 데이터(JSON) 변경 중 최신값을 사용.
// 정확한 lastmod는 크롤 효율과 색인 신선도에 영향.
function pageMtime(...rels: string[]): Date {
  const stamps = rels
    .map(fileMtime)
    .filter((d): d is Date => d !== null)
    .map((d) => d.getTime());
  return stamps.length ? new Date(Math.max(...stamps)) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const posts = getAllPosts();
  const categories = getAllCategories();

  const homeMtime = pageMtime("app/page.tsx", "components/site-sections.tsx", CONTENT_JSON);
  const pricingMtime = pageMtime("app/pricing/page.tsx", CONTENT_JSON);
  const reviewsMtime = pageMtime("app/reviews/page.tsx", CONTENT_JSON);
  const aboutMtime = pageMtime("app/about/page.tsx", CONTENT_JSON);
  const casesIndexMtime = pageMtime("app/cases/page.tsx", "content/cases.json");
  const caseTplMtime = pageMtime("app/cases/[slug]/page.tsx", "content/cases.json");
  const diagnosisMtime = pageMtime(
    "app/diagnosis/page.tsx",
    "components/diagnosis-form.tsx",
    CONTENT_JSON,
  );
  const serviceTplMtime = pageMtime("app/services/[slug]/page.tsx", CONTENT_JSON);
  const areaTplMtime = pageMtime("app/areas/[slug]/page.tsx", CONTENT_JSON);

  // 블로그 인덱스: 가장 최신 글의 발행일을 lastmod로
  const blogIndexMtime = posts.length
    ? new Date(Math.max(...posts.map((p) => new Date(p.frontmatter.date).getTime())))
    : pageMtime("app/blog/page.tsx");

  return [
    {
      url: baseUrl,
      lastModified: homeMtime,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: pricingMtime,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: reviewsMtime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogIndexMtime,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: aboutMtime,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: casesIndexMtime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified: diagnosisMtime,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...cases.map((c) => {
      const isDraft = (c as { isDraft?: boolean }).isDraft === true;
      return {
        url: `${baseUrl}/cases/${c.slug}`,
        lastModified: c.datePublished ? new Date(c.datePublished) : caseTplMtime,
        changeFrequency: "monthly" as const,
        // 더미·샘플 케이스는 priority 낮게
        priority: isDraft ? 0.5 : 0.75,
      };
    }),
    ...servicePages.map((page) => ({
      url: `${baseUrl}/services/${page.slug}`,
      lastModified: serviceTplMtime,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...areaPages.map((page) => ({
      url: `${baseUrl}/areas/${page.slug}`,
      lastModified: areaTplMtime,
      changeFrequency: "monthly" as const,
      priority: page.slug === "seoul" ? 0.9 : 0.75,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: post.frontmatter.featured ? 0.85 : 0.75,
    })),
    ...categories.map((cat) => {
      const catPosts = getPostsByCategory(cat);
      const catMtime = catPosts.length
        ? new Date(Math.max(...catPosts.map((p) => new Date(p.frontmatter.date).getTime())))
        : blogIndexMtime;
      return {
        url: `${baseUrl}/blog/category/${encodeURIComponent(cat)}`,
        lastModified: catMtime,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    }),
  ];
}
