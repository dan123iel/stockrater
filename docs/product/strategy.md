# pondex — Product Strategy
_Last updated: 2026-07-24 · Stand nach Phase B + Council Audit_

> The golden rule: Never build for more than 2 weeks without talking to real people.

---

## Positioning

**For** self-directed retail investors who research individual stocks,
**pondex_** is a noise filter with source attribution
**that** gives every stock a clear plain-language verdict — every number with a named source.
**Unlike** Yahoo Finance, ChatGPT, or broker screeners,
**pondex_** delivers no data chaos, but a clear audit trail.

**What we pitch:** "Research with a clear audit trail"
**What we do NOT pitch:** "AI-powered analysis" — AI is mechanism, not message

---

## ICP (Ideal Customer Profile)

**Primary — Passive Noise-Reducer (41% of research sample):**
Passive investor · EU · <1h/week research · uses broker + ChatGPT + Yahoo Finance · primary pain: Signal/Noise · **prototype: Patricia P.**

**Secondary — Churned Value Investor (proven WTP):**
Value/active investor · EU-NW · business/finance background · has paid $15–50/mo for research tools · churned because noise remained unsolved · **prototype: Gunnar L.**

**Growth segment — Overwhelmed Aspirer:**
Wants to start, blocked by complexity · needs plain language + low price point · not MVP priority

---

## Messaging by Segment

| Segment | Pitch |
|---|---|
| Passive Investor (ICP) | "Tells you what matters in 60 seconds. Every source cited." |
| Active/Value Investor | "Bloomberg-quality signal. €4.99/month." |
| Aspirer | "Research with a clear audit trail — no jargon." |

---

## Pricing

| Tier | Price | Gate |
|---|---|---|
| Free | €0 | 1 full verdict/day |
| Pro | €4.99/month · €49.99/year | Unlimited + Peer Comparison + DCF + AI Chat |

**Research basis:** Patricia P. Van Westendorp: €3–5/month = "Schnäppchen" (iCloud/Netflix-Tier).
Wave 2: 69% open to €4.99 (10% hard Yes, 59% Maybe).
**Validation gap:** Cold-audience Van Westendorp test (EXP-002) still needed before Phase E.

---

## Competitive Moat

**Short-term:** Explanation-first + source attribution. No free competitor shows source citations as default UI — and no paid one has truly solved the noise problem (proven: both churners paid and still cancelled because noise remained).

**Medium-term:** Exit Strategy + Thesis Tracker. No competitor has this. Once users have 6–12 months of documented theses, real switching costs emerge.

**Long-term:** Decision quality feedback loop. After 2+ years, pondex_ knows which conditions correlate with good decisions for this specific user — a personalised model no competitor can replicate without the same data history.

---

## What pondex_ is NOT

- Not a Bloomberg competitor (different price, different user)
- Not a robo-advisor (pondex_ informs, it doesn't decide)
- Not a neo-broker (analysis, not execution — until Phase 4+)
- Not social trading (explicitly opposite values)
- Not designed to maximize screen time

pondex_ competes against the status quo: the overwhelmed retail investor with five tabs open.

---

## Roadmap Overview

| Phase | Goal | Timeline |
|---|---|---|
| A | Landing Page | ✅ 2026-07-20 |
| B | MVP App + vollständige Demo-Erfahrung | ✅ 2026-07-23 |
| C | Echtes Backend (Railway) + beliebige Ticker | Aug 2026 |
| D | Supabase Auth + Investor-Profil Onboarding | Aug 2026 |
| E | Stripe Pro-Tier + Free Gate + Peer Comparison | Sept–Okt 2026 |
| E2 | Exit Strategy + Thesis Tracker | Okt 2026 |
| E3 | AI Score Explainer + Copilot Chat | Okt–Nov 2026 |
| F | SEO + Content + Growth | Q4 2026 |

→ Vollständige Roadmap: `docs/specs/ROADMAP.md`

---

## Growth Hypothesis

**0 → 100 User:** Direct outreach an die 45 Wave-1-Kontakte + Gunnar-Interview-Netzwerk nach Phase C Launch.

**100 → 1.000 User:** Word of mouth in investor communities (r/eupersonalfinance, r/Finanzen). Product Hunt Launch. "Every source cited" als Pull für skeptische User.

**1.000 → 10.000 User:** SEO landing pages per Persona (/value-investing, /passive-investor). Finance Newsletter Kooperationen.

→ Vollständiges GTM-Playbook: `docs/GTM-PLAYBOOK.md`

---

## The One Metric That Matters

> **30-Day Retention > 40%**
> Nicht Registrierungen. Nicht Pageviews. Nur das.

Interim-Metriken bis Thesis Tracker existiert (Phase E2):
- D7 Retention > 20%
- Analysis per active user per week > 2
- Watchlist add rate > 30% of active users

---

## What a Professional Does NOT Do

```
✗ 6 Monate bauen ohne dass jemand es sieht
✗ Das Signal/Noise-Problem mit mehr Daten lösen — das macht es schlimmer
✗ AI als USP pitchen — AI ist Infrastruktur, nicht Botschaft
✗ Einen Preis setzen ohne Daten (Cold-Audience-Test ausstehend)
✗ Fragmentation als Value Prop pitchen (nur 3/45 nennen "zu viele Tabs")
✗ Für warmes Netzwerk optimieren — Cold-Audience-Signal ist das echte Signal
```
