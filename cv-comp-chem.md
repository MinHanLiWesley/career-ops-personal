# CV — Computational Chemistry / ML for Drug Discovery angle

> Working draft. Paste sections into your LaTeX template as needed.
> Positioning: ML researcher/engineer with formal chemical engineering training AND direct comp-chem research experience (RL + SchNet for molecular geometry optimization, hybrid ML for industrial chemical process simulation).
> Credible for: ML4Science / drug-discovery / cheminformatics / molecular-ML / industrial AI-for-chemistry roles. Now plausible (not just "high realism"): research-leaning industry positions and even some academic ML4Chem groups.

---

## Tailored Summary

ML researcher/engineer with formal chemical engineering training (B.S. ChemE, NTU) and direct computational-chemistry research experience: developed RL-based molecular geometry optimization with SchNet, reducing optimization steps 30–50% over BFGS/Newton baselines. Industrial track record building hybrid ML models for chemical process simulation (Formosa Plastics) and production AI systems at scale (ByteDance/TikTok). MS CS at Northeastern, graduating 04/2026. Looking to apply ML-first thinking to molecular property prediction, geometry/conformer search, generative chemistry, or AI-driven drug discovery.

---

## Education (reordered to lead with the chem credential)

**Northeastern University** — Boston, MA
*Master of Science in Computer Science, Minor in Digital Media*
09/2024 – 04/2026
Coursework: Building Scalable Distributed Systems, Cloud Computing, Object-Oriented Design, Software Development

**National Taiwan University** — Taipei, Taiwan
*Bachelor of Science, Double Major in Chemical Engineering and Computer Science*
09/2016 – 05/2022
Coursework: [FILL IN — e.g. Physical Chemistry, Thermodynamics, Reaction Engineering, Transport Phenomena, Statistical Mechanics, Numerical Methods, ML for ChemE]

> If your RL/SchNet research led to a thesis, paper, or workshop submission, surface it here as `Thesis: ...` or `Publication: ...`. Strong differentiator.

---

## Experience — comp-chem CV ordering (relevance-clustered, not strict reverse-chrono)

### Research Assistant — Computational Chemistry Lab, National Taiwan University
*Reinforcement Learning, SchNet, PyTorch, Self-Attention, Geometry Optimization* — Taipei, Taiwan
07/2021 – 05/2022

- Developed an RL-based molecular geometry optimizer that reduced optimization steps 30–50% versus classical BFGS and Newton methods, accelerating convergence on a range of molecular systems
- Formulated geometry optimization as a Markov Decision Process: molecular gradients and atomic displacements as state, reward shaped to penalize step count and reward energy minimization
- Integrated SchNet to embed chemical/structural information into the policy, enabling transfer across heterogeneous molecules rather than per-system retraining
- Designed coordinate-wise optimization with a self-attention mechanism over atoms to scale cleanly to molecules of varying size — addressing a known transferability gap in classical optimizers
- [FILL IN if applicable: published as / submitted to / led to / advisor: Prof. ___]

> This is your flagship role for any comp-chem application — lead with it. The combination of RL + SchNet + transferability story is exactly the language of recent ML4Chem literature (think NeurIPS AI4Science, ICLR ML4Materials).

### Machine Learning Engineer Intern — Formosa Plastics
*PyTorch, AutoML / Meta-Learning, Hybrid Physics-ML, OpenVINO, VBA* — Taipei, Taiwan
01/2022 – 06/2022

- Built a hybrid machine learning model coupling chemical-reactor simulation with learned components, enabling accurate modeling of larger-scale plant operations beyond what pure first-principles simulation handled
- Improved prediction accuracy from 90% to 95% by applying meta-learning via AutoML over the simulation surrogate
- Integrated the ML surrogate with downstream reactor models so simulation outputs could be refined and scaled across larger pipeline configurations
- Automated simulation-output processing pipelines, reducing analyst turnaround on each experimental run

> Reframe note: I dropped "VBA automation" from the headline framing — it's accurate but signals legacy tooling on a research-leaning CV. Keep the bullet, just don't lead with it. If you have a tighter description of *what kind* of hybrid model (physics-informed NN? Gaussian-process surrogate? PINN-style?) that would meaningfully strengthen this entry — currently reads a touch generic.

### Software Engineer Intern — ByteDance (TikTok)
*Go, Python, SQL, Redis, Docker, RAG, Multi-Agent Systems* — San Jose, CA
05/2025 – 11/2025

- Shipped AI-powered diagnostic system in Go serving 200+ internal users; reduced average resolution time 50% (7→3.5 days) by auto-aggregating structured data and retrieving relevant historical cases at query time
- Built RAG pipeline over a 30+/week incident corpus with LLM-based routing, automating 50% of recurring queries — same architecture transfers cleanly to retrieval over chemistry literature, reaction databases, or assay results
- Designed multi-agent diagnostic workflows from domain runbooks, reducing manual handoffs that previously involved 10+ specialists per case
- Built ingestion pipeline converting unstructured case notes into searchable summaries via LLM extraction, with Redis-backed caching for high-frequency lookups

