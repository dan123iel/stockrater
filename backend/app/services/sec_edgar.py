from datetime import datetime, timedelta
import requests
import yfinance as yf
from app.services.yahoo import safe


def get_insider_trades(ticker: str) -> list:
    trades = []

    # Primary: SEC EDGAR full-text search
    try:
        r = requests.get(
            f"https://efts.sec.gov/LATEST/search-index?q=%22{ticker}%22"
            f"&dateRange=custom"
            f"&startdt={(datetime.now()-timedelta(days=365)).strftime('%Y-%m-%d')}"
            f"&enddt={datetime.now().strftime('%Y-%m-%d')}"
            f"&forms=4",
            headers={"User-Agent": "pondex research@pondex.io"},
            timeout=8,
        )
        if r.ok:
            for h in r.json().get("hits", {}).get("hits", [])[:10]:
                src = h.get("_source", {})
                trades.append({
                    "reportingName":  (src.get("display_names") or ["Unknown"])[0],
                    "typeOfOwner":    "Insider",
                    "transactionType": src.get("period_of_report", ""),
                    "transactionDate": src.get("period_of_report", ""),
                    "filingDate":      src.get("file_date", ""),
                    "value":           None,
                })
    except Exception:
        pass

    # Fallback: yfinance
    if not trades:
        try:
            it = yf.Ticker(ticker).insider_transactions
            if it is not None and len(it) > 0:
                for _, row in it.head(12).iterrows():
                    shares = safe(row.get("Shares"))
                    value  = safe(row.get("Value"))
                    trades.append({
                        "reportingName":       str(row.get("Insider", "Unknown")),
                        "typeOfOwner":         str(row.get("Relation", "Insider")),
                        "transactionType":     "P-Purchase" if str(row.get("Transaction", "")).lower().startswith("buy") else "S-Sale",
                        "transactionDate":     str(row.get("Start Date", ""))[:10],
                        "securitiesTransacted": shares,
                        "price":               value / shares if value and shares else None,
                        "value":               value,
                    })
        except Exception:
            pass

    return trades
