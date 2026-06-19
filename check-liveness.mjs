#!/usr/bin/env node

/**
 * check-liveness.mjs — Playwright job link liveness checker
 *
 * Tests whether job posting URLs are still active or have expired.
 * Uses the same detection logic as scan.md step 7.5.
 * Zero Claude API tokens — pure Playwright.
 *
 * Usage:
 *   node check-liveness.mjs <url1> [url2] ...
 *   node check-liveness.mjs --file urls.txt
 *   node check-liveness.mjs --ndjson <url1> [url2] ...
 *
 * --ndjson: streams one JSON object per URL plus a final {type:"summary"} line.
 * URLs are validated (http/https only, no path traversal/loopback/private nets);
 * invalid URLs are rejected and counted as "invalid".
 *
 * Exit code: 0 if all active, 1 if any expired or uncertain, 2 if no valid URLs
 */

if (process.argv.includes('--help-json')) {
  process.stdout.write(JSON.stringify({
    name: 'check-liveness',
    description: 'Verify whether job posting URLs are still active using Playwright. Detects expired/closed listings via known patterns (apply button absent, "no longer accepting applications", 404/410, ATS error redirects). URLs are validated before browser launch.',
    flags: [
      { name: '--ndjson', type: 'boolean', description: 'Stream one JSON result per URL plus a final {type:"summary"} line' },
      { name: '--file', type: 'string', description: 'Read URLs from a text file (one per line, # comments allowed) instead of argv' },
      { name: '--help-json', type: 'boolean', description: 'Print this schema and exit' },
    ],
    positional: [{ name: 'url', repeated: true, required: false, description: 'http(s) URLs to check (omit when using --file)' }],
    outputs: {
      text: 'Per-URL icon + result + reason; final tally line',
      ndjson: { schema: 'per-url: {url, result, reason} where result ∈ active|expired|uncertain|invalid; final: {type:"summary", total, active, expired, uncertain, invalid}' },
    },
    exitCodes: { 0: 'all URLs active', 1: 'some expired/uncertain/invalid', 2: 'no valid URLs / usage error' },
  }) + '\n');
  process.exit(0);
}

import { chromium } from 'playwright';
import { readFile } from 'fs/promises';

function validateUrl(raw) {
  if (typeof raw !== 'string' || raw.length === 0) return { ok: false, reason: 'empty' };
  if (raw.length > 2048) return { ok: false, reason: 'too-long' };
  if (/[\x00-\x1f\x7f]/.test(raw)) return { ok: false, reason: 'control-chars' };
  if (/\/\.\.(\/|$)/.test(raw) || /(?:%2e%2e|%2E%2E)/i.test(raw)) {
    return { ok: false, reason: 'path-traversal' };
  }
  let u;
  try { u = new URL(raw); } catch { return { ok: false, reason: 'invalid-url' }; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    return { ok: false, reason: `disallowed-protocol:${u.protocol.replace(':', '')}` };
  }
  const host = u.hostname.toLowerCase();
  if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(host)) {
    return { ok: false, reason: 'loopback-host' };
  }
  if (/^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) {
    return { ok: false, reason: 'private-network' };
  }
  return { ok: true, url: u.toString() };
}

