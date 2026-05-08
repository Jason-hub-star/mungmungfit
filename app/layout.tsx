import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSiteUrl, site } from "@/content/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "멍멍피트 | 김주영 독피트니스 트레이너",
    template: "%s | 멍멍피트",
  },
  description: site.description,
  keywords: [
    "멍멍피트",
    "김주영 훈련사",
    "김주영 독피트니스 트레이너",
    "강아지 방문교육",
    "강아지 피트니스",
    "독피트니스",
    "하남 강아지 방문교육",
    "서울 강아지 방문교육",
    "강아지 산책교육",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    title: "멍멍피트 | 강아지 방문교육 + 독피트니스",
    description: site.description,
    siteName: "멍멍피트",
    images: [
      {
        url: "/images/training/main.jpg",
        width: 1800,
        height: 1596,
        alt: "멍멍피트 강아지 방문 독피트니스 수업",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "멍멍피트 | 강아지 방문교육 + 독피트니스",
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
  themeColor: "#1f3a2e",
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
