# Feature Spec — Discovery Engine

## Problem This Solves

Users only find what they already know to search for. A self-directed investor with a Growth profile and heavy US tech exposure might benefit enormously from a European industrial compounder — but they never search for it. The Discovery Engine surfaces relevant stocks proactively.

---

## User Story

As an investor, I want pondex to suggest stocks that fit my strategy and complement my portfolio — without me having to search for them.

---

## How It Works

### Step 1 — Curated Universe (server-side, daily)
A Cloudflare Cron Trigger runs nightly and scores a curated universe of ~200 high-quality global stocks. Scores and fundamentals are cached in Cloudflare KV Store.

**Why not score on-demand?** Massive/Polygon free tier = 5 req/min. Scoring 200 stocks on-demand would exhaust the limit instantly. Nightly caching decouples discovery from rate limits.

### Step 2 — Local Matching (client-side, instant)
When the user opens the Ideas page, the browser fetches the pre-scored universe (1 request to KV). Matching runs locally in JavaScript:

**Filters applied:**
- Score above user's profile threshold (e.g. > 3.5 for Moderate)
- Sector not already overweight in portfolio (> 40% → deprioritize)
- Geography not already overweight (> 60% one region → suggest others)
- Correlation check — no second stock that moves like an existing position
- Not already in portfolio or watchlist

### Step 3 — Ranked Output
Top 5–8 suggestions ranked by: fit score × confidence × portfolio gap score.

---

## Each Suggestion Includes

- Ticker + company name
- Score + profile fit label
- **Why this stock for you** — 2–3 sentences referencing the user's specific profile and portfolio gaps
- **Why not** — 1–2 explicit risks
- **What you already own that's similar** — correlation warning if applicable

---

## Acceptance Criteria

- [ ] Ideas page loads suggestions in < 2 seconds (from KV cache, not live API)
- [ ] Each suggestion has a "Why this for you" explanation, not generic description
- [ ] Each suggestion has at least one risk listed
- [ ] "Refresh suggestions" button triggers re-matching (not re-scoring)
- [ ] User can dismiss a suggestion ("Not interested" — excluded from future suggestions)
- [ ] Suggestions update when user changes strategy profile

---

## Out of Scope (this version)

- Real-time scoring (nightly cache is sufficient)
- User-configurable universe ("add my own stocks")
- Source-based discovery (YouTube/RSS extraction)
- Collaborative filtering ("users like you also analyzed...")

---

## Open Questions

- [ ] What defines the curated universe? Manual curation vs. algorithmic selection?
- [ ] How often should the KV cache refresh? Daily at midnight UTC?
- [ ] Should dismissed stocks be stored indefinitely or reset monthly?

---

## Technical Notes

- Cloudflare KV key: `discovery_universe_v1` → JSON array of scored stocks
- Cron: `0 2 * * *` (2am UTC daily)
- Client fetch: single GET to Worker `/discovery/universe`
- Matching algorithm: pure client-side JS, no additional API calls
- KV storage: ~200 stocks × ~2KB each = ~400KB per cache entry (well within KV limits)

## Dependency

- Rate limit solution (KV cache) must exist before this feature ships
- Portfolio feature must exist for portfolio-gap matching to work
