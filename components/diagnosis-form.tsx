"use client";
// 강아지 코어·자신감 5문항 자가진단 폼 — useState 단일 페이지 전환

import { useMemo, useState } from "react";
import { ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { site } from "@/content/site";

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

export function DiagnosisForm({ content }: { content: DiagnosisContent }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleRestart() {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          </div>
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
        if (allAnswered) setSubmitted(true);
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
