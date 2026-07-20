# pondex — Assumptions Log

> Tracks all key assumptions underlying product decisions.
> Status: Unvalidated → Validated → Refuted

---

## How to use

Add an entry whenever a decision rests on an unproven belief. Update status after each interview, survey wave, or experiment.

---

## Assumptions

### A-001 · Signal/Noise is the #1 pain for self-directed investors
- **We believe:** EU retail investors churn from existing tools primarily because of noise, not missing data
- **Evidence so far:** Wave 1 n=56 — Signal/Noise named as #1 pain by majority
- **Status:** ✅ Validated (Wave 1)
- **Review:** Wave 2 cold audience replication needed

---

### A-002 · Source attribution is the purchase trigger
- **We believe:** Users will pay only if every metric cites its named source
- **Evidence so far:** 71% WTP conditional on source attribution (Wave 1)
- **Status:** ✅ Validated (Wave 1) — needs cold audience replication
- **Review:** Wave 2

---

### A-003 · Plain-language verdict reduces decision friction meaningfully
- **We believe:** A plain-language summary ("fairly valued because…") reduces time-to-decision vs. raw data
- **Evidence so far:** ADR-007 (explanation-first UX), no direct measurement yet
- **Status:** 🔲 Unvalidated
- **Review:** Measure TTV (Time To Value) in MVP test — target <60s first verdict

---

### A-004 · EU investors are underserved by existing tools
- **We believe:** No current tool combines EU stock coverage + source attribution + plain-language
- **Evidence so far:** Competitor analysis (2026-07-03) confirms gap
- **Status:** ✅ Validated
- **Review:** Ongoing — watch Koyfin, Finchat roadmaps

---

### A-005 · $9–19/mo is the defensible price range
- **We believe:** Pricing below Seeking Alpha ($19) but above data-only tools ($10) is the sweet spot
- **Evidence so far:** Competitive pricing benchmarks only — no direct WTP test
- **Status:** 🔲 Unvalidated
- **Review:** Van Westendorp test after Interview #1 (→ CURRENT-TODOS.md)

---

### A-006 · 30-day retention >40% is achievable with explanation-first UX
- **We believe:** Users who understand why a stock scores X will return more than users of score-only tools
- **Evidence so far:** No data yet — Phase 1 OKR
- **Status:** 🔲 Unvalidated
- **Review:** Manual tracking of first 10 users (→ CURRENT-TODOS.md)

---

### A-007 · Groq Llama 3.3 70B is sufficient for AI verdict quality
- **We believe:** Open-weight LLM via Groq produces AI verdicts good enough that users trust them (with source attribution)
- **Evidence so far:** Internal testing — no user validation
- **Status:** 🔲 Unvalidated
- **Review:** Ask in user interviews: "Did you trust the AI summary? Why/why not?"

---

_Add new assumptions before writing new specs. Never build a feature whose core assumption is Unvalidated without a test plan._
