import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteUrl, site } from "@/content/site";
import { colors } from "@/styles/tokens";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "멍멍피트 | 강아지 독피트니스 방문훈련 전문",
    template: "%s | 멍멍피트",
  },
  description: site.description,
  keywords: [
    "독피트니스",
    "강아지 독피트니스",
    "강아지 피트니스",
    "강아지 코어 운동",
    "강아지 균형 훈련",
    "강아지 재활 운동",
    "노령견 재활",
    "비만견 다이어트",
    "강아지 방문훈련",
    "강아지 방문교육",
    "독피트니스 방문훈련",
    "멍멍피트",
    "김주영 독피트니스 트레이너",
    "CSCC 독피트니스",
    "서울 강아지 방문훈련",
    "경기 강아지 방문훈련",
    "퍼피 사회화",
    "강아지 줄당김 교정",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: "멍멍피트 | 강아지 독피트니스 방문훈련 전문",
    description: site.description,
    siteName: "멍멍피트",
    images: [
      {
        url: "/images/training/main.jpg",
        width: 1800,
        height: 1596,
        alt: "강아지 독피트니스 방문훈련 - 멍멍피트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "멍멍피트 | 강아지 독피트니스 방문훈련 전문",
    description: site.description,
    images: ["/images/training/main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: colors.green,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
