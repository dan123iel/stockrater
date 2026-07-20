# pondex — Regulatory Framework

> Last updated: 2026-07-02  
> Review trigger: Before Phase 2 launch, before any paywall, before any geo-expansion.

---

## TL;DR for Developers

**pondex is an information tool, not an investment advisor.**  
Every output must be framed as educational/informational. Never use the words "buy", "sell", "recommend", or "should invest." Every AI-generated statement must cite its primary data source. This is not just a UX requirement — it is a legal constraint.

---

## 1. Core Legal Boundary: Information vs. Advice

The single most important regulatory line pondex must never cross:

| Allowed (Information) | Not Allowed (Advice) |
|---|---|
| "AAPL's P/E ratio is 28 (source: Yahoo Finance)" | "You should buy AAPL" |
| "This stock scores 72/100 based on these 5 metrics" | "We recommend this stock for your portfolio" |
| "Groq analysis based on SEC filing: revenue grew 12% YoY" | "Based on your profile, invest €500 here" |
| "Historically, P/E < 15 has correlated with value plays" | "This is a good investment for you" |

**The test:** Would a regulator read this output and conclude pondex is providing personalized investment advice? If yes, rewrite it.

---

## 2. Applicable Regulations by Region

### EU — Primary Market (EU-NW focus, 53% of sample)

| Regulation | What it means for pondex |
|---|---|
| **MiFID II** (Markets in Financial Instruments Directive) | Providing personalized investment recommendations to retail clients requires authorization as an investment firm. pondex must NOT give personalized recommendations. General information and educational content is exempt. |
| **GDPR** | Any user data (email, behavioral data, portfolio data) requires lawful basis, privacy policy, and right-to-erasure. Phase 1 uses localStorage only — no server-side user data. Becomes critical at Phase 2 (auth/accounts). |
| **EU AI Act** (in force 2026) | AI systems used for financial decisions may be classified as high-risk under Annex III. pondex's AI outputs (Groq verdicts) should be framed as informational tools, not autonomous decision-making systems. Human-in-the-loop framing helps. |
| **Market Abuse Regulation (MAR)** | Applies if pondex ever publishes insider information or manipulative analysis at scale. Not a current risk — pondex uses only public data (Yahoo Finance, SEC EDGAR). |

### US — Secondary Market (31% of sample)

| Regulation | What it means for pondex |
|---|---|
| **Investment Advisers Act (1940)** | Providing investment advice for compensation requires SEC registration unless an exemption applies. The "publisher exemption" covers impersonal, general advice in publications — pondex likely qualifies if no personalization. |
| **SEC Regulation Best Interest (Reg BI)** | Applies to broker-dealers making recommendations. Not directly applicable if pondex is purely informational. |
| **FTC Guidelines** | Testimonials and endorsements (e.g., showing user returns) require disclosure. Not yet applicable. |

### LATAM — Emerging (16% of sample, primarily NA-tagged Spanish speakers)

- No immediate regulatory action required for Phase 1.
- Monitor if Wave 2 shows significant LATAM penetration.

---

## 3. Mandatory Disclaimers

These must appear in the product. Track implementation in `doc/adr/` or `doc/specs/`.

### Required on every AI-generated verdict:
```
This analysis is for informational purposes only and does not constitute 
investment advice. All data sourced from [source name]. Past performance 
does not guarantee future results.
```

### Required in footer / about page:
```
pondex is an information tool. We do not provide personalized investment 
advice. Always consult a qualified financial advisor before making 
investment decisions.
```

### Required before any price/paywall:
- Explicit acknowledgment that the user understands pondex is not an investment advisor.
- This doubles as legal protection and trust-building (aligns with 58% conditional AI trust finding).

---

## 4. Data Source Compliance

| Source | Compliance Status | Notes |
|---|---|---|
| Yahoo Finance (yfinance library) | ✅ Acceptable for Phase 1 | Unofficial API — not licensed for commercial redistribution at scale. Review at Phase 2 if user volume increases significantly. Consider Yahoo Finance official API or alternative (e.g., Alpha Vantage) at commercial scale. |
| SEC EDGAR | ✅ Fully compliant | Public government data, explicitly open for commercial use. No restrictions. |
| Groq / Llama 3.3 70B | ✅ Acceptable | AI inference only; Groq ToS permits commercial use. AI outputs must be framed as informational (see Section 1). |
| Bloomberg / Reuters | ❌ Not in stack | Requires commercial license. Do not add without legal review. |
| FMP (Financial Modeling Prep) | ❌ Removed from stack | ADR-005. Not to be reintroduced. |

