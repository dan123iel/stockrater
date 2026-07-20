# pondex — PHASE 1: Landing Page

Public marketing page for pondex. Standalone static page — no backend, no auth, no live data.
All scores, verdicts, and metrics are static realistic mockups.

**Design system:** → `docs/brainstorming/design-system/BUNGEE-DESIGN-SYSTEM.md` (single source of truth, do not duplicate here)

---

## TECH STACK

- React + Vite
- Tailwind CSS v3 (tokens mapped from BUNGEE-DESIGN-SYSTEM)
- Framer Motion (animations)
- lucide-react (icons)
- Google Fonts: Inter Display + Chivo Mono
- React Router (anchor-scroll navigation)
- No backend, no auth, no Supabase

---

## PAGE STRUCTURE — 12 SECTIONS

### SECTION 1 — Navigation (sticky)

- LEFT: Logo "pondex_"
- RIGHT: Text links "How it works · Pricing" + primary CTA "Get free access →"
- Default: transparent background
- On scroll past 80px: frosted glass (see design system)
- Mobile (≤767px): hamburger → full-screen dark overlay with stacked nav links
- If user is logged in (Phase 2+): replace CTA with "Open App →"

---

### SECTION 2 — Hero (dark, full viewport height)

**Eyebrow:** `[ Stock Research — Rebuilt ]`

**H1:**
```
Confident verdict.
60 seconds.
```

**Subline:**
> Every stock. Plain language. Every number with a named source.
> No noise. No jargon. No five tabs.

**CTAs:**
- Primary: "Analyse a stock — it's free" → scrolls to #demo
- Ghost: "How it works ↓" → scrolls to #how-it-works

**Right side (desktop only) — Floating Score Card:**
- Header: "AAPL · Apple Inc." + `[DEMO]` badge (not LIVE — static mockup)
- Score: "78 / 100"
- Label: "Good Fit — Value Strategy"
- 3 source-cited data rows:
  - `P/E Ratio: 28.4x — below sector avg · Source: Yahoo Finance · TTM`
  - `FCF Yield: 4.2% · Source: SEC 10-K Filing · 2024`
  - `Gross Margin: 44.1% · Trending up · Source: Yahoo Finance · TTM`
- Disclaimer: `⚠ Research tool only. Not financial advice.`
- Card animation: infinite float (y: -8 ↔ +8, 3s)
- Card hidden on mobile (≤767px)

---

### SECTION 3 — Pain Points Marquee (thin strip)

Infinite horizontal scroll of real user research quotes:

```
"I have 5 tabs open and still don't know what to do" ·
"ChatGPT gives numbers with no source" ·
"I don't know if a P/E of 28x is cheap or expensive" ·
"I paid for Bloomberg. Still noisy." ·
"2 hours of research. Gut decision anyway." ·
"I can't tell what the chart is telling me"
```

---

### SECTION 4 — Problem Statement (light, id="problem")

**Eyebrow:** `[ The Problem ]`

**H2:** Five tabs. / Two hours. / One gut decision.

Three columns, fade-up on scroll:

**01 — Data Without Context**
Yahoo Finance shows P/E: 28x. But is 28x cheap or expensive for this company, in this sector, with this growth rate? No free tool answers that. They display — they don't interpret.

**02 — No Audit Trail**
58% of investors only trust AI output when every number cites its exact primary source and formula. Not a tooltip. Not optional. And no free tool does this by default.

**03 — Research Fragmentation**
The average retail investor opens 4–5 tools before a trade: ChatGPT → Yahoo Finance → broker → YouTube. Then a gut call anyway. The information exists — it's just scattered, unfiltered, and disconnected from any personal context.

*Based on Survey Wave 1 (n=56) and Wave 2 (n=35), July 2026.*

---

### SECTION 5 — How It Works (dark, id="how-it-works")

**Eyebrow:** `[ How pondex works ]`

**H2:** Three steps. / Under 60 seconds.

**01 — Enter any ticker**
Type AAPL, NVDA, or any stock. pondex pulls live data from Yahoo Finance and SEC filings — not a cached database.

**02 — Get a plain-language verdict**
Every factor is explained before the score. No P/E without an explanation of what P/E means. Explanation first — score as conclusion.

**03 — See every source**
Every number traces back to a named primary source with a date. "Yahoo Finance – TTM." "SEC 10-K – 2024." Not "our algorithm says so."

---

### SECTION 6 — Feature Showcase (light, alternating left/right)

