import type { MetadataRoute } from "next";
import {
  areaPages,
  brandImages,
  cases,
  featuredGallery,
  getSiteUrl,
  methodImages,
  reviewImages,
  servicePages,
} from "@/content/site";
import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const posts = getAllPosts();
  const categories = getAllCategories();
  const generatedAt = new Date();

  const abs = (src: string) =>
    src.startsWith("http") ? src : `${baseUrl}${src.startsWith("/") ? src : `/${src}`}`;

  // 홈: hero + featuredGallery 전체 + 첫 6장의 후기 이미지
  const homeImages = [
    abs(brandImages.hero.src),
    ...featuredGallery.map((g) => abs(g.src)),
    ...reviewImages.slice(0, 6).map((r) => abs(r.src)),
  ];
  // /about: 트레이너·자격증·메소드
  const aboutImages = [
    abs(brandImages.trainer.src),
    abs(brandImages.certificate.src),
    ...methodImages.map((m) => abs(m.src)),
  ];
  // /reviews: 모든 후기 이미지
  const reviewsImages = reviewImages.map((r) => abs(r.src));

  // 블로그 인덱스: 가장 최신 글의 발행일을 lastmod로
  const blogIndexMtime = posts.length
    ? new Date(Math.max(...posts.map((p) => new Date(p.frontmatter.date).getTime())))
    : generatedAt;

  return [
    {
      url: baseUrl,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1,
      images: homeImages,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [abs(brandImages.hero.src)],
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
      images: reviewsImages,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogIndexMtime,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
      images: aboutImages,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...cases.map((c) => {
      const isDraft = (c as { isDraft?: boolean }).isDraft === true;
      const cover = (c as { coverImage?: string }).coverImage;
      return {
        url: `${baseUrl}/cases/${c.slug}`,
        lastModified: c.datePublished ? new Date(c.datePublished) : generatedAt,
        changeFrequency: "monthly" as const,
        // 더미·샘플 케이스는 priority 낮게
        priority: isDraft ? 0.5 : 0.75,
        ...(cover ? { images: [abs(cover)] } : {}),
      };
    }),
    ...servicePages.map((page) => ({
      url: `${baseUrl}/services/${page.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...areaPages.map((page) => ({
      url: `${baseUrl}/areas/${page.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly" as const,
      priority: page.slug === "seoul" ? 0.9 : 0.75,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: post.frontmatter.featured ? 0.85 : 0.75,
      ...(post.frontmatter.coverImage
        ? { images: [abs(post.frontmatter.coverImage)] }
        : {}),
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
