# ADR-010: Supabase as Authentication and Database Provider

**Date:** 2026-07-24
**Status:** Accepted
**Applies to:** Phase D (Auth) and all subsequent phases

---

## Decision

Use **Supabase** as the authentication and primary database provider for pondex_.

- Auth: Supabase Auth (email/password + Google OAuth)
- Database: Supabase PostgreSQL (user profiles, watchlists, thesis data)
- Client: `@supabase/supabase-js` in the React frontend
- GDPR Data Processor: Supabase EU region (Frankfurt)

---

## Context

Phase D requires real user accounts replacing the current `localStorage` fake-auth. The decision criteria:

| Criterion | Supabase | Firebase | Auth0 | Clerk | PocketBase |
|---|---|---|---|---|---|
| Free tier generous | ✅ 50k MAU | ✅ | ❌ ($23/mo) | ❌ ($25/mo) | ✅ |
| EU data residency | ✅ Frankfurt | ⚠️ US-only | ✅ | ✅ | ✅ (self-host) |
| PostgreSQL (SQL) | ✅ | ❌ NoSQL | ❌ | ❌ | ✅ SQLite |
| Row Level Security | ✅ built-in | ❌ | N/A | N/A | ✅ |
| GDPR DPA available | ✅ | ✅ | ✅ | ✅ | N/A |
| Open source | ✅ | ❌ | ❌ | ❌ | ✅ |
| Solo founder setup time | Fast | Fast | Medium | Fast | Medium |

Already referenced throughout ROADMAP.md, UX-STRUCTURE-SPEC.md, and PRODUCT-JOURNEY.md without formal decision record.

---

## Schema (Phase D)

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id          UUID REFERENCES auth.users PRIMARY KEY,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  plan        TEXT DEFAULT 'free',        -- 'free' | 'pro'
  plan_expires_at TIMESTAMPTZ,            -- NULL for free tier
  onboarded   BOOLEAN DEFAULT FALSE
);

-- Investor Profile (Phase D onboarding)
CREATE TABLE public.investor_profiles (
  user_id     UUID REFERENCES public.profiles PRIMARY KEY,
  goal        TEXT,    -- 'wealth' | 'retirement' | 'income' | 'purchase'
  horizon     TEXT,    -- '<1y' | '1-5y' | '5-10y' | '10+y'
  risk        TEXT,    -- 'sell' | 'hold' | 'buy-more'
  style       TEXT,    -- 'value' | 'growth' | 'dividend' | 'momentum'
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Watchlist (Phase C — currently localStorage)
CREATE TABLE public.watchlist (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles NOT NULL,
  ticker      TEXT NOT NULL,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ticker)
);

-- Thesis Tracker (Phase E2)
CREATE TABLE public.theses (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES public.profiles NOT NULL,
  ticker           TEXT NOT NULL,
  purchase_price   NUMERIC,
  horizon          TEXT,
  notes            TEXT,
  target_score_min INT,     -- alert if score drops below this
  score_at_add     INT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Daily Verdict Counter (Phase E — free tier gate)
CREATE TABLE public.daily_verdicts (
  user_id     UUID REFERENCES public.profiles NOT NULL,
  date        DATE NOT NULL,
  count       INT DEFAULT 0,
  PRIMARY KEY (user_id, date)
);
```

## Row Level Security

All tables use RLS: users can only read/write their own rows.

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);
-- Repeat pattern for all tables
```

---

## GDPR Implications

- **Data Processor Agreement:** Execute Supabase DPA before Phase D launch (available at supabase.com/dpa)
- **Data Location:** Set project region to EU (Frankfurt/West EU) at project creation
- **Data Minimization:** Only store email, created_at, plan, and investor profile answers
- **Right to Erasure:** Implement `DELETE FROM profiles WHERE id = auth.uid()` + cascade
- **Data Export:** Supabase provides pg_dump; expose "Download my data" in Account page (Phase D)

---

## Migration from localStorage (Phase B/C → D)

Phase B/C stores `pondex_user`, `pondex_onboarded`, `pondex_watchlist` in localStorage.
Phase D migration:
1. On first login with Supabase, check localStorage for existing watchlist
2. If found, offer "Import your existing watchlist" (one-click migration)
3. Clear localStorage after successful import

---

## Consequences

- **Positive:** SQL queries, RLS security, generous free tier, EU data residency, open source
- **Positive:** One SDK handles auth + database — no separate DB provider needed until significant scale
- **Negative:** Supabase free tier pauses after 1 week inactivity (mitigate: use Pro plan at >1k MAU, ~$25/mo)
- **Negative:** Lock-in risk — mitigated by standard PostgreSQL (any hosted Postgres is a valid migration path)
