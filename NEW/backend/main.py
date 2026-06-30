"""
pondex_ backend — Yahoo Finance + SEC EDGAR + Groq (Llama 3.3 70B)
Run: uvicorn main:app --reload --port 8000
"""
import os, json, math, time
from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import requests
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="pondex_ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_KEY = os.getenv("GROQ_API_KEY", "")
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY", "")

# ─── CACHE (5 min TTL — reduces Yahoo rate-limit hits) ───────────────────────
_cache: dict = {}
CACHE_TTL = 300

def cached(key: str):
    if key in _cache:
        data, ts = _cache[key]
        if time.time() - ts < CACHE_TTL:
            return data
    return None

def set_cache(key: str, data):
    _cache[key] = (data, time.time())
    return data

def yf_info(ticker: str) -> dict:
    """Get yfinance info with graceful 429 handling."""
    t = yf.Ticker(ticker)
    try:
        info = t.fast_info  # faster, less rate-limited
        base = {
            "currentPrice": getattr(info, "last_price", None),
            "previousClose": getattr(info, "previous_close", None),
            "marketCap": getattr(info, "market_cap", None),
            "sharesOutstanding": getattr(info, "shares", None),
            "fiftyTwoWeekHigh": getattr(info, "year_high", None),
            "fiftyTwoWeekLow": getattr(info, "year_low", None),
            "beta": getattr(info, "beta", None),
        }
        # Try full info but don't fail if 429
        try:
            full = t.info or {}
            base.update({k: v for k, v in full.items() if v is not None})
        except Exception:
            pass
        return base
    except Exception as e:
        raise HTTPException(429, f"Yahoo Finance rate limit — wait 1 min and retry. ({e})")


# ─── HELPERS ─────────────────────────────────────────────────────────────────
def safe(v, fallback=None):
    if v is None: return fallback
    try:
        if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
            return fallback
    except: pass
    return v


# ─── PROFILE + PRICE ─────────────────────────────────────────────────────────
@app.get("/quote/{ticker}")
def get_quote(ticker: str):
    key = f"quote_{ticker.upper()}"
    if c := cached(key): return c

    info = yf_info(ticker)

    data = {
        "symbol": ticker.upper(),
        "companyName": info.get("longName") or info.get("shortName") or ticker.upper(),
        "exchangeShortName": info.get("exchange", ""),
        "currency": info.get("currency", "USD"),
        "price": info.get("currentPrice") or info.get("regularMarketPrice"),
        "previousClose": info.get("previousClose"),
        "change": None, "changePercent": None,
        "marketCap": info.get("marketCap"),
        "sharesOutstanding": info.get("sharesOutstanding"),
        "beta": info.get("beta"),
        "sector": info.get("sector", ""),
        "industry": info.get("industry", ""),
        "country": info.get("country", ""),
        "description": info.get("longBusinessSummary", ""),
        "52wHigh": info.get("fiftyTwoWeekHigh"),
        "52wLow": info.get("fiftyTwoWeekLow"),
    }
    if data["price"] and data["previousClose"]:
        data["change"] = round(data["price"] - data["previousClose"], 4)
        data["changePercent"] = round((data["change"] / data["previousClose"]) * 100, 4)

    return set_cache(key, data)


# ─── RATIOS + FUNDAMENTALS ────────────────────────────────────────────────────
@app.get("/ratios/{ticker}")
def get_ratios(ticker: str):
    key = f"ratios_{ticker.upper()}"
    if c := cached(key): return c

    info = yf_info(ticker)
    t = yf.Ticker(ticker)

    revenue_growth = None
    try:
        fins = t.financials
        if fins is not None and len(fins.columns) >= 2:
            rev_curr = fins.loc["Total Revenue", fins.columns[0]] if "Total Revenue" in fins.index else None
            rev_prev = fins.loc["Total Revenue", fins.columns[1]] if "Total Revenue" in fins.index else None
            if rev_curr and rev_prev and rev_prev != 0:
                revenue_growth = float((rev_curr - rev_prev) / abs(rev_prev))
    except Exception:
        pass

    data = {
        "peRatio": safe(info.get("trailingPE") or info.get("forwardPE")),
        "forwardPE": safe(info.get("forwardPE")),
        "priceToBook": safe(info.get("priceToBook")),
        "priceToSales": safe(info.get("priceToSalesTrailing12Months")),
        "enterpriseValueMultiple": safe(info.get("enterpriseToEbitda")),
        "grossMargin": safe(info.get("grossMargins")),
        "operatingMargin": safe(info.get("operatingMargins")),
        "netMargin": safe(info.get("profitMargins")),
        "returnOnEquity": safe(info.get("returnOnEquity")),
        "returnOnAssets": safe(info.get("returnOnAssets")),
        "debtToEquity": safe(info.get("debtToEquity")),
        "currentRatio": safe(info.get("currentRatio")),
        "quickRatio": safe(info.get("quickRatio")),
        "dividendYield": safe(info.get("dividendYield")),
        "payoutRatio": safe(info.get("payoutRatio")),
        "fcfYield": None,
        "revenueGrowth": revenue_growth,
    }

    # FCF yield
    fcf = safe(info.get("freeCashflow"))
    mktcap = safe(info.get("marketCap"))
    if fcf and mktcap and mktcap > 0:
        data["fcfYield"] = fcf / mktcap

    return set_cache(key, data)


