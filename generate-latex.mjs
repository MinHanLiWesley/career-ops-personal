#!/usr/bin/env node
// Render templates/cv-template.tex into a tailored .tex file.
//
// Inputs (user-agnostic — any user with their own profile.yml + cv.md works):
//   - config/profile.yml      (candidate identity, optional github)
//   - cv.md                   (canonical education / experience / skills in markdown)
//   - (optional) a tailoring JSON/YAML that overrides the summary + bullets for a specific JD
//
// Usage:
//   node generate-latex.mjs                              # render + auto-compile cv.md → .tex → .pdf
//   node generate-latex.mjs --tailored path/to/pack.yml  # overlay tailored bullets on top of cv.md
//   node generate-latex.mjs --out output/custom.tex      # custom output path
//   node generate-latex.mjs --no-compile                 # skip pdflatex (produce .tex only)
//
// Requires pdflatex on PATH (TeX Live / MacTeX / MiKTeX) for local compilation.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import yaml from "js-yaml";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname));
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const tailoredPath = flag("--tailored");
const outArg = flag("--out");

const profile = yaml.load(fs.readFileSync(path.join(ROOT, "config/profile.yml"), "utf8"));
const cvMd = fs.readFileSync(path.join(ROOT, "cv.md"), "utf8");
const template = fs.readFileSync(path.join(ROOT, "templates/cv-template.tex"), "utf8");
const tailored = tailoredPath
  ? yaml.load(fs.readFileSync(path.resolve(tailoredPath), "utf8"))
  : null;

// --- LaTeX escaping ---
const esc = (s = "") =>
  String(s)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/→/g, "$\\rightarrow$")
    .replace(/—/g, "---")
    .replace(/–/g, "--");

