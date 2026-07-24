# pondex_ Council Consistency Check — 2026-07-24
_5 Reviewer · 17 Agents · Cross-document audit_

## Overall Verdict

The documentation corpus is substantively complete in intent but structurally fractured in execution. The most critical finding: the product's core trust proposition ("every number cites its source") is actively violated by AAPL showing three different scores across the live product. Regulatory exposure is real and time-bound: Phase D is ~4 weeks away and six GDPR obligations remain unimplemented.

---

## Consistency Issues (cross-document contradictions)

**1. [HIGH] AAPL score: 59 in Hero vs. 78 everywhere else**
Hero.jsx shows 59/100; App.jsx DEMO_DATA shows 78/100. Core trust violation.
Fix: Set AAPL to 78/100 HOLD everywhere. Update Hero.jsx score card.

**2. [HIGH] Persona initials conflict**
WEBSITE-SPEC uses "Patricia M." and "José R." — UX-STRUCTURE-SPEC uses "Patricia P." and "José B."
Fix: UX-STRUCTURE-SPEC is canonical. Update WEBSITE-SPEC-COMPLETE.md.

**3. [HIGH] Survey sample size: n=45 vs. n=56**
UX-STRUCTURE-SPEC §11 header says n=56; everywhere else says n=45.
Fix: n=45 is canonical for Wave 1. Fix UX-STRUCTURE-SPEC line 1045.

**4. [HIGH] ICP ordering: Gunnar is Tertiary in personas.md, Secondary in UX-STRUCTURE-SPEC**
Fix: UX-STRUCTURE-SPEC (2026-07-24) is authoritative. Update personas.md.

**5. [HIGH] Exit Review Screen URL mismatch**
EXIT-STRATEGY-SPEC places it at `/app/portfolio/:ticker/review`. UX-STRUCTURE-SPEC places it as a tab in `/app/stock`.
Fix: `/app/stock` tab is canonical. Update EXIT-STRATEGY-SPEC.

**6. [HIGH] Exit Strategy phase numbering: "Phase 2/3" vs. "Phase E2"**
EXIT-STRATEGY-SPEC and APP-IA use numeric phases. All other docs use letter phases.
Fix: Update both to Phase E2/E3 etc.

**7. [HIGH] Moving averages missing from ROADMAP.md Phase C**
Gunnar's validated request (50/200-day MA) is in TODOS but not in ROADMAP.md.
Fix: Add to ROADMAP.md Phase C task list.

**8. [MEDIUM] Source-trust statistic: 58%, 64%, or 71%?**
Three different values across docs for what appears to be the same finding.
Fix: 71% is the user-facing number (from Wave 1 question). Standardize everywhere.

**9. [MEDIUM] Onboarding question count: 3, 4, or 5?**
UX-STRUCTURE-SPEC Flow 5 = 5; §9 recommendation = 3; WEBSITE-SPEC = 4; ROADMAP = 5.
Fix: 3 questions + skip option is canonical. Update all docs.

**10. [MEDIUM] Landing page section order inconsistent across CLAUDE.md, WEBSITE-SPEC, LANDING-PAGE-GUIDE**
Fix: WEBSITE-SPEC §2.17 (16 sections) is canonical. Update CLAUDE.md.

**11. [MEDIUM] "EXIT" as label vs. prohibited "Exit position" phrase — clarification needed**
Fix: Add note to EXIT-STRATEGY-SPEC: label "EXIT" is permitted; imperative phrasing is not.

**12. [MEDIUM] Watchlist editability missing from CURRENT-TODOS.md**
Fix: Add to CURRENT-TODOS.md Phase C section.

**13. [MEDIUM] CFD waitlist: Alert() vs. Toast**
WEBSITE-SPEC says Alert(); UX-STRUCTURE-SPEC says Toast.
Fix: Toast is canonical. Update WEBSITE-SPEC.

**14. [MEDIUM] "Phase 3" in RoboAdvisor.jsx — user-facing internal language**
Fix: Replace all 4 instances with "Q4 2026". Already documented, not yet done.

