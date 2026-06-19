---
name: Wesley tailors resume in LaTeX manually
description: Override for career-ops PDF mode — do not generate HTML-template PDFs; output markdown bullets he can paste into his LaTeX template
type: feedback
originSessionId: 1855b8f2-1a5f-4aa1-97e8-0967476bee03
---
Wesley maintains his resume in LaTeX and does the tailoring by hand. He does not want career-ops' HTML→PDF pipeline (`/career-ops pdf`, templates/cv-template.html, generate-pdf.mjs).

**Why:** He's comfortable with LaTeX, cares about visual control, and his current resume (`Min-Han_Li_Resume_TikTok.pdf`) is already LaTeX-rendered — replacing it with an HTML template would be a downgrade.

**How to apply:**
- When a JD comes in and the pipeline would normally call `/career-ops pdf`, instead produce a **markdown tailoring packet**: (1) tailored summary line, (2) reordered/rephrased bullets grouped by role, (3) ATS keywords injected, (4) short "what changed and why" trace. He pastes the bullets into his LaTeX template.
- Tailoring rules are the same as his sibling `/job/` repo's `tailoring_rules` (Layers 1-2 only, no fabricated metrics, no invented tech).
- Skip any step that generates HTML/CSS/fonts resume output. Skip Canva too unless he asks.
- In the tracker PDF column, use ❌ by default (he'll render his own) unless he specifically asks for the HTML PDF.
- **Local compile only — NOT Overleaf.** pdflatex is installed at `/usr/local/bin/pdflatex` (TinyTeX / TeX Live 2024). `generate-latex.mjs` auto-compiles `.tex` → `.pdf` by default. No Overleaf suggestion in output.
