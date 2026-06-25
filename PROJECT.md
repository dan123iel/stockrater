# pondex

**Live:** https://dan123iel.github.io/stockrater/  
**Repo:** https://github.com/dan123iel/stockrater

> pondex helps self-directed retail investors make better investment decisions — not by showing more data, but by providing context, structure, and a system that thinks alongside them.

---

## Documentation

### Product
| | |
|---|---|
| [vision.md](doc/product/vision.md) | Why pondex exists. Problem, success, what it's not. |
| [strategy.md](doc/product/strategy.md) | How pondex wins. Positioning, moat, growth, monetization. |
| [personas.md](doc/product/personas.md) | Who uses it and why. Jobs-to-be-done. |
| [metrics.md](doc/product/metrics.md) | North Star metric, phase exit criteria, what we don't measure. |
| [principles.md](doc/product/principles.md) | What pondex will never do — and why. |

### Roadmap
| | |
|---|---|
| [now.md](doc/roadmap/now.md) | Current phase (MVP) — scope, exit criteria, open questions. |
| [next.md](doc/roadmap/next.md) | Next phase (V1) — scope, dependencies, open questions. |
| [later.md](doc/roadmap/later.md) | Prioritized backlog — V2, V3, V4+, never. |
| [decisions.md](doc/roadmap/decisions.md) | Architectural Decision Records (ADRs). |

### Specs
| | |
|---|---|
| [scoring-engine.md](doc/specs/scoring-engine.md) | How the score is calculated. Weights, thresholds, confidence. |
| [thesis-tracker.md](doc/specs/thesis-tracker.md) | Thesis Tracker feature spec. |
| [ai-chat.md](doc/specs/ai-chat.md) | AI Chat feature spec. |
| [discovery-engine.md](doc/specs/discovery-engine.md) | Discovery Engine feature spec. |
| [dcf-model.md](doc/specs/dcf-model.md) | DCF Stresstest + Reverse DCF spec. |

### Research
| | |
|---|---|
| [problem-validation.md](doc/research/problem-validation.md) | Assumptions vs. validated evidence. |
| [competitor-analysis.md](doc/research/competitor-analysis.md) | Direct, paid, and indirect competitors. |
| [user-interviews.md](doc/research/user-interviews.md) | Interview guide + findings. |

### Technical
| | |
|---|---|
| [architecture.md](doc/technical/architecture.md) | System overview, Worker endpoints, data flow. |
| [data-sources.md](doc/technical/data-sources.md) | APIs, limits, caching strategy. |
| [risks.md](doc/technical/risks.md) | Technical risks with likelihood, impact, mitigation, status. |

### Brand
| | |
|---|---|
| [positioning.md](doc/brand/positioning.md) | How we talk about pondex. |
| [tone-of-voice.md](doc/brand/tone-of-voice.md) | Writing principles and UI copy rules. |
| [naming-conventions.md](doc/brand/naming-conventions.md) | Feature names, score labels, code conventions. |

---

## Quick Reference

**Two MVP blockers before shipping:** JSON backup/restore · Yahoo Finance graceful fallback  
**One constraint before V1:** Vite build system migration  
**One constraint before Discovery Engine:** Cloudflare KV cache for scored universe  
**One constraint before AI Chat:** RAG architecture audit (ADR-005)
