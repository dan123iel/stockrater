# User Stories — pondex

> Derived from Survey Wave 1 (n=45, Juni 2026) and ICP interviews.
> Format: "As a [who], I want to [what], so that [why]."
> Each story has acceptance criteria (Given / When / Then).

---

## Segments

| Code | Who |
|---|---|
| **VA** | Value Investor (Active) — pays/has paid, EU-NW, ICP |
| **PI** | Passive Investor — ETF-only, rarely checks |
| **AS** | Aspirer — wants to start, no investment yet |

---

## Phase 1 — MVP (in scope)

### US-001 · Search and analyse a ticker

```
As a VA/PI
I want to enter a ticker and see a clear verdict within 60 seconds,
so that I don't have to scroll through multiple tools to get an assessment.
```

**Acceptance criteria:**
- Given: I am on the Analyse page
- When: I type "NVDA" and press Enter
- Then: Score, explanation and source attribution appear in < 3 seconds

---

### US-002 · Plain-language explanation before the score

```
As an AS
I want to read an explanation in plain language first (no jargon),
so that I understand what the score means before I trust it.
```

**Acceptance criteria:**
- Given: I have analysed a ticker
- When: The results load
- Then: The text "Strong fundamentals — healthy margins..." appears before the score number
- And: No unexplained acronym (P/E, EBITDA, etc.) in the primary text

---

### US-003 · Source attribution for every number

```
As a VA (Gunnar Leu type)
I want to see the exact data source for every metric displayed,
so that I can trust the verdict without taking it blindly.
```

**Acceptance criteria:**
- Given: Score panel is loaded
- When: I click the ▾ icon next to a factor
- Then: I see e.g. "P/E Ratio · 24.3x · Yahoo Finance – trailing twelve months"
- And: Every row has a label, value and source

---

### US-004 · AI insights with source attribution

```
As a VA
I want to ask the AI chat a question and get an answer
that contains only facts from named sources,
so that I don't use hallucinated numbers as a basis for decisions.
```

**Acceptance criteria:**
- Given: AI Insights tab is open, Groq key is set
- When: I ask "What is the biggest risk?"
- Then: The answer contains no numbers without source attribution
- And: The sources[] array shows the data points used

---

### US-005 · Switch between 12 analysis tabs

```
As a VA/PI
I want to switch between Scorecard, Chart, Valuation, DCF, News, Insider and AI,
so that I can dive deep into whichever area interests me at the moment.
```

**Acceptance criteria:**
- Given: Analysis is loaded
- When: I click "Insider"
- Then: The insider trades view opens without a page reload
- And: The active tab is visually highlighted
- And: "Financials", "Dividends", "Analysts" show "coming soon"

---

### US-006 · Build a watchlist

```
As a PI
I want to add stocks to a watchlist,
so that I can quickly pull them up again on my next visit.
```

**Acceptance criteria:**
- Given: I have analysed AAPL
- When: I navigate to Watchlist
- Then: AAPL appears in the list
- And: Clicking AAPL opens the analysis directly

---

### US-007 · Quickly switch between markets overview and analysis

```
As a VA/PI
I want to click on an index or stock on the Markets page,
so that I jump directly into the analysis without entering the ticker manually.
```

**Acceptance criteria:**
- Given: I am on the Markets page
- When: I click "ASML"
- Then: The Analyse page opens with ASML pre-loaded

---

## Phase 2 — Planned (not in Phase 1)

### US-008 · Macro context alongside stock analysis

```
As a VA (Gunnar Leu type)
I want to see geopolitical events and external market factors together with the stock analysis,
so that I don't have to switch between Handelsblatt, YouTube and the analysis tool.
```

**Survey basis:** Q9 verbatim from Gunnar Leu — his explicit #1 request.
**Status:** Phase 2, Macro Hub.

---

### US-009 · Explanations in German or Spanish

```
As an AS (EU-NW / Latin America)
I want to read the explanations in my native language,
so that no language barrier complicates my decision.
```

**Survey basis:** 57% EU respondents, several verbatims in Spanish (Q9).
**Status:** Phase 2, Multilingual.

---

### US-010 · Create an account and save settings

```
As a VA
I want to be able to log in,
so that my strategy profile, watchlist and portfolio track are not lost
when I clear the browser cache.
```

**Status:** Phase 2, Login + backend persistence.

---

## Won't build (with rationale)

| Story | Why not |
|---|---|
| "As a user I want to buy stocks directly" | Broker licence required |
| "As a user I want to receive recommendations (Buy/Sell)" | Regulatory risk |
| "As a user I want real-time streaming prices" | Infrastructure cost vs. benefit |
| "As a user I want to share stocks with friends" | No survey signal, Phase 3+ |

---

## Story map (by user journey)

```
[Discover]           [Analyse]              [Decide]              [Return]
      ↓                    ↓                       ↓                     ↓
US-007 Markets       US-001 Search          US-003 Sources         US-006 Watchlist
                     US-002 Explanation     US-004 AI Chat
                     US-005 Tabs
```
