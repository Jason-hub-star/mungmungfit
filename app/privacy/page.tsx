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

const TITLE = "개인정보처리방침";
const DESCRIPTION =
  "멍멍피트가 보호자로부터 수집하는 개인정보의 항목, 처리 목적, 보유 기간, 위탁 업체, 정보주체의 권리를 안내합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${TITLE} | 멍멍피트`,
    description: DESCRIPTION,
    url: `${siteUrl}/privacy`,
  },
};

const EFFECTIVE_DATE = "2026-05-13";

export default function PrivacyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: TITLE, path: "/privacy" },
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
        <span className="eyebrow">Privacy Policy</span>
        <h1>{TITLE}</h1>
        <p className="lead">
          멍멍피트(이하 &quot;회사&quot;)는 보호자의 개인정보를 소중하게 다루며,
          개인정보 보호법을 비롯한 관계 법령을 준수합니다. 본 방침은 회사가
          제공하는 강아지 방문 트레이닝·독피트니스·자가진단 서비스에 적용됩니다.
        </p>

        <div className="legal-doc" style={{ marginTop: space.xxl }}>
          <section>
            <h2>1. 수집하는 개인정보 항목</h2>
            <ul>
              <li>필수: 보호자 이름(별칭), 연락처(전화·카카오 ID), 강아지 기본정보(견종·나이·체중·생활환경)</li>
              <li>선택: 이메일, 사진·영상(상담을 위해 보호자가 첨부한 자료), 거주 지역</li>
              <li>자동 수집: 접속 IP(익명화), 브라우저 종류, 방문 페이지, 체류 시간(Vercel Analytics·Speed Insights를 통한 비식별 통계)</li>
            </ul>
          </section>

          <section>
            <h2>2. 개인정보 수집·이용 목적</h2>
            <ul>
              <li>방문 트레이닝 상담·예약 관리 및 보호자 응대</li>
              <li>강아지 상태에 맞춘 수업 설계·자료 송부</li>
              <li>서비스 품질 개선을 위한 통계 분석(비식별 자료)</li>
              <li>분쟁 처리 및 법령상 의무 이행</li>
            </ul>
          </section>

          <section>
            <h2>3. 개인정보 보유·이용 기간</h2>
            <p>
              수집·이용 목적이 달성된 후 즉시 파기하는 것이 원칙이며, 다음의 경우는 명시된 기간 동안 보관합니다.
            </p>
            <ul>
              <li>상담·문의 기록: 응대 종료 후 3개월(분쟁 대응 목적)</li>
              <li>계약·결제 관련 기록: 관련 법령에 따라 최대 5년</li>
              <li>접속 로그(비식별): 6개월</li>
            </ul>
          </section>

          <section>
            <h2>4. 개인정보 처리 위탁</h2>
            <p>회사는 원활한 서비스 제공을 위해 다음의 업무를 위탁하고 있으며, 위탁 계약 시 개인정보 보호 관련 사항을 반영합니다.</p>
            <ul>
              <li>웹사이트 호스팅·로그 분석: Vercel Inc. (미국, IP 익명화 처리)</li>
              <li>상담 채널 운영: 카카오톡 오픈채팅(주식회사 카카오)</li>
              <li>사전 상담 폼: 네이버 폼(NAVER Corp.) — 보호자가 자발적으로 제출한 항목에 한함</li>
            </ul>
          </section>

          <section>
            <h2>5. 쿠키 및 유사 기술</h2>
            <p>
              회사는 서비스 품질 개선과 사용자 분석을 위해 Vercel Analytics와 Speed Insights를 사용하며, 두 도구 모두
              IP 주소를 익명화하여 처리합니다. 보호자는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2>6. 정보주체의 권리·의무</h2>
            <p>보호자는 언제든 다음의 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람·정정·삭제 요청</li>
              <li>처리 정지 요구</li>
              <li>동의 철회</li>
            </ul>
            <p>
              위 권리는 아래 책임자 연락처를 통해 행사할 수 있으며, 회사는 지체 없이 조치합니다.
            </p>
          </section>

          <section>
            <h2>7. 개인정보의 파기 절차 및 방법</h2>
            <p>
              보유 기간 경과 시 전자적 파일은 복구 불가능한 방법으로, 종이 문서는 분쇄 또는 소각 방식으로 파기합니다.
            </p>
          </section>

          <section>
            <h2>8. 개인정보 보호 책임자</h2>
            <ul>
              {info.representativeName && <li>책임자: {info.representativeName}</li>}
              {info.businessName && <li>운영사: {info.businessName}</li>}
              {info.email && (
                <li>
                  이메일: <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
              )}
              {info.registrationNumber && <li>사업자등록번호: {info.registrationNumber}</li>}
              {addressLine && <li>사업장 소재지: {addressLine}</li>}
            </ul>
          </section>

          <section>
            <h2>9. 권익침해 구제 방법</h2>
            <p>
              개인정보 침해로 인한 신고·상담은 다음 기관에서 도움을 받을 수 있습니다.
            </p>
            <ul>
              <li>개인정보분쟁조정위원회: <a href="https://www.kopico.go.kr" rel="noopener noreferrer" target="_blank">www.kopico.go.kr</a> / 1833-6972</li>
              <li>한국인터넷진흥원 개인정보침해신고센터: <a href="https://privacy.kisa.or.kr" rel="noopener noreferrer" target="_blank">privacy.kisa.or.kr</a> / 118</li>
              <li>경찰청 사이버수사국: <a href="https://ecrm.police.go.kr" rel="noopener noreferrer" target="_blank">ecrm.police.go.kr</a> / 182</li>
            </ul>
          </section>

          <section>
            <h2>10. 방침 변경</h2>
            <p>
              본 방침은 법령·서비스 정책 변동에 따라 변경될 수 있으며, 변경 시 본 페이지에서 최소 7일 전에 공지합니다.
            </p>
            <p>시행일: {EFFECTIVE_DATE}</p>
          </section>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
