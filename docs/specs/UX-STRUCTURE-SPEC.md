# pondex_ — UX & Struktur Spezifikation
_Version 1.0 · Stand: 2026-07-24_
_Fokus: Struktur, UX, Flows, Regulatorik — kein UI, keine CSS, keine Farben_

---

## 1. Was ist pondex_?

### Das mentale Modell

pondex_ ist ein **Finanz-Research-Tool** — kein Trading-Tool, kein Broker, kein Investmentberater.

```
User gibt Ticker ein
        ↓
pondex_ analysiert 5 Faktoren (Yahoo Finance + SEC EDGAR + Groq AI)
        ↓
User bekommt: Score 0–100 + BUY / HOLD / SELL Signal + Erklärung
        ↓
User entscheidet selbst
```

**Das ist alles.** Alles andere (Portfolio-Tracker, Robo Advisor, CFD, Markets) sind Kontextfunktionen um diesen Kern herum — sie dienen dazu, den User in der App zu halten und den Mehrwert des Scores sichtbar zu machen.

### Was pondex_ NICHT ist

| Was es scheinen könnte | Was es wirklich ist |
|---|---|
| Investmentberatung | Research-Tool — User entscheidet selbst |
| Broker / Handelspunkt | Kein Order-Execution, kein echtes Portfolio |
| Echtzeit-Datenplattform | Täglich aktualisierte Fundamentaldaten |
| Bloomberg-Ersatz | Vereinfachter Signal-Lieferant für Privatanleger |
| AI-Chatbot | AI nur zur Quellenattribution, kein freier Chat |

### Warum existiert es

Aus n=45 Research (Wave 1 + 3 User-Interviews):
- **51% nennen "Zu viel Lärm / widersprüchliche Informationen" als #1 Problem**
- **64% vertrauen AI-Outputs nur wenn Quellen explizit sichtbar sind**
- Churner von bestehenden Tools (Seeking Alpha, Bloomberg) verließen diese wegen demselben Problem: Noise wurde nicht weniger, trotz Bezahlung

**pondex_ Versprechen:** Ein Signal. Jede Zahl quellenattributiert. Unter 60 Sekunden.

---

## 2. User-Typen & ihre Jobs-to-be-done

### Primärer User: "Der Passive Noise-Reducer" (41% der Research-Sample)

**Profil:** Passiver Investor, investiert nebenbei, <1h/Woche Research-Zeit, nutzt aktuell Broker-Tool + ChatGPT + Yahoo Finance

**Was er braucht:**
1. "60-Sekunden-Check ob eine Aktie weitere Recherche wert ist"
2. "Verifizieren dass AI-Zahlen nicht halluziniert sind"
3. "Metriken verstehen ohne mich dumm zu fühlen"
4. "Erklären können warum ich diese Aktie gekauft habe"

**Was ihn sofort verliert:**
- Score ohne Erklärung
- AI-Output ohne Quellen
- Mehr als 2 Minuten Setup-Zeit
- "Noch ein weiteres Tool" — er will ersetzen, nicht hinzufügen

### Sekundärer User: "Der Churned Value Investor" (Gunnar Leu Archetyp)

**Profil:** Hat bereits für Research-Tools bezahlt ($15–50/Monat), hat aufgehört weil der Noise nicht abnahm. Aktiver als der passive Typ, will Grundlagen + Fundamentals in einem Ort.

**Was er braucht:**
1. Klares Fundamental-Signal (Bewertung, Profitabilität)
2. Peer-Vergleich (ist die Aktie teuer im Sektorvergleich?)
3. Exit-Signale (wann verkaufen — bisher ungelöst überall)
4. Alles an einem Ort

**Bereitschaft zu zahlen:** Bewieser — einziger Typ mit Payment-History

### Nicht-Zielgruppe (explizit ausgeschlossen)

- Day-Trader (anderer Zeithorizont, andere Tools)
- Institutionelle Anleger (andere Informationstiefe nötig)
- Rein-passive ETF-Sparer ("kaufe und vergesse", kein Research-Bedarf)
- Bloomberg-Terminal-User ($50–200/Monat, anderes Problem)

---

## 3. Gesamte Seitenstruktur (Site-Map)

```
ÖFFENTLICHER BEREICH
│
├── / ─────────────────────── Landing Page
│   ├── #demo ────────────── Demo-Abschnitt (Scroll-Anchor)
│   ├── #how-it-works ──────── Wie es funktioniert
│   ├── #features ────────── Feature-Übersicht
│   ├── #reviews ─────────── Testimonials
│   └── #pricing ─────────── Preise
│
├── /login ────────────────── Login
└── /signup ───────────────── Registrierung

AUTHENTIFIZIERTER BEREICH (alle benötigen gültigen Login)
│
├── /app ──────────────────── Home Dashboard
│
├── /app/stock ────────────── Stock-Analyse (suchgetrieben, kein Nav-Item)
│   ├── Tab: Overview
│   ├── Tab: Key Metrics
│   ├── Tab: Financials
│   │   ├── Sub: Income Statement
│   │   ├── Sub: Balance Sheet
│   │   └── Sub: Cash Flow
│   ├── Tab: News ─────────── (Phase C — leer bis dahin)
│   ├── Tab: Order Book ───── (Phase C — leer bis dahin)
│   └── Tab: Learn
│
├── /app/portfolio ────────── Portfolio
│   ├── Tab: Positions ────── (Phase D — leer bis dahin)
│   ├── Tab: Watchlist
│   ├── Tab: Transactions ─── (Phase D — leer bis dahin)
│   └── Tab: Account
│
├── /app/markets ──────────── Markets
│   ├── Tab: Top Movers
│   ├── Tab: Popular Stocks
│   ├── Tab: Collections
│   ├── Tab: News ─────────── (Phase C — leer bis dahin)
│   └── Tab: Calendar
│
├── /app/robo ─────────────── Robo Advisor
│   ├── Tab: Portfolio
│   │   └── Flow: Onboarding (4 Fragen → Portfolio-Empfehlung)
│   ├── Tab: Savings Plans ── (Phase E — Placeholder)
│   ├── Tab: Round-up ─────── (Phase E — Placeholder)
│   └── Tab: Forecasts ────── (Phase E — Placeholder)
│
├── /app/cfd ──────────────── CFD (Preview — keine Funktionalität)
│
└── /app/account ──────────── Account-Seite (Phase D — noch nicht gebaut)
    ├── Profil-Daten
    ├── Plan-Übersicht
    └── Account löschen

FEHLENDE SEITEN (müssen gebaut werden)
├── /404 ──────────────────── Fehlerseite (aktuell: Wildcard → Landing)
├── /terms ────────────────── AGB (GDPR-Pflicht vor Auth)
└── /privacy ──────────────── Datenschutzerklärung (GDPR-Pflicht vor Auth)
```

---

## 4. Navigation — Zwei Navigations-Kontexte

### Kontext A: Öffentliche Seiten (Landing, Login, Signup)

**Fixierte Leiste oben** mit:
- Links: Logo (klickbar → /)
- Mitte: Scroll-Anchor Links zur Landing Page
  - How It Works → #how-it-works
  - Demo → #demo
  - Features → #features
  - Reviews → #reviews
  - Pricing → #pricing
- Rechts: "Log in" → /login | "Free Trial" → /signup

**Mobile** (unter ca. 900px): Hamburger-Button öffnet Vollbild-Overlay mit denselben Links

**Besonderheit:** Links sind Scroll-Anchors, KEINE Router-Navigationen. Beim Klick scrollt die Seite zur entsprechenden Section.

### Kontext B: App-Bereich (/app/*)

**Fixierte Leiste oben** mit:
- Links: Logo (klickbar → /)
- Mitte: Navigations-Links zu App-Bereichen
  - Home
  - Portfolio
  - Markets
  - Robo Advisor
  - CFD
  - ⚠️ KEIN "Stock" als Nav-Item (Stock ist suchgetrieben, kein eigener Bereich)
- Rechts: Suche (Ticker-Input + "Go"-Button) | Log out | Profile-Button

**Aktiver Zustand:** Die aktive Seite ist visuell hervorgehoben

**Suche:** Immer sichtbar in der Navigationsleiste, kein Toggle. Eingabe → navigate zu /app/stock?ticker=XXX

**Mobile:** Noch nicht gelöst — AppNav überläuft unter 900px. Muss vor Phase C gelöst werden.

---

## 5. User Flows — Die 6 kritischen Pfade

### Flow 1: Erstkontakt → Erster Wert (Aktivierungs-Flow)

```
Einstieg: Organisch/Social/Word-of-Mouth
    ↓
Landing Page
    ↓ Liest Hero, versteht Versprechen
    ↓ Scrollt zu ProductDemo-Section
    ↓ Gibt Ticker ein (z.B. AAPL)
    ↓ Sieht Score 78/100 + HOLD + Erklärung (ohne Anmeldung)
    ↓ "Das ist nützlich" — Klick auf Primary CTA "Start free trial"
    ↓
/signup
    ↓ Email + Passwort (min. 8 Zeichen)
    ↓ Klick "Create account"
    ↓
/app/stock?ticker=AAPL (erster Signup → AAPL vorgeladen)
    ↓ Onboarding-Banner: "Welcome — this is your first verdict."
    ↓ User sieht vollständige Analyse
    ↓
Aktiviert ✓ (User hat Wert erhalten bevor er navigiert)
```

