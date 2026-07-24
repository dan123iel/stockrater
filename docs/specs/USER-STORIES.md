# User Stories — pondex
_Last updated: 2026-07-24 · Based on Survey Wave 1 (n=45), Wave 2 (n=35), 3 interviews_

> Format: "As a [who], I want to [what], so that [why]."
> Each story has acceptance criteria (Given / When / Then).

---

## Segments

| Code | Who |
|---|---|
| **VA** | Value/Active Investor — pays/has paid, EU, ICP (Gunnar-Typ) |
| **PI** | Passive Investor — ETF-fokussiert, selten recherchiert (Patricia-Typ) |
| **FP** | Finance Professional — skeptisch, will Cross-Validation (José-Typ) |
| **AS** | Aspirer — will anfangen, noch kein Investment |

---

## Phase B — Demo (✅ Live)

### US-001 · Ticker analysieren und Verdict erhalten

```
As a VA/PI/FP
I want to enter a ticker and see a clear verdict within 60 seconds,
so that I don't have to scroll through multiple tools to get an assessment.
```

**Acceptance criteria:**
- Given: I am on the Stock page
- When: I type "AAPL" and press Enter or click "GET VERDICT"
- Then: Score 0–100, BUY/HOLD/SELL badge, and plain-language summary appear
- And: Factor breakdown with 5 factors is visible below the score

---

### US-002 · Plain-Language Erklärung vor Score

```
As a PI/AS
I want to read an explanation in plain language first,
so that I understand what the score means before I trust it.
```

**Acceptance criteria:**
- Given: Analysis is loaded
- When: Overview tab is displayed
- Then: Summary text appears in the verdict card before tabs
- And: Factor breakdown explains each factor in 1 sentence with source

---

### US-003 · Quellenangabe für jede Zahl

```
As a VA/FP
I want to see the exact data source for every metric,
so that I can trust the verdict without taking it blindly.
```

**Acceptance criteria:**
- Given: Score panel is loaded
- When: I look at any factor row
- Then: Source is visible (e.g. "Yahoo Finance")
- And: Disclaimer "Research tool only · Not financial advice" is permanently visible

---

### US-004 · Zwischen Tabs navigieren

```
As a VA/FP
I want to switch between Overview, Key Metrics, Financials, News, Exit Check, Learn,
so that I can dive deep into whichever area interests me.
```

**Acceptance criteria:**
- Given: Analysis is loaded
- When: I click "Key Metrics"
- Then: 4 sections (Price & Volume, Valuation, Profitability, Management) appear
- And: All numbers have source labels

---

### US-005 · Peer-Vergleich sehen (Comparison)

```
As a FP/VA
I want to compare two stocks side-by-side with sector average,
so that I can see relative value and make a better decision.
```

**Research basis:** José B.: "I really like the comparison part — that's how you make a decision."
**Status:** Phase E (Pro feature) · **Acceptance criteria:** TBD with Phase E spec

---

## Phase C — Live Backend

### US-006 · Beliebige Ticker analysieren

```
As a VA
I want to enter any stock ticker (not just the 6 demo stocks),
so that I can research the stocks I actually hold or follow.
```

**Acceptance criteria:**
- Given: Railway backend is deployed
- When: I enter "ASML" or any valid ticker
- Then: Real score based on live Yahoo Finance + SEC EDGAR data appears
- And: "Illustrative" label is no longer shown

---

### US-007 · Watchlist editieren

```
As a PI
I want to add and remove stocks from my watchlist,
so that I can track the stocks I care about, not a hardcoded list.
```

**Acceptance criteria:**
- Given: I am on /app/portfolio Watchlist tab
- When: I click "Add ticker" and enter "NVDA"
- Then: NVDA appears in my watchlist
- When: I click "×" on AAPL
- Then: AAPL is removed from my watchlist
- And: Changes persist after page reload (localStorage)

---

## Phase D — Auth & Personalization

### US-008 · Account erstellen und Daten behalten

```
As a VA
I want to log in with my email,
so that my watchlist and profile are not lost when I clear the browser cache.
```

