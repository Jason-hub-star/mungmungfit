#!/usr/bin/env node
import { createSign } from "node:crypto";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DEFAULT_SITE = "https://mungmungfit.kr";
const TODAY = new Date().toISOString().slice(0, 10);
const METRICS_DIR = join(process.cwd(), "docs", "metrics");
const STATUS_PATH = join(process.cwd(), "docs", "status", "SEO-HEALTH-STATUS.md");
const INDEXNOW_ENDPOINT = "https://searchadvisor.naver.com/indexnow";
const NAVER_CRAWL_VERIFY = "https://apis.naver.com/searchadvisor/crawl-request/verify.json";
const NAVER_CRAWL_SUBMIT = "https://apis.naver.com/searchadvisor/crawl-request/submit.json";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/webmasters";
const CORE_PATHS = [
  "/",
  "/pricing",
  "/reviews",
  "/blog",
  "/services/dog-fitness",
  "/areas/seoul",
  "/about",
  "/cases",
  "/diagnosis",
];

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[match[1]] = value;
  }
  return out;
}

async function loadLocalEnv() {
  for (const file of [".env", ".env.local"]) {
    const path = join(process.cwd(), file);
    if (!existsSync(path)) continue;
    const parsed = parseEnv(await readFile(path, "utf8"));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function parseArgs(argv) {
  const flags = new Set();
  const values = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const key = rawKey.trim();
    if (inlineValue !== undefined) {
      values[key] = inlineValue;
    } else if (argv[i + 1] && !argv[i + 1].startsWith("--")) {
      values[key] = argv[i + 1];
      i += 1;
    } else {
      flags.add(key);
    }
  }

  const modeFlags = ["all", "submit", "monitor", "dry-run"].filter((flag) =>
    flags.has(flag),
  );
  const mode = modeFlags[0] ?? "dry-run";
  return {
    mode,
    dryRun: mode === "dry-run" || flags.has("dry-run"),
    googleOnly: flags.has("google-only"),
    naverIndexNowOnly: flags.has("naver-indexnow-only"),
    naverCrawlOnly: flags.has("naver-crawl-only"),
    noWrite: flags.has("no-write"),
    failOnSubmitError: flags.has("fail-on-submit-error"),
    siteUrl: values["site-url"],
    baseUrl: values["base-url"] ?? values.base,
    sitemapUrl: values["sitemap-url"],
  };
}

function normalizeOrigin(value) {
  const url = new URL(value || DEFAULT_SITE);
  return `${url.protocol}//${url.host}`;
}

function normalizeSiteUrl(value) {
  const url = new URL(value || DEFAULT_SITE);
  return `${url.protocol}//${url.host}${url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`}`;
}

function normalizeSearchConsoleSiteUrl(value) {
  const site = value || DEFAULT_SITE;
  return site.startsWith("sc-domain:") ? site : normalizeSiteUrl(site);
}

function publicUrl(origin, path) {
  return new URL(path, `${origin}/`).toString();
}

function pathFromUrl(url) {
  return new URL(url).pathname || "/";
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20000);
  const started = performance.now();
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      elapsedMs: Math.round(performance.now() - started),
      text,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      elapsedMs: Math.round(performance.now() - started),
      text: "",
      error: error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function parseSitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].trim(),
  );
}

function pickLatestBlogPath(urls) {
  const blogUrls = urls
    .map((url) => pathFromUrl(url))
    .filter((path) => path.startsWith("/blog/") && !path.startsWith("/blog/category/"));
  return blogUrls[0] ?? null;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

async function runHealth({ baseOrigin, sitemapUrl, publicOrigin }) {
  const requiredPaths = [
    ...CORE_PATHS,
    "/sitemap.xml",
    "/robots.txt",
    "/feed.xml",
  ];
  const routeChecks = [];
  for (const path of requiredPaths) {
    const target = path === "/sitemap.xml" ? sitemapUrl : publicUrl(baseOrigin, path);
    const result = await fetchText(target);
    routeChecks.push({
      path,
      url: target,
      status: result.status,
      ok: result.ok,
      elapsedMs: result.elapsedMs,
      error: result.error,
    });
  }

  const sitemapResult = await fetchText(sitemapUrl);
  const sitemapUrls = sitemapResult.ok ? parseSitemapLocs(sitemapResult.text) : [];
  const missingRequiredSitemapPaths = CORE_PATHS.filter(
    (path) => !sitemapUrls.some((url) => pathFromUrl(url) === path),
  );

  const robotsResult = await fetchText(publicUrl(baseOrigin, "/robots.txt"));
  const feedResult = await fetchText(publicUrl(baseOrigin, "/feed.xml"));
  const latestBlogPath = pickLatestBlogPath(sitemapUrls);
  const inspectionPaths = unique([...CORE_PATHS, latestBlogPath]).slice(0, 10);
  const canonicalChecks = [];
  for (const path of inspectionPaths) {
    const result = await fetchText(publicUrl(baseOrigin, path));
    const canonical = result.text.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    )?.[1];
    canonicalChecks.push({
      path,
      status: result.status,
      ok: result.ok,
      canonical: canonical || null,
      canonicalPath: canonical ? pathFromUrl(canonical) : null,
      matchesPath: canonical ? pathFromUrl(canonical) === path : false,
    });
  }

  return {
    routeChecks,
    sitemap: {
      url: sitemapUrl,
      status: sitemapResult.status,
      ok: sitemapResult.ok,
      locCount: sitemapUrls.length,
      missingRequiredSitemapPaths,
    },
    robots: {
      status: robotsResult.status,
      ok: robotsResult.ok,
      hasSitemap: /Sitemap:/i.test(robotsResult.text),
    },
    feed: {
      status: feedResult.status,
      ok: feedResult.ok,
      looksXml: /<rss|<feed/i.test(feedResult.text),
    },
    sitemapUrls,
    inspectionUrls: inspectionPaths.map((path) => publicUrl(publicOrigin, path)),
    canonicalChecks,
  };
}

function getNaverIndexNowPayload(urls, publicOrigin) {
  const origin = new URL(publicOrigin);
  const key = process.env.NAVER_INDEXNOW_KEY || "";
  return {
    host: origin.host,
    key,
    keyLocation:
      process.env.NAVER_INDEXNOW_KEY_LOCATION ||
      publicUrl(publicOrigin, "/indexnow-key.txt"),
    urlList: urls,
  };
}

function chunk(values, size) {
  const chunks = [];
  for (let i = 0; i < values.length; i += size) {
    chunks.push(values.slice(i, i + size));
  }
  return chunks;
}

async function getServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim();
    try {
      return JSON.parse(raw);
    } catch {
      return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    }
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return JSON.parse(
      await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"),
    );
  }
  return null;
}

async function getGoogleAccessToken() {
  const serviceAccount = await getServiceAccount();
  if (serviceAccount?.client_email && serviceAccount?.private_key) {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const claim = {
      iss: serviceAccount.client_email,
      scope: GOOGLE_SCOPE,
      aud: GOOGLE_TOKEN_ENDPOINT,
      exp: now + 3600,
      iat: now,
    };
    const unsigned = `${base64url(JSON.stringify(header))}.${base64url(
      JSON.stringify(claim),
    )}`;
    const signer = createSign("RSA-SHA256");
    signer.update(unsigned);
    signer.end();
    const signature = signer
      .sign(serviceAccount.private_key)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${unsigned}.${signature}`,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Google token failed: ${response.status} ${JSON.stringify(json)}`);
    }
    return { token: json.access_token, source: "service_account" };
  }

  try {
    const { stdout } = await execFileAsync("gcloud", [
      "auth",
      "application-default",
      "print-access-token",
    ]);
    const token = stdout.trim();
    if (token) return { token, source: "gcloud_adc" };
  } catch {
    // Fallback below returns skipped state.
  }
  return null;
}

async function googleFetch(path, token, options = {}) {
  const response = await fetch(`https://www.googleapis.com/webmasters/v3${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { status: response.status, ok: response.ok, json };
}

