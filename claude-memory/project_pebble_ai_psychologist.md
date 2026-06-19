---
name: pebble-ai-psychologist-startup-user-s-flagship-agentic-project
description: "User is building Pebble, a CBT mental-health support agent (startup, company asset). Sophisticated skill-as-node architecture with multi-layer safety, 95 tests, evals, audit logging. Strongest portfolio piece for AI/agent/LLM roles. Repo private. Local at ~/Desktop/AI Psycologist."
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ba7e0d3-842d-4cca-8ecf-c5edbd64c3c2
---

**What it is:** Pebble, a CBT (cognitive behavioral therapy) mental-health support chat agent. **Ownership (corrected 2026-05): this is a FRIEND's startup, not the user's company.** The user is the software/engineering contributor — he owns the agent's software architecture, not the business. On resumes/letters, frame as "a friend's CBT mental-health startup where I handle the agent's software," NOT "my startup" or "I founded." It is a company asset, so treat as proprietary; describe architecture, not internals, externally. Local repo: `/Users/liminhan/Desktop/AI Psycologist` (folder `ai_psych/`). GitHub repo is PRIVATE — do not put a link on resumes.

**Why it matters:** This is the user's single strongest asset for AI / agent-behavior / LLM-engineering roles (e.g. Luma AI Agent Behavior Designer). It demonstrates prompt-stack design, safety/guardrail engineering, evals, and agent debugging — the exact responsibilities those JDs list. Feature it prominently.

**Verified architecture (read from the repo 2026-05):**
- **LLM backend:** DeepSeek, wired via an LLM-agnostic `BaseLLM` adapter; `FakeLLM` stub used in tests (no API spend). Real adapter slots in without skill changes.
- **Skill-as-node design** after Rollwage et al. 2026, *Nature Medicine* ("A cognitive layer architecture to support LLM performance in psychotherapy"). Every orchestrator node is a Skill = a folder with `SPEC.md` (written contract: inputs, outputs, MUSTs/MUST NOTs), `skill.py` (impl), `evaluator.py` (post-hoc check). This is the literal "prose functions as code" the Luma JD wants.
- **Multi-layer safety stack:** input safety (high-recall risk detection at 0.2 threshold, sensitive-topics multi-label, jailbreak detection), an unbypassable hard-coded crisis protocol (no LLM, no config flag), and an output guard that drives a regenerate-on-violation loop (max 2 iters) failing closed to a fixed refusal. Design principle: defense-in-depth, not a single filter.
- **CBT clinical chain:** 6 stages (agenda → info-gathering → formulation → selection → delivery → wrap-up). Clinical decisions are DETERMINISTIC (intervention-selection decision tree in pure Python, never an LLM); the chosen intervention name is copied into the prompt, not generated.
- **Prompt assembly:** stage base prompt + safety injections + reasoning injections + intervention tag.
- **Persistent memory** across multi-turn sessions (`SessionState`).
- **Audit:** JSONL log of every skill invocation (single chokepoint `Orchestrator._run_skill`).
- **Tests:** 95 pytest tests, all green; per-skill evaluators run on every commit.

**Evaluation status:** Engineering evals are DONE (95 tests + per-skill evaluators). Clinical/outcome eval is IN PROGRESS — user is trying to reach out to a psychology lab in Beijing for collaboration, likely an informal arrangement first. Goal: confirm it doesn't produce harmful responses and genuinely supports users with anxiety/mental-health issues. Good cover-letter material; keep off the resume bullets until real.

**Honesty guardrails:**
- Don't claim a public GitHub link (repo is private/company asset).
- Don't claim clinical validation/efficacy yet — that's the pending Beijing lab work.
- The architecture replicates a published paper's design; frame as "after Rollwage et al. 2026," not as the user's novel research.

**On resumes:** Titled **"Pebble | AI Psychologist startup"** on the Luma CV (`output/cv-min-han-li-luma.tex`), 3 bullets: (1) skill-as-node architecture + SPEC contracts, (2) multi-layer safety stack, (3) prompt stacks + 95 tests + audit logging. See [[project_cc_lab_paper]] for the related RL work also on that CV.
