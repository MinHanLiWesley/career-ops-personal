# Review: Lindy — Full Stack Software Engineer (Early Career)

**Overall:** 8.2 / 10
**Verdict:** APPROVE WITH FIXES

Revised tex file: `output/cv-min-han-li-lindy-2026-04-22.tex`
JD: https://jobs.ashbyhq.com/lindy/a5100dbe-d851-4544-bb4c-0428d77940eb
Sources: `cv.md`, `article-digest.md`

---

## Findings

### Fabrications (CRITICAL)

None. Every Experience bullet maps to a source bullet in `cv.md` / `article-digest.md`.

Previously-flagged fabrications all resolved:

- "debug-with-urgency" JD-echo fabrication — **NOT PRESENT** in any Experience bullet.
- TypeScript at ReMo skill-swap — **NOT PRESENT**. ReMo bullets list only React (source-supported) and FastAPI/Go/Python.
- "React-style" at ByteDance — **NOT PRESENT**. ByteDance bullets do not mention React.
- "Sub-second retrieval" inflation at ReMo — **RESOLVED**. Tailored bullet says "sub-3s inference latency" (matches source exactly).
- "Queuing" JD-echo — confined to Skills section (exempt per updated rubric). Not injected into any Experience bullet.

### Metric Issues

- **ByteDance Bullet 4 (moderate — metric attribution drift):** "Automated **50% of 30+ weekly ad-platform incidents** through **multi-agent diagnostic workflows**, eliminating escalations that previously required **10+ people per incident**."

  Source splits these metrics across two distinct proof points:
  - "50% of 30+ weekly issues" → RAG + LLM-Based Self-Service (bullet 2 in source).
  - "10+ people per incident" → Multi-Agent Diagnostic Workflows (bullet 4 in source).

  The tailored bullet attributes the 50%/30+ metric to multi-agent workflows, which is a merge of two mechanisms. Bullet 5 of the tailored CV also covers RAG+LLM routing separately, so there is now slight overlap / attribution ambiguity. Not a fabrication, but the metric is sitting on the wrong mechanism.

### Skill Inflation

None inside Experience bullets. Tailored bullets preserve source-stated seniority ("Shipped", "Built", "Engineered", "Developed", "Optimized") — no "expert-level" or "architected at scale" style upgrades.

### Semantic Drift

- **ByteDance Bullet 1 (minor):** Source calls the artifact an "AI-powered on-call diagnostic bot"; tailored says "production backend service in Go." Factually true (it *is* a backend service) and JD-aligned (backend lean), but de-specifies the "AI on-call diagnostic" framing. Acceptable Layer-2 rephrase.
- **ByteDance Bullet 2 (minor):** "Owned end-to-end delivery of 6+ integrated tools" — "owned end-to-end" echoes JD vocabulary ("own features end-to-end"), but the underlying scope (6+ tools, card interface, non-technical staff) is sourced verbatim. Borderline; not flagged as fabrication.

### JD Coverage Gaps

Strong coverage. JD must-haves / bonus surfaced:

- TypeScript, React, Node.js, Next.js, GraphQL → Skills ✓
- Queuing, caching, retries, reliability patterns → Skills ✓
- LLM APIs, RAG, multi-agent → ByteDance bullets ✓
- End-to-end feature ownership, shipping to production → ByteDance bullets ✓
- Debugging / problem-solving → Covered implicitly via on-call diagnostic work.

Gaps (minor):

- **"Real-time systems / event-driven (WebSockets)"** bonus — not surfaced. No source evidence to back this, so correctly omitted.
- **"Side projects / code outside of work"** — JD weighs this heavily; the CV has no Projects section. Not a trace problem, but a coverage gap worth noting. Source CV does not contain projects, so this is a real experience gap rather than a tailoring miss.
- **"TypeScript / Node.js in a listed role"** — Only appears in Skills, not in any Experience bullet. Correct per rubric (source doesn't support it in any listed role), but Lindy's stack is TS/Node and the CV relies entirely on the Skills block to establish credibility here.

### Readability

- One page, standard Jake Gutierrez template — ATS clean.
- Bullets are 1–2 lines each, well under 25 words. No wall-of-text.
- ByteDance at 5 bullets is on the high end for one role; the bullet density is fine but the section occupies most of the page.

---

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Traceability | 9/10 | All bullets source-backed. Minor attribution merge in ByteDance B4. |
| Metric integrity | 8/10 | All numbers exist in source. B4 attributes 50%/30+ to multi-agent workflows instead of RAG routing. |
| Skill honesty | 10/10 | No inflation; seniority verbs match source. Skills block defensible. |
| Semantic fidelity | 8/10 | Minor JD-vocabulary echo ("owned end-to-end"), minor de-specification ("AI bot"→"backend service"). |
| JD keyword coverage | 9/10 | TS/React/Node/Next.js/GraphQL/queuing/RAG/LLM all surfaced. Projects + WebSockets gaps are source-limited. |
| Level appropriateness | 9/10 | Framed as new-grad with production scale. Matches "0–2 yrs" Early-Career target. |
| ATS parseability | 10/10 | Standard Jake template, clean `\resumeItem`, `\pdfgentounicode=1`, no exotic chars. |
| Readability/density | 9/10 | One page, bullets ≤2 lines. ByteDance slightly bullet-heavy but still skimmable. |

Weighted: (9×2 + 8×2 + 10×2 + 8 + 9 + 9 + 10 + 9) / 11 = **8.18 ≈ 8.2 / 10**

---

## Required Fixes (before apply)

1. **ByteDance Bullet 4 — fix metric attribution.** Either:
   - (a) Move "50% of 30+" back onto the RAG/LLM-routing bullet (5) and let B4 stand on the "10+ people per incident" metric alone, OR
   - (b) Merge B4 and B5 into a single bullet that attributes the 50%/30+ to RAG+LLM routing explicitly.

   Current phrasing stacks the wrong mechanism under the headline metric and creates overlap with B5.

## Nice-to-Have Fixes

1. **ByteDance Bullet 1:** Consider restoring "AI-powered on-call diagnostic bot" phrasing — Lindy's product *is* an AI assistant, so leading with "AI-powered" strengthens JD alignment without adding anything unsourced.
2. **ByteDance Bullet 2:** "Owned end-to-end delivery" is fine but reads as JD-echo. "Delivered 6+ integrated tools..." is equally strong and less mirror-like.
3. **Consider adding a Projects section** if the user has any side projects, even small ones — Lindy explicitly weighs "code outside of work" as a signal. The CV currently has no vehicle for this and relies entirely on internships.
4. ByteDance section could drop from 5 → 4 bullets if page space is tight; B4+B5 consolidation in Required Fix #1 would accomplish this naturally.
