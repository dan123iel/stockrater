# ADR-011: Caching Strategy — yfinance, Groq, and Score Data

**Date:** 2026-07-24
**Status:** Accepted
**Applies to:** Phase C (Railway backend deployment)

---

## Decision

Use a **two-layer in-process cache** (already partially implemented in `backend/app/core/cache.py`) extended with explicit TTLs per data type. No external cache (Redis, Memcached) until traffic justifies it.

```
Layer 1: In-memory dict cache (backend/app/core/cache.py)
Layer 2: (Phase E+) Redis if >500 req/day sustained
```

---

## Context

yfinance has no official rate limit documentation but practical limits exist:
- Rapid sequential requests trigger 429 / temporary IP blocks
- `yf.Ticker(ticker).info` is the slowest call (~1–3s) and most rate-limited
- Score computation calls yfinance 4–6 times per ticker

Without caching, Phase C backend will be blocked by yfinance after ~20 requests/hour from the same IP.

---

## TTL per Data Type

| Data | Endpoint | TTL | Rationale |
|---|---|---|---|
| Score (fitScore + factors) | `/score/{ticker}` | 24h | Fundamentals change daily at most |
| Quote (price, change) | `/quote/{ticker}` | 5 min | Near-real-time price data |
| Ratios (P/E, margins etc.) | `/ratios/{ticker}` | 24h | TTM figures, quarterly updates |
| Financials (income, balance, CF) | `/financials/{ticker}` | 24h | Annual / quarterly data |
| Price history (OHLCV) | `/history/{ticker}` | 1h | Intraday changes acceptable |
| AI explanation (Groq) | `/score/{ticker}` (embedded) | 24h | Deterministic for same score |
| News | `/news/{ticker}` | 30 min | Freshness matters more |

---

## Implementation

```python
# backend/app/core/cache.py (extend existing)
import time
from typing import Any, Optional

_cache: dict[str, tuple[Any, float]] = {}

def cached(key: str, ttl_seconds: int = 86400) -> Optional[Any]:
    if key in _cache:
        value, expires_at = _cache[key]
        if time.time() < expires_at:
            return value
        del _cache[key]
    return None

def set_cache(key: str, value: Any, ttl_seconds: int = 86400) -> None:
    _cache[key] = (value, time.time() + ttl_seconds)

def clear_cache(key: str = None) -> None:
    if key:
        _cache.pop(key, None)
    else:
        _cache.clear()

# Cache key convention: "{data_type}:{ticker_upper}"
# Examples: "score:AAPL", "quote:NVDA", "history:MSFT"
```

---

## Cache Key Convention

```
score:{TICKER}       → score computation result
quote:{TICKER}       → price + change + company info
ratios:{TICKER}      → P/E, margins, yield etc.
financials:{TICKER}  → income/balance/cashflow 3 years
history:{TICKER}     → OHLCV candles array
news:{TICKER}        → news items array
```

---

## Cache Invalidation

- **Automatic:** TTL expiry (no explicit invalidation needed for Phase C)
- **Manual:** `DELETE /admin/cache/{ticker}` endpoint (admin-only, ADMIN_KEY env var)
- **On deploy:** Cache is in-process → cleared automatically on Railway restart

---

## Scaling Decision Points

| Traffic Level | Action |
|---|---|
| < 100 req/day | In-memory cache (current) |
| 100–500 req/day | Monitor Railway memory usage, likely fine |
| 500+ req/day | Evaluate Redis add-on on Railway (~$3/mo) |
| 5,000+ req/day | Redis required; consider CDN for static score pages |

---

## Groq Rate Limits

Groq free tier: ~30 requests/minute, ~14,400/day (llama-3.3-70b-versatile).
At Phase C scale (estimating <100 analyses/day): no issue.
Cache AI explanations with same 24h TTL as score — identical input = identical output.

---

## Consequences

- **Positive:** Zero infrastructure cost in Phase C (no Redis required)
- **Positive:** Existing cache.py already in place — low implementation effort
- **Positive:** yfinance rate limit risk mitigated for expected Phase C traffic
- **Negative:** Cache lost on Railway restart (acceptable — stale is better than down)
- **Negative:** In-memory cache does not persist across multiple Railway instances (not a concern until scaling to multiple dynos)
