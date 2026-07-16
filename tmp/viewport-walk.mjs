// 뷰포트 단위 스크롤 캡처 — fullPage 캡처 한계 우회용 검수 도구
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const width = Number(process.argv[2] ?? 390);
const height = Number(process.argv[3] ?? 844);
const outDir = process.argv[4] ?? `tmp/walk-${width}`;
mkdirSync(outDir, { recursive: true });

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width, height } });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(1000);

const total = await page.evaluate(() => document.body.scrollHeight);
const steps = Math.ceil(total / height);
for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * height);
  await page.waitForTimeout(650); // 리빌 트랜지션 대기
  await page.screenshot({ path: `${outDir}/w${String(i).padStart(2, "0")}.png` });
}
console.log(JSON.stringify({ width, total, steps }));
await b.close();
