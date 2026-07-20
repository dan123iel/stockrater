# pondex — Regulatory Council

_Last updated: 2026-07-16_
_Trigger: Before every phase transition. Before any feature touching user data, payments, or AI output goes live._

---

## Purpose

The Regulatory Council is a structured review process that runs before every phase launch and before any feature that touches:
- User data / personal information
- AI-generated financial output
- Payment flows
- Geographic expansion
- New data sources

It is not a legal opinion. It is a systematic risk-identification process that tells the team: **what needs a lawyer, what needs a policy change, and what is safe to ship.**

---

## Council Composition (5 Roles)

Each review simulates the perspective of these five experts. In practice: one person runs all five roles sequentially, or the team assigns one role per person.

### 1. EU Compliance Counsel
**Focus:** MiFID II, GDPR, EU AI Act, DSGVO (German implementation)
**Key question:** "Would a BaFin examiner classify this feature as investment advice or high-risk AI?"
**Veto power over:** Any feature using "recommendation", "should", "buy", "sell" language. Any server-side storage of personal financial data without lawful basis documented.

### 2. US Securities Counsel
**Focus:** SEC Investment Adviser Act 1940, FINRA rules, FTC guidelines
**Key question:** "Does this feature require registration as an Investment Adviser under US law?"
**Veto power over:** Any personalized recommendation feature targeting US users. Affiliate disclosures. Any claim of "alpha generation."

### 3. Data Privacy Officer (DPO)
**Focus:** GDPR Articles 5–22, CCPA, data minimisation, right to erasure
**Key question:** "What personal data does this feature collect, for how long, and can a user delete it?"
**Veto power over:** Any new data collection without documented lawful basis. Any third-party data sharing without DPA in place.

### 4. Product Risk Manager
**Focus:** Operational risk, data quality risk, liability exposure
**Key question:** "If this feature shows a wrong number and a user loses money, what is our exposure?"
**Veto power over:** Any feature displaying financial data without source + date attribution. Any AI output without disclaimer.

### 5. Consumer Protection Advocate
**Focus:** User-facing language, dark patterns, vulnerable users
**Key question:** "Could a financially inexperienced user misinterpret this as advice?"
**Veto power over:** Any pricing dark pattern. Any paywall that obscures free-tier limitations. Any score display without plain-language explanation.

---

## Review Protocol — 4 Steps

### Step 1: Feature Brief (before building)
Write 3 sentences:
1. What does this feature do?
2. What data does it touch?
3. What does it show to the user?

### Step 2: Council Scan (each role, max 10 min each)
Each council role answers:
- **Red flag?** (yes/no — if yes, describe)
- **Required before ship:** (specific action, or "none")
- **Monitor after ship:** (what to watch)

### Step 3: Verdict
- **Green:** Ship as-is
- **Amber:** Ship with specific changes (listed)
- **Red:** Do not ship — requires legal consultation or architectural change

### Step 4: Log Entry
Add one row to the Phase Compliance Log below.

---

## Phase Compliance Log

### Phase 1 — Landing Page (July 2026)

| Check | EU Counsel | US Counsel | DPO | Risk Mgr | Consumer | Verdict |
|---|---|---|---|---|---|---|
| Disclaimer visible on all scores | ✅ | ✅ | ✅ | ✅ | ✅ | **Green** |
| No "buy/sell" language | ✅ | ✅ | ✅ | ✅ | ✅ | **Green** |
| Source attribution on all mock-up data | ✅ | ✅ | ✅ | ✅ | ✅ | **Green** |
| No server-side user data (localStorage only) | ✅ | ✅ | ✅ | ✅ | ✅ | **Green** |
| "No account required" claim | ✅ | ✅ | ✅ | ✅ | ⚠ Correct only while no auth exists | **Amber — update copy before Phase 2 launch** |

**Phase 1 Council Verdict: Green to ship. One amber item tracked.**

---

### Phase 2 — Auth + Payments (before September 2026 launch)

**Status: Pre-review — all items open.**

| Check | Required Before Ship | Owner | Status |
|---|---|---|---|
| Privacy Policy published (GDPR Art. 13/14) | Yes — mandatory before any account creation | Legal / Daniel | ❌ Open |
| Terms of Service published | Yes — mandatory before Stripe paywall | Legal / Daniel | ❌ Open |
| Data Processing Agreement with Supabase | Yes — GDPR Art. 28 | Daniel | ❌ Open |
| Data Processing Agreement with Railway | Yes — GDPR Art. 28 | Daniel | ❌ Open |
| Right-to-erasure mechanism (GDPR Art. 17) | Yes — user must be able to delete account + all data | Engineering | ❌ Open |
| Data retention policy documented | Yes — how long are verdicts/portfolio data kept? | Product | ❌ Open |
| Cookie/consent banner if any tracking added | Yes if analytics added | Engineering | ❌ Open |
| Paywall disclaimer ("not investment advice") before payment | Yes — show and require acknowledgement | Engineering | ❌ Open |
| EU AI Act classification assessment | Yes — is pondex a "high-risk AI system"? | Legal consultation | ❌ Open |
| Jurisdiction decision (DE law? EU law? Which court?) | Yes — required for ToS | Legal / Daniel | ❌ Open |
| Google OAuth data handling documented | Yes — what does Google share, what do we store? | Engineering | ❌ Open |
| Stripe DPA in place | Yes — Stripe is a data processor | Daniel (Stripe Dashboard) | ❌ Open |