async function submitGoogleSitemap({ dryRun, siteUrl, sitemapUrl }) {
  const requestPath = `/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(
    sitemapUrl,
  )}`;
  if (dryRun) {
    return { skipped: true, reason: "dry-run", requestPath };
  }
  const auth = await getGoogleAccessToken();
  if (!auth) {
    return { skipped: true, reason: "missing google credentials", requestPath };
  }
  const result = await googleFetch(requestPath, auth.token, { method: "PUT" });
  return { ...result, authSource: auth.source, requestPath };
}

async function inspectGoogleUrls({ dryRun, siteUrl, urls }) {
  const endpoint = "/urlInspection/index:inspect";
  if (dryRun) {
    return urls.map((url) => ({
      url,
      skipped: true,
      reason: "dry-run",
      payload: { inspectionUrl: url, siteUrl },
    }));
  }
  const auth = await getGoogleAccessToken();
  if (!auth) {
    return urls.map((url) => ({
      url,
      skipped: true,
      reason: "missing google credentials",
    }));
  }

  const results = [];
  for (const url of urls) {
    const response = await fetch(
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inspectionUrl: url, siteUrl }),
      },
    );
    const json = await response.json().catch(() => null);
    results.push({
      url,
      status: response.status,
      ok: response.ok,
      authSource: auth.source,
      indexStatusResult: json?.inspectionResult?.indexStatusResult ?? null,
      raw: response.ok ? undefined : json,
    });
  }
  return results;
}