**15. [LOW] Bottom nav order conflict: APP-IA vs. UX-STRUCTURE-SPEC**
Fix: UX-STRUCTURE-SPEC §9 order is canonical.

**16. [LOW] REGULATORY.md references archived Analysis.jsx**
Fix: Update to reference App.jsx line 143.

**17. [LOW] REGULATORY.md dated 2025 with stale Q1 2025 deadlines**
Fix: Update to "vor Phase C" / "vor Phase D" framing.

**18. [LOW] Footer disclaimer too short: "Not financial advice" vs. required full form**
Fix: "Research tool only — not financial advice · Data: Yahoo Finance & SEC EDGAR"

---

## Missing Documents (should exist but don't)

1. **ADR-010: Supabase as auth provider** — decision rationale + GDPR DPA implications
2. **ADR-011: Caching strategy** — Redis vs. in-memory, TTL per data type
3. **ADR-012: Stripe as payment provider** — product model, EU consumer protection, VAT
4. **PHASE-C-LAUNCH-CHECKLIST.md** — hard go/no-go gate before Phase C
5. **EXP-001: Cold-audience Reddit test** — template exists, zero experiments executed
6. **EXP-002: Van Westendorp pricing test** — referenced everywhere, never run
7. **ANALYTICS-SPEC.md** — which tool, what events, GDPR consent gate
8. **MOBILE-NAV-SPEC.md** — bottom nav spec for <900px
9. **ONBOARDING-FLOW-SPEC.md** — 3-question flow, skip behavior, Supabase schema
10. **ERROR-STATES-SPEC.md** — API timeout, offline, session expired — unified copy + recovery
11. **GTM / Go-to-Market document** — path from 0 to 1,000 paying users

---

## Missing in Existing Documents

1. **scoring-engine.md**: Default weights per factor (only in source code, not docs)
2. **RISK-REGISTER.md**: 4 unregistered risks (yfinance ToS, MiFID II BUY/SELL framing, GDPR before /privacy, competitor builds in-house score)
3. **personas.md**: Miriam Solis/Aspirer persona decision (in vs. out of ICP)
4. **USER-STORIES.md**: US-011 for 3-question onboarding flow
5. **decision-log.md**: 5 open UX decisions from UX-STRUCTURE-SPEC §9 (not yet formally decided)
6. **metrics.md**: Interim leading indicators for Phase C/D (North Star is unmeasurable until Phase E2)
7. **EXIT-STRATEGY-SPEC.md**: Cross-reference to UX-STRUCTURE-SPEC §13
8. **REGULATORY.md**: "Superseded by" notice → point to UX-STRUCTURE-SPEC §8
9. **dcf-model.md**: DCF tab placement in Stock Detail (promised in Pricing, absent from IA)
10. **ROADMAP.md**: Retention loop documentation (Watchlist + weekly digest = return mechanic)

---

## Missing Features with No Spec

1. **Free Tier Gate** — Specced, not built, advertised on landing page
2. **Exit Check tab placeholder** — Advertised as Feature 04, zero in-app trace
3. **/terms and /privacy** — Templates exist, not deployed, not in App.jsx routes
4. **Account deletion** — GDPR Art. 17, not implemented anywhere
5. **PageNotFound** — File exists, never imported, wildcard → Landing
6. **Scoring factor default weights** — Only in source code, not documented

---

## Regulatory Gaps (ordered by urgency)

