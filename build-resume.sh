#!/usr/bin/env bash
# Build a tailored resume folder under output/.
# Compiles cv.tex, names the sendable PDF, cleans build artifacts, and
# (re)renders PNG previews used for visual/widow checks.
#
# Layout produced:
#   output/<slug>/
#     cv.tex                          <- LaTeX source (edit this)
#     Min-Han_Li_Resume_<slug>.pdf    <- sendable PDF (attach this)
#     previews/page-N.png             <- per-page renders (gitignored via output/*)
#
# Usage: ./build-resume.sh output/<slug>
set -euo pipefail
dir="${1:?usage: build-resume.sh output/<slug>}"
dir="${dir%/}"
slug="$(basename "$dir")"
[ -f "$dir/cv.tex" ] || { echo "error: no cv.tex in $dir" >&2; exit 1; }

( cd "$dir"
  pdflatex -interaction=nonstopmode cv.tex >/dev/null
  pdflatex -interaction=nonstopmode cv.tex >/dev/null   # second pass resolves refs
  mv -f cv.pdf "Min-Han_Li_Resume_${slug}.pdf"
  rm -f cv.aux cv.log cv.out
  mkdir -p previews
  rm -f previews/page-*.png
  pdftoppm -png -r 200 "Min-Han_Li_Resume_${slug}.pdf" previews/page
)
echo "built ${slug} -> ${dir}/Min-Han_Li_Resume_${slug}.pdf  (+ previews/)"
