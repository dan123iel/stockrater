# pondex — Product Decision Log

> Key product decisions, their rationale, and scheduled review dates.
> For architecture decisions see: `docs/architecture/adr/`

---

## Format

```
### D-XXX · [Title]
- **Date:** YYYY-MM-DD
- **Decision:** What was decided
- **Rationale:** Why
- **Alternatives considered:** What else was on the table
- **Review:** When to revisit
```

---

## Log

### D-001 · No login in Phase 1
- **Date:** 2026-06-01
- **Decision:** Phase 1 ships without authentication
- **Rationale:** No retention signal before 10 real users; login adds regulatory complexity (GDPR) and slows MVP
- **Alternatives considered:** Google Sign-In, magic link
- **Review:** Phase 2 — only after 30-day retention OKR is hit

---

### D-002 · Yahoo Finance + SEC EDGAR as sole data sources (no FMP)
- **Date:** 2026-06-01
- **Decision:** Data = Yahoo Finance (via yfinance) + SEC EDGAR only
- **Rationale:** Free, no API cost, sufficient coverage for MVP; FMP costs ~$50/mo and adds dependency
- **Alternatives considered:** Financial Modeling Prep (FMP), Alpha Vantage
- **Review:** At >1k MAU — evaluate official Yahoo Finance API or Alpha Vantage (→ ADR-005)

---

### D-003 · Groq Llama 3.3 70B, no OpenAI
- **Date:** 2026-06-01
- **Decision:** AI layer = Groq Llama 3.3 70B only
- **Rationale:** Free tier sufficient for MVP; no OpenAI dependency; open-weight model = lower lock-in risk
- **Alternatives considered:** OpenAI GPT-4o, Anthropic Claude
- **Review:** Phase 2 — if AI verdict quality becomes a churn reason

---

### D-004 · Split deployment: GitHub Pages (frontend) + Railway (backend)
- **Date:** 2026-06-30
- **Decision:** Frontend on GitHub Pages (free), backend on Railway
- **Rationale:** Zero cost for frontend; Railway simplest backend deploy for FastAPI; no Vercel/Netlify complexity
- **Alternatives considered:** Vercel (both), Render, Fly.io
- **Review:** At >10k monthly requests — Railway may need paid tier

---

### D-005 · No broker integration in Phase 1
- **Date:** 2026-06-01
- **Decision:** pondex is read-only; no trade execution, no portfolio sync with broker
- **Rationale:** Regulatory risk (MiFID II execution services); focus on signal quality, not execution
- **Alternatives considered:** IBKR API, Trade Republic API
- **Review:** Phase 3 (if users request it and regulatory path is clear)

---

### D-006 · Explanation-first UX (explanation before score)
- **Date:** 2026-06-15
- **Decision:** Plain-language factor explanation renders before the score number
- **Rationale:** Score without explanation = noise; explanation builds trust and justifies the verdict (→ ADR-007)
- **Alternatives considered:** Score-first with expandable detail
- **Review:** Test in user interviews: do users read the explanation or skip to score?

---

### D-007 · Competitor analysis placed under research/competitors/ (not discovery/)
- **Date:** 2026-07-03
- **Decision:** Competitor analysis is market research, not discovery activity
- **Rationale:** Discovery = "what is the problem?"; Research = "what do we know about the market?"
- **Alternatives considered:** Keep in discovery/ (previous location)
- **Review:** N/A — structural decision

---

### D-008 · Analytics Tool: Plausible Analytics
- **Date:** 2026-07-24
- **Decision:** Plausible Analytics (plausible.io, €9/month)
- **Rationale:** Cookie-frei → kein Cookie-Banner nötig in EU. EU-Server Frankfurt. GDPR-konform ohne Consent-Management. Für solo founder und EU-Produkt die einfachste und rechtlich sauberste Lösung.
- **Alternatives considered:** Google Analytics 4 (Cookie-Banner Pflicht, Daten zu Google), PostHog (mächtiger aber komplexer, selbst-hostbar)
- **Review:** Bei >100k pageviews/Monat → Plan upgraden (~€19/Monat). Bei Bedarf nach Session Recording → PostHog evaluieren.
- **Spec:** `docs/specs/ANALYTICS-SPEC.md`

---

### D-009 · Mobile Navigation: Bottom Navigation Bar
- **Date:** 2026-07-24
- **Decision:** Bottom Navigation Bar mit 5 Items (Home | Markets | Search | Portfolio | Account) unter 900px Viewport-Breite
- **Rationale:** Trade Republic, Revolut, Robinhood nutzen Bottom Nav — User kennen das Pattern. Daumen-erreichbar. Kein Hamburger-Overhead. Löst AppNav-Overflow-Problem unter 900px.
- **Alternatives considered:** Hamburger Dropdown (weniger native), nur 3 Links sichtbar (verliert Robo/CFD)
- **Review:** Nach Phase C Launch — testen ob 5 Items ausreichen oder Robo Advisor/CFD auf Mobile gebraucht wird
- **Spec:** `docs/specs/MOBILE-NAV-SPEC.md`

---

### D-010 · Investor Profile Onboarding: 3 Fragen + Skip
- **Date:** 2026-07-24
- **Decision:** 3 Fragen (Ziel | Horizont | Risiko) mit explizitem Skip-Button. Kein Skip = Core Portfolio als Default.
- **Rationale:** Patricia P. Interview: Setup >2 Minuten ist Dealbreaker. 3 Fragen = ~20 Sekunden. Skip = Respekt vor User-Zeit. Profil kann jederzeit in Account-Seite nachgeholt werden.
- **Alternatives considered:** 5 Fragen ohne Skip (zu lang), 5 Fragen mit Skip (unnötig komplex)
- **Review:** Nach Phase D Launch — Abbruchrate bei Frage 3 messen. Wenn >40% abbrechen: auf 2 Fragen reduzieren.
- **Spec:** `docs/specs/ONBOARDING-FLOW-SPEC.md`

---

### D-011 · Score-Gewichtung: Explizit sichtbar
- **Date:** 2026-07-24
- **Decision:** Beide Scores werden gezeigt: "Default: 78/100 → Your score (Value Investor): 62/100"
- **Rationale:** Transparenz ist das Kernversprechen. Versteckte Personalisierung widerspricht dem "every number cites its source" Prinzip. User soll genau verstehen warum sein Score sich unterscheidet.
- **Alternatives considered:** Nur Tooltip (weniger transparent), Unsichtbar (widerspricht Kernversprechen)
- **Review:** User-Interviews nach Phase D — versteht der User die Differenz oder verwirrt sie ihn?
- **Spec:** `docs/specs/ONBOARDING-FLOW-SPEC.md` §Score-Anzeige mit Profil

---

_Add entries before major pivots, scope changes, or "why did we do X?" moments. This log prevents re-debating settled decisions._