**Acceptance criteria:**
- Given: I have created an account with Supabase auth
- When: I clear localStorage and log back in
- Then: My watchlist and investor profile are still there
- And: My "Member since" date is correct

---

### US-009 · Investor-Profil einrichten (Onboarding)

```
As a PI
I want to answer 3 quick questions about my investment style,
so that scores are weighted for my strategy (not a generic default).
```

**Acceptance criteria:**
- Given: I have just signed up (first session)
- When: I see the onboarding banner on my first analysis
- When: I complete 3 questions (Goal, Horizon, Risk reaction)
- Then: My score shows "Your score (Value Investor): 62/100" vs. "Default: 78/100"
- And: I can skip the onboarding and use default weights

**Research basis:** Patricia P.: "Das Tool muss mich kennen."
**Spec:** docs/specs/ONBOARDING-FLOW-SPEC.md

---

### US-010 · Account löschen (GDPR)

```
As any user
I want to delete my account and all associated data,
so that I can exercise my right to erasure under GDPR.
```

**Acceptance criteria:**
- Given: I am on /app/account
- When: I click "Delete account"
- Then: A confirmation dialog appears ("This will permanently delete your account and all data")
- When: I confirm
- Then: All my data is deleted and I am redirected to /
- And: I cannot log back in with the same credentials

---

## Phase E — Monetization

### US-011 · Free Tier Gate erleben

```
As a free user
I want to understand the upgrade value clearly when I hit the daily limit,
so that I can make an informed decision about upgrading.
```

**Acceptance criteria:**
- Given: I have run 1 analysis today (free tier limit)
- When: I try to run a second analysis
- Then: An upgrade modal appears (not a hard block)
- And: Modal shows "You've used your free verdict for today" + Pro benefits
- And: "Remind me tomorrow" closes the modal without upgrading
- And: The limit resets at midnight

---

### US-012 · Pro upgraden via Stripe

```
As a free user who has hit the limit
I want to upgrade to Pro with a clear monthly or annual price,
so that I can get unlimited analyses.
```

**Acceptance criteria:**
- Given: I click "Upgrade to Pro" in the modal
- When: I complete Stripe Checkout
- Then: I am redirected back to the app as a Pro user
- And: The daily limit is lifted immediately
- And: I receive a receipt email from Stripe

---

## Phase E2 — Exit Strategy

### US-013 · Exit-Signal für eine gehaltene Position erhalten

```
As a VA who holds TSLA
I want to see an Exit Score and HOLD/TRIM/EXIT signal,
so that I know whether my original investment thesis still holds.
```

**Acceptance criteria:**
- Given: I am on /app/stock?ticker=TSLA, Exit Check tab
- When: I optionally enter my purchase price
- Then: Exit Score 0–100 is displayed
- And: Signal is HOLD / TRIM / EXIT (never "Sell" as imperative)
- And: Thesis drift is shown (e.g. "Revenue Growth: was +21%, now +3%")
- And: Disclaimer: "Research signal only · Not financial advice"

**Spec:** docs/specs/EXIT-STRATEGY-SPEC.md · docs/specs/UX-STRUCTURE-SPEC.md §13

---

## Won't Build (mit Begründung)

| Story | Warum nicht |
|---|---|
| Aktien direkt kaufen | Broker-Lizenz (MiFID II execution) erforderlich |
| Kauf-/Verkaufsempfehlungen ("Du solltest kaufen") | Regulatorisches Risiko ohne Investmentberatungs-Lizenz |
| Echtzeit-Streaming-Preise | Infrastrukturkosten nicht gerechtfertigt für Phase B/C |
| Social Trading / Copy Trading | Kein Survey-Signal, andere Zielgruppe |
| Gamification / Streaks | Widerspricht Kernwert: kein Engagement-Maximizing |

---

## Story Map (User Journey)

```
[Entdecken]        [Analysieren]        [Entscheiden]        [Zurückkehren]
     ↓                   ↓                    ↓                    ↓
US-006 Ticker    US-001 Verdict       US-003 Quellen       US-007 Watchlist
US-005 Compare   US-002 Erklärung     US-013 Exit Signal   US-011 Gate
                 US-004 Tabs          US-009 Profil
                 US-008 Account
```
