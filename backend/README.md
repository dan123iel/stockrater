# pondex_ Backend

FastAPI backend — Yahoo Finance + SEC EDGAR + Groq (Llama 3.3 70B)

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# edit .env → add GROQ_API_KEY
uvicorn main:app --reload --port 8000
```

## Endpoints

| Endpoint | Data | Source |
|---|---|---|
| `GET /quote/{ticker}` | Price, company info | Yahoo Finance |
| `GET /ratios/{ticker}` | P/E, margins, FCF | Yahoo Finance |
| `GET /history/{ticker}` | OHLCV candles | Yahoo Finance |
| `GET /financials/{ticker}` | Income statements | Yahoo Finance |
| `GET /insider/{ticker}` | Form 4 trades | SEC EDGAR + yfinance |
| `GET /news/{ticker}` | Headlines | Yahoo RSS + yfinance |
| `GET /score/{ticker}` | Algorithmic score | Calculated |
| `POST /ai/chat` | AI insights | Groq Llama 3.3 70B |

## Get a Groq API Key (free)

→ https://console.groq.com — free tier, Llama 3.3 70B

## Deploy to Railway

```bash
railway login
railway init
railway up
```
