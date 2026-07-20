# pondex — Lovable Master Prompt (Final)
_Generated: 2026-07-16 · Based on Survey Wave 1 (n=56), Wave 2 (n=35), 3 depth interviews_

---

You are building the public marketing landing page for **pondex** — an AI-powered stock research tool for self-directed retail investors. This is NOT the app itself — it is a standalone marketing/landing page that converts visitors into app users.

---

## TECH STACK

- React + Vite
- Tailwind CSS v3
- shadcn/ui components
- Framer Motion (for all animations)
- Google Fonts: Kanit (headings, weights 400/600/700/800) + Khand (eyebrows, uppercase labels)
- Icons: lucide-react (for all UI icons: arrows, checkmarks, warning icons, chevrons, etc.)
- React Router (single page, anchor-scroll navigation)
- No backend, no auth, no Supabase — pure static marketing page

---

## DESIGN SYSTEM

### CSS Variables — define in index.css:
```css
:root {
  --font-heading: 'Kanit', sans-serif;
  --font-label: 'Khand', sans-serif;
  --fw-bold: 700;
  --fw-semibold: 600;
  --black-1000: #0a0a0a;
  --black-100: rgba(0,0,0,0.1);
  --whitesmoke-1000: #f5f5f5;
  --radius-md: 16px;
  --radius-xl: 999px;
  --spacing-lg: 120px;
  --spacing-xl: 160px;
  --gap-sm: 8px;
  --gap-md: 16px;
  --gap-lg: 24px;
  --gap-xl: 40px;
  --color-accent: #00ff88;
  --color-surface: #0a0a0a;
}
```

