#!/usr/bin/env node

/**
 * scan-playwright.mjs — Playwright-based portal scanner
 *
 * Complements scan.mjs: handles companies whose careers pages don't expose
 * Greenhouse/Ashby/Lever/Workday APIs. Uses Playwright to render the page
 * and extracts job listings from link text + href patterns.
 *
 * Applies title_filter + location_filter from portals.yml, dedupes against
 * scan-history.tsv + pipeline.md, appends new offers.
 *
 * Usage:
 *   node scan-playwright.mjs                  # scan all no-API companies
 *   node scan-playwright.mjs --dry-run        # preview
 *   node scan-playwright.mjs --company Google # single company
 *   node scan-playwright.mjs --only-api-missing  (default behaviour)
 *
 * Takes 10–30 min for full run (5–30 sec per company). Run in background.
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import yaml from 'js-yaml';
import { chromium } from 'playwright';

const PORTALS_PATH = 'portals.yml';
const SCAN_HISTORY_PATH = 'data/scan-history.tsv';
const PIPELINE_PATH = 'data/pipeline.md';
const APPLICATIONS_PATH = 'data/applications.md';

mkdirSync('data', { recursive: true });

const CONCURRENCY = 3;                  // Playwright-heavy; don't hammer
const NAV_TIMEOUT_MS = 25_000;
const SETTLE_MS = 2_500;                // wait after load for SPAs to render
const MAX_JOBS_PER_PAGE = 200;

// ── Same API detection as scan.mjs (to decide what to SKIP) ─────────

function hasApiDetected(company) {
  if (company.api) return true;
  const url = company.careers_url || '';
  if (/jobs\.ashbyhq\.com\/[^/?#]+/.test(url)) return true;
  if (/jobs\.lever\.co\/[^/?#]+/.test(url)) return true;
  if (/job-boards(?:\.eu)?\.greenhouse\.io\/[^/?#]+/.test(url)) return true;
  if (/myworkdayjobs\.com\//.test(url)) return true;
  return false;
}

// ── Filters (mirror scan.mjs) ───────────────────────────────────────

function buildTitleFilter(titleFilter) {
  const positive = (titleFilter?.positive || []).map(k => k.toLowerCase());
  const negative = (titleFilter?.negative || []).map(k => k.toLowerCase());
  return (title) => {
    const lower = title.toLowerCase();
    const hasPositive = positive.length === 0 || positive.some(k => lower.includes(k));
    const hasNegative = negative.some(k => lower.includes(k));
    return hasPositive && !hasNegative;
  };
}

function buildLocationFilter(locationFilter) {
  const allowed = (locationFilter?.allowed || []).map(k => k.toLowerCase());
  const excluded = (locationFilter?.excluded || []).map(k => k.toLowerCase());
  return (location) => {
    const lower = (location || '').toLowerCase();
    if (!lower) return true;
    if (excluded.some(k => lower.includes(k))) return false;
    if (allowed.length === 0) return true;
    return allowed.some(k => lower.includes(k));
  };
}

// ── Dedup (mirror scan.mjs) ─────────────────────────────────────────

function loadSeenUrls() {
  const seen = new Set();
  if (existsSync(SCAN_HISTORY_PATH)) {
    const lines = readFileSync(SCAN_HISTORY_PATH, 'utf-8').split('\n');
    for (const line of lines.slice(1)) {
      const url = line.split('\t')[0];
      if (url) seen.add(url);
    }
  }
  if (existsSync(PIPELINE_PATH)) {
    const text = readFileSync(PIPELINE_PATH, 'utf-8');
    for (const match of text.matchAll(/- \[[ x]\] (https?:\/\/\S+)/g)) seen.add(match[1]);
  }
  if (existsSync(APPLICATIONS_PATH)) {
    const text = readFileSync(APPLICATIONS_PATH, 'utf-8');
    for (const match of text.matchAll(/https?:\/\/[^\s|)]+/g)) seen.add(match[0]);
  }
  return seen;
}

// ── Job link heuristics ─────────────────────────────────────────────

const JOB_URL_PATTERNS = [
  /\/job\//i,
  /\/jobs\//i,
  /\/position/i,
  /\/careers\/jobs?\//i,
  /\/careers\/\d+/i,
  /\/requisition/i,
  /\/opening/i,
  /\/role\//i,
  /\/posting/i,
  /\/vacancy/i,
  /\/apply\//i,
  /joblist\//i,
  /\/r(?:eq)?\d/i,         // /R1234567, /Req12345
];

function looksLikeJobUrl(href) {
  if (!href) return false;
  return JOB_URL_PATTERNS.some(p => p.test(href));
}

// ── Per-page extraction ─────────────────────────────────────────────

async function scanCompany(browser, company, { titleFilter, locationFilter }) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 2000 } });
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  });

  try {
    await page.goto(company.careers_url, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT_MS });
    // Let SPAs render
    await page.waitForTimeout(SETTLE_MS);
    try {
      await page.waitForLoadState('networkidle', { timeout: 8000 });
    } catch {}

    // Extract all anchors. In the page context to minimize round-trips.
    const anchors = await page.$$eval('a[href]', (els) =>
      els.slice(0, 2000).map((a) => ({
        href: a.href,
        text: (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' '),
        // Nearby text for location fallback — check parent
        parentText: ((a.parentElement?.innerText || '').trim().slice(0, 300)).replace(/\s+/g, ' '),
      }))
    );

    // Same-origin, deduped by href
    const origin = new URL(company.careers_url).origin;
    const uniq = new Map();
    for (const a of anchors) {
      if (!a.href || !a.text) continue;
      if (!looksLikeJobUrl(a.href)) continue;
      if (a.text.length < 5 || a.text.length > 200) continue;
      // Prefer same-origin but some companies redirect to ATS — accept those too
      if (!uniq.has(a.href)) uniq.set(a.href, a);
    }

    const jobs = [...uniq.values()].slice(0, MAX_JOBS_PER_PAGE).map((a) => ({
      title: a.text,
      url: a.href,
      company: company.name,
      location: extractLocation(a.parentText),
    }));

    return { jobs, error: null };
  } catch (err) {
    return { jobs: [], error: err.message };
  } finally {
    await page.close();
  }
}

// Heuristic location extraction from parent text
function extractLocation(text) {
  if (!text) return '';
  // Common location patterns in job listings
  const m = text.match(/\b(San Francisco|San Jose|New York|NYC|Seattle|Boston|Austin|Los Angeles|Chicago|Bay Area|Palo Alto|Mountain View|Sunnyvale|Remote|Hybrid|London|Dublin|Bangalore|Singapore|Toronto|Tokyo|Sydney)(?:[,\s]*[A-Za-z ,]+)?/i);
  return m ? m[0].slice(0, 100) : '';
}

// ── Output ──────────────────────────────────────────────────────────

function appendToPipeline(offers) {
  const lines = offers.map(o => `- [ ] ${o.url} | ${o.company} | ${o.title}`);
  let block = existsSync(PIPELINE_PATH) ? readFileSync(PIPELINE_PATH, 'utf-8') : '# Pipeline Inbox — Pending URLs\n';
  if (!block.includes('## Pendientes')) block += '\n## Pendientes\n';
  block += '\n' + lines.join('\n') + '\n';
  writeFileSync(PIPELINE_PATH, block);
}

function appendToScanHistory(offers, date) {
  const header = 'url\tfirst_seen\tportal\ttitle\tcompany\tstatus\n';
  if (!existsSync(SCAN_HISTORY_PATH)) writeFileSync(SCAN_HISTORY_PATH, header);
  const lines = offers.map(o => `${o.url}\t${date}\tplaywright-${o.company.toLowerCase().replace(/\s+/g,'-')}\t${o.title}\t${o.company}\tadded\n`).join('');
  appendFileSync(SCAN_HISTORY_PATH, lines);
}

// ── Concurrency helper ──────────────────────────────────────────────

async function parallel(tasks, limit) {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const p = Promise.resolve().then(task);
    results.push(p);
    if (limit <= tasks.length) {
      const e = p.finally(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const companyFlag = args.indexOf('--company');
  const filterCompany = companyFlag !== -1 ? args[companyFlag + 1]?.toLowerCase() : null;

  const config = yaml.load(readFileSync(PORTALS_PATH, 'utf-8'));
  const titleFilter = buildTitleFilter(config.title_filter);
  const locationFilter = buildLocationFilter(config.location_filter);

  let companies = config.tracked_companies
    .filter(c => c.enabled !== false)
    .filter(c => c.careers_url)
    .filter(c => !hasApiDetected(c))            // only companies scan.mjs can't reach
    .filter(c => !filterCompany || c.name.toLowerCase().includes(filterCompany));

  console.log(`Playwright scan: ${companies.length} companies`);
  if (dryRun) console.log('(dry run — no files will be written)');
  console.log();

  const seenUrls = loadSeenUrls();
  const newOffers = [];
  const errors = [];
  let totalFound = 0;
  let totalFiltered = 0;
  let totalFilteredLocation = 0;
  let totalDupes = 0;

  const browser = await chromium.launch({ headless: true });

  const tasks = companies.map(c => async () => {
    console.log(`  → ${c.name}`);
    const { jobs, error } = await scanCompany(browser, c, { titleFilter, locationFilter });
    if (error) {
      errors.push({ company: c.name, error });
      return;
    }
    totalFound += jobs.length;
    for (const job of jobs) {
      if (!titleFilter(job.title)) { totalFiltered++; continue; }
      if (!locationFilter(job.location)) { totalFilteredLocation++; continue; }
      if (seenUrls.has(job.url)) { totalDupes++; continue; }
      seenUrls.add(job.url);
      newOffers.push(job);
    }
  });

  await parallel(tasks, CONCURRENCY);
  await browser.close();

  if (!dryRun && newOffers.length > 0) {
    appendToPipeline(newOffers);
    appendToScanHistory(newOffers, new Date().toISOString().slice(0, 10));
  }

  console.log();
  console.log('━'.repeat(45));
  console.log(`Playwright Scan — ${new Date().toISOString().slice(0, 10)}`);
  console.log('━'.repeat(45));
  console.log(`Companies scanned:     ${companies.length - errors.length}`);
  console.log(`Total links found:     ${totalFound}`);
  console.log(`Filtered by title:     ${totalFiltered}`);
  console.log(`Filtered by location:  ${totalFilteredLocation}`);
  console.log(`Duplicates:            ${totalDupes}`);
  console.log(`New offers added:      ${newOffers.length}`);
  if (errors.length) {
    console.log();
    console.log(`Errors (${errors.length}):`);
    for (const e of errors) console.log(`  ✗ ${e.company}: ${e.error}`);
  }
  console.log();
  console.log('New offers:');
  for (const o of newOffers.slice(0, 80)) {
    console.log(`  + ${o.company} | ${o.title} | ${o.location || 'N/A'}`);
  }
  if (newOffers.length > 80) console.log(`  ... and ${newOffers.length - 80} more`);
  console.log();
  if (dryRun) console.log('(dry run — run without --dry-run to save results)');
  else console.log('Results saved to data/pipeline.md and data/scan-history.tsv');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