async function submitNaverIndexNow({ dryRun, urls, publicOrigin }) {
  const key = process.env.NAVER_INDEXNOW_KEY || "";
  const batches = chunk(urls, 10000);
  const results = [];
  for (const [index, batch] of batches.entries()) {
    const payload = getNaverIndexNowPayload(batch, publicOrigin);
    if (dryRun) {
      results.push({
        batch: index + 1,
        skipped: true,
        reason: "dry-run",
        endpoint: INDEXNOW_ENDPOINT,
        payload: { ...payload, key: key ? "[set]" : "" },
      });
      continue;
    }
    if (!key) {
      results.push({
        batch: index + 1,
        skipped: true,
        reason: "missing NAVER_INDEXNOW_KEY",
        endpoint: INDEXNOW_ENDPOINT,
        payload: { ...payload, key: "" },
      });
      continue;
    }
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    results.push({
      batch: index + 1,
      status: response.status,
      ok: response.ok,
      endpoint: INDEXNOW_ENDPOINT,
      body: text.slice(0, 1000),
    });
  }
  return results;
}

async function postNaverCrawl(endpoint, token, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { status: response.status, ok: response.ok, json };
}

async function submitNaverCrawl({ dryRun, urls }) {
  const token = process.env.NAVER_CRAWL_REQUEST_ACCESS_TOKEN || "";
  const batches = chunk(urls, 1000);
  const results = [];
  for (const [index, batch] of batches.entries()) {
    const payload = { urls: batch.map((url) => ({ url, type: "update" })) };
    if (dryRun) {
      results.push({
        batch: index + 1,
        skipped: true,
        reason: "dry-run",
        verifyEndpoint: NAVER_CRAWL_VERIFY,
        submitEndpoint: NAVER_CRAWL_SUBMIT,
        payload,
      });
      continue;
    }
    if (!token) {
      results.push({
        batch: index + 1,
        skipped: true,
        reason: "missing NAVER_CRAWL_REQUEST_ACCESS_TOKEN",
        verifyEndpoint: NAVER_CRAWL_VERIFY,
        submitEndpoint: NAVER_CRAWL_SUBMIT,
      });
      continue;
    }
    const verify = await postNaverCrawl(NAVER_CRAWL_VERIFY, token, payload);
    const submit = verify.ok
      ? await postNaverCrawl(NAVER_CRAWL_SUBMIT, token, payload)
      : null;
    results.push({ batch: index + 1, verify, submit });
  }
  return results;
}

async function sendTelegramIfNeeded(summary) {
  const token = process.env.MUNGMUNG_BOT_TOKEN;
  const chatId = process.env.MUNGMUNG_CHAT_ID;
  if (!token || !chatId || !summary.failed) return { skipped: true };
  const text = [
    "멍멍피트 SEO 파이프라인 알림",
    `mode: ${summary.mode}`,
    `status: ${summary.status}`,
    `failed: ${summary.failureReasons.join(", ")}`,
  ].join("\n");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  return { status: response.status, ok: response.ok };
}

