# pondex_ — Current To-Dos

_Last updated: 2026-07-04 · Based on: Wave 1 Survey Analysis (n=56) + Opportunity Scorecard + Council Review_

> This document is the single source of truth for active tasks.
> Rules: Nothing gets built that isn't listed here. Nothing gets added without survey or interview evidence.

---

## ✅ Done Today

- [x] Backend live: https://stockrater-production.up.railway.app ✅ 2026-07-04
- [x] Smoke Test passed (AAPL score + source attribution working) ✅ 2026-07-04
- [x] Chart tab fixed (apiKey guard removed) ✅ 2026-07-04
- [x] 7 Startup Laws + Cagan 4 Risk Gates embedded in Council ✅ 2026-07-04
- [x] North Star + No Vitamins documented in vision + principles ✅ 2026-07-04
- [x] Docs restructured: docs/, context/, architecture/, specs/ ✅ 2026-07-03
- [x] Competitor analysis written ✅ 2026-07-03
- [x] Assumptions log, Decision log, Glossary created ✅ 2026-07-03
- [x] Incident log created (INC-001, INC-002) ✅ 2026-07-04
- [x] Sentry integrated in backend (awaiting DSN setup) ✅ 2026-07-04

---

## 🔴 Discovery — This Week (do not postpone)

### 1. Message Gunnar Leu on LinkedIn
**Why:** Only churner with complete profile — payment history ($15–50/mo), named pain (noise), detailed Q9 verbatim, consent to contact. Every other interview follows this one.
**How:** Template in `docs/discovery/user-interviews.md` → "Outreach template" section. Copy-paste, add Calendly or "When works for you?"
**Goal:** 45-min video call using the interview guide.
- [ ] LinkedIn message sent
- [ ] Call booked
- [ ] Interview conducted + documented in `user-interviews.md` → Interview Log

### 2. Message Patricia G. Parnet
**Why:** Passive investor, survey consent given. Signal: "Daily overview + annual reports" — matches Cluster 3 (Fragmentation).
**How:** Same template as Gunnar, slight adjustment: *"your insight about daily overviews was really interesting"*
- [ ] Message sent
- [ ] Call conducted + documented

### 3. Message José Bernardo S.
**Why:** Passive investor, LinkedIn link available. Signal: "Everything in one place."
- [ ] Message sent
- [ ] Call conducted + documented

### ⛔ Do not contact yet
- saderomo, Karen García, carolinademuner → Aspirers, 0% payment history, different product logic → Phase 2

---

## 🟡 Survey — After Interview #1

### 4. Prepare Wave 2 Survey
**Why:** Wave 1 was warm network (WhatsApp). Cold audience (Reddit) already shows higher AI skepticism. Findings must be replicated before investor pitch or paid acquisition.
**Channel:** r/eupersonalfinance + r/finanzen
**Fixes vs Wave 1:**
- Barriers: single-select instead of multi-select (no primary pain identifiable)
- Show concept first, then ask about features (avoids inflated demand)
- Direct price point: $9 / $19 / $49 (no open-ended WTP)
- Consistent Likert scale throughout
- [ ] Interview #1 completed (prerequisite)
- [ ] Wave 2 questionnaire created
- [ ] Posted on Reddit

### 5. Van Westendorp Pricing Test
**Why:** 85% of investors have never paid for a tool. No price point was tested in Wave 1. Choosing a paywall price without this test is guessing.
**Who:** Only the 5 contacts with payment history from Wave 1 + interview participants
**Not with:** cold traffic — no baseline
- [ ] Interviews completed (prerequisite)
- [ ] Landing page with $9/$19/$49 created
- [ ] Sent to WTP contacts
- [ ] Result documented in `docs/discovery/opportunity-scorecard.md`

---

## 🟢 Code — Still Open

### I. Chart Tab — verify fix is live
- [ ] Open live app → AAPL → Chart tab → confirm chart renders correctly

### J. TAM/SAM/SOM
**Why:** Missing from `docs/product/strategy.md` — needed for investor pitch + pricing decisions.
**How:** Bottom-up: (EU retail investors) × (% willing to pay) × (price point hypothesis)
- [ ] Add TAM/SAM/SOM section to `docs/product/strategy.md`

---

