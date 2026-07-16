export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.NAVER_INDEXNOW_KEY?.trim();

  if (!key) {
    return new Response("NAVER_INDEXNOW_KEY is not configured.\n", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(`${key}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
