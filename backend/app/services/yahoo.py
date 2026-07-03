import math
import time
import yfinance as yf
from fastapi import HTTPException


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
    # Retry up to 3 times — Railway cold-start IPs are often rate-limited on first hit
    last_err = None
    for attempt in range(3):
        try:
            t = yf.Ticker(ticker)
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
                time.sleep(2 ** attempt)  # 1s, 2s
    raise HTTPException(429, f"Yahoo Finance rate limit — please retry in a moment. ({last_err})")
