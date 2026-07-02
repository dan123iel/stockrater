# pondex_ — Roadmap

_Last updated: 2026-07-02 · Survey Wave 1 (n=56, korrigiert von n=45) incorporated_

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
| 0.3.0 | 2 July 2026 | Source attribution on all 5 tiles, AI disclaimer, Disclaimer opacity fix, CORS hardened, Personas updated (n=56), railway.toml, Council review passed (16/25 Refine) |

---

## Regulatory Obligations per Phase

> Vollständiges Framework → `doc/regulatory/REGULATORY.md`
> Regel: Kein Phase-Übergang ohne Regulatory-Checkpoint.

### Phase 1 — Läuft (bis 15. Juli 2026)
| Obligation | Status | Was |
|---|---|---|
| Disclaimer sichtbar (Opacity ≥ 0.5) | ✅ Erledigt | `Analysis.jsx` opacity .22 → .55 |
| AI-Output niemals "buy/sell/recommend" | ✅ By design | System Prompt + Code-Kommentare |
| Quellenattribution auf allen Tiles | ✅ Erledigt | Alle 5 Tiles + AI-Tab |
| Keine Server-side User-Daten | ✅ By design | Nur localStorage |
| Kein personalisierter Investment Advice | ✅ By design | Score = algorithmisches Signal, kein Ratschlag |

### Phase 2 — Vor Launch (vor September 2026)
| Obligation | Status | Was | Wann |
|---|---|---|---|
| Privacy Policy schreiben (GDPR + US) | ❌ Offen | Pflicht sobald Login/Accounts live gehen | Vor Phase 2 Launch |
| Terms of Service schreiben | ❌ Offen | Pflicht bei Paywall / Abonnement | Vor Paywall |
| Cookie / Consent Banner | ❌ Offen | Falls Analytics oder Tracking hinzukommt | Sobald Tracking live |
| Data Retention Policy definieren | ❌ Offen | Was wird gespeichert, wie lang, wie löschen | Vor Phase 2 Launch |
| Right-to-Erasure Mechanismus | ❌ Offen | GDPR Art. 17 — User kann Daten löschen | Vor Phase 2 Launch |
| Jurisdiktionsfrage klären (DE/EU/US) | ❌ Offen | Welches Recht gilt? → Basis für AGB | Vor Phase 2 Start |
| yfinance Lizenz bei >10k MAU prüfen | ❌ Offen | Inoffizielle API — bei Skalierung kritisch | Wenn MAU >1k |
| EU AI Act Compliance prüfen | ❌ Offen | Ist pondex AI-System "high-risk"? | Vor Phase 2 Launch |
| Paywall-Seite: Disclaimer vor Kauf | ❌ Offen | Explizite Bestätigung "kein Investment Advice" | Vor Stripe live |
| DPA mit Railway / Supabase | ❌ Offen | GDPR Data Processing Agreement | Vor Phase 2 Launch |

### Phase 3 — Später (2027)
| Obligation | Was |
|---|---|
| SEC Registration prüfen (US) | Bei personalisierten Features / Empfehlungen gegen Bezahlung |
| Affiliate-Disclosure | FTC-Pflicht bei Provisionen für Empfehlungen |
| MiFID II Lizenzprüfung | Falls pondex in Richtung personalisierter Beratung expandiert |

---

## How to read this roadmap

**Now** = locked. Don't add to it unless something breaks. Remove things from it if they're blocked.

**Next** = planned but scope can flex. A feature moves from Next → Now when: it has a survey-backed user need, it's achievable in <2 weeks solo, and Phase 1 retention target is met.

**Later** = directional signals only. Don't design these yet.

A feature gets promoted from Icebox → Next when at minimum one paying user has asked for it unprompted.
