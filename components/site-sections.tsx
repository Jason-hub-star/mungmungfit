import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import {
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  brandImages,
  businessInfo,
  comparisonRows,
  concerns,
  credentials,
  dogFitnessTools,
  eventOffer,
  faqs,
  featuredGallery,
  guarantees,
  methodImages,
  methods,
  pageContent,
  reviewImages,
  reviews,
  site,
  targetDogs,
  trainingGallery,
  trainingProcess,
  trustStats,
} from "@/content/site";
import { PhotoSlot } from "@/components/photo-slot";
import { font, space } from "@/styles/tokens";

const navContent = pageContent.nav;
const sectionContent = pageContent.sections;

export function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark" aria-hidden>
            <Image
              src="/images/brand/mungmungfit-icon.png"
              alt=""
              width={34}
              height={34}
              className="logo-mark-img"
              priority
            />
          </span>
          <span>{site.name}</span>
        </Link>
        <nav className="nav-links" aria-label="주요 메뉴">
          {navContent.links.map((link) => (
            <Link href={link.href as Route} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="button button-ghost" href={site.phoneHref}>
            <Phone size={17} aria-hidden />
            {site.phoneDisplay}
          </a>
          <a className="button button-kakao" href={site.kakaoUrl}>
            <MessageCircle size={17} aria-hidden />
            {navContent.consultLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  const copy = sectionContent.hero;

  return (
    <>
      <section className="hero-full" aria-label={copy.ariaLabel}>
        <div className="hero-backdrop">
          <PhotoSlot slotId="hero-1" priority sizes="100vw" />
        </div>
        <div className="hero-overlay" aria-hidden />
        <div className="container hero-content">
          <span className="eyebrow hero-eyebrow">{copy.eyebrow}</span>
          <h1 className="hero-headline">
            {copy.headline[0]}
            <br />
            <em>{copy.headline[1]}</em>
          </h1>
          <p className="hero-lead">
            {copy.lead[0]}
            <br />
            {copy.lead[1]}
          </p>
          <div className="hero-actions">
            <a className="button button-kakao" href={site.kakaoUrl}>
              <MessageCircle size={19} aria-hidden />
              {copy.primaryCta}
            </a>
            <a className="button button-light-outline" href={site.phoneHref}>
              <Phone size={19} aria-hidden />
              {site.phoneDisplay}
            </a>
          </div>
          <p className="hero-note">{copy.note}</p>
        </div>
        <div className="hero-scroll-hint" aria-hidden>
          {copy.scrollHint}
        </div>
      </section>
      <section className="hero-stat-strip" aria-label={copy.statsAriaLabel}>
        <div className="container">
          <div className="stats stats-trust">
            {trustStats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Guarantee />
    </>
  );
}

export function TrainerProfile() {
  const copy = sectionContent.trainer;

  return (
    <section className="section section-muted" id="trainer">
      <div className="container profile">
        <div className="profile-media-stack">
          <div className="photo-card has-photo profile-photo">
            <Image
              src={brandImages.trainer.src}
              alt={brandImages.trainer.alt}
              fill
              sizes="(max-width: 940px) 100vw, 280px"
              className="photo-img"
            />
            <div className="photo-label">{copy.photoLabel}</div>
          </div>
          <div className="certificate-card">
            <Image
              src={brandImages.certificate.src}
              alt={brandImages.certificate.alt}
              fill
              sizes="(max-width: 940px) 100vw, 280px"
              className="photo-img contain"
            />
            <span>{copy.certificateLabel}</span>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <PhotoSlot
              slotId="mei-action"
              sizes="(max-width: 940px) 100vw, 560px"
            />
          </div>
        </div>
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p className="section-text">{copy.body[0]}</p>
          <p className="section-text" style={{ marginTop: space.sm, fontSize: font.body }}>
            {copy.body[1]}
          </p>
          <div className="badge-list">
            {credentials.map((credential) => (
              <span className="badge" key={credential}>
                <Check size={15} aria-hidden />
                {credential}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Concerns() {
  const copy = sectionContent.concerns;

  return (
    <section className="section" id="concerns">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="concern-grid">
          {concerns.map((concern) => (
            <article className="concern-photo-card" key={concern.title}>
              <PhotoSlot
                slotId={concern.slotId}
                sizes="(max-width: 940px) 100vw, 50vw"
              />
              <div className="concern-photo-body">
                <h3>{concern.title}</h3>
                <p>{concern.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Method() {
  const copy = sectionContent.method;

  return (
    <section className="section section-dark" id="method">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text" style={{ color: "rgba(251, 250, 245, 0.78)" }}>
            {copy.body}
          </p>
        </div>
        <div className="grid grid-3">
          {methods.map((method, index) => (
            <article className="card method-card" key={method.title}>
              <div className="method-image">
                <Image
                  src={methodImages[index]?.src ?? trainingGallery[index].src}
                  alt={methodImages[index]?.alt ?? trainingGallery[index].alt}
                  fill
                  sizes="(max-width: 940px) 100vw, 33vw"
                  className="photo-img"
                />
              </div>
              <span className="method-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{method.title}</h3>
              <p>{method.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const copy = sectionContent.process;

  return (
    <section className="section section-dark" id="process">
      <div className="container">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <div
          style={{
            marginTop: "24px",
            marginBottom: "32px",
            maxWidth: "880px",
          }}
        >
          <PhotoSlot
            slotId="process-flow"
            sizes="(max-width: 940px) 100vw, 880px"
          />
        </div>
        <div className="process-list">
          {trainingProcess.map((step, index) => (
            <div className="process-item" key={step.title}>
              <div className="process-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const copy = sectionContent.pricing;
  const formatKrw = (n: number) => n.toLocaleString("ko-KR");

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>

        <article className="price-feature" aria-label="4회 패키지 할인 안내">
          <span className="price-feature-badge">
            <Sparkles size={14} aria-hidden /> {copy.packageBadge}
          </span>
          <h3 className="price-feature-title">{copy.packageTitle}</h3>
          <p className="price-feature-caption">{eventOffer.validUntil}</p>
          <p className="price-feature-desc">{copy.packageBody}</p>
          <div className="price-feature-amount">
            <span className="price-feature-strike">
              {formatKrw(eventOffer.packageOriginalPrice)}원
            </span>
            <span className="price-feature-now">
              {formatKrw(eventOffer.packagePrice)}
              <small>원</small>
            </span>
            <span className="price-feature-save">
              {copy.packageDiscountLabel} {eventOffer.packageDiscountPercent}% 할인
            </span>
          </div>
          <p className="price-feature-list-hint">
            {copy.packagePerSession} {formatKrw(eventOffer.packagePerSessionPrice)}원
          </p>
          <ul className="price-feature-list">
            {copy.packageItems.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="price-feature-actions">
            <a className="button button-kakao" href={site.kakaoUrl}>
              <MessageCircle size={18} aria-hidden />
              {copy.packageCta}
            </a>
            <a className="button button-light-outline" href={site.phoneHref}>
              <Phone size={18} aria-hidden />
              {site.phoneDisplay}
            </a>
          </div>
        </article>

        <div className="price-secondary-grid">
          <article className="card price-card">
            <span className="tool-card-target">Single</span>
            <h3>{copy.singleTitle}</h3>
            <div className="price">
              {formatKrw(eventOffer.singlePrice)}
              <small>{copy.singleSuffix}</small>
            </div>
            <p>{copy.singleBody}</p>
            <ul className="plain-list">
              {copy.singleItems.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="card price-card">
            <span className="tool-card-target">Travel</span>
            <h3>{copy.travelTitle}</h3>
            <ul className="plain-list">
              {copy.travelItems.map((item) => (
                <li key={item}>
                  <MapPin size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: space.md, fontSize: font.small, color: "var(--ink-muted)" }}>
              {copy.travelNote}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ReviewsPreview() {
  const copy = sectionContent.reviewsPreview;

  return (
    <section className="section section-muted" id="reviews">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="review-image-grid preview">
          {reviews.map((review, index) => (
            <article className="card review-card" key={review.title}>
              <div className="review-shot">
                <Image
                  src={reviewImages[index]?.src ?? reviewImages[0].src}
                  alt={reviewImages[index]?.alt ?? review.title}
                  width={reviewImages[index]?.width ?? 1080}
                  height={reviewImages[index]?.height ?? 1080}
                  sizes="(max-width: 940px) 100vw, 33vw"
                  className="review-img"
                />
              </div>
              <h3>{review.title}</h3>
              {"meta" in review && review.meta ? (
                <p className="review-meta">{review.meta}</p>
              ) : null}
              <p className="review-body">{review.body}</p>
              <div className="tag-row">
                {review.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="review-more">
          <Link className="review-more-link" href={"/reviews" as Route}>
            더 많은 후기 보기 <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const copy = sectionContent.gallery;

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="gallery-grid">
          {(trainingGallery.length > 0 ? trainingGallery : featuredGallery).map((image, index) => (
            <div className="gallery-tile" key={`${image.src}-${index}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 940px) 50vw, 33vw"
                className="photo-img"
              />
              {"label" in image && image.label && <span>{image.label}</span>}
              {"description" in image && image.description && <span>{image.description}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const copy = sectionContent.finalCta;

  return (
    <section className="section">
      <div className="container cta">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <div className="hero-actions">
          <a className="button button-kakao" href={site.kakaoUrl}>
            <MessageCircle size={18} aria-hidden />
            {copy.kakaoLabel}
          </a>
          <a className="button button-ghost" href={site.phoneHref}>
            <Phone size={18} aria-hidden />
            {copy.phoneLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const copy = sectionContent.footer;
  const info = businessInfo;
  const sns = info.sameAs ?? [];

  return (
    <footer className="footer">
      <div className="container footer-rows">
        <div className="footer-row">
          <strong>{site.name}</strong>
        </div>
        <div className="footer-row">
          {site.trainerTitle} · {copy.serviceText} · {copy.areaPrefix}
          {site.areas}
        </div>
        <div className="footer-row">
          {copy.consultPrefix} {site.phoneDisplay} · {copy.kakaoText}
        </div>
        {info.openingHoursDisplay && (
          <div className="footer-row">
            {copy.hoursPrefix} {info.openingHoursDisplay}
          </div>
        )}
        {info.email && (
          <div className="footer-row">
            {copy.emailPrefix}{" "}
            <a href={`mailto:${info.email}`}>{info.email}</a>
          </div>
        )}
        {info.registrationNumber && (
          <div className="footer-row">
            {copy.businessRegPrefix} {info.registrationNumber}
          </div>
        )}
        {sns.length > 0 && (
          <div className="footer-row">
            {copy.snsHeading}
            <span className="footer-sns">
              {sns.map((url) => {
                const label = (() => {
                  try {
                    return new URL(url).hostname.replace(/^www\./, "");
                  } catch {
                    return url;
                  }
                })();
                return (
                  <a key={url} href={url} rel="noopener noreferrer" target="_blank">
                    {label}
                  </a>
                );
              })}
            </span>
          </div>
        )}
        <small className="footer-credit" style={{ fontSize: font.small }}>
          {copy.imageCredit}
        </small>
      </div>
    </footer>
  );
}

export function StickyCta() {
  const copy = sectionContent.stickyCta;

  return (
    <div className="sticky-cta" aria-label={copy.ariaLabel}>
      <a className="button button-kakao" href={site.kakaoUrl}>
        <MessageCircle size={16} aria-hidden />
        {copy.kakaoLabel}
      </a>
      <a className="button button-primary" href={site.phoneHref}>
        <Phone size={16} aria-hidden />
        {copy.phoneLabel}
      </a>
    </div>
  );
}

const toolSlotIds = [
  "tool-balance-ball",
  "tool-cavaletti",
  "tool-fitpaws",
  "tool-proprioception",
  "tool-hurdle",
  "tool-routine",
];

export function DogFitnessTools() {
  const copy = sectionContent.tools;

  return (
    <section className="section" id="tools">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div
          className="tools-carousel"
          role="region"
          aria-label="독피트니스 도구 모음 (좌우 스크롤)"
        >
          <ul className="tools-track" tabIndex={0} aria-label="좌우 화살표 키로 탐색">
            {dogFitnessTools.map((tool, i) => (
              <li className="tools-snap" key={tool.name}>
                <article className="tool-card">
                  <PhotoSlot
                    slotId={toolSlotIds[i]}
                    sizes="(max-width: 940px) 80vw, 320px"
                  />
                  <div className="tool-card-body">
                    <span className="tool-card-target">{tool.target}</span>
                    <h3>{tool.name}</h3>
                    <p>{tool.effect}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="tools-hint" aria-hidden>
            좌우로 넘겨보세요 →
          </p>
        </div>
      </div>
    </section>
  );
}

const targetSlotIds = [
  "target-obese",
  "target-senior",
  "target-shy",
  "target-energetic",
  "target-puppy",
  "target-leash",
];

export function TargetDogs() {
  const copy = sectionContent.targetDogs;

  return (
    <section className="section section-muted" id="target">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="tools-library">
          {targetDogs.map((target, i) => (
            <article className="tool-card" key={target.title}>
              <PhotoSlot
                slotId={targetSlotIds[i]}
                sizes="(max-width: 940px) 100vw, 33vw"
              />
              <div className="tool-card-body">
                <h3>{target.title}</h3>
                <p>{target.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const copy = sectionContent.beforeAfter;
  const pairs = [
    { before: "before-1", after: "after-1", label: "Case 01" },
    { before: "before-2", after: "after-2", label: "Case 02" },
    { before: "before-3", after: "after-3", label: "Case 03" },
  ];
  return (
    <section className="section" id="before-after">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="before-after-grid">
          {pairs.map((p) => (
            <div className="before-after-pair" key={p.label}>
              <PhotoSlot
                slotId={p.before}
                sizes="(max-width: 940px) 50vw, 25vw"
              />
              <PhotoSlot
                slotId={p.after}
                sizes="(max-width: 940px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const copy = sectionContent.faq;

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="grid">
          {faqs.map((item) => (
            <details className="card sub-card" key={item.q}>
              <summary>
                <h3 style={{ display: "inline" }}>
                  {copy.questionPrefix} {item.q}
                </h3>
              </summary>
              <p style={{ marginTop: "0.75rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InternalLinks() {
  const links = sectionContent.internalLinks;

  return (
    <div className="tag-row" aria-label="관련 페이지">
      {links.map((link) => (
        <Link className="tag" href={link.href as Route} key={link.href}>
          {link.icon === "sparkles" && <Sparkles size={14} aria-hidden />}
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function ContactAside() {
  const copy = sectionContent.contactAside;

  return (
    <aside className="card price-card">
      <h3>{copy.title}</h3>
      <ul className="plain-list">
        {copy.items.map((item) => (
          <li key={item}>
            <Check size={18} aria-hidden /> {item}
          </li>
        ))}
      </ul>
      <div className="hero-actions">
        <a className="button button-kakao" href={site.kakaoUrl}>
          <MessageCircle size={18} aria-hidden />
          {copy.kakaoLabel}
        </a>
        <a className="button button-ghost" href={site.phoneHref}>
          <ArrowRight size={18} aria-hidden />
          {copy.phoneLabel}
        </a>
      </div>
    </aside>
  );
}

const guaranteeIcons: Record<string, string> = {
  phone: "/images/brand/guarantees/free-consultation.png",
  shield: "/images/brand/guarantees/refund-guarantee.png",
  clock: "/images/brand/guarantees/fast-schedule.png",
};

export function Guarantee() {
  return (
    <section className="guarantee-strip" aria-labelledby="guarantee-heading">
      <h2 id="guarantee-heading" className="sr-only">
        신뢰·보장 안내
      </h2>
      <div className="container guarantee-grid">
        {guarantees.map((g) => {
          const iconSrc = guaranteeIcons[g.icon] ?? guaranteeIcons.shield;
          return (
            <div className="guarantee-card" key={g.title}>
              <div className="guarantee-icon" aria-hidden>
                <Image
                  src={iconSrc}
                  alt=""
                  width={58}
                  height={58}
                  className="guarantee-icon-img"
                />
              </div>
              <div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Comparison() {
  const copy = sectionContent.comparison;

  return (
    <section className="section" id="comparison">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </h2>
          </div>
          <p className="section-text">{copy.body}</p>
        </div>
        <div className="comparison-table" role="table">
          <div className="comparison-row comparison-head" role="row">
            <span role="columnheader">{copy.headers[0]}</span>
            <span role="columnheader">{copy.headers[1]}</span>
            <span role="columnheader" className="comparison-highlight">
              {copy.headers[2]}
            </span>
          </div>
          {comparisonRows.map((row) => (
            <div className="comparison-row" key={row.label} role="row">
              <span role="cell" className="comparison-label">
                {row.label}
              </span>
              <span role="cell" className="comparison-common">
                {row.common}
              </span>
              <span role="cell" className="comparison-mungmungfit">
                {row.mungmungfit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
