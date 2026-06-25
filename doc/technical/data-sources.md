# Data Sources

---

## Yahoo Finance (Primary)

**Access:** Unofficial query endpoints via Cloudflare Worker proxy  
**Key required:** No  
**Rate limit:** None known (unofficial, no SLA)  
**Coverage:** 70,000+ global tickers  

| Endpoint | Data | Used for |
|---|---|---|
| `/yahoo/summary/{ticker}` | Financials, margins, P/E, beta | Score, Valuation tile |
| `/yahoo/chart/{ticker}` | OHLC price data | Chart tile, portfolio P&L |
| `/yahoo-news?q={ticker}` | News headlines | News tile |

**Risk:** See RISK-001 in risks.md.

---

## Massive / Polygon (Secondary)

**Access:** Via Cloudflare Worker (key in Worker Secret)  
**Key required:** Yes (MASSIVE_KEY in Worker)  
**Rate limit:** 5 req/min (free tier)  
**Coverage:** US-heavy, some global  

| Endpoint | Data | Used for |
|---|---|---|
| `/v3/reference/tickers/{ticker}` | Company details, exchange | Analytics header |
| `/v3/reference/dividends` | Dividend history | Dividend tile |
| `/v2/aggs/ticker/...` | Historical OHLC | Chart (fallback) |
| `/branding/{path}` | Company logos | Analytics header |

**Note:** Only used where Yahoo Finance doesn't provide the data. Aggressively cached (1h) to protect rate limit.

---

## SEC EDGAR (US Stocks Only)

**Access:** Direct fetch via Worker  
**Key required:** No  
**Rate limit:** Low (public government API)  
**Coverage:** US-listed companies only  

| Endpoint | Data | Used for |
|---|---|---|
| EDGAR Form 4 | Insider transactions | Insider tile, Management Quality score |
| EDGAR XBRL | EPS history | Analyst tile |

**Limitation:** Non-US stocks have no insider or EPS data from this source. Noted in Data Coverage Indicator.

---

## Groq / Llama 3.3 70B (AI)

**Access:** Via Cloudflare Worker (key in Worker Secret, never in browser)  
**Key required:** Yes (GROQ_KEY in Worker)  
**Rate limit:** Free tier limits apply  
**Latency:** ~1–3s (fastest available inference for this model size)  

Used for: AI tile explanations, AI Chat, Discovery suggestions reasoning.

**User option:** Users can provide their own OpenRouter key for alternative models.

---

## Finnhub (Real-time Quotes)

**Access:** Direct WebSocket from browser  
**Key required:** Yes (hardcoded — see RISK-007)  
**Rate limit:** Free tier  
**Coverage:** Major exchanges  

Used for: Ticker tape real-time prices only. Not used for analysis.

---

## Caching Strategy

| Source | Cache Duration | Location |
|---|---|---|
| Yahoo summary | 1 hour | localStorage |
| Yahoo chart | 1 hour | localStorage |
| Ticker details (Polygon) | 24 hours | localStorage |
| Discovery universe | 24 hours | Cloudflare KV |
| News | 30 minutes | localStorage |

**Rationale:** Minimizes API calls, protects rate limits, and enables offline access for recently-fetched data.
