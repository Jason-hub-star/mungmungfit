import type { Metadata } from "next";
import { Check, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import {
  FinalCta,
  Footer,
  Header,
  InternalLinks,
  StickyCta,
} from "@/components/site-sections";
import { eventOffer, getSiteUrl, pageContent, site } from "@/content/site";
import { alpha, colors, font, radius, space, weight } from "@/styles/tokens";

const siteUrl = getSiteUrl();
const pricingContent = pageContent.pricingPage;

export const metadata: Metadata = {
  title: pricingContent.metadataTitle,
  description: pricingContent.metadataDescription,
  alternates: { canonical: "/pricing" },
};

const offerJsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: pricingContent.offerName,
  description: pricingContent.offerDescription,
  price: String(eventOffer.packagePrice),
  priceCurrency: "KRW",
  availability: "https://schema.org/InStock",
  validThrough: "2027-12-31",
  seller: {
    "@type": "LocalBusiness",
    name: site.name,
    url: siteUrl,
  },
};

export default function PricingPage() {
  const savings = eventOffer.packageOriginalPrice - eventOffer.packagePrice;
  const formatKrw = (n: number) => n.toLocaleString("ko-KR");

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJsonLd) }}
      />
      <Header />
      <section className="container subpage">
        <span className="eyebrow">{pricingContent.eyebrow}</span>
        <h1>{pricingContent.title}</h1>
        <p className="lead">{pricingContent.lead}</p>
        <InternalLinks />

        {eventOffer.active && (
          <article className="price-feature">
            <span className="price-feature-badge">
              <Sparkles size={14} aria-hidden /> {eventOffer.badge}
            </span>
            <h3 className="price-feature-title">{pricingContent.packageTitle}</h3>
            <p className="price-feature-desc">
              {eventOffer.description}. {pricingContent.packageDescriptionSuffix}
            </p>
            <div className="price-feature-amount">
              <span className="price-feature-strike">
                {formatKrw(eventOffer.packageOriginalPrice)}원
              </span>
              <span className="price-feature-now">
                {formatKrw(eventOffer.packagePrice)}
                <small>원</small>
              </span>
              <span className="price-feature-save">
                {formatKrw(savings)}
                {pricingContent.saveSuffix}
              </span>
            </div>
            <ul className="price-feature-list">
              <li>
                <Check size={18} aria-hidden /> {pricingContent.perSessionPrefix}{" "}
                {formatKrw(eventOffer.packagePerSessionPrice)}원
                <span className="price-feature-list-hint">
                  ({pricingContent.discountHintPrefix}{" "}
                  {eventOffer.packageDiscountPercent}
                  {pricingContent.discountHintSuffix})
                </span>
              </li>
              {pricingContent.packageItems.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden /> {item}
                </li>
              ))}
            </ul>
            <div className="hero-actions price-feature-actions">
              <a className="button button-light-outline" href={site.kakaoUrl}>
                <MessageCircle size={18} aria-hidden />
                {pricingContent.packageCta}
              </a>
              <a className="button button-light-outline" href={site.phoneHref}>
                <Phone size={18} aria-hidden />
                {site.phoneDisplay}
              </a>
            </div>
          </article>
        )}

        <div className="price-layout" style={{ marginTop: space.xxl }}>
          <article className="card price-card">
            <h3>{pricingContent.singleTitle}</h3>
            <div className="price">
              {formatKrw(eventOffer.singlePrice)}<small>원~</small>
            </div>
            <p>{pricingContent.singleBody}</p>
            <ul className="plain-list" style={{ marginTop: space.lg }}>
              {pricingContent.singleItems.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="card price-card">
            <h3>{pricingContent.travelTitle}</h3>
            <ul className="plain-list">
              {pricingContent.travelItems.map((item) => (
                <li key={item}>
                  <MapPin size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="section-text"
              style={{ marginTop: space.lg, fontSize: font.small }}
            >
              {pricingContent.travelNote}
            </p>
          </article>
        </div>

        <article
          className="card sub-card"
          style={{ marginTop: space.xxl, background: alpha.greenSoft08 }}
        >
          <h2>{pricingContent.recommendTitle}</h2>
          <ul className="plain-list">
            {pricingContent.recommendItems.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden /> {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
      <FinalCta />
      <Footer />
      <StickyCta />
    </main>
  );
}