> On a comp-chem CV this proves you can ship production ML at scale — you'd want it but not at the top.

### Research & Development Intern — Acer
*Python, OpenVINO, YOLOv7, FaceNet, Model Quantization, PyTorch, ONNX* — Taipei, Taiwan
07/2022 – 08/2022

- Optimized deep neural networks for resource-constrained inference: cut latency 50% via INT8 quantization and ONNX conversion — directly applicable to deploying ML potentials, GNN-based property predictors, or virtual screening models at scale
- Trained and fine-tuned PyTorch CV models under joint accuracy/latency objectives, achieving sub-300ms end-to-end inference

> Optional cut depending on space. If keeping, frame purely around the optimization/deployment angle.

### (Drop or condense for this CV)
- **ReMo** — vision/OCR pipeline; not chem-relevant. Cut unless space.
- **Yanray** — business card OCR; cut.

---

## Technical Skills (reorganized for chem-leaning audience)

**Machine Learning for Chemistry / Science:** SchNet, Graph Neural Networks, Reinforcement Learning, Meta-Learning / AutoML, Self-Attention; hybrid physics+ML modeling; molecular geometry optimization
**General ML / DL:** PyTorch, scikit-learn, XGBoost, TensorFlow, ONNX, OpenVINO; quantization, fine-tuning, RAG, multi-agent systems
**Programming:** Python, C++, Go, Java, JavaScript/TypeScript, Scala
**Scientific Computing:** [FILL IN ONLY WHAT YOU ACTUALLY USED — NumPy, SciPy, pandas, Jupyter; if any RDKit / OpenMM / ASE / PyTorch Geometric / DeepChem, list. If your SchNet work used the SchNetPack library specifically, list that.]
**Data & Compute:** PostgreSQL, MySQL, Redis, MongoDB, Spark, AWS, GCP, Azure, Docker, Kubernetes
**Chemical Engineering Background:** [FILL IN — e.g. process simulation, reaction kinetics, thermodynamics, transport phenomena]

> Your SchNet work alone justifies "Graph Neural Networks" as a top-line skill. Your Formosa Plastics work justifies "hybrid physics+ML modeling." Don't be modest — these are real and recruiters in this space know what they mean.

---

## Updated target-role realism

| Role type | Realism | Why |
|---|---|---|
| ML Engineer at AI-for-drug-discovery startup (Iambic, Iktos, Atomwise, Recursion, Genesis Therapeutics, Insilico, Valence Labs) | **Very high** | RL+SchNet research + ChemE foundation + production ML eng is exactly the senior-IC profile, you'd come in at new-grad/junior level |
| ML / Cheminformatics Engineer at established pharma (Schrödinger, Merck, Pfizer, Roche, Novartis) | **High** | Schrödinger especially — they hire heavily for ML on physics-based simulation, your hybrid ML at Formosa Plastics maps directly |
| Research Engineer at AI4Science labs (Isomorphic Labs, Microsoft AI4Science, DeepMind Chemistry, Meta FAIR Chemistry) | **Medium** | Bar is high but your RL/SchNet work is legitimately research-flavored. A clear writeup or pre-print helps a lot |
| Computational Chemist (DFT, MD, QM specialist) | Low | Your chem ML is from the geometry-opt / surrogate angle, not QM/DFT method development. Not a fit unless the role is "ML on top of MD" |
| AI Research Scientist (PhD-track) | Low | No PhD; some of these roles strictly require it. ML4Chem industry research is a better target. |

---

## Honest notes (for you, not the CV)

What you have is genuinely strong for this market — far stronger than I assumed before seeing these two roles. The RL + SchNet + transferability story is publishable-quality framing. Treat the comp-chem track as a real primary option, not a stretch.

Things worth doing before applying:
1. **Surface the RL/SchNet work publicly.** A blog post, a GitHub repo with the code (if you can release it), or even a 2-page write-up linkable from the CV would 5× the credibility of those bullets. Recruiters in this space deeply trust artifacts they can read.
2. **Confirm what kind of "hybrid model" Formosa Plastics was.** "Hybrid physics+ML" is a known and respected paradigm — if it was specifically a physics-informed neural net, a Gaussian process surrogate, or a learned residual on top of a first-principles simulator, name it. Generic framing undersells real work here.
3. **Coursework section.** Fill in the actual ChemE courses you took at NTU. Phys Chem and Stat Mech especially are flags recruiters look for.
4. **Decide on cv.md treatment.** Currently your canonical `cv.md` doesn't include either of these roles. For SWE applications that's fine. For comp-chem you'll want them — `cv-comp-chem.md` (this file) keeps them separate so the SWE track stays focused.

When you have a target JD in this space, paste it and I'll generate per-application tailoring against this version.