# ─── HISTORICAL PRICE (for chart) ─────────────────────────────────────────────
@app.get("/history/{ticker}")
def get_history(ticker: str, period: str = "1y"):
    key = f"history_{ticker.upper()}_{period}"
    if c := cached(key): return c

    t = yf.Ticker(ticker)
    hist = t.history(period=period, auto_adjust=True)

    candles = []
    for date, row in hist.iterrows():
        candles.append({
            "date": date.strftime("%Y-%m-%d"),
            "open": round(float(row["Open"]), 4),
            "high": round(float(row["High"]), 4),
            "low": round(float(row["Low"]), 4),
            "close": round(float(row["Close"]), 4),
            "volume": int(row["Volume"]),
        })

    return set_cache(key, {"ticker": ticker.upper(), "candles": candles})


# ─── INCOME STATEMENTS (for DCF) ─────────────────────────────────────────────
@app.get("/financials/{ticker}")
def get_financials(ticker: str):
    key = f"financials_{ticker.upper()}"
    if c := cached(key): return c

    t = yf.Ticker(ticker)
    statements = []
    try:
        fins = t.financials
        if fins is not None:
            for col in fins.columns[:4]:
                def g(k):
                    try: return float(fins.loc[k, col]) if k in fins.index else None
                    except: return None
                statements.append({
                    "date": str(col)[:10],
                    "revenue": g("Total Revenue"),
                    "grossProfit": g("Gross Profit"),
                    "operatingIncome": g("Operating Income"),
                    "netIncome": g("Net Income"),
                    "operatingIncomeRatio": (g("Operating Income") / g("Total Revenue")) if g("Operating Income") and g("Total Revenue") else None,
                })
    except: pass

    return set_cache(key, statements)


# ─── INSIDER TRADING (SEC EDGAR) ─────────────────────────────────────────────
@app.get("/insider/{ticker}")
def get_insider(ticker: str):
    key = f"insider_{ticker.upper()}"
    if c := cached(key): return c

    trades = []
    try:
        # Get CIK from SEC EDGAR
        r = requests.get(
            f"https://efts.sec.gov/LATEST/search-index?q=%22{ticker}%22&dateRange=custom&startdt={(datetime.now()-timedelta(days=365)).strftime('%Y-%m-%d')}&enddt={datetime.now().strftime('%Y-%m-%d')}&forms=4",
            headers={"User-Agent": "pondex research@pondex.io"},
            timeout=8
        )
        if r.ok:
            hits = r.json().get("hits", {}).get("hits", [])
            for h in hits[:10]:
                src = h.get("_source", {})
                trades.append({
                    "reportingName": src.get("display_names", ["Unknown"])[0] if src.get("display_names") else "Unknown",
                    "typeOfOwner": "Insider",
                    "transactionType": src.get("period_of_report", ""),
                    "transactionDate": src.get("period_of_report", ""),
                    "filingDate": src.get("file_date", ""),
                    "value": None,
                })
    except: pass

    # Fallback: yfinance insider trades
    if not trades:
        try:
            t = yf.Ticker(ticker)
            it = t.insider_transactions
            if it is not None and len(it) > 0:
                for _, row in it.head(12).iterrows():
                    trades.append({
                        "reportingName": str(row.get("Insider", "Unknown")),
                        "typeOfOwner": str(row.get("Relation", "Insider")),
                        "transactionType": "P-Purchase" if str(row.get("Transaction", "")).lower().startswith("buy") else "S-Sale",
                        "transactionDate": str(row.get("Start Date", ""))[:10],
                        "securitiesTransacted": safe(row.get("Shares")),
                        "price": safe(row.get("Value")) / safe(row.get("Shares"), 1) if safe(row.get("Value")) and safe(row.get("Shares")) else None,
                        "value": safe(row.get("Value")),
                    })
        except: pass

    return set_cache(key, trades)


