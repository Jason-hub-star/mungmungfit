"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { pageContent, site } from "@/content/site";

const navContent = pageContent.nav;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // 라우트 변경 시 자동 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ESC + body scroll lock + 첫 항목 focus
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("has-mobile-nav");

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("has-mobile-nav");
      window.removeEventListener("keydown", handleKey);
      window.clearTimeout(focusTimer);
    };
  }, [menuOpen]);

  // 패널 닫힐 때 토글 버튼으로 focus 복귀
  function closeMenu() {
    setMenuOpen(false);
    window.setTimeout(() => toggleRef.current?.focus(), 0);
  }

  return (
    <>
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
            <button
              ref={toggleRef}
              type="button"
              className="nav-mobile-toggle"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X size={22} aria-hidden />
              ) : (
                <Menu size={22} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden
      />
      <div
        id="mobile-nav"
        className={`mobile-nav-panel${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mobile-nav-head">
          <strong>{site.name}</strong>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={closeMenu}
            aria-label="메뉴 닫기"
          >
            <X size={20} aria-hidden />
          </button>
        </div>
        <ul className="mobile-nav-list">
          {navContent.links.map((link, idx) => (
            <li key={link.href}>
              <Link
                ref={idx === 0 ? firstLinkRef : undefined}
                href={link.href as Route}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-actions">
          <a
            className="button button-kakao"
            href={site.kakaoUrl}
            tabIndex={menuOpen ? 0 : -1}
          >
            <MessageCircle size={17} aria-hidden />
            {navContent.consultLabel}
          </a>
          <a
            className="button button-ghost"
            href={site.phoneHref}
            tabIndex={menuOpen ? 0 : -1}
          >
            <Phone size={17} aria-hidden />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
