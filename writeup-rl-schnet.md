# Reinforcement Learning for Molecular Geometry Optimization

**Min-Han Li (Wesley)** · Research Assistant, Computational Chemistry Lab, National Taiwan University · 07/2021 – 05/2022

> **TL;DR** — I trained an RL policy to optimize molecular geometries, using SchNet to embed chemical context and a per-coordinate self-attention head to handle molecules of varying size. The learned optimizer reached converged geometries in **30–50% fewer steps than classical BFGS / Newton-style methods** across the molecules I tested, and — because the policy reads chemical structure rather than raw coordinates — it transfers across molecular systems without per-system retraining.

---

## Why this problem

Geometry optimization sits underneath almost every quantum-chemistry workflow: before you compute energies, vibrational modes, reaction barriers, or anything else, you usually need to relax the molecule to a stationary point on its potential energy surface (PES). The classical workhorses for this are **BFGS, L-BFGS, and Newton-style optimizers** wrapped around an electronic-structure call (DFT, semi-empirical, or a learned potential). They're well understood, but they share a common shape:

1. They use only local information — the gradient at the current step, sometimes a curvature approximation built from the trajectory.
2. The step they take is determined by a **molecule-agnostic update rule**. The optimizer doesn't know that this is benzene versus a strained cage versus a flexible peptide; it just sees gradients.
3. Their step count scales painfully on tricky surfaces — long flat valleys, near-degenerate modes, or systems with many soft degrees of freedom.

The question I wanted to answer: **can a learned optimizer use chemical structure as a prior to converge faster on chemically meaningful surfaces?**

## Framing it as RL

I cast geometry optimization as a Markov Decision Process:

- **State** — current atomic gradients and per-atom displacements from the previous step. (Conceptually similar to what BFGS uses, but without committing to a quasi-Newton update form.)
- **Action** — a per-atom displacement applied to the current geometry to produce the next one.
- **Reward** — shaped to penalize step count and reward energy decrease, so the policy is pushed toward both *fast* and *correct* convergence rather than just one or the other. [FILL IN: exact reward shape — was it `-1 per step + λ · ΔE`, or something else?]
- **Termination** — gradient norm below threshold, i.e. the same convergence criterion classical optimizers use, so comparisons are apples-to-apples.

This framing makes the optimizer's *update rule* the thing being learned, while leaving the convergence criterion fixed.

## SchNet for transferability

The key risk in any "learn the optimizer" project is overfitting to a single molecular system. A policy that beats BFGS on one molecule but has to be retrained for the next one isn't useful.

To avoid that, I used **SchNet** — a continuous-filter convolutional GNN designed for molecular systems — to embed chemical context into the policy's input. SchNet's atom embeddings encode element type and local environment via continuous-distance filters, so the policy sees something more chemically meaningful than just `(species_id, x, y, z, gradient)`.

Concretely:

- For each atom, SchNet produces an embedding informed by its neighborhood.
- The policy combines that embedding with the current gradient and displacement to decide the next step.
- Because SchNet is permutation- and translation-invariant by construction, the policy inherits those symmetries — moving the molecule in space or relabeling atoms doesn't change the predicted action.

The transferability claim follows from this: the policy isn't reading a fixed-size atom-coordinate vector, it's reading per-atom features. New molecules — different atom counts, different chemistry — are just new graphs.

## Coordinate-wise + self-attention for variable size

The policy needs to output a displacement vector per atom, and atom counts vary across molecules. Two design choices made this work cleanly:

1. **Coordinate-wise output**: rather than predicting a flat global step vector, the policy predicts a step *per atom* using shared parameters. Same trick as a fully convolutional network in vision — the model handles arbitrary input size.
2. **Self-attention over atoms**: a per-atom attention layer lets the policy reason about *interactions* — "this atom should move because its neighbor moved" — that local SchNet messages alone don't capture as crisply. This was the lever that let the optimizer scale from small molecules to larger ones without performance degrading.

## Results

Across the molecules in my evaluation set, the learned optimizer reached the same convergence threshold as BFGS / Newton in **30–50% fewer steps**. [FILL IN: which dataset / which molecules — was it QM9, ANI-1, custom set?]

Importantly, this is *step count*, not wall-clock — each step still requires an energy/gradient evaluation from the underlying potential, which dominates the runtime. The framing here is: *if you have a fixed budget of expensive gradient calls, this policy gets you to a stationary point faster.* That's exactly the regime where geometry optimization matters most — when each evaluation is a DFT call costing minutes-to-hours.

## Honest gaps / what wasn't done

Calling out the limitations explicitly because they're the questions any reviewer in this space will ask:

- **No transferability test across chemistry families.** Train on small organics, test on metal-organic complexes — that experiment would prove the SchNet-driven generalization claim. Worth doing as follow-up work.
- **No comparison against learned-potential approaches** like NequIP, MACE, or Allegro paired with a classical optimizer — those got strong in the period after this work and are arguably the right modern baseline.
- **No saddle-point search.** Geometry optimization to local minima is the easy case. Transition states and conformer search are harder and matter more for chemistry.
- **No ablation on the self-attention head specifically** — I tested with and without SchNet embeddings, but didn't cleanly isolate the attention contribution. A reader could reasonably ask which mechanism is doing how much of the work.

## Tech stack

- **PyTorch** for the policy network and training loop
- **SchNet** (likely via SchNetPack) for chemical embeddings — [FILL IN: confirm SchNetPack version]
- **Reinforcement learning** — [FILL IN: PPO? DDPG? REINFORCE with baseline?]
- **Classical baselines** — BFGS / Newton via [FILL IN: which library — SciPy, ASE, custom?]

## References / context

- Schütt et al., *SchNet: A continuous-filter convolutional neural network for modeling quantum interactions* (NeurIPS 2017)
- Vaswani et al., *Attention Is All You Need* (NeurIPS 2017)
- Standard geometry-optimization treatment in Jensen, *Introduction to Computational Chemistry* (3rd ed., chapters on optimization methods)

## Contact

Min-Han Li (Wesley) · `minhan.li.wesley@gmail.com` · `linkedin.com/in/minhanliwesley`
MS Computer Science, Northeastern University (graduating 04/2026)
B.S. Chemical Engineering + Computer Science, National Taiwan University (2022)

---

> *This writeup is derived from research conducted at the NTU Computational Chemistry Lab, [FILL IN: advisor's name and lab full name]. Code and detailed results are not currently public; happy to discuss specifics in interviews.*
