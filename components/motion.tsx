"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function motionDisabled() {
  // 모션 축소 설정 존중 + 자동화 렌더(QA 스크린샷·Lighthouse·크롤러)에서는
  // 스크롤 리빌 없이 전체 콘텐츠를 즉시 노출한다.
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    navigator.webdriver === true
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms — 컨테이너 자체 리빌 지연 */
  delay?: number;
  /** true면 컨테이너는 그대로 두고 직계 자식들을 순차 리빌 */
  stagger?: boolean;
};

export function Reveal({ children, className, delay = 0, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionDisabled()) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      {...(stagger ? { "data-stagger": "" } : { "data-reveal": "" })}
    >
      {children}
    </div>
  );
}

/** "5,000+회" 같은 문자열에서 숫자만 0→N으로 카운트업. SSR/모션 축소 시 원문 그대로. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match || motionDisabled()) return;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits.replace(/,/g, ""), 10);
    if (!Number.isFinite(target)) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const started = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - started) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(
            `${prefix}${Math.round(target * eased).toLocaleString("ko-KR")}${suffix}`,
          );
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

type AutoVideoProps = {
  src: string;
  poster: string;
  title: string;
};

/** 화면에 45% 이상 보이면 재생, 벗어나면 정지. 탭으로 토글. 항상 무음. */
export function AutoVideo({ src, poster, title }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    let io: IntersectionObserver | undefined;
    if (!motionDisabled()) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        { threshold: 0.45 },
      );
      io.observe(video);
    }
    return () => {
      io?.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <button
      type="button"
      className={`reel-media${playing ? " is-playing" : ""}`}
      onClick={toggle}
      aria-label={`${title} 수업 영상 ${playing ? "일시정지" : "재생"}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- 무음 루프 클립 */}
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
      />
      <span className="reel-play-hint" aria-hidden />
    </button>
  );
}

type MarqueeProps = {
  children: ReactNode;
  ariaLabel?: string;
};

/** 무한 흐름 띠. 호버 시 일시정지, 모션 축소 시 가로 스크롤로 대체(CSS). */
export function Marquee({ children, ariaLabel }: MarqueeProps) {
  return (
    <div className="marquee" role="region" aria-label={ariaLabel}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
