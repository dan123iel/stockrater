# pondex_ — Data Model for Lovable

---

## Supabase Schema

```sql
-- Extends Supabase auth.users
CREATE TABLE public.profiles (
  id              UUID REFERENCES auth.users PRIMARY KEY,
  email           TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  plan            TEXT DEFAULT 'free',        -- 'free' | 'pro'
  plan_expires_at TIMESTAMPTZ,
  onboarded       BOOLEAN DEFAULT FALSE
);

-- Investor profile (3-question onboarding)
CREATE TABLE public.investor_profiles (
  user_id    UUID REFERENCES public.profiles PRIMARY KEY,
  goal       TEXT,    -- 'wealth' | 'retirement' | 'income' | 'purchase'
  horizon    TEXT,    -- 'short' | 'medium' | 'long' | 'verylong'
  risk       TEXT,    -- 'conservative' | 'moderate' | 'aggressive'
  style      TEXT,    -- computed: 'value' | 'growth' | 'core'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Watchlist
CREATE TABLE public.watchlist (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES public.profiles NOT NULL,
  ticker     TEXT NOT NULL,
  added_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ticker)
);

-- Daily verdict counter (free tier gate)
CREATE TABLE public.daily_verdicts (
  user_id    UUID REFERENCES public.profiles NOT NULL,
  date       DATE NOT NULL,
  count      INT DEFAULT 0,
  PRIMARY KEY (user_id, date)
);

-- Thesis tracker (Phase E2)
CREATE TABLE public.theses (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID REFERENCES public.profiles NOT NULL,
  ticker           TEXT NOT NULL,
  purchase_price   NUMERIC,
  horizon          TEXT,
  notes            TEXT,
  target_score_min INT,
  score_at_add     INT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Score Model

```
5 factors scored 0–100 each:
  Fundamentals (ratios)  — P/E, margins, revenue growth
  Moat                   — competitive advantages, switching costs
  Risk (esgRisk)         — ESG score, debt/equity, beta
  Valuation              — P/E vs sector, P/B, EV/EBITDA
  Management             — ROE, ROA, buyback activity

Default weights:
  ratios:     25%
  moat:       25%
  esgRisk:    20%
  valuation:  20%
  management: 10%

Profile-adjusted weights (Phase D):
  value style:    ratios 20%, moat 20%, esgRisk 15%, valuation 35%, management 10%
  growth style:   ratios 35%, moat 25%, esgRisk 15%, valuation 15%, management 10%
  core style:     default weights

fitScore (0–5) = Σ(factor_score/100 × weight)
s100 = round(min(fitScore × 20, 100))

Verdict:
  ≥ 70 → BUY (Good/Strong Fit)
  50–69 → HOLD (Moderate Fit)
  < 50 → SELL (Weak Fit)
```

---

## Investor Profile Scoring Logic

```javascript
function computeStyle(answers) {
  const { risk, horizon } = answers
  if (risk === 'conservative' || horizon === 'short') return 'value'
  if (risk === 'aggressive' && (horizon === 'long' || horizon === 'verylong')) return 'growth'
  return 'core'
}
```

---

## localStorage Keys (Phase B/C — before Supabase)

```javascript
'pondex_user'              // { email: string }
'pondex_onboarded'         // '1' if signup complete
'pondex_onboarded_seen'    // '1' if onboarding banner dismissed
'pondex_watchlist'         // JSON array of ticker strings
'pondex_investor_profile'  // { goal, horizon, risk, style }
'pondex_verdicts_{date}'   // count of analyses today (free tier gate)
'pondex_profile_dismissed' // '1' if personalization prompt dismissed
```

---

## API Response Shapes

```typescript
// GET /score/{ticker}
{
  fitScore: number,        // 0–5
  scores: {
    ratios: number,        // 0–5
    moat: number,
    esgRisk: number,
    valuation: number,
    management: number,
  },
  explanations: {
    ratios: string,
    moat: string,
    esgRisk: string,
    valuation: string,
    management: string,
  },
  sources: Array<{ factor: string, metrics: Array<{ source: string }> }>
}

// GET /quote/{ticker}
{
  companyName: string,
  price: number,
  change: number,
  changePercent: number,
  marketCap: number,
  beta: number,
  sector: string,
  industry: string,
  country: string,
  exchangeShortName: string,
  '52wHigh': number,
  '52wLow': number,
  sharesOutstanding: number,
  description: string,
}

// GET /ratios/{ticker}
{
  peRatio: number,
  forwardPE: number,
  priceToBook: number,
  priceToSales: number,
  fcfYield: number,
  enterpriseValueMultiple: number,
  grossMargin: number,
  operatingMargin: number,
  netMargin: number,
  revenueGrowth: number,
  dividendYield: number,
  payoutRatio: number,
  returnOnEquity: number,
  returnOnAssets: number,
  debtToEquity: number,
  currentRatio: number,
  quickRatio: number,
}

// GET /financials/{ticker}
Array<{
  date: string,           // '2024-09-30'
  revenue: number,
  grossProfit: number,
  operatingIncome: number,
  netIncome: number,
  operatingIncomeRatio: number,
  totalAssets: number,
  totalLiabilities: number,
  totalEquity: number,
  debtToEquity: number,
  operatingCashFlow: number,
  investingCashFlow: number,
  financingCashFlow: number,
  freeCashFlow: number,
  capitalExpenditure: number,
}>

// GET /history/{ticker}
{
  candles: Array<{ date: string, close: number, volume: number }>
}
```
