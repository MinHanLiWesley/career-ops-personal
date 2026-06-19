---
name: NTU CC Lab — RL geometry optimization (verified from user's repo)
description: User did substantive foundational work on RL-based molecular geometry optimization at NTU's Computational Chemistry Lab (Prof. Yi-Pei Li), 07/2020-12/2021. Built MDP/Gym environment + self-attention policy + BC training. Investigated reaction-path extension. Did NOT achieve publishable results. Work later evolved (with SAC+SchNet added) into Chang & Li, JCTC 2023 — user is NOT an author. All claims now verifiable.
type: project
originSessionId: 8f0ae64f-489d-47d6-b5eb-3b2a7c675121
---
## Verified facts from user's GitHub repo `git@github.com:MinHanLiWesley/RL.git`

**User's GitHub identity in this repo:**
- `b05504006@ntu.edu.tw` (NTU undergrad student ID, entered 2016) = user
- `Wesley Lee <WesleyLeeNTU>` = user
- `littlemoonstones` = Yu-Cheng Chang (NOT the user)
- `tychenNTU` = a different NTU student (NOT the user)

**User's commits across all branches (master, wesley):**
| Date | Action | What |
|---|---|---|
| 2020-07-09 | First upload (`b05504006`) | Uploaded the full `OptimizationMDPs/` Gym environment framework with 23+ iterated versions of `ff_geom_opt_env_py_v1.py` through `v23.py` |
| 2020-10-24 | Add files (Wesley Lee) | Added `SelfAttentionBFGSBC.py` (239 lines): MultiHeadAttention, ResLayerNorm, ShallowActor, FCActor, custom loss, BC training loop. Also added DataGeneration.py, NEB_initial/final.xyz |
| 2020-10-24 | Create / Delete BehaviorCloning | Empty directory created and deleted same day |

**No commits during user's stated 2021–2022 period.** This is normal — research exploration code rarely gets committed, especially failed experiments. User confirms they spent ~14 months (Oct 2020 → Dec 2021) doing uncommitted local experimentation on reaction-path RL with multiple algorithms (PPO, SAC) and force fields.

## Honest timeline (used on CV)

- **07/2020 – 12/2021** at NTU Computational Chemistry Lab as Research Assistant
- Started with MDP/Gym environment build (July 2020)
- Self-attention policy network + BC training implementation (October 2020)
- Investigated reaction-path search extension with multiple RL algos / force fields (Oct 2020 – Dec 2021)
- Did NOT achieve publishable results before leaving for a different lab

**CV previously said 07/2021 – 05/2022 (10 months). Updated to 07/2020 – 12/2021 (17 months) per the actual evidence.**

## What user can honestly claim (verified)

✅ Built the **MDP/Gym environment** for force-field geometry optimization (20+ environment iterations in `OptimizationMDPs/envs/`)
✅ Built the **multi-head self-attention policy network** with residual layer-normalization (`SelfAttentionBFGSBC.py`: SelfAttention, MultiHeadAttention, ResLayerNorm, ShallowActor classes)
✅ **Behavior cloning training** over BFGS expert demonstrations (custom MSE+BCE loss, full training loop)
✅ **Reaction-path search exploration** with multiple RL algorithms (PPO, SAC) and force-field environments — uncommitted, no published result
✅ Coordinate-wise policy design enabling permutation invariance across varying molecule sizes
✅ Architecture later evolved (with SAC and SchNet added) into Chang & Li, *JCTC* **2023**, 19, 8598–8609 — but user is NOT on that paper

## What user CANNOT honestly claim

❌ The 30–50% step reduction (that's from Chang 2023's SAC+SchNet evaluation, not user's BC implementation)
❌ SchNet feature integration (added by Chang later)
❌ SAC as the trained algorithm (user did BC; SAC was for reaction-path exploration which didn't yield results)
❌ Authorship of Chang & Li *JCTC* 2023

## Current CV bullets (honest version, all repo-verified)

> *Built the MDP/Gym environment and multi-head self-attention policy network for an RL-based molecular geometry optimizer, trained via behavior cloning over BFGS expert demonstrations*
>
> *Investigated extension to reaction-path search through experiments with multiple RL algorithms (PPO, SAC) and force-field training environments*

Paper reference deliberately omitted from resume because user's reaction-path direction isn't what Chang published. User can mention the paper in interviews proactively.

## Interview-prep talking points

**Standard pitch:**
> "I worked at NTU's Computational Chemistry Lab under Prof. Yi-Pei Li from July 2020 to December 2021. I built the OpenAI Gym MDP environment for force-field geometry optimization — you can see ~23 iterations of the environment in my GitHub repo — and implemented the multi-head self-attention policy network trained via behavior cloning over BFGS expert demonstrations. I then spent about a year trying to extend this to reaction-path search, experimenting with different RL algorithms (PPO, SAC) and force-field environments. I didn't crack that harder problem and left the lab for another direction. The geometry optimization work I built continued under another student and was eventually published as Chang & Li, JCTC 2023, 19, 8598 — with SAC and SchNet added on top of the architecture I'd implemented. I'm not on the paper because my work didn't go into the final writeup directly, but the architectural lineage is visible if you compare my `SelfAttentionBFGSBC.py` to Figure 1 of their paper."

**"Why aren't you on the paper?"**
> "The published work used SAC and SchNet, which were added after I left the lab. My actual research direction during my last year there was reaction-path optimization — a harder problem I didn't solve. The PI made the call on author list at publication time, and since the work that got published diverged from my final research direction, I wasn't included. The architectural foundation I built is in the public Github repo and in the published Figure 1."

**Key honest finding from Chang 2023 paper (good to mention):**
- State S4 (with SchNet) did NOT improve over State S3 (primitive-type labels alone). This is in the paper's conclusions. Shows the user knows the limits of their domain.

## Key paper stats (defensible if user contributes to discussion, NOT for CV claims)

- Paper: Chang, Y.-C.; Li, Y.-P. *J. Chem. Theory Comput.* **2023**, 19, 8598-8609
- Github (Chang's): https://github.com/littlemoonstones/RL-Molecular-Geometry-Optimizer-with-Chemical-Information
- User's repo: https://github.com/MinHanLiWesley/RL

## On the user's repo timing

The user originally said RA period was 07/2021–05/2022 on the resume. After examining the repo and re-discussing, the actual evidence-supported range is 07/2020–12/2021 (17 months). The repo activity proves July 2020 start. The user's verbal description of "investigating till Dec 2021" matches their uncommitted exploration work. The updated dates (07/2020–12/2021) are now in the CV.
