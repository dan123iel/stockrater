# ANALYTICS-SPEC.md — pondex_ Analytics & Tracking

**Entscheidung:** Plausible Analytics
**Datum:** 2026-07-24
**Status:** Accepted

---

## Tool: Plausible Analytics

- **URL:** plausible.io
- **Kosten:** €9/Monat (bis 10k pageviews), €19/Monat (bis 100k)
- **GDPR:** Cookie-frei, kein Cookie-Banner nötig, EU-Server (Frankfurt)
- **Datenspeicherung:** Keine personenbezogenen Daten, keine IP-Adressen
- **Begründung:** Solo founder + EU-Produkt + kein Cookie-Banner-Overhead

---

## Integration

```html
<!-- index.html — vor Phase C hinzufügen -->
<script defer data-domain="dan123iel.github.io" src="https://plausible.io/js/script.js"></script>
```

Kein React-SDK nötig. Script-Tag reicht für Pageviews und Custom Events.

---

## Custom Events (priorisiert)

### Phase C (Launch)

| Event | Trigger | Warum |
|---|---|---|
| `signup` | Signup.jsx nach erfolgreichem Account | Aktivierungs-Funnel |
| `analysis_run` | App.jsx nach erfolgreichem Score | Core Action |
| `demo_used` | ProductDemo.jsx nach Score-Anzeige | Landing Conversion |
| `tab_viewed` | Stock-Seite Tab-Klick | Feature-Nutzung |

### Phase D (Auth live)

| Event | Trigger | Warum |
|---|---|---|
| `onboarding_completed` | RoboAdvisor / Profil-Flow abgeschlossen | Aktivierung |
| `onboarding_skipped` | Skip-Button geklickt | UX-Insight |
| `watchlist_add` | Ticker zur Watchlist hinzugefügt | Retention |

### Phase E (Stripe live)

| Event | Trigger | Warum |
|---|---|---|
| `upgrade_modal_shown` | Free Tier Gate triggert | Conversion Funnel |
| `upgrade_clicked` | Klick auf Upgrade in Modal | Conversion |
| `pro_activated` | Nach Stripe Checkout | Revenue |

---

## Implementierung Custom Events

```jsx
// utils/analytics.js
export function track(event, props = {}) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props })
  }
}

// Verwendung in App.jsx nach erfolgreicher Analyse:
import { track } from '../utils/analytics'
track('analysis_run', { ticker: key, score: s100, verdict })
```

---

## Metriken pro Phase

### Phase C — Was täglich checken
```
Dashboard: plausible.io/dan123iel.github.io
- Unique Visitors / Tag
- Signups / Tag (Custom Event)
- analysis_run / Tag
- Top Referrers (woher kommen User?)
```

### Phase D — Activation Funnel
```
Signup → analysis_run = Aktivierungs-Rate (Ziel: >50%)
Signup → analysis_run (D+7) = D7 Retention (Ziel: >20%)
```

### Phase E — Conversion
```
upgrade_modal_shown → upgrade_clicked = Modal-CTR (Ziel: >20%)
upgrade_clicked → pro_activated = Checkout-Completion (Ziel: >60%)
```

---

## GDPR Compliance

- Plausible benötigt **keinen Cookie-Banner** — komplett cookie-frei
- Kein Consent-Management-Platform nötig für Plausible
- Wenn zusätzlich GA4 oder HotJar hinzugefügt wird: dann Cookie-Banner Pflicht
- **Regel:** Kein weiteres Tracking-Tool ohne Cookie-Banner-Infrastruktur

---

## Scoring Factor Weights (Dokumentation aus source code)

_Zusatz zu ADR-004 — hier dokumentiert da noch nicht in scoring-engine.md_

Aus `backend/app/api/score.py`:

```python
DEFAULT_WEIGHTS = {
    'ratios':     0.25,   # Fundamentals (P/E, Margins, Growth)
    'moat':       0.25,   # Competitive Advantages
    'esgRisk':    0.20,   # Risk (ESG, Governance, Beta)
    'valuation':  0.20,   # Valuation vs. Sector
    'management': 0.10,   # Capital Allocation (ROE, ROA, Buybacks)
}

# Profil-Gewichtungen (Phase D — Investor Profile)
PROFILE_WEIGHTS = {
    'value': {
        'ratios': 0.20, 'moat': 0.20, 'esgRisk': 0.15,
        'valuation': 0.35, 'management': 0.10
    },
    'growth': {
        'ratios': 0.35, 'moat': 0.25, 'esgRisk': 0.15,
        'valuation': 0.15, 'management': 0.10
    },
    'dividend': {
        'ratios': 0.20, 'moat': 0.20, 'esgRisk': 0.20,
        'valuation': 0.20, 'management': 0.20
    },
    'momentum': {
        # Phase E — separates Momentum-Signal nötig, nicht nur Gewichtung
        'ratios': 0.20, 'moat': 0.20, 'esgRisk': 0.20,
        'valuation': 0.20, 'management': 0.20  # Default bis Momentum-Signal gebaut
    },
}
```

Scoring Formula:
```
fitScore (0–5) = Σ (factor_score * weight)
s100 = round(min(fitScore * 20, 100))
```

Verdict:
```
≥ 70 → BUY
50–69 → HOLD
< 50 → SELL
```