**Kritischer Moment:** Der Demo auf der Landing Page (ohne Login) ist der Aktivierungs-Trigger. Ohne ihn sinkt Conversion drastisch.

**Aktivierungs-Metrik:** User hat mindestens 1 vollständige Analyse gesehen (mit Score + Factor Breakdown).

---

### Flow 2: Returning User → Analyse (Retention-Flow)

```
Einstieg: Direkt-URL oder Bookmark
    ↓
Landing Page (nicht eingeloggt)
    ↓ Klick "Log in"
    ↓
/login
    ↓ Email + Passwort
    ↓ Klick "Log in →"
    ↓
/app (Home Dashboard)
    ↓ Sieht Watchlist + Top Movers
    ↓ Gibt Ticker in Navigations-Suche ein
    ↓
/app/stock?ticker=NVDA
    ↓ Analyse
```

**Alternative Einstiegspunkte:**
- Klick auf Ticker in Top Movers → /app/stock?ticker=AAPL
- Klick auf "Analyse"-Button in Watchlist → /app/stock?ticker=AAPL
- Direkte URL mit Ticker-Parameter

---

### Flow 3: Stock-Analyse — Kernflow (Detail)

```
User ist auf /app/stock (mit oder ohne ?ticker)
    ↓
ZUSTAND A: Kein Ticker in URL
    → Zeigt "Get your verdict." + leeres Input-Feld
    → User tippt Ticker ein
    → Klick "GET VERDICT" oder Enter

ZUSTAND B: Ticker in URL (?ticker=AAPL)
    → Analyse startet automatisch beim Seitenload
    → Loading-Zustand: Input zeigt Ticker, Button zeigt "..."

    ↓ Analyse läuft (<1 Sekunde bei Demo, 2–5 Sekunden bei echtem Backend)
    ↓

ERGEBNIS — 3 mögliche Zustände:

Zustand ERFOLG (bekannter Ticker):
    → Header zeigt: Firmenname + Ticker + Börse + Sektor + Preis + Tagesveränderung
    → Tabs erscheinen: Overview | Key Metrics | Financials | News | Order Book | Learn
    → Overview-Tab ist aktiv
    → Gauge-Animation läuft (Score steigt von 0 auf Endwert)
    → Score + Verdict-Badge (BUY/HOLD/SELL) + Zusammenfassung
    → Factor Breakdown (5 Faktoren mit Balken + Quelle)

Zustand FEHLER — Demo-Ticker-Modus (unbekannter Ticker, kein Backend):
    → Fehlermeldung: "Ticker not found or not in demo set."
    → 6 klickbare Chips: [AAPL] [NVDA] [MSFT] [TSLA] [GOOGL] [AMZN]
    → Klick auf Chip → startet Analyse für diesen Ticker

Zustand LADEN:
    → Button-Text: "..."
    → Content-Bereich bleibt leer (kein Flicker, kein Spinner)

    ↓ Nach erfolgreicher Analyse:

Tab: Overview (Standard)
    → Preischart (illustrativ bis Phase C)
    → Verdict-Card (Score + Badge + Summary)
    → Factor Breakdown (5 Faktoren)
    → Key Metrics Strip (6 Kennzahlen)
    → Upcoming Events (leer bis Phase C)
    → Similar Stocks (4 verwandte Ticker, klickbar)

Tab: Key Metrics
    → 4 Sektionen: Price & Volume | Valuation | Profitability | Management
    → Alle Zahlen mit Quellen-Label (Yahoo Finance TTM / SEC EDGAR)

Tab: Financials
    → 3 Sub-Tabs: Income Statement | Balance Sheet | Cash Flow
    → Tabelle mit 3 Jahren historischer Daten
    → Quellen-Label: "Annual · Yahoo Finance / SEC EDGAR"

Tab: News
    → Empty State: "News feed coming in Phase C."
    → KEINE Fake-Schlagzeilen

Tab: Order Book
    → Empty State: "Live order book coming in Phase C."
    → KEINE Fake-Daten

Tab: Learn
    → Glossar (6 Begriffe mit Definition)
    → Über [Ticker] (Firmenbeschreibung, Sektor, Land)
    → Datenquellen (Yahoo Finance / SEC EDGAR / Groq AI + Disclaimer)
```

---

### Flow 4: Free Tier Gate → Upgrade (Phase E — noch nicht gebaut)

```
User hat heute bereits 1 Analyse durchgeführt
    ↓
User gibt neuen Ticker ein, klickt "GET VERDICT"
    ↓
Upgrade-Modal erscheint (kein Weiterleiten, Modal über aktuellem Screen)
    ↓
Modal zeigt:
    "You've used your free verdict for today."
    "Upgrade to Pro for unlimited verdicts."
    [Upgrade to Pro — €4.99/month]
    [Remind me tomorrow] (schließt Modal)
    ↓
Klick "Upgrade to Pro" → /pricing oder Stripe direkt
Klick "Remind me tomorrow" → Modal schließt, Input-Feld bleibt leer
```

**Gate-Logik (localStorage-basiert bis Phase D):**
- Key: `pondex_verdicts_{YYYY-MM-DD}` = Anzahl Analysen heute
- Bei Wert ≥ 1 (Free Tier): Modal erscheint
- Bei Wert ≥ ∞ (Pro Tier): kein Modal

**⚠️ Status:** Noch nicht implementiert. Derzeit unlimitierte Analysen möglich.

---

### Flow 5: Benutzer-Onboarding — Investor-Profil (Phase D)

```
Signup abgeschlossen → /app/stock?ticker=AAPL (erster Score sichtbar)
    ↓
Banner: "Your score is based on default weights. Tell us your strategy for a personalized verdict."
    [Personalize my score →]
    ↓
Onboarding-Flow (5 Fragen, separate Seite oder Modal):

Frage 1: "What's your investment goal?"
    → [Wealth building] [Retirement] [Income] [Large purchase]

Frage 2: "How long do you plan to hold?"
    → [< 1 year] [1–5 years] [5–10 years] [10+ years]

Frage 3: "If your portfolio drops 20%, you:"
    → [Sell immediately] [Hold and wait] [Buy more]

Frage 4: "Your investing style:"
    → [Value] [Growth] [Dividend] [Momentum]

Frage 5: "Your experience level:"
    → [Just starting] [1–3 years] [3+ years]

    ↓
Auswertung → Investor-Profil gespeichert (Supabase)
    ↓
Score-Gewichtung passt sich an:
    Value-Investor → Valuation-Faktor höher gewichtet
    Growth-Investor → Fundamentals-Faktor höher gewichtet
    Dividend-Investor → Management-Faktor höher gewichtet
    Momentum-Trader → separates Momentum-Signal (nicht Phase D)
    ↓
Ergebnis: "Your AAPL verdict (Value Investor): 62/100 HOLD"
    vs. "Default AAPL verdict: 78/100 HOLD"
```

**⚠️ Status:** Noch nicht implementiert. Scores sind aktuell nicht profilgewichtet.

---

### Flow 6: Exit Strategy (Phase E2 — noch nicht gebaut)

```
User ist auf /app/stock?ticker=TSLA (hält TSLA bereits)
    ↓
Neuer Tab in Stock-Seite: "Exit Check"
    ↓
Input-Formular:
    Einstiegspreis: [___]
    Haltedauer: [___] Monate
    [Check exit signal →]
    ↓
Berechnung:
    Exit-Score 0–100
    Signal: HOLD / TRIM / EXIT
    Faktoren: RSI-Überkauft | P/E vs. Sektor | Trend-Umkehr | Fundamentalverschlechterung
    ↓
Output:
    "TSLA Exit Signal: EXIT (Score: 28/100)"
    "RSI: 78 (overbought threshold: 70)"
    "P/E: 88x vs. Sector avg 24x"
    "Trend: 3 consecutive lower highs"
    Source: Yahoo Finance · not financial advice
```

**Framing-Regel (regulatorisch wichtig):** "Exit Signal" und "Exit Score" — NIEMALS "Verkaufsempfehlung" oder "Du solltest verkaufen". Immer als Datenpunkt, nie als Handlungsanweisung.

---

## 6. Jede Seite im Detail

### 6.1 Landing Page — /

**Zweck:** Kalte Besucher in Nutzer umwandeln. Das Produkt-Versprechen kommunizieren. Demo ohne Login anbieten.

**Wer landet hier:** Organische Suche, Social Media, Word-of-Mouth, direkte URL

**Primäre Aktion:** "Start free trial" → /signup

**Content-Hierarchie (oben → unten):**

