# Resume Critique — Min-Han Li

**Overall:** 7.6 / 10 — GOOD
**Date:** 2026-04-22
**Target archetypes scored against:** Backend / Platform Engineer (New Grad, primary), AI / ML Engineer (New Grad, primary), Full-Stack Engineer (New Grad, secondary)

## Scores

| # | Dimension | Score | Evidence / Notes |
|---|-----------|-------|------------------|
| 1 | Impact density | 7.5/10 | 11 of 15 bullets (73%) carry a hard metric. Strong but under the 80% bar. The 4 metric-free bullets: ByteDance bullet 5 (knowledge pipeline), ReMo bullet 4 (containerize/deploy), Yanray bullet 3 (SDLC/telemetry), Acer bullet 2 (YOLOv7/FaceNet fine-tuning). |
| 2 | Bullet craft | 7.5/10 | Mostly strong verbs (Built, Developed, Designed, Enabled, Optimized, Reduced, Boosted, Delivered). No "helped / responsible for / worked on" filler. One weak opener: "Applied SDLC best practices..." reads as ceremony, not outcome. Skills section lists many technologies with zero bullet evidence (Spring Boot, Dropwizard, Hibernate, MyBatis, Scala, Swift, Ruby, Tomcat, Bazel, Iceberg, Hadoop, Spark, Eureka, OpenFeign) — fabrication / keyword-stuff risk. |
| 3 | Archetype fit | 8.5/10 | Both primary archetypes are well surfaced: Backend/Platform via Go at ByteDance (200+ users, 6+ tools, multi-agent workflows) and ReMo (Go + FastAPI, AWS ECS). AI/ML via RAG, multi-agent, LLM routing, YOLO, OpenVINO, quantization. Full-stack covered by ReMo React bullet. Very strong archetype signal. |
| 4 | Level framing | 8.5/10 | "Built / Developed / Designed / Enabled" is exactly right for a new grad with internship-level ownership. Does not overclaim ("led a team of 10") nor undersell ("assisted with"). "Designed multi-agent diagnostic workflows" is the most senior-sounding claim and it is backed by the runbook detail. |
| 5 | Keyword coverage | 7.5/10 | Backend/Platform keywords present: Go, Python, Redis, Docker, AWS ECS, FastAPI, microservices context. AI/ML keywords present: RAG, multi-agent, LLM, YOLO, OpenVINO, ONNX, PyTorch, quantization. **Missing-in-bullets** high-value terms: Kubernetes (skills only), CI/CD, observability/tracing, gRPC, load/latency-at-scale language, unit/integration testing, SQL schema design. **Over-listed** in skills with no bullet evidence: Spring Boot, Hibernate, MyBatis, Scala, Swift, Ruby, Bazel, Iceberg, Hadoop, Spark, Eureka, OpenFeign — these dilute signal. |
| 6 | Section order & balance | 8.0/10 | Order is correct: Contact → Summary → Education → Experience → Skills. Experience is the dominant block. Bullet counts per role (5, 4, 3, 3) are within the ≤5 cap. Education before Experience is right for a new grad. No Projects section — fine given four internships carry the weight. |
| 7 | ATS parseability | 6.5/10 | Standard section names, no columns/tables/icons. **But** the Skills section contains the literal token `@@INLINE@@` (line 64: "Linux @@INLINE@@ **Machine Learning:**") — this is a template placeholder that was never resolved. An ATS will either render it literally or mangle the line break. Must be fixed before any submission. Unicode em-dashes and arrows (→) are tolerable but could be replaced with ASCII for maximum safety. |
| 8 | Readability / density | 7.5/10 | All bullets 1–2 lines, all under 30 words, no role exceeds 5 bullets. Three ByteDance bullets are at or above 25 words (30, 27, 29) — right at the rubric's "don't exceed" line. One page in density terms. |
| 9 | Verb / phrase variety | 6.5/10 | **"Built" appears 4 times** (ByteDance #1, ByteDance #5, ReMo #2, Acer #1) — violates the ≤2× rule. "Developed" appears 2× (at the cap). Other verbs (Enabled, Designed, Optimized, Containerized, Delivered, Boosted, Applied, Trained, Reduced) each appear once. Swap two instances of "Built" to diversify. |
| 10 | Differentiation signal | 8.0/10 | The signature ("new grad who has already shipped production AI") surfaces in bullets 1–2 (ByteDance), within the top 2 of the top 10. 200+ users, 50% resolution reduction, 50% of 30+ weekly issues, 10+ people de-escalated — this is a clear, quantified, recruiter-legible differentiator. Would be a full 9+ if the RAG/multi-agent phrasing were slightly sharper and if the summary line named a concrete hero metric. |

**Overall:** (7.5 + 7.5 + 8.5 + 8.5 + 7.5 + 8.0 + 6.5 + 7.5 + 6.5 + 8.0) / 10 = **7.6 / 10 — GOOD**

## Bullet-Level Findings (top 5 weak bullets)

### 1. ByteDance bullet 5 — no outcome metric

- **Quoted:** "Built knowledge pipeline converting resolved incidents into searchable articles via LLM chat summarization and RAG, with Redis caching on high-frequency lookups to minimize query latency"
- **Issue:** Dimensions 1 (no metric), 9 ("Built" overuse).
- **Proposed rewrite (source-faithful):** "Shipped an incident-to-article knowledge pipeline (LLM chat summarization + RAG) with Redis caching on high-frequency lookups, feeding the self-service bot that now handles 50% of 30+ weekly ad-platform issues."
  (Links this bullet to the self-service metric it enables; all facts come from cv.md + article-digest.md.)
- **Needs input from candidate:** latency numbers for "minimize query latency" (e.g., p50/p95 before vs after Redis) would turn this into a true metric bullet.

### 2. ReMo bullet 4 — vague deployment claim, no metric

- **Quoted:** "Containerized and deployed services via Docker, AWS ECS, and API Gateway for high availability"
- **Issue:** Dimensions 1 (no metric), 2 ("for high availability" is a claim without proof), 5 (under-leveraged DevOps keywords).
- **Proposed rewrite (source-faithful):** "Containerized the OCR + metadata backend with Docker and deployed to AWS ECS behind API Gateway, supporting the sub-3s inference SLO used in production."
  (Ties the deployment to the sub-3s latency already proven in bullet 1.)
- **Needs input from candidate:** actual uptime / request volume / number of services would make "high availability" concrete.

### 3. Yanray bullet 3 — ceremony verb, no outcome

- **Quoted:** "Applied SDLC best practices to develop, test, and deploy the backend on Azure App Service, integrating telemetry with Application Insights"
- **Issue:** Dimensions 1 (no metric), 2 ("Applied SDLC best practices" is filler), 4 (soft framing).
- **Proposed rewrite (source-faithful):** "Deployed the .NET Core backend to Azure App Service with Application Insights telemetry and Robot Framework integration tests, hardening the business-card pipeline that hit 95% extraction accuracy."
  (Removes the ceremony opener, names the actual tools, ties the bullet to the extraction-accuracy metric that already anchors this role.)
- **Needs input from candidate:** test coverage %, deployment frequency, or incident count avoided would upgrade this to a true metric bullet.

### 4. Acer bullet 2 — no metric, passive energy

- **Quoted:** "Trained and fine-tuned YOLOv7 and FaceNet models for QR detection and face recognition, optimizing for both accuracy and deployment efficiency"
- **Issue:** Dimensions 1 (no metric), 2 ("optimizing for both" is hedged).
- **Proposed rewrite (source-faithful):** "Fine-tuned YOLOv7 (QR detection) and FaceNet (face recognition) and shipped them into the real-time meeting assistant that runs under 300ms on CPU after INT8 quantization."
  (Ties training work directly to the 300ms latency and INT8 outcomes already on the resume. Nothing invented.)
- **Needs input from candidate:** accuracy / mAP / FAR-FRR numbers for the fine-tuned models would give this its own metric.

### 5. ByteDance bullet 3 — "6+ tools" is a count, not an outcome; and third "Built/Developed" verb in one role

- **Quoted:** "Developed 6+ integrated troubleshooting tools in Go — permission verification, access checks, log-based user lookup, and one-click bug filing — behind a unified card interface accessible to non-technical staff"
- **Issue:** Dimensions 1 (count without outcome), 8 (29 words — near the ceiling), 9 (verb variety in a cluster).
- **Proposed rewrite (source-faithful):** "Shipped 6+ Go-based troubleshooting tools (permission checks, access checks, log-based user lookup, one-click bug filing) behind a unified card interface, opening the on-call workflow to non-technical staff and cutting engineer interrupts."
  (Tightens 29 → 29 words but swaps the verb, reframes the count with an implied outcome that is present elsewhere in the ByteDance proof points.)
- **Needs input from candidate:** concrete tool-usage count (clicks, unique users among the 200+, tickets created per week via the card interface) would make this a true metric bullet.

## Structural Findings

### Section order
Correct for new grad: Contact → Summary → Education → Experience → Skills. No changes needed.

### Balance
- Bullet counts per role: 5 / 4 / 3 / 3. Within the ≤5 cap and weighted correctly toward the most recent (ByteDance).
- Experience dominates page area. Education is appropriately short.
- No Projects section. Acceptable given four internships, but a single strong personal / course project (e.g., a distributed systems or ML deployment project from Northeastern coursework) would help for pure-backend JDs that don't care about AI.

### ATS risks
1. **`@@INLINE@@` template artifact in Skills section** (cv.md line 64). Must be resolved — either remove or replace with a proper line break. This is the single highest-priority fix before any submission.
2. Arrow character `→` in Yanray bullet 2 ("175ms → 120ms"). Most modern ATS parsers handle this, but an ASCII "->" is safer.
3. Em-dashes `—` used as tech-stack delimiters under each role title. Fine for humans and modern parsers, but worth spot-checking after a LaTeX render.

### Differentiation issues
The "production AI at scale" signature is there, but the **Summary** line underuses it: "Software engineer with experience building AI-powered systems, multi-agent workflows, and RAG pipelines." No metric. The first recruiter glance should land on "200+ users," "50% resolution time cut," or "automates 50% of 30+ weekly incidents." Promote one hero metric into the summary.

### Skills-section fabrication / keyword-stuff risk
The Skills block lists many technologies that have **zero supporting evidence** in experience bullets:
- **Languages:** Scala, Swift, Ruby — no bullet uses these. If the candidate has coursework / side-project evidence, list them in a dedicated "Other / Coursework" line instead of mixing with production languages.
- **Frameworks:** Spring Boot, Dropwizard, Tomcat, Bazel — no bullet uses these.
- **DevOps:** Kubernetes, Eureka, OpenFeign, RabbitMQ — no bullet uses these.
- **Databases:** MyBatis, Hibernate, Iceberg, Hadoop, Spark — no bullet uses these.

This is the biggest fabrication-risk surface on the resume. A careful recruiter or interviewer will ask "tell me about the Spring Boot service you built" and the answer needs to exist. Prune aggressively to what the candidate can actually defend in an interview.

## Required Fixes (before tailoring)

1. **Remove the `@@INLINE@@` template artifact** in Skills section (cv.md line 64). Hard ATS break risk.
2. **Prune the Skills section to what is defensible.** Remove or move to a clearly-labeled "Coursework / Familiar" sub-bucket: Spring Boot, Dropwizard, Tomcat, Bazel, Eureka, OpenFeign, Hibernate, MyBatis, Iceberg, Hadoop, Spark, Scala, Swift, Ruby. Keep only what's in bullets plus anything the candidate can whiteboard on demand.
3. **Diversify verbs.** Replace two of the four "Built" uses with Shipped / Launched / Engineered / Deployed. Specifically: ByteDance bullet 5 → "Shipped", Acer bullet 1 → "Engineered" (or similar).
4. **Add one hero metric into the Summary.** Replace the generic line with something like: "Software engineer with experience building production AI systems at scale (200+ users, 50% resolution-time cut at ByteDance/TikTok), multi-agent workflows, and RAG pipelines."
5. **Turn 2–3 of the 4 metric-free bullets into metric bullets.** See top-5 weak bullets above — the easiest wins are Yanray bullet 3 (tie to 95%) and Acer bullet 2 (tie to 300ms + INT8), which can be done without inventing any new numbers.

## Nice-to-Have Enhancements

1. **Consider adding a Projects section** with one distributed-systems or ML-infra project from Northeastern coursework (Scalable Distributed Systems, Cloud Computing). This would give pure-backend JDs without an AI angle a second landing spot and open up Kubernetes / gRPC / observability keywords organically.
2. **Add coursework-adjacent keywords to bullets where they're true:** e.g., "monitoring / observability" on the ByteDance on-call bot (RAG + incident triage is inherently an observability surface). Only if accurate.
3. **Add GitHub URL in the contact line** if there is a public portfolio. Currently only LinkedIn is present. For new grad roles, GitHub presence is often decisive.
4. **Move "Spark, Hadoop, Iceberg" to a dedicated "Data / Coursework" bucket** if retained — mixing them with MySQL/PostgreSQL/Redis/MongoDB in the "Databases" row is misleading (they are processing engines / table formats, not databases).
5. **Tighten ByteDance bullet 1** — at 30 words it's the longest on the resume. Dropping "by auto-aggregating ads data and relevant past incidents at ticket creation" to "via ticket-time data aggregation and incident retrieval" saves 8 words without losing signal.
