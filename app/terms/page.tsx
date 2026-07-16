import type { Metadata } from "next";
import {
  Footer,
  Header,
  StickyCta,
} from "@/components/site-sections";
import { Breadcrumb } from "@/components/breadcrumb";
import {
  buildBreadcrumbJsonLd,
  businessInfo,
  getBusinessAddressDisplay,
  getSiteUrl,
} from "@/content/site";
import { space } from "@/styles/tokens";

const siteUrl = getSiteUrl();

const TITLE = "이용약관";
const DESCRIPTION =
  "멍멍피트 강아지 방문 트레이닝 서비스의 이용 조건·환불 정책·예약 및 취소·책임 한도·분쟁 해결 절차를 안내합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} | 멍멍피트`,
    description: DESCRIPTION,
    url: `${siteUrl}/terms`,
  },
};

const EFFECTIVE_DATE = "2026-05-13";

export default function TermsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: TITLE, path: "/terms" },
  ]);

  const info = businessInfo;
  const addressLine = getBusinessAddressDisplay();

  return (
    <main id="main-content" className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <Breadcrumb
          crumbs={[
            { name: "홈", path: "/" },
            { name: TITLE },
          ]}
        />
        <span className="eyebrow">Terms of Service</span>
        <h1>{TITLE}</h1>
        <p className="lead">
          본 약관은 멍멍피트(이하 &quot;회사&quot;)가 제공하는 강아지 방문 트레이닝,
          독피트니스, 자가진단, 콘텐츠 서비스의 이용 조건과 절차, 회사와 보호자(이용자)의
          권리·의무를 규정합니다.
        </p>

        <div className="legal-doc" style={{ marginTop: space.xxl }}>
          <section>
            <h2>제1조 (목적)</h2>
            <p>
              본 약관은 회사가 운영하는 웹사이트와 부속 채널(카카오 오픈채팅, 네이버 폼, 당근 로컬 프로필 등)을 통해
              제공되는 강아지 방문 트레이닝 서비스의 이용 절차를 명확히 함으로써, 회사와 보호자 간의 권리·의무·책임을
              규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2>제2조 (용어의 정의)</h2>
            <ul>
              <li>&quot;서비스&quot;란 회사가 제공하는 방문 트레이닝 수업, 독피트니스 도구 활용 수업, 보호자 핸들링 코칭, 자가진단, 상담을 의미합니다.</li>
              <li>&quot;보호자&quot;란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.</li>
              <li>&quot;수업&quot;이란 회사 소속 트레이너가 직접 방문하여 진행하는 1회 또는 회차별 트레이닝 단위를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2>제3조 (서비스 내용)</h2>
            <ul>
              <li>강아지 방문 트레이닝(생활환경 기반 문제행동 교정·산책 핸들링)</li>
              <li>독피트니스 수업(코어·균형·고유수용성 운동, 도구 활용)</li>
              <li>보호자 핸들링 코칭</li>
              <li>온라인 자가진단 도구 및 콘텐츠 제공</li>
              <li>카카오 오픈채팅을 통한 사전·사후 상담</li>
            </ul>
          </section>

          <section>
            <h2>제4조 (이용 신청 및 성립)</h2>
            <p>
              보호자는 카카오 오픈채팅, 전화, 네이버 폼 중 한 가지 채널로 신청합니다.
              회사가 일정·지역·강아지 상태를 확인하여 수락 의사를 회신한 시점에 서비스 계약이 성립합니다.
              회사는 일정 또는 안전상 사유가 있을 경우 신청을 거절할 수 있습니다.
            </p>
          </section>

          <section>
            <h2>제5조 (수업료·결제)</h2>
            <ul>
              <li>회차별 또는 패키지 단위로 수업료가 책정되며, 정확한 금액은 상담 시 안내합니다.</li>
              <li>결제는 사전 안내한 계좌로 무통장 입금하는 방식이 기본입니다. 회사가 별도 결제 수단을 제공할 경우 사전에 명시합니다.</li>
              <li>출장 지역에 따라 출장비가 추가될 수 있으며, 사전 안내됩니다.</li>
            </ul>
          </section>

          <section>
            <h2>제6조 (1회차 환불 보장)</h2>
            <p>
              회사는 보호자의 신뢰 확보를 위해 다음의 환불 정책을 운영합니다.
            </p>
            <ul>
              <li>패키지를 결제한 보호자가 1회차 수업 후 만족하지 못한 경우, 1회차 수업료를 제외한 잔액 전액을 환불합니다.</li>
              <li>환불 의사는 1회차 수업 종료 후 7일 이내에 카카오 오픈채팅 또는 이메일로 통보해야 합니다.</li>
              <li>강아지의 일방적 사유(예: 보호자가 임의로 수업을 중단)나 회사의 통제를 벗어난 사유로 인한 손해는 환불 대상에서 제외됩니다.</li>
            </ul>
          </section>

          <section>
            <h2>제7조 (예약 변경·취소)</h2>
            <ul>
              <li>예약 변경·취소는 수업 48시간 전까지 통보 시 위약금 없이 가능합니다.</li>
              <li>24~48시간 전 통보 시 수업료의 50%, 24시간 이내 통보 또는 무단 불참(No-show) 시 수업료의 100%가 차감됩니다.</li>
              <li>천재지변·강아지 응급 상황·트레이너 사유로 인한 변경은 위약금 없이 일정을 재조정합니다.</li>
            </ul>
          </section>

          <section>
            <h2>제8조 (보호자의 의무)</h2>
            <ul>
              <li>강아지 건강 상태(질병·외상·복용 약 등)를 사전에 정확히 알릴 의무</li>
              <li>수업 환경의 기본 안전 확보(이탈 방지, 위험 물품 정리 등)</li>
              <li>예방 접종, 광견병·심장사상충 등 기본 건강 관리 책임</li>
              <li>트레이너에 대한 정당한 존중 — 폭언·폭행·성희롱 시 회사는 즉시 서비스를 중단할 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2>제9조 (책임 한도)</h2>
            <p>
              회사는 트레이너의 전문성과 안전 수칙에 기반해 수업을 진행하지만, 강아지의 개체차이, 보호자의 환경 조건,
              수업 외 시간 상황 등 회사의 합리적 통제 범위를 벗어난 사유로 발생한 결과(질병 악화, 행동 재발 등)에
              대해서는 책임을 지지 않습니다. 회사의 고의·중과실이 명백한 경우 관련 법령에 따라 책임을 부담합니다.
            </p>
          </section>

          <section>
            <h2>제10조 (지식재산권)</h2>
            <p>
              웹사이트의 글·사진·영상·콘텐츠와 트레이너가 제공한 수업 자료의 저작권은 회사 또는 정당한 저작권자에게
              귀속됩니다. 보호자는 사전 동의 없이 상업적 용도로 복제·배포·전송할 수 없습니다.
            </p>
          </section>

          <section>
            <h2>제11조 (분쟁 해결)</h2>
            <p>
              회사와 보호자 간에 분쟁이 발생할 경우 상호 신의에 따라 협의로 해결하는 것을 원칙으로 합니다.
              협의가 어려운 경우 회사 소재지를 관할하는 법원을 합의관할 법원으로 합니다.
            </p>
          </section>

          <section>
            <h2>제12조 (사업자 정보)</h2>
            <ul>
              {info.businessName && <li>운영사: {info.businessName}</li>}
              {info.representativeName && <li>대표자: {info.representativeName}</li>}
              {info.registrationNumber && <li>사업자등록번호: {info.registrationNumber}</li>}
              <li>통신판매업: {info.telecomSalesNumber ?? "신고면제"}</li>
              {addressLine && <li>사업장 소재지: {addressLine}</li>}
              {info.email && (
                <li>
                  이메일: <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
              )}
            </ul>
          </section>

          <section>
            <h2>부칙</h2>
            <p>본 약관은 {EFFECTIVE_DATE}부터 시행합니다.</p>
          </section>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
