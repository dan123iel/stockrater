# ADR-009: Modular backend — app/ package structure

**Date:** July 2026
**Status:** Accepted
**Supersedes:** Single-file `main.py` (ADR implicit in original architecture)

## Decision

The backend is organized as a Python package under `backend/app/` with strict separation of concerns:

```
backend/app/
├── main.py          ← App init + middleware only
├── api/
│   ├── analysis.py  ← Market data endpoints (quote, ratios, history, financials, insider, news)
│   └── score.py     ← Scoring + AI endpoints (/score, /ai/chat)
├── services/
│   ├── yahoo.py     ← yfinance helpers (yf_info, safe)
│   ├── sec_edgar.py ← SEC EDGAR Form 4 fetcher
│   └── groq.py      ← Groq API client (chat function)
└── core/
    ├── config.py    ← Environment variables (GROQ_API_KEY, CACHE_TTL)
    └── cache.py     ← In-memory cache (cached, set_cache, clear_cache)
```

**Run command changed:** `uvicorn app.main:app --reload --port 8000` (from `backend/` directory)

## Context

The original `main.py` mixed routing, business logic, external API calls, caching, and configuration in one 511-line file. This violates Single Responsibility Principle and makes it impossible to test, modify, or extend individual components without reading the entire file.

## Consequences

- Each module has one reason to change
- `backend/main.py` kept as legacy reference — not imported anywhere
- Python 3.9 compatible (no `float | None` union syntax)
- Cache TTL controlled centrally in `core/config.py`
- Adding a new data source = new file in `services/`, new router in `api/`, one `include_router()` line in `main.py`
