# Project Brief — pondex_

_Based on Code Factory Berlin standard. Updated 30 June 2026 after Survey Wave 1 (n=45)._

---

## What is this project?

pondex_ is a stock research tool that reduces signal-to-noise in investment analysis. It gives any stock a plain-language verdict with a traceable source for every number — designed for self-directed investors who find current tools too expensive, too noisy, or too intimidating to start.

## What problem does it solve?

35% of investors cite signal/noise as their #1 frustration — even single-tool users. The dominant pain is not "too many tabs" but that the signal inside each tool is buried in noise. Current alternatives: broker app (built for execution), ChatGPT (hallucinates numbers without citation), Reddit (unverifiable), Bloomberg ($2,000+/mo, priced out).

## Who is it for?

**Primary ICP:** Value/semi-active investor · EU-NW · Business or Finance background · previously paid $15–50/mo for research tools · churned because signal quality didn't improve · conditional AI trust — requires named primary source (58% of survey, word-for-word identical answer)

**Secondary:** Active trader in NA priced out of Bloomberg ($50–200/mo budget, full AI trust)

**Growth segment:** First-time investors blocked by complexity or fear — need plain language and $5 entry, not a health score on screen 1

## What does success look like?

A user searches NVDA. Within 60 seconds they see: a plain-language explanation per factor → score as conclusion → every number cites its source. The AI chat only states facts traceable to named sources. 30-day retention > 40%.

## What is explicitly NOT in scope?

- Portfolio management / broker execution (requires licence)
- Real-time streaming data
- Social/community features
- Mobile app (Phase 3)
- Paid data APIs (FMP, Bloomberg)
- OpenAI / Claude for AI (Groq Llama 70B only)

## Prerequisites

- [x] Yahoo Finance via `yfinance` (free)
- [x] SEC EDGAR Form 4 (free)
- [x] Groq API key (Llama 3.3 70B)
- [ ] Domain: pondex.io
- [ ] Vercel (frontend) + Railway (backend)

## Rough plan

| Phase | Goal | Target |
|---|---|---|
| 1 — MVP | Noise-filter core · source attribution · 60s UX | July 2026 |
| 2 — Pro | Macro Hub · DE/ES · Login · Stripe | Sept 2026 |
| 3 — Growth | SEO pages · Newsletter · Affiliate | 2027 |

## Constraints

- Solo founder — no feature takes more than 2 weeks to ship
- Free data sources only
- Pricing not yet validated — no paywall before Van Westendorp test

## What could go wrong?

1. Yahoo Finance rate-limits at scale — 5-min cache in backend mitigates
2. Cold audience more AI-skeptical (44% vs 21% warm) — citations-first design serves skeptics
3. Habit formation: 80% spend <1hr/week — 60s flow + future daily digest needed

## How do I know it worked?

- 30-day retention > 40%
- 10 paying users without marketing spend
- Every AI output has visible citation (100%)
- Interview with Gunnar Leu (churned ICP) confirms product solves his noise problem
