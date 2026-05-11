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
  dogFitnessTools,
  faqs,
  featuredGallery,
  methodImages,
  methods,
  reviewImages,
  reviews,
  site,
  targetDogs,
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
          강아지 몸부터 단단해지면,
          <br />
          <em>문제행동도 사라집니다.</em>
        </h1>
        <p className="lead">
          CSCC 국제 독피트니스 트레이너 김주영이 밸런스볼·카발레티·디스크로
          강아지 코어와 자신감을 키우고, 보호자 핸들링까지 함께 가르치는
          방문훈련입니다.
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
          비만견·노령견·소심한 강아지·줄당김 강아지·퍼피 사회화 모두 가능.
          방문 지역: 하남·서울·경기·인천·충청.
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
          <strong>독피트니스 도구로 진행하는 1:1 방문훈련</strong>
          <span>강아지 코어·균형 + 보호자 핸들링을 한 수업에서 다룹니다.</span>
        </div>
        <div className="stats" aria-label="수업 핵심 정보">
          <div className="stat">
            <strong>90,000원</strong>
            <span>하남 기준 1회</span>
          </div>
          <div className="stat">
            <strong>75~90분</strong>
            <span>1:1 방문훈련</span>
          </div>
          <div className="stat">
            <strong>CSCC</strong>
            <span>국제 독피트니스 자격</span>
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

export function DogFitnessTools() {
  return (
    <section className="section" id="tools">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">Tools</span>
            <h2>
              사람 필라테스처럼,
              <br />
              강아지에게도 전문 도구가 필요합니다.
            </h2>
          </div>
          <p className="section-text">
            멍멍피트 수업은 산책·놀이로는 닿지 않는 코어 근육과 균형 감각을
            전문 독피트니스 도구로 자극합니다. 트레이너가 직접 가져가니
            보호자가 따로 구입할 필요는 없습니다.
          </p>
        </div>
        <div className="grid grid-3">
          {dogFitnessTools.map((tool) => (
            <article className="card sub-card" key={tool.name}>
              <span className="eyebrow">{tool.target}</span>
              <h3>{tool.name}</h3>
              <p>{tool.effect}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TargetDogs() {
  return (
    <section className="section section-muted" id="target">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">For these dogs</span>
            <h2>
              이런 강아지에게
              <br />
              독피트니스가 답이 됩니다.
            </h2>
          </div>
          <p className="section-text">
            문제행동·체형·나이·견종에 따라 운동 강도와 도구를 다르게 설계합니다.
            우리 강아지가 어디에 해당되는지 확인해보세요.
          </p>
        </div>
        <div className="grid grid-3">
          {targetDogs.map((target) => (
            <article className="card concern-card" key={target.title}>
              <h3>{target.title}</h3>
              <p>{target.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>
              많이 받는 질문에
              <br />
              미리 답해드립니다.
            </h2>
          </div>
          <p className="section-text">
            독피트니스가 처음이라 낯설 수 있어요. 자주 받는 질문을 모아두었으니
            상담 전에 한번 훑어보세요.
          </p>
        </div>
        <div className="grid">
          {faqs.map((item) => (
            <details className="card sub-card" key={item.q}>
              <summary>
                <h3 style={{ display: "inline" }}>Q. {item.q}</h3>
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