## 🚀 Deployment

### F. Backend on Railway
- [x] Railway account + project set up ✅ 2026-07-02
- [x] Dockerfile + Procfile fixes deployed ✅ 2026-07-02
- [x] Backend live ✅ 2026-07-02
- [x] yfinance upgraded to 1.2.0 ✅ 2026-07-04
- [x] Smoke Test passed ✅ 2026-07-04

### H. Sentry Error Monitoring
**Why:** INC-001 took 3h because the real error (KeyError) appeared as a generic 429. Sentry shows the stack trace immediately.
**Effort:** 5 minutes
- [ ] sentry.io → free account → New Project → Python → FastAPI
- [ ] Copy DSN (looks like `https://abc@xyz.ingest.sentry.io/123`)
- [ ] Railway → Variables → set `SENTRY_DSN`
- [ ] Verify: trigger an error → appears in Sentry dashboard

### G. Retention Tracking
**Why:** OKR "30-day retention >40% with first 10 users" is not automatically measurable without login.
**Plan (no code needed):**
- [ ] Create list of first 10 real users → `docs/discovery/user-tracking-phase1.md`
- [ ] 7-day follow-up: short WhatsApp/LinkedIn message "Did you come back?"
- [ ] 30-day follow-up: 15-min call — did you return? Why / why not?
- [ ] Record result in `docs/product/metrics.md` after 30 days

---

## ⚖️ Regulatory — Before Phase 2 Launch (before September 2026)

> Full action plan → `docs/regulatory/REGULATORY.md` Section 9
> Phase 1 regulatory is fully complete.

### Step 1 — Clarify jurisdiction
- [ ] Decision made + recorded in `docs/regulatory/REGULATORY.md` Section 7

### Step 2 — Privacy Policy (required before login goes live)
- [ ] Written (datenschutz-generator.de or iubenda.com)
- [ ] Saved as `frontend/public/privacy.html`
- [ ] Link added to footer

### Step 3 — Terms of Service (required before paywall)
- [ ] Written
- [ ] Saved as `frontend/public/terms.html`
- [ ] Link in footer + checkbox before paywall

### Step 4 — Paywall disclaimer (code)
- [ ] Checkbox "I understand pondex is not an investment advisor" before `stripe.redirectToCheckout()`

### Step 5 — EU AI Act assessment
- [ ] Documented in `docs/regulatory/REGULATORY.md`

### Step 6 — yfinance license (at >1k MAU)
- [ ] Evaluate Alpha Vantage or official Yahoo Finance API

---

## ⏸ Waiting (do not build yet)

| Feature | Why waiting | When |
|---------|-------------|------|
| Geopolitics / Macro data | After Gunnar Leu interview — may be nice-to-have only | After Interview #1 |
| Multilingual DE/ES | Wave 2 must confirm EU signal | Phase 2 |
| New tabs (Ownership etc.) | After existing tabs fully source-attributed | After audit |
| Login / Auth | Phase 2 — no retention signal before 10 users | Phase 2 |
| Micro-investing / Education | Aspirer features — 0% WTP signal | Phase 2+ |
| Watchlist / Portfolio | Phase 2 | Phase 2 |
| Sentry DSN setup | Low priority until users start hitting errors | When convenient |

---

## 📍 Where everything lives

| Topic | Document |
|-------|---------|
| Full survey analysis | `docs/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md` |
| Opportunity scoring + decision log | `docs/discovery/opportunity-scorecard.md` |
| Interview contacts + template + log | `docs/discovery/user-interviews.md` |
| Competitor analysis | `docs/research/competitors/competitor-analysis.md` |
| Analysis playbook (for Wave 2) | `docs/research/_playbooks/` |
| Regulatory boundaries | `docs/regulatory/REGULATORY.md` |
| Technical architecture | `context/context/architecture.md` |
| Roadmap | `docs/specs/ROADMAP.md` |
| Risk register | `docs/RISK-REGISTER.md` |
| Folder structure rules | `docs/STRUCTURE.md` |
| Incident log | `docs/architecture/INCIDENT-LOG.md` |
| Assumptions | `docs/product/assumptions.md` |
| Decision log | `docs/product/decision-log.md` |

---

_Next update: after Interview #1 with Gunnar Leu_
