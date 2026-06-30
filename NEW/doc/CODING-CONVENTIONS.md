# Coding Conventions — pondex

> These are the rules for writing code in pondex.
> Consistency matters more than personal preference.
> When in doubt: follow the existing code, then improve it.
>
> Last updated: 2026-06-21

---

## The One Rule Above All Others

**pondex.html is a single file. Every line you write is visible to every future reader with no module boundaries to hide behind. Write accordingly.**

---

## General Principles

1. **Readable over clever** — code is read 10× more than it is written
2. **One function, one job** — if you can't name it in 3 words, it's doing too much
3. **Return early** — avoid deep nesting; guard at the top, execute at the bottom
4. **No surprises** — a function named `buildRatios(body)` builds ratios in `body`. Nothing else.
5. **Explicit error handling** — no silent failures. Every API call has an error path visible to the user.

---

## Language & Compatibility

pondex uses **vanilla JavaScript** with no transpiler. This means:

- Write code that runs directly in the browser — no Babel, no TypeScript, no JSX
- ES6 features are fine: `const`, `let`, arrow functions, template literals, destructuring
- Do **not** use: optional chaining (`?.`), nullish coalescing (`??`), top-level `await`, or anything that requires transpilation
- When in doubt, check [caniuse.com](https://caniuse.com) — target: Chrome 90+, Firefox 88+, Safari 14+

---

## Naming Conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Variables | camelCase | `currentTicker`, `isLoading`, `fmpData` |
| Functions | camelCase, verb-first | `buildRatios()`, `updateDockTab()`, `fetchFMPStable()` |
| Constants (module-level) | SCREAMING_SNAKE_CASE | `FMP_BASE`, `FMP_TTL`, `DEFAULT_WEIGHTS` |
| DOM IDs | kebab-case | `tile-detail`, `fng-canvas`, `an-dock` |
| CSS variables | `--f-` prefix, kebab-case | `--f-bg`, `--f-text`, `--f-accent` |
| Tile builder functions | `build` prefix | `buildScorecard()`, `buildChart()`, `buildDCF()` |
| Data fetch functions | `fetch` prefix | `fetchFMP()`, `fetchFMPStable()` |
| Dock update | `update` prefix | `updateDockTab()`, `updateFmpStatus()` |
| Page navigation | `G()` | Only this function navigates between pages |

---

## File Structure

pondex is currently a single file. These are the internal section conventions:

```
pondex.html
│
├── <style> block
│     └── CSS variables → base styles → component styles → page-specific
│
├── <body>
│     ├── #nav, #ticker-wrap, modals (shared chrome)
│     └── .page divs (one per page — home, markets, analytics, etc.)
│
└── <script> block
      ├── TILE_DEFS — tile configuration object
      ├── NAV / routing — G(), buildNav(), showPage()
      ├── FMP DATA LAYER — FMP_BASE, FMP_CACHE, fetchFMP(), fetchFMPStable()
      ├── TILE BUILDERS — buildScorecard(), buildChart(), buildRatios(), etc.
      ├── MACRO DASHBOARD — setMacroTab(), buildMacroOverview(), etc.
      ├── PORTFOLIO — portfolio CRUD, journal
      ├── ONBOARDING — OB_QUESTIONS, renderOnboardStep(), applyStrategyProfile()
      ├── CANVAS RENDERERS — redrawChart(), drawBreadth(), drawFnG()
      └── INIT — init() runs on DOMContentLoaded
```

When adding a new section, insert it in the correct logical zone. Do not append everything to the bottom.

---

## Functions

- **Maximum 40 lines per function** — if it's longer, split it. Tile builders (`buildScorecard`, etc.) are the exception — they construct HTML strings and may be longer, but the logic inside must remain readable.
- **Maximum 3 parameters** — if you need more, use an options object
- **Return early** — guard conditions at the top

```javascript
// Good — return early
function updateDockTab(id, val, sub, cls) {
  if (!TILE_DEFS[id]) return;
  TILE_DEFS[id]._liveVal = val;
  // ...
}

// Avoid — nested conditions
function updateDockTab(id, val, sub, cls) {
  if (TILE_DEFS[id]) {
    if (val) {
      // ...
    }
  }
}
```

---

## API Calls

Every `fetchFMP` or `fetchFMPStable` call **must** have an explicit error branch that renders a human-readable message in the tile. No silent failures.

```javascript
// Good
fetchFMPStable('/ratios?symbol=' + currentTicker + '&period=TTM', function(data, err) {
  if (err || !data) {
    body.innerHTML = '<div ...>Unable to load ratios. ' + err + '</div>';
    return;
  }
  // proceed with data
});

// Bad — silent failure, user sees "Loading..." forever
fetchFMPStable('/ratios?symbol=' + currentTicker + '&period=TTM', function(data, err) {
  var r = (data && data[0]) ? data[0] : {};
  // err silently ignored
});
```

---

## Dock Tab Updates

Whenever a tile builder resolves live data, it **must** call `updateDockTab(id, val, sub, cls)`.

```javascript
// After data loads, always update the dock:
updateDockTab('ratios', 'P/E ' + fmtX(pe), peGood ? 'Cheap' : 'Pricey', '');
```

If a tile has no live API data (e.g. Scorecard, which runs locally), call `updateDockTab` at the end of the builder function.

---

## Comments

Write comments only when the **why** is not obvious from the code. Never explain what the code does — the names should do that.

```javascript
// Good — explains a non-obvious constraint
// FMP /ratios-ttm is deprecated for accounts created after Aug 2025.
// Use /stable/ratios?symbol=X&period=TTM instead.
fetchFMPStable('/ratios?symbol=...');

// Bad — describes what the code already says
// Fetch the ratios from FMP
fetchFMPStable('/ratios?symbol=...');
```

**Never commit:**
- Commented-out code
- `console.log` debug statements
- `// TODO` without a linked entry in TECH-DEBT.md or a GitHub issue

---

## CSS Rules

- All custom CSS classes use the `f-` prefix (pondex design prefix) — e.g. `.f-card`, `.f-nav`, `.f-tape`
- No inline `style=""` attributes for anything that can be expressed as a class
- Inline styles are acceptable **only** for dynamic values that come from JavaScript (e.g. a width percentage computed at runtime)
- Theme values always use CSS variables — never hardcode colors like `#1db954` in new CSS (only in JS canvas code where CSS variables are not accessible)

---

## HTML in JavaScript

Tile builders construct HTML strings and assign them to `body.innerHTML`. This is acceptable in the current architecture. Rules:

- **Never interpolate user-supplied strings** directly into HTML without sanitization — always use `encodeURIComponent()` or `textContent` for anything that came from outside the app
- FMP API data (company names, headlines) that goes into HTML must be treated as untrusted — escape it or use `textContent`
- Static strings in template literals are fine

---

## localStorage Keys

All localStorage keys must use the `pondex_` prefix to avoid collisions with other apps:

| Key | Type | Purpose |
|-----|------|---------|
| `pondex_fmp_key` | string | FMP API key |
| `pondex_groq_key` | string | Groq API key |
| `pondex_portfolio` | JSON array | Portfolio holdings |
| `pondex_trades` | JSON array | Trade journal |
| `pondex_strategy_profile` | JSON object | Horizon, risk, focus, weights |
| `pondex_watchlist` | JSON array | Saved tickers |
| `pondex_theme` | string | `dark` or `light` |
| `pondex_onboarded` | string | `1` if onboarding completed |

Do not use legacy keys (`sr_portfolio`, `fmpApiKey`, etc.) in new code. See TECH-DEBT.md TD-006.

---

## What to Check Before Every Change

- [ ] Does the function name describe exactly what it does?
- [ ] Is the error path handled and visible to the user?
- [ ] Did I call `updateDockTab()` if the tile loads live data?
- [ ] Did I call `resetDockLiveValues()` if switching tickers?
- [ ] Are there any `console.log` statements left in?
- [ ] Is any user-supplied or API-supplied string interpolated raw into `innerHTML`?
- [ ] Is `CHANGELOG.md` updated under `[Unreleased]`?

---

*These conventions apply to all new code from 2026-06-21 onwards.*
*Existing violations are tracked in TECH-DEBT.md — fix them when you touch that area.*