**Section 1: Hero (Above the Fold)**
- Hauptaussage: Was ist pondex_? (rotierende Headline + fixer Schlussteil)
- Subtext: Kernversprechen in 1–2 Sätzen
- Zwei CTAs: Primary "Start free trial" + Secondary "Get a demo" (Scroll zu #demo)
- Social Proof: 2 schwebende Karten (71% Zahl + 60s Zeitangabe)
- Visuelles: Score-Card mit AAPL als Beispiel (klar als illustrativ markiert)
- Datenquellen: Yahoo Finance · SEC EDGAR · Groq AI (nur diese drei)

**Section 2: ProductDemo (id="demo")**
- Interaktiver Ticker-Input ohne Login
- Quick-Pick Chips: AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN
- Zeigt Score + Verdict + 3 Faktoren inline
- CTA unter Ergebnis: "Full analysis in the app →" → /signup

**Section 3: How It Works**
- 3 nummerierte Schritte: Ticker eingeben → Analyse → Entscheiden
- Keine technischen Details, keine Fachjargon

**Section 4: Verdict Banner**
- Zeigt BUY/HOLD/SELL optisch prominent
- Erklärt was das Signal bedeutet
- Emotional — nicht technisch

**Section 5: Differentiation**
- Vergleich zu Yahoo Finance, ChatGPT, Bloomberg
- Was pondex_ hat, was die anderen nicht haben
- Quellenattribution als Kernunterschied

**Section 6: Features**
- 4 Features mit Research-Zitaten als Beweis
- Reihenfolge: Source-cited scoring → Investor Profile → Peer Comparison → Exit Signals

**Section 7–8: Comparison Teaser + Investor Profile**
- Zeigt das Produkt "in Aktion" — Zahlen, nicht Text
- Comparison: 2 Aktien nebeneinander (AAPL vs. MSFT + Sektor-Durchschnitt)
- Profile: Gleiche Aktie, anderer Score für verschiedene Investor-Typen

**Section 9: Testimonials**
- 3 Quotes aus User-Interviews (mit Attribution: Name Initiale + Stadt + "User interview · June 2026")
- Stats-Balken: 45 Interviews · 71% · 60s · €0
- Subtext: "From user research interviews · n=45 · June 2026"

**Section 10: Zwischen-CTA**
- Schwarzer Vollbreite-Banner nach Testimonials
- Kurze Headline + "Start free" CTA
- Wichtig: Zwischen Social Proof und Pricing — User ist am konvertierungsbereitesten hier

**Section 11: Pricing**
- Free (€0) vs. Pro (€4.99/Monat)
- Toggle: Monthly / Yearly (-17%)
- Features-Liste pro Tier
- CTAs über `<Link to="/signup">` (nicht raw href)
- Rechtlicher Hinweis: "No credit card required for free tier. Cancel anytime."

**Section 12: FAQ**
- 6 Fragen: Was ist das? · Datenquellen? · Score-Berechnung? · 1/Tag Limit? · Datensicherheit? · Pro-Trial?
- Klappbare Antworten (Accordion)

**Section 13: Gründerhinweis**
- Persönliche Geschichte warum pondex_ gebaut wurde
- Schafft Vertrauen, menschliche Verbindung
- Foto (sobald vorhanden) oder Initial-Avatar

**Section 14: Final CTA**
- Letzte Handlungsaufforderung vor Footer
- Stärkste Copy: "Stop guessing. Start verifying."

**Section 15: Footer**
- Newsletter-Formular (E-Mail + Submit → Thank-you State, kein Server-Call Phase B)
- Links: Product · Pricing · Privacy · Terms · Disclaimer
- Copyright + Disclaimer-Zeile

**Leere Zustände:** Keine — Landing Page hat keine dynamischen Daten außer ProductDemo

**Regulatorik:** Kein Disclaimer auf Hero nötig (noch kein Score), aber Pricing-Sektion muss klar machen dass das Produkt ein Research-Tool ist.

---

### 6.2 Login — /login

**Zweck:** Bestehende User einloggen.

**Content-Hierarchie:**
1. Überschrift: "Welcome back."
2. Unter-Überschrift: "Log in to your pondex_ account."
3. Demo-Banner: "Demo mode — any credentials work. Real accounts coming in Phase D."
4. Email-Feld
5. Passwort-Feld
6. Fehler-Anzeige (wenn Felder leer)
7. Submit-Button: "Log in →"
8. Link zu Signup: "No account? Sign up →"
9. (Placeholder) "Forgot password?" — Coming soon

**Verhalten:**
- Jede Email + jedes Passwort → Login erfolgreich (Phase B Demo-Mode)
- Loading-State: Button-Text "...", Button deaktiviert
- Nach Login → /app

**Fehler-Zustände:**
- Leere Felder → Inline-Fehlermeldung unter Formular
- (Phase D) Falsches Passwort → "Incorrect email or password."

---

### 6.3 Signup — /signup

**Zweck:** Neue User registrieren und direkt aktivieren.

**Content-Hierarchie:**
1. Überschrift: "Start for free."
2. Unter-Überschrift: "No credit card required."
3. Demo-Banner (wie Login)
4. Email-Feld
5. Passwort-Feld (min. 8 Zeichen)
6. Fehler-Anzeige
7. Submit-Button: "Create account →"
8. Link zu Login

**⚠️ GDPR-Pflicht (noch nicht implementiert):**
- Vor Submit muss sichtbar sein: "By creating an account you agree to our [Terms of Service] and [Privacy Policy]."
- Checkbox oder Text-Link — muss vor Phase C/D live sein

**Verhalten nach Submit:**
- Erster Signup: → /app/stock?ticker=AAPL (Onboarding mit erster Analyse)
- Weiterer Login: → /app

---

### 6.4 Home Dashboard — /app

**Zweck:** Kuratierter Einstiegspunkt nach Login. Zeigt Watchlist + Marktbewegungen + Events + Robo-Teaser.

**Wer landet hier:** Returning users, User nach Login (wenn nicht erster Signup)

**Primäre Aktion:** Ticker in Navigations-Suche eingeben → /app/stock

**Content-Hierarchie (2-Spalten-Layout: Hauptbereich + Sidebar):**

**Hauptbereich:**
1. Überschrift + Begrüßung (zeitabhängig: morning/afternoon/evening + Vorname)
2. Watchlist-Zusammenfassung:
   - Mit Live-Daten: "Watchlist · $X,XXX.XX · +$X.XX heute"
   - Ohne Live-Daten: "Watchlist · 4 stocks tracked"
   - "View portfolio →" Link
3. Top Movers Abschnitt:
   - 6 Ticker-Karten (3×2 Grid)
   - Jede Karte: Ticker · Firmenname (erster Wort) · Preis · % Veränderung
   - Klickbar → /app/stock?ticker=XXX
4. Watchlist-Liste:
   - 4 Zeilen: Ticker · Firmenname · Preis · Veränderung
   - "Edit →" Link → /app/portfolio (Watchlist-Tab)
   - Klickbar → /app/stock

**Sidebar (360px):**
1. Robo Advisor Teaser (dunkler Hintergrund)
   - Headline + kurze Beschreibung
   - "Get started →" → /app/robo
2. Upcoming Events:
   - 3 Events: Datum · Ticker · Event-Name · Typ (earnings/dividend)
   - "Calendar →" → /app/markets (Calendar-Tab)

**Leere Zustände:**
- Keine Live-Daten (Backend nicht erreichbar): Preise zeigen "—", Watchlist zeigt "4 stocks tracked"
- Noch kein Event: Events-Sektion zeigt nichts oder Placeholder

**Fehlende Funktionen (noch nicht gebaut):**
- Watchlist ist hardcoded (AAPL, NVDA, MSFT, TSLA) — nicht editierbar
- Top Movers zeigen Demo-Daten wenn kein Backend
- Events sind hardcoded, nicht aus Kalender-API

---

### 6.5 Stock Detail — /app/stock

→ Vollständig in Flow 3 beschrieben (Sektion 5.3)

**Zusätzliche Regeln:**
- URL immer mit ?ticker= Parameter
- Bei Navigation via Similar Stocks: URL und State updaten (nicht nur URL)
- Tabs nur sichtbar wenn Ergebnis vorhanden
- Disclaimer "Research tool only · Not financial advice" permanent sichtbar in Verdict-Card

---

### 6.6 Portfolio — /app/portfolio

**Zweck:** Eigene Investitionen verwalten + Watchlist führen.

**Tabs:** Positions | Watchlist | Transactions | Account
**Standard-Tab:** Positions (Tab 0)

**Tab: Positions**
- Leerer Zustand: "You have no open positions. [Analyse a stock →]"
- CTA führt zu /app/stock?ticker=AAPL (nicht zu leerem Stock-State)
- Phase D: Hier können echte Positionen eingetragen werden

**Tab: Watchlist**
- Tabellen-Header: Ticker | Company | Price | Change | Sector | (Analyse-Button)
- 4 Zeilen (AAPL, NVDA, MSFT, TSLA)
- Zeile klickbar → /app/stock?ticker=XXX
- "Analyse"-Button pro Zeile → /app/stock?ticker=XXX
- Hover-Effekt: Zeile hebt sich leicht
- Fehlende Funktion: Watchlist ist hardcoded, nicht editierbar per User

**Tab: Transactions**
- Leerer Zustand: "No buy/sell history yet."
- Phase D: Hier erscheinen Kauf/Verkauf-Einträge

**Tab: Account**
- Email-Adresse des Users
- Plan: "Free tier"
- Member since: Jahr (aus createdAt oder hardcoded "2026")
- Available balance: "—"
- Log-out-Button
- ⚠️ Fehlend: Account löschen (GDPR-Pflicht), Plan-Upgrade-Link

---

### 6.7 Markets — /app/markets

**Zweck:** Marktüberblick — was bewegt sich heute, welche Ereignisse stehen an.

**Tabs:** Top Movers | Popular Stocks | Collections | News | Calendar
**Standard-Tab:** Top Movers

**Tab: Top Movers**
- Sortiert nach absolutem |% Veränderung|
- Gainers (grün) + Losers (rot) gemischt
- 6-Spalten Grid von Ticker-Karten
- Klick → /app/stock?ticker=XXX

**Tab: Popular Stocks**
- Kuratierte Liste nach Market Cap (AAPL, MSFT, NVDA, GOOGL, AMZN, TSLA)
- NICHT identisch mit Top Movers (andere Sortierung, andere Logik)
- Gleiche Karten-Darstellung

**Tab: Collections**
- Thematische Gruppen: Big Tech | Semiconductors | EV & Energy | Streaming
- Karte zeigt: Name + Ticker-Chips
- Klick auf Collection: filtert Movers oder zeigt Ticker-Liste
- Aktuell: Keine Klick-Funktionalität (Cursor zeigt Interaktivität aber nichts passiert) — muss behoben werden

**Tab: News**
- Empty State: "News coming in Phase 2. Requires NewsAPI key."
- KEINE Fake-Nachrichten, KEINE erfundenen Headlines

**Tab: Calendar**
- Monatskalender-Ansicht
- Navigation: ← vorheriger Monat | → nächster Monat
- Heutiges Datum: immer `new Date()` (NIEMALS hardcoded Datum)
- Events als farbige Chips auf Kalendertagen:
  - Earnings: lila
  - Dividend: grün
  - Holiday: grau
- Legende über Kalender
- Kein Klick auf Events nötig (Phase B)

---

### 6.8 Robo Advisor — /app/robo

**Zweck:** Preview einer automatisierten Portfolio-Verwaltung. Onboarding-Flow zur Strategie-Erfassung.

**Tabs:** Portfolio | Savings Plans | Round-up | Forecasts
**Standard-Tab:** Portfolio

**Tab: Portfolio — Hauptinhalt**

Besteht aus 3 Teilen:

**Teil 1: How It Works (4 Schritte)**
- ( 01 ) Ziel definieren
- ( 02 ) Risikoprofil festlegen
- ( 03 ) Portfolio wird gebaut
- ( 04 ) Automatisches Rebalancing
- Zweck: Erklärt das Konzept bevor User onboarded

**Teil 2: Portfolio-Typen (3 Karten)**
- Conservative: 50% Aktien · 50% Anleihen · ~5.1% p.a.*
- Core: 80% Aktien · 20% Anleihen · ~8.2% p.a.*
- Growth: 95% Aktien · 5% Anleihen · ~11.4% p.a.*
- *Immer mit Fußnote: "Historical estimate only — not a guarantee"
- ⚠️ Diese Angaben ohne Disclaimer = regulatorisches Risiko

**Teil 3: CTA Banner (dunkel)**
- "Coming Q4 2026" (niemals "Phase 3")
- "Start onboarding →" öffnet Onboarding-Flow

**Onboarding-Flow (wenn "Start onboarding" geklickt):**
```
Fortschrittsleiste (4 Punkte)
    ↓
Frage 1: Anlageziel?
    → [Vermögensaufbau] [Altersvorsorge] [Größerer Kauf] [Einkommen]
    ↓
Frage 2: Anlagehorizont?
    → [< 1 Jahr] [1–5 Jahre] [5–10 Jahre] [10+ Jahre]
    ↓
Frage 3: Bei 20% Verlust?
    → [Sofort verkaufen] [Halten und warten] [Nachkaufen]
    ↓
Frage 4: Erfahrung?
    → [Anfänger] [1–3 Jahre] [3+ Jahre]
    ↓
Ergebnis: Portfolio-Empfehlung
```

**Scoring-Logik:**
- "Sofort verkaufen" ODER "< 1 Jahr" → Conservative
- "Nachkaufen" UND "10+ Jahre" → Growth
- Alles andere → Core

**Back-Button:** Geht einen Schritt zurück (nicht zurück zum Portfolio-Übersicht)

**Andere Tabs:**
- Alle zeigen Empty State: "Coming Q4 2026." + kurze Beschreibung
- Niemals interne Roadmap-Sprache wie "Phase 3"

---

### 6.9 CFD — /app/cfd

**Zweck:** Preview-Seite für zukünftige CFD-Handelsfunktion.

**Wichtig:** CFD = Contracts for Difference = Hebelprodukte. Regulatorisch höchste Anforderungen.

**Content-Hierarchie:**
1. Überschrift: "Trade with leverage."
2. Untertitel: erklärt was CFDs sind
3. Stats-Leiste (4 Kennzahlen): Max Leverage | Asset Classes | Min Spread | Status
   - Status = "Preview" (NICHT "500+ Markets" oder "<10ms Execution" — das sind fabricated specs)
4. Risk Warning (PFLICHT, auch im Preview-Modus):
   - "⚠ Risk Warning: CFDs are complex instruments with a high risk of losing money due to leverage. Most retail investors lose money trading CFDs. pondex_ does not provide investment advice."
5. Preview-Banner: "Preview data — not live. CFD trading coming Q4 2026."
6. Instruments-Tabelle: Name | Typ | Leverage | Spread | Change | Status
   - "Change"-Spalte: NUR wenn als "Preview" gekennzeichnet — kein echtes Live-Pricing
7. Phase-CTA: "Full CFD execution engine. Coming Q4 2026."
   - "Join waitlist →" → Toast-Meldung ("You are on the waitlist."), KEIN /signup

**Regulatorik CFD (kritisch):**
- Die Risk Warning ist in der EU KEINE Option — sie ist PFLICHT für jede Seite mit CFD-Erwähnung (MiFID II Article 24)
- Die Angabe "Most retail investors lose money" ist eine regulatorische Anforderung
- Ohne diese Warning darf die Seite nicht live gehen

---

### 6.10 Account — /app/account (Phase D — noch nicht gebaut)

**Zweck:** User-Konto verwalten, Plan einsehen, Account löschen.

**Content-Hierarchie:**
1. Email-Adresse
2. Plan: Free tier / Pro tier
3. Member since: Datum
4. Available balance: — (für zukünftige Einzahlungen)
5. Verdicts today: X / 1 (Free) oder ∞ (Pro)
6. "Upgrade to Pro" Button (Free-User)
7. "Log out" Button
8. "Delete account" Link (GDPR-Pflicht) → Bestätigungs-Dialog → Account und alle Daten löschen

**GDPR-Pflicht:** Das Recht auf Löschung (Art. 17 DSGVO) erfordert eine funktionierende "Delete account" Option. Muss vor erstem EU-User live sein.

---

## 7. Informationsarchitektur — Score-Modell & Daten

### Das Score-Modell

```
Ticker-Input
    ↓
5 Faktoren werden bewertet (0–100 je Faktor):

Faktor 1: Fundamentals (Ratios)
    Datenbasis: P/E, Gross Margin, Revenue Growth
    Quelle: Yahoo Finance TTM

Faktor 2: Moat (Wettbewerbsvorteile)
    Datenbasis: Margen-Stabilität, Marktposition, Pricing Power
    Quelle: SEC EDGAR + Yahoo Finance

Faktor 3: Risk (ESG + Governance)
    Datenbasis: ESG-Score, Schuldenquote, Beta
    Quelle: Yahoo Finance

Faktor 4: Valuation (Bewertung)
    Datenbasis: P/E vs. Sektor, P/B, EV/EBITDA
    Quelle: Yahoo Finance

Faktor 5: Management (Kapitalallokation)
    Datenbasis: ROE, ROA, Buyback-Aktivität
    Quelle: Yahoo Finance + SEC EDGAR
    ↓
Gewichteter Durchschnitt → Gesamt-Score 0–100
    ↓
Score-Mapping:
    ≥ 70 → BUY (Strong/Good Fit)
    45–69 → HOLD (Moderate Fit)
    < 45 → SELL (Weak Fit)
```

### Konsistenz-Regel (wichtig)

**Gleicher Ticker = gleicher Score überall.** Wenn AAPL in der Landing Page Demo 78 zeigt, muss die App auch 78 zeigen. Drei verschiedene Scores für AAPL auf derselben Website = Vertrauensverlust.

Aktuell verletzt: Hero zeigt 59, ProductDemo zeigt 78, App.jsx zeigt 78. Muss angeglichen werden.

### Demo vs. Live

```
Phase B (aktuell):
    → Demo-Daten für 6 Ticker (AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN)
    → Chart: illustrative Daten (klar als "Illustrative" markiert)
    → Quote: illustrative Preise (mit "Illustrative"-Label)
    → Financials: echte historische Daten (aus öffentlichen Quellen manuell eingetragen)
    → Andere Ticker → Error State mit Demo-Chips

Phase C (Railway Backend live):
    → Echte Scores für alle Ticker via yfinance
    → Echte Preise und Tagesveränderungen
    → Chart: echte OHLCV-Daten
    → "Illustrative"-Label verschwindet
```

### Datenquellen-Hierarchie

```
Yahoo Finance
    → Preise, Kennzahlen, Finanzdaten, Unternehmensinfo
    → Primäre Quelle für >80% aller Daten
    → Rate Limit: yfinance Library, caching erforderlich

SEC EDGAR
    → Offizielle Filings: 10-K, 10-Q, 8-K
    → Für Moat + Management-Faktoren
    → Freier Zugang, keine Rate-Limits (aber langsam)

Groq AI (Llama 3.3)
    → Nur für Plain-Language-Erklärungen
    → Nie für Zahlen direkt
    → Prompt erzwingt Quellenangabe bei jeder Aussage
    → Rate Limit: kostenlos bis X req/min (muss gecacht werden)
```

---

## 8. Regulatorik & Compliance — UX-Konsequenzen

### 8.1 Was pondex_ ist und nicht ist (rechtliche Abgrenzung)

**Research Tool (erlaubt):**
- Daten anzeigen und strukturieren
- Algorithmus-basierte Scores berechnen und anzeigen
- Plain-Language-Erklärungen von Finanzkennzahlen
- Historische Daten visualisieren

**Investmentberatung (NICHT erlaubt, da keine MiFID II Lizenz):**
- Personalisierte Kaufempfehlungen ("Du solltest AAPL kaufen")
- Rendite-Prognosen ohne Disclaimer
- Direkte Handlungsanweisungen

**Grauzone (vorsichtig formulieren):**
- "BUY/HOLD/SELL" Signal → immer als "Research Signal", nie als "Empfehlung"
- "Exit: TRIM" → als "Exit Signal" framen, nicht als "Verkaufsempfehlung"
- Robo Advisor Renditen → immer mit "Historical estimate only — not a guarantee"

### 8.2 Disclaimer-Regeln — Wo + Wie

| Wo | Was steht dort | Pflicht? |
|---|---|---|
| Jede Score-Card | "Research tool only · Not financial advice" | Ja (überall) |
| Robo Advisor Renditen | "Historical estimate only — not a guarantee" | Ja (regulatorisches Risiko) |
| CFD-Seite | Vollständige MiFID II Risk Warning | Ja (gesetzliche Pflicht) |
| AI Chat (Phase E3) | "AI-generated · Always verify sources · Not financial advice" | Ja |
| Exit Strategy | "Exit signal based on data · Not a sell recommendation" | Ja |
| Footer | "Research tool only · Not financial advice" | Empfohlen |
| Signup | Link zu Terms of Service + Privacy Policy | Pflicht (GDPR) |

### 8.3 GDPR-Anforderungen

**Datensparsamkeit:**
- Nur Email wird gespeichert (Phase B: localStorage only)
- Phase D (Supabase): Email + createdAt + investor profile (answers)
- Keine Tracking-Pixel, keine Analytics ohne Consent in Phase B
- Google Analytics o.ä. NUR mit Cookie-Consent-Banner

**Pflichten vor erstem EU-User:**

| Pflicht | Status | Dringlichkeit |
|---|---|---|
| Privacy Policy | ❌ Nicht vorhanden (/privacy fehlt) | Hoch — vor Phase C |
| Terms of Service | ❌ Nicht vorhanden (/terms fehlt) | Hoch — vor Phase C |
| Link auf Signup-Seite | ❌ Nicht implementiert | Hoch — vor Phase C |
| Cookie-Consent-Banner | ❌ Nicht vorhanden | Mittel — vor Analytics |
| Account-Delete-Option | ❌ Nicht vorhanden | Hoch — vor Phase D |
| Recht auf Auskunft | ❌ Nicht implementiert | Mittel — vor Phase D |

### 8.4 Phase-spezifische Risiken

**Phase C (echte Daten):**
- Scores basieren auf echten Daten → Disclaimer noch wichtiger
- Keine Änderung an regulatorischem Status nötig

**Phase D (echte Auth + User-Profile):**
- GDPR-Compliance wird kritisch (echte personenbezogene Daten)
- Privacy Policy + Terms muss LIVE sein vor erstem echten Account
- Investor-Profil-Daten = sensitive Finanzdaten → besonderer Schutz

**Phase E (Stripe + Bezahlschranke):**
- EU Consumer Protection: Klare Preisangaben, Widerrufsrecht (14 Tage)
- Subscription-Terms müssen vor Zahlung sichtbar sein
- Automatische Verlängerung: muss explizit kommuniziert werden

**Phase E3 (AI Chat):**
- AI-generierte Antworten auf Finanzfragen → erhöhtes Risiko
- System-Prompt muss explizit verhindern dass AI Kaufempfehlungen gibt
- Jede AI-Antwort: Quellen + Disclaimer automatisch anhängen

**Phase E2 (Exit Strategy):**
- "EXIT" als Signal ist grenzwertig → Framing als Datenpunkt, nicht Empfehlung
- Beispiel: "Exit Score: 28/100 — RSI indicates overbought conditions" ✓
- Nicht: "You should exit this position" ✗

---

## 9. Offene UX-Entscheidungen

Die folgenden Fragen müssen entschieden werden bevor die entsprechenden Phasen gebaut werden:

### Entscheidung 1: Home vs. Portfolio — getrennt oder zusammengeführt?

**Option A (aktuell implementiert):** Getrennte Seiten
- Home = Kuratierter Einstieg (Top Movers + Events + Robo-Teaser)
- Portfolio = Eigene Investments
- Pro: Mehr Platz für Discovery-Content auf der Startseite
- Con: Duplikation (Watchlist erscheint auf beiden Seiten)

**Option B:** Zusammengeführt (Portfolio ist die Startseite)
- Pro: Schlankere Navigation, kein Duplikations-Risiko
- Con: Discovery-Features müssen im Portfolio-Kontext untergebracht werden

**Empfehlung:** Option A — ICP (selbstgesteuerter Anleger) profitiert von kuratierten Movers + Events als Einstieg.

### Entscheidung 2: Free Tier Gate — UX des Modals

Drei mögliche Ansätze:
- **Harter Block:** Nach 1 Analyse ist die Analyse-Funktion gesperrt bis Mitternacht. Upgrade-Modal erscheint.
- **Weicher Hinweis:** Analyse funktioniert noch einmal, danach Hinweis + Modal.
- **Kontextueller Prompt:** Modal erscheint nach der 1. Analyse am selben Tag, nicht als Block.

**Empfehlung:** Kontextueller Prompt — User hat bereits Wert erhalten, ist am offensten für Upgrade.

### Entscheidung 3: Onboarding-Tiefe

- **5 Fragen** (wie in Phase D geplant): Umfassend, aber 10–15 Sekunden Aufwand
- **3 Fragen** (Ziel, Horizont, Risiko): Schneller, weniger Personalisierung
- **Skip-Option:** User kann Onboarding überspringen, Profil = Default-Gewichtung

**Empfehlung:** 3 Fragen mit Skip-Option. Research zeigt (<2 min Setup als Dealbreaker).

### Entscheidung 4: Score-Gewichtung sichtbar machen

Sieht der User wie sein Profil den Score beeinflusst?
- **Option A:** "Your AAPL score (Value Investor): 62/100 vs. Default: 78/100"
- **Option B:** Nur ein Score, aber Tooltip erklärt welches Profil aktiv ist
- **Option C:** Kein sichtbarer Unterschied — Profil beeinflusst Score "unsichtbar"

**Empfehlung:** Option A — Transparenz ist Kernversprechen.

### Entscheidung 5: Mobile Navigation

AppNav überläuft unter ~900px. Noch kein Hamburger-Menü.

Optionen:
- **Hamburger mit Dropdown:** Alle Nav-Links in ein ausklappbares Menü
- **Bottom Navigation:** Fußzeile mit 5 Icons (wie mobile Apps)
- **Priorisierung:** Nur die wichtigsten 3 Links bleiben sichtbar, Rest im Overflow

**Empfehlung:** Bottom Navigation für Mobile (Home | Markets | Search | Portfolio | Account) — entspricht nativem App-Pattern, bekannt aus Trade Republic/Revolut.

---

## 10. Was fehlt / gebaut werden muss

### Strukturell fehlende Seiten

| Seite | Dringlichkeit | Phase |
|---|---|---|
| /app/account | Hoch — Profile-Button geht ins Leere | Phase D |
| /404 (PageNotFound) | Mittel — Wildcard leitet auf Landing | Phase C |
| /terms | Hoch — GDPR-Pflicht | Vor Phase C |
| /privacy | Hoch — GDPR-Pflicht | Vor Phase C |

### Flows die nicht funktionieren

| Flow | Problem | Phase |
|---|---|---|
| Free Tier Gate (1/Tag) | Advertised aber nicht implementiert | Phase E |
| Upgrade Modal | Existiert nicht | Phase E |
| Score nach User-Profil gewichtet | Nicht gebaut | Phase D |
| Account löschen | Fehlt (GDPR) | Phase D |
| Watchlist editierbar | Hardcoded | Phase C |
| Mobile Navigation | AppNav überläuft | Phase C |

### Content das repariert werden muss

| Problem | Wo | Fix |
|---|---|---|
| AAPL Scores inkonsistent (59 vs. 78) | Landing Hero vs. App | Einheitlicher Score aus einer Quelle |
| Collections ohne Klick-Funktion | Markets → Collections | onClick hinzufügen oder Cursor entfernen |
| Wildcard → Landing statt 404 | App.jsx | PageNotFound.jsx verwenden |

---

## 11. Research-Findings — Was die Nutzerstudien ergeben haben

_Basis: Survey Wave 1 (n=56), Wave 2 (n=35), 3 User-Interviews (Gunnar L., Patricia P., José B.)_
_Alle Findings sind produktentscheidungsrelevant — kein Nice-to-know._

### 11.1 Die 10 gesicherten Kernbefunde

**Befund 1 — Signal/Noise ist der dominante Pain (🟢 Hoch gesichert)**
- 51% Wave 1, 40% Wave 2 nennen "zu viel widersprüchliche Information" als #1 Frustration
- Repliziert sich durch alle 3 Interviews unabhängig voneinander
- UX-Konsequenz: pondex_ muss eine klare Antwort geben — nicht mehr Daten, sondern weniger Lärm

**Befund 2 — Quellenangabe ist kein Feature, sondern Vertrauensvoraussetzung (🟢 Hoch)**
- 58–64% vertrauen KI-Output nur wenn Quelle + Formel sichtbar
- "I don't trust anyone — I need to see where the number comes from." — José B.
- UX-Konsequenz: Jede Zahl in pondex_ muss eine Quelle haben. Keine unattributierten Zahlen zeigen.

**Befund 3 — Geäußertes Interesse ≠ Zahlungsbereitschaft (🟡 Mittel)**
- 86% positiv auf Konzept, aber nur 10% sagen "Yes" zu €4.99/Monat
- 59% sagen "Maybe" — Barrier ist fehlender Proof, nicht der Preis
- UX-Konsequenz: Free Tier zuerst. User muss Wert erleben bevor Paywall. Upgrade-Trigger = "zweite Analyse heute"

**Befund 4 — Churner verließen bestehende Tools aus genau dem Grund, den pondex_ löst (🟢 Hoch)**
- Beide Probanden mit Zahlungshistorie ($15–50/Monat) kündigten weil Noise-Problem ungelöst blieb
- "Ich habe gezahlt und trotzdem nicht gewusst wo ich anfangen soll." — Gunnar L.
- UX-Konsequenz: pondex_ muss von Anfang an zeigen dass es Noise reduziert, nicht hinzufügt

**Befund 5 — Peer-Vergleich ist die stärkste ungestützte Reaktion aller Interviews (🟢 Hoch)**
- "I really like the comparison part, because that's how you can actually make a decision." — José B.
- Alle 3 Interviewten reagierten stärker auf Vergleich als auf Score allein
- UX-Konsequenz: Peer-Comparison ist kein nice-to-have sondern Load-Bearing-Feature für Conversion

**Befund 6 — Erklärung vor Score ist die richtige Reihenfolge (🟡 Mittel)**
- Passive Investoren wollen verstehen bevor sie urteilen
- "Score with explanations for beginners, not just numbers." — Patricia P.
- UX-Konsequenz: Factor Breakdown immer sichtbar, nicht hinter Tab; Tooltips für Fachbegriffe

**Befund 7 — Personalisierung ist Differenziator (Patricia-Insight) (🟡 Mittel)**
- "Das Tool muss mich kennen." — Patricia P.
- Gleiche Aktie, anderer Score je nach Investoren-Typ — höchste Differenzierungsreaktion
- UX-Konsequenz: Investor-Profil und Score-Gewichtung sind Phase D Pflicht, nicht Optional

**Befund 8 — Fragmentation ist das strukturelle Problem, nicht Tool-Qualität (🟢 Hoch)**
- Durchschnittlicher User nutzt 4–5 Tools (YouTube → ChatGPT → Broker → Yahoo Finance)
- Kein Tool replaces den anderen — alle lösen nur Teil des Problems
- UX-Konsequenz: pondex_ muss als Replacement positioniert werden, nicht als Addition

**Befund 9 — "When to sell" ist ungelöstes Problem überall (Gunnar-Insight) (🟡 Mittel)**
- Kein bestehendes Tool hat Exit-Signale
- "Ich weiß nie wann ich verkaufen soll." — Gunnar L.
- UX-Konsequenz: Exit Strategy (Phase E2) ist echter Differenziator, kein Feature-Bloat

**Befund 10 — Cold-Audience-Validierung fehlt noch (🔴 Wichtige Lücke)**
- Wave 1 + Wave 2 = Warm Network (Freunde, LinkedIn-Kontakte von Daniel)
- Wave 2 war für Reddit geplant, wurde als Warm-Network durchgeführt
- Risiko: Alle positiven Signale könnten durch Social Bias verzerrt sein
- UX-Konsequenz: Kein Feature auf Basis von Warm-Network-Daten als "validated" betrachten

### 11.2 User-Archetypes aus den Interviews (Primärquellen)

**Archetype 1: Gunnar L. — "Der Churned Value Investor"**
- Profil: Wert-/Optionshändler, NYSE-fokussiert, nutzt TradingView + IBKR, YouTube als Inspirationsquelle (Mario Lochner, Markus Koch, Ticker Symbol U)
- Hat für Research-Tools gezahlt ($15–50/Monat), aufgehört wegen Life-Change (nicht Produkt-Failure)
- Kernpain: "Wenn ich 2 Stunden für Research aufwenden wollte, wüsste ich nicht wo ich anfangen soll"
- Was er von pondex_ will:
  1. Score 0–100 (nicht 0–10 — "fühlt sich komplett willkürlich an")
  2. Moving Averages (50/200-Tage) im Chart
  3. Chart-Interpretation in Plain Language ("Was kann ich aus diesem Chart lesen? Diese Erklärung fehlt überall")
  4. Peer/Sektor-Benchmarking
  5. Support/Resistance-Linien
  6. Reorderbares Dashboard
- Churn-Insight: Retargeting-Emails scheiterten weil sie Features bewarben statt sein WHY (z.B. "Thailand-Traum") anzusprechen
- Retention-Schlüssel: User an seinen persönlichen Investment-Grund erinnern, nicht an Produkt-Features
- WTP: Hat bewiesen ($15–50/Monat) — höchster Wert aller Befragten

**Archetype 2: Patricia P. — "Die Passive Noise-Reducerin"**
- Profil: Tech-Profi, passiver Investor, investiert "alle paar Monate", nutzt YouTube → ChatGPT → Trade Republic
- Trigger für Research: Aktuelle News (z.B. Hitzewelle → Klimaanlagen-Aktien)
- Kernpain: "Welche Aktie passt zu MIR? Zu meinem Risiko, Budget, Dividenden-Präferenz?"
- Was sie von pondex_ will:
  1. Score MIT Erklärungen für Anfänger (Score allein reicht nicht)
  2. Personalisierung: Tool kennt ihr Profil + Portfolio
  3. Portfolio-Companion: fasst zusammen ohne manuelles Suchen
  4. Tooltip-Glossar für Fachbegriffe (DCF, Verdict, P/E)
  5. Scrolling statt Klicken (mobile-first Denkweise)
- Pricing (Van Westendorp): €3–5/Monat als "Schnäppchen"-Niveau (iCloud/Netflix-Tier), unter €2.99 = Qualitätszweifel
- Onboarding: 5-Fragen-Intake für Risiko/Strategie als Pflicht für Personalisierung
- Würde empfehlen: "Echt ein cooles Tool, vor allem mit Erklärungen"

**Archetype 3: José B. — "Der Skeptische Finance-Professional"**
- Profil: Bankenhintergrund, Mexiko, passiver/risiko-averser Investor, ETF-schwer, long-term
- Research-Workflow: Bank-Newsletter → ChatGPT/Gemini → Yahoo Finance → Broker
- Trigger: Makro-Events (z.B. Ölpreise)
- Kernpain: "It is not integrated" — braucht eine Plattform mit Finanzdaten + Ratings + Links zu Jahresberichten + Broker-Provisionen
- Vertrauensmodell: Gemini als vertrautestes Tool weil es "klar BUY/HOLD/SELL zeigt und erklärt warum"
- Was er von pondex_ will:
  1. Peer/Sektor-Vergleich (stärkste Reaktion überhaupt — "That's how you make a decision")
  2. Chart immer sichtbar mit Zeitraum-Selector (1d/3m/1y/max)
  3. Leverage + Revenue Ratios auf einen Blick
  4. Jährliche Berichte verlinkt
  5. Broker-Provisionen sichtbar (sekundäres Pain, nicht MVP)
- Verhalten: Kreuzt AI-Output immer manuell gegen Investor-Relations-Seiten — sucht unabhängige Bestätigung
- Secondary Pain: Broker-Gebühren + mexikanische Steuern reduzieren Rendite unsichtbar

### 11.3 Was User NICHT wollen (Dealbreaker)

Aus allen 3 Interviews und Survey-Daten:

| Dealbreaker | Quelle | UX-Konsequenz |
|---|---|---|
| Score ohne Erklärung | Alle 3 Interviews | Factor Breakdown immer sichtbar, nie hinter Klick verstecken |
| AI ohne Quellenangaben | 64% Wave 1 | Jeder AI-Output: mindestens 1 Quellenangabe |
| Setup > 2 Minuten | Patricia P. | Onboarding max. 3 Fragen, Skip-Option |
| "Noch ein weiteres Tool" | Wave 1 allgemein | Als Replacement positionieren, nicht Addition |
| Zahlen ohne Kontext | Gunnar + José | Immer: Zahl + Sektor-Benchmark + Trend |
| Unklare Aktualität der Daten | Patricia P. | Immer Datum der letzten Aktualisierung zeigen |
| Kein Personalbezug | Patricia P. | Score muss Investor-Profil kennen (Phase D) |

---

## 12. Revolut als UX-Referenz

_Basis: Reverse-Engineering der Revolut Investment App (Juli 2026)_
_Zweck: Was macht Revolut gut? Was sollte pondex_ anders machen?_

### 12.1 Revolut's Navigationsstruktur

```
Revolut App — Investments-Bereich
│
├── Dashboard (Startseite Investments)
│   ├── Portfolio-Übersicht (Gesamtwert, Performance-Chart)
│   ├── Watchlist (gemerkte Aktien)
│   ├── Top Movers Abschnitt
│   └── Robo Advisor Teaser
│
├── Suche / Entdecken
│   ├── Suchfeld (Ticker oder Firmenname)
│   ├── Trendliste
│   └── Kategorien/Themen
│
├── Stock Detail (nach Suche/Klick)
│   ├── Chart (immer sichtbar, prominent, interaktiv)
│   ├── Übersicht-Tab
│   │   ├── "Warum kaufen/nicht kaufen" (plain language)
│   │   ├── Dimensionen-Karten (Bewertung, Wachstum, Profitabilität)
│   │   ├── Kennzahlen-Zusammenfassung
│   │   ├── Events im Chart markiert
│   │   ├── Peer-Liste (ähnliche Aktien)
│   │   └── Datenlieferant-Attribution
│   ├── Statistiken-Tab (alle Kennzahlen)
│   ├── News-Tab
│   ├── Events-Tab (Earnings, Dividenden)
│   └── Research-Tab (Analysten-Ratings)
│
├── Kauf/Verkauf (Modal über Stock Detail)
│
├── Events-Kalender
│
├── Robo Advisor
│   ├── Portfolio-Übersicht
│   ├── Sparpläne
│   └── Prognosen
│
└── Watchlist (eigene Liste)
```

### 12.2 Was Revolut besonders gut macht

**1. Chart als erstes Element auf Stock Detail**
- Chart ist das erste was der User sieht, nicht Text oder Zahlen
- Interaktiv: Finger/Cursor bewegen zeigt Preis zu diesem Zeitpunkt
- Zeitraum-Selector direkt unter Chart (1T / 1W / 1M / 3M / 1J / Max)
- Events (Earnings, Dividenden) werden als Markierungen im Chart angezeigt
- UX-Erkenntnis: Chart schafft sofortigen Kontext für alle nachfolgenden Zahlen

**2. Plain-Language Erklärungen als Kern, nicht als Add-on**
- "Warum könnte diese Aktie interessant sein" und "Risiken" in 2–3 Sätzen
- Kein Fachjargon — für Einsteiger verständlich
- Attribution: "Powered by Factset" sichtbar (Vertrauen durch Transparenz)
- UX-Erkenntnis: Quelle + Plain Language = José B.'s Hauptgrund warum er Gemini vertraut

**3. Dimensionen-Karten für schnellen Überblick**
- 4–5 Karten: Bewertung | Wachstum | Profitabilität | Dividende | Momentum
- Jede Karte: Status (Gut/Neutral/Schwach) + 1 Satz Erklärung
- Modular — User sieht sofort welche Dimension stark/schwach ist
- UX-Erkenntnis: Entspricht genau pondex_'s Factor Breakdown, aber visuell auf Karten statt Balken

**4. Peer-Liste prominent platziert**
- "Ähnliche Aktien" direkt auf der Übersichtsseite, keine separate Seite
- Zeigt: Name + Preis + % Change
- UX-Erkenntnis: José B.'s stärkste Reaktion war Peer-Vergleich — Revolut macht das richtig

**5. Events in Chart und eigene Events-Sektion**
- Earnings-Datum als Linie im Chart
- Ex-Dividend-Date sichtbar
- Eigener "Events"-Tab mit kommenden Terminen
- UX-Erkenntnis: Gunnar will Context für Chart-Bewegungen — Events lösen das

**6. Datenlieferant-Attribution**
- "Kurse von Polygon.io", "Fundamentaldaten von Factset", "News von StreetAccount"
- Jede Datenquelle sichtbar attributiert
- UX-Erkenntnis: Direkte Umsetzung von Befund 2 (Quellenangabe als Vertrauensvoraussetzung)

**7. Disclaimer integriert, nicht versteckt**
- Disclaimer erscheint direkt unter der Empfehlung, nicht nur im Footer
- "Diese Information stellt keine Anlageberatung dar" genau dort wo das Signal steht
- UX-Erkenntnis: Regulatorisch korrekt UND kein Vertrauensverlust durch Sichtbarkeit

### 12.3 Was Revolut hat, pondex_ (noch) nicht hat

| Feature | Revolut | pondex_ | Phase |
|---|---|---|---|
| Chart immer als erstes Element | ✅ | ⚠️ Chart vorhanden, aber nach Scrollen | Phase C |
| Events im Chart markiert | ✅ | ❌ Events-Overlay fehlt | Phase C |
| Peer-Vergleich mit echten Daten | ✅ | ⚠️ Links zu Peers, kein Vergleich nebeneinander | Phase E |
| Dimensionen-Karten | ✅ | ⚠️ Vorhanden als Balken, nicht als Karten | Phase D |
| Watchlist editierbar | ✅ | ❌ Hardcoded | Phase C |
| Preisalarme | ✅ | ❌ Nicht geplant | Phase E+ |
| Onboarding → Risikoabfrage | ✅ | ⚠️ Nur für Robo Advisor | Phase D |
| Broker-Integration | ✅ (ist Broker) | ❌ Kein Trading geplant | — |
| Exit-Strategie / When to Sell | ❌ | 🔄 Geplant (Phase E2) | Phase E2 |
| Thesis Tracker | ❌ | 🔄 Geplant (Phase E2) | Phase E2 |
| Score 0–100 mit Quellenattribution | ❌ | ✅ | Kernfeature |

### 12.4 Was pondex_ besser machen kann als Revolut

| Bereich | Revolut | pondex_ Vorteil |
|---|---|---|
| Score-Transparenz | Kein expliziter Score — nur Dimensionen | 0–100 Score + BUY/HOLD/SELL + 5 Faktoren mit Quellen |
| Exit-Signale | Nicht vorhanden | Exit Strategy mit Thesis Tracker (Phase E2) — echter Differenziator |
| Personalisierung | Kein investor-spezifischer Score | Score wird nach Investor-Profil gewichtet (Value/Growth/Dividend) |
| Unabhängigkeit | Revolut = Broker (Interessenkonflikt) | pondex_ = reine Research (kein Eigeninteresse an Trade-Execution) |
| Quellen-Granularität | "Powered by Factset" (grob) | Jede einzelne Zahl mit spezifischer Quelle |

### 12.5 UX-Patterns von Revolut die pondex_ übernehmen sollte

1. **Chart als erstes Element** — Nicht nach Scrollen, sondern sofort sichtbar nach Score
2. **Events als Chart-Markierungen** — Earnings und Dividenden direkt im Preischart
3. **Dimensionen-Karten statt nur Balken** — Factor Breakdown visuell aufwerten (Phase D)
4. **Disclaimer direkt neben dem Signal** — Nicht nur im Footer, sondern genau dort wo BUY/HOLD/SELL steht
5. **Datenquelle pro Kennzahl sichtbar** — Nicht nur "Yahoo Finance" pauschal, sondern "P/E: 32.4x · Yahoo Finance TTM"

---

## 13. Exit Strategy — Vollständige UX-Spezifikation

_Basis: EXIT-STRATEGY-SPEC.md + Gunnar L. Interview_
_Größter ungenutzter Differenziator: kein Konkurrent hat das._

### 13.1 Das Problem das Exit Strategy löst

**"Ich weiß nie wann ich verkaufen soll."** — Gunnar L.

Alle bestehenden Tools (Yahoo Finance, Seeking Alpha, Revolut, Bloomberg) lösen das Buy-Signal. Niemand löst das Sell/Exit-Signal. Das ist die ungelöste Seite jeder Investment-Entscheidung.

Drei Szenarien die heute ungelöst sind:
1. User hat TSLA für $300 gekauft, es steht bei $320 — soll er halten oder mitnehmen?
2. User hat AAPL seit 2 Jahren — Fundamentals haben sich verschlechtert, aber er merkt es nicht
3. User hatte eine These beim Kauf — die These ist längst gebrochen, aber er hält weiter

### 13.2 Die 5 Komponenten der Exit Strategy

**Komponente 1: Thesis Tracker (Phase E2 — Teil 1)**
- Bei Hinzufügen einer Aktie zur Watchlist: optionales Formular
  - "Why are you watching this stock?" (freier Text oder Template)
  - Ziel-Score: "Alert me when score drops below [X]"
  - Wichtigste Metriken die du beobachtest (z.B. Revenue Growth, Gross Margin)
  - Geplanter Haltezeitraum (3M / 1J / 3J / Langfristig)
- Gespeichert in localStorage (Phase D: Supabase)

**Komponente 2: Score Decay Monitor (Phase E2 — Teil 1)**
- Wöchentlicher Check: Hat sich der Score um >15 Punkte verändert?
- Wenn ja → Notification/Badge auf der Watchlist-Zeile
- "AAPL score fell from 78 → 61 this week"
- Phase D: Email-Benachrichtigung möglich

**Komponente 3: Thesis Condition Checker (Phase E2 — Teil 2)**
- Prüft wöchentlich ob die gespeicherten Schlüsselmetriken >20% vom Kaufzeitpunkt abgewichen sind
- Beispiel: "Revenue Growth war beim Kauf +15% — jetzt ist es -2%"
- Zeigt "Thesis condition changed" Badge auf der Watchlist-Zeile

**Komponente 4: Exit Review Screen (Phase E2 — Teil 2)**
- Eigener Tab oder Section auf /app/stock?ticker=TSLA
- Zeigt:
  - Thesis Drift (wie hat sich die These verändert)
  - Score Decay Treiber (welche Faktoren haben sich verschlechtert)
  - Primäre Performance-Treiber
  - Exit-Score 0–100
  - Signal: HOLD / TRIM / EXIT
- Immer mit Framing: "Your thesis conditions have changed — review recommended" ✅
- Niemals: "You should sell" ❌

**Komponente 5: Strategy-basierte Auto-Thresholds (Phase E2 — Teil 2)**
- Value Investor: Alert bei Score < 55 (unter HOLD-Grenze)
- Growth Investor: Alert bei Revenue Growth Deceleration > 30%
- Dividend Investor: Alert bei Dividend-Kürzung oder Payout-Ratio > 100%
- Momentum Trader: Alert bei technischem Trend-Bruch (z.B. unter 200-Tage-MA)

### 13.3 User Flow — Exit Strategy

```
User hat TSLA in Watchlist
    ↓
Beim Hinzufügen zur Watchlist:
    "Add a thesis?" [Optional — kann übersprungen werden]
    → Gekauft bei: $240
    → These: "EV-Marktführer, AI-Integration, Musk-Faktor"
    → Alarm wenn Score fällt unter: 50
    ↓
Wöchentlich (automatisch im Hintergrund):
    Score-Check: TSLA war 42 → jetzt 38 → Score Decay Badge erscheint
    Thesis-Check: Revenue Growth war +21% → jetzt +3% → Thesis-Badge
    ↓
User öffnet Portfolio oder Watchlist:
    TSLA zeigt orange Badge: "Score -4 this week · Thesis condition changed"
    ↓
User klickt auf TSLA → /app/stock?ticker=TSLA
    ↓
Neuer Tab "Exit Check" sichtbar (neben Overview, Key Metrics etc.)
    ↓
Exit Check Tab:
    Exit Score: 28/100
    Signal: EXIT (rot)

    Thesis Drift:
    "Revenue Growth: Was +21% when you added — now +3%"
    "P/E: 88x vs. Sector avg 24x (was 65x when added)"

    Score Decay Drivers:
    "Valuation factor: 52 → 28 (-24 points)"
    "Fundamentals: 48 → 41 (-7 points)"

    [Review recommended · Not a sell recommendation]

    Sources: Yahoo Finance · Not financial advice
```

### 13.4 Regulatorische Framing-Regeln für Exit Strategy

| Erlaubt ✅ | Nicht erlaubt ❌ |
|---|---|
| "Exit Score: 28/100" | "Verkaufen Sie diese Aktie" |
| "Your thesis conditions have changed" | "Wir empfehlen Ihnen zu verkaufen" |
| "TRIM signal: score 45–55" | "Nehmen Sie Gewinne mit" |
| "Review recommended" | "Jetzt wäre ein guter Zeitpunkt" |
| "RSI indicates overbought conditions (78)" | "Die Aktie ist überkauft — verkaufen Sie" |
| "Score fell 24 points since you added" | "Diese Aktie hat ihren Höhepunkt erreicht" |

**Langfristige Vision (Phase 4+):**
- Decision Quality Feedback Loop: Wenn User verkauft → 3 Monate später: "Deine Entscheidung war X% richtig/falsch" — keine Beratung, nur Lern-Feedback
- Personal Pattern Recognition: "Du neigst dazu bei Scores unter 45 zu verkaufen, aber historisch war das suboptimal" — reine Datenbeobachtung, keine Empfehlung
- Dies wäre ein dauerhafter Moat: kein Konkurrent hat User-spezifisches Entscheidungs-Feedback

---

## 14. AI Chat & Discovery — Geplante Phase 4+ Features

_Basis: DISCOVERY-AI-CHAT-SPEC.md_

### 14.1 Discovery (Phase 4 — nach Exit Strategy)

**Problem:** Aktuell muss User bereits einen Ticker kennen. Was wenn er sucht?

**"Zeige mir deutsche Dividenden-Aktien mit P/E < 20"** → heute: unmöglich in pondex_

**Discovery-Konzept:**
```
Statt: "Analysiere AAPL"
    ↓
Discovery-Seite: Filter-basierte Suche
    → Geografisch: Deutschland, EU, USA, Global
    → Sektor: Technologie, Gesundheit, Energie...
    → Asset-Klasse: Aktien, ETFs (Phase 4+)
    → Fundamentale Filter: P/E < 20, Gross Margin > 40%, Score > 70
    ↓
    ODER: Freitext-Input (AI interpretiert)
    "Ich suche stabile Dividenden-Aktien für langfristigen Aufbau"
    → AI extrahiert Filter → zeigt Ergebnisse
    ↓
Ergebnis-Liste:
    Ticker | Firmenname | Score | P/E | Dividende | "Analysieren →"
```

### 14.2 AI Chat mit Gedächtnis (Phase 4)

**Problem:** Einmal-Anfragen vergessen was der User gesagt hat

**Chat-Konzept:**
- Persistente Konversation über Sessions hinweg
- Gedächtnis-Modell:
  - Gelernte Präferenzen ("User bevorzugt Value Investing")
  - Gesprächshistorie (letzte 50 Nachrichten)
  - Geäußerte Präferenzen ("ich investiere langfristig")
  - Analysehistorie (welche Aktien analysiert)
- AI-System-Prompt liest Gedächtnis bei jeder Anfrage
- Quellenattribution in jeder Antwort: "Laut Yahoo Finance (TTM)..."

**Was erlaubt ist:**
- "Erkläre mir was P/E bedeutet"
- "Warum hat AAPL einen Score von 78?"
- "Was sind die größten Risiken bei TSLA laut dem Score?"

**Was verboten ist (System-Prompt verhindert es):**
- "Soll ich AAPL kaufen?" → Antwort darf keine Kaufempfehlung sein
- "Ist jetzt ein guter Zeitpunkt?" → kein Timing-Advice

---

## 15. Wettbewerbskontext & Positionierung

### 15.1 Competitive Map

```
TIEFE DER ANALYSE
        ↑
        │
        │  Bloomberg Terminal    Seeking Alpha
        │  (teuer, komplex)      (Paywall, viel Noise)
        │
        │              Morningstar
        │              (gut, teuer)
        │
        │                    pondex_ (Ziel)
        │              Simply Wall St.
        │              (Score aber intransparent)
        │
        │  Revolut           Trade Republic
        │  (Broker, Research  (Broker, wenig Research)
        │   als Add-on)
        │
        │       Yahoo Finance  ChatGPT
        │       (Daten, kein   (Insights, keine
        │        Signal)        Quellen)
        │
        └────────────────────────────────────→
              einfach               komplex
```

### 15.2 Was kein Konkurrent hat

| Feature | Yahoo Finance | ChatGPT | Revolut | Simply Wall St. | Bloomberg | pondex_ |
|---|---|---|---|---|---|---|
| Score 0–100 | ❌ | ❌ | ❌ | ✅ (Sterne) | ❌ | ✅ |
| Jede Zahl quellenattributiert | ❌ | ❌ | Teilweise | ❌ | Teilweise | ✅ |
| BUY/HOLD/SELL in Plain Language | ❌ | ✅ | ❌ | ❌ | Analysten | ✅ |
| Score nach Investor-Profil | ❌ | ❌ | ❌ | ❌ | ❌ | Phase D |
| Exit Strategy / Thesis Tracker | ❌ | ❌ | ❌ | ❌ | ❌ | Phase E2 |
| Bezahlbar für Retail | ✅ (kostenlos) | ✅ | ✅ | €10–30 | ❌ ($300+) | ✅ (€0/€4.99) |

### 15.3 Hauptrisiko: Plattform-Integration

**Szenario:** Trade Republic oder Revolut baut einen "Research Score" als Feature in ihre Broker-App.
- Sie haben bereits alle User, alle Daten, keine Akquisitionskosten
- pondex_ müsste dann als eigenständiges Produkt konkurrieren

**Gegenargument:** Broker haben Interessenkonflikt — mehr Trades = mehr Umsatz. pondex_ hat keinen Interessenkonflikt.

**Schutzwall:** Thesis Tracker + Exit Strategy + Personalisierung sind komplex zu replizieren. Revolut hat es nicht. Wenn pondex_ das zuerst baut und nutzt, entsteht ein echter Moat durch historische Nutzer-Daten.

---

_Stand: 2026-07-24_
_Nächste Review: nach Phase C (Backend live)_
_Verweis-Docs:_
_· WEBSITE-SPEC-COMPLETE.md (UI + Design Details)_
_· APP-INFORMATION-ARCHITECTURE.md (IA-Diagramm)_
_· COUNCIL-AUDIT-2026-07-23.md (Bekannte Bugs + Findings)_
_· ROADMAP.md (Timeline)_
_· EXIT-STRATEGY-SPEC.md (Exit Strategy Detail-Spec)_
_· DISCOVERY-AI-CHAT-SPEC.md (AI Chat Detail-Spec)_
_· revolut-ui-architecture.md (Competitor Reference)_