**Eyebrow:** `[ What you get ]`

**H2:** Built for the way / you actually decide.

4 features, alternating: left text + right mockup, then flip.

**Feature 1 — The Verdict Card**
Quote: *"Not just what the numbers are — what they mean."*
Body: A single 1–100 score, calculated from P/E, FCF yield, gross margin, insider activity, and valuation multiples — weighted to your investor strategy.
Mockup: Score card 78/100, "Good Fit" label, 3 cited rows.

**Feature 2 — Source Attribution on Every Number**
Quote: *"I don't trust anyone — I need to do my own research."* — José, Finance Professional
Body: 58% of investors will only use AI output when the exact source and formula are shown inline. Every number. Every source. Every time.
Mockup: Single metric row — `P/E 28.4x · Yahoo Finance · TTM · Retrieved Jul 2026`

**Feature 3 — Plain Language. No Jargon.**
Quote: *"Don't assume everyone knows what DCF means."* — Patricia, Passive Investor
Body: Every metric has an inline plain-language explanation. No prior finance knowledge assumed.
Mockup: Factor card showing "P/E ratio: how much investors are paying per dollar of earnings. Lower generally means cheaper." with ⓘ icon.

**Feature 4 — Peer Comparison**
Quote: *"That's how you can actually make a decision."* — José, Finance Professional
Body: Compare any two companies side by side, with the sector average as a third column.
Mockup: Table AAPL vs MSFT vs Sector Avg — metrics: P/E (28.4x / 32.1x / 27.8x), FCF Yield (4.2% / 3.8% / 3.1%), Gross Margin (44.1% / 68.9% / 41.2%), Beta (1.19 / 0.89 / 1.05)

---

### SECTION 7 — Score Demo (dark, id="demo")

**Eyebrow:** `[ Try it ]`

**H2:** See what a real verdict looks like.

Full-width static mockup for NVDA:

```
NVDA · NVIDIA Corporation · $207.06 · ▲ 2.1%   [DEMO]

Score: 71 / 100 · Good Fit — Value Strategy

Fundamentals      ████████████░░░░  3.8 / 5
"Revenue growing 122% YoY. Gross margin 72.7% — above sector avg of 48%."
Source: Yahoo Finance · TTM

Valuation         ████░░░░░░░░░░░░  2.1 / 5
"P/E of 68x is elevated. Priced for continued hyper-growth."
Source: Yahoo Finance · TTM

Management        █████████████░░░  4.2 / 5
"Insider buying exceeded insider selling 3:1 over the past 6 months."
Source: SEC EDGAR · Form 4

Economic Moat     ██████████████░░  4.5 / 5
"Gross margin trending upward for 5 consecutive quarters."
Source: Yahoo Finance · TTM

Risk Profile      ████████░░░░░░░░  3.0 / 5
"Beta 1.68 — moderate-high volatility."
Source: Yahoo Finance · Market Data

Data: Yahoo Finance · SEC EDGAR · Updated: July 2026
⚠ Research tool only. Not financial advice. Not a buy/sell recommendation.
```

Score bars: filled with brand gradient left to right.
Below mockup: primary CTA — "Analyse your first stock — free →"

---

### SECTION 8 — Research Evidence + Testimonials (light)

**Eyebrow:** `[ Built on real evidence ]`

**H2:** Everything you see was validated with real investors.

Left — methodology:
- Survey Wave 1: n=56 retail investors, June 2026
- Survey Wave 2: n=35 retail investors, July 2026
- 3 depth interviews: passive investor, value investor (churned), finance professional
- 91 total respondents + 3 qualitative sessions

Right — 3 quote cards:

> "The score is much better than a raw price. Undervalued/overvalued with a number — that's what I need."
> — Gunnar, Value Investor

> "I find it amazing. Gen-Z mindset — rate everything out of ten."
> — Patricia, Passive Investor

> "I really like the comparison part. That's how you can actually make a decision."
> — José, Finance Professional

---

### SECTION 9 — Pricing (dark)

**Eyebrow:** `[ Pricing ]`

**H2:** Start free. Upgrade when you need more.

Monthly/yearly toggle. Yearly: ~~€59.88~~ → **€49.99/year**

**Free — €0/month**
- 1 full verdict per day
- Source attribution on every number
- Plain-language explanations
- Price chart (1d/1m/3m/1y/max)
- No account required
- CTA: "Start for free →" (ghost button)

