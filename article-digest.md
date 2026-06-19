# Article Digest — Min-Han Li (Proof Points)

Compact proof points from CV and experience bank. Used by evaluation + PDF modes.

---

## ByteDance / TikTok — Software Engineer Intern (05/2025 – 11/2025)

**Role context:** Ads platform on-call tooling, San Jose.
**Tech:** Go, Python, SQL, Redis, Docker, RAG, Multi-Agent Systems

### Proof Points

- **AI On-Call Diagnostic Bot** — Built in Go, serving **200+ internal users**. Reduced average incident resolution time **50% (7 → 3.5 days)** by auto-aggregating ads data and retrieving relevant past incidents at ticket creation.
  - Tags: backend, go, ai, llm, tooling, scale, metrics
  - Use for: Backend / Platform / AI Engineer / LLMOps / generic SWE

- **RAG + LLM-Based Self-Service** — Knowledge-base-driven routing that **automates 50% of 30+ weekly ad-platform issues**, eliminating dependency on on-call engineers for common incidents.
  - Tags: ai, rag, llm, backend, automation, metrics
  - Use for: AI Engineer, LLMOps, Applied AI, Agentic roles

- **6+ Integrated Troubleshooting Tools in Go** — Permission verification, access checks, log-based user lookup, one-click bug filing, unified card interface for non-technical staff.
  - Tags: backend, go, tooling, developer-experience
  - Use for: Backend, Platform, Developer Tools, Internal Tools roles

- **Multi-Agent Diagnostic Workflows** — Designed from internal runbooks for ad delivery debugging. Reduced manual escalations that previously involved **10+ people per incident**.
  - Tags: ai, multi-agent, system-design, automation, metrics
  - Use for: Agentic, AI Engineer, LLMOps, Applied AI

- **Incident-to-Article Knowledge Pipeline** — LLM chat summarization + RAG, Redis caching on high-frequency lookups to minimize query latency.
  - Tags: ai, rag, llm, redis, backend, data-pipeline, performance
  - Use for: AI Engineer, Data Platform, Backend

---

## ReMo — Software Engineer Intern (11/2024 – 01/2025, Portland, ME)

**Role context:** Computer-vision SaaS startup (book metadata).
**Tech:** Python, Go, FastAPI, YOLOv11, Docker, React, Zustand, AWS ECS

### Proof Points

- **Go + FastAPI Backend Services** — Enabled **sub-3s inference latency** for multi-stage OCR and metadata extraction.
  - Tags: backend, go, python, fastapi, performance, ml-inference, metrics
  - Use for: Backend, Full-Stack, ML Infra

- **90% Accurate Book Spine Recognition Pipeline** — YOLOv11 + Internvl + custom LLM metadata extraction.
  - Tags: ml, computer-vision, llm, python, metrics
  - Use for: ML, CV, AI Engineer

- **25% Faster Initial Page Load** — Lazy-loading + code-splitting in React.
  - Tags: frontend, react, performance, metrics
  - Use for: Full-Stack, Frontend-adjacent roles

- **Containerized Deployment** — Docker + AWS ECS + API Gateway for HA.
  - Tags: devops, docker, aws, deployment
  - Use for: DevOps-adjacent, Platform, Full-Stack

---

## Yanray Inc. — Software Engineer Intern (07/2023 – 08/2023, Taipei)

**Tech:** C#, .NET Core, Azure, Redis, Cosmos DB, Robot Framework

### Proof Points

- **95% Structured Field Extraction Accuracy** — Business card recognition pipeline with Azure AI Vision + custom LLM.
  - Tags: ai, azure, llm, backend, ml, metrics

- **31% Faster Metadata Retrieval (175ms → 120ms)** — Redis caching + Cosmos DB query optimization.
  - Tags: backend, redis, database, performance, metrics

- **SDLC Best Practices** — Azure App Service deployment with Application Insights telemetry.
  - Tags: backend, azure, devops, testing

---

## Acer — R&D Intern (07/2022 – 08/2022, Taipei)

**Tech:** Python, OpenVINO, YOLOv7, FaceNet, Model Quantization, PyTorch, ONNX

### Proof Points

- **Real-Time Meeting Assistant under 300ms** — Face + QR recognition via OpenVINO quantization + async inference.
  - Tags: ml, computer-vision, python, performance, metrics

- **YOLOv7 + FaceNet Fine-Tuning** — Accuracy + deployment efficiency balance.
  - Tags: ml, computer-vision, python, model-training

- **50% Latency Reduction** — INT8 quantization + CPU-target model conversion.
  - Tags: ml, performance, optimization, metrics

---

## Cross-Role Hero Stats (for recruiter screens)

- **200+ users** served by production AI system (ByteDance)
- **50%** resolution time reduction (ByteDance)
- **50%** of 30+ weekly issues automated (ByteDance)
- **90%** accuracy on CV pipeline (ReMo)
- **95%** extraction accuracy (Yanray)
- **Sub-300ms** real-time ML inference (Acer)
- **4 internships** across US + Taiwan, shipping production code at each