function summarizeReport(report) {
  const failureReasons = [];
  if (report.health) {
    const badRoutes = report.health.routeChecks.filter((check) => !check.ok);
    if (badRoutes.length) failureReasons.push(`route failures ${badRoutes.length}`);
    if (report.health.sitemap.missingRequiredSitemapPaths.length) {
      failureReasons.push("required sitemap paths missing");
    }
    if (!report.health.robots.hasSitemap) failureReasons.push("robots sitemap missing");
    if (!report.health.feed.looksXml) failureReasons.push("feed invalid");
  }
  for (const result of report.google?.sitemapSubmit ? [report.google.sitemapSubmit] : []) {
    if (!result.skipped && !result.ok) failureReasons.push("google sitemap submit failed");
  }
  for (const result of report.naver?.indexNow ?? []) {
    if (!result.skipped && !result.ok) failureReasons.push("naver indexnow failed");
  }
  for (const result of report.naver?.crawl ?? []) {
    if (!result.skipped && (!result.verify?.ok || !result.submit?.ok)) {
      failureReasons.push("naver crawl failed");
    }
  }
  return {
    mode: report.mode,
    status: failureReasons.length ? "failed" : "ok",
    failed: failureReasons.length > 0,
    failureReasons,
  };
}

function countSkipped(values) {
  return (values || []).filter((value) => value.skipped).length;
}

function renderStatusBlock(report, summary) {
  const googleInspect = report.google?.inspection ?? [];
  return [
    "## SEO 제출·모니터 파이프라인",
    "",
    `직전 실행: ${report.finishedAt} (${report.dryRun ? "dry-run" : "live"}, mode=${report.mode})`,
    "",
    "| 항목 | 결과 | 비고 |",
    "|---|---|---|",
    `| Health | ${summary.failed ? "⚠️" : "✅"} | routes ${report.health?.routeChecks?.filter((r) => r.ok).length ?? 0}/${report.health?.routeChecks?.length ?? 0}, sitemap loc ${report.health?.sitemap?.locCount ?? 0} |`,
    `| Google sitemap submit | ${report.google?.sitemapSubmit?.ok ? "✅" : report.google?.sitemapSubmit?.skipped ? "⏭️" : "⚠️"} | ${report.google?.sitemapSubmit?.reason ?? report.google?.sitemapSubmit?.status ?? "-"} |`,
    `| Google URL Inspection | ${googleInspect.some((r) => r.ok) ? "✅" : countSkipped(googleInspect) === googleInspect.length ? "⏭️" : "⚠️"} | ${googleInspect.length} URLs, skipped ${countSkipped(googleInspect)} |`,
    `| Naver IndexNow | ${(report.naver?.indexNow ?? []).some((r) => r.ok) ? "✅" : countSkipped(report.naver?.indexNow) === (report.naver?.indexNow ?? []).length ? "⏭️" : "⚠️"} | batches ${(report.naver?.indexNow ?? []).length}, skipped ${countSkipped(report.naver?.indexNow)} |`,
    `| Naver Crawl API | ${(report.naver?.crawl ?? []).some((r) => r.submit?.ok) ? "✅" : countSkipped(report.naver?.crawl) === (report.naver?.crawl ?? []).length ? "⏭️" : "⚠️"} | batches ${(report.naver?.crawl ?? []).length}, skipped ${countSkipped(report.naver?.crawl)} |`,
    "",
    `Raw result: \`${report.metricsPath ?? "-"}\``,
  ].join("\n");
}

async function updateStatusDoc(report, summary) {
  if (!existsSync(STATUS_PATH)) return;
  const marker = "## SEO 제출·모니터 파이프라인";
  const current = await readFile(STATUS_PATH, "utf8");
  const block = renderStatusBlock(report, summary);
  const next = current.includes(marker)
    ? current.replace(new RegExp(`${marker}[\\s\\S]*?(?=\\n## |\\n?$)`), block)
    : `${current.trimEnd()}\n\n${block}\n`;
  await writeFile(STATUS_PATH, next.endsWith("\n") ? next : `${next}\n`, "utf8");
}

