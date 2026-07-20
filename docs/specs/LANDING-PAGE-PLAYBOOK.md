# pondex_ Landing Page Playbook
> Status: Work in progress — Deep Research (premium SaaS/fintech sources) pending.
> This doc will become the canonical design + copy reference for all pondex_ landing pages.

---

## 1. Was ist eine Landing Page (Grundlagen)

Eine Landing Page verfolgt **ein einziges Ziel** (Conversion). Sie ist keine Homepage.

| | Homepage | Landing Page |
|---|---|---|
| Ziel | Orientierung, Navigation | Eine Aktion auslösen |
| Navigation | Ja | Nein (oder minimal) |
| Links | Viele | Nur CTA |
| Inhalt | Breit | Fokussiert |

**Conversion-Typen für pondex_:**
- Primär: „Analyse a stock — it's free" → Demo starten
- Sekundär: E-Mail-Signup (Newsletter / Waitlist)
- Tertiär: Pro-Upgrade

---

## 2. Bewährte Seitenstruktur

Basierend auf Analyse von HubSpot, Shopify, SISTRIX, Heyflow (2025/2026):

```
1. Hero          — Problem + Lösung in einem Satz, CTA above the fold
2. Social Proof  — Logos, Zahlen, Testimonials (Vertrauen sofort aufbauen)
3. How it Works  — Max. 3 Schritte, konkret
4. Demo / Proof  — Interaktive Demo oder Screenshot-Beweis
5. Differentiation — Warum nicht Yahoo/ChatGPT/Bloomberg
6. Features      — Was bekommt man konkret
7. Pricing       — Transparent, kein Verstecken
8. FAQ           — Einwände vorwegnehmen
9. Final CTA     — Wiederholen, klar, dringend
10. Footer       — Trust-Links, Newsletter
```

**Wichtig:** Social Proof kommt VOR dem Demo-Beweis — erst Vertrauen, dann Produkt zeigen.

---

## 3. Must-Have Elemente

### Hero Section
- **Headline**: Problem-orientiert, nicht feature-orientiert
  - ✅ „Still not sure where to invest?"
  - ❌ „AI-powered stock analysis tool"
- **Subheadline**: Lösung in einem Satz
- **CTA**: Handlungsverb + Nutzen + Reibungsreduktion
  - ✅ „Analyse a stock — it's free"
  - ❌ „Get started"
- **Hero Visual**: Produkt in Aktion (Score-Card Screenshot)
- **Above the fold**: Headline + CTA müssen ohne scrollen sichtbar sein

### Call-to-Action (CTA)
- Kontrastfarbe (bei pondex_: schwarz auf weiß = natürlich stark)
- Max. 5 Wörter
- Handlungsverb: „Analyse", „Start", „See", „Get"
- Keine generischen CTAs: ❌ „Submit", ❌ „Click here"
- Klick-Auslöser direkt daneben: „No account required", „Free forever"
- Bei langen Seiten: CTA mehrfach platzieren (Hero, Mitte, Ende)

