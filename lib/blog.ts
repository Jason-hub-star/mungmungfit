import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  keywords: string[];
  /** 카드/상세 상단 cover. Supabase Storage URL 또는 로컬 경로. */
  coverImage?: string;
  /** cover alt (없으면 title 사용) */
  coverAlt?: string;
  /** OG 이미지 (없으면 coverImage fallback) */
  ogImage?: string;
  readingTime?: number;
  featured?: boolean;
  sourceChannel?: string;
  sourceUrl?: string;
};

export type BlogPost = {
  frontmatter: BlogFrontmatter;
  content: string;
  filepath: string;
  computedReadingMinutes: number;
};

// 빌드/ISR 시점에 한번만 fs 읽기 — 모듈 스코프 메모이즈.
// Dev 모드에선 mdx 변경 시 본 모듈이 reload 안 되므로 캐시 비활성화 (frontmatter 변경 즉시 반영).
let _postsCache: BlogPost[] | null = null;
const _useCache = process.env.NODE_ENV !== "development";

/**
 * 모든 블로그 글 메타데이터를 최신순으로 반환 (drafts 제외).
 * SSG/ISR에서는 빌드·revalidate 시점에 한 번만 실행됨.
 * 모듈 스코프 캐시로 동일 빌드 내 중복 read 회피.
 */
export function getAllPosts(): BlogPost[] {
  if (_useCache && _postsCache) return _postsCache;

  if (!fs.existsSync(BLOG_DIR)) {
    _postsCache = [];
    return _postsCache;
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const filepath = path.join(BLOG_DIR, file);
    const stat = fs.statSync(filepath);
    if (!stat.isFile()) continue;

    const source = fs.readFileSync(filepath, "utf8");
    const { data, content } = matter(source);
    const computedReadingMinutes = Math.ceil(readingTime(content).minutes);

    posts.push({
      frontmatter: data as BlogFrontmatter,
      content,
      filepath,
      computedReadingMinutes,
    });
  }

  const sorted = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  if (_useCache) _postsCache = sorted;
  return sorted;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const all = getAllPosts();
  return all.find((p) => p.frontmatter.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  getAllPosts().forEach((p) => cats.add(p.frontmatter.category));
  return Array.from(cats);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.frontmatter.slug !== slug);

  // 같은 카테고리 우선, 그 다음 태그 겹침 순
  const scored = all.map((p) => {
    let score = 0;
    if (p.frontmatter.category === current.frontmatter.category) score += 10;
    const sharedTags = p.frontmatter.tags.filter((t) =>
      current.frontmatter.tags.includes(t)
    );
    score += sharedTags.length;
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}
