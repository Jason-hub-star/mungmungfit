// 멍멍피트 디자인 토큰 — 프로젝트 전역 색상·타이포·간격 상수
// 하드코딩 #hex / fontSize / 인라인 색 대신 이 파일의 토큰을 사용한다.
//
// 정본:
//   - CSS 변수: app/globals.css :root (브라우저 런타임 정본)
//   - TypeScript 토큰: 본 파일 (인라인 스타일 / 동적 계산용)
//
// 두 곳을 동기화 유지. 색 추가/변경 시 globals.css와 본 파일을 함께 갱신.
//
// 사용 예:
//   import { colors, font, space } from "@/styles/tokens";
//   <div style={{ color: colors.green, fontSize: font.h2 }}>
//
// 또는 CSS 변수로 직접:
//   <div style={{ color: "var(--green)" }}>

// ─── Colors ───────────────────────────────────────────────
// 의미 기반 토큰. CSS 변수 이름과 동일 키 유지.
export const colors = {
  ink: "#0f1410",
  inkSoft: "#2a312a",
  inkMuted: "#6e766c",
  paper: "#faf9f5",
  paperStrong: "#f1ede2",
  paperDeep: "#e7e2d2",
  line: "#ddd9cc",
  green: "#1c4032",
  greenSoft: "#dfe8d9",
  sage: "#829371",
  orange: "#d97742",
  orangeSoft: "#f4d0b2",
  kakao: "#fee500",
  // Highlight (이벤트 배지 등)
  honey: "#ffb84d",
} as const;

// 투명도 변형 (자주 쓰는 alpha 페어)
export const alpha = {
  inkSoft60: "rgba(15, 20, 16, 0.60)",
  inkSoft48: "rgba(15, 20, 16, 0.48)",
  inkSoft32: "rgba(15, 20, 16, 0.32)",
  greenSoft30: "rgba(28, 64, 50, 0.30)",
  greenSoft18: "rgba(28, 64, 50, 0.18)",
  greenSoft08: "rgba(28, 64, 50, 0.08)",
  honeyBg12: "rgba(255, 184, 77, 0.12)",
} as const;

// ─── Typography ───────────────────────────────────────────
// CSS clamp() 기반 반응형 스케일. 모바일→데스크탑 자동 보정.
// CSS 변수와 동기화 (globals.css --font-*)
export const font = {
  display: "var(--font-display)", // 56~140px (Hero wordmark)
  h1: "var(--font-h1)",            // 40~88px
  h2: "var(--font-h2)",            // 32~64px
  h3: "var(--font-h3)",            // 22~28px
  lead: "var(--font-lead)",        // 18~24px
  body: "var(--font-body)",        // 17px
  small: "var(--font-small)",      // 14px
} as const;

// 폰트 두께
export const weight = {
  regular: 450,
  medium: 550,
  semibold: 650,
  bold: 750,
  extrabold: 850,
  black: 900,
} as const;

// ─── Spacing ──────────────────────────────────────────────
// CSS rem 단위 (1rem = 16px). 0.25rem = 4px 그리드.
export const space = {
  xs: "0.25rem",   // 4
  sm: "0.5rem",    // 8
  md: "0.75rem",   // 12
  lg: "1rem",      // 16
  xl: "1.5rem",    // 24
  xxl: "2rem",     // 32
  xxxl: "3rem",    // 48
  section: "var(--section-y)",     // 64~132 반응형
  sectionGap: "var(--section-gap)", // 48~88 반응형
} as const;

// ─── Radius ───────────────────────────────────────────────
export const radius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  pill: "999px",
} as const;

// ─── Shadow ───────────────────────────────────────────────
export const shadow = {
  none: "none",
  soft: "var(--shadow-soft)",
  card: "var(--shadow)",
} as const;

// ─── Z Index ──────────────────────────────────────────────
export const z = {
  base: 1,
  card: 2,
  sticky: 10,
  nav: 30,
  modal: 100,
  toast: 200,
} as const;
