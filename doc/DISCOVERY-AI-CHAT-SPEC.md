# Discovery & AI Chat — Feature Specification

> Created: 2026-06-22
> Status: Planned — Intelligence Sprint 4
> This document is the source of truth before any implementation begins.

---

## What this feature is

pondex currently analyzes a stock the user explicitly searches for.
This feature adds the **inverse**: given who you are as an investor,
what should you be looking at?

Two connected parts:

```
PART 1 — Discovery
  User sets preferences → pondex suggests matching stocks

PART 2 — AI Chat with Memory
  User converses with AI → AI learns preferences over time
  → preferences persist → next session, AI already knows who you are
```

---

## Part 1 — Discovery

### The core idea

Instead of: "Analyze AMD"
Discovery does: "Show me German dividend stocks with P/E < 20"

### User preferences model

A user's discovery preferences are defined by:

```javascript
{
  // Geographic
  regions: ['germany', 'europe', 'usa', 'global', 'asia'],  // multi-select
  exchanges: ['XETRA', 'NYSE', 'NASDAQ', 'EURONEXT'],        // optional detail

  // Sector
  sectors: ['technology', 'healthcare', 'finance', 'energy', 'consumer', 'industrials'],
  sectorExclusions: ['defensive', 'utilities'],              // "all except..."

  // Asset class — Phase 1: stocks only
  // Phase 2+: etfs, crypto, bonds, commodities
  assetClass: 'stocks',

  // Fundamental filters (all optional)
  filters: {
    peMax: 20,              // P/E < 20
    dividendYieldMin: 0.03, // Dividend yield > 3%
    grossMarginMin: 0.40,   // Gross margin > 40%
    marketCapMin: 1e9,      // Large-cap only (>$1B)
    revenueGrowthMin: 0.10, // Revenue growth > 10%
  }
}
```

### How suggestions are generated

**Two methods, both needed:**

**Method A — FMP screener** (via `/stable/stock-screener`)
FMP has a stock screener endpoint that accepts sector, exchange, market cap,
P/E range, beta range etc. as query parameters. This returns a filtered list
of tickers that match the criteria.

**Method B — AI interpretation** (via Groq)
User types: "Ich will nur deutsche Pharmawerte mit stabiler Dividende"
AI interprets this into structured filters, calls Method A, returns results.

### What a result looks like

For each suggested stock, show:
- Ticker + company name + exchange + sector
- Key metrics snapshot: P/E, dividend yield, revenue growth, gross margin
- pondex score (if available from cache, or "analyze to score")
- "Analyze →" button → launches full analytics

---

## Part 2 — AI Chat with Memory

### The core idea

Replace the current "AI Insights" one-shot analysis with a **persistent conversation**.

```
Session 1:
  User: "Analyze AMD for me"
  AI: [analysis with all tile data]
  User: "I'm only interested in European stocks actually"
  AI: "Got it — I'll remember that. European focus saved to your profile."

Session 2:
  [User opens pondex]
  AI: "Welcome back. Based on your European focus, here are 3 stocks
       worth looking at today: SAP (Technology, XETRA), Roche (Healthcare,
       SIX), TotalEnergies (Energy, Euronext). Want me to analyze any?"
```

### Memory model

What the AI remembers (stored in localStorage):

```javascript
{
  // Learned from conversation
  preferences: {
    regions: ['europe'],
    sectors: ['technology', 'healthcare'],
    sectorExclusions: [],
    assetClass: 'stocks',
    filters: { peMax: 25, dividendYieldMin: 0.02 }
  },

  // Conversation history (last N messages for context)
  conversationHistory: [
    { role: 'user', content: '...', ts: 1234567890 },
    { role: 'assistant', content: '...', ts: 1234567891 }
  ],

  // Explicit preferences the user stated
  statedPreferences: [
    { text: 'only European stocks', ts: 1234567890 },
    { text: 'no defensive sector', ts: 1234567891 }
  ],

  // Analysis history (which stocks were analyzed, when, what score)
  analysisHistory: [
    { ticker: 'AMD', score: 3.56, date: '2026-06-22', profile: 'Growth/Balanced' }
  ]
}
```

Storage key: `pondex_ai_memory` in localStorage.
Upgrades to Supabase in Phase 4 — same data structure, different storage layer.

### Chat UI design

Replace the current AI Insights tile content with a chat interface:

