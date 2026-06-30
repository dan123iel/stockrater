# pondex_ — Tech Stack & Approved Dependencies

## 1. Languages & Runtimes

| Layer | Language | Version |
|---|---|---|
| Frontend | JavaScript (JSX) | Node 20+ |
| Backend | Python | 3.9+ |

---

## 2. Frontend — Approved Only

**Framework:** React 18 + Vite 6

**Styling:** Tailwind CSS + shadcn/ui components (already installed in `code/src/components/ui/`)

**Routing:** React Router DOM (view-switching in Home.jsx, not URL-based routes)

**Data fetching:** Native `fetch()` via `lib/fmp.js` → backend API. TanStack React Query available but optional.

**Icons:** Lucide React

**Charts:** Recharts (already in package.json)

**No new npm packages without updating this file and `doc/ROADMAP.md`.**

---

## 3. Backend — Approved Only

**Framework:** FastAPI + uvicorn

**Data:** `yfinance` (Yahoo Finance), `requests` (SEC EDGAR, RSS), `httpx` (Groq async)

**AI:** Groq API — model `llama-3.3-70b-versatile` only. No OpenAI. No Anthropic.

**Environment:** `python-dotenv` — all secrets via `.env` (never hardcoded)

**No new pip packages without updating this file and `requirements.txt`.**

---

## 4. What is explicitly NOT allowed

| Prohibited | Reason | Alternative |
|---|---|---|
| FMP (Financial Modeling Prep) | Paid API, removed in ADR-005 | yfinance |
| OpenAI API | Cost, ADR-006 | Groq Llama |
| Anthropic/Claude API | Cost, ADR-006 | Groq Llama |
| Any broker/execution API | Requires licence | N/A (Phase 3+) |
| Global CSS resets outside index.css | Breaks Paper design system | Edit index.css only |

---

## 5. Environment Variables

```
# backend/.env
GROQ_API_KEY=gsk_...       # Required for AI features
NEWSAPI_KEY=               # Optional — Yahoo RSS is fallback
```

Never commit `.env`. Template is in `backend/.env.example`.

---

## 6. Design System

**Paper Design:** white background, Instrument Serif (headlines), Inter (body), DM Mono (labels/code)

CSS variables defined in `code/src/index.css`. Do not override with inline styles for colors — use `var(--color-*)`.

Key tokens:
- `--color-surface` / `--color-panel` — backgrounds
- `--color-ink` — primary text
- `--color-muted` — secondary text
- `--color-intact` — positive (green)
- `--color-warning` — negative (red)
- `--font-display` — Instrument Serif
- `--font-body` — Inter
- `--font-mono` — DM Mono