# ─── NEWS (Yahoo Finance RSS) ─────────────────────────────────────────────────
@app.get("/news/{ticker}")
def get_news(ticker: str):
    key = f"news_{ticker.upper()}"
    if c := cached(key): return c

    articles = []

    # Yahoo Finance RSS
    try:
        r = requests.get(
            f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={ticker}&region=US&lang=en-US",
            timeout=6
        )
        if r.ok:
            from xml.etree import ElementTree as ET
            root = ET.fromstring(r.content)
            for item in root.findall(".//item")[:6]:
                articles.append({
                    "title": item.findtext("title", ""),
                    "link": item.findtext("link", "#"),
                    "pubDate": item.findtext("pubDate", ""),
                    "source": item.findtext("source", "Yahoo Finance"),
                })
    except: pass

    # Fallback: yfinance news
    if not articles:
        try:
            t = yf.Ticker(ticker)
            news = t.news or []
            for n in news[:6]:
                articles.append({
                    "title": n.get("title", ""),
                    "link": n.get("link", "#"),
                    "pubDate": datetime.fromtimestamp(n.get("providerPublishTime", 0)).isoformat() if n.get("providerPublishTime") else "",
                    "source": n.get("publisher", "Yahoo Finance"),
                })
        except: pass

    return set_cache(key, articles)


# ─── SCORE ────────────────────────────────────────────────────────────────────
@app.get("/score/{ticker}")
def get_score(ticker: str, strategy: str = "growth"):
    key = f"score_{ticker.upper()}_{strategy}"
    if c := cached(key): return c

    quote = get_quote(ticker)
    ratios = get_ratios(ticker)
    fins = get_financials(ticker)

    def s(v, bad, mid, good):
        if v is None: return None
        if v >= good: return 5.0
        if v >= mid: return 3 + 2 * ((v - mid) / (good - mid))
        if v >= bad: return 1 + 2 * ((v - bad) / (mid - bad))
        return max(0, v / bad) if bad > 0 else 0

    def s_inv(v, good, mid, bad):
        if v is None: return None
        if v <= good: return 5.0
        if v <= mid: return 3 + 2 * ((mid - v) / (mid - good))
        if v <= bad: return 1 + 2 * ((bad - v) / (bad - mid))
        return max(0, 1 - (v - bad) / bad) if bad > 0 else 0

    scores = {
        "ratios": None,
        "management": None,
        "moat": s(ratios.get("grossMargin"), 0.2, 0.4, 0.65),
        "esgRisk": s_inv(quote.get("beta"), 0.5, 1.2, 2.5),
        "valuation": None,
    }

    ratio_scores = [
        s_inv(ratios.get("peRatio"), 10, 25, 50),
        s(ratios.get("grossMargin"), 0.2, 0.4, 0.65),
        s(ratios.get("operatingMargin"), 0.05, 0.15, 0.3),
        s(ratios.get("fcfYield"), 0.01, 0.04, 0.08),
        s(ratios.get("revenueGrowth"), 0, 0.1, 0.3),
    ]
    valid_r = [x for x in ratio_scores if x is not None]
    if valid_r: scores["ratios"] = sum(valid_r) / len(valid_r)

    val_scores = [
        s_inv(ratios.get("enterpriseValueMultiple"), 8, 20, 40),
        s_inv(ratios.get("priceToSales"), 2, 5, 15),
    ]
    valid_v = [x for x in val_scores if x is not None]
    if valid_v: scores["valuation"] = sum(valid_v) / len(valid_v)

    weights = {"ratios": 65, "management": 12, "moat": 10, "esgRisk": 8, "valuation": 5}
    total = total_w = 0
    for k, w in weights.items():
        if scores[k] is not None:
            total += scores[k] * w
            total_w += w

    fit_score = round(total / total_w, 2) if total_w > 0 else 0

    data_points = [
        ratios.get("peRatio"), ratios.get("grossMargin"), ratios.get("operatingMargin"),
        ratios.get("fcfYield"), ratios.get("revenueGrowth"), quote.get("beta"),
        ratios.get("enterpriseValueMultiple"), ratios.get("priceToSales"),
        quote.get("marketCap"), quote.get("sector"), fins[0].get("revenue") if fins else None,
    ]
    confidence = round(len([x for x in data_points if x is not None]) / len(data_points) * 100)

    def fmt_pct(v): return f"{round(v * 100, 1)}%" if v is not None else None
    def fmt_x(v): return f"{round(v, 1)}x" if v is not None else None
    def fmt_num(v): return f"{round(v, 2)}" if v is not None else None

    # Source attribution — every metric with its named origin
    sources = [
        {
            "factor": "ratios",
            "metrics": [
                {"label": "P/E Ratio", "value": fmt_x(ratios.get("peRatio")), "source": "Yahoo Finance – trailing twelve months"},
                {"label": "Gross Margin", "value": fmt_pct(ratios.get("grossMargin")), "source": "Yahoo Finance – trailing twelve months"},
                {"label": "Operating Margin", "value": fmt_pct(ratios.get("operatingMargin")), "source": "Yahoo Finance – trailing twelve months"},
                {"label": "FCF Yield", "value": fmt_pct(ratios.get("fcfYield")), "source": "Yahoo Finance – free cash flow / market cap"},
                {"label": "Revenue Growth (YoY)", "value": fmt_pct(ratios.get("revenueGrowth")), "source": "Yahoo Finance – annual income statement"},
            ]
        },
        {
            "factor": "moat",
            "metrics": [
                {"label": "Gross Margin", "value": fmt_pct(ratios.get("grossMargin")), "source": "Yahoo Finance – trailing twelve months"},
            ]
        },
        {
            "factor": "esgRisk",
            "metrics": [
                {"label": "Beta (5Y Monthly)", "value": fmt_num(quote.get("beta")), "source": "Yahoo Finance – 5-year monthly beta vs S&P 500"},
            ]
        },
        {
            "factor": "valuation",
            "metrics": [
                {"label": "EV/EBITDA", "value": fmt_x(ratios.get("enterpriseValueMultiple")), "source": "Yahoo Finance – enterprise value / EBITDA"},
                {"label": "Price/Sales", "value": fmt_x(ratios.get("priceToSales")), "source": "Yahoo Finance – trailing twelve months"},
            ]
        },
        {
            "factor": "management",
            "metrics": [
                {"label": "Insider Activity", "value": "SEC EDGAR Form 4", "source": "SEC EDGAR – Form 4 filings (last 12 months)"},
            ]
        },
    ]

    # Plain-language explanation per factor
    def explain_ratios(score):
        if score is None: return "Not enough data to assess financial health."
        if score >= 4.0: return "Strong fundamentals — healthy margins, solid cash flow, and meaningful growth."
        if score >= 2.5: return "Mixed financials — some strengths, but margins or growth give pause."
        return "Weak financials — low margins, poor cash generation, or declining revenue."

    def explain_moat(score):
        if score is None: return "Gross margin data unavailable."
        if score >= 4.0: return "Wide moat — high gross margins suggest durable pricing power."
        if score >= 2.5: return "Moderate moat — margins are average for the sector."
        return "Thin moat — low gross margins indicate limited competitive advantage."

    def explain_risk(score):
        if score is None: return "Beta data unavailable."
        if score >= 4.0: return "Low volatility — this stock moves less than the broader market."
        if score >= 2.5: return "Moderate volatility — broadly in line with the market."
        return "High volatility — this stock swings significantly more than the market."

    def explain_valuation(score):
        if score is None: return "Not enough data to assess valuation."
        if score >= 4.0: return "Attractively valued — EV/EBITDA and P/S suggest room to grow."
        if score >= 2.5: return "Fairly valued — multiples are in a reasonable range."
        return "Expensive — current multiples price in a lot of future growth."

    def explain_management(score):
        if score is None: return "Insider transaction data not available."
        if score >= 4.0: return "Insiders are buying — management has skin in the game."
        if score >= 2.5: return "Mixed insider activity — no strong signal either way."
        return "Net insider selling — insiders are reducing their positions."

    explanations = {
        "ratios": explain_ratios(scores["ratios"]),
        "moat": explain_moat(scores["moat"]),
        "esgRisk": explain_risk(scores["esgRisk"]),
        "valuation": explain_valuation(scores["valuation"]),
        "management": explain_management(scores["management"]),
    }

    result = {
        "ticker": ticker.upper(),
        "fitScore": fit_score,
        "confidence": confidence,
        "scores": scores,
        "weights": weights,
        "explanations": explanations,
        "sources": sources,
    }
    return set_cache(key, result)