### Color rules:
- Dark sections (#0a0a0a bg): white text, #00ff88 for highlights
- Light sections (#f5f5f5 bg): black text
- Accent color used ONLY for key verdicts, score numbers, and primary CTAs

### Typography:
- H1: Kanit 800, 80–120px, line-height 0.95
- H2: Kanit 700, 48–64px
- H3: Kanit 600, 32px
- Eyebrow labels: Khand 600, 13px, uppercase, letter-spacing 0.15em, wrapped in [ ] brackets
- Body: system-ui, 16–18px, line-height 1.6

### Primary Button:
- bg: #0a0a0a, color: white, border-radius: 999px, padding: 14px 28px
- On hover: top text slides up and fades out, bottom text slides in from below (Framer Motion whileHover)
- Use two overlapping text divs with overflow: hidden

---

## PAGE STRUCTURE — 12 SECTIONS IN ORDER

---

### SECTION 1 — Navigation (sticky)

- LEFT: Logo "pondex" in Kanit 700, white
- RIGHT: Links "How it works · Pricing" + primary button "Get free access →"
- On scroll past 80px: bg transitions to rgba(10,10,10,0.95) with backdrop-blur: 20px
- Mobile (≤767px): hamburger → full-screen dark overlay with nav links stacked

---

### SECTION 2 — Hero (dark, full viewport height)

**Eyebrow:** [ Stock Research — Rebuilt ]

**H1 (split word animation on load, stagger 0.08s per word):**
```
Confident verdict.
60 seconds.
```
"verdict" and "60 seconds" in #00ff88.

**Subline (white, 70% opacity):**
> Every stock. Plain language. Every number with a named source.
> No noise. No jargon. No five tabs.

**Two CTAs:**
- Primary: "Analyse a stock — it's free" → scrolls to #demo
- Ghost: "How it works ↓" → scrolls to #how-it-works

**Right side (desktop only) — Floating Score Card mock-up:**
- Ticker header: "AAPL · Apple Inc."
- Score: "78 / 100" in Kanit 800, large, #00ff88
- Label: "Good Fit — Value Strategy"
- 3 source-cited rows:
  - "P/E Ratio: 28.4x — below sector avg · Source: Yahoo Finance"
  - "FCF Yield: 4.2% · Source: SEC 10-K Filing"
  - "Gross Margin: 44.1% · Trending up · Source: Yahoo Finance"
- Disclaimer badge at bottom: "⚠ Research tool only. Not financial advice."
- Card styling: dark bg, thin #00ff88 border, rounded-2xl
- Card animation: Framer Motion infinite float — y: [-8, 8], duration: 3s, repeatType: "reverse"

**Background:** #0a0a0a with CSS grid overlay (1px rgba(255,255,255,0.03) lines, 60px spacing)

---

### SECTION 3 — Pain Points Marquee (dark, thin strip)

Infinite horizontal scroll of real user pain points (from research data), separated by accent dots:

```
"I have 5 tabs open and still don't know what to do"  ·  "ChatGPT gives numbers with no source"  ·  "I don't know if a P/E of 28x is cheap or expensive"  ·  "I paid for Bloomberg. Still noisy."  ·  "2 hours of research. Gut decision anyway."  ·  "I can't tell what the chart is telling me"  ·  "The retargeting email advertised features — not why I invest"
```

- Framer Motion: animate={{ x: ["0%", "-50%"] }}, transition: repeat Infinity, duration: 25, ease: "linear"
- Font: Khand, white 40% opacity, uppercase, 13px
- Duplicate content so seamless loop works

---

### SECTION 4 — Problem Statement (light, #f5f5f5)

**Eyebrow:** [ The Problem ]

**H2:**
```
Five tabs.
Two hours.
One gut decision.
```

Three columns with number + headline + body (fade-up on scroll):

**01 — Data Without Context**
Yahoo Finance shows P/E: 28x. But is 28x cheap or expensive for this company, in this sector, with this growth rate? No free tool answers that. They display — they don't interpret.

**02 — No Audit Trail**
58% of investors only trust AI output when every number cites its exact primary source and formula. Not a tooltip. Not optional. Non-negotiable — and no free tool does this by default.

**03 — Research Fragmentation**
The average retail investor opens 4–5 tools before a trade: ChatGPT → Yahoo Finance → broker → YouTube. Then a gut call anyway. The information exists — it's just scattered, unfiltered, and disconnected.

Small footnote: "Based on Survey Wave 1 (n=56) and Wave 2 (n=35), July 2026."

---

### SECTION 5 — How It Works (dark, id="how-it-works")

**Eyebrow:** [ How pondex works ]

**H2:** Three steps. Under 60 seconds.

Three large numbered steps, horizontal grid (stack vertically on mobile):

**01 — Enter any ticker**
Type AAPL, NVDA, or any stock. pondex pulls live data from Yahoo Finance and SEC filings — not a cached database.

**02 — Get a plain-language verdict**
Every factor explained before the score. No P/E without an explanation of what P/E means. Explanation first — score as conclusion.

**03 — See every source**
Every number traces back to a named primary source with a date. "Yahoo Finance – TTM." "SEC 10-K – 2024." Not "our algorithm says so."

---

### SECTION 6 — Feature Showcase (light, alternating left/right layout)

**Eyebrow:** [ What you get ]

4 features. Alternate: left text + right mock-up, then right text + left mock-up.

**Feature 1 — The Verdict Card**
Quote: "Not just what the numbers are — what they mean."
Body: A single 1–100 score, calculated from P/E, FCF yield, gross margin, insider activity, and valuation multiples — weighted to your investor strategy. Every component explained in plain language.
Mock-up: Score card with 78/100, "Good Fit" label, 3 cited rows

**Feature 2 — Source Attribution on Every Number**
Quote: "I don't trust anyone — I need to do my own research." — José, Finance Professional
Body: 58% of investors will only use AI output when the exact source and formula are shown inline. pondex treats this as a non-negotiable — not a tooltip, not a footnote. Every number, every source, every time.
Mock-up: A single metric row with a source badge: "P/E 28.4x · Yahoo Finance · TTM · Retrieved Jul 2026"

**Feature 3 — Plain Language. No Jargon.**
Quote: "Don't assume everyone knows what DCF means." — Patricia, Passive Investor
Body: Every metric has an inline plain-language explanation. "P/E ratio: how much investors are paying per dollar of earnings. Lower generally means cheaper." No prior finance knowledge assumed.
Mock-up: Factor explanation card with tooltip-style plain-language text

**Feature 4 — Peer Comparison**
Quote: "That's how you can actually make a decision." — José, Finance Professional
Body: Compare any two companies side by side, with the sector average as a third column. The single feature with the strongest unprompted positive reaction across all user tests.
Mock-up: Side-by-side table, AAPL vs MSFT vs Sector Avg, 4 key metrics

---

### SECTION 7 — Interactive Score Demo (dark, id="demo")

**Eyebrow:** [ Try it ]

**H2:** See what a real verdict looks like.

**INTERACTIVE: The demo has two toggle rows.**

**Toggle Row 1 — Stock selector (3 tabs):**
- [ Apple (AAPL) ] [ NVIDIA (NVDA) ] [ Munich Re (MUV2) ]

**Toggle Row 2 — Strategy selector (3 tabs):**
- [ Value ] [ Growth ] [ Dividend ]

When the user changes either toggle, the entire demo card below updates dynamically with matching data. Use React useState for the selected stock and strategy.

**Demo data — define as a JS object with all combinations:**

```js
const DEMO_DATA = {
  AAPL: {
    name: "Apple Inc.",
    price: "$213.40",
    change: "+1.2%",
    scores: {
      value:    { total: 78, label: "Good Fit",    factors: [
        { name: "Fundamentals",    score: 4.1, text: "Revenue $383B, FCF yield 4.2%. Gross margin 44.1% — consistently above sector." },
        { name: "Valuation",       score: 3.2, text: "P/E 28.4x — slightly elevated but below 5yr avg of 31x. Source: Yahoo Finance TTM." },
        { name: "Management",      score: 4.0, text: "Insider buy/sell ratio 0.6. $110B buyback program active. Source: SEC Form 4." },
        { name: "Economic Moat",   score: 4.5, text: "Gross margin trending up 3 consecutive quarters. Strong ecosystem lock-in." },
        { name: "Risk Profile",    score: 3.8, text: "Beta 1.19 — moderate market sensitivity. AA+ credit rating." },
      ]},
      growth:   { total: 65, label: "Neutral Fit", factors: [
        { name: "Fundamentals",    score: 3.2, text: "Revenue growth 2.8% YoY — below growth threshold of 15%. Mature business." },
        { name: "Valuation",       score: 2.8, text: "P/E 28.4x is high for a low-growth company. EV/EBITDA 22x." },
        { name: "Management",      score: 4.0, text: "Capital allocation focused on buybacks, not reinvestment — growth concern." },
        { name: "Economic Moat",   score: 4.5, text: "Services segment growing 14% YoY — partial growth signal." },
        { name: "Risk Profile",    score: 3.8, text: "Beta 1.19 — moderate volatility for a growth portfolio." },
      ]},
      dividend: { total: 71, label: "Good Fit",    factors: [
        { name: "Fundamentals",    score: 4.1, text: "Dividend yield 0.5% — low absolute yield but 12-year growth streak." },
        { name: "Valuation",       score: 3.2, text: "Payout ratio 15% — highly sustainable. Room for continued dividend growth." },
        { name: "Management",      score: 4.5, text: "Consistent dividend growth + $110B buyback. Shareholder-friendly allocation." },
        { name: "Economic Moat",   score: 4.5, text: "Services revenue provides recurring income base supporting long-term dividends." },
        { name: "Risk Profile",    score: 3.8, text: "Beta 1.19 — acceptable for dividend-growth strategy." },
      ]},
    }
  },
  NVDA: {
    name: "NVIDIA Corporation",
    price: "$1,247.40",
    change: "+2.1%",
    scores: {
      value:    { total: 41, label: "Poor Fit",    factors: [
        { name: "Fundamentals",    score: 4.8, text: "Revenue grew 122% YoY. Gross margin 72.7% — exceptional. FCF yield 2.1%." },
        { name: "Valuation",       score: 1.2, text: "P/E 68x — significantly elevated for a value screen. EV/EBITDA 51x. Source: Yahoo Finance." },
        { name: "Management",      score: 4.2, text: "Insider buy/sell ratio 3:1 over past 6 months. Strong alignment signal." },
        { name: "Economic Moat",   score: 4.8, text: "CUDA ecosystem dominance. Gross margin up 5 consecutive quarters." },
        { name: "Risk Profile",    score: 2.0, text: "Beta 1.68 — high volatility. Not suitable for low-risk value mandate." },
      ]},
      growth:   { total: 91, label: "Excellent Fit", factors: [
        { name: "Fundamentals",    score: 5.0, text: "Revenue +122% YoY. Data center revenue +427% YoY. Best-in-class growth." },
        { name: "Valuation",       score: 3.5, text: "P/E 68x is high but justified by 3-year EPS CAGR of 88%. PEG ratio: 0.78." },
        { name: "Management",      score: 4.2, text: "Jensen Huang ownership 3.5%. Insider buying dominant. Long-term orientation." },
        { name: "Economic Moat",   score: 4.8, text: "CUDA lock-in + supply chain dominance = durable competitive advantage." },
        { name: "Risk Profile",    score: 3.2, text: "Beta 1.68 — high but acceptable for a growth portfolio with long horizon." },
      ]},
      dividend: { total: 22, label: "Poor Fit",    factors: [
        { name: "Fundamentals",    score: 4.8, text: "Dividend yield 0.03% — negligible. Not a dividend-generating business currently." },
        { name: "Valuation",       score: 1.0, text: "Payout ratio <1%. No meaningful dividend growth history. Source: Yahoo Finance." },
        { name: "Management",      score: 2.0, text: "Capital allocated to R&D and buybacks — not dividend growth. Wrong mandate." },
        { name: "Economic Moat",   score: 4.8, text: "Strong moat — but irrelevant without dividend yield for this strategy." },
        { name: "Risk Profile",    score: 1.5, text: "Beta 1.68 — too volatile for a dividend income portfolio." },
      ]},
    }
  },
  MUV2: {
    name: "Munich Re",
    price: "€478.20",
    change: "+0.4%",
    scores: {
      value:    { total: 82, label: "Excellent Fit", factors: [
        { name: "Fundamentals",    score: 4.3, text: "Net income €4.6B. Combined ratio 86% — exceptional underwriting discipline." },
        { name: "Valuation",       score: 4.5, text: "P/E 11.2x — well below insurance sector avg of 14x. P/B 1.4x. Source: Yahoo Finance." },
        { name: "Management",      score: 4.0, text: "Dividend paid continuously for 50+ years. No insider selling past 12 months." },
        { name: "Economic Moat",   score: 4.2, text: "Reinsurance oligopoly — top 3 global players take 40% of market. High barriers." },
        { name: "Risk Profile",    score: 4.5, text: "Beta 0.62 — low market sensitivity. Defensive characteristics. DAX blue chip." },
      ]},
      growth:   { total: 48, label: "Neutral Fit",  factors: [
        { name: "Fundamentals",    score: 2.5, text: "Revenue growth 4.1% YoY — below growth threshold. Mature insurance market." },
        { name: "Valuation",       score: 4.5, text: "Low P/E is attractive but doesn't signal growth runway for a growth mandate." },
        { name: "Management",      score: 4.0, text: "Conservative capital allocation — dividend focus over reinvestment for growth." },
        { name: "Economic Moat",   score: 4.2, text: "Strong moat but in a slow-growth industry. Climate risk pricing = long tailwind." },
        { name: "Risk Profile",    score: 4.5, text: "Beta 0.62 — too defensive for a high-growth portfolio mandate." },
      ]},
      dividend: { total: 89, label: "Excellent Fit", factors: [
        { name: "Fundamentals",    score: 4.5, text: "Dividend yield 3.1%. 50+ consecutive years of dividend payments. Source: Munich Re IR." },
        { name: "Valuation",       score: 4.5, text: "Payout ratio 35% — sustainable and growing. Covered 2.8x by free cash flow." },
        { name: "Management",      score: 4.8, text: "Explicit dividend-growth commitment. €1.5B buyback program running in parallel." },
        { name: "Economic Moat",   score: 4.2, text: "Oligopolistic pricing power supports long-term income stability." },
        { name: "Risk Profile",    score: 4.5, text: "Beta 0.62 — ideal low-volatility profile for a dividend income mandate." },
      ]},
    }
  }
}
```

**Demo card layout (updates on toggle change, smooth Framer Motion transition):**
- Stock header: name, price, change
- Large score number (animate from previous value to new value on change)
- Fit label with color coding: Excellent Fit = #00ff88, Good Fit = #88ff00, Neutral Fit = #ffcc00, Poor Fit = #ff4444
- 5 factor rows, each with: name, score bar (0–5), plain-language explanation
- Source strip: "Data: Yahoo Finance · SEC EDGAR · Updated: July 2026"
- Disclaimer: "⚠ Research tool only. Not financial advice. Not a buy/sell recommendation."

Below demo: large CTA "Analyse your first stock — free →"

---

### SECTION 8 — Testimonials / Research Provenance (light)

**Eyebrow:** [ Built on real evidence ]

**H2:** Everything you see was validated with real investors.

Left column — research methodology:
- Survey Wave 1: n=56 retail investors, June 2026
- Survey Wave 2: n=35 retail investors, July 2026  
- 3 depth interviews: passive investor, value investor (churned), finance professional
- 91 total primary survey respondents + 3 qualitative sessions

Right column — 3 quote cards:

Card 1:
> "The score is much better than a raw price. Undervalued/overvalued with a number — that's what I need."
> — Gunnar, Value Investor (previously paid €15–50/month for research tools)

Card 2:
> "I find it amazing. Gen-Z mindset — rate everything out of ten."
> — Patricia, Passive Investor

Card 3:
> "I really like the comparison part. That's how you can actually make a decision."
> — José, Finance Professional

---

### SECTION 9 — Pricing (dark)

**Eyebrow:** [ Pricing ]

**H2:** Start free. Upgrade when you need more.

Monthly/yearly toggle at top. Yearly = 2 months free (show "€59.88" strikethrough → "€49.99/year").

Two cards side by side (stack on mobile):

**Free — €0/month**
- 1 full verdict per day
- Source attribution on every number
- Plain-language explanations
- Price chart (1d / 1m / 3m / 1y / max)
- No account required
- [Start for free →]

**Pro — €4.99/month** (badge: "Most popular")
- Unlimited verdicts
- Peer comparison (2 companies + sector average)
- DCF model + stress test
- Watchlist + portfolio tracker
- Weekly digest email
- AI chat with source attribution
- [Start 7-day trial →]

Small text below cards:
"No credit card required for the free tier. Cancel anytime. Priced at iCloud/Netflix level — it shouldn't require a decision."

---

### SECTION 10 — FAQ (dark, accordion)

**Eyebrow:** [ FAQ ]

**H2:** Common questions.

6 accordion items with Framer Motion AnimatePresence for smooth height animation:

**Is pondex financial advice?**
No. pondex is a research tool that helps you understand financial data. Every verdict includes a disclaimer. We show you what the numbers mean — the decision is always yours.

**Where does the data come from?**
Live data from Yahoo Finance and SEC EDGAR filings. Every number displays its source and retrieval date. No black-box algorithms — full audit trail.

**How is the score calculated?**
The 1–100 score is derived from P/E ratio, FCF yield, gross margin, operating margin, revenue growth, insider transaction ratios, and valuation multiples (EV/EBITDA, P/S). Each metric is weighted by your investor strategy profile: value, growth, dividend, or momentum.

**Do I need to create an account?**
No. The free tier requires no account. Your investor profile is stored locally in your browser — nothing is sent to any server.

**Is the free tier really free?**
Permanently free — 1 full verdict per day, no credit card required. The Pro tier at €4.99/month unlocks unlimited verdicts, comparison, and portfolio tracking.

**ChatGPT sometimes gives wrong numbers. How is pondex different?**
Every number displayed includes a source badge with the data provider and retrieval date. If a data point is stale (>24h old), we flag it visibly. We do not generate numbers — we retrieve and cite them.

---

### SECTION 11 — Final CTA (dark, large)

**H2 (Kanit 800, very large):**
```
Stop guessing.
Start verifying.
```
"verifying" in #00ff88.

Subline: Your first verdict takes 60 seconds. No account. No credit card.

Large primary button: "Analyse a stock now — it's free →"

Small line: "Used by investors across Europe and Latin America · Built on real user research · v1.0 · July 2026"

---

### SECTION 12 — Footer (dark)

LEFT: Logo "pondex" + tagline "Research with a clear audit trail."
Social icons (lucide-react): Twitter/X, LinkedIn — placeholder href="#"

CENTER:
- Product: How it works · Pricing · Changelog
- Legal: Privacy · Terms · Disclaimer

RIGHT: Newsletter:
"Get research insights — no spam."
[Email input] [Subscribe →]

Bottom bar: "© 2026 pondex · Not financial advice · Data: Yahoo Finance & SEC EDGAR"

---

## ANIMATION RULES (Framer Motion)

1. **Hero H1 words:** stagger 0.08s, y: 40→0, opacity: 0→1 on load
2. **All sections:** `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 40 }}` + `viewport={{ once: true }}`
3. **Score card float:** `animate={{ y: [-8, 8] }}`, `transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}`
4. **Pain marquee:** `animate={{ x: ["0%", "-50%"] }}`, `transition={{ repeat: Infinity, duration: 25, ease: "linear" }}`
5. **Demo card transitions:** `AnimatePresence` + `key` prop on score number so it re-animates on stock/strategy change; score number counts up from 0 using `useMotionValue`
6. **Accordion:** `AnimatePresence` with `motion.div` height: 0 → auto
7. **Nav bg:** `useScroll` hook — transition from transparent to dark rgba at 80px scroll
8. **Button hover:** `whileHover` — top text translateY: 0→-100%, bottom text translateY: 100%→0

---

## COMPLIANCE — NON-NEGOTIABLE

Every section containing a score, verdict, or financial metric MUST include:

```jsx
<p className="text-[11px] italic opacity-50 mt-2">
  ⚠ pondex is a research and educational tool. This is not financial advice.
  Always conduct your own due diligence and consult a qualified financial advisor
  before making investment decisions.
</p>
```

This text is non-removable and must appear in: Hero card, Section 7 demo, Section 9 pricing.

---

## RESPONSIVE BREAKPOINTS

- ≥1280px: full desktop layout
- ≤991px: tablet — grids to 2 columns, hero score card hides
- ≤767px: mobile — all grids to 1 column, font sizes −25%, hero score card hidden
- ≤479px: H1 56px, minimal padding

---

## CONTENT RULES — DO NOT DEVIATE

1. NEVER use "AI-powered" as a headline. AI is mechanism, not message.
2. Brand positioning line: "Research with a clear audit trail."
3. NEVER show a score without explanation of what the score means.
4. ALWAYS show source attribution on every mock-up data point.
5. NEVER use "Buy" or "Sell" as a recommendation — regulatory risk.
6. Brand name: always "pondex" — lowercase + trailing underscore. Never "Pondex", "PONDEX", "poindex_".
7. Segment copy:
   - Passive investors: "Tells you what matters in 60 seconds."
   - Active investors: "Bloomberg-quality signal. Fraction of the cost."
   - Beginners: "Research with a clear audit trail — no jargon."

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
    ScoreDemo.jsx         ← interactive, see Section 7
    Testimonials.jsx
    Pricing.jsx
    FAQ.jsx
    FinalCTA.jsx
    Footer.jsx
    ui/
      Button.jsx          (slide-text hover animation)
      ScoreCard.jsx       (reusable mock-up card)
      SourceBadge.jsx     (inline source attribution badge)
      Disclaimer.jsx      (compliance text)
      FactorRow.jsx       (score bar + plain-language explanation)
  data/
    demoData.js           (DEMO_DATA object from Section 7)
  App.jsx
  index.css
  main.jsx
```
