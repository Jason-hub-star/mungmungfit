// 블로그 RSS 2.0 피드. 1시간 ISR + Cloudflare/Vercel s-maxage 1시간.

import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/content/site";

export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const siteUrl = getSiteUrl();
  const posts = getAllPosts();
  const buildDate = new Date().toUTCString();
  const lastBuildDate = posts[0]
    ? new Date(posts[0].frontmatter.date).toUTCString()
    : buildDate;

  const items = posts
    .map((post) => {
      const { frontmatter } = post;
      const url = `${siteUrl}/blog/${frontmatter.slug}`;
      const pubDate = new Date(frontmatter.date).toUTCString();
      const cdataDesc = `<![CDATA[${frontmatter.description}]]>`;
      const cdataTitle = `<![CDATA[${frontmatter.title}]]>`;
      return `    <item>
      <title>${cdataTitle}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cdataDesc}</description>
      <category>${escapeXml(frontmatter.category)}</category>
${frontmatter.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>멍멍피트 독피트니스 블로그</title>
    <link>${siteUrl}</link>
    <description>CSCC 국제 독피트니스 트레이너 김주영의 강아지 코어·균형·자신감 운동 가이드.</description>
    <language>ko-KR</language>
    <copyright>© 멍멍피트</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
