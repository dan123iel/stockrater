# pondex_ — Regulatory Requirements for Lovable

Every page that shows financial data must include the correct disclaimers.
These are non-negotiable — some are legal requirements in the EU.

---

## Universal disclaimer (every score card, every verdict)

```
⚠ Research tool only · Not financial advice
```

Must be visible without scrolling on the Stock Analysis page.
Small text is acceptable — but must not be hidden behind a click.

---

## Page-specific requirements

### Stock Analysis page — every tab

Every time a score is shown:
```
Research tool only · Not financial advice
```

In the Learn tab, Data Sources section:
```
Yahoo Finance — price, ratios, financials
SEC EDGAR — official filings: 10-K, 10-Q
Groq AI — plain-language summaries via Llama 3.3

pondex_ is a research tool. All investment decisions are yours.
```

### CFD page — REQUIRED BY LAW (MiFID II)

This warning MUST appear prominently, before the instruments table:
```
⚠ Risk Warning: CFDs are complex instruments with a high risk of
losing money due to leverage. Most retail investors lose money
trading CFDs. pondex_ does not provide investment advice.
```

Do not make this small or hidden. It must be clearly readable.

### Robo Advisor — return estimates

The portfolio type cards show estimated annual returns (+5.1%, +8.2%, +11.4%).
Each must have immediately adjacent text:
```
Historical estimate only — not a guarantee
```

### Exit Check tab

```
Research signal only · Not financial advice
```

The signal labels (HOLD / TRIM / EXIT) are data points, not recommendations.
Never phrase as "You should sell" or "We recommend exiting."

### AI Chat (Phase E3 — future)

Every AI response must include:
```
AI-generated · Always verify sources · Not financial advice
```

---

## Signup page — GDPR requirement

Below the submit button, this text must be visible:
```
By creating an account you agree to our Terms of Service and Privacy Policy.
```

Both "Terms of Service" and "Privacy Policy" must be clickable links to /terms and /privacy.

---

## Footer (all pages)

```
© 2026 pondex_ · Research tool only — not financial advice · Data: Yahoo Finance & SEC EDGAR
```

---

## /terms and /privacy pages

These pages must exist as routes. Content can be placeholder initially but:
- /terms must be reachable from the Signup page
- /privacy must be reachable from the Signup page and Footer
- Pages must state: "Last updated: [date]" and "Governing law: [Germany]"

---

## What pondex_ must NEVER say

These phrases constitute investment advice and must not appear anywhere:
- "You should buy/sell this stock"
- "We recommend purchasing"
- "This stock will increase/decrease"
- "Expected return of X%"
- "Guaranteed performance"

Safe alternatives:
- "BUY signal based on score 84/100" ✓
- "EXIT signal — RSI indicates overbought conditions (78)" ✓
- "Score fell 24 points since you added this stock" ✓
- "Historical estimate: +8.2% p.a. — not a guarantee" ✓
