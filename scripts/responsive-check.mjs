// 멍멍피트 반응형 체크 — 데스크탑·모바일 viewport로 핵심 페이지 순회
// 콘솔 에러 수집 + 스크린샷 저장 + 모바일에선 햄버거 메뉴 클릭 동작 점검
//
// 사용: npm run dev (별도 터미널) 후 → node scripts/responsive-check.mjs

import { chromium, devices } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = join(process.cwd(), "tmp", "responsive");

const PAGES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/pricing", name: "pricing" },
  { path: "/blog", name: "blog" },
  { path: "/blog/dog-fitness-intro", name: "blog-post" },
  { path: "/blog/category/" + encodeURIComponent("독피트니스 기초"), name: "blog-category" },
  { path: "/reviews", name: "reviews" },
  { path: "/cases", name: "cases" },
  { path: "/cases/pomeranian-confidence", name: "case-detail" },
  { path: "/diagnosis", name: "diagnosis" },
  { path: "/services/dog-fitness", name: "service-dogfitness" },
  { path: "/areas/seoul", name: "area-seoul" },
  { path: "/privacy", name: "privacy" },
  { path: "/terms", name: "terms" },
  { path: "/__nonexistent_404_check__", name: "404", expectStatus: 404 },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "tablet", width: 768, height: 1024, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, "desktop"), { recursive: true });
mkdirSync(join(OUT, "tablet"), { recursive: true });
mkdirSync(join(OUT, "mobile"), { recursive: true });

/** @type {Array<{viewport:string,page:string,status:number,consoleErrors:string[],pageErrors:string[],networkErrors:string[],notes:string[]}>} */
const report = [];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    deviceScaleFactor: vp.isMobile ? 3 : 1,
    userAgent: vp.isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"
      : undefined,
    locale: "ko-KR",
  });

  for (const p of PAGES) {
    const consoleErrors = [];
    const pageErrors = [];
    const networkErrors = [];
    const notes = [];

    const page = await context.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const t = msg.text();
        if ((p.expectStatus ?? 200) === 404 && /404|Not Found/i.test(t)) return;
        consoleErrors.push(t);
      } else if (msg.type() === "warning") {
        // hydration·inert·React 경고 잡기
        const t = msg.text();
        if (/inert|hydration|aria|key|warning/i.test(t)) {
          consoleErrors.push(`[WARN] ${t}`);
        }
      }
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("requestfailed", (req) => {
      const u = req.url();
      // dev 핫리로드·소스맵 등 noise 제외
      if (/_next\/static|hot-update|webpack|sourcemap/.test(u)) return;
      networkErrors.push(`${req.failure()?.errorText ?? "failed"} ${u}`);
    });

    let status = 0;
    try {
      const resp = await page.goto(`${BASE}${p.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      status = resp?.status() ?? 0;
      await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

      // 모바일에서 햄버거 메뉴 클릭 동작 점검
      if (vp.isMobile && (p.expectStatus ?? 200) === 200) {
        const toggle = page.locator(".nav-mobile-toggle");
        if ((await toggle.count()) > 0) {
          const before = await page.locator(".mobile-nav-panel.is-open").count();
          await toggle.first().click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(400);
          const opened = await page.locator(".mobile-nav-panel.is-open").count();
          if (opened > before) {
            notes.push("hamburger:OK");
            await page.locator(".mobile-nav-close").first().click({ timeout: 3000 }).catch(() => {});
            await page.waitForTimeout(300);
          } else {
            notes.push("hamburger:FAIL (panel did not open)");
          }
        } else {
          notes.push("hamburger:absent");
        }
      }

      // 쿠키 배너 dismiss (스크린샷에서 본 페이지 가리지 않게)
      const cookieClose = page.locator(".cookie-consent-close");
      if ((await cookieClose.count()) > 0) {
        await cookieClose.first().click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(200);
      }

      const file = join(OUT, vp.name, `${p.name}.png`);
      // scale:"css" — DPR3 × 긴 페이지가 Chromium 캡처 한계(65,536 device px)를
      // 넘어 중간이 백지로 찍히는 것 방지 (컨텍스트 DPR은 그대로 유지)
      await page.screenshot({ path: file, fullPage: true, scale: "css" }).catch((e) => {
        notes.push(`screenshot:FAIL ${e.message}`);
      });
    } catch (e) {
      notes.push(`navigation:FAIL ${e.message}`);
    }

    report.push({
      viewport: vp.name,
      page: p.path,
      status,
      consoleErrors,
      pageErrors,
      networkErrors,
      notes,
    });

    await page.close();
  }

  await context.close();
}

await browser.close();

// 보고서 저장
writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2), "utf8");

// 콘솔 요약
const errors = report.filter(
  (r) => r.consoleErrors.length || r.pageErrors.length || r.networkErrors.length,
);
const total = report.length;
const failed = report.filter((r) => r.status >= 400 && r.status !== 404).length;

console.log(`\n=== 멍멍피트 반응형 체크 ===`);
console.log(`총 시도: ${total}건 (페이지 ${PAGES.length} × viewport ${VIEWPORTS.length})`);
console.log(`HTTP 실패(>=400, 404 제외): ${failed}건`);
console.log(`에러 발생: ${errors.length}건`);

if (errors.length) {
  console.log(`\n--- 에러 상세 ---`);
  for (const e of errors) {
    console.log(`\n[${e.viewport}] ${e.page} (HTTP ${e.status})`);
    e.consoleErrors.forEach((m) => console.log(`  console: ${m}`));
    e.pageErrors.forEach((m) => console.log(`  pageError: ${m}`));
    e.networkErrors.forEach((m) => console.log(`  network: ${m}`));
    e.notes.forEach((m) => console.log(`  note: ${m}`));
  }
}

const hamburgerOK = report.filter(
  (r) => r.viewport === "mobile" && r.notes.includes("hamburger:OK"),
).length;
const hamburgerFAIL = report.filter(
  (r) => r.viewport === "mobile" && r.notes.some((n) => n.startsWith("hamburger:FAIL")),
).length;
console.log(`\n모바일 햄버거: ${hamburgerOK} OK / ${hamburgerFAIL} FAIL`);
console.log(`\n스크린샷: ${OUT}/{desktop,tablet,mobile}/*.png`);
console.log(`보고서: ${OUT}/report.json`);
