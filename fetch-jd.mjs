#!/usr/bin/env node
// Quick JD fetcher via Playwright.
//
// Usage:
//   node fetch-jd.mjs <url> [url2 ...]
//   node fetch-jd.mjs --ndjson <url> [url2 ...]
//   node fetch-jd.mjs --max-chars 4000 <url>
//
// Default: text blocks "=== URL ===\n<content>".
// --ndjson: streams one JSON object per URL: {url, ok, length, jd} or {url, ok:false, error, reason}.
// Validates URLs (http/https only, no path traversal, no loopback/private hosts, no control chars).
// Exit 2 if no valid URLs remain after validation.

if (process.argv.includes('--help-json')) {
  process.stdout.write(JSON.stringify({
    name: 'fetch-jd',
    description: 'Fetch job description text from one or more URLs via headless Chromium. Validates URLs before launching the browser; rejects file://, javascript:, loopback hosts, private networks, control chars, and path-traversal segments.',
    flags: [
      { name: '--ndjson', type: 'boolean', description: 'Stream one JSON object per URL instead of text blocks' },
      { name: '--max-chars', type: 'integer', default: 8000, description: 'Truncate JD body to N characters per URL' },
      { name: '--help-json', type: 'boolean', description: 'Print this schema and exit' },
    ],
    positional: [{ name: 'url', repeated: true, required: true, description: 'http(s) URLs to fetch' }],
    outputs: {
      text: 'Per-URL "=== <url> ===\\n<body>" blocks',
      ndjson: { schema: '{url, ok, length, jd} on success | {url, ok:false, error, reason} on failure' },
    },
    exitCodes: { 0: 'all fetched (or partial in ndjson)', 2: 'no valid URLs / usage error' },
  }) + '\n');
  process.exit(0);
}

import { chromium } from 'playwright';

function validateUrl(raw) {
  if (typeof raw !== 'string' || raw.length === 0) return { ok: false, reason: 'empty' };
  if (raw.length > 2048) return { ok: false, reason: 'too-long' };
  if (/[\x00-\x1f\x7f]/.test(raw)) return { ok: false, reason: 'control-chars' };
  // Reject path traversal segments in the raw input BEFORE URL normalization
  // collapses them. Agents hallucinate `/../`; legitimate JD URLs never contain it.
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

const argv = process.argv.slice(2);
const NDJSON = argv.includes('--ndjson');
const maxIdx = argv.indexOf('--max-chars');
let MAX_CHARS = 8000;
if (maxIdx >= 0) {
  const n = parseInt(argv[maxIdx + 1], 10);
  if (Number.isFinite(n) && n > 0) MAX_CHARS = n;
}
// Strip flags and their values from positional args
const rawInputs = argv.filter((a, i) => {
  if (a.startsWith('--')) return false;
  if (argv[i - 1] === '--max-chars') return false;
  return true;
});

if (rawInputs.length === 0) {
  console.error('Usage: node fetch-jd.mjs [--ndjson] [--max-chars N] <url> [url2 ...]');
  process.exit(2);
}

const validated = rawInputs.map(raw => ({ raw, ...validateUrl(raw) }));

for (const v of validated) {
  if (v.ok) continue;
  if (NDJSON) {
    process.stdout.write(JSON.stringify({ url: v.raw, ok: false, error: 'invalid-url', reason: v.reason }) + '\n');
  } else {
    console.error(`SKIP invalid URL (${v.reason}): ${v.raw}`);
  }
}

const validUrls = validated.filter(v => v.ok);
if (validUrls.length === 0) process.exit(2);

const browser = await chromium.launch({ headless: true });
for (const v of validUrls) {
  const url = v.url;
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
    const text = await page.evaluate((max) => document.body.innerText.replace(/\n{3,}/g, '\n\n').slice(0, max), MAX_CHARS);
    if (NDJSON) {
      process.stdout.write(JSON.stringify({ url, ok: true, length: text.length, jd: text }) + '\n');
    } else {
      console.log(`=== ${url} ===`);
      console.log(text);
      console.log();
    }
  } catch (err) {
    const reason = err.message.split('\n')[0];
    if (NDJSON) {
      process.stdout.write(JSON.stringify({ url, ok: false, error: 'fetch-failed', reason }) + '\n');
    } else {
      console.log(`=== ${url} ===`);
      console.log(`ERROR: ${err.message}`);
      console.log();
    }
  } finally {
    await page.close();
  }
}
await browser.close();