// LaTeX-safe URL escaping for use INSIDE \href{URL}{...}.
// TeX tokenizes `%` (comment) and `#` (param marker) before hyperref sees the
// URL, so they must be backslash-escaped — hyperref then decodes \% and \#
// back to literal %/# in the URL (so already-encoded paths like %20 survive).
// `\`, `{`, `}`, control chars, and whitespace are illegal in URLs and would
// let a hallucinated/attacker-controlled URL break out of the \href argument.
const escHrefUrl = (s = "") => {
  const v = String(s);
  if (!v) return "";
  if (/[\u0000-\u001f\u007f\s\\{}]/.test(v)) {
    console.warn(`⚠️  URL contains unsafe chars, dropping: ${v.slice(0, 60)}`);
    return "";
  }
  return v.replace(/([%#])/g, "\\$1");
};

// For tailored bullets: escape LaTeX-specials but preserve **bold** → \textbf{}
const escBullet = (s = "") => {
  // Step 1: extract all **...** spans and replace with unique placeholders
  const spans = [];
  const withPlaceholders = s.replace(/\*\*([^*]+)\*\*/g, (_, inner) => {
    spans.push(inner);
    return `\u0001BOLD${spans.length - 1}\u0002`;
  });
  // Step 2: escape the rest
  const escaped = esc(withPlaceholders);
  // Step 3: restore spans as \textbf{...} — inner content also escaped
  return escaped.replace(/\u0001BOLD(\d+)\u0002/g, (_, i) => `\\textbf{${esc(spans[+i])}}`);
};

// --- Parse cv.md ---
// Expected shape: ## Education / ## Experience / ## Technical Skills (## Summary ignored in LaTeX body)
const parseSections = (md) => {
  const sections = {};
  const lines = md.split("\n");
  let current = null, buf = [];
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      if (current) sections[current] = buf.join("\n").trim();
      current = m[1].toLowerCase();
      buf = [];
    } else if (current) {
      buf.push(line);
    }
  }
  if (current) sections[current] = buf.join("\n").trim();
  return sections;
};

const parseExperienceBlocks = (text) => {
  // Each experience block starts with ### role — company
  const blocks = [];
  const parts = text.split(/^###\s+/m).slice(1);
  for (const p of parts) {
    const lines = p.split("\n");
    const header = lines[0].trim();                        // "Software Engineer Intern — ByteDance (TikTok)"
    const tech = (lines[1] || "").replace(/^\*|\*$/g, "").trim(); // "*Go, Python, ... — San Jose, CA*"
    const dates = (lines[2] || "").trim();                 // "05/2025 – 11/2025"
    const bullets = lines
      .slice(3)
      .filter((l) => l.trim().startsWith("- "))
      .map((l) => l.replace(/^-\s+/, "").trim());
    // Split header "role — company"
    const [roleRaw, companyRaw] = header.split(/\s+—\s+/);
    // Split tech "tech — location" if present
    const [techRaw, locationRaw] = tech.split(/\s+—\s+/);
    blocks.push({
      role: roleRaw || header,
      company: companyRaw || "",
      tech: (techRaw || "").replace(/^\*|\*$/g, "").trim(),
      location: (locationRaw || "").replace(/^\*|\*$/g, "").trim(),
      dates,
      bullets,
    });
  }
  return blocks;
};

const parseEducationBlocks = (text) => {
  // Blocks separated by blank lines; each starts with **Name** — City ...
  const blocks = [];
  const parts = text.split(/\n\n+/);
  for (const p of parts) {
    const lines = p.split("\n").filter(Boolean);
    if (!lines.length) continue;
    const titleMatch = lines[0].match(/^\*\*(.+?)\*\*\s*—\s*(.+)$/);
    if (!titleMatch) continue;
    const school = titleMatch[1];
    const location = titleMatch[2];
    const degree = (lines[1] || "").replace(/^\*|\*$/g, "").trim();
    const period = (lines[2] || "").trim();
    const coursework = (lines.find((l) => /^Coursework:/i.test(l)) || "").replace(/^Coursework:\s*/i, "").trim();
    blocks.push({ school, location, degree, period, coursework });
  }
  return blocks;
};

const parseSkills = (text) => {
  // Lines like "**Languages:** Java, Python, ..."
  const lines = text.split("\n").filter((l) => l.trim().startsWith("**"));
  return lines.map((l) => {
    const m = l.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    return m ? { label: m[1], value: m[2].trim() } : null;
  }).filter(Boolean);
};

const sections = parseSections(cvMd);
const experiences = parseExperienceBlocks(sections["experience"] || "");
const education = parseEducationBlocks(sections["education"] || "");
// Skills section: source is cv.md, but tailored packet may override it entirely
// for JD-specific ATS keyword matching. Experience bullets are NEVER touched this way.
let skills = parseSkills(sections["technical skills"] || "");
if (tailored?.skills && Array.isArray(tailored.skills)) {
  // Expected shape: [{ label: "Languages", value: "Go, TypeScript, ..." }, ...]
  skills = tailored.skills.map((r) => ({ label: r.label, value: r.value }));
}

// --- Apply tailored overrides ---
// tailored.yml shape:
//   summary: "..."
//   bullets:
//     "ByteDance (TikTok)":
//       - "tailored bullet 1"
//       - "tailored bullet 2"
//     "ReMo":
//       - ...
//   keywords: ["Go", "RAG"]          # for inclusion report
if (tailored?.bullets) {
  for (const exp of experiences) {
    const key = Object.keys(tailored.bullets).find((k) =>
      exp.company.toLowerCase().includes(k.toLowerCase())
    );
    if (key) exp.bullets = tailored.bullets[key];
  }
}

// --- Render sections into LaTeX ---
const renderExperience = (blocks) =>
  blocks
    .map((b) => {
      const items = b.bullets.map((text) => `    \\resumeItem{${escBullet(text)}}`).join("\n");
      return [
        `    \\resumeSubheading`,
        `      {${esc(b.role)}}{${esc(b.dates)}}`,
        `      {${esc(b.company + (b.tech ? " | " + b.tech : ""))}}{${esc(b.location)}}`,
        `      \\resumeItemListStart`,
        items,
        `      \\resumeItemListEnd`,
      ].join("\n");
    })
    .join("\n\n");

const renderEducation = (blocks) =>
  blocks
    .map((b) => {
      const coursework = b.coursework
        ? `\n      \\resumeItem{Coursework: ${esc(b.coursework)}}`
        : "";
      return [
        `    \\resumeSubheading`,
        `      {${esc(b.school)}}{${esc(b.location)}}`,
        `      {${esc(b.degree)}}{${esc(b.period)}}${coursework}`,
      ].join("\n");
    })
    .join("\n\n");

// Skills renderer. When there are 6+ rows, auto-merge the last 2 onto one line
// with \hspace{5pt} so the resume fits on one page (matches the author's original).
const renderSkills = (rows) => {
  const out = [];
  const shouldMerge = rows.length >= 6;
  const lastPairStart = shouldMerge ? rows.length - 2 : rows.length;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (shouldMerge && i === lastPairStart) {
      const next = rows[i + 1];
      out.push(
        `\\textbf{${esc(r.label)}}{: ${esc(r.value)}} \\hspace{5pt} \\textbf{${esc(next.label)}}{: ${esc(next.value)}}`
      );
      break;
    }
    const terminator = i === rows.length - 1 ? "" : " \\\\";
    out.push(`\\textbf{${esc(r.label)}}{: ${esc(r.value)}}${terminator}`);
  }
  return out.join("\n");
};

// --- Candidate header values ---
const c = profile.candidate || {};
const phone = c.phone || "";
const email = c.email || "";
const linkedin = c.linkedin || "";
const github = c.github || "";
const loc = c.location || profile.location?.city || "";

const linkedinUrl = linkedin ? (linkedin.startsWith("http") ? linkedin : `https://${linkedin}`) : "";
const githubUrl = github ? (github.startsWith("http") ? github : `https://${github}`) : "";

let rendered = template
  .replace(/\{\{NAME\}\}/g, esc(c.full_name || ""))
  .replace(/\{\{PHONE\}\}/g, esc(phone))
  .replace(/\{\{EMAIL_URL\}\}/g, escHrefUrl(email))
  .replace(/\{\{EMAIL_DISPLAY\}\}/g, esc(email))
  .replace(/\{\{LINKEDIN_URL\}\}/g, escHrefUrl(linkedinUrl))
  .replace(/\{\{LINKEDIN_DISPLAY\}\}/g, esc(linkedin))
  .replace(/\{\{GITHUB_URL\}\}/g, escHrefUrl(githubUrl))
  .replace(/\{\{GITHUB_DISPLAY\}\}/g, esc(github))
  .replace(/\{\{LOCATION\}\}/g, esc(loc))
  .replace(/\{\{EDUCATION\}\}/g, renderEducation(education))
  .replace(/\{\{EXPERIENCE\}\}/g, renderExperience(experiences))
  .replace(/\{\{SKILLS\}\}/g, renderSkills(skills));

// Projects section: skip entirely when tailored doesn't supply any (Wesley's default)
const projects = tailored?.projects || [];
const projectsSection = projects.length
  ? [
      `\\section{Personal Projects}`,
      `\\resumeSubHeadingListStart`,
      projects
        .map(
          (p) =>
            `  \\resumeProjectHeading{\\textbf{${esc(p.name)}} | ${esc(p.tech || "")}}{${esc(p.date || "")}}\n  \\resumeItemListStart\n${(p.bullets || [])
              .map((b) => `    \\resumeItem{${esc(b)}}`)
              .join("\n")}\n  \\resumeItemListEnd`
        )
        .join("\n"),
      `\\resumeSubHeadingListEnd`,
    ].join("\n")
  : "";
rendered = rendered.replace(/\{\{PROJECTS_SECTION\}\}/g, projectsSection);

// --- Write ---
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const date = new Date().toISOString().slice(0, 10);
const defaultName = `cv-${slug(c.full_name || "candidate")}-${date}.tex`;
const outPath = path.resolve(outArg || path.join(ROOT, "output", defaultName));
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, rendered);
console.log(`✅ Wrote ${path.relative(ROOT, outPath)}`);

// --- Auto-compile with pdflatex unless --no-compile ---
if (!args.includes("--no-compile")) {
  const outDir = path.dirname(outPath);
  const res = spawnSync(
    "pdflatex",
    ["-interaction=nonstopmode", "-halt-on-error", `-output-directory=${outDir}`, outPath],
    { stdio: "pipe", encoding: "utf8" }
  );
  if (res.error) {
    console.error(`⚠️  pdflatex not found on PATH — skipped compile. Run with --no-compile to silence.`);
  } else if (res.status !== 0) {
    const tail = (res.stdout || "").split("\n").slice(-25).join("\n");
    console.error(`❌ pdflatex failed (exit ${res.status}):\n${tail}`);
    process.exit(res.status);
  } else {
    const pdfPath = outPath.replace(/\.tex$/, ".pdf");
    // Clean up aux files
    for (const ext of [".aux", ".log", ".out"]) {
      const f = outPath.replace(/\.tex$/, ext);
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
    console.log(`✅ Compiled ${path.relative(ROOT, pdfPath)}`);
  }
}
