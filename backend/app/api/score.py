from fastapi import APIRouter

from app.api.analysis import get_quote, get_ratios, get_financials
from app.core.cache import cached, set_cache
from app.core.config import CACHE_TTL
from app.services.groq import chat

router = APIRouter()


def _score(v, bad, mid, good):
    if v is None: return None
    if v >= good: return 5.0
    if v >= mid:  return 3 + 2 * ((v - mid) / (good - mid))
    if v >= bad:  return 1 + 2 * ((v - bad) / (mid - bad))
    return max(0, v / bad) if bad > 0 else 0


def _score_inv(v, good, mid, bad):
    if v is None: return None
    if v <= good: return 5.0
    if v <= mid:  return 3 + 2 * ((mid - v) / (mid - good))
    if v <= bad:  return 1 + 2 * ((bad - v) / (bad - mid))
    return max(0, 1 - (v - bad) / bad) if bad > 0 else 0


def _avg(values: list):
    valid = [x for x in values if x is not None]
    return sum(valid) / len(valid) if valid else None


def _explain_ratios(score):
    if score is None:  return "Not enough data to assess financial health."
    if score >= 4.0:   return "Strong fundamentals — healthy margins, solid cash flow, and meaningful growth."
    if score >= 2.5:   return "Mixed financials — some strengths, but margins or growth give pause."
    return "Weak financials — low margins, poor cash generation, or declining revenue."

def _explain_moat(score):
    if score is None:  return "Gross margin data unavailable."
    if score >= 4.0:   return "Wide moat — high gross margins suggest durable pricing power."
    if score >= 2.5:   return "Moderate moat — margins are average for the sector."
    return "Thin moat — low gross margins indicate limited competitive advantage."

def _explain_risk(score):
    if score is None:  return "Beta data unavailable."
    if score >= 4.0:   return "Low volatility — this stock moves less than the broader market."
    if score >= 2.5:   return "Moderate volatility — broadly in line with the market."
    return "High volatility — this stock swings significantly more than the market."

def _explain_valuation(score):
    if score is None:  return "Not enough data to assess valuation."
    if score >= 4.0:   return "Attractively valued — EV/EBITDA and P/S suggest room to grow."
    if score >= 2.5:   return "Fairly valued — multiples are in a reasonable range."
    return "Expensive — current multiples price in a lot of future growth."

def _explain_management(score):
    if score is None:  return "Insider transaction data not available."
    if score >= 4.0:   return "Insiders are buying — management has skin in the game."
    if score >= 2.5:   return "Mixed insider activity — no strong signal either way."
    return "Net insider selling — insiders are reducing their positions."


@router.get("/score/{ticker}")
def get_score(ticker: str, strategy: str = "growth"):
    key = f"score_{ticker.upper()}_{strategy}"
    if c := cached(key, CACHE_TTL): return c

    quote  = get_quote(ticker)
    ratios = get_ratios(ticker)
    fins   = get_financials(ticker)

    def fp(v): return f"{round(v * 100, 1)}%" if v is not None else None
    def fx(v): return f"{round(v, 1)}x" if v is not None else None
    def fn(v): return f"{round(v, 2)}" if v is not None else None

    scores = {
        "ratios":     _avg([
            _score_inv(ratios.get("peRatio"),           10, 25, 50),
            _score(ratios.get("grossMargin"),            0.2, 0.4, 0.65),
            _score(ratios.get("operatingMargin"),        0.05, 0.15, 0.3),
            _score(ratios.get("fcfYield"),               0.01, 0.04, 0.08),
            _score(ratios.get("revenueGrowth"),          0, 0.1, 0.3),
        ]),
        "management": None,
        "moat":       _score(ratios.get("grossMargin"),  0.2, 0.4, 0.65),
        "esgRisk":    _score_inv(quote.get("beta"),      0.5, 1.2, 2.5),
        "valuation":  _avg([
            _score_inv(ratios.get("enterpriseValueMultiple"), 8, 20, 40),
            _score_inv(ratios.get("priceToSales"),            2, 5,  15),
        ]),
    }

    weights   = {"ratios": 65, "management": 12, "moat": 10, "esgRisk": 8, "valuation": 5}
    total     = sum(scores[k] * w for k, w in weights.items() if scores[k] is not None)
    total_w   = sum(w for k, w in weights.items() if scores[k] is not None)
    fit_score = round(total / total_w, 2) if total_w > 0 else 0

    data_points = [
        ratios.get("peRatio"), ratios.get("grossMargin"), ratios.get("operatingMargin"),
        ratios.get("fcfYield"), ratios.get("revenueGrowth"), quote.get("beta"),
        ratios.get("enterpriseValueMultiple"), ratios.get("priceToSales"),
        quote.get("marketCap"), quote.get("sector"), fins[0].get("revenue") if fins else None,
    ]
    confidence = round(len([x for x in data_points if x is not None]) / len(data_points) * 100)

    return set_cache(key, {
        "ticker":       ticker.upper(),
        "fitScore":     fit_score,
        "confidence":   confidence,
        "scores":       scores,
        "weights":      weights,
        "explanations": {
            "ratios":     _explain_ratios(scores["ratios"]),
            "moat":       _explain_moat(scores["moat"]),
            "esgRisk":    _explain_risk(scores["esgRisk"]),
            "valuation":  _explain_valuation(scores["valuation"]),
            "management": _explain_management(scores["management"]),
        },
        "sources": [
            {"factor": "ratios", "metrics": [
                {"label": "P/E Ratio",            "value": fx(ratios.get("peRatio")),          "source": "Yahoo Finance – trailing twelve months"},
                {"label": "Gross Margin",          "value": fp(ratios.get("grossMargin")),      "source": "Yahoo Finance – trailing twelve months"},
                {"label": "Operating Margin",      "value": fp(ratios.get("operatingMargin")),  "source": "Yahoo Finance – trailing twelve months"},
                {"label": "FCF Yield",             "value": fp(ratios.get("fcfYield")),         "source": "Yahoo Finance – free cash flow / market cap"},
                {"label": "Revenue Growth (YoY)",  "value": fp(ratios.get("revenueGrowth")),    "source": "Yahoo Finance – annual income statement"},
            ]},
            {"factor": "moat",       "metrics": [{"label": "Gross Margin",      "value": fp(ratios.get("grossMargin")), "source": "Yahoo Finance – trailing twelve months"}]},
            {"factor": "esgRisk",    "metrics": [{"label": "Beta (5Y Monthly)", "value": fn(quote.get("beta")),         "source": "Yahoo Finance – 5-year monthly beta vs S&P 500"}]},
            {"factor": "valuation",  "metrics": [
                {"label": "EV/EBITDA",   "value": fx(ratios.get("enterpriseValueMultiple")), "source": "Yahoo Finance – enterprise value / EBITDA"},
                {"label": "Price/Sales", "value": fx(ratios.get("priceToSales")),             "source": "Yahoo Finance – trailing twelve months"},
            ]},
            {"factor": "management", "metrics": [{"label": "Insider Activity", "value": "SEC EDGAR Form 4", "source": "SEC EDGAR – Form 4 filings (last 12 months)"}]},
        ],
    }, CACHE_TTL)


@router.post("/ai/chat")
async def ai_chat(body: dict):
    content = await chat(body.get("messages", []))
    return {"content": content, "sources": body.get("sources", [])}