async function writeReport(report, summary, noWrite) {
  if (noWrite) return null;
  await mkdir(METRICS_DIR, { recursive: true });
  const filename = `seo-pipeline-${TODAY}.json`;
  const path = join(METRICS_DIR, filename);
  report.metricsPath = `docs/metrics/${filename}`;
  report.summary = summary;
  await writeFile(path, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await updateStatusDoc(report, summary);
  return path;
}

async function main() {
  await loadLocalEnv();
  const args = parseArgs(process.argv.slice(2));
  const publicSiteUrl = normalizeSiteUrl(
    args.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE,
  );
  const searchConsoleSiteUrl = normalizeSearchConsoleSiteUrl(
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || publicSiteUrl,
  );
  const publicOrigin = normalizeOrigin(publicSiteUrl);
  const baseOrigin = normalizeOrigin(args.baseUrl || process.env.BASE_URL || publicOrigin);
  const sitemapUrl =
    args.sitemapUrl ||
    process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL ||
    publicUrl(baseOrigin, "/sitemap.xml");

  const report = {
    mode: args.mode,
    dryRun: args.dryRun,
    startedAt: new Date().toISOString(),
    siteUrl: searchConsoleSiteUrl,
    publicSiteUrl,
    publicOrigin,
    baseOrigin,
    sitemapUrl,
    env: {
      googleServiceAccountJson: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      googleApplicationCredentials: Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      naverIndexNowKey: Boolean(process.env.NAVER_INDEXNOW_KEY),
      naverCrawlRequestAccessToken: Boolean(process.env.NAVER_CRAWL_REQUEST_ACCESS_TOKEN),
    },
  };

  report.health = await runHealth({ baseOrigin, sitemapUrl, publicOrigin });
  const sitemapUrls = report.health.sitemapUrls;
  const inspectionUrls = report.health.inspectionUrls;

  const wantsSubmit = args.mode === "submit" || args.mode === "all";
  const wantsMonitor = args.mode === "monitor" || args.mode === "all";
  const googleEnabled = !args.naverIndexNowOnly && !args.naverCrawlOnly;
  const naverIndexNowEnabled = !args.googleOnly && !args.naverCrawlOnly;
  const naverCrawlEnabled = !args.googleOnly && !args.naverIndexNowOnly;

  report.google = {};
  report.naver = {};

  if (wantsSubmit && googleEnabled) {
    report.google.sitemapSubmit = await submitGoogleSitemap({
      dryRun: args.dryRun,
      siteUrl: searchConsoleSiteUrl,
      sitemapUrl: process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL || publicUrl(publicOrigin, "/sitemap.xml"),
    });
  }
  if (wantsMonitor && googleEnabled) {
    report.google.inspection = await inspectGoogleUrls({
      dryRun: args.dryRun,
      siteUrl: searchConsoleSiteUrl,
      urls: inspectionUrls,
    });
  }
  if (wantsSubmit && naverIndexNowEnabled) {
    report.naver.indexNow = await submitNaverIndexNow({
      dryRun: args.dryRun,
      urls: sitemapUrls,
      publicOrigin,
    });
  }
  if (wantsSubmit && naverCrawlEnabled) {
    report.naver.crawl = await submitNaverCrawl({
      dryRun: args.dryRun,
      urls: sitemapUrls,
    });
  }

  report.finishedAt = new Date().toISOString();
  const summary = summarizeReport(report);
  const metricsPath = await writeReport(report, summary, args.noWrite);
  const telegram = await sendTelegramIfNeeded(summary);

  const consoleSummary = {
    status: summary.status,
    dryRun: args.dryRun,
    mode: args.mode,
    baseOrigin,
    publicOrigin,
    sitemapLocCount: report.health.sitemap.locCount,
    inspectionUrlCount: inspectionUrls.length,
    metricsPath: metricsPath ? `docs/metrics/${basename(metricsPath)}` : null,
    telegram,
    failures: summary.failureReasons,
  };
  console.log(JSON.stringify(consoleSummary, null, 2));

  if (summary.failed && args.failOnSubmitError) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