```
┌─────────────────────────────────────────────────────────┐
│  AI Insights · Groq / Llama 3                      [↺]  │
├─────────────────────────────────────────────────────────┤
│  [AI] Analyzing AMD with your Growth/Balanced profile...│
│                                                         │
│  AMD scores 3.56/5.0 for your profile. Revenue growth  │
│  +35% is strong, but P/E 117× is elevated for a        │
│  balanced investor with your 1–5yr horizon. Insider     │
│  activity is mixed (48% buys). See full analysis below. │
│                                                         │
│  Based on your European preference, you might also      │
│  consider: ASML (semis, Europe), SAP (tech, XETRA).    │
├─────────────────────────────────────────────────────────┤
│  [You] I only invest in European stocks                 │
│                                                         │
│  [AI] Noted — European focus saved. I'll prioritize     │
│  XETRA, Euronext, LSE, and SIX suggestions.            │
├─────────────────────────────────────────────────────────┤
│  Type a question or preference...          [Send]       │
└─────────────────────────────────────────────────────────┘
```

### AI system prompt with memory

The AI receives:

```
You are the pondex investment assistant. You have memory of this user's preferences.

KNOWN PREFERENCES:
- Region: European stocks preferred
- Sector: Technology, Healthcare
- No exclusions set
- P/E filter: max 25×

CURRENT ANALYSIS:
[all 7 data blocks from collectAIContext()]

CONVERSATION HISTORY:
[last 10 messages]

BEHAVIOR:
- When user states a preference ("I only invest in X"), extract it and confirm you've saved it
- When suggesting alternatives, respect the saved preferences
- When asked "what should I look at?", use the FMP screener with saved preferences
- Always ground analysis in the live data provided, not training knowledge
- If asked something outside investment analysis, stay focused
```

---

## MVP scope (Phase 1 — stocks only)

The following is locked scope for Intelligence Sprint 4:

### Sprint 4a — AI Chat UI + Memory
- [ ] Replace AI Insights tile with chat interface (message list + input field)
- [ ] `pondex_ai_memory` localStorage schema
- [ ] AI system prompt reads from memory on every request
- [ ] AI extracts and saves preferences from conversation
- [ ] Conversation history persists across page reloads (last 20 messages)
- [ ] "Clear memory" button in Profile → Data & API

### Sprint 4b — Discovery (stocks only)
- [ ] New "Discovery" page in navigation
- [ ] Filter UI: Region (checkboxes), Sector (checkboxes), Fundamentals (sliders)
- [ ] FMP `/stable/stock-screener` integration
- [ ] Results list: ticker, name, exchange, P/E, yield, pondex score (cached)
- [ ] "Analyze →" button per result → launches Analytics
- [ ] AI interprets free-text input into filters ("German pharma with dividend")
- [ ] Save filter state to `pondex_ai_memory.preferences`

### What is NOT in MVP
- ETFs, crypto, bonds, commodities — Phase 2+
- Multi-user profiles (Phase 4 Supabase)
- Watchlist-based suggestions
- Push notifications
- Portfolio-correlated discovery ("find something uncorrelated to your current holdings")

---

## What you need to build this

### Already available (no new services needed)
- FMP `/stable/stock-screener` — filter by exchange, sector, market cap, P/E, beta, dividend yield etc.
- Groq API — already integrated for AI. Chat format is already supported (array of messages).
- localStorage — already used for all user data.

### What needs to be built
1. `pondex_ai_memory` module — read/write/clear in localStorage
2. Chat UI — message list component (CSS only, no external deps)
3. Preference extractor — AI side-task: "extract preferences from this message"
4. FMP screener integration — new `buildDiscovery()` function
5. Discovery page HTML — new `.page` div, filter controls

### FMP screener endpoint
```
GET /stable/stock-screener
  ?exchange=XETRA,EURONEXT,NYSE
  &sector=Technology,Healthcare
  &marketCapMoreThan=1000000000
  &peRatioLowerThan=25
  &dividendMoreThan=2
  &limit=20
  &apikey=KEY

Returns: [{symbol, companyName, marketCap, price, beta, volume, exchange, industry, sector}]
```

Note: the screener returns symbol list but NOT ratios. After getting the list,
we need to fetch ratios for each — or show just what the screener returns and
let the user click "Analyze" for full data. The second approach is better (avoids
250 API calls for a 20-result screener).

### Groq chat format (already supported)
```javascript
messages: [
  { role: 'system', content: systemPromptWithMemory },
  ...conversationHistory,    // from localStorage
  { role: 'user', content: currentMessage }
]
```
This is a drop-in replacement for the current single-message prompt.

---

## Phase 4 upgrade path

In Phase 4 (Supabase Auth):
- `pondex_ai_memory` migrates to `user_preferences` table in Supabase
- Conversation history migrates to `ai_conversations` table
- Multiple users each get their own memory
- The code interface stays identical — just swap localStorage for Supabase client calls
- This is why localStorage is the right choice now: same data model, trivial migration

---

*Last updated: 2026-06-22*
*Dependencies: Intelligence Sprints 1–3 complete, FMP key active, Groq key active*
*Next step: After Sprint 3 ships → plan Sprint 4a in detail*
