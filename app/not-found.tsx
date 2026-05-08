import Link from "next/link";
import { Header, Footer, StickyCta } from "@/components/site-sections";

export default function NotFound() {
  return (
    <main className="page">
      <Header />
      <section className="container subpage">
        <span className="eyebrow">404</span>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p className="lead">
          주소가 바뀌었거나 아직 준비 중인 페이지입니다. 멍멍피트 홈으로
          이동해 상담 정보를 확인해 주세요.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            홈으로 이동
          </Link>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
