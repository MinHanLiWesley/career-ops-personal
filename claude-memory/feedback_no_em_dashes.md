---
name: Never use em-dashes — reads as AI-generated
description: User strongly dislikes em-dashes (—, —, originSessionId: 8f0ae64f-489d-47d6-b5eb-3b2a7c675121
---
) in any written output. Says em-dashes "look so AI". Applies to resume bullets, prose, all written content. Use commas, colons, semicolons, or sentence breaks instead.
type: feedback
---

User strongly dislikes em-dashes (—, —, ---) in any written content. Quote: "avoid using — , this symbol is so AI, mark it in memory".

**Why:** Em-dashes have become a stereotypical signal of AI-generated text (ChatGPT, Claude, etc. tend to over-use them). User wants their resume / writing to NOT look AI-generated.

**How to apply:**
- In LaTeX: never use `---` (em-dash) or `--` (en-dash for ranges is OK, e.g. "30-50%")
- In prose / chat / any text I generate: never use em-dashes
- Replacements depending on context:
  - Parenthetical interruption → use commas: "Built X, including Y, for Z"
  - List intro → use colon: "Built X: Y, Z, and W"
  - Strong break → use period and new sentence
  - Range (date, number) → use en-dash `--` or just hyphen `-`

**Other related preferences (related typography concerns):**
- No parens `( )` in resume bullets (separately stated earlier)
- No tildes `~` in bullets

**Quick check before saving any prose or bullet content:** grep for `—`, `--` (in non-date context), `---`. If present, rewrite.
