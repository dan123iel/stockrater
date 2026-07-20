# Data Governance — pondex

> Last updated: 2026-06-21
> Every piece of data you store is a commitment.
> This document makes those commitments explicit.

---

## Current Data Architecture

pondex Phase 1–3 stores **all user data exclusively in the user's own browser** via `localStorage`. No data is transmitted to any pondex-owned server. No personal data is collected, registered, or stored externally.

This means:
- No database, no backend, no user accounts
- No GDPR registration required in Phase 1–3 (no personal data processing on our infrastructure)
- No data breach risk from pondex infrastructure (there is none)
- Downside: user loses all data if they clear browser storage or switch devices

---

## Data Inventory

### Data stored in browser localStorage

| Key | Data | Purpose | Classification | Retention | Transmitted to |
|-----|------|---------|---------------|-----------|---------------|
| `pondexfmp_key` | FMP API key string | Authenticate FMP requests | Sensitive | Until user clears | FMP API only |
| `pondexgroq_key` | Groq API key string | Authenticate Groq requests | Sensitive | Until user clears | Groq API only |
| `pondexstrategy_profile` | `{horizon, risk, focus, scoreWeights}` | Scorecard weight calculation | Personal | Until user clears | Never |
| `pondexportfolio` | Array of `{sym, shares, avgPrice, addedAt}` | Portfolio P&L display | Personal-financial | Until user clears | Never |
| `pondextrades` | Array of `{sym, date, price, qty, side, reason, scoreAtTime}` | Trade journal | Personal-financial | Until user clears | Never |
| `pondexwatchlist` | Array of ticker strings | Watchlist display | Personal | Until user clears | Never |
| `pondextheme` | `dark` or `light` | UI preference | Non-personal | Until user clears | Never |
| `pondexonboarded` | `1` | One-time onboarding flag | Non-personal | Until user clears | Never |
| `FMP_CACHE` (in-memory) | FMP API responses | Performance cache (1hr TTL) | Non-personal | Page session only | Never |

### Data transmitted to third parties

| Service | Data sent | Purpose | User control |
|---------|-----------|---------|-------------|
| Financial Modeling Prep | Ticker symbol + FMP API key in URL | Fetch fundamentals | User provides key; can remove from Profile |
| Groq API | Ticker + scorecard context + Groq key | AI summary generation | User provides key; AI tile is optional |
| Cloudflare Worker (Yahoo proxy) | Ticker symbol | Fetch Yahoo Finance news | No key — ticker only; news is public data |
| GitHub Pages | IP address (standard server log) | Static file serving | Standard web hosting |

---

## Data Classification

| Level | Definition | pondex examples |
|-------|-----------|----------------|
| **Non-personal** | No individual identifiable | Theme preference, onboarding flag, FMP cache |
| **Personal** | Relates to an individual but low sensitivity | Strategy profile, watchlist |
| **Personal-financial** | Investment decisions, amounts | Portfolio holdings, trade journal |
| **Sensitive** | Could cause harm if leaked | API keys (FMP, Groq) |

---

## Data Minimization

pondex collects only what is necessary to operate the features the user actively uses:

| Feature | Data collected | Why it's needed | Not collected |
|---------|---------------|----------------|--------------|
| Scorecard | Strategy profile | Calculate profile-relative weights | Name, email, age |
| Portfolio | Ticker, shares, avg price | P&L calculation | Broker account, IBAN, tax ID |
| Trade journal | Ticker, date, price, qty, reason | Retrospective analysis | Transaction IDs, brokerage data |
| AI summaries | Ticker + public scorecard data | Groq prompt context | Personal portfolio details |

**Rule:** Before storing any new field, answer:
1. Why is this needed for the feature?
2. What happens if this data is lost (browser cleared)?
3. Does this need to be transmitted anywhere?

If you can't answer all three, don't store it.

---

## User Rights — Current Implementation

| Right | Status | How it works |
|-------|--------|-------------|
| Access (see all stored data) | ✅ Partial | Profile → Storage tab shows summary. Full JSON export planned. |
| Rectification (edit data) | ✅ Built | Strategy profile, portfolio, and trade journal are all editable in the UI |
| Erasure (delete data) | ✅ Built | Profile → Storage → "Wipe cache" clears all pondex localStorage keys |
| Portability (machine-readable export) | ⬜ Planned | JSON export planned in Profile → Storage tab (Phase 4) |
| Objection (opt out) | N/A Phase 1–3 | No analytics or tracking exists to opt out of |

---

## Third-Party Data Processors

### Phase 1–3

| Processor | Data they receive | Purpose | DPA needed | Notes |
|-----------|-----------------|---------|-----------|-------|
| Financial Modeling Prep | Ticker symbols + API key | Market data | No | User's own FMP key — user is the FMP customer, not pondex |
| Groq | Ticker + scorecard context + API key | AI text generation | No | User's own Groq key — user is the Groq customer |
| Cloudflare | IP address, ticker symbol | Worker proxy routing | No | Standard Cloudflare free tier; no personal data processed |
| GitHub Pages | IP address | Static file hosting | No | Standard GitHub terms apply |

No DPA is required in Phase 1–3 because pondex does not process personal data on behalf of users — all data stays in the user's browser.

### Phase 4 (planned)

When user accounts are introduced, the following processors will require DPAs:

| Processor | Data | DPA required |
|-----------|------|-------------|
| Supabase | User email, portfolio, trades, strategy profile | Yes — EU data processing |
| Railway or Vercel | Transient request data | Yes |
| Stripe (if subscription) | Payment data | Yes |

---

## Data Breach Response

**Phase 1–3:** A "breach" in the traditional sense is not possible — pondex has no server storing user data. The only risk is a security vulnerability in `pondex.html` that could exfiltrate localStorage data from a user's browser (XSS). See SECURITY.md for XSS mitigations.

**If a vulnerability is reported:**
1. Assess: can it extract localStorage data?
2. If yes: publish a security advisory via GitHub (SECURITY.md disclosure process)
3. Patch and release within 48 hours
4. Notify users via GitHub release notes

**Phase 4:** Full GDPR breach notification procedure required. 72-hour window to notify supervisory authority. See INCIDENT-RESPONSE.md (to be created before Phase 4).

---

## What Changes in Phase 4

When user accounts are introduced, this document must be completely revised to cover:
- Legal basis for data processing (legitimate interest or consent)
- Data retention periods per data type
- Privacy policy (published, linked from app)
- Cookie consent (if analytics added)
- DPAs with Supabase, Railway, Stripe
- User data export and deletion flows (backend implementation)
- GDPR registration with supervisory authority (if applicable)

---

*Last updated: 2026-06-21*
*No personal data is processed by pondex infrastructure in Phase 1–3.*
*Phase 4 requires a full data governance review before launch.*
