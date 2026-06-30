# pondex_ — Approved Tech Stack

## Frontend (code/)

| What | Approved | Forbidden |
|---|---|---|
| Framework | React 18 + Vite 6 | — |
| Styling | Tailwind CSS + `code/src/index.css` vars | Inline color styles |
| UI components | shadcn (`code/src/components/ui/`) | New component libraries |
| Icons | Lucide React | Other icon sets |
| Charts | Recharts | Other chart libs |
| Data fetching | Native `fetch()` via `lib/fmp.js` | Direct fetch from components |
| State | React `useState` | Redux, Zustand, MobX |
| Router | React Router DOM (view-switch in Home.jsx) | URL-based routing |

## Backend (backend/)

| What | Approved | Forbidden |
|---|---|---|
| Framework | FastAPI + uvicorn | Flask, Django |
| Market data | `yfinance` (Yahoo Finance) | FMP, Bloomberg, Polygon |
| HTTP client | `httpx` (async), `requests` (sync) | — |
| AI | Groq API — `llama-3.3-70b-versatile` | OpenAI, Anthropic/Claude |
| Config | `python-dotenv` + `.env` | Hardcoded secrets |

## Explicitly forbidden everywhere

| Forbidden | Reason | ADR |
|---|---|---|
| FMP (financialmodelingprep.com) | Paid API, removed | ADR-005 |
| OpenAI API | Cost constraint | ADR-006 |
| Anthropic/Claude API | Cost constraint | ADR-006 |
| Broker/execution APIs | Requires licence | — |

## Environment variables

```bash
# backend/.env  (never commit)
GROQ_API_KEY=gsk_...   # Required for AI features
```

Template: `backend/.env.example`

## Design tokens — use these, never hardcode colors

Defined in `code/src/index.css`:
- `--color-surface`, `--color-panel` — backgrounds
- `--color-ink` — primary text
- `--color-muted` — secondary text
- `--color-intact` — positive (green)
- `--color-warning` — negative (red)
- `--font-display` — Instrument Serif
- `--font-body` — Inter
- `--font-mono` — DM Mono
