# pondex_ — Roadmap

_Last updated: 30 June 2026 · Survey Wave 1 (n=45) incorporated_

## Status Overview

| Phase | Status | Target |
|---|---|---|
| Phase 1 — MVP (Noise-filter core) | In Progress | July 2026 |
| Phase 2 — Pro (Macro + Monetisation) | Planned | Sept 2026 |
| Phase 3 — Growth (SEO + Scale) | Later | 2027 |

---

## Now — Phase 1: MVP

**Goal:** A working noise-filter for stock research. Any user can search a ticker and get a clear, source-cited verdict in under 60 seconds.

**In scope:**
- Ticker search → plain-language explanation per factor → score as conclusion
- Every metric shows named source (Yahoo Finance TTM / SEC EDGAR Form 4)
- AI chat that only cites traceable sources
- 12-tab analytics layout (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- All 7 navigation pages routed (Home, Analysis, Markets, Macro, Ideas, Portfolio, Watchlist)
- doc/ structure: Tier 1 documents complete

**Out of scope:**
- Login / authentication
- Stripe / payments
- Portfolio tracking
- Dark mode
- Mobile

**Success criteria:**
- 30-day retention > 40% with first 10 real users
- Every AI output has visible citation
- Analysis page loads in < 3s on standard connection

**Target:** 15 July 2026

---

## Next — Phase 2: Pro

**Goal:** Monetisation-ready. First 10 paying users acquired directly (no marketing).

**Likely scope:**
- Macro Hub — geopolitics + sector context (Gunnar Leu's #1 request)
- Login (Google Sign-In)
- Stripe integration (pricing TBD — run Van Westendorp first)
- Multilingual: Deutsch + Español (EU-NW 53% of sample, Spanish verbatims)
- Watchlist + Portfolio tracking

**Target:** September 2026

---

## Later — Phase 3: Growth

Directional ideas — not committed:
- SEO: individual page per ticker (`/analysis/NVDA`)
- Weekly newsletter: "3 undervalued stocks this week — powered by pondex score"
- Affiliate programme (30% commission for finance YouTubers/bloggers)
- Mobile app (React Native)
- API for third parties

---

## Icebox

| Idea | Why not now |
|---|---|
| Ticker tape (live prices) | Adds complexity, no survey signal for it |
| Tile drag-and-drop reordering | Nice-to-have, Phase 2 |
| PDF export | No survey signal |
| Comparison tool (multi-ticker) | Useful but not the core pain |
| Dark mode | Would require full design system fork |

---

## Won't build (ever)

| Feature | Reason |
|---|---|
| Broker execution / order placement | Requires broker licence |
| Social/community features | Not the pain point |
| Paid data APIs (FMP, Bloomberg) | Against cost constraint + free sources sufficient |
| OpenAI / Claude for AI | Against cost constraint — Groq Llama 70B is sufficient |

---

## Recently Shipped

| Version | Date | What shipped |
|---|---|---|
| 0.1.0 | June 2026 | Backend (Yahoo/SEC/Groq), React MVP, Paper design, Survey Wave 1 |
| 0.2.0 | 30 June 2026 | Explanation-first UX, source attribution, Backend /score returns explanations[] + sources[], Analysis.jsx decoupled from FMP |

---

## How to read this roadmap

**Now** = locked. Don't add to it unless something breaks. Remove things from it if they're blocked.

**Next** = planned but scope can flex. A feature moves from Next → Now when: it has a survey-backed user need, it's achievable in <2 weeks solo, and Phase 1 retention target is met.

**Later** = directional signals only. Don't design these yet.

A feature gets promoted from Icebox → Next when at minimum one paying user has asked for it unprompted.
