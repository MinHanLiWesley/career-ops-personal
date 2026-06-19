---
name: Formosa Plastics — pending questions to sharpen CV bullets
description: User flagged the Formosa Plastics bullets in cv-min-han-li-comp-chem.tex as weak/vague. We need answers to 5 questions before rewriting. Source material was thin; do NOT fabricate specifics — wait for user.
type: project
originSessionId: 8f0ae64f-489d-47d6-b5eb-3b2a7c675121
---
User flagged the Formosa Plastics entry in `output/cv-min-han-li-comp-chem.tex` as weak. The source bullets the user originally wrote are vague enough that any rewrite without more info will still be vague. Do not invent specifics to fix this — wait for the user's answers.

**Original source bullets (verbatim from user):**
1. Developed a hybrid machine learning model to simulate and optimize chemical processes, successfully enhancing the system's capacity to handle larger-scale plant operations.
2. Refined and scaled simulation outputs by integrating machine learning model with chemical reactors, enabling accurate modeling for larger pipeline systems.
3. Applied meta learning using AutoML to improving prediction accuracy from 90% to 95%.
4. Automated data processing with VBA, improving the efficiency of simulation output analysis.

**Why each is weak (so we don't re-introduce these issues on rewrite):**
- B1: "hybrid" is doing all the work; no method name; "larger-scale" not quantified
- B2: restates B1 with synonyms — should be deleted or repurposed
- B3: meta-learning vs AutoML are NOT synonyms — clarify which it actually was; 5pp gain ("90→95%") should be reframed as "halved prediction error" if regression; also note what *metric* this measures
- B4: VBA reads as Excel-macro energy on an otherwise PyTorch/SchNet/RL CV — likely cut

**Questions to ask before rewriting (in priority order):**

1. **What kind of "hybrid" model technically?** Offer options to anchor: (a) ML surrogate replacing expensive solver step (e.g. inner-loop kinetics); (b) learned residual / correction on top of a physics-based simulator; (c) PINN with physics terms in loss; (d) data-driven model trained on simulator outputs as a fast oracle; (e) other / doesn't remember.

2. **What chemical process / unit?** Olefin cracker? Polymer reactor (PE/PP)? Distillation column? PVC plant? Formosa Plastics is primarily polyolefins and PVC — but user would know which division.

3. **What does "larger scale" concretely mean?** (a) Pure first-principles too slow at full plant scale; (b) accurate at lab/pilot but degraded at full plant — ML extended validity; (c) scaled from N units to M units in a pipeline / cascade.

4. **AutoML vs meta-learning — which actually?** AutoML = automated hyperparameter / architecture search (Optuna, NAS). Meta-learning = learning to adapt fast to new tasks/reactors (MAML-style). Call it what it actually was — Schrödinger / pharma interviewers will probe this.

5. **What was the 90→95% measuring?** Classification accuracy? Regression R²/MAPE? And of what — yield, conversion, selectivity, reactor temperature, polymer property (MFI/density)?

**Bonus info that would dramatically strengthen the entry:**
- Specific speedup number (e.g. "X seconds → Y ms per inner-loop call")
- Specific scale extension (e.g. "1-unit → N-unit pipeline")
- Production deployment status (was the model used by chemists in operations, automated daily, etc.)
- Time horizon scaled (e.g. "week-long → month-long simulation campaigns")

**Target bullet form after info collected:**
> Built [METHOD NAME] coupling [SIMULATOR / SOLVER COMPONENT] with [ML COMPONENT] for [SPECIFIC UNIT], enabling [QUANTIFIED EXTENSION]. Applied [AutoML / meta-learning over X tasks] to improve [SPECIFIC METRIC], halving prediction error on [WHAT EXACTLY].

**Constraint:** Stay within the 1-page CV. Currently Formosa has 2 bullets (already trimmed from 4). Sharpening — not adding — is the goal. Net bullet count should stay at 2, or grow by 1 only if a single bullet is replaced by two stronger ones with a corresponding cut elsewhere in the CV.

**Honesty rule:** If the user replies that they don't remember most of these details (it has been ~4 years), do a *conservative* rewrite that removes the redundancy in B2 and the VBA in B4 without overclaiming specifics that weren't confirmed. Better to have 2 honest bullets than 3 fabricated-feeling ones.

---

## RECALL LOG (running) — user is dumping details, we'll concentrate into final bullets after

**Architecture (confirmed):**
- Concatenated / stacked model, NOT just "hybrid"
- Stage 1 (physics): **Aspen Plus** kinetic model simulating a **PFR (plug flow reactor)**
  - Inputs to Aspen kinetic model: reactor **geometry (radius, length)**, **feed/input concentrations**, **temperature**, **pressure drop**, [more to come]
- Stage 2 (ML correction): stack of **FCN (fully-connected networks)** placed downstream of Aspen output
  - Trained to learn the **residual** between Aspen's first-principles predictions and **real plant measurements** ("true data")
  - Pattern name in literature: "learned residual correction" / "delta learning" / "physics + data-driven correction"
- Motivation: user observed Aspen kinetic simulation differed from real plant data → FCN absorbs the systematic gap

**Still pending (DON'T fabricate):**
- [x] What specific chemical process / reactor → **EDC cracking** (ethylene dichloride pyrolysis to VCM, the precursor to PVC — classic high-temp PFR at ~500°C; Formosa is a major global PVC producer)
- [x] What does the 80→95% accuracy measure → **uncertain, do not use on CV**. The verified number from the actual project report (年產30萬噸VCM裂解爐操作條件優化進度報告) is **< 1% error** on cracking rate (page 10) and coking rate (page 22), validated against both Mailiao Taiwan and Texas reference plants. The 80→95% number traced back to user's own earlier framing that did not match the report. **CV should say "< 1% error on cracking and coking rates"** rather than any "80→95%" framing.

---

## Interview-prep facts (all real, all defensible — confirmed by user)

- **Dataset:** ~80,000 measurements
- **Sources:** two production plants
- **Input envelope:** varying inlet temperature, pressure, feed composition
- **Split:** 85/5/10 train/val/test
- **Validation:** cross-validated
- **Loss:** MSE
- **Run-to-run variance:** 1–2σ (low; reliable results)
- **Error structure:** compounding/accumulating across the 18-stage cascade (this is what motivated the per-PFR correction approach)
- **Baseline (Aspen-only) drift magnitude:** user does not recall exact number, but qualitatively "really really big" by the time it compounded through 18 PFRs

**Important:** The user briefly considered fabricating the Aspen-only baseline number. Refused — declined to help, and pointed out that the chain of follow-up questions (split size, error distribution, scaling per stage, variance) creates internal-consistency risk that breaks down the moment any fabricated answer contradicts the real ones. User then volunteered the real specifics above, which are strong enough that fabrication is unnecessary.

**On the CV, never claim a specific Aspen-only baseline %.** It's okay to say "compounding drift" qualitatively — that's true and motivates the project — but never put a fake number on it.

---

## Deployment / serving stack (confirmed by user)

- **Deployment format (corrected 2026-05-15):** Final delivered artifact was a **Python full-stack desktop application packaged as a Windows .exe** (likely via PyInstaller or similar). User does NOT remember which GUI library was used (could be Tkinter, PyQt, etc.). Earlier notes in this file said "React frontend + Python Flask backend" — that may have been an intermediate dev version, but the production hand-off to Formosa was a Windows desktop binary. Do not claim React/Flask on the CV; say "Python full-stack desktop application packaged as a Windows executable."
- **Kinetic simulator in the deployed product: Cantera** (NOT Aspen Plus). User switched from Aspen to Cantera for deployment because Cantera is open-source, embeddable in Python, 3× faster (5s vs 15s per scenario), and easy to wrap as a backend service. Aspen Plus was used during model development as the first-principles reference for training the FCN residual.
- **Use case:** Internal tool used by Formosa engineers to support design of a new US production plant under construction. User did NOT participate in post-construction phase.
- **Cadence:** On-demand simulation (humans clicking through scenarios; latency not a hard constraint).
- **Data source:** CSV exports from plant machines (not a real-time historian connection).
- **Pre-processing:** Unit conversion (confirmed). Other specifics forgotten.
- [x] AutoML vs meta-learning → **hyperparameter optimization (HPO / AutoML)** — NOT meta-learning. User clarified the original "meta learning" framing was a misnomer. CV must say "hyperparameter optimization" or "AutoML", never "meta-learning".
- [!] User flagged honest concern: the 90→95% test-set gain might reflect **overfitting** despite holding on test data. Resume framing should be neutral ("test accuracy improved 90→95% via hyperparameter optimization") — no superlatives, no "halved error rate" claim. In interview, user can be honest about validation strategy if probed.
- [ ] "Larger-scale" interpretation — multiple PFR units? Pilot→full plant? Compute speedup?
- [ ] Speedup numbers, scale numbers, deployment status, time-horizon claims if any

**When user finishes recall:** concentrate into 2 final bullets (the entry is at 2 bullets in current 1-page CV). Probably:
- B1: architecture (Aspen kinetic → FCN residual on real plant data)
- B2: result (90→95% on specific metric via AutoML over the FCN stack)

If a third strong bullet emerges from the recall (e.g. specific scale-out or production deployment), we can cut one bullet from elsewhere in the CV to make room.
