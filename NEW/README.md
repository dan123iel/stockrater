# pondex_

Stock research with a clear audit trail. Plain-language verdicts. Every number cites its source.

---

## Starten

```bash
# Backend (Yahoo Finance + SEC EDGAR + Groq)
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # GROQ_API_KEY eintragen
uvicorn main:app --reload --port 8000

# Frontend (React + Vite)
cd code
npm install
npm run dev
# → http://localhost:5174
```

---

## Struktur

```
pondex/NEW/
├── README.md             ← diese Datei
├── STRATEGY.md           ← GTM-Strategie, ICP, Messaging
│
├── doc/                  ← Projektdokumentation
│   ├── PROJECT-BRIEF.md  ← Was, für wen, warum
│   ├── PRD.md            ← User-Segmente, Feature-Anforderungen
│   ├── ROADMAP.md        ← Phase 1/2/3
│   ├── ARCHITECTURE.md   ← Stack-Entscheidungen
│   ├── DESIGN-SYSTEM.md  ← Design-Tokens, Typografie
│   ├── CODING-CONVENTIONS.md
│   ├── DEFINITION-OF-DONE.md
│   ├── TECH-DEBT.md
│   ├── research/
│   │   └── survey-wave1.md  ← Survey-Ergebnisse n=45
│   └── adr/              ← Architecture Decision Records
│       ├── ADR-005-yahoo-finance-no-fmp.md
│       ├── ADR-006-groq-llama-no-openai.md
│       └── ADR-007-explanation-first-ux.md
│
├── design/
│   ├── wireframes/       ← ASCII-Wireframes aller Screens
│   └── reference/
│       └── pondex-v1.html  ← Original-Prototyp (Referenz)
│
├── backend/              ← FastAPI
│   ├── main.py           ← Alle Endpoints
│   └── requirements.txt
│
└── code/                 ← React + Vite + Tailwind
    └── src/
        ├── pages/        ← Home, Analysis, Markets, Macro, Ideas, Portfolio, Watchlist
        └── components/   ← ScoreHero, Tiles, Nav, ...
```

---

## Produktprinzipien (aus Survey Wave 1)

1. **Noise-Filter, kein Aggregator** — Die Quelle des Schmerzes ist Signal-Qualität, nicht Anzahl Tabs
2. **Jede Zahl zitiert ihre Quelle** — 58% (wortgleich): "only if the AI displays the exact primary source"
3. **60-Sekunden-Default** — 80% investieren <1h/Woche. Tiefe ist opt-in.
4. **Score = Schlussfolgerung** — Erklärung zuerst, Zahl danach. Score auf Screen 1 repelliert Aspirers.

---

## Stack

| Layer | Tech | Warum |
|---|---|---|
| Frontend | React + Vite + Tailwind | Schnell, bestens dokumentiert |
| Backend | Python FastAPI | Einfach, async, yfinance-kompatibel |
| Marktdaten | Yahoo Finance (yfinance) | Kostenlos, global, kein API-Key |
| Insider | SEC EDGAR Form 4 | Kostenlos, offiziell |
| AI | Groq Llama 3.3 70B | Open-source, schnell, kostenlos |
| Deploy | Vercel (FE) + Railway (BE) | Günstigste Production-Option |

**Keine bezahlten Daten-APIs. Kein OpenAI. Kein FMP.**

---

## ICP

Value Investor · EU-NW · hat bereits $15–50/mo bezahlt · churnte weil Noise nicht gelöst wurde · konditionelles AI-Vertrauen (braucht Quellenangaben). → Gunnar Leu ist das reale Beispiel.
