"use client";
// 쿠키 동의 배너 — Vercel Analytics·Speed Insights 사용 안내 + localStorage 기반 1회 노출

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { X } from "lucide-react";

const STORAGE_KEY = "mungmungfit-cookie-consent-v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setVisible(true);
  }, []);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // localStorage 차단 환경: 다음 방문에 또 표시되지만 동작은 무방
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="region"
      aria-labelledby="cookie-consent-title"
    >
      <div className="cookie-consent-body">
        <p id="cookie-consent-title" className="cookie-consent-text">
          멍멍피트는 더 나은 서비스를 위해 Vercel Analytics·Speed Insights로
          익명 통계(IP 익명화)를 수집합니다. 자세한 내용은{" "}
          <Link href={"/privacy" as Route}>개인정보처리방침</Link>을 확인해 주세요.
        </p>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="button button-primary cookie-consent-confirm"
            onClick={dismiss}
            aria-label="쿠키 사용 안내 확인"
          >
            확인
          </button>
          <button
            type="button"
            className="cookie-consent-close"
            onClick={dismiss}
            aria-label="쿠키 안내 닫기"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
