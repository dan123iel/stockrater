# Architectural Decision Records

---

## ADR-001 — Single-File HTML Architecture

**Date:** 2025-01  
**Status:** Accepted, under review for V1

**Context:** pondex needed to be deployable without a build system, installable by downloading one file, and runnable offline. Backend infrastructure would add cost and a login requirement, contradicting the privacy-first principle.

**Options considered:**
- A: Single-file HTML (no build system)
- B: React + Vite (build system, still single-origin)
- C: Next.js (SSR, requires server)

**Decision:** Option A.

**Rationale:** Zero dependencies, zero build step, offline-capable, directly shareable as a file. Perfectly aligned with the local-first, no-account principle.

**Consequences:**
- Positive: No infrastructure, no deployment complexity, maximum portability
- Negative: File grows past 5,000 lines, becomes unmaintainable without tooling
- Mitigation: Migrate to Vite with single-file output at V1 (see ADR-003)

**Review trigger:** When index.html exceeds 4,000 lines or when a new major feature (Thesis Tracker, AI Chat) requires component isolation.

---

## ADR-002 — Yahoo Finance as Primary Data Source

**Date:** 2025-01  
**Status:** Accepted, risk documented

**Context:** pondex needed a free, global data source covering 70,000+ tickers without an API key requirement.

**Options considered:**
- A: Yahoo Finance (unofficial endpoints, no key, global coverage)
- B: Financial Modeling Prep (official API, free tier, US-heavy)
- C: Alpha Vantage (official API, free tier, limited requests)

**Decision:** Option A as primary, Option B as fallback for fundamentals.

**Rationale:** Only Yahoo Finance provides global coverage at zero cost. FMP is kept as a fallback for users who provide their own key.

**Consequences:**
- Positive: 70,000+ tickers globally, no rate limit
- Negative: Unofficial endpoint, no SLA, can break without notice
- Mitigation: Worker catches errors, tiles degrade gracefully. FMP fallback for fundamentals. See risks.md.

**Review trigger:** If Yahoo Finance endpoints break and stay broken for > 72 hours.

---

## ADR-003 — Vite Build System (Planned)

**Date:** Planned for V1  
**Status:** Proposed

**Context:** As pondex adds Thesis Tracker, Portfolio, and AI Chat, the single-file architecture becomes unmaintainable. Code needs component isolation and type safety.

**Decision (proposed):** Introduce Vite with a custom plugin that inlines all JS and CSS into a single `index.html` at build time. The deployment artifact remains one file — the development experience does not.

**Consequences:**
- Positive: Component isolation, TypeScript support, testable units, maintainable codebase
- Negative: Build step added, requires Node.js for development
- Non-consequence: Deployment model unchanged — still one HTML file, still offline-capable

---

## ADR-004 — Groq / Llama 3.3 70B for AI Features

**Date:** 2025-06  
**Status:** Accepted

**Context:** AI explanations and chat require a capable LLM. Cost and latency matter for a free product.

**Options considered:**
- A: Groq / Llama 3.3 70B (fast inference, free tier, proxied through Worker)
- B: OpenAI GPT-4o (better quality, higher cost)
- C: OpenRouter (flexible, multiple models)

**Decision:** Option A as default, Option C as user-configurable fallback.

**Rationale:** Groq's inference speed is significantly faster than OpenAI for this use case. The API key lives in a Cloudflare Worker Secret — never in the browser. Users can optionally provide their own OpenRouter key for alternative models.

**Consequences:**
- Positive: Fast, free (within limits), no key exposure in browser
- Negative: Groq rate limits on free tier, model quality below GPT-4
- Mitigation: RAG architecture ensures factual grounding regardless of model

---

## ADR-005 — RAG Architecture for AI Outputs

**Date:** 2025-06  
**Status:** Accepted, partially implemented

**Context:** LLMs hallucinate financial data. A wrong revenue figure or incorrect price target destroys user trust immediately.

**Decision:** All AI outputs must be grounded in real-time data fetched from Yahoo/EDGAR. The Worker injects exact JSON data as context before every prompt. The system prompt instructs the model to never use training knowledge for financial figures — only context-provided data.

**System prompt constraint:**
> "Use only the financial data provided in the context. If a metric is not present in the context, respond with 'data not available' rather than estimating."

**Consequences:**
- Positive: Eliminates hallucinated financial figures
- Negative: Context window usage increases, prompt costs rise
- Mitigation: Cache data for the session, reuse across prompts

**Status:** Instruction in system prompt. Full JSON injection not yet verified for all tiles. Must be audited before AI Chat launch.
