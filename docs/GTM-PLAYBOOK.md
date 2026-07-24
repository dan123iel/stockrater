# pondex_ — Go-to-Market: 0 → 1.000 zahlende User
_Stand: 2026-07-24 · Solo-Founder Playbook · Realistisch für 1 Person_

---

## Ausgangslage

- **Heute:** Phase B live, Demo-Daten, keine echte Auth
- **Phase C:** Echtes Backend, beliebige Ticker analysierbar
- **Phase D:** Echte Accounts (Supabase)
- **Phase E:** Stripe, Pro-Tier, Upgrade-Gate

Ziel: **1.000 zahlende Pro-User** bis Ende Q1 2027

**Conversion-Annahmen (konservativ):**
```
Landing Visitor → Free Signup:     3–5%
Free Signup → Aktiver Nutzer:     30–40% (hat >1 Analyse gemacht)
Aktiver Nutzer → Pro Upgrade:     5–10%
```
→ 1.000 Pro-User braucht ~20.000–30.000 Landing Page Visitors mit diesen Raten
→ Oder: bessere Conversion bei weniger Traffic

---

## 1. Aktivierungs-Fundament (vor allem anderen)

**Vor jedem GTM-Schritt muss die Aktivierungs-Rate stimmen:**

```
Neue User → erste Analyse → "Aha!" → Wiederkehr
```

Die 3 Metriken die stimmen müssen bevor Traffic geholt wird:
1. **Aktivierungs-Rate** > 50% (Anteil Signups die ≥1 Analyse machen)
2. **D7 Retention** > 20% (User die 7 Tage nach Signup zurückkommen)
3. **Upgrade-Rate** > 5% (Free → Pro innerhalb 30 Tage)

**Wenn diese nicht stimmen: mehr Traffic bringt nichts — Produkt zuerst.**

---

## 2. Phase C: Warm Launch (Aug 2026)

**Ziel:** Erste 100 echte Nutzer mit echten Daten. Feedback sammeln, Fehler finden.

### Kanal: Persönliches Netzwerk (kostenlos)

- LinkedIn-Post: "pondex_ analysiert jetzt beliebige Aktien — kostenlos testen"
- Direktnachrichten an Wave 1 Survey-Teilnehmer (45 Kontakte)
- 5–10 Personen aus Interviews persönlich einladen + Feedback-Session

**Erwartetes Ergebnis:** 50–150 Signups, 20–50 aktive Nutzer

### Kanal: Product Hunt (kostenlos)

- Launch auf Product Hunt nach Phase C Stabilisierung
- Kategorie: "Finance", "Productivity"
- Vorbereitung: 10–15 Upvote-Commitments aus Netzwerk vorher sichern
- Timing: Dienstag oder Mittwoch, 00:01 Uhr PST

**Erwartetes Ergebnis:** 200–800 Visitors an Launch-Tag, 50–150 Signups

### Kanal: IndieHackers / Hacker News (kostenlos)

- IndieHackers: "Show IH: I built a stock research tool that cites every source"
- HN: "Show HN: pondex_ — sourced stock verdict in 60 seconds"
- Authentizität zeigen: Research-Prozess, n=45 Interviews, Solo-Founder-Story
- Nicht shillen — Mehrwert durch Offenheit

---

## 3. Phase D: Cold Audience Test (Sep 2026)

**Ziel:** Validieren dass das Produkt für Fremde (nicht Daniels Netzwerk) funktioniert.

### PFLICHT vor Phase E: Reddit Cold-Audience-Test

```
Subreddits (priorisiert):
  r/eupersonalfinance    (350k Mitglieder, EU-fokussiert)
  r/personalfinance      (18M Mitglieder, US-dominiert)
  r/investing            (2.5M Mitglieder)
  r/ETFs                 (350k Mitglieder)
  r/ValueInvesting       (250k Mitglieder)
```

**Post-Format (kein Spam — Community-Mehrwert first):**
```
Titel: "I interviewed 45 retail investors about their research process —
        here's what I learned (and built)"

Inhalt:
- 3–4 Key Findings aus Research (Signal/Noise, Quellenvertrauen)
- "Built pondex_ to solve my own problem"
- Demo-Link am Ende — nicht der Fokus
- Offen für Feedback

UTM-Links: ?utm_source=reddit&utm_campaign=cold_test_1
```

