# pondex_

> Stock research with a clear audit trail. Plain-language verdicts. Every number cites its source.

---

## Quick Start

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # GROQ_API_KEY eintragen
uvicorn main:app --reload --port 8000

# Frontend
cd code
npm install
npm run dev                 # → http://localhost:5174
```

---

## Structure

```
pondex/
├── CLAUDE.md               ← AI agent context (auto-loaded)
├── README.md
├── STRATEGY.md             ← GTM, ICP, messaging
├── .project-context/       ← Rules for every AI session
│   ├── MASTER.md
│   └── context/
│       ├── architecture.md
│       ├── tech-stack.md
│       └── coding-guidelines.md
├── backend/                ← FastAPI (Python)
│   ├── main.py
│   └── requirements.txt
├── code/                   ← React + Vite + Tailwind
│   └── src/
│       ├── pages/
│       └── components/
├── doc/                    ← Product + engineering docs
│   ├── PROJECT-BRIEF.md
│   ├── PRD.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── research/
│   │   └── survey-wave1.md
│   └── adr/
└── design/
    ├── wireframes/         ← ASCII wireframes
    └── reference/
        └── pondex-v1.html  ← Original prototype
```

→ Architecture decisions: `doc/adr/`
→ Product requirements: `doc/PRD.md`
→ Roadmap: `doc/ROADMAP.md`

---

## Stack

| Layer | Tech | Notes |
|---|---|---|
| Frontend | React + Vite + Tailwind | `code/` |
| Backend | Python FastAPI | `backend/` |
| Market data | Yahoo Finance (`yfinance`) | Free, no API key |
| Insider trades | SEC EDGAR Form 4 | Free |
| AI | Groq Llama 3.3 70B | `GROQ_API_KEY` required |
| Deploy | Vercel (FE) + Railway (BE) | ~$5/mo |

**No paid data APIs. No OpenAI. No FMP.**

---

## Status

Active development — Phase 1 MVP · Target: 15 July 2026

---

## License

MIT
