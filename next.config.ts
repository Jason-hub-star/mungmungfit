import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,

  // 이미지 최적화·캐싱
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
  },

  // 정적 자산 압축
  compress: true,

  // PoweredBy 헤더 제거 (보안 + 가벼움)
  poweredByHeader: false,

  // 라우트별 정적 자산 캐시 헤더
  // (Next.js 16 표준 시그니처: async headers() → Promise<Header[]>)
  // /_next/image는 Next.js가 minimumCacheTTL로 자체 관리하므로 건드리지 않음
  async headers() {
    return [
      {
        // 다운로드한 slot 이미지·트레이닝 사진 등 → 1년 immutable
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 사이트맵·robots → 1시간 (블로그 글 추가 시 빠르게 반영)
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