const EXPIRED_PATTERNS = [
  /job (is )?no longer available/i,
  /job.*no longer open/i,           // Greenhouse: "The job you are looking for is no longer open."
  /position has been filled/i,
  /this job has expired/i,
  /job posting has expired/i,
  /no longer accepting applications/i,
  /this (position|role|job) (is )?no longer/i,
  /this job (listing )?is closed/i,
  /job (listing )?not found/i,
  /the page you are looking for doesn.t exist/i, // Workday /job/ 404
  /\d+\s+jobs?\s+found/i,           // Workday: landed on listing page ("663 JOBS FOUND") instead of a specific job
  /search for jobs page is loaded/i, // Workday SPA indicator for listing page
  /diese stelle (ist )?(nicht mehr|bereits) besetzt/i,
  /offre (expirée|n'est plus disponible)/i,
];

// URL patterns that indicate an ATS has redirected away from the job (closed/expired)
const EXPIRED_URL_PATTERNS = [
  /[?&]error=true/i,   // Greenhouse redirect on closed jobs
];

const APPLY_PATTERNS = [
  /\bapply\b/i,          // catches "Apply", "Apply Now", "Apply for this Job"
  /\bsolicitar\b/i,
  /\bbewerben\b/i,
  /\bpostuler\b/i,
  /submit application/i,
  /easy apply/i,
  /start application/i,  // Ashby
  /ich bewerbe mich/i,   // German Greenhouse
];

// Below this length the page is probably just nav/footer (closed ATS page)
const MIN_CONTENT_CHARS = 300;

async function checkUrl(page, url) {
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const status = response?.status() ?? 0;
    if (status === 404 || status === 410) {
      return { result: 'expired', reason: `HTTP ${status}` };
    }

    // Give SPAs (Ashby, Lever, Workday) time to hydrate
    await page.waitForTimeout(2000);

    // Check if the ATS redirected to an error/listing page (e.g. Greenhouse ?error=true)
    const finalUrl = page.url();
    for (const pattern of EXPIRED_URL_PATTERNS) {
      if (pattern.test(finalUrl)) {
        return { result: 'expired', reason: `redirect to ${finalUrl}` };
      }
    }

    const bodyText = await page.evaluate(() => document.body?.innerText ?? '');

    // Apply button is the strongest positive signal — check it first.
    // This short-circuits before expired patterns that can appear on active pages
    // (e.g. Workday's split-view layout shows "N JOBS FOUND" even on active job pages).
    if (APPLY_PATTERNS.some(p => p.test(bodyText))) {
      return { result: 'active', reason: 'apply button detected' };
    }

    for (const pattern of EXPIRED_PATTERNS) {
      if (pattern.test(bodyText)) {
        return { result: 'expired', reason: `pattern matched: ${pattern.source}` };
      }
    }

    if (bodyText.trim().length < MIN_CONTENT_CHARS) {
      return { result: 'expired', reason: 'insufficient content — likely nav/footer only' };
    }

    return { result: 'uncertain', reason: 'content present but no apply button found' };

  } catch (err) {
    return { result: 'expired', reason: `navigation error: ${err.message.split('\n')[0]}` };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const NDJSON = args.includes('--ndjson');
  const positional = args.filter(a => a !== '--ndjson');

  if (positional.length === 0) {
    console.error('Usage: node check-liveness.mjs [--ndjson] <url1> [url2] ...');
    console.error('       node check-liveness.mjs [--ndjson] --file urls.txt');
    process.exit(2);
  }

  let rawUrls;
  if (positional[0] === '--file') {
    const text = await readFile(positional[1], 'utf-8');
    rawUrls = text.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  } else {
    rawUrls = positional;
  }

  // Validate inputs upfront
  const validated = rawUrls.map(raw => ({ raw, ...validateUrl(raw) }));
  const invalid = validated.filter(v => !v.ok);
  const valid = validated.filter(v => v.ok);

  for (const v of invalid) {
    if (NDJSON) {
      process.stdout.write(JSON.stringify({ url: v.raw, result: 'invalid', reason: v.reason }) + '\n');
    } else {
      console.log(`⛔ invalid    ${v.raw}`);
      console.log(`           ${v.reason}`);
    }
  }

  if (valid.length === 0) {
    if (NDJSON) {
      process.stdout.write(JSON.stringify({ type: 'summary', total: rawUrls.length, active: 0, expired: 0, uncertain: 0, invalid: invalid.length }) + '\n');
    } else {
      console.log('\nNo valid URLs to check.');
    }
    process.exit(2);
  }

  if (!NDJSON) console.log(`Checking ${valid.length} URL(s)...\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let active = 0, expired = 0, uncertain = 0;

  // Sequential — project rule: never Playwright in parallel
  for (const v of valid) {
    const url = v.url;
    const { result, reason } = await checkUrl(page, url);
    if (NDJSON) {
      process.stdout.write(JSON.stringify({ url, result, reason }) + '\n');
    } else {
      const icon = { active: '✅', expired: '❌', uncertain: '⚠️' }[result];
      console.log(`${icon} ${result.padEnd(10)} ${url}`);
      if (result !== 'active') console.log(`           ${reason}`);
    }
    if (result === 'active') active++;
    else if (result === 'expired') expired++;
    else uncertain++;
  }

  await browser.close();

  if (NDJSON) {
    process.stdout.write(JSON.stringify({ type: 'summary', total: rawUrls.length, active, expired, uncertain, invalid: invalid.length }) + '\n');
  } else {
    console.log(`\nResults: ${active} active  ${expired} expired  ${uncertain} uncertain  ${invalid.length} invalid`);
  }

  if (expired > 0 || uncertain > 0 || invalid.length > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
