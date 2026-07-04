import math
import time
import requests
import yfinance as yf
from fastapi import HTTPException

# Yahoo Finance blocks cloud server IPs without a browser User-Agent
_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def safe(v, fallback=None):
    if v is None:
        return fallback
    try:
        if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
            return fallback
    except Exception:
        pass
    return v


def yf_info(ticker: str) -> dict:
    last_err = None
    for attempt in range(3):
        try:
            session = requests.Session()
            session.headers.update(_HEADERS)
            t = yf.Ticker(ticker, session=session)
            info = t.fast_info
            base = {
                "currentPrice":      getattr(info, "last_price", None),
                "previousClose":     getattr(info, "previous_close", None),
                "marketCap":         getattr(info, "market_cap", None),
                "sharesOutstanding": getattr(info, "shares", None),
                "fiftyTwoWeekHigh":  getattr(info, "year_high", None),
                "fiftyTwoWeekLow":   getattr(info, "year_low", None),
                "beta":              getattr(info, "beta", None),
            }
            try:
                full = t.info or {}
                base.update({k: v for k, v in full.items() if v is not None})
            except Exception:
                pass
            return base
        except Exception as e:
            last_err = e
            if attempt < 2:
                time.sleep(2 ** attempt)
    raise HTTPException(429, f"Yahoo Finance rate limit — please retry in a moment. ({last_err})")