---

## 5. Privacy & Data Handling

### Phase 1 (current)
- All user data stored in browser localStorage only.
- No server-side user data.
- No analytics or tracking.
- **Regulatory exposure: Minimal.**

### Phase 2 (planned — auth, watchlist, portfolio)
Before Phase 2 launch, the following must be in place:
- [ ] Privacy Policy (GDPR-compliant, covers EU + US)
- [ ] Cookie/consent banner if any tracking is added
- [ ] Data retention policy (what is stored, for how long, deletion process)
- [ ] Right-to-erasure mechanism
- [ ] Data Processing Agreement (DPA) with Supabase (ADR-012 provider)

---

## 6. Prohibited Features (Regulatory Red Lines)

These features would require regulatory authorization or create unacceptable legal exposure. Do not build without legal counsel:

| Feature | Why prohibited |
|---|---|
| Personalized stock recommendations based on user profile | MiFID II investment advice threshold |
| "Portfolio optimizer" that suggests allocation % | Investment advice |
| Guaranteed return claims or performance projections | EU/US securities law |
| "Signal" subscriptions (buy/sell alerts per stock) | Investment advice / unauthorized advisory service |
| Aggregating and reselling Yahoo Finance data | License violation at scale |
| Storing user portfolio + PII without GDPR compliance | GDPR violation |

---

## 7. Open Regulatory Questions (To Resolve Before Phase 2)

| Question | Priority | Owner | Target date |
|---|---|---|---|
| Does yfinance usage constitute unauthorized data redistribution at >10k MAU? | High | Tech Lead | Before Phase 2 |
| Is pondex's AI verdict framing compliant with EU AI Act high-risk classification? | High | PM | Before Phase 2 |
| Do we need a terms-of-service update when adding user accounts? | High | PM | Phase 2 start |
| Van Westendorp pricing page — does it require any financial services disclosure? | Medium | PM | Before paywall |
| What jurisdiction governs pondex (Germany, EU, US)? | Medium | Founder | Phase 2 planning |

---

## 8. Where This Connects to the Rest of the Project

| Document | Relationship |
|---|---|
| `doc/RISK-REGISTER.md` | Regulatory risks should be added as R-014+ |
| `doc/adr/` | Architecture decisions with regulatory implications (e.g., data sources, AI framing) |
| `doc/product/PRODUCT-COUNCIL.md` | Viability gate includes regulatory check |
| `.project-context/MASTER.md` | Phase 2 scope note: "Login, Stripe" — both have regulatory implications |
| `doc/research/surveys/` | Survey finding: EU-NW has 2× AI skepticism — "audit trail" framing is both a UX and compliance win |

---

*Next review: Before Phase 2 begins. Assign regulatory questions to owner before any paywall or auth feature is built.*

---

## 9. Aktionsplan — Was du konkret wann tust

> Das ist die operative Checkliste. Die Roadmap (`doc/ROADMAP.md`) spiegelt dieselben Punkte phasenweise.

### Jetzt — Phase 1 (bis 15. Juli 2026)
Alle Punkte erledigt. Regulatory-Exposure in Phase 1 ist minimal (kein Login, kein Server-Daten, kein Paywall).

- [x] Disclaimer sichtbar (opacity ≥ 0.5) — `Analysis.jsx`
- [x] Quellenattribution auf allen Tiles
- [x] AI-Output: niemals buy/sell/recommend — System Prompt + Code
- [x] CORS eingeschränkt — `main.py`

---

### Vor Phase 2 Launch — Checkliste (vor September 2026)

