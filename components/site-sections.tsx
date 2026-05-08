import Link from "next/link";
import Image from "next/image";
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
  concerns,
  credentials,
  featuredGallery,
  methodImages,
  methods,
  reviewImages,
  reviews,
  site,
  trainingGallery,
  trainingProcess,
} from "@/content/site";

export function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">핏</span>
          <span>{site.name}</span>
        </Link>
        <nav className="nav-links" aria-label="주요 메뉴">
          <Link href="/services/dog-fitness">독피트니스</Link>
          <Link href="/services/home-training">방문교육</Link>
          <Link href="/areas/hanam">방문지역</Link>
          <Link href="/reviews">후기</Link>
        </nav>
        <div className="nav-actions">
          <a className="button button-ghost" href={site.phoneHref}>
            <Phone size={17} aria-hidden />
            {site.phoneDisplay}
          </a>
          <a className="button button-kakao" href={site.kakaoUrl}>
            <MessageCircle size={17} aria-hidden />
            상담
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="container hero">
      <div>
        <span className="eyebrow">Dog fitness home training</span>
        <div className="wordmark">
          멍멍<span>피트</span>
        </div>
        <h1>
          몸의 자신감이 생기면,
          <br />
          <em>행동도 달라집니다.</em>
        </h1>
        <p className="lead">
          {site.trainerTitle}가 방문교육과 독피트니스를 결합해 강아지가 몸을
          자유롭게 쓰도록 돕고, 보호자와 함께 핸들링 자신감을 키웁니다.
        </p>
        <div className="hero-actions">
          <a className="button button-kakao" href={site.kakaoUrl}>
            <MessageCircle size={19} aria-hidden />
            카카오톡 상담하기
          </a>
          <a className="button button-primary" href={site.phoneHref}>
            <Phone size={19} aria-hidden />
            전화 상담
          </a>
        </div>
        <p className="note">
          방문 가능 지역: 서울, 경기, 인천, 충청도. 하남/미사는 기본 수업료
          기준으로 안내합니다.
        </p>
      </div>
      <div>
        <div className="photo-card has-photo hero-photo">
          <Image
            src={brandImages.hero.src}
            alt={brandImages.hero.alt}
            fill
            priority
            sizes="(max-width: 940px) 100vw, 520px"
            className="photo-img"
          />
        </div>
        <div className="hero-caption">
          <strong>방문교육과 독피트니스를 결합한 1:1 수업</strong>
          <span>강아지의 몸 사용과 보호자 핸들링을 함께 봅니다.</span>
        </div>
        <div className="stats" aria-label="수업 핵심 정보">
          <div className="stat">
            <strong>90,000원</strong>
            <span>하남 기준 1회</span>
          </div>
          <div className="stat">
            <strong>75~90분</strong>
            <span>1:1 방문수업</span>
          </div>
          <div className="stat">
            <strong>4권역</strong>
            <span>서울·경기·인천·충청</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrainerProfile() {
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
            <div className="photo-label">김주영 트레이너</div>
          </div>
          <div className="certificate-card">
            <Image
              src={brandImages.certificate.src}
              alt={brandImages.certificate.alt}
              fill
              sizes="(max-width: 940px) 100vw, 280px"
              className="photo-img contain"
            />
            <span>CSCC 국제 독피트니스 자격</span>
          </div>
        </div>
        <div>
          <span className="eyebrow">Trainer</span>
          <h2>김주영 독피트니스 트레이너</h2>
          <p className="section-text">
            CSCC 국제 독피트니스 자격과 현장 방문교육 경험을 바탕으로, 강아지가
            자신의 몸을 이해하고 보호자가 안정적으로 다룰 수 있는 수업을
            만듭니다.
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
  return (
    <section className="section" id="concerns">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Problem</span>
            <h2>
              문제행동처럼 보이지만,
              <br />
              자신감 부족에서 시작되는 경우가 많습니다.
            </h2>
          </div>
          <p className="section-text">
            짖음, 줄당김, 흥분, 회피 행동을 혼내기보다 몸의 안정감과 보호자
            핸들링 루틴으로 다시 설계합니다.
          </p>
        </div>
        <div className="grid grid-3">
          {concerns.map((concern) => (
            <div className="card concern-card" key={concern}>
              {concern}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section className="section section-dark" id="method">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Method</span>
            <h2>
              혼내기보다,
              <br />
              몸을 쓰는 법부터 알려줍니다.
            </h2>
          </div>
          <p className="section-text" style={{ color: "rgba(251, 250, 245, 0.78)" }}>
            멍멍피트 수업은 강아지 운동만 하는 시간이 아닙니다. 강아지의 몸,
            보호자의 손, 생활 공간의 동선을 한 번에 다룹니다.
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
  return (
    <section className="section section-dark" id="process">
      <div className="container">
        <span className="eyebrow">Class flow</span>
        <h2>수업은 1시간 15분에서 1시간 30분 정도 진행됩니다.</h2>
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
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Price and area</span>
            <h2>하남 기준 9만원, 지역별 출장비를 명확히 안내합니다.</h2>
          </div>
          <p className="section-text">
            이동 시간과 거리를 기준으로 상담 시 최종 금액을 먼저 안내합니다.
            장거리의 경우 톨비와 주차비가 별도로 발생할 수 있습니다.
          </p>
        </div>
        <div className="price-layout">
          <article className="card price-card price-main">
            <h3>1회 방문수업</h3>
            <div className="price">
              90,000<small>원~</small>
            </div>
            <p>
              하남, 미사 기준 출장비 없음. 서울, 경기, 인천, 충청도는 이동
              거리에 따라 출장비를 상담 후 안내합니다.
            </p>
          </article>
          <article className="card price-card">
            <h3>출장비 권장 기준</h3>
            <ul className="plain-list">
              <li>
                <MapPin size={18} aria-hidden />
                하남/미사: 출장비 없음
              </li>
              <li>
                <MapPin size={18} aria-hidden />
                서울·경기·인천: 2만~5만원 기준
              </li>
              <li>
                <MapPin size={18} aria-hidden />
                충청권·장거리: 일정 확인 후 안내
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ReviewsPreview() {
  return (
    <section className="section section-muted" id="reviews">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2>보호자가 집에서 다시 할 수 있게 남기는 수업.</h2>
          </div>
          <p className="section-text">
            보호자들이 남긴 실제 후기로 우리 수업을 미리 만나보세요.
          </p>
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
              <p>{review.body}</p>
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
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2>수업의 변화를 사진으로 보여드립니다.</h2>
          </div>
          <p className="section-text">
            독피트니스 도구 사용, 산책 핸들링, 보호자 실습 장면들이
            강아지가 어떻게 달라지는지 한눈에 보여줍니다.
          </p>
        </div>
        <div className="gallery-grid">
          {(trainingGallery.length > 0 ? trainingGallery : featuredGallery).map((image) => (
            <div className="gallery-tile" key={image.src}>
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
  return (
    <section className="section">
      <div className="container cta">
        <div>
          <h2>우리 강아지에게 맞는 몸의 자신감부터 상담해보세요.</h2>
          <p>
            현재 고민, 거주 지역, 강아지 나이와 문제 상황을 보내주시면 방문교육
            가능 일정과 예상 비용을 안내합니다.
          </p>
        </div>
        <div className="hero-actions">
          <a className="button button-kakao" href={site.kakaoUrl}>
            <MessageCircle size={18} aria-hidden />
            카카오 상담
          </a>
          <a className="button button-ghost" href={site.phoneHref}>
            <Phone size={18} aria-hidden />
            전화 상담
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <strong>{site.name}</strong>
        <br />
        {site.trainerTitle} · 강아지 방문교육 · 독피트니스 · 방문 가능 지역:
        {site.areas}
        <br />
        상담: {site.phoneDisplay} · 카카오 오픈채팅
      </div>
    </footer>
  );
}

export function StickyCta() {
  return (
    <div className="sticky-cta" aria-label="빠른 상담">
      <a className="button button-kakao" href={site.kakaoUrl}>
        <MessageCircle size={16} aria-hidden />
        카톡
      </a>
      <a className="button button-primary" href={site.phoneHref}>
        <Phone size={16} aria-hidden />
        전화
      </a>
    </div>
  );
}

export function InternalLinks() {
  return (
    <div className="tag-row" aria-label="관련 페이지">
      <Link className="tag" href="/services/dog-fitness">
        <Sparkles size={14} aria-hidden /> 독피트니스
      </Link>
      <Link className="tag" href="/services/home-training">
        강아지 방문교육
      </Link>
      <Link className="tag" href="/services/walk-training">
        산책교육
      </Link>
      <Link className="tag" href="/areas/hanam">
        하남 방문교육
      </Link>
      <Link className="tag" href="/reviews">
        실제 후기
      </Link>
    </div>
  );
}

export function ContactAside() {
  return (
    <aside className="card price-card">
      <h3>상담할 때 보내주시면 좋아요</h3>
      <ul className="plain-list">
        <li><Check size={18} aria-hidden /> 거주 지역과 방문 희망 시간</li>
        <li><Check size={18} aria-hidden /> 강아지 나이, 견종, 체중</li>
        <li><Check size={18} aria-hidden /> 가장 고민되는 행동 1~2가지</li>
        <li><Check size={18} aria-hidden /> 산책 영상이나 문제 상황 영상</li>
      </ul>
      <div className="hero-actions">
        <a className="button button-kakao" href={site.kakaoUrl}>
          <MessageCircle size={18} aria-hidden />
          상담하기
        </a>
        <a className="button button-ghost" href={site.phoneHref}>
          <ArrowRight size={18} aria-hidden />
          전화하기
        </a>
      </div>
    </aside>
  );
}