**Messung:**
- Conversion-Rate Reddit → Signup
- Vergleich mit Warm-Network-Conversion
- Qualitatives Feedback in den Kommentaren

**Ziel:** Wenn Reddit-Conversion > 1% → Produkt-Market-Fit-Signal stark genug für Phase E

---

## 4. Phase E: Paid Distribution (Okt–Nov 2026)

**Ziel:** Ersten zahlenden User generieren. Revenue als Proof-of-Concept.

### Kanal: SEO (kostenlos, langfristig)

**Content-Strategie: Informational Keywords**

| Keyword | Monatliches Volumen | Difficulty | Inhalt |
|---|---|---|---|
| "AAPL stock analysis" | 18.000 | Hoch | Nicht sinnvoll |
| "how to analyze stocks for beginners" | 5.400 | Mittel | Blog-Artikel |
| "stock research tools comparison" | 1.200 | Niedrig | Vergleichsseite |
| "simply wall st alternative" | 800 | Niedrig | Landing Page |
| "is AAPL overvalued" | 3.200 | Mittel | Dynamic Page (Phase F) |
| "P/E ratio explained" | 22.000 | Hoch | Glossar-Artikel |
| "how to know when to sell a stock" | 6.600 | Mittel | Blog → Exit Strategy |

**Priorität:** Long-tail, low-competition Keywords zuerst.
"simply wall st alternative" und "stock research tools comparison" direkt angehen.

**SEO-Seiten (Phase F):**
```
/value-investing        → Persona-Landing für Value Investor (Gunnar-Typ)
/passive-investing      → Persona-Landing für Passive Investor (Patricia-Typ)
/stock-analysis-tool    → Generic Tool-Landing
/[TICKER]-analysis      → Dynamic Pages (z.B. /aapl-analysis) — Phase F
```

### Kanal: Twitter/X Finance Community (kostenlos)

- Nische: #FinTwit, #InvestingTwitter
- Format: "I analyzed [TICKER] with pondex_ — here's what the data says [Score + 3 Faktoren]" → Screenshot
- Engagement ohne Spam: auf echte Diskussionen antworten
- Ziel: 500 Follower vor Phase E als Baseline

### Kanal: Newsletter-Kooperationen (gering-kostenpflichtig)

- Finance-Newsletter mit <50k Abonnenten (günstiger, targetierter)
- Nischen: EU Privatanleger-Newsletter, FIRE-Community
- Sponsored-Post: €50–200 je nach Größe
- Nur testen wenn organische Kanäle >200 Signups/Woche generieren

### Kanal: Paid Ads (letztes Mittel, Phase F)

- Erst wenn organische Kanäle Grundlage etabliert haben
- Google Ads auf "stock analysis tool" Keywords — hohe CPC
- Meta Ads: Lookalike Audience aus bestehenden Signups
- Budget erst wenn LTV bekannt (braucht 3 Monate Pro-User-Daten)

---

## 5. Retention-Mechaniken (Wiederkehr erzwingen)

**Ohne Wiederkehr kein Upgrade. Ohne Upgrade kein Revenue.**

### Mechanik 1: Wöchentlicher Score-Digest (Phase E)

```
Betreff: "Your watchlist this week: AAPL ↑ TSLA ↓"

Inhalt:
- Scores der Watchlist-Aktien vs. Vorwoche
- Stärkste Änderung: "TSLA score fell 8 points — see why →"
- CTA: "Check your full analysis →"

Trigger: Jeden Montag, 08:00 Uhr
Technologie: Supabase Edge Functions (kostenlos im Free Tier)
```

### Mechanik 2: Score Decay Alert (Phase E2)

```
"TSLA score dropped from 42 to 34 this week (-8 points)"
→ "Your thesis may need review"
→ Link zu Exit Check Tab
```

### Mechanik 3: Free Tier Gate als Retention-Mechanik