**Schritt 1 — Jurisdiktion klären (1 Tag, du allein)**
Entscheide: Welches Recht gilt für pondex?
- Option A: Deutsches Recht (du bist in Deutschland, einfachste Wahl für Phase 1–2)
- Option B: EU-Recht allgemein
- Empfehlung: Deutsches Recht + GDPR. Einfachste Basis, kein Anwalt für Phase 2 nötig wenn du dich an die Regeln hältst.
- Ergebnis dokumentieren in diesem Dokument (Section 7, Jurisdiktionsfrage).

**Schritt 2 — Privacy Policy schreiben (2–3 Stunden)**
Nutze einen Privacy Policy Generator (z.B. iubenda.com, datenschutz-generator.de) mit diesen Inputs:
- Welche Daten: E-Mail (via Google Sign-In), Nutzungsverhalten (falls Analytics), keine Zahlungsdaten (Stripe handled das)
- Zweck: Produktbereitstellung
- Rechtsgrundlage: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)
- Speicherdauer: Bis Konto gelöscht wird
- Hosting: Railway (Serverstandort angeben)
- Ablegen: `frontend/public/privacy.html` + Link im Footer

**Schritt 3 — Terms of Service schreiben (2–3 Stunden)**
Pflicht vor Paywall. Kernaussagen:
- pondex ist ein Informationswerkzeug, kein Anlageberater
- Kein Haftungsanspruch auf Basis von pondex-Analysen
- Nutzung ab 18 Jahren
- Kündigung jederzeit möglich
- Nutze einen ToS-Generator oder lass dir einen Entwurf von einem Anwalt prüfen (einmalig ~200–400€ für einen einfachen B2C ToS)
- Ablegen: `frontend/public/terms.html` + Link im Footer + vor Paywall bestätigen lassen

**Schritt 4 — Paywall-Disclaimer einbauen (30 min Code)**
Vor dem Stripe-Checkout: Explizite Checkbox "Ich verstehe, dass pondex kein Anlageberater ist und keine Anlageempfehlungen gibt."
- Rechtlich: schützt dich, trust-building für User (Survey: 64% wollen Source-Attribution)
- Technisch: einfache Checkbox vor dem `stripe.redirectToCheckout()` Call

**Schritt 5 — EU AI Act Einschätzung (2 Stunden Recherche)**
Prüfe ob pondex als "high-risk AI system" nach Annex III gilt:
- Annex III Nr. 5b betrifft "AI systems used for creditworthiness assessment" — pondex bewertet Stocks, nicht Kreditwürdigkeit → wahrscheinlich NICHT high-risk
- Annex III Nr. 2 betrifft "AI systems used in administration of justice" — nicht relevant
- Wahrscheinliches Ergebnis: pondex ist General Purpose AI Tool, kein high-risk system
- Dokumentiere die Einschätzung hier und hol bei Unsicherheit eine kurze anwaltliche Einschätzung (einmalig ~100–200€)

**Schritt 6 — yfinance Lizenzfrage (1 Stunde Recherche)**
Bei >1.000 MAU prüfen:
- yfinance Terms: Yahoo Finance ToS verbietet kommerzielle Nutzung der inoffiziellen API
- Risiko: Bei Skalierung könnte Yahoo Finance blockieren oder klagen
- Lösung für Phase 2: Parallel Alpha Vantage free tier evaluieren (5 Requests/min kostenlos) oder Yahoo Finance official API ($0/Monat bis 500 Requests/Tag)
- Jetzt: Nichts tun, Risiko ist klein bei <1k MAU. Eintrag in Risk Register (R-015 bereits vorhanden).

---

### Niemals — Rote Linien (keine Phase)

Diese Punkte erfordern eine BaFin/SEC-Lizenz. Ohne Lizenz = illegales Geschäftsmodell.

- ❌ Personalisierte Kaufempfehlungen ("Kauf AAPL, passt zu deinem Profil")
- ❌ "Signal"-Abonnements (Kauf/Verkauf-Alerts gegen Bezahlung)
- ❌ Portfolio-Allokations-Empfehlungen ("Invest 30% in Tech")
- ❌ Renditegarantien oder Performance-Prognosen

Bei Unsicherheit ob ein geplantes Feature diese Grenze überschreitet: Council-Review durchführen (PRODUCT-COUNCIL.md) bevor eine Zeile Code geschrieben wird.