# ─── AI INSIGHTS (Groq — Llama 3.3 70B, open source) ─────────────────────────
@app.post("/ai/chat")
async def ai_chat(body: dict):
    if not GROQ_KEY:
        raise HTTPException(400, "GROQ_API_KEY not set in backend .env")

    messages = body.get("messages", [])
    ticker = body.get("ticker", "")
    context_sources = body.get("sources", [])

    system = (
        "You are pondex, a calm investment research assistant. "
        "You only state facts that are grounded in the data provided. "
        "Every factual claim must be attributable to a named source (Yahoo Finance, SEC EDGAR). "
        "Never speculate without flagging it. Keep answers concise — under 4 sentences."
    )

    async with httpx.AsyncClient() as client:
        r = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_KEY}", "Content-Type": "application/json"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "system", "content": system}] + messages,
                "max_tokens": 400,
                "temperature": 0.3,
            },
            timeout=20,
        )

    if not r.is_success:
        raise HTTPException(r.status_code, r.text)

    data = r.json()
    content = data["choices"][0]["message"]["content"]

    # Return the context sources alongside the answer so the UI can display them
    return {
        "content": content,
        "sources": context_sources,
    }


# ─── HEALTH ───────────────────────────────────────────────────────────────────
@app.get("/")
def health():
    return {"status": "ok", "version": "1.0.0", "sources": ["yahoo_finance", "sec_edgar", "groq_llama"]}