### Social Proof
- Echte Zitate mit Name + Rolle (keine Stock-Fotos)
- Zahlen: Survey-Teilnehmer, WTP-Rate, Nutzerzahlen
- Press-Logos falls vorhanden (WSJ, NYT etc. — „Brag Bar")
- Trust-Siegel: „Built on real research", „Not financial advice"

### Formulare (falls genutzt)
- Max. 2 Felder für erste Conversion (Email + optional Name)
- Datenschutz-Hinweis direkt daneben
- CTA-Button: Was passiert nach Klick? „Get my free verdict →"

---

## 4. Design-Prinzipien

### Farben
pondex_ nutzt ausschließlich Graustufen-Palette:
```
white:  #FFFFFF  — Hintergründe
100:    #D6D6D6  — Borders light, Backgrounds
200:    #AFAFAF  — Borders, Dividers
300:    #898989  — Secondary text
400:    #656565  — Muted text
500:    #434343  — Body text
600:    #242424  — Strong text
black:  #000000  — Headings, Primary
```
→ Datei: `frontend/src/lib/colors.js`

### Typografie
- Display/Headlines: `Interdisplay` (Inter-Familie), 500 weight
- Mono/Details: `Chivo Mono`, 400 weight
- Letter-spacing Headlines: `-1.5px` bis `-2px`
- Keine andere Schriftarten einführen

### Whitespace
- Viel Freiraum zwischen Sektionen (120px padding vertical)
- Lieber weniger Text, mehr Luft
- „Weniger ist mehr" — Apple-Prinzip

### Layout
- Max-Width Container: `bungee-container` class
- Grid: 2-spaltig für Cards (Testimonials, Pricing)
- Mobile-first denken

---

## 5. Copywriting-Formeln

### Headline-Formel für Fintech/Data Tools
```
[Problem des Users] → [Produkt] gibt dir [konkretes Ergebnis]
```
Beispiel: „Still not sure where to invest. pondex_ gives you one verdict."

### Nutzen vs. Feature
| Feature | Nutzen |
|---|---|
| 1–100 Score | Endlich eine klare Antwort |
| Source attribution | Du musst niemandem blind vertrauen |
| Plain language | Kein Finanz-Vorwissen nötig |
| Peer comparison | So triffst du wirklich Entscheidungen |

### Einwände vorwegnehmen (FAQ-Prinzip)
- „Is this financial advice?" → Nein, Research Tool
- „Where does data come from?" → Yahoo Finance + SEC EDGAR, alle Quellen sichtbar
- „Do I need an account?" → Nein, free tier ohne Account

---

## 6. Scroll-Animationen

Bewährte Patterns (Bungee-Style, Framer Motion):

| Pattern | Einsatz | pondex_ Status |
|---|---|---|
| Fade + slide up (`whileInView`) | Standard section reveals | ✅ Implementiert |
| Sticky + Stack (Cards übereinander) | Testimonials | ✅ Implementiert |
| Rotating text (AnimatePresence) | Hero rotating lines | ✅ Implementiert |
| Animated score counter | ProductDemo Score | ✅ Implementiert |
| Hover underline grow | Nav links | ✅ Implementiert |
| Progress bar animate | Factor scores | ✅ Implementiert |

**Bibliothek:** `framer-motion` (bereits installiert)

---

## 7. Technische Performance-Checkliste

- [ ] Ladezeit < 2.5s (mobile)
- [ ] Responsive auf allen Breakpoints testen
- [ ] Bilder komprimiert (WebP oder compressed JPEG)
- [ ] Lazy loading für below-fold Images
- [ ] CTA above the fold auf Mobile sichtbar
- [ ] HTTPS
- [ ] Meta Title + Description (SEO)
- [ ] Open Graph Tags (Social Share)

---

## 8. Conversion-Metriken (Benchmarks)

| Metrik | Gut | Ausgezeichnet |
|---|---|---|
| Bounce Rate | < 50% | < 30% |
| Conversion Rate | > 5% | > 10% |
| Form Completion | > 25% | > 50% |
| Scroll Depth | > 50% avg | > 75% avg |
| Session Duration | > 30s | > 60s |

**Branchen-Benchmark Fintech/Data Tools:** ~5–8% Conversion Rate

---

## 9. Quellen & Referenz-Websites

### Verifizierte Quellen (gelesen + dokumentiert)

| Quelle | URL | Key Insight |
|---|---|---|
| SISTRIX | https://www.sistrix.de/frag-sistrix/seo-grundlagen/landing-page | Multi-Page Strategy: mehrere spezialisierte LPs > eine generelle. SEO + Nutzerintention. |
| Shopify DE | https://www.shopify.com/de/blog/landingpage | Above-the-fold Checkliste, Buy Box Optimierung, Social Proof Brag Bar |
| HubSpot DE | https://blog.hubspot.de/website/landing-pages | 13 Best-Practice-Beispiele (Airbnb, Netflix, Slack, Asana, Codecademy) |
| Heyflow | https://heyflow.com/blog/landingpage-design | 20 Design-Tipps: Micro-Interactions, Exit Intent, Sticky CTA, Kontrastfarben |
| Mailjet | https://www.mailjet.com/de/blog/e-mail-marketing/landingpage-erstellen/ | A/B-Testing Methodik, Form-Completion-Rate, Responsive Design |
| Adobe | https://business.adobe.com/de/blog/basics/best-practices-landing-pages | 18 Beispiele: Airbnb, Netflix, LinkedIn, Dropbox, Spotify, Wise, Asana |
| takeoff | https://www.takeoffpr.com/blog/landing-page-tipps | Inbound LP: 25%+ Conversion Rate möglich, Thank-You-Page, Double-Opt-In |
| dskom | https://dskom.de/landingpage-tipps/ | 11 Tipps: emotionale Bilder, Preis nennen, Video, Gütesiegel |

### Pending (Deep Research Workflow läuft)
Premium Design-Inspiration — wird ergänzt:
- Linear, Vercel, Raycast, Stripe, Lemon Squeezy, Superhuman
- Bungee Webflow Template
- Framer Motion scroll patterns

---

## 10. SISTRIX Key Insights (verifiziert)

### Multi-Page Strategie
Eine Landing Page pro Zielgruppe/Produkt/Kampagne/Suchanfrage ist besser als eine generelle Seite:
- Bessere Nutzeransprache
- Mehr SEO-Potenzial (verschiedene Keywords)
- Klarere Performance-Daten
- Unabhängig testbar und anpassbar

**Für pondex_:** Separate LPs für:
- `/` → Hauptseite (aktuell)
- `/value-investing` → Value-Investor Persona (Gunnar)
- `/passive-investor` → Passive Investor Persona (Patricia)
- `/pro` → Pro-Tier-spezifisch
- `/compare` → Peer Comparison Feature

### SEO-Integration
Keywords platzieren in:
1. Title Tag + Meta Description
2. H1 Überschrift
3. URL (sprechend, z.B. `/stock-analysis`)
4. Natürlich im Fließtext

**Snippet-Formel:**
```
"[Produkt] [Nutzen] – [Reibungsreduktion]. [CTA]."
Beispiel: "Stock analysis in 60 seconds – no account, no credit card. See your first verdict free."
```

### Nutzerintention treffen
Suche → Landing Page Content muss exakt passen:
- Suche: „stock analysis free" → LP fokussiert auf kostenlose Analyse, nicht auf Pro-Features
- Suche: „undervalued stocks" → LP zeigt Value-Investing Score, nicht allgemeinen Pitch

---

## 11. HubSpot / Adobe Beispiel-Learnings

### Airbnb-Prinzip
Zeige dem User seinen **persönlichen** Nutzen direkt: Airbnb zeigt geschätzten Verdienst basierend auf Standort. Für pondex_: Ticker direkt im Hero-Input vorausfüllen.

### Netflix-Prinzip
Doppelte CTA-Platzierung: oben UND unten auf der Seite. Für unentschlossene User, die erst scrollen.

### Slack-Prinzip
Konsistentes Farbschema = Markenidentität. Eine dominante Markenfarbe + Weiß + Kontrast-CTA. pondex_: Schwarz dominant, weißer CTA-Text, grauer Kontrast.

### Codecademy-Prinzip
FAQ-Bereich **in der Mitte** der Seite, nicht nur am Ende. Einwände früh ausräumen, nicht erst nachdem der User schon abgesprungen ist.

### Asana-Prinzip
Product Screenshots **zeigen wie es funktioniert** — nicht beschreiben. pondex_: ProductDemo-Section ist genau richtig.

### Wise-Prinzip (Fintech!)
- Tool zum Gebührenvergleich direkt auf der LP
- Vielseitigkeit durch Zahlen zeigen (z.B. „8 major indices, 500+ stocks")
- Direkte Links zu nächsten Schritten

---

## 12. Heyflow Design-Tipps (top 5 für pondex_)

1. **Sticky Header mit CTA** — Log in Button bleibt immer sichtbar ✅ (implementiert)
2. **Micro-Interactions** — Hover-Effekte, Score-Animation ✅ (implementiert)
3. **Exit-Intent Popup** — Besucher die abspringen mit Angebot abfangen ⬜ (todo)
4. **Kontrastfarbe für CTA** — Schwarz auf Weiß ist maximal Kontrast ✅
5. **Interaktive Elemente** — ProductDemo als echtes Try-it ✅ (implementiert)

---

### Deep Research Ergebnisse (107 Agents, adversarial verifiziert — Juli 2026)

**Methodik:** 25 Claims gegen 24 Live-Quellen geprüft. 16 widerlegt, 7 bestätigt. Nur bestätigte Findings unten.

| Quelle | URL | Status |
|---|---|---|
| Vercel | https://vercel.com | ✅ Live verifiziert |
| Raycast | https://www.raycast.com | ✅ Live verifiziert |
| Linear | https://linear.app | ✅ Live verifiziert |
| GSAP Docs | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | ✅ Docs verifiziert |
| Framer Motion | https://motion.dev/motion/scroll-animations/ | ✅ Docs verifiziert |
| MDN CSS Scroll | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations | ✅ Docs verifiziert |
| Stripe | https://stripe.com | ❌ Alle 4 Claims widerlegt — nicht als Referenz nutzen |
| Julian.com Guide | https://www.julian.com/guide/growth/landing-pages | 📖 Lesenswerter Guide |
| Marketing Examples | https://marketingexamples.com/landing-page | 📖 Inspiration-Sammlung |

---

## 13. Verifizierte Deep Research Findings

### Finding 1: Dual-Path CTA (3-0, hoch)
**Nie nur einen CTA.** Immer zwei Pfade im Hero:
- Path A: Self-serve / kostenlos → sofort starten
- Path B: Sales / Enterprise → Kontakt

**Vercel Beispiel (live Juli 2026):**
- „Deploy now" → /new
- „Talk to sales" → /contact/sales

**Für pondex_:**
- „Analyse a stock — it's free +" → Demo
- „Log in →" → bereits implementiert ✅

---

### Finding 2: Social Proof direkt nach Hero (2-1, hoch)
**Social Proof kommt VOR der Demo, nicht danach.**

Vercel: Hero → Named Case Studies (Notion, Zapier, Mintlify) → Features
Raycast: Hero → „Used by seriously productive people" (Guillermo Rauch/Vercel, Adam Wathan/Tailwind) → Features

**Wichtig:** Benannte Firmen/Personen schlagen generische Testimonials. Der User muss den Namen kennen.

**Für pondex_ (aktuell falsch):**
```
IST:   Hero → Demo → HowItWorks → Testimonials → ...
SOLL:  Hero → Testimonials/Stats → HowItWorks → Demo → ...
```

---

### Finding 3: Workflow-Architektur statt Feature-Grid (2-1, mittel)
**Nummerierte Schritte durch das Produkt** schlagen generische Feature-Listen.

**Linear Beispiel (live Juli 2026):**
```
1.0 Intake → 2.0 Plan → 3.0 Build → 4.0 Diffs → 5.0 Monitor
```
Jede Sektion = ein Job-to-be-done, nicht ein Feature.

**Für pondex_ — HowItWorks passt bereits:**
```
( 001 ) Enter any ticker.
( 002 ) Get a plain-language verdict.
( 003 ) See every source.
```
✅ Diese Struktur ist korrekt.

---

### Finding 4: Compressed Dual-Meaning Headline (3-0, hoch)
**Beste Headlines sind unter 10 Wörter und funktionieren auf zwei Ebenen gleichzeitig:**
- Literal: beschreibt das Produkt
- Aspirational: macht eine größere Aussage

**Raycast Beispiel:** „Your shortcut to everything."
- Literal: Keyboard launcher shortcut
- Aspirational: Alles erreichbar

**Widerlegt:** Problem-reframe Formeln („It's not about saving time...") funktionieren laut Verifikation NICHT als Hero-Headline.

**Für pondex_ aktuell:** „pondex_ gives you one verdict for your investments."
- Literal ✅ (Verdict = Ergebnis)
- Aspirational: könnte stärker sein

**Alternativ-Test:** „One verdict. Every stock. Always sourced."

---

### Finding 5: GSAP ScrollTrigger für komplexe Animationen (3-0, hoch)
Für Sticky-Cards und Section-Stacking:
- `pin: true` — Element fixieren während Scroll
- `scrub: 1` — Animation an Scrollposition koppeln (1s Catch-Up)
- `pinSpacing: true` — automatisches Padding damit Folge-Content korrekt aufholt

**Für pondex_:** Testimonials-Stack nutzt aktuell Framer Motion `useScroll` — funktioniert, GSAP wäre performanter für komplexe Effekte.

---

### Finding 6: Framer Motion useScroll API (3-0, hoch)
Vier Motion Values aus `useScroll()`:
- `scrollX`, `scrollY` — absolute Scroll-Position
- `scrollXProgress`, `scrollYProgress` — 0–1 normalisiert

Via `useTransform()` auf beliebige CSS-Properties mappen:
```js
const y = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])
```
✅ Bereits in pondex_ Testimonials implementiert.

---

### Finding 7: CSS Scroll-Driven Animations (3-0, hoch)
Zwei Timeline-Typen (native Browser, kein JS nötig):
- `scroll-timeline` — Progress = wie weit gescrollt
- `view-timeline` — Progress = Element-Sichtbarkeit im Viewport

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.element {
  animation: fade-in linear both;
  animation-timeline: view();
}
```
Für einfache reveal-on-scroll Effekte als Alternative zu Framer Motion.

---

### Was widerlegt wurde (nicht in pondex_ einbauen)
- ❌ Stripe als Referenz (alle Claims ungültig — Seite hat sich geändert)
- ❌ Problem-reframe Headlines ("It's not about X, it's about Y")
- ❌ Framer Motion ist performanter als GSAP (falsch)
- ❌ CSS scroll animations laufen off-main-thread (falsch)
- ❌ Lenis wird von Netflix/Google verwendet (nicht verifiziert)

---

## 14. A/B-Test Ideen für pondex_

Priorität 1 (strukturell, basierend auf Research):
- **Sektionsreihenfolge:** Social Proof vor Demo vs. aktuell
- **Hero Headline:** aktuell vs. „One verdict. Every stock. Always sourced."
- **Dual-CTA:** „Analyse free" + „Log in" vs. nur „Analyse free"

Priorität 2 (Micro-Copy):
- CTA-Text: „Analyse a stock — it's free" vs. „See your first verdict in 60s"
- Klick-Auslöser: „No account required" unter CTA hinzufügen
- pondex_ Box: 6px rounded vs. pill (höhere Rundung)

Priorität 3 (Trust):
- Stats: Research-Zahlen (45 respondents) vs. klare User-Metriken
- Testimonials: Fotos vs. Initialen-Avatare
- Pricing: Monthly default vs. Yearly default
