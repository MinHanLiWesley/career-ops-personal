# Review: Lindy — Full Stack Software Engineer (Early Career)

**Overall:** 8.7 / 10
**Verdict:** APPROVE

Blind-review round on v3 of `cv-min-han-li-lindy-2026-04-22.tex`. Source of truth: `cv.md` + `article-digest.md`. JD fetched from Ashby.

## Key Attribution Check (v3 fix)

Explicitly re-verified the two metrics flagged in prior rounds:

| Metric | Attached to bullet | Source-of-truth location | Correct? |
|---|---|---|---|
| "50% of 30+ weekly" | ByteDance bullet #5 — "RAG and LLM-based routing, automating 50% of 30+ weekly ad-platform issues" | `article-digest.md` → "RAG + LLM-Based Self-Service — automates 50% of 30+ weekly ad-platform issues" | YES |
| "10+ people" | ByteDance bullet #4 — "multi-agent diagnostic workflows … previously required 10+ people per incident" | `article-digest.md` → "Multi-Agent Diagnostic Workflows — Reduced manual escalations that previously involved 10+ people per incident" | YES |

**Metric attribution is fully resolved in v3.** Both hero metrics land on the correct bullets. No metric has been swapped, inflated, or cross-contaminated.

## Findings

### Fabrications (CRITICAL)
None. All six ByteDance bullets, four ReMo bullets, three Yanray bullets, and three Acer bullets map to source bullets in `cv.md` / `article-digest.md`.

### Metric Issues
None. Every number in the tailored CV (200+ users, 50%, 7→3.5 days, 6+ tools, 10+ people, 30+ weekly, 25%, sub-3s, 90%, 95%, 31%, 175→120ms, 300ms, 50% latency, INT8) is present in the source at the same role.

### Skill Inflation
None inside Experience bullets. Skills section has been reorganized to surface JD vocabulary (TypeScript, Node.js, Next.js, React, GraphQL, distributed-systems patterns). Per rubric exemption, reordering/adding ATS keywords in Skills is allowed as long as they aren't back-referenced in Experience bullets the source doesn't support — and they aren't.

### Semantic Drift
- Minor: ByteDance bullet #1 reframes the source's "AI-powered on-call diagnostic bot" as a generic "production backend service in Go". The "AI-powered diagnostic" framing is dropped from this specific bullet. The AI nature of the work is preserved elsewhere (bullets 3, 4, 5 mention RAG, LLM, multi-agent). Acceptable tailoring choice for a full-stack/backend-lean JD but worth noting — a recruiter skimming just bullet 1 will read "Go backend" rather than "AI Go backend." Not a rubric violation.
- Minor: ReMo bullet #2 says "multi-stage OCR and LLM-based metadata extraction". `cv.md` source bullet says "multi-stage OCR and metadata extraction" (no LLM). `article-digest.md` separately lists "custom LLM metadata extraction" as a different proof point. Merging two proof points into one bullet is a light Layer-2 edit; since `article-digest.md` does support LLM metadata extraction at ReMo, this is within source bounds. Borderline but passable.

### JD Keyword Coverage
Strong. Checked JD's explicit keywords against the tailored CV:

| JD keyword | Surfaced? | Where |
|---|---|---|
| TypeScript | yes | Skills (Languages, Frontend) |
| Node.js | yes | Skills (Backend) |
| Next.js | yes | Skills (Frontend) |
| React | yes | ReMo bullet #1 + Skills |
| GraphQL | yes | Skills (Backend) |
| Distributed systems (queuing, caching, retries, reliability patterns) | yes | Skills (Distributed Systems) — verbatim phrase |
| End-to-end ownership | yes | ByteDance bullet #2 "Owned end-to-end delivery" |
| Debugging / problem-solving | implicit | On-call diagnostic bot work signals this |
| LLM APIs / "built something with them" | yes | ByteDance bullets 3, 4, 5; ReMo bullet #3; Yanray bullet #1 |
| 0–2 years professional experience | yes | Intern-only experience, MS grad 04/2026 — level match |

