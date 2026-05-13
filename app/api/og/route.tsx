// 동적 OG 이미지 생성 — 1200×630, nodejs runtime, 1년 immutable 캐시.
//
// Pretendard otf를 public/fonts/에서 읽어 satori에 전달 → 한국어 정상 렌더.
// Phase 4에서 Edge runtime + 외부 CDN 시도 실패(jsdelivr 403, satori woff2 미지원) 후
// nodejs runtime + 로컬 파일 패턴으로 전환.

import fs from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = false; // 동일 쿼리스트링이면 1년 캐시 헤더로 충분

let cachedFonts: { bold: Buffer; regular: Buffer } | null = null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;
  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const [bold, regular] = await Promise.all([
    fs.readFile(path.join(fontsDir, "Pretendard-Bold.otf")),
    fs.readFile(path.join(fontsDir, "Pretendard-Regular.otf")),
  ]);
  cachedFonts = { bold, regular };
  return cachedFonts;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 80) ??
    "강아지 독피트니스 방문훈련";
  const eyebrow = searchParams.get("eyebrow")?.slice(0, 40) ?? "멍멍피트";

  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #1c4032 0%, #2a5d48 55%, #143628 100%)",
          color: "#faf9f5",
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#ffd9a8",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#d97742",
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            fontWeight: 400,
            color: "rgba(250, 249, 245, 0.78)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 700, color: "#faf9f5" }}>멍멍피트</div>
            <div style={{ fontSize: 22 }}>
              CSCC 국제 독피트니스 트레이너 · 서울·경기·인천·충청
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(250,249,245,0.32)",
              color: "#faf9f5",
              display: "flex",
            }}
          >
            mungmungfit.kr
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Pretendard", data: fonts.bold, style: "normal", weight: 700 },
        { name: "Pretendard", data: fonts.regular, style: "normal", weight: 400 },
      ],
      headers: {
        "Cache-Control":
          "public, max-age=31536000, immutable, s-maxage=31536000",
      },
    },
  );
}