```
User hat 1 Analyse heute gemacht
→ Kommt nächsten Tag zurück für die zweite Analyse
→ Täglicher Return-Grund ohne Email
```

### Mechanik 4: Personalisierungs-Nudge

```
Nach 5. Analyse ohne Profil:
"Personalize your scores for your strategy →"
→ Onboarding-Flow (3 Fragen)
```

---

## 6. Conversion-Funnel — Ziel-Metriken

```
Phase C Launch (Aug 2026):
  Landing Visitors:    1.000/Monat
  Signup-Rate:         5%
  Signups:             50/Monat
  Aktive Nutzer:       20/Monat (40%)

Phase D (Sep 2026):
  Landing Visitors:    3.000/Monat (Reddit + Product Hunt Nachklang)
  Signup-Rate:         4%
  Signups:             120/Monat
  Aktive Nutzer:       48/Monat

Phase E (Okt 2026 — Stripe live):
  Landing Visitors:    5.000/Monat
  Signups:             200/Monat
  Pro-Upgrades:        10/Monat (5% von aktiven Nutzern)
  Pro-MRR:             10 × €4.99 = €49.90/Monat

Phase E → F (Dez 2026):
  Landing Visitors:    15.000/Monat (SEO + Content)
  Signups:             600/Monat
  Pro-Upgrades:        40/Monat
  Pro-MRR:             200 × €4.99 = €998/Monat

Ziel Q1 2027:
  Pro-User kumuliert:  1.000
  Pro-MRR:             ~€4.990/Monat
```

---

## 7. Monetization-Hebel

### Lever 1: Upgrade-Trigger optimieren

Der Free Tier Gate Moment (2. Analyse am selben Tag) ist der wichtigste Hebel.
**A/B-Test nach Phase E:**
- Variante A: Modal nach 2. Analyse
- Variante B: Modal nach 3. Analyse (mehr Wert zuerst)
- Variante C: Soft-Paywall (Analyse läuft, aber Ergebnis teilweise versteckt)

### Lever 2: Peer Comparison als Upgrade-Hook

Die stärkste ungestützte Reaktion aller User-Interviews.
Peer Comparison ist Pro-Feature — aber: Free User sollten sie sehen können, dann aber für Details upgraden müssen.
```
Free: "Compare with sector average →" → Blur + "Pro feature"
Pro: Voller Vergleich (2 Aktien + Sektor)
```

### Lever 3: Annual Plan Push

- €49.99/Jahr = -17% vs. monatlich
- Upgrade-Modal zeigt sofort beide Optionen mit Ersparnis prominent
- Jährlicher User = 10x besserer LTV (kein monatlicher Churn)

---

## 8. Was NICHT zu tun ist (Solo-Founder-Fallen)

| Falle | Warum vermeiden |
|---|---|
| Paid Ads vor Produkt-Market-Fit | Verbrennt Budget ohne Signal |
| 10 Kanäle gleichzeitig | Keiner wird gut. Einen Kanal tief bearbeiten. |
| Bloomberg/Yahoo-Targeting | Zu breit, zu viel Konkurrenz, falscher ICP |
| Feature-Launch ohne Retention-Check | Neue Features bringen nichts wenn User nicht wiederkommen |
| B2B pivot vor 100 Pro-Usern | Zu früh, anderes Produkt, andere Sales-Motion |
| Influencer-Marketing | Hoher Cost, unbekannte Conversion, falsche Erwartungen |

---

## 9. Nächste 3 Schritte (sofort umsetzbar)

1. **Wave 1 Kontakte einladen** (Phase C Launch): 45 Personen persönlich anschreiben sobald Backend live
2. **Reddit-Post vorbereiten** (Phase D): Text schreiben, 3 Subreddits auswählen, UTM-Links setzen
3. **Product Hunt Seite anlegen** (Phase C): Screenshots, Demo-Video, Hunter suchen

---

_Stand: 2026-07-24_
_Review: nach Phase C Launch — Conversion-Metriken aktualisieren_
_Verweis: UX-STRUCTURE-SPEC.md §11 (Research Findings) · ROADMAP.md Phase F_
