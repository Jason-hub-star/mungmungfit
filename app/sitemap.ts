import type { MetadataRoute } from "next";
import { areaPages, getSiteUrl, servicePages } from "@/content/site";
import { getAllCategories, getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();
  const posts = getAllPosts();
  const categories = getAllCategories();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...servicePages.map((page) => ({
      url: `${baseUrl}/services/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...areaPages.map((page) => ({
      url: `${baseUrl}/areas/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.slug === "seoul" ? 0.9 : 0.75,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.frontmatter.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: post.frontmatter.featured ? 0.85 : 0.75,
    })),
    ...categories.map((cat) => ({
      url: `${baseUrl}/blog/category/${encodeURIComponent(cat)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
