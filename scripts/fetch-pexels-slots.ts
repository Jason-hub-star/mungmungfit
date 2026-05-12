/**
 * Pexels API로 placeholder 자동 채우기.
 *
 * 사용:
 *   PEXELS_API_KEY=... npx tsx scripts/fetch-pexels-slots.ts
 *
 * 또는 .env.local에 PEXELS_API_KEY가 있으면 자동 로드 (없으면 에러).
 *
 * AI-generated 슬롯에만 적용 (주인님 직접 촬영용 슬롯은 건드리지 않음).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const slotDir = path.join(root, "public/images/slots");
const placeholdersFile = path.join(root, "content/placeholders.ts");

if (!fs.existsSync(slotDir)) fs.mkdirSync(slotDir, { recursive: true });

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error("❌ PEXELS_API_KEY 환경변수가 없어요");
  process.exit(1);
}

// 슬롯 ID → Pexels 검색 쿼리 (영어). orientation/size 힌트 포함.
type SlotJob = {
  slotId: string;
  query: string;
  orientation?: "landscape" | "portrait" | "square";
};

const jobs: SlotJob[] = [
  // Concerns
  { slotId: "concern-obese-senior", query: "overweight chubby dog", orientation: "portrait" },
  { slotId: "concern-leash", query: "dog pulling leash walk", orientation: "portrait" },
  { slotId: "concern-confidence", query: "small dog scared shy", orientation: "portrait" },
  { slotId: "concern-handler", query: "owner training dog hand", orientation: "portrait" },
  // Targets
  { slotId: "target-obese", query: "overweight dog scale", orientation: "square" },
  { slotId: "target-senior", query: "senior dog gray old", orientation: "square" },
  { slotId: "target-shy", query: "dog hiding shy puppy", orientation: "square" },
  { slotId: "target-energetic", query: "border collie running active", orientation: "square" },
  { slotId: "target-puppy", query: "puppy playing eight weeks", orientation: "square" },
  { slotId: "target-leash", query: "dog leash walk park", orientation: "square" },
];

interface PexelsPhoto {
  id: number;
  src: { large2x: string; original: string };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

async function searchPexels(query: string, orientation?: string): Promise<PexelsPhoto | null> {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "5");
  if (orientation) url.searchParams.set("orientation", orientation);

  const res = await fetch(url.toString(), {
    headers: { Authorization: PEXELS_API_KEY! },
  });
  if (!res.ok) {
    console.error(`Pexels API ${res.status} for "${query}"`);
    return null;
  }
  const data = (await res.json()) as PexelsResponse;
  return data.photos[0] ?? null;
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
}

async function run() {
  console.log(`📥 ${jobs.length}개 슬롯 채우기 시작 (Pexels)\n`);

  const updates: Array<{ slotId: string; src: string }> = [];

  for (const job of jobs) {
    try {
      const photo = await searchPexels(job.query, job.orientation);
      if (!photo) {
        console.log(`⚠️  ${job.slotId}: 검색 결과 없음 (${job.query})`);
        continue;
      }

      const ext = "jpg";
      const filename = `${job.slotId}.${ext}`;
      const dest = path.join(slotDir, filename);
      await downloadImage(photo.src.large2x, dest);

      const relSrc = `/images/slots/${filename}`;
      updates.push({ slotId: job.slotId, src: relSrc });
      console.log(`✅ ${job.slotId} ← ${job.query} (Pexels #${photo.id})`);

      // Pexels rate limit 보호 (200/hour)
      await new Promise((r) => setTimeout(r, 250));
    } catch (err) {
      console.error(`❌ ${job.slotId}:`, (err as Error).message);
    }
  }

  // placeholders.ts 자동 갱신
  if (updates.length > 0) {
    let content = fs.readFileSync(placeholdersFile, "utf8");
    let changed = 0;
    for (const u of updates) {
      // src: null 또는 src: "..." 를 새 값으로 교체 (해당 슬롯 블록 안에서만)
      const slotPattern = new RegExp(
        `("${u.slotId}":\\s*{[^}]*?)src:\\s*(?:null|"[^"]*")`,
        "m"
      );
      if (slotPattern.test(content)) {
        content = content.replace(slotPattern, `$1src: "${u.src}"`);
        changed++;
      }
    }
    fs.writeFileSync(placeholdersFile, content);
    console.log(`\n📝 placeholders.ts ${changed}개 슬롯 src 업데이트`);
  }

  console.log(`\n🎉 완료: ${updates.length}/${jobs.length}개 슬롯 채움`);
  console.log(
    "\n📌 Pexels 사진은 무료지만 attribution 권장:\n   푸터나 about에 \"Photos from Pexels\" 한 줄 추가하세요."
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