**Pro — €4.99/month** (badge: "Most popular")
- Unlimited verdicts
- Peer comparison (2 companies + sector average)
- DCF model + stress test
- Watchlist + portfolio tracker
- Weekly digest email
- AI chat with source attribution
- CTA: "Start 7-day trial →" (primary button)
- Pro CTA in Phase 1: links to email capture / waitlist (no Stripe yet)

*No credit card required for free tier. Cancel anytime.*

---

### SECTION 10 — FAQ (dark, accordion)

**Eyebrow:** `[ FAQ ]`

**H2:** Common questions.

**Is pondex financial advice?**
No. pondex is a research tool that helps you understand financial data. Every verdict includes a disclaimer. We show you what the numbers mean — the decision is always yours.

**Where does the data come from?**
Live data from Yahoo Finance and SEC EDGAR filings. Every number displays its source and retrieval date. No black-box algorithms — full audit trail.

**How is the score calculated?**
The 1–100 score is derived from P/E ratio, FCF yield, gross margin, operating margin, revenue growth, insider transaction ratios, and valuation multiples. Each metric is weighted by your investor strategy: value, growth, dividend, or momentum.

**Do I need to create an account?**
No. The free tier requires no account. Your investor profile is stored locally in your browser — nothing is sent to any server.

**Is the free tier really free?**
Permanently free — 1 full verdict per day, no credit card required.

**ChatGPT sometimes gives wrong numbers. How is pondex different?**
Every number includes a source badge with the data provider and retrieval date. If a data point is stale (>24h old), we flag it visibly. We do not generate numbers — we retrieve and cite them.

---

### SECTION 11 — Final CTA (dark)

**H2:**
```
Stop guessing.
Start verifying.
```

Subline: Your first verdict takes 60 seconds. No account. No credit card.

CTA: "Analyse a stock now — it's free →"

Small: *Used by investors across Europe and Latin America · Built on real user research · v1.0 · July 2026*

---

### SECTION 12 — Footer (dark)

LEFT: Logo "pondex_" + tagline "Research with a clear audit trail."
Social: Twitter/X, LinkedIn

CENTER:
- Product: How it works · Pricing · Changelog
- Legal: Privacy · Terms · Disclaimer

RIGHT: Newsletter — "Get research insights — no spam." + email input + Subscribe button

Bottom: `© 2026 pondex · Not financial advice · Data: Yahoo Finance & SEC EDGAR`

---

## ANIMATIONS

1. Hero H1 words: stagger 0.08s, y: 40→0, opacity 0→1 on load
2. All sections: `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 40 }}` + `viewport={{ once: true }}`
3. Score card float: y: -8 ↔ +8, repeat infinite, 3s
4. Pain marquee: x: 0% → -50%, repeat infinite, 25s linear
5. FAQ accordion: AnimatePresence, height 0 → auto, overflow hidden
6. Nav bg: transparent → frosted glass at 80px scroll (useScroll hook)
7. Button hover: top text slides up, bottom text slides in (overflow hidden)
8. Score number: counts up 0→final on scroll into view

---

## COMPLIANCE

Reusable `<Disclaimer />` component — 3 variants:

- `short`: `⚠ Research tool only. Not financial advice.`
- `default`: `⚠ pondex is a research and educational tool. This is not financial advice. Always conduct your own due diligence.`
- `full`: default + "Past performance is not a reliable indicator of future results. Data sourced from Yahoo Finance and SEC EDGAR — accuracy not guaranteed."

Placement:
| Location | Variant |
|---|---|
| Hero score card | short |
| Score demo (Section 7) | full |
| Pricing cards | default |
| Footer | inline text |

---

## FILE STRUCTURE

```
src/
  components/
    Nav.jsx
    Hero.jsx
    PainMarquee.jsx
    ProblemSection.jsx
    HowItWorks.jsx
    FeatureShowcase.jsx
    ScoreDemo.jsx
    Testimonials.jsx
    Pricing.jsx
    FAQ.jsx
    FinalCTA.jsx
    Footer.jsx
    ui/
      Button.jsx
      ScoreCard.jsx
      SourceBadge.jsx
      Disclaimer.jsx
      GradientDivider.jsx
  App.jsx
  index.css
  main.jsx
```

---

## CONTENT RULES

1. Never use "AI-powered" as headline or hero message
2. Brand line: "Research with a clear audit trail."
3. Never show a score without explaining what it means
4. Always show source attribution on every mockup data point
5. Never use "Buy" or "Sell" as a recommendation
6. Brand name: always "pondex_" — lowercase + underscore
