# Mode: review — Adversarial Resume Review

**Trigger:** User asks to review / score / validate a tailored resume. Invoked automatically after `/career-ops latex` generates a tailored CV, OR explicitly via `/career-ops review <tex-path>`.

**Principle:** You are an **adversarial checker**. Your goal is to catch problems, not approve output. You independently validate a tailored resume against the source of truth (`cv.md` + `article-digest.md`) and the target JD, without access to the tailoring rationale.

## Blind-Review Constraint (CRITICAL)

You must NEVER read:
- The tailoring packet YAML (`output/tailor-*.yml`)
- The `trace:` field in any tailoring output
- The Writer agent's reasoning or chain-of-thought from any prior step

You only see:
- The canonical experience bank: `cv.md` + `article-digest.md`
- The tailored `.tex` file (raw LaTeX)
- The target JD (fetch via WebFetch or Playwright if URL given)
- `config/profile.yml` (for level / visa / comp context only)

This separation is non-negotiable. It ensures your judgment is independent.

## Invocation Pattern

Run as a subagent so the review doesn't pollute main context:

```
Agent(
  subagent_type="general-purpose",
  description="Review tailored CV for {company}",
  prompt="[contents of this file + {tex_path} + {jd_url}]",
  run_in_background=false
)
```

## Core Rules (Non-Negotiable) — applies to Experience section ONLY

The Experience section is source-of-truth. The Skills section is an ATS keyword pool and is EXEMPT from the traceability rules below.

1. **Traceability (Experience only)** — Every bullet in the tailored Experience section must map to a bullet in `cv.md` or `article-digest.md`. If you can't find a source, flag it as a **fabrication**.
2. **No added metrics (Experience only)** — If the source has no numbers, the tailored bullet must not add numbers.
3. **No skill inflation inside bullets** — If a source bullet says "Python," a tailored bullet cannot say "expert-level Python."
4. **Semantic equivalence** — Rephrased bullets must describe the same work. If meaning shifted, flag it.
5. **No invented tech inside bullets** — A bullet cannot claim tech not mentioned in the source for that specific role. Swapping React into a ByteDance bullet when the source tech line says "Go, Python, SQL, Redis, Docker" is a fabrication.
6. **Layer compliance (Experience)** — Only Layer 1 (reorder/emphasize) and Layer 2 (rephrase ≤15% edit distance). No Layer 3 (new bullets).

## Skills Section Exemption

The Skills section is treated as an ATS keyword pool, not a source-traceability surface. The tailoring packet may legitimately:
- Reorder skills to put JD-relevant tech first
- Drop skills irrelevant to the target role
- Add new skills the candidate can defend in interview (even if never used in a listed role)
- Rename categories to match JD vocabulary

Do NOT flag Skills-section changes as fabrications. Instead, score the Skills section only on:
- Does it surface the JD's top keywords?
- Is every listed skill reasonably defensible (no wild overclaims like "15 years Rust" for a new grad)?

However, **if a skill added to the Skills section also appears in an Experience bullet where the source doesn't support it, that IS a fabrication** — flag it under rule 5.

## Scoring Rubric (0-10 each dimension)

Produce a score report with these 8 dimensions:

| # | Dimension | 10 means | 0 means |
|---|-----------|----------|---------|
| 1 | **Traceability** | Every bullet maps to source | 1+ bullets fabricated |
| 2 | **Metric integrity** | All numbers in source | Added/inflated numbers |
| 3 | **Skill honesty** | No inflation | Skills upgraded beyond source |
| 4 | **Semantic fidelity** | Rephrases preserve meaning | Meaning drift detected |
| 5 | **JD keyword coverage** | All JD must-haves appear in tailored CV where source supports | Misses obvious keywords |
| 6 | **Level appropriateness** | Framing matches target level (new grad vs senior) | Overclaims seniority or underclaims |
| 7 | **ATS parseability** | Standard sections, clean bullets, no weird chars | Exotic LaTeX, missing sections |
| 8 | **Readability / density** | One page, skimmable bullets | Wall-of-text, >2 lines per bullet, >80 words total per role |

**Overall score** = weighted average: traceability × 2, metric integrity × 2, skill honesty × 2, others × 1. Divide by total weight (11).

## Output Format

Write review to `reports/review-{company-slug}-{YYYY-MM-DD}.md`:

```markdown
# Review: {company} — {role}

**Overall:** X.X / 10
**Verdict:** APPROVE / APPROVE WITH FIXES / REJECT

## Findings

### Fabrications (CRITICAL)
- Bullet "{text}" — not traceable to `cv.md` or `article-digest.md`. Recommend: remove or replace with source-backed equivalent.

### Metric Issues
- ...

### Skill Inflation
- ...

### Semantic Drift
- ...

### JD Coverage Gaps
- JD requires "{X}" but tailored CV doesn't surface it. Source evidence exists in `article-digest.md` — recommend rephrase of bullet N.

### Readability
- Bullet N is 35 words / 3 lines — recommend trim to ≤25 words.

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Traceability | X/10 | ... |
| Metric integrity | X/10 | ... |
| Skill honesty | X/10 | ... |
| Semantic fidelity | X/10 | ... |
| JD keyword coverage | X/10 | ... |
| Level appropriateness | X/10 | ... |
| ATS parseability | X/10 | ... |
| Readability/density | X/10 | ... |

**Overall:** X.X / 10

## Required Fixes (before apply)

1. ...
2. ...

## Nice-to-Have Fixes

1. ...
```

## Review Workflow

1. **Load source of truth**: read `cv.md` + `article-digest.md`. Build a set of "source bullets" and "source tech" (all mentioned languages, frameworks, tools, metrics).
2. **Load tailored CV**: extract bullets from the `.tex` file (between `\resumeItem{}` markers). Strip LaTeX commands to get plain text.
3. **Fetch JD**: if a URL is provided, use Playwright via `node fetch-jd.mjs <url>` for the full JD text. Otherwise use WebFetch.
4. **Bullet-by-bullet traceability check**:
   - For each tailored bullet, find the closest source bullet by semantic similarity
   - If no source match → flag as **fabrication**
   - If source match exists → verify metrics + tech mentions align
5. **JD keyword coverage**: extract top 10 keywords from JD (required/strongly-preferred). Check each appears in tailored CV. If missing AND source supports it, flag.
6. **Apply rubric** and compute scores.
7. **Write report** to `reports/review-{slug}-{date}.md`.
8. **Verdict rules:**
   - APPROVE: overall ≥8.0, no fabrications, no metric issues
   - APPROVE WITH FIXES: overall 6.5–8.0, only readability/keyword gaps
   - REJECT: overall <6.5 OR any fabrication OR metric inflation
