# Naming Conventions

---

## Product Name

**pondex** — always lowercase, no capitalization, no trademark symbol in UI.

---

## Score Labels

| Score | Label |
|---|---|
| ≥ 4.0 | Excellent Fit |
| ≥ 3.3 | Good Fit |
| ≥ 2.5 | Neutral Fit |
| < 2.5 | Poor Fit |

Never use: Strong Buy / Buy / Hold / Avoid (implies financial advice).

---

## Feature Names

| Feature | Name in UI | Notes |
|---|---|---|
| Algorithmic score | "Score" or "Fit Score" | Not "rating," not "recommendation" |
| Confidence indicator | "Confidence" | Always shown as % alongside score |
| Strategy profile | "Your Profile" | Not "settings," not "preferences" |
| Thesis documentation | "Investment Thesis" | Not "note," not "memo" |
| AI explanation tile | "AI Insights" | Not "AI Analysis," not "Smart Summary" |
| Peer comparison | "Compare" | Not "Comparison," not "Peer Matrix" |
| Proactive suggestions | "Ideas" | Not "Recommendations," not "Picks" |

---

## Data Coverage Indicator Labels

| Coverage | Label |
|---|---|
| Data available | ✓ Available |
| Partial data | ⚠ Partial |
| Not available | — Not available for non-US stocks |

---

## Code Naming (JS/CSS)

- CSS variables: `--color-green`, `--surface`, `--border`
- localStorage keys: prefix `pondex` for new keys (legacy `sr_` keys maintained for backward compat)
- Function names: camelCase, verb-first — `buildScorecard()`, `launchAnalytics()`, `renderThesis()`
- IDs: kebab-case — `an-asset-bar`, `thesis-tracker`, `score-confidence`