| # | Issue | Severity | Blocks |
|---|---|---|---|
| 1 | /terms and /privacy not in App.jsx | HIGH | Phase C |
| 2 | No GDPR consent on Signup.jsx | HIGH | Phase C |
| 3 | No account deletion button | HIGH | Phase D |
| 4 | BUY/HOLD/SELL vs. MiFID II — rename to "SIGNAL" | HIGH | Current |
| 5 | "Phase 3" in RoboAdvisor.jsx user-facing | HIGH | Current |
| 6 | Robo return estimates (8.2%, 11.4%) — disclaimer too small | HIGH | Current |
| 7 | Pre-payment disclaimer checkbox for Stripe | HIGH | Phase E |
| 8 | EU AI Act self-assessment (started Aug 2026) | HIGH | Phase C |
| 9 | ToS/Privacy legal entity placeholders unfilled | HIGH | Phase D |
| 10 | Pricing.jsx advertises unbuilt Pro features without "coming soon" | MEDIUM | Current |
| 11 | No cookie consent banner infrastructure | MEDIUM | Phase C |
| 12 | CFD change column not marked as preview inline | MEDIUM | Current |
| 13 | No DPA with Supabase executed | MEDIUM | Phase D |
| 14 | CFD MiFID II missing platform-specific loss % | LOW | Phase E/F |

---

## Product Strategy Gaps

1. **No canonical value proposition sentence** — expressed differently in every doc
2. **Free Tier Gate not built despite being advertised** — no monetization pressure exists
3. **Retention loop undocumented** — 30-day retention target with no mechanism
4. **Exit Strategy sequenced too late** — biggest differentiator locked to Phase E2 when a static demo could ship in Phase C
5. **Cold-audience validation absent before monetization** — all research is warm network
6. **Peer comparison locked behind Pro** — most validated feature can't drive upgrade desire if users never see it
7. **Phase D overloaded** — Auth + GDPR + Profile + Personalization = too much. Split: D1 (auth+GDPR), D2 (profile+personalization)
8. **ICP-to-roadmap traceability missing** — no doc maps each feature to a research finding
9. **Defensibility timeline missing** — when does the user data moat actually kick in?
10. **GTM plan absent** — 0 → 1,000 paying users is entirely undocumented

---

## UX Flow Gaps

1. **Free Tier Gate — zero implementation** (localStorage counter + modal)
2. **Onboarding banner on first-session Stock page** — navigate works, banner missing
3. **Wildcard route → Landing instead of PageNotFound**
4. **portfolioValue = raw price sum** — meaningless number, always show "N stocks tracked"
5. **AAPL score 59 vs. 78** — single highest trust-destroying element
6. **PEER_MAP includes AMD, INTC, ASML** — outside demo set, click → error
7. **Robo Advisor Back on step 0 exits silently** — should confirm or hide button
8. **Watchlist hover: paddingLeft animation** → should be `transform: translateX(4px)`
9. **Exit Check tab has zero in-app presence** despite being advertised as Feature 04
10. **Transactions tab is a dead end** — no CTA, no next step
11. **Collections cards: cursor:pointer but no click handler** — includes non-demo tickers
12. **Login: no "Forgot password?" placeholder**
13. **Mobile: no responsive AppNav at <900px**
14. **No personalization prompt after first analysis**
15. **Home.jsx events includes META** (no demo data) — should be AMZN/MSFT
16. **Portfolio Account: "Member since: 2026" hardcoded** — derive from createdAt

---

## Priority Action List (Top 10)

1. **Fix AAPL score: Hero 59 → 78** — trust violation on core promise. 1-line fix.
2. **Add /terms and /privacy to App.jsx + deploy templates** — GDPR gate before Phase C.
3. **Replace "Phase 3" in RoboAdvisor.jsx with "Q4 2026"** — 4-line fix, user-facing now.
4. **Add GDPR consent line to Signup.jsx** — 1-line JSX, required before Phase D.
5. **Add Delete Account to Portfolio Account tab** — GDPR Art. 17, required before Phase D.
6. **Implement Free Tier Gate** — advertised limit that doesn't exist. No upgrade pressure without it.
7. **Add "Exit Check" tab placeholder** — advertised as Feature 04, zero in-app trace.
8. **Complete EU AI Act self-assessment** — full application since August 2026.
9. **Fix PEER_MAP + wire PageNotFound** — broken navigation, 10-minute combined fix.
10. **Run cold-audience Reddit test before Phase E** — all research is warm network bias.
