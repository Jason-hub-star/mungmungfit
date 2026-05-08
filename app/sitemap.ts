import type { MetadataRoute } from "next";
import { areaPages, getSiteUrl, servicePages } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
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
      priority: page.slug === "hanam" ? 0.9 : 0.75,
    })),
  ];
}
