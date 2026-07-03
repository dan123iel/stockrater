# Data Coverage — pondex

> Last updated: 2026-06-22
> This document answers: which stocks work in pondex, which symbol format
> to use per exchange, and what happens when data is incomplete.

---

## The honest answer about worldwide coverage

pondex uses Financial Modeling Prep (FMP) as its data source.
FMP covers ~25,000 stocks. But **coverage is not equal across exchanges**:

| Coverage level | What you get | Example |
|---------------|-------------|---------|
| **Full** | Profile + price + ratios + financials + insiders | AAPL, NVDA, SAP |
| **Profile only** | Company name, price, beta — no fundamentals | Some XETRA primaries |
| **None** | Search finds it, no data at all | Some OTC pink sheets |

---

## Symbol format by exchange

FMP uses different symbol formats depending on the exchange. This matters:
type the wrong format and FMP returns no data even if the stock exists.

### US Exchanges (NYSE, NASDAQ) — Full coverage
```
Format: plain ticker
Examples: AAPL, NVDA, MSFT, JPM, XOM
Notes: Most comprehensive coverage. All endpoints work.
```

### European ADRs on US exchanges — Good coverage
```
Format: plain ticker (same as US)
Examples:
  SAP    → SAP SE (NYSE)
  NVS    → Novartis (NYSE)
  AZN    → AstraZeneca (NASDAQ)
  TTE    → TotalEnergies (NYSE)
  SHEL   → Shell (NYSE)
  BP     → BP (NYSE)
  HSBC   → HSBC (NYSE)
  DB     → Deutsche Bank (NYSE)
  UL     → Unilever (NYSE)

Notes: These are the PREFERRED symbols for European companies in pondex.
       They have full FMP coverage because they trade on US exchanges.
```

### European ADRs on OTC/Pink — Partial coverage
```
Format: ticker ending in Y or F
Examples:
  ALVG   → Allianz SE
  SIEGY  → Siemens AG
  BAYRY  → Bayer AG
  BMWYY  → BMW AG
  VWAGY  → Volkswagen
  EADSY  → Airbus SE
  ADDYY  → Adidas
  NSRGY  → Nestlé
  RHHBY  → Roche
  LVMHF  → LVMH

Notes: Coverage is inconsistent. Profile usually works; ratios may be empty.
       When ratios are empty, pondex shows "limited coverage" warning.
       Prefer NYSE/NASDAQ ADR if available.
```

### XETRA (Germany) — Partial coverage
```
Format: TICKER.DE
Examples: ALV.DE, SIE.DE, SAP.DE, BMW.DE, ADS.DE

Notes: FMP has XETRA data but fundamentals coverage is less complete
       than US exchanges. Profile usually works; ratios often empty.
       Prefer ADR symbol for full analytics.
```

### Euronext (France, Netherlands, Belgium) — Partial
```
Format: TICKER.PA (Paris), TICKER.AS (Amsterdam)
Examples: MC.PA (LVMH), AIR.PA (Airbus), ASML.AS (ASML)

Notes: ASML.AS has good coverage. Others vary.
       ASML trades on NASDAQ as ASML — use that for full data.
```

### SIX (Switzerland) — Partial
```
Format: TICKER.SW
Examples: NESN.SW, ROG.SW, NOVN.SW, UBSG.SW

Notes: Limited coverage on stable API.
       Nestlé (NSRGY), Roche (RHHBY), Novartis (NVS) as ADRs work better.
```

### LSE (London) — Partial
```
Format: TICKER.L
Examples: HSBA.L, BP.L, AZN.L, ULVR.L

Notes: Use NYSE/NASDAQ ADR where possible (BP, HSBC, AZN all trade on US).
```

### Asia — ADR preferred
```
Format: plain ticker (ADR) or TICKER.T (Tokyo), TICKER.HK (Hong Kong)
Examples:
  TSM    → TSMC (NYSE ADR) — full coverage
  BABA   → Alibaba (NYSE ADR)
  TM     → Toyota (NYSE ADR)
  SONY   → Sony (NYSE ADR)
  HMC    → Honda (NYSE ADR)
  SSNLF  → Samsung (OTC) — limited coverage

Notes: Japanese/Korean/Chinese primary exchange symbols rarely have FMP
       fundamentals coverage. Always use the ADR (US-listed) symbol.
```

---

## Coverage decision tree

When a user searches for a stock, pondex should try:

```
1. Is it a known US ticker (NYSE/NASDAQ)?
   → Use directly. Full coverage expected.

2. Is it a company name?
   → FMP search → pick highest-exchange-rank result
   → Prefer NYSE/NASDAQ over XETRA/OTC/PINK

3. Is it an ISIN or WKN?
   → FMP search by ISIN → pick result with best exchange rank

4. FMP search returned a result but ratios are empty?
   → Show "limited coverage" warning
   → Suggest trying the ADR symbol or searching by ISIN
```

---

## Known symbol mappings (correct as of 2026-06)

| Company | Wrong symbol | Correct symbol | Why |
|---------|-------------|---------------|-----|
| Allianz SE | ALV (= Autoliv on NYSE) | ALVG | ALV is a different company on NYSE |
| Volkswagen | VW, VOW3.DE | VWAGY | ADR has better coverage |
| Siemens | SIE, SIE.DE | SIEGY | ADR preferred |
| BMW | BMW, BMW.DE | BMWYY | ADR preferred |
| Adidas | ADS, ADS.DE | ADDYY | ADR preferred |
| Bayer | BAYN.DE | BAYRY | ADR preferred |
| Nestlé | NESN.SW | NSRGY | ADR preferred |
| Roche | ROG.SW | RHHBY | ADR preferred |
| Novartis | NOVN.SW | NVS | NYSE listing |
| ASML | ASML.AS | ASML | NASDAQ listing has full coverage |
| LVMH | MC.PA, LVMH | LVMHF | OTC |

---

## Running the coverage test

```bash
# Test 50 tickers across all major exchanges
FMP_KEY=your_key_here node scripts/test-coverage.js

# Or:
node scripts/test-coverage.js --key your_key_here
```

Output shows:
- ✅ Full coverage (profile + ratios) → full pondex analytics
- ⚠️  Profile only (no fundamentals) → price/company info, scorecard shows "limited"
- ❌ No coverage → try ADR symbol or ISIN search

Run this test after any major FMP API change or quarterly to catch new deprecations.

---

## What to do when a stock has no data

1. **Try the ADR symbol** — most major non-US companies have a US-listed ADR
2. **Try the ISIN** — type the ISIN (e.g. `DE0008404005` for Allianz) and pondex will resolve it via FMP search
3. **Accept partial data** — pondex shows profile + price even without ratios. The scorecard will show "limited coverage" and defaults to neutral 2.5 scores.
4. **Report it** — if a major stock has no coverage that should, note it here under "Known gaps"

---

## Known gaps (as of 2026-06)

| Stock | Problem | Workaround |
|-------|---------|------------|
| Allianz SE (ALVG) | Ratios may be empty on FMP stable | Use ISIN DE0008404005 or accept limited scorecard |
| Korean stocks (Samsung etc.) | Primary exchange not covered | No full-data ADR exists for Samsung |
| Chinese A-shares | Not covered by FMP | Use HK or US ADR where available |

---

*Last updated: 2026-06-22*
*Run `scripts/test-coverage.js` to update with fresh results.*
