# Now — MVP

**Goal:** Ship the core idea cleanly. A user enters a ticker, understands whether it fits their strategy, and comes back.

**Exit criteria:**
- 500 monthly active users
- 40% 7-day retention
- API error rate < 2%
- JSON backup/restore shipped
- Yahoo Finance graceful fallback implemented

---

## Gap Analysis — Vision vs. Current Code

What the docs say should exist vs. what's actually in `index.html` right now.

### 🔴 Not built — MVP blockers

**1. JSON Backup / Restore**
localStorage data (portfolio, journal, profile, watchlist) can be wiped by a browser cache clear. No export or import exists. This is the highest-priority missing feature.
- Add "Export data" button → downloads `pondex-backup.json`
- Add "Import data" button → restores from file
- Placement: Profile page, prominently above the fold

**2. Yahoo Finance Graceful Fallback**
When Yahoo endpoints return an error, the current code leaves tiles blank or broken. No user-facing fallback message exists.
- Each tile's fetch should catch errors and render: "Data temporarily unavailable — try again later"
- App must never white-screen or throw uncaught errors due to API failure

### 🟡 Exists but wrong — needs fixing before MVP

**3. Score Labels**
Current code uses `Strong Buy / Buy / Hold / Avoid` — which implies financial advice. The docs spec `Excellent Fit / Good Fit / Neutral Fit / Poor Fit`.
- Find all instances of score label strings in `index.html`
- Replace: Strong Buy → Excellent Fit, Buy → Good Fit, Hold → Neutral Fit, Avoid → Poor Fit
- Update CSS class names accordingly

**4. Confidence Score**
Currently: a single line "limited coverage — scores are estimates" for non-US stocks (line 3636). No numeric confidence shown.
- Calculate confidence score (0–100%) per analysis — see `doc/specs/scoring-engine.md`
- Show alongside score: "Score: 4.1 · Confidence: 91%"
- For non-US stocks: show lower confidence with explanation

**5. Data Coverage Indicator**
Currently: nothing. Insider data silently defaults to 2.5 for non-US stocks — user doesn't know why.
- Add a small table per analysis: Financials ✓ · Insider data — · EPS history —
- Placed below the score or in the Scorecard tile header

### 🟢 Exists — verify it works correctly

**6. Reverse DCF**
Not found in code. The DCF tile exists but only goes forward (assumptions → fair value). Reverse DCF (price → implied growth rate) is missing.
- Add to the DCF tile: "At current price of $X, the market implies Y% annual growth for 10 years"
- See `doc/specs/dcf-model.md` for the calculation

**7. AI Explanation in Plain Language**
The AI tile exists. Verify the prompt is profile-aware — does it actually say "As a Growth investor..." or is it generic?
- Check the Groq prompt in the Worker
- Ensure profile (horizon, risk, focus) is injected into context

**8. Disclaimer visibility**
"Algorithmic signal, not financial advice" — verify it's visible without user having to search for it.

---

## Prioritized Build Order

```
1. JSON Backup/Restore          ← highest risk to user (data loss)
2. Score label rename           ← legal/positioning (quick win, 30 min)
3. Confidence Score             ← core product honesty
4. Data Coverage Indicator      ← pairs with Confidence Score
5. Yahoo fallback               ← stability
6. Reverse DCF                  ← MVP feature spec
7. AI prompt audit              ← quality gate before promoting AI features
```

---

## What Stays Out of MVP

- Thesis Tracker (V1)
- Portfolio (V1)
- AI Chat (V2)
- Discovery Engine (V2)
- Broker sync (V4)

---

## Open Questions

- [ ] Confidence Score methodology: count available data points, or weighted by importance?
- [ ] Data Coverage Indicator: inline per tile, or consolidated in Scorecard header?
- [ ] Score label rename: update CSS class names too, or just the display strings?
