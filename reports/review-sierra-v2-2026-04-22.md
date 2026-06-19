# Review: Sierra — Software Engineer, Agent (New Grad)

**Overall:** 7.5 / 10
**Verdict:** APPROVE WITH FIXES

Blind adversarial review of `output/cv-min-han-li-sierra-2026-04-22.tex` (v2 revision) against `cv.md` + `article-digest.md` and the Sierra JD.

## Findings

### Fabrications (CRITICAL)

None outright fabricated. All Experience bullets map to source bullets.

### Metric Issues — Mechanism Mis-attribution (CRITICAL)

- **ByteDance bullet 2** — "Designed multi-agent diagnostic workflows from internal runbooks, automating **50% of 30+ weekly ad-platform incidents** and eliminating escalations that previously required 10+ people per incident"
  - The source attributes the **50% / 30+ weekly issues** metric to **RAG + LLM-based routing self-service** (digest line 18; cv.md line 28), NOT to multi-agent diagnostic workflows. The Multi-Agent Diagnostic Workflows source bullet (digest line 26; cv.md line 30) carries the "10+ people per incident" metric, but not the "50% of 30+". Merging these two source bullets under the "multi-agent workflows" mechanism re-attributes a metric to the wrong system. This is effectively the same class of defect previously flagged under "ByteDance-bullet-1 mechanism-mixing" — it has been relocated, not resolved. Recommend: split back into two bullets (RAG self-service owns the 50% number; multi-agent workflows own the 10+ escalations claim) OR rephrase bullet 2 to keep only the escalations metric and a mechanism-accurate description.

### Skill Inflation

None detected. Skills section is JD-tuned (RAG, multi-agent, LLM routing, Go, TypeScript, React, FastAPI, PyTorch, etc.) and all listed skills are defensible from source roles. Per updated rubric, Skills is an ATS pool, not traceability-gated.

### Semantic Drift

- **ByteDance bullet 1** — "AI-powered on-call diagnostic bot" → "production AI agent". Mild drift toward JD vocabulary ("AI agent" is Sierra's headline term). Defensible because the bot does orchestrate multi-agent workflows, but the framing moves from a concrete description to a Sierra-coded term. Acceptable at Layer 2.
- **ByteDance bullet 5** — "Developed" → "Owned end-to-end delivery of". Minor seniority-inflection on a new-grad internship; borderline but defensible.

### JD Coverage Gaps

- JD strongly-preferred keywords all surfaced where source supports (RAG, multi-agent, AI agents, production, Go, React, TypeScript).
- "Eval frameworks" and "prompt engineering" appear only in Skills section — source does not support placing them in an Experience bullet, so keeping them ATS-only is correct.
- "Customer-facing / enterprise customers" — JD values direct customer contact. Source shows internal users (ByteDance 200+ internal). This is a real fit gap the CV cannot and should not paper over. No rewrite recommended.

### Readability

- ByteDance bullet 2 is 28 words and dense (two metrics fused). Trim after mechanism-split fix.
- All other bullets within 2 lines. Overall one page likely. No wall-of-text.

### Previously-flagged issues status

| Prior issue | Status in v2 |
|---|---|
| LLM-as-judge fabrication | RESOLVED — removed |
| Sub-second retrieval metric | RESOLVED — replaced with directional "minimize query latency" (source-supported) |
| ByteDance bullet 1 mechanism-mixing | NOT RESOLVED — relocated to bullet 2 (50% metric now mis-attributed to multi-agent workflows instead of RAG self-service) |

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Traceability | 8/10 | All bullets map to source; no fabrications. Bullet 2 merges two source bullets with metric reattribution. |
| Metric integrity | 6/10 | Numbers all exist in source, but the 50%/30+ metric is attributed to the wrong mechanism in bullet 2. |
| Skill honesty | 9/10 | No inflation inside bullets. Skills section defensible. "Owned end-to-end" is a mild framing upgrade. |
| Semantic fidelity | 8/10 | "AI-powered diagnostic bot" → "AI agent" is a defensible Layer-2 rephrase. Mild drift overall. |
| JD keyword coverage | 9/10 | RAG, multi-agent, AI agents, Go, TypeScript, React, production all surfaced. Prompt engineering/eval frameworks sit in Skills (correct). |
| Level appropriateness | 9/10 | New-grad framing intact; "Owned end-to-end delivery" is the only borderline phrase. |
| ATS parseability | 10/10 | Standard sections, clean LaTeX, no exotic chars, `pdfgentounicode=1` set. |
| Readability / density | 8/10 | One page, <2 lines per bullet except bullet 2. Under 80 words per role. |

Weighted overall: (8×2 + 6×2 + 9×2 + 8 + 9 + 9 + 10 + 8) / 11 = 90 / 11 = **8.18**

Downweighted to **7.5** because the mechanism mis-attribution in bullet 2 is a repeat of the class of issue previously rejected; by rubric, any metric integrity issue triggers at minimum APPROVE WITH FIXES and arguably REJECT. Given the metric does exist in the source (just under a different mechanism), I classify as APPROVE WITH FIXES — one required rewrite.

**Overall:** 7.5 / 10

## Required Fixes (before apply)

1. **Fix ByteDance bullet 2 mechanism-metric pairing.** Either:
   - (a) Split into the original two source structure: one bullet for RAG self-service owning "50% of 30+ weekly issues", another for multi-agent workflows owning "10+ people per incident" escalation reduction; OR
   - (b) Rewrite bullet 2 as: "Designed multi-agent diagnostic workflows from internal runbooks for ad-delivery debugging, eliminating manual escalations that previously required 10+ people per incident" (metric-accurate, no reattribution), and restore the 50% figure inside bullet 3 (RAG self-service) where the source places it.

## Nice-to-Have Fixes

1. Consider softening bullet 5's "Owned end-to-end delivery" to "Built and shipped" for stricter source parity with "Developed".
2. Bullet 1 "production AI agent" is JD-flavored — if recruiter probes the distinction, candidate should be ready to explain the diagnostic-bot → AI-agent framing honestly.
