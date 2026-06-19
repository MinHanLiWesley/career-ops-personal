# Mode: critique — Standalone Resume Quality Critic

**Trigger:** `/career-ops critique` or user asks to "score / rate / critique my resume" (no tailored variant, no specific JD).

**Purpose:** Score the canonical resume (`cv.md`) on its own merits against the candidate's `target_roles` archetypes. Surface weaknesses BEFORE any tailoring so the tailored outputs have a strong source to work from.

**Difference from `review` mode:**
- `review` compares a tailored CV against source truth (catches fabrication / drift).
- `critique` scores the source truth itself against archetype fitness + resume craftsmanship. No source-comparison needed.

## Inputs

- `cv.md` — the resume being scored
- `article-digest.md` — optional proof points (for impact-density cross-check)
- `config/profile.yml` — for `target_roles.archetypes` and `narrative.superpowers`
- `modes/_profile.md` — for adaptive-framing table (what matters per archetype)
- (Optional) `modes/_shared.md` — for shared scoring conventions

No JD is required. The candidate's target archetypes are the rubric.

## Invocation Pattern

Run as a subagent to keep main context clean:

```
Agent(
  subagent_type="general-purpose",
  description="Critique original resume",
  prompt="[contents of this file + candidate profile summary]",
  run_in_background=false
)
```

## Scoring Rubric (0-10 each)

| # | Dimension | 10 means | 0 means |
|---|-----------|----------|---------|
| 1 | **Impact density** | ≥80% of bullets have a quantified outcome (%, count, $, time) | No metrics anywhere |
| 2 | **Bullet craft** | Every bullet: strong action verb + what + measurable outcome. No "helped / assisted / worked on / responsible for" filler. | Wall of duties, passive voice |
| 3 | **Archetype fit** | Current bullets already surface the primary archetype's thematic axes (see `_profile.md` table) | Archetype signal buried or absent |
| 4 | **Level framing** | Scope / ownership / autonomy language matches candidate's target level (new grad: "shipped"/"built"/"owned"; senior: "led"/"architected"/"drove") | Overclaims seniority OR undersells it |
| 5 | **Keyword coverage** | Top 15 keywords for each target archetype appear organically (no stuffing) | Key archetype tech missing even when evidence exists in `article-digest.md` |
| 6 | **Section order & balance** | Contact → (Summary?) → Education → Experience → Skills → optional Projects. Experience dominates page area for new grad | Weird order, skills bloated, experience thin |
| 7 | **ATS parseability** | Standard section names, no columns / tables / icons in text fields, no exotic unicode that might confuse parsers, no template artifacts (e.g., `{{PLACEHOLDER}}`, `@@SENTINEL@@`) | Multi-column layout, images, template artifacts leaked, rare glyphs |
| 8 | **Readability / density** | One page (new grad) or two (senior). Bullets 1–2 lines. No role has >5 bullets. No bullet has >25 words. | Wall of text, 4+ lines per bullet, 7+ bullets per role |
| 9 | **Verb / phrase variety** | Each action verb appears ≤2× across entire resume; no repeated opener patterns | Same 3 verbs recur (built / developed / optimized) |
| 10 | **Differentiation signal** | The "signature" from `_profile.md` surfaces within the top 10 bullets | Resume reads like a generic polyglot SWE with no distinguishing edge |

**Overall** = straight average of the 10 scores (no weighting).

Verdict:
- **STRONG (≥8.5):** Ready to tailor. Ship as-is for untailored generic apps.
- **GOOD (7.0–8.5):** Tailoring will help, but foundational bullets are solid.
- **NEEDS WORK (5.5–7.0):** Fix source-level issues before running any tailoring. Tailored variants inherit weaknesses.
- **REBUILD (<5.5):** Source needs material rewrite before tailoring adds value.

## Output Format

Write critique to `reports/critique-{candidate-slug}-{YYYY-MM-DD}.md`:

```markdown
# Resume Critique — {candidate name}

**Overall:** X.X / 10 — {STRONG / GOOD / NEEDS WORK / REBUILD}
**Date:** YYYY-MM-DD
**Target archetypes scored against:** {from profile.yml}

## Scores

| # | Dimension | Score | Evidence / Notes |
|---|-----------|-------|------------------|
| 1 | Impact density | X/10 | e.g., "12 of 15 bullets have metrics — strong" |
| 2 | Bullet craft | X/10 | ... |
| ... | ... | ... | ... |

## Bullet-Level Findings (top 5 weak bullets)

For each weak bullet:
- **Quoted bullet** (exact text)
- **Issue** (which rubric dimension)
- **Proposed rewrite** (still factual — grounded in the existing claim, just stronger)

## Structural Findings

- Section order issues
- Balance issues (role / bullet counts)
- ATS risks
- Differentiation issues

## Required Fixes (before tailoring)

1. ...
2. ...

## Nice-to-Have Enhancements

1. ...
```

## Workflow

1. Read `cv.md`, `article-digest.md`, `config/profile.yml`, `modes/_profile.md`
2. Parse `cv.md` into structured sections and bullets
3. For each bullet, tag: has_metric (bool), verb (first word), word_count
4. Compute quantitative scores (#1, #2, #8, #9) from tags
5. Compare bullets + skills section against archetype keywords from `_profile.md`
6. Judge #3, #4, #5, #6, #7, #10 qualitatively with evidence from the source
7. Assemble scores + findings + top-5 weak bullets with proposed rewrites
8. Write report to `reports/critique-{slug}-{date}.md`
9. Return a compact summary (<200 words): overall score, verdict, top 3 required fixes

## Strictness Notes

- Proposed rewrites MUST stay source-faithful. If you can't rewrite a weak bullet without adding unsupported detail, note that the candidate needs to supply more context rather than inventing it.
- Don't penalize for missing sections that are optional for the candidate's career stage (e.g., new grads don't need a Publications section).
- A generic "Software Engineer" CV targeting generalist new grad roles should score acceptably — don't penalize for not being hyper-specialized.
- **Skills section is treated as an ATS keyword pool.** Do NOT penalize the Skills section for listing tech that doesn't appear in Experience bullets — that's an acceptable ATS tactic as long as the candidate can defend each item in interview. Only flag Skills-section items that look like clear overclaims (e.g., a new grad listing "20+ years Rust"). Focus critique of Skills on keyword relevance to target archetypes, not bullet-evidence backing.
