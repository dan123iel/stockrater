# ONBOARDING-FLOW-SPEC.md — pondex_ Investor Profile Onboarding

**Entscheidung:** 3 Fragen + Skip-Option
**Datum:** 2026-07-24
**Status:** Accepted — implement in Phase D

---

## Entscheidung

3 Fragen mit explizitem Skip. Begründung:
- Patricia P.: "Setup > 2 Minuten = Dealbreaker"
- 3 Fragen = ~20 Sekunden
- Skip = Default-Gewichtung (alle Faktoren gleich gewichtet)
- Profil kann jederzeit in `/app/account` nachgeholt werden

---

## Die 3 Fragen

```
Frage 1: "What's your investment goal?"
Optionen:
  [Wealth building]    → goal: 'wealth'
  [Retirement]         → goal: 'retirement'
  [Income]             → goal: 'income'
  [Large purchase]     → goal: 'purchase'

Frage 2: "How long do you plan to hold?"
Optionen:
  [< 1 year]           → horizon: 'short'
  [1–5 years]          → horizon: 'medium'
  [5–10 years]         → horizon: 'long'
  [10+ years]          → horizon: 'verylong'

Frage 3: "If your portfolio drops 20%:"
Optionen:
  [Sell immediately]   → risk: 'conservative'
  [Hold and wait]      → risk: 'moderate'
  [Buy more]           → risk: 'aggressive'
```

---

## Scoring-Logik → Investor Style

```
risk === 'conservative' OR horizon === 'short'
  → style: 'value'     (Conservative Portfolio, valuation-weighted)

risk === 'aggressive' AND horizon IN ('long', 'verylong')
  → style: 'growth'    (Growth Portfolio, fundamentals-weighted)

Alles andere
  → style: 'core'      (Core Portfolio, balanced weights)
```

Mapping zu Score-Gewichtungen aus ANALYTICS-SPEC.md:
- `value` → PROFILE_WEIGHTS.value (valuation +15%)
- `growth` → PROFILE_WEIGHTS.growth (ratios +15%)
- `core` → DEFAULT_WEIGHTS (alle gleich)

---

## UX Flow

```
TRIGGER: Nach erstem Signup → /app/stock?ticker=AAPL geöffnet

Onboarding Banner (dismissible, über dem Score):
┌─────────────────────────────────────────────────────────────┐
│ Your score uses default weights.                            │
│ Personalize it for your strategy — takes 20 seconds.       │
│                    [Set up profile →]   [Not now ×]        │
└─────────────────────────────────────────────────────────────┘

Bei Klick "Set up profile →":
→ Modal oder eigene Seite /app/onboarding

Bei Klick "Not now ×":
→ localStorage.setItem('pondex_onboarding_dismissed', '1')
→ Banner verschwindet
→ Score bleibt mit Default-Gewichtung
→ Erneuter Hinweis nach 5. Analyse (nur einmal)
```

### Onboarding Flow (Modal oder /app/onboarding)

```
Fortschritts-Indicator: ● ○ ○  (1 von 3)

Frage 1 von 3
What's your investment goal?

[Wealth building]
[Retirement]
[Income]
[Large purchase]

[Skip — use default settings]  (klein, unten)

──────────────────────────────

Frage 2 von 3
How long do you plan to hold?

[< 1 year]
[1–5 years]
[5–10 years]
[10+ years]

[← Back]                       [Skip]

──────────────────────────────

Frage 3 von 3
If your portfolio drops 20%:

[Sell immediately]
[Hold and wait]
[Buy more]

[← Back]                       [Skip]

──────────────────────────────

Profile complete ✓

Your investor style: Value Investor
Your scores are now weighted for value investing.

AAPL: Default 78/100 → Your score: 62/100
(Valuation factor weighted higher for value investors)

[See your personalized AAPL verdict →]
```

### Skip-Verhalten

- Skip am Anfang: keine Fragen, Default-Gewichtung bleibt, Banner mit "Complete your profile" in Account-Seite
- Skip mitten drin: bisher beantwortete Fragen werden gespeichert, Rest = Default

---

## Wo erscheint der Profil-Prompt

| Kontext | Trigger | Text |
|---|---|---|
| Nach erstem Signup | `!pondex_onboarded_profile` | Banner über Score |
| Nach 5. Analyse ohne Profil | Analysis counter = 5 | Gleicher Banner |
| Account-Seite | Immer | "Investor profile: Not set up — [Set up now →]" |
| Stock-Seite (mit Profil) | Immer | "Score for: Value Investor · [Change →]" |

---

## Score-Anzeige mit Profil (Phase D — explizit sichtbar)

Entscheidung: Explizit sichtbar — User sieht beide Werte.

```
[ pondex_ verdict — Value Investor ]

Gauge Animation (62/100, amber)

62 /100
[HOLD] MODERATE FIT

Personalized for: Value Investor
Default score: 78/100   Your score: 62/100
(Valuation weighted +15% for value investing)

Apple shows strong fundamentals with consistent cash
flow and a wide moat, but trades at a significant
premium to sector peers — less attractive for value
investors.

⚠ Research tool only · Not financial advice
```

**Wenn kein Profil gesetzt:**
```
[ pondex_ verdict ]

78 /100
[HOLD] GOOD FIT

Default weights · Personalize for your strategy →
```

---

## Supabase Schema (aus ADR-010)

```sql
CREATE TABLE public.investor_profiles (
  user_id   UUID REFERENCES public.profiles PRIMARY KEY,
  goal      TEXT,    -- 'wealth' | 'retirement' | 'income' | 'purchase'
  horizon   TEXT,    -- 'short' | 'medium' | 'long' | 'verylong'
  risk      TEXT,    -- 'conservative' | 'moderate' | 'aggressive'
  style     TEXT,    -- computed: 'value' | 'growth' | 'core'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Phase B/C (localStorage): gleiche Struktur als JSON:
```js
localStorage.setItem('pondex_investor_profile', JSON.stringify({
  goal: 'wealth', horizon: 'long', risk: 'aggressive', style: 'growth'
}))
```

---

## Regelwerk: Profil in Score einrechnen

```
GET /score/AAPL?profile=value

Backend liest:
  style = request.query_params.get('profile', 'default')
  weights = PROFILE_WEIGHTS.get(style, DEFAULT_WEIGHTS)
  fitScore = sum(factor_score * weights[factor] for factor, factor_score in scores.items())
```

Frontend schickt Profil als Query-Parameter:
```js
const profile = JSON.parse(localStorage.getItem('pondex_investor_profile'))?.style || 'default'
fetch(`${API}/score/${key}?profile=${profile}`)
```