**Phase 2 Council Verdict: ⛔ Do not launch until all 12 items resolved.**

---

### Phase 3 — Live Data + Scoring (before Q4 2026)

**Status: Future — review opens when Phase 2 complete.**

| Check | Notes |
|---|---|
| Yahoo Finance terms of service review | Inofficial API — assess at >1k MAU. May require switch to paid provider. |
| SEC EDGAR usage policy | Currently free, but rate limits apply. Document compliance. |
| MiFID II licence assessment (EU) | If personalized score is marketed as "advice" → requires authorisation. |
| Scoring model disclaimer | Must explicitly state model is unvalidated, not a financial forecast. |
| Data freshness SLA | If data >24h old is shown without warning → potential liability. |
| Insider trade data (Form 4) | Public data — low risk. Verify EDGAR terms allow commercial use. |

---

### Phase 4 — Growth / Affiliate (2027)

| Check | Notes |
|---|---|
| Affiliate disclosure (FTC Rule 16 CFR Part 255) | Any commission-based referral requires clear disclosure in content. |
| SEC Investment Adviser registration (US) | If US users are targeted with personalized recommendations → assess threshold. |
| MiFID II licence (EU) | If affiliate content crosses into "personalized advice" territory. |
| Newsletter financial content rules | Newsletters discussing specific stocks may require regulatory disclosure in EU. |

---

## Key Regulatory References

### EU
- **MiFID II** (Directive 2014/65/EU): Investment advice definition, exemptions for "general information"
- **GDPR** (Regulation 2016/679): Full text — especially Art. 5 (principles), Art. 13/14 (transparency), Art. 17 (erasure), Art. 28 (processors)
- **EU AI Act** (Regulation 2024/1689): Annex III — high-risk AI systems list; financial sector assessment
- **DSGVO** (German GDPR implementation): Applies to German users; substantively identical to GDPR
- **BaFin**: German financial regulator — publishes guidance on "information vs. advice" boundary

### US
- **Investment Advisers Act 1940** (15 U.S.C. § 80b): Defines "investment adviser"; registration thresholds
- **SEC Release IA-1092**: Guidance on internet investment advice; the "business standard" test
- **FTC Rule 16 CFR Part 255**: Endorsement and testimonial disclosures; affiliate marketing
- **FINRA**: Applies if broker-dealer activity — currently not applicable to pondex

### Data
- **GDPR Art. 28**: Data Processing Agreements with sub-processors (Supabase, Railway, Stripe, Groq)
- **Schrems II**: US-EU data transfers — Supabase EU hosting option resolves most issues

---

## Minimum Legal Documents Required (with Phase)

| Document | Required By | Template Location | Status |
|---|---|---|---|
| Privacy Policy | Before Phase 2 (any account creation) | `docs/regulatory/PRIVACY-POLICY-TEMPLATE.md` | ❌ Not written |
| Terms of Service | Before Phase 2 (paywall) | `docs/regulatory/TERMS-OF-SERVICE-TEMPLATE.md` | ❌ Not written |
| Cookie Policy | Before Phase 2 (if analytics) | Merge into Privacy Policy | ❌ Not written |
| Data Retention Policy | Before Phase 2 | Add section to Privacy Policy | ❌ Not written |
| DPA — Supabase | Before Phase 2 | Supabase provides standard DPA — sign in dashboard | ❌ Not signed |
| DPA — Railway | Before Phase 2 | Railway provides DPA — request via support | ❌ Not signed |
| DPA — Stripe | Before Phase 2 | Stripe DPA auto-included in ToS — verify EU addendum | ❌ Not verified |
| DPA — Groq | Before Phase 3 (AI output to users) | Groq provides DPA — sign in dashboard | ❌ Not signed |
| Disclaimer — Score Methodology | Phase 1 ✅ | Inline in app | ✅ Done |
| Disclaimer — Not Financial Advice | Phase 1 ✅ | Inline in app | ✅ Done |

---

## The One Rule That Overrides Everything

> **If a regulator reads pondex output and concludes it is personalized investment advice, the product has a compliance failure — regardless of what the disclaimer says.**

Disclaimers reduce liability. They do not eliminate it. The product must be architected so that the output is genuinely informational, not incidentally informational with a disclaimer bolted on.

This means:
- Scores are "fit to strategy" — not "good investment"
- Exit signals are "thesis conditions changed" — not "consider selling"
- AI output always says "based on public data as of [date]" — not "we believe"
- Every number shows its source — so the user can verify, not just trust

---

_Next review: before Phase 2 launch. Trigger: when Login + Stripe PR is opened._
_Legal consultation required for: EU AI Act classification, MiFID II boundary, jurisdiction selection._
_Recommended: 1 hour with a fintech-specialised lawyer before Phase 2 ships. Cost: ~€300–500. Risk of skipping: significantly higher._
