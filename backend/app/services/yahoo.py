import math
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
    t = yf.Ticker(ticker)
    try:
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
        raise HTTPException(429, f"Yahoo Finance rate limit — wait 1 min and retry. ({e})")
