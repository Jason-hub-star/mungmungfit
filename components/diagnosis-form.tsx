"use client";
// 강아지 코어·자신감 5문항 자가진단 폼 — useState 단일 페이지 전환 + URL 공유

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Share2,
} from "lucide-react";
import { intakeForm, site } from "@/content/site";

type Option = { value: number; label: string };
type Question = { id: string; label: string; area: string; options: Option[] };
type ResultBand = {
  min: number;
  max: number;
  level: string;
  emoji: string;
  title: string;
  summary: string;
  recommendation: string;
};
type AreaInfo = { label: string; description: string };

export type DiagnosisContent = {
  submitLabel: string;
  incompleteHint: string;
  restartLabel: string;
  scoreLabel: string;
  weakAreasLabel: string;
  recommendationLabel: string;
  ctaLabel: string;
  ctaSubLabel: string;
  questions: Question[];
  areas: Record<string, AreaInfo>;
  results: ResultBand[];
};

const SHARE_PARAM = "r";

function encodeAnswers(answers: Record<string, number>): string {
  try {
    return btoa(JSON.stringify(answers));
  } catch {
    return "";
  }
}

function decodeAnswers(encoded: string | null): Record<string, number> | null {
  if (!encoded) return null;
  try {
    const parsed = JSON.parse(atob(encoded));
    if (!parsed || typeof parsed !== "object") return null;
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number") out[k] = v;
    }
    return out;
  } catch {
    return null;
  }
}

export function DiagnosisForm({ content }: { content: DiagnosisContent }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copyToast, setCopyToast] = useState<"copied" | "failed" | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    const encoded = searchParams.get(SHARE_PARAM);
    if (!encoded) return;
    const decoded = decodeAnswers(encoded);
    if (!decoded) return;
    const hasAll = content.questions.every((q) => q.id in decoded);
    if (hasAll) {
      setAnswers(decoded);
      setSubmitted(true);
    }
  }, [searchParams, content.questions]);

  useEffect(() => {
    if (!copyToast) return;
    const timer = window.setTimeout(() => setCopyToast(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copyToast]);

  const allAnswered = content.questions.every((q) => q.id in answers);
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const result = useMemo(
    () =>
      content.results.find(
        (r) => totalScore >= r.min && totalScore <= r.max,
      ) ?? content.results[0],
    [content.results, totalScore],
  );

  const weakAreas = useMemo(() => {
    const sums: Record<string, number> = {};
    const counts: Record<string, number> = {};
    content.questions.forEach((q) => {
      if (q.id in answers) {
        sums[q.area] = (sums[q.area] ?? 0) + answers[q.id];
        counts[q.area] = (counts[q.area] ?? 0) + 1;
      }
    });
    return Object.entries(sums)
      .filter(([area, score]) => score / counts[area] >= 1.5)
      .map(([area]) => ({ key: area, ...content.areas[area] }));
  }, [content.questions, content.areas, answers]);

  function handleSubmit() {
    setSubmitted(true);
    const encoded = encodeAnswers(answers);
    if (encoded) {
      router.replace(`?${SHARE_PARAM}=${encoded}`, { scroll: false });
    }
  }

  function handleRestart() {
    setAnswers({});
    setSubmitted(false);
    setCopyToast(null);
    setFallbackUrl(null);
    router.replace("?", { scroll: false });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleShare() {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const shareText = `멍멍피트 자가진단 결과: ${result.title} (${totalScore}/15)`;

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "멍멍피트 자가진단 결과",
          text: shareText,
          url,
        });
        return;
      } catch {
        // 사용자가 시스템 공유 시트 취소한 경우 클립보드로 fallback
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopyToast("copied");
    } catch {
      setCopyToast("failed");
      setFallbackUrl(url);
    }
  }

  if (submitted) {
    return (
      <div className="diagnosis-result">
        <article
          className="card sub-card diagnosis-result-headline"
          aria-live="polite"
        >
          <span className="diagnosis-result-emoji" aria-hidden>
            {result.emoji}
          </span>
          <h2 className="diagnosis-result-title">{result.title}</h2>
          <p className="diagnosis-result-summary">{result.summary}</p>
          <p className="diagnosis-result-score">
            {content.scoreLabel}: <strong>{totalScore}</strong> / 15
          </p>
        </article>

        {weakAreas.length > 0 && (
          <article className="card sub-card">
            <h3>{content.weakAreasLabel}</h3>
            <ul className="plain-list">
              {weakAreas.map((a) => (
                <li key={a.key}>
                  · <strong>{a.label}</strong> — {a.description}
                </li>
              ))}
            </ul>
          </article>
        )}

        <article className="card sub-card">
          <h3>{content.recommendationLabel}</h3>
          <p>{result.recommendation}</p>
        </article>

        <article className="card sub-card diagnosis-result-cta">
          <h3>{content.ctaLabel}</h3>
          <p>{content.ctaSubLabel}</p>
          <div className="hero-actions">
            <a className="button button-kakao" href={site.kakaoUrl}>
              <MessageCircle size={18} aria-hidden />
              카카오 상담
            </a>
            <a className="button button-ghost" href={site.phoneHref}>
              <ArrowRight size={18} aria-hidden />
              {site.phoneDisplay}
            </a>
            {intakeForm?.url && (
              <a
                className="button button-ghost"
                href={intakeForm.url}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`${intakeForm.label} (새 창에서 네이버폼 열림)`}
              >
                <ExternalLink size={18} aria-hidden />
                {intakeForm.label}
              </a>
            )}
            <button
              type="button"
              className="button button-ghost"
              onClick={handleShare}
              aria-label="진단 결과 공유"
            >
              <Share2 size={18} aria-hidden />
              결과 공유
            </button>
          </div>
          {copyToast && (
            <div
              className="diagnosis-hint"
              role="status"
              aria-live="polite"
            >
              {copyToast === "copied"
                ? "링크가 복사되었어요. 친구에게 붙여넣기만 하면 돼요."
                : "자동 복사가 차단된 환경이에요. 아래 주소를 길게 눌러 복사해 주세요."}
              {copyToast === "failed" && fallbackUrl && (
                <input
                  className="diagnosis-share-url"
                  type="text"
                  readOnly
                  value={fallbackUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  aria-label="진단 결과 공유 URL"
                />
              )}
            </div>
          )}
        </article>

        <button
          type="button"
          className="button button-ghost diagnosis-restart"
          onClick={handleRestart}
        >
          <RotateCcw size={16} aria-hidden />
          {content.restartLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      className="diagnosis-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (allAnswered) handleSubmit();
      }}
    >
      {content.questions.map((q, idx) => (
        <fieldset key={q.id} className="diagnosis-question card sub-card">
          <legend className="diagnosis-question-legend">
            <span className="diagnosis-question-num" aria-hidden>
              Q{idx + 1}.
            </span>{" "}
            {q.label}
          </legend>
          <div
            className="diagnosis-options"
            role="radiogroup"
            aria-label={q.label}
          >
            {q.options.map((opt) => {
              const checked = answers[q.id] === opt.value;
              const inputId = `${q.id}-${opt.value}`;
              return (
                <label
                  key={opt.value}
                  htmlFor={inputId}
                  className={`diagnosis-option${checked ? " is-selected" : ""}`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={checked}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                    }
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="diagnosis-submit">
        <button
          type="submit"
          className="button button-primary"
          disabled={!allAnswered}
        >
          {content.submitLabel}
        </button>
        {!allAnswered && (
          <p className="diagnosis-hint" role="status">
            {content.incompleteHint}
          </p>
        )}
      </div>
    </form>
  );
}
