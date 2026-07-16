"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Footer, Header, StickyCta } from "@/components/site-sections";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[mungmungfit] runtime error", error);
    }
  }, [error]);

  return (
    <main id="main-content" className="page">
      <Header />
      <section className="container subpage">
        <span className="eyebrow">Error</span>
        <h1>일시적인 오류가 발생했어요.</h1>
        <p className="lead">
          페이지를 불러오는 중 문제가 생겼습니다. 잠시 후 다시 시도하시거나,
          이 화면이 반복되면 카카오 오픈채팅으로 알려주세요.
        </p>
        <div className="hero-actions" style={{ marginTop: 24 }}>
          <button
            type="button"
            className="button button-primary"
            onClick={() => reset()}
          >
            다시 시도
          </button>
          <Link href="/" className="button button-ghost">
            홈으로 이동
          </Link>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
