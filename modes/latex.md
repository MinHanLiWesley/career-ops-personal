# Mode: LaTeX CV Generation

**Trigger:** User asks for a LaTeX CV / tailored `.tex` / "generate resume in LaTeX" / `/career-ops latex`.

**Rule:** This mode REPLACES the HTML `pdf` mode for users whose `config/profile.yml` has `resume.preferred_format: "LaTeX"`. When active, do NOT call `generate-pdf.mjs` or `templates/cv-template.html`.

## Inputs

1. `config/profile.yml` — identity (name, email, phone, linkedin, github, location)
2. `cv.md` — canonical education / experience / skills in markdown
3. (Optional) a tailoring packet YAML the user provides per JD (see shape below)

## Tailoring Packet Shape

When tailoring per JD, produce this YAML first (in conversation or as a file), then render:

```yaml
summary: "Optional one-line summary override"
bullets:
  "ByteDance":           # match = substring of company name (case-insensitive)
    - "tailored bullet 1"
    - "tailored bullet 2"
  "ReMo":
    - "..."

# Skills section override (optional). If present, REPLACES cv.md skills entirely.
# Skills section is an ATS keyword pool, NOT subject to experience-source-of-truth rules.
# Reorder, reword, drop, or add tech here to maximize JD keyword hits — as long as the
# candidate can reasonably defend it. NEVER change tech mentioned in experience bullets.
skills:
  - label: "Languages"
    value: "Go, TypeScript, Python, Java, C++"
  - label: "Backend"
    value: "gRPC, REST, PostgreSQL, Redis, Docker, Kubernetes"
  - label: "AI / ML"
    value: "RAG, multi-agent systems, LLM routing, PyTorch, TensorFlow"
  - label: "Cloud"
    value: "AWS, GCP, Azure"
  # 6+ rows → last 2 auto-merge onto one line with \hspace{5pt}

keywords: ["Go", "RAG", "distributed systems"]   # for inclusion report (trace field)

projects:                 # optional — include only when JD asks for projects
  - name: "Book Spine Recognition Pipeline"
    tech: "Python, YOLOv11, FastAPI"
    date: "2024"
    bullets:
      - "..."

trace:                    # short "what changed and why" — surface to the user
  - "Swapped bullet 3 at ByteDance to lead with RAG metric (JD emphasizes retrieval)"
  - "Skills — led with Go / TypeScript / React (JD primary stack), cut Java/Scala/Ruby/Swift (no defense surface for this role)"
```

## Workflow

1. Read JD (URL or pasted text) → extract required skills, stack, keywords.
2. Apply the hard rules from `_shared.md` and user's archetypes in `_profile.md` (for Wesley: H1B, new grad framing, ByteDance as hero).
3. Produce the tailoring packet YAML. Show the user the packet inline before rendering so they can review the bullets.
4. Save packet to `output/tailor-{company-slug}-{date}.yml`.
5. Render + compile: `node generate-latex.mjs --tailored output/tailor-{slug}-{date}.yml --out output/cv-{slug}-{date}.tex`
   - Auto-compiles to `.pdf` via local `pdflatex` (TeX Live / MacTeX / MiKTeX / TinyTeX). Aux files (`.aux`, `.log`, `.out`) are cleaned up.
   - Pass `--no-compile` to produce only the `.tex`.
6. Tell the user:
   - Path to the generated `.pdf` (primary deliverable)
   - Path to the `.tex` if they want to edit
   - Short "what changed" trace

## Tailoring Rules (HARD)

Mirror the sibling `/job/` repo's `tailoring_rules` — but ONLY for the **Experience section**. The Skills section is treated differently (see below).

### Experience bullets (strict)
- **Allowed layers:** 1 (reorder/emphasize existing bullets) and 2 (rephrase ≤ 15% edit distance). **NO layer 3** (no new experience invented).
- **Forbidden:** fabricate metrics, inflate skills language inside bullets, add unrelated experience, invent technologies in bullets.
- Every tech mentioned in a bullet MUST appear in the source `cv.md` / `article-digest.md` for that role.

### Skills section (relaxed — ATS surface)
- Skills section is an ATS keyword pool. Reorder, reword, drop, or add tech to maximize JD hits.
- **Rule:** only include tech the candidate can reasonably defend in interview. Don't list Scala if they've never written Scala.
- **Rule:** never swap tech INTO an experience bullet just because you added it to Skills. Experience stays factual.
- The reviewer's traceability check only applies to Experience, not Skills.

Every tailoring packet must include a `trace:` list explaining both bullet changes and skills changes.

## User-Agnostic Design

The template and render script work for any user, not just Wesley:

- `templates/cv-template.tex` uses only `{{PLACEHOLDER}}` tokens — no hardcoded names, metrics, or companies.
- `generate-latex.mjs` reads everything from `config/profile.yml` and `cv.md`.
- Projects section is optional (auto-skipped when tailoring packet has no `projects:` key).
- GitHub line is commented out in the template header — users uncomment it if they want it displayed.

Any user who (a) fills `config/profile.yml`, (b) writes a standard `cv.md` with `## Education`, `## Experience`, `## Technical Skills` sections, and (c) optionally provides a tailoring packet per JD gets a valid `.tex` file.
