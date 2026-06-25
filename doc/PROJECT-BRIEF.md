# Project Brief — pondex

> Based on Code Factory Berlin standard. Filled out June 2026.

---

## What is this project?

pondex is a personal, client-side market intelligence platform for individual investors. It scores any stock algorithmically against the user's own investment strategy (value, growth, dividend, momentum), explains *why* the score is what it is, and tracks the user's own trades over time — all without a login, database, or subscription.

---

## What problem does it solve?

Most investment tools either give raw data (Bloomberg, Yahoo Finance) or opinions (YouTube, bank advisors). Neither adjusts their output to how *you* actually invest. A P/E of 30× is a green flag for a growth investor and a red flag for a value investor — no existing tool reflects that. pondex fills the gap: same stock, different score per strategy profile, fully explained.

---

## Who is it for?

```
Primary user:
Self-directed retail investor (age 25–45), invests 1–4× per year.
Does their own research, frustrated by generic "buy/sell" signals.
Wants to know: "Does this stock fit MY strategy?" not just "here is the data."

Secondary:
Active trader who logs trades and wants to see if past decisions were actually good in hindsight.
```

---

## What does it look like when it's done?

User opens pondex before making an investment decision. They enter a ticker, see a score with explanation, check the DCF and insider signals, read an AI summary aligned to their profile, and add the trade to their journal. Weekly they check the Macro Dashboard to understand the environment. They never need Bloomberg or a bank advisor for this workflow.

---

## What is explicitly NOT part of this?

```
- No social features (sharing, following, leaderboards)
- No server-side storage of user data (everything in localStorage)
- No mobile app — browser only
- No real-time streaming data (1hr cache is fine)
- No financial advice — algorithmic signals only
- No broker execution — analysis only, no order routing
```

---

## What do you need to build it?

```
[x] Financial Modeling Prep API key (free tier: 250 req/day)
[x] Cloudflare Workers account (free) — CORS proxy for Yahoo Finance
[x] Groq API key (free) — Llama 3 70B for AI summaries
[ ] OpenRouter key (free) — alternative to Groq, Llama 3.1 8B
[ ] GitHub Pages or Vercel account for hosting
[ ] Supabase account (Phase 4 only)
```

---

## What does the rough plan look like?

```
✅ Sprint 1 — Strategy Core
  - Strategy quiz + profile (horizon, risk, focus)
  - Profile-relative scorecard weights
  - Weight editor (sliders)

✅ Sprint 2 — Intelligence
  - Groq AI summaries (Llama 3 70B)
  - OpenRouter free-tier alternative (Llama 3.1 8B)
  - Strategy-based stock recommendations

✅ Sprint 3 — Trade Journal & Macro
  - Trade journal (manual entry + Trade Republic CSV import)
  - Macro Dashboard (rates, inflation, yield curve, earnings calendar)

⬜ Phase 4 — Platform (~months 5–12)
  - Supabase auth (email/Google login)
  - Database (user data, trades, portfolio)
  - Trade Republic / Scalable Capital broker API sync
  - Push alerts (price drop, score change, news)
  - Subscription model (free + pro tier)
```

---

## What is the rough timeline?

```
Sprint 1–3 completed: 2026-06-18
Phase 4 start:        TBD (after user validation of Phase 1–3)
Phase 4 target:       TBD
Review point:         After 100 active users or 3 months post-launch
```

---

## What are the constraints?

```
Time available:   ~5–10 hours/week (side project)
Budget (monthly): max €15/month (hosting + APIs)
Hard constraints: - Must remain client-side for Phase 1–3 (GDPR: no personal data on servers)
                  - No build step (vanilla JS, no webpack/vite)
                  - Single-file architecture for portability
Skill gaps:       Supabase / auth implementation (Phase 4)
```

---

## What could go wrong?

```
1. FMP free tier (250 req/day) is too restrictive for active users — need to add caching or upgrade key
2. Groq API changes pricing or rate limits — OpenRouter free tier is the fallback
3. Phase 4 scope creep (auth + broker + subscriptions = 3 projects in one) — must be phased tightly
```

---

## How do I know it was worth it?

```
"I (or someone I know) check pondex before every investment decision."
"At least 50 people outside my circle use it monthly after Phase 4 launch."
"The trade journal shows me patterns in my own decision-making I couldn't see before."
```

---

*Last updated: 2026-06-18*
*Status: [x] In Progress · Phase 3 complete, Phase 4 planning*
