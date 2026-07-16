// 멍멍피트 public media budget check
// Lists oversized deployable images/videos so replacements do not silently hurt LCP.

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "public");
const LIMITS = {
  image: Number(process.env.MEDIA_IMAGE_LIMIT_BYTES ?? 500 * 1024),
  video: Number(process.env.MEDIA_VIDEO_LIMIT_BYTES ?? 4 * 1024 * 1024),
};

const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i;
const VIDEO_RE = /\.(mp4|webm|mov)$/i;

/** @type {Array<{path:string,size:number,type:'image'|'video'}>} */
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const type = IMAGE_RE.test(entry.name) ? "image" : VIDEO_RE.test(entry.name) ? "video" : null;
    if (!type) continue;
    files.push({ path: relative(process.cwd(), full), size: statSync(full).size, type });
  }
}

walk(ROOT);

files.sort((a, b) => b.size - a.size);

const oversized = files.filter((file) => file.size > LIMITS[file.type]);
const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

function human(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

console.log("\n=== 멍멍피트 Media Budget ===");
console.log(`파일: ${files.length}개`);
console.log(`총 용량: ${human(totalBytes)}`);
console.log(`이미지 기준: ${human(LIMITS.image)} / 영상 기준: ${human(LIMITS.video)}`);

if (files.length) {
  console.log("\n--- Top 20 largest media ---");
  for (const file of files.slice(0, 20)) {
    const marker = file.size > LIMITS[file.type] ? "OVER" : "OK  ";
    console.log(`${marker} ${human(file.size).padStart(8)} ${file.path}`);
  }
}

if (oversized.length) {
  console.log("\n--- Oversized deployable media ---");
  for (const file of oversized) {
    console.log(`${human(file.size).padStart(8)} ${file.path}`);
  }
  console.log("\nBudget check: WARN - optimize or document the reason before release.");
  process.exitCode = 0;
} else {
  console.log("\nBudget check: PASS");
}