Gaps (not blocking):
- No explicit surfacing of WebSockets / real-time systems / event-driven architectures. Source doesn't clearly support this, so leaving it out is correct.
- No "side projects / open source" signal. Source has no such content either — nothing to surface.

### Level Appropriateness
Good. The CV clearly reads as a new-grad / early-career profile: four internships, MS CS grad 04/2026, no senior-title overclaims. Matches JD's "0–2 years" and "early in your career but not early in your drive" framing.

### Readability / Density
- ByteDance section: 5 bullets, all ≤ ~30 words. Total ByteDance text ≈ 130 words — slightly heavy for one role but still skimmable, and justified because it's the highest-signal role for this JD.
- ReMo, Yanray, Acer: 4/3/3 bullets respectively, each ≤25 words. Clean.
- One page expected to hold.

### ATS Parseability
Standard LaTeX template (`\resumeItem`, `\resumeSubheading`), `\pdfgentounicode=1` enabled, no exotic characters. Section headers are standard (Education, Experience, Technical Skills). Safe for most ATS parsers.

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Traceability | 10/10 | Every Experience bullet maps to `cv.md`/`article-digest.md`. No fabrications. |
| Metric integrity | 10/10 | All numbers sourced. The two previously-flagged metrics (50% of 30+ weekly, 10+ people) are now correctly attributed. |
| Skill honesty | 9/10 | Skills section reorg is within ATS-pool exemption. No Experience-bullet skill inflation. Minor: listing Next.js in Skills with no Next.js in source is defensible (JD bonus skill, no Experience back-reference) but worth knowing. |
| Semantic fidelity | 8/10 | ByteDance bullet #1 softens "AI-powered diagnostic bot" to "backend service in Go" — intentional retargeting, AI surfaced elsewhere. ReMo bullet #2 merges two source proof points (OCR + LLM metadata) into one bullet — borderline but within `article-digest.md` bounds. |
| JD keyword coverage | 9/10 | All must-haves and most bonus skills surfaced. Missing: WebSockets/real-time (not in source — correctly omitted). |
| Level appropriateness | 10/10 | Clean new-grad framing — no seniority overclaims. |
| ATS parseability | 10/10 | Standard template, unicode-enabled, standard section names. |
| Readability / density | 8/10 | ByteDance at 5 bullets/~130 words is slightly dense; still skimmable and justified for highest-signal role. |

**Weighted overall:** (10×2 + 10×2 + 9×2 + 8 + 9 + 10 + 10 + 8) / 11 = **95/11 ≈ 8.64 → 8.7/10**

## Required Fixes (before apply)
None. v3 clears the metric-attribution blocker that motivated this round.

## Nice-to-Have Fixes
1. Consider restoring "AI-powered" or "diagnostic" into ByteDance bullet #1 so a recruiter's first-bullet skim catches the AI angle. Example: "Shipped production **AI-powered diagnostic service in Go** serving 200+ internal users…" — stays within source wording and reclaims the hero framing without adding tech.
2. Optional: if a GitHub URL exists, surface it in the header — JD explicitly values "side projects, open source contributions". The LaTeX template already has a commented-out GitHub line ready to uncomment.
3. Optional: Skills section — the "Distributed Systems" line mirrors the JD's bonus-skills phrasing verbatim ("queuing, caching, retries, reliability patterns"). This is effective for ATS but might read as JD-copy-paste to a human reviewer. Consider reordering the words or adding one more concrete item (e.g., "back-pressure") to feel more natural.

## Verdict Rationale
Overall ≥ 8.0, zero fabrications, zero metric issues, no skill inflation inside Experience bullets, level-appropriate — meets APPROVE threshold per rubric. The v3 fix is correct and complete: the "50% of 30+ weekly" metric now lives on the RAG/LLM-routing bullet and "10+ people" lives on the multi-agent bullet, exactly as the source specifies.
