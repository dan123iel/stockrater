# Definition of Done — pondex

> A change is not done when the code works on your machine.
> It is done when every relevant item on this checklist is checked.
> Run this as a self-review before considering anything finished.
>
> Last updated: 2026-06-21

---

## The Single-File Context

pondex lives in one HTML file (~4,800 lines). There are no PR reviews, no CI pipeline, no test suite yet. That means **this checklist is your only safety net.** Take it seriously.

---

## Code Quality

- [ ] The change does what the task/decision describes — no more, no less
- [ ] No commented-out code left behind
- [ ] No `console.log`, `debugger`, or debug statements left in
- [ ] No hardcoded API keys or credentials — keys must come from localStorage
- [ ] Variable and function names are clear — a stranger reading the code understands what they do
- [ ] No obvious duplication — reused existing utilities (`fetchFMP`, `fmtB`, `fmtPct`, etc.) where possible
- [ ] New functions follow the naming conventions in CODING-CONVENTIONS.md

---

## Functionality

- [ ] The happy path works as expected in the browser
- [ ] Edge cases handled:
  - [ ] What happens when the FMP key is not set?
  - [ ] What happens when the API returns an error or empty data?
  - [ ] What happens when the ticker has no data (e.g. small-cap with no dividends)?
- [ ] No regressions — switching tickers, navigating between pages, and other tiles still work
- [ ] Dock tabs update correctly after live data loads (`updateDockTab` called)
- [ ] `resetDockLiveValues()` called on ticker switch where relevant

---

## API Calls

- [ ] Every `fetchFMP` / `fetchFMPStable` callback has an explicit error branch
- [ ] Error state shows a human-readable message — never a raw JS error or empty screen
- [ ] Loading state shown before data arrives — never a blank tile
- [ ] FMP endpoint is the correct one — check ARCHITECTURE.md for v3 vs stable routing

---

## UI / Visual

- [ ] Tested in Chrome (primary browser for pondex)
- [ ] No broken layouts or cut-off text
- [ ] Canvas charts: `devicePixelRatio` scaling applied (crisp on retina screens)
- [ ] Dark theme checked — colors use CSS variables, not hardcoded hex
- [ ] Footer appears correctly (via `#shared-footer` — not duplicated inline)
- [ ] No empty states — tiles show a message when data is unavailable, not a blank box

---

## Documentation

- [ ] `CHANGELOG.md` updated under `## [Unreleased]` or today's date section
  - Entry includes: what changed, why it was changed
- [ ] If a new tech debt was created: entry added to `TECH-DEBT.md`
- [ ] If a significant technical decision was made: ADR written in `doc/adr/`
- [ ] If the architecture changed: `ARCHITECTURE.md` updated

---

## Security

- [ ] No user-supplied or API-supplied string interpolated raw into `innerHTML`
  - Use `textContent` or escape properly
- [ ] No new localStorage keys introduced without adding them to CODING-CONVENTIONS.md and DATA-GOVERNANCE.md
- [ ] No secrets or API keys hardcoded anywhere in the file

---

## Final Check

- [ ] Opened `pondex.html` in the browser and walked through the changed feature manually
- [ ] Searched a second ticker after the first to verify no stale data bleeds through
- [ ] Read my own diff — would I be comfortable if someone else read this code tomorrow?

---

> **The rule:** If you can't check every relevant box, the change is not done.
> It is better to take one more hour now than to ship a regression that corrupts user data or shows wrong investment signals.
