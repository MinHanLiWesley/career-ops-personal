# Review: Sierra — Software Engineer, Agent (New Grad)

**Overall:** 7.0 / 10
**Verdict:** APPROVE WITH FIXES

Adversarial blind review of `output/cv-min-han-li-sierra-2026-04-22.tex` against `cv.md` + `article-digest.md` and the Sierra JD (https://jobs.ashbyhq.com/sierra/6a75b530-b7bb-4439-bb67-37b4f2b75b96). Tailoring packet and evaluation report were NOT read.

## Findings

### Fabrications (CRITICAL)

- **Bullet ByteDance-5**: *"Iterated on agent quality using LLM-as-judge evals over historical incident data to tune routing thresholds and prompt strategies"* — **NOT traceable**. Neither `cv.md` nor `article-digest.md` mentions LLM-as-judge evaluation, routing-threshold tuning, or prompt-strategy iteration. The source only references "LLM chat summarization", "LLM-based routing" (as a deployed feature, not an eval methodology), and RAG. This bullet appears to have been added to capture the JD's "eval frameworks" keyword, but no source evidence supports that the candidate actually ran LLM-as-judge evals or tuned thresholds this way. **Recommend: remove the bullet, or replace with a source-backed equivalent that honestly describes iteration (e.g., "Tuned LLM-based routing from internal runbooks over the weekly incident corpus" if that is truthful — but candidate must confirm before keeping).**

### Metric Issues

- **Bullet ByteDance-3**: adds *"sub-second retrieval"* as a latency claim. Source (`article-digest.md` → Incident-to-Article Knowledge Pipeline) says only "Redis caching on high-frequency lookups to minimize query latency" — no numerical target. This is a minor METRIC ADDITION: a qualitative source ("minimize latency") is upgraded to a quantitative claim ("sub-second"). **Recommend: soften to "low-latency retrieval" or "to minimize query latency".**
- All other numeric claims in the tailored CV (200+ users, 50% / 7→3.5d, 50% of 30+, 10+ people, 6+ tools, sub-3s, 90%, 25%, 95%, 31% / 175→120ms, 300ms, 50% INT8) are present verbatim in `cv.md` and/or `article-digest.md`. Clean.

### Skill Inflation

- Mild, borderline acceptable: the ByteDance bullet 1 reframes the "AI-powered on-call diagnostic bot" as a "production AI agent". The source does describe multi-agent diagnostic workflows and runbook-driven agents, so calling the overall system "AI agent" is defensible under Layer 2. No hard inflation.
- "Owned end-to-end delivery" (ByteDance-4) goes slightly beyond the source phrasing ("Developed 6+ integrated troubleshooting tools"). The ownership claim is a Layer-2 stretch, not contradicted by source, but the candidate should be ready to defend "owned" in an interview.
- No language/framework/tool is invented. Skills section matches `cv.md` exactly.

### Semantic Drift

- ByteDance-1 collapses two source bullets into one. The 50% / 7→3.5d reduction in the source is attributed to "auto-aggregating ads data and relevant past incidents at ticket creation". The tailored version attributes it to "LLM-based routing and auto-retrieval of related past incidents" — "LLM-based routing" is from a different source bullet (the RAG self-service bullet), and the original causal chain (auto-aggregation of ads data) is dropped. Mechanism is now a blend. Minor drift; the metric still belongs to the same system, but the causal claim has shifted.
- ReMo-6 adds "LLM-based metadata extraction" where the source says "multi-stage OCR and metadata extraction" — the LLM component is present elsewhere in the ReMo proof-point set ("custom LLM metadata extraction"), so this is legitimate consolidation, not drift.

### JD Coverage Gaps

The JD explicitly calls out: production AI agents, ADLC, eval frameworks, agent tooling, RAG pipelines, prompt engineering, React, TypeScript, Go, customer-facing work, end-to-end ownership.

- **Covered**: AI agents, Go, RAG, React, end-to-end ownership, production scale, multi-agent.
- **Weakly covered / missing legitimately**:
  - *TypeScript* — listed in Skills but not surfaced in any bullet. Source has no TypeScript project to surface, so this is an honest gap. Acceptable.
  - *Eval frameworks / prompt engineering* — currently "covered" only via the fabricated ByteDance-5 bullet. With that bullet removed, coverage drops to zero. There is no honest source material for these keywords, so the gap is real. **Recommend: accept the gap rather than fabricate.**
  - *Customer-facing / external stakeholders* — no surfacing in any bullet. Source doesn't strongly support this; skip honestly.
- Summary line is missing entirely from the .tex (no Summary section). The JD and new-grad framing could benefit from one, but the template choice is intentional — not a defect.

### Readability

- All 15 bullets fit on one visual line at standard LaTeX rendering. Longest bullet (ByteDance-1) is ~30 words — right at the upper bound, borderline acceptable.
- ByteDance role has 5 bullets; others 3–4. If ByteDance-5 is removed (fabrication fix), the role lands at 4 bullets, which improves density.
- ATS parseability is strong: standard sections (Education, Experience, Technical Skills), plain `\resumeItem` bullets, `\pdfgentounicode=1` set, no exotic glyphs beyond `$\rightarrow$` (ATS-safe with unicode mapping), `\textbf` bolding which most ATS tolerate. Minor risk: some ATS strip `\textbf`, but the text underneath remains intact.

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Traceability | 6/10 | 14 of 15 bullets trace cleanly; ByteDance-5 (LLM-as-judge evals) is a fabrication. One fabricated bullet caps this dimension. |
| Metric integrity | 7/10 | All hard numbers trace. One soft addition ("sub-second retrieval") is qualitative→quantitative drift. |
| Skill honesty | 8/10 | No invented tech. Mild framing stretches ("AI agent", "owned end-to-end") but defensible. |
| Semantic fidelity | 7/10 | ByteDance-1 blends causal chains from two source bullets; reader could form a slightly inaccurate mental model. ReMo-6 consolidation is clean. |
| JD keyword coverage | 6/10 | Strong on agents/RAG/Go/React. Weak on evals/prompt-eng (honestly no source); TypeScript skill-only. Removing the fabrication creates a real gap. |
| Level appropriateness | 9/10 | New-grad framing is correct — Education first, intern titles preserved, graduation 04/2026 visible. Sierra is hiring New Grad at SWE Agent. Good match. |
| ATS parseability | 9/10 | Clean standard sections, unicode-mapped PDF, no tables inside bullets, no images. Minor: `\textbf` inside bullets is tolerated by most ATS, not all. |
| Readability/density | 8/10 | One-page, skimmable, bolded hero metrics. ByteDance at 5 bullets is slightly dense; removing fabrication fixes this. |

**Overall (weighted):** (6×2 + 7×2 + 8×2 + 7 + 6 + 9 + 9 + 8) / 11 = (12 + 14 + 16 + 7 + 6 + 9 + 9 + 8) / 11 = 81 / 11 = **7.36 / 10**

Rounded summary: **7.0–7.4 / 10**. Fabrication present → would trigger REJECT under strict rubric, but the fabrication is a single, easily-removed bullet and no metric inflation exists on the hard numbers. Classifying as **APPROVE WITH FIXES** conditional on Fix #1 being applied before submission.

## Required Fixes (before apply)

1. **Remove or truthfully replace ByteDance bullet 5** ("Iterated on agent quality using LLM-as-judge evals..."). There is no source evidence the candidate ran LLM-as-judge evals, tuned routing thresholds, or iterated prompt strategies. Keeping it risks a trust failure in interview ("Tell me about the eval framework you built..."). Either delete the bullet, or replace with a source-grounded iteration statement the candidate can defend.
2. **Soften "sub-second retrieval"** in ByteDance bullet 3 to a non-numerical phrasing (e.g., "low-latency retrieval") since the source does not quantify retrieval latency.
3. **Reconcile ByteDance bullet 1's causal chain**: either attribute the 50% reduction to "auto-aggregation of ads data and past incidents" (matches cv.md bullet 1) OR to "LLM-based routing" (matches cv.md bullet 2 — but that bullet owns the 50%-of-30+-weekly metric, not the 7→3.5 day metric). Don't mix mechanisms across bullets.

## Nice-to-Have Fixes

1. If the candidate has honest TypeScript proof points beyond the skills list (e.g., the Zustand/React work at ReMo — Zustand is TS-flavored by default), consider surfacing "TypeScript" explicitly in ReMo-8 to capture a JD keyword cheaply.
2. Consider a 1-line Summary above Education highlighting new-grad + AI-agent production experience — matches Sierra's "New Grad, Agent" framing and eats JD keywords (agents, RAG, Go) at the top of the page.
3. ByteDance-4: replace "Owned end-to-end delivery" with "Built and shipped" unless the candidate truly owned product/design decisions end-to-end at ByteDance — tightens the claim and avoids an interviewer probe on scope.
