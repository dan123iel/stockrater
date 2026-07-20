# pondex — Incident Log

> Jeder produktionsrelevante Fehler wird hier dokumentiert.
> Ziel: Probleme schneller lösen, Muster erkennen, Wissen nicht verlieren.

---

## Format

```
### INC-XXX · [Titel]
- **Datum:** YYYY-MM-DD
- **Severity:** Critical / High / Medium / Low
- **Status:** Resolved / Open / Monitoring
- **Symptom:** Was der User gesehen hat
- **Root Cause:** Was technisch passiert ist
- **Fix:** Was geändert wurde
- **Prevention:** Was verhindert dass es nochmal passiert
- **Time to Resolve:** Wie lange es gedauert hat
```

---

## Incidents

### INC-001 · yfinance Breaking Change — Yahoo Finance API
- **Datum:** 2026-07-04
- **Severity:** Critical
- **Status:** ✅ Resolved
- **Symptom:** `API error 429: /score/AAPL?strategy=value` — "Data not available" auf der gesamten App. Kein einziger Ticker funktionierte.
- **Root Cause:** Yahoo Finance hat seine interne API geändert. yfinance 0.2.43 nutzte einen veralteten Endpunkt → `KeyError: 'currentTradingPeriod'`. Der Fehler wurde als HTTP 429 (Rate Limit) weitergegeben, obwohl es tatsächlich ein Breaking Change war — irreführende Fehlermeldung.
- **Fix:** yfinance 0.2.43 → 1.2.0 + curl_cffi 0.13.0 als neue Dependency. Außerdem: `requests.Session` entfernt — yfinance 1.2.0 verwaltet die Session intern via curl_cffi.
- **Files changed:** `backend/requirements.txt`, `backend/app/services/yahoo.py`
- **Prevention:** 
  - Sentry eingebunden (→ INC-001 wäre sofort als Exception sichtbar gewesen, nicht als generischer 429)
  - yfinance Version in requirements.txt jetzt fest gepinnt
  - Dependency-Update-Check: bei `yfinance` immer Changelog lesen vor Update
- **Time to Resolve:** ~3 Stunden (inkl. Diagnose)
- **Lesson:** Fehlercode 429 (Rate Limit) war irreführend — echter Fehler war ein API Breaking Change. Besseres Error Logging hätte den Root Cause sofort gezeigt.

---

### INC-002 · GitHub Pages Deploy Timeout
- **Datum:** 2026-07-02
- **Severity:** Medium
- **Status:** ✅ Resolved
- **Symptom:** GitHub Actions "Deploy Frontend to GitHub Pages" läuft 10m 34s und endet mit "Timeout reached, aborting!"
- **Root Cause:** GitHub's interner Pages-Queue blieb auf `deployment_queued` hängen — ein vorheriger durch `cancel-in-progress: true` abgebrochener Deploy blockierte den Queue intern.
- **Fix:** Workflow manuell über GitHub Actions UI neu getriggert → lief in 32s durch.
- **Prevention:** Kein Code-Fix nötig — sporadisches GitHub-seitiges Problem. Bei erneutem Timeout: einfach manuell neu triggern.
- **Time to Resolve:** ~20 Minuten

---

## Bekannte Risiken (noch nicht eingetreten)

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| yfinance bricht erneut bei Yahoo API-Änderung | Hoch (Yahoo ändert API regelmäßig) | Critical | Sentry Alert + schneller Update-Prozess |
| Railway free tier Limit erreicht | Mittel | High | Railway Hobby Plan ($5/mo) bei >500 Requests/Tag |
| Groq API Rate Limit bei vielen gleichzeitigen Usern | Mittel | Medium | Caching bereits eingebaut (`core/cache.py`) |
| yfinance bei >1k MAU von Yahoo geblockt | Mittel | Critical | Alpha Vantage oder offizielle Yahoo Finance API evaluieren |

---

_Sentry Dashboard: [nach Setup eintragen]_
_Next review: nach jedem Incident oder monatlich_
