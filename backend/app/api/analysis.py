from datetime import datetime
from xml.etree import ElementTree as ET

import requests
import yfinance as yf
from fastapi import APIRouter

from app.core.cache import cached, set_cache
from app.core.config import CACHE_TTL
from app.services.groq import chat
from app.services.sec_edgar import get_insider_trades
from app.services.yahoo import safe, yf_info

router = APIRouter()


@router.get("/quote/{ticker}")
def get_quote(ticker: str):
    key = f"quote_{ticker.upper()}"
    if c := cached(key, CACHE_TTL): return c

    info = yf_info(ticker)
    data = {
        "symbol":            ticker.upper(),
        "companyName":       info.get("longName") or info.get("shortName") or ticker.upper(),
        "exchangeShortName": info.get("exchange", ""),
        "currency":          info.get("currency", "USD"),
        "price":             info.get("currentPrice") or info.get("regularMarketPrice"),
        "previousClose":     info.get("previousClose"),
        "change":            None,
        "changePercent":     None,
        "marketCap":         info.get("marketCap"),
        "sharesOutstanding": info.get("sharesOutstanding"),
        "beta":              info.get("beta"),
        "sector":            info.get("sector", ""),
        "industry":          info.get("industry", ""),
        "country":           info.get("country", ""),
        "description":       info.get("longBusinessSummary", ""),
        "52wHigh":           info.get("fiftyTwoWeekHigh"),
        "52wLow":            info.get("fiftyTwoWeekLow"),
    }
    if data["price"] and data["previousClose"]:
        data["change"]        = round(data["price"] - data["previousClose"], 4)
        data["changePercent"] = round((data["change"] / data["previousClose"]) * 100, 4)
    return set_cache(key, data, CACHE_TTL)


@router.get("/ratios/{ticker}")
def get_ratios(ticker: str):
    key = f"ratios_{ticker.upper()}"
    if c := cached(key, CACHE_TTL): return c

    info = yf_info(ticker)
    revenue_growth = None
    try:
        fins = yf.Ticker(ticker).financials
        if fins is not None and len(fins.columns) >= 2:
            rev_curr = fins.loc["Total Revenue", fins.columns[0]] if "Total Revenue" in fins.index else None
            rev_prev = fins.loc["Total Revenue", fins.columns[1]] if "Total Revenue" in fins.index else None
            if rev_curr and rev_prev and rev_prev != 0:
                revenue_growth = float((rev_curr - rev_prev) / abs(rev_prev))
    except Exception:
        pass

    fcf    = safe(info.get("freeCashflow"))
    mktcap = safe(info.get("marketCap"))
    data = {
        "peRatio":                safe(info.get("trailingPE") or info.get("forwardPE")),
        "forwardPE":              safe(info.get("forwardPE")),
        "priceToBook":            safe(info.get("priceToBook")),
        "priceToSales":           safe(info.get("priceToSalesTrailing12Months")),
        "enterpriseValueMultiple":safe(info.get("enterpriseToEbitda")),
        "grossMargin":            safe(info.get("grossMargins")),
        "operatingMargin":        safe(info.get("operatingMargins")),
        "netMargin":              safe(info.get("profitMargins")),
        "returnOnEquity":         safe(info.get("returnOnEquity")),
        "returnOnAssets":         safe(info.get("returnOnAssets")),
        "debtToEquity":           safe(info.get("debtToEquity")),
        "currentRatio":           safe(info.get("currentRatio")),
        "quickRatio":             safe(info.get("quickRatio")),
        "dividendYield":          safe(info.get("dividendYield")),
        "payoutRatio":            safe(info.get("payoutRatio")),
        "fcfYield":               (fcf / mktcap) if fcf and mktcap and mktcap > 0 else None,
        "revenueGrowth":          revenue_growth,
    }
    return set_cache(key, data, CACHE_TTL)


@router.get("/history/{ticker}")
def get_history(ticker: str, period: str = "1y"):
    key = f"history_{ticker.upper()}_{period}"
    if c := cached(key, CACHE_TTL): return c

    hist = yf.Ticker(ticker).history(period=period, auto_adjust=True)
    candles = [
        {
            "date":   date.strftime("%Y-%m-%d"),
            "open":   round(float(row["Open"]), 4),
            "high":   round(float(row["High"]), 4),
            "low":    round(float(row["Low"]), 4),
            "close":  round(float(row["Close"]), 4),
            "volume": int(row["Volume"]),
        }
        for date, row in hist.iterrows()
    ]
    return set_cache(key, {"ticker": ticker.upper(), "candles": candles}, CACHE_TTL)


