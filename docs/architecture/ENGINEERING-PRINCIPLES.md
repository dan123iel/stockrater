# Engineering Principles — pondex

> These are the beliefs that drive every technical decision in pondex.
> When a decision is unclear, consult this document first.
> They are not rules to follow blindly — they are lenses to apply.
>
> Last updated: 2026-06-21

---

## 1. The user sees investment signals — never broken UI

pondex shows financial data that people use to make real decisions with real money. A blank tile, a wrong number, or a silent failure is not a UX problem — it is a trust problem. Every feature must handle its failure state explicitly and visibly. "Loading..." that never resolves is worse than a clear error message.

**In practice:** Every `fetchFMP` call has an explicit error branch that renders a human-readable message. Every tile has a loading state. No blank screens.

---

## 2. The single-file constraint is a feature, not a bug — respect it

The choice to keep pondex as a single `pondex.html` file was deliberate: zero dependencies, zero build step, deployable anywhere, editable by anyone. This is a real architectural advantage for Phase 1–3.

**In practice:** Do not introduce npm, a bundler, or external JS libraries. If a feature requires significant infrastructure, it belongs in Phase 4. Until then, solve it in vanilla JS or don't solve it.

---

## 3. Every dependency is a liability

pondex has zero npm dependencies and zero external JS libraries. This is a strength — there are no CVEs to patch, no breaking changes to absorb, no abandoned packages to replace.

**In practice:** Before adding any external library, ask: what does it do that we can't do in 50 lines of vanilla JS? If the answer is "not much," write the 50 lines. If the answer is genuinely "a lot," write an ADR before adding it.

---

## 4. Every external API is assumed unreliable

FMP has rate limits (250/day on free tier). FMP deprecated their v3 TTM endpoints in August 2025 without warning. Groq free tier has usage caps. Yahoo Finance has no official API. Any of these can change without notice.

**In practice:** Every API call has a fallback. Tiles degrade gracefully. The scorecard and chart work without any API key at all. Rate limit headroom is protected by a 1-hour cache. When an endpoint breaks, the error message tells the user exactly what happened.

---

## 5. Accuracy matters more than completeness

pondex shows investment signals. Showing a wrong P/E is more dangerous than showing "—". Showing the wrong scorecard because demo data leaked through is worse than no score.

**In practice:** When data is unavailable, show "—" or a clear "No data" message. Never show demo/placeholder data as if it were real. `resetDockLiveValues()` is called on every ticker switch so nothing bleeds through.

---

## 6. Document decisions when you make them

The reason for a technical choice is visible for approximately 48 hours after making it. After that it lives only in the ADR you wrote or in the confusion you left behind.

**In practice:** Every significant decision (why FMP stable instead of v3, why the single-file architecture, why localStorage over IndexedDB) has an ADR or is explained in ARCHITECTURE.md. CHANGELOG.md is updated with every meaningful change, including the *why*.

---

## 7. Simplicity over cleverness — especially in a single file

In a 4,800-line file, clever code is hostile to the next reader (including yourself in 3 months). The function `updateDockTab()` is better than a reactive state system. `buildRatios()` building HTML strings is better than a virtual DOM.

**In practice:** Write the simplest code that correctly solves the problem. Prefer explicit over implicit. Three lines of clear code beat one line of clever code every time.

---

## 8. Phase discipline — don't build Phase 4 features in Phase 3

The roadmap phases exist for a reason. Auth, Supabase, broker APIs, and subscription logic are Phase 4. Building any part of them now adds complexity without delivering value, and couples the single-file app to infrastructure it doesn't need yet.

**In practice:** Any feature that requires a backend, a database, or user accounts goes into the Phase 4 backlog. Current work stays in the single-file constraint.

---

## 9. The user's data is their data — never ours

In Phase 1–3, all user data (portfolio, trades, API keys) lives in their browser. This is a deliberate privacy choice. We do not want their data. We do not need their data. Any feature that would require us to store user data on a server belongs in Phase 4, with proper consent and governance.

**In practice:** No analytics, no tracking, no server-side logging of user behavior in Phase 1–3. See DATA-GOVERNANCE.md.

---

## Applying These in Practice

| Situation | Principle to apply |
|-----------|-------------------|
| "Should I add this npm library?" | Every dependency is a liability |
| "This tile shows blank when the API fails" | The user sees signals — never broken UI |
| "Should I build this abstraction?" | Simplicity over cleverness |
| "Should I add Supabase now?" | Phase discipline |
| "This API endpoint changed and broke everything" | Every external API is assumed unreliable |
| "Should I log this user action to understand usage?" | The user's data is their data |
| "Why did we use the stable FMP endpoint?" | Document decisions when you make them |

---

## What These Principles Are Not

These are not absolute rules. They are the reasoning behind decisions already made.

If you violate a principle, document why in TECH-DEBT.md or an ADR. A conscious, documented trade-off is acceptable. An unconscious one is a problem waiting to surface.

---

*Written: 2026-06-21*
*Review when: any major architectural decision is being made*