@router.get("/financials/{ticker}")
def get_financials(ticker: str):
    key = f"financials_{ticker.upper()}"
    if c := cached(key, CACHE_TTL): return c

    t = yf.Ticker(ticker)
    statements = []

    try:
        fins = t.financials
        bal  = t.balance_sheet
        cf   = t.cashflow

        cols = fins.columns[:4] if fins is not None else []
        for col in cols:
            def g(df, k):
                try: return float(df.loc[k, col]) if df is not None and k in df.index else None
                except: return None

            op  = g(fins, "Operating Income")
            rev = g(fins, "Total Revenue")

            # Balance sheet — match column by date proximity
            bal_col = None
            if bal is not None:
                for bc in bal.columns:
                    if abs((bc - col).days) < 180:
                        bal_col = bc
                        break

            def gb(k):
                try: return float(bal.loc[k, bal_col]) if bal is not None and bal_col is not None and k in bal.index else None
                except: return None

            cf_col = None
            if cf is not None:
                for cc in cf.columns:
                    if abs((cc - col).days) < 180:
                        cf_col = cc
                        break

            def gc(k):
                try: return float(cf.loc[k, cf_col]) if cf is not None and cf_col is not None and k in cf.index else None
                except: return None

            op_cf  = gc("Operating Cash Flow") or gc("Cash Flow From Operating Activities")
            inv_cf = gc("Investing Cash Flow") or gc("Cash Flow From Investing Activities")
            fin_cf = gc("Financing Cash Flow") or gc("Cash Flow From Financing Activities")
            capex  = gc("Capital Expenditure")
            free_cf = (op_cf + capex) if op_cf and capex else None

            statements.append({
                "date":                 str(col)[:10],
                # Income Statement
                "revenue":              g(fins, "Total Revenue"),
                "grossProfit":          g(fins, "Gross Profit"),
                "operatingIncome":      op,
                "netIncome":            g(fins, "Net Income"),
                "operatingIncomeRatio": (op / rev) if op and rev else None,
                # Balance Sheet
                "totalAssets":          gb("Total Assets"),
                "totalLiabilities":     gb("Total Liabilities Net Minority Interest") or gb("Total Liabilities"),
                "totalEquity":          gb("Stockholders Equity") or gb("Total Equity Gross Minority Interest"),
                "debtToEquity":         None,  # calculated in ratios endpoint
                # Cash Flow
                "operatingCashFlow":    op_cf,
                "investingCashFlow":    inv_cf,
                "financingCashFlow":    fin_cf,
                "capitalExpenditure":   capex,
                "freeCashFlow":         free_cf,
            })
    except Exception:
        pass

    return set_cache(key, statements, CACHE_TTL)


@router.get("/insider/{ticker}")
def get_insider(ticker: str):
    key = f"insider_{ticker.upper()}"
    if c := cached(key, CACHE_TTL): return c
    return set_cache(key, get_insider_trades(ticker), CACHE_TTL)


@router.get("/news/{ticker}")
def get_news(ticker: str):
    key = f"news_{ticker.upper()}"
    if c := cached(key, CACHE_TTL): return c

    articles = []
    try:
        r = requests.get(
            f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={ticker}&region=US&lang=en-US",
            timeout=6,
        )
        if r.ok:
            root = ET.fromstring(r.content)
            for item in root.findall(".//item")[:6]:
                articles.append({
                    "title":   item.findtext("title", ""),
                    "link":    item.findtext("link", "#"),
                    "pubDate": item.findtext("pubDate", ""),
                    "source":  item.findtext("source", "Yahoo Finance"),
                })
    except Exception:
        pass

    if not articles:
        try:
            for n in (yf.Ticker(ticker).news or [])[:6]:
                articles.append({
                    "title":   n.get("title", ""),
                    "link":    n.get("link", "#"),
                    "pubDate": datetime.fromtimestamp(n.get("providerPublishTime", 0)).isoformat() if n.get("providerPublishTime") else "",
                    "source":  n.get("publisher", "Yahoo Finance"),
                })
        except Exception:
            pass

    return set_cache(key, articles, CACHE_TTL)
