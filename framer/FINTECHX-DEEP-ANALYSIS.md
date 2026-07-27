# FintechX — Ultra-Deep Section Analysis
_Stand: 2026-07-27 · 20 Screenshots · Vollständige Seite (15.562px)_
_Quelle: https://fintechx.framer.website/_

---

## GESAMTBESCHREIBUNG

FintechX ist eine vollständig responsive Fintech-Landingpage im "nature-inspired premium" Stil. Die Seite kombiniert eine helle, saubere UI mit organischen Hintergrundfotos (Wiesen, Blumen, Himmel) die beim Scrollen als Parallax-Layer erscheinen. Das erzeugt einen Kontrast zwischen dem technischen Produkt und einer menschlich-natürlichen Ästhetik — Vertrauen durch Wärme.

**Conversion-Logik:** Vertrauen aufbauen → Problem zeigen → Lösung demonstrieren → Beweis liefern → Kaufentscheidung erleichtern

---

## SECTION 1: NAVIGATION

**Zweck:** Branding + Navigation + primäre Conversion-Einstieg

### Exakte Texte
- Logo: "FintechX" + quadratisches Icon mit Code-Symbol (</>)
- Links: Products | Features | Use Cases | Pricing
- CTA: "Try it free →" (schwarzer Pill-Button)

### Layout
- Floating Pill-Container: weißer BG, border-radius ~50px
- Breite: ~95% der Viewport-Breite, max-width ~900px
- Padding: ~12px innen, ~16px vertikal außen
- Position: Sticky top, zentriert

### Visual Design
- Background Nav-Container: rgba(255,255,255,0.95) + blur
- Box-shadow: subtil (0 2px 12px rgba(0,0,0,0.06))
- CTA Button: bg #000000, white text, border-radius 999px, padding 10px 20px, Pfeil-Icon rechts

### Typography
- Logo: 16px, weight 700, #0A0A0A
- Nav Links: 14px, weight 500, #374151
- CTA: 14px, weight 600, #FFFFFF

### Animation
- Nav-Container erscheint beim ersten Load
- CTA-Button hat Hover-Effekt (leicht dunkler)

---

## SECTION 2: HERO

**Zweck:** Erster Eindruck, Hauptversprechen kommunizieren, zur Aktion auffordern
**Conversion-Frage:** Was ist das Produkt und warum soll ich es nutzen?

### Exakte Texte
- Headline: "Finance **[AI-Badge]** Platform" (AI in farbigem Badge)
- Subtext: "Optimize your investments with AI-driven analysis, real-time tracking, and intelligent recommendations."
- CTA 1: "Get started now →" (blauer Pill-Button)
- CTA 2: "View demo" (Ghost-Button)
- Trust-Chips: "⭐ 4.9/5 Rating" | "🔒 Bank-level security" | "⚡ Real-time AI insights"

### Layout
- Einspaltiger zentrierter Block oben
- Darunter: großes Dashboard-Mockup (Dark Mode App-Screenshot)
- Background: Hellblauer Himmel mit weißen Wolken (Foto)

### Visual Design
- Background: Himmels-Foto mit Parallax-Effekt
- Dashboard: Dark card, abgerundete Ecken, floating im unteren Hero-Bereich
- Hero-Gradient: transparent → weiß nach unten (smooth fade)

### Typography
- H1: ~48px desktop / ~28px mobile, weight 800, #0A0A0A
- "AI" Badge: kleines farbiges Chip innerhalb der Headline
- Subtext: 18px, weight 400, #6B7280

### Animationen
- Parallax: Sky-Background bewegt sich langsamer als Vordergrund
- Dashboard-Mockup fährt von unten ein (scroll-triggered oder on-load)
- Trust-Chips erscheinen mit kleinem Delay

---

## SECTION 3: CLIENT LOGOS / SOCIAL PROOF

**Zweck:** Sofortige Glaubwürdigkeit ohne zu übertreiben

### Exakte Texte
- Label-Chip: "Trusted by investors and financial teams"
- Logos: Nexter | Theo | London | Tokyo | Vancouver | Oslo | (weitere)

### Layout
- Chip zentriert oben
- Logos: horizontale Reihe, gleichmäßig verteilt
- Mobile: 2-3 Logos sichtbar, scrollbar

### Visual Design
- Background: Weiß
- Logos: Monochrom/Graustufen, gleiche Höhe ~24px
- Label-Chip: bg #F3F4F6, border-radius 999px, padding 8px 16px

### Animation
- Kein offensichtliches Marquee/Scroll — statisch
- Möglicherweise fade-in on scroll

---

## SECTION 4: BEFORE / AFTER TOGGLE

**Zweck:** Problem-Lösung visuell demonstrieren durch interaktive Karte
**Conversion-Frage:** "Ist das wirklich besser als was ich jetzt nutze?"

### Exakte Texte
**Headline:** "Smarter decisions start with clear data"
**BEFORE-Seite:**
- Titel: "Challenges of managing investments today"
- Bullet 1: "Financial data is spread across platforms and is hard to understand"
- Bullet 2: "Lack of clear direction for buy, hold, or sell decisions"
- Bullet 3: "Tracking investments manually takes time and effort"
- Bullet 4: "Decisions based on incomplete or outdated information"
- Stat 1: "68% — Financial data confusion"
- Stat 2: "55% — Poor data understanding"

**AFTER-Seite:**
- Titel: "Smarter way to manage your investments"
- Bullet 1: "Get clear recommendations based on real-time data"
- Bullet 2: "Understand risks before making investment decisions"
- Bullet 3: "Monitor your portfolio in real time no manual effort required"
- Bullet 4: "Make consistent and informed investment choices"
- Stat 1: "3X Faster — Smart decisions"
- Stat 2: "24/7 — Real-time tracking"

### Layout
- Zentrierte Headline
- Toggle-Dial: runder Knopf in der Mitte zwischen "Before FintechX" und "After FintechX" Labels
- Karte darunter: nimmt volle Breite (max ~700px), abgerundete Ecken
- BEFORE: Heller BG #F5F5F5, rote ✗ Icons
- AFTER: Dunkler BG #1A1A1A, grüne ✓ Icons

### Visual Design
- Vor/Nach-Labels: Text mit horizontaler Linie jeweils
- Dial/Toggle: runder Kreis-Button (~50px), bei BEFORE: grau/metallic, bei AFTER: dunkelgrün mit </> Icon
- Bullet-Icons: ✗ rot (#E74C3C) für BEFORE, ✓ grün für AFTER
- Stat-Karten: abgerundet, padding 16px, bg leicht abgesetzt

### Animation (KRITISCH)
- Beim Scrollen IN die Section: wechselt von BEFORE zu AFTER
- Dial rotiert (dreht sich um 180°)
- Karte animiert: Hintergrundfarbe ändert sich smooth (hell → dunkel)
- Bullet-Texte faden aus und neue faden ein
- Stat-Zahlen wechseln mit Überblend-Animation

---

## SECTION 5: CORE FEATURES

**Zweck:** Konkrete Produktfeatures zeigen
**Conversion-Frage:** "Was kann das Produkt genau?"

### Exakte Texte
- Badge: "Core features"
- Headline: "Everything you need to invest confidently"
- Subtext: "Professional tools designed for active traders and long-term investors managing diverse portfolios."
- CTA: "View all features →"
- Feature 1: "Advanced risk analysis" | Tags: "Portfolio volatility tracking | Predictive risk alerts | Real-time risk scoring | Portfolio volatility tracking"
- Feature 2: "Market insights" | Live chip | "+2.4%"
- Feature 3: "Portfolio tracking" | "See your entire financial picture in one place with performance attribution and gain/loss analysis."
- Feature 4: "AI-powered insights" | "SELL" (großes grünes Text) | "Real-time market data and predictive analysis."
- Feature 5: "Smart alerts" | "Portfolio allocation alert: Increased to 42%"

### Layout
- Asymmetrisches Grid: nicht alle Karten gleich groß
- Feature 1 + 2: nebeneinander (2-Spalten)
- Feature 3: breiter Card mit Chart
- Feature 4: dunkle Karte mit großem "SELL" Text (Highlight)
- Feature 5: Alert-Karte

### Visual Design
- Feature 1: bg #E8EEF5 (hell blaugrau), Icon: blauer Shield
- Feature 2: bg #D4E8F7 (hellblau), Live-Chart mit grüner Linie, "Live" grüner Chip
- Feature 3: bg #EFF3FA (sehr hell), Chart-Elemente, Blumen-Foto unten
- Feature 4: bg #0D1117 (fast schwarz), "SELL" in kräftigem Grün (#00FF41)
- Feature 5: bg Weiß, Alert-Card mit Avatar und Text
- Alle Cards: border-radius ~16px, padding ~24px

### Animationen
- Karten erscheinen gestaffelt (stagger) beim Scrollen
- Feature-Tags scrollen horizontal (Marquee)
- Chart in Feature 2 animiert (Live-Datenpunkte)

---

## SECTION 6: PLATFORM OVERVIEW / DASHBOARD

**Zweck:** Das Produkt in Aktion zeigen — "Sie können es verwenden"
**Conversion-Frage:** "Wie sieht das tatsächlich aus?"

### Exakte Texte
- Badge: "Platform overview"
- Headline: "See your financial intelligence in action"
- Subtext: "Explore a real-time dashboard that brings your portfolio, insights, and risk analysis together in one clear view."
- CTA 1: "Explore features →" (blauer Pill-Button)
- CTA 2: "Try the live demo" (Ghost)
- Callout 1: "All your work in one place: Bring all your tasks, projects, and updates together in one clear, unified view."
- Callout 2: "Make progress faster: Access key insights instantly and act without delays or unnecessary steps."
- Callout 3: "Built for better focus: A clean interface that helps you stay focused and keep everything simple."

### Dashboard-Inhalt (Dark Mode App)
- Sidebar: FintechX Logo | Dashboard | Portfolio | Investments | Market Insights | AI Advisor | Resource mgnt | Users | Project template
- Top: "Market Intelligence Center" | "AI-powered insights across global markets • Last updated 2m ago"
- KPIs: Bullish (74%) | Technology | 14.28 VIX
- Trending Assets: BTC $64,233.50 | AAPL $190.42 | TSLA $176.22 | NVDA $872.10
- Asset Allocation Donut: $58.4k | 55% Stocks | 20% Crypto | 10% Cash

### Layout
- Zentrierter Text-Block oben
- Großes Dashboard-Mockup darunter (floating, breiter als Container)
- 3 Callout-Karten rechts neben/unter dem Dashboard

### Visual Design
- Background: Sehr helles Grau/Weiß mit Gras-Foto am unteren Rand
- Dashboard-Card: bg #000000/#0D0D0D, border-radius ~16px, massive shadow
- Callout-Cards: white bg, border 1px #E5E7EB, border-radius 12px

---

## SECTION 7: HOW IT WORKS

**Zweck:** Einstieg vereinfachen, Hürden abbauen
**Conversion-Frage:** "Ist das kompliziert einzurichten?"

### Exakte Texte
- Badge: "How it works"
- Headline: "Start investing in minutes"
- Subtext: "Connect your accounts, let AI analyze your data, and get clear insights to invest with confidence."
- Stat 1: "100% — Secure, encrypted data protection"
- Stat 2: "2 Minutes — Set up to connect and begin instantly"
- Steps: "Step 01 | Step 02 | Step 03" (Tab-Navigation)
- Step 01 Titel: "Connect your accounts"
- Step 01 Text: "Securely link your bank, trading, and investment accounts."
- Visual: Schloss-Icon mit Code-Symbol und Bank-Symbol verbunden durch gestrichelte Linien

### Layout
- Text-Block links, Visual rechts (2-Spalten Desktop)
- Step-Tabs: Horizontale Tab-Navigation mit aktiver Hervorhebung
- Illustration: Centered auf weißer/hellgrauer Fläche

### Visual Design
- Step-Tabs: bg #000000 für aktiven Tab, border-radius 999px
- Illustration: 3D-ähnliche Icons (Schloss blau, Code-Symbol, Bank-Symbol) auf hellgrauem BG
- Stats: Bold-Zahl + kleinerer Text

---

## SECTION 8: SECURITY & COMPLIANCE

**Zweck:** Vertrauen bei skeptischen Usern aufbauen
**Conversion-Frage:** "Ist mein Geld/meine Daten sicher?"

### Exakte Texte
- Badge: "Security & compliance"
- Headline: "Your data is protected at every level"
- CTA: "Get started now →"
- Features:
  - "End-to-end encryption"
  - "Secure data infrastructure"
  - "Privacy-first approach"
  - "Compliance standards"
- Compliance-Badges: SOC 2 TYPE 2 | ISO 27001 | GDPR
- Visual: Lila Cloud mit Shield-Icon, verbunden durch gestrichelte Linien zu den Compliance-Badges

### Layout
- Features links (Liste), Illustration rechts
- Compliance-Badges: runde Kreise am unteren Rand der Illustration

### Visual Design
- Illustration-BG: Hellgrau #F5F5F5
- Cloud: Lila Gradient (blau-lila, 3D-look)
- Compliance-Kreise: Weiß mit Text, border ~1px grau
- Feature-Icons: ➤ Pfeil-Chevron in blau

---

## SECTION 9: USE CASES / PERSONAS

**Zweck:** Verschiedene Zielgruppen ansprechen, Identifikation ermöglichen
**Conversion-Frage:** "Ist das für jemanden wie mich?"

### Exakte Texte
- Badge: "Use cases"
- Headline impliziert: "Who this platform is built for"
- Persona 1: "Individual investors" — "Track your portfolio, get AI insights, and make smarter investment decisions without relying on guesswork." | "+52% Faster — Decision-making with AI insights"
- Persona 2: "Financial teams" — "Collaborate on financial strategies, monitor shared portfolios, and get insights across all your data." | "Real-Time — Collaboration across all investment data"
- Persona 3: "Wealth managers" — (Text mit Blumen-Foto BG)
- Persona 4: "Active traders" — "Stay ahead of market movements with real-time alerts and AI-powered signals for quick decisions." | "Up to 2X — Better goal tracking and portfolio growth"

### Layout
- 2×2 Grid (4 Karten)
- Jede Karte: Bild mit Gradient-Overlay, Text unten

### Visual Design
- Karten-BGs: Hintergrundfoto (Stadtszene, Büro, Blumenwiese, Sonnenuntergang) + dunkler Gradient-Overlay unten
- Text auf Karten: Weiß
- Stat-Highlight: Farbiger Akzent auf der Zahl (z.B. grün für "+52%")

---

## SECTION 10: INTEGRATIONS

**Zweck:** Kompatibilität zeigen, Wechsel-Hürde senken
**Conversion-Frage:** "Funktioniert das mit meinen bestehenden Tools?"

### Exakte Texte
- Badge: "Integrations"
- Headline: "Connect with the tools you already use"
- Subtext: "Seamlessly integrate with your financial platforms, data sources, and tools to keep everything connected and up to date."
- CTA: "Explore all integrations →" (blauer Pill-Button)
- Center-Badge: "100+ integrations available and growing"

### Layout
- Text-Block oben zentriert
- Integration-Icons: 6–8 Icons um ein zentrales FintechX-Icon herum (Orbital-Layout)
- Hintergrund: Grünes Wiesen-Foto

### Visual Design
- Zentral-Icon: Schwarz, rund, Code-Symbol, ~60px
- Integration-Icons: Weiß rund mit farbigen Logos, ~48px
- Verbindungslinien: gestrichelt
- BG: Grüne Wiese (Natur-Foto) — der "nature-inspired" Moment

---

## SECTION 11: PLATFORM STATS

**Zweck:** Soziale Beweis durch Zahlen
**Conversion-Frage:** "Ist das eine legitime Plattform mit echten Nutzern?"

### Exakte Texte
- Badge: "Platform stats"
- Headline: "Powering smarter investment decisions"
- Subtext: "Real-time insights, advanced analytics, and secure infrastructure working together."
- Stat 1: "$250M+" | "Assets tracked" | "In investments monitored across the platform."
- Stat 2: "99.9%" | "Platform uptime" | "Reliable access to your financial intelligence."
- Stat 3: "120+" | "Markets covered" | "Global financial markets are analyzed in real time." (Blau: #4A90E2)
- Stat 4: "1M+" | "AI insights generated" | "Data-driven signals delivered every month."

### Layout
- Headline zentriert oben
- 4 gestapelte Cards (Single Column auf Mobile)
- Desktop: wahrscheinlich 2×2 Grid oder horizontal

### Visual Design
- Stat-Card 1: bg #1A1A1A (dunkel), text weiß
- Stat-Card 2: bg #F5F5F5 (hell), text dunkel
- Stat-Card 3: bg #4A90E2 (blau), text weiß — visueller Akzent
- Stat-Card 4: bg #0D0D0D (fast schwarz), text weiß
- Icon pro Card: weißer Kreis mit Icon, ~40px
- Alle Cards: border-radius ~16px, padding ~32px

### Animation
- Zahlen zählen hoch (CountUp) beim Eintreten in Viewport

---

## SECTION 12: TESTIMONIALS

**Zweck:** Sozialer Beweis durch echte Nutzerstimmen
**Conversion-Frage:** "Sind andere Menschen damit zufrieden?"

### Exakte Texte
- Headline: "What investors say about the platform"
- Meta-Stats: "⭐ 4.9/5 Rating | ❤️ 75+ Testimonials | 👥 10K+ Growth community"
- CTA: "Get started today →"

**Testimonial 1:**
- "This platform helped me understand my portfolio in ways I couldn't before. The insights are clear and actually useful."
- David Miller | Individual Investor | ⭐⭐⭐⭐⭐

**Testimonial 2:**
- "Managing multiple portfolios is much easier now. The risk analysis tools save us hours every week."
- Sarah Thompson | Wealth Manager | ⭐⭐⭐⭐⭐

**Testimonial 3:**
- "The real-time insights and alerts help me react faster to market changes. It's become part of my daily workflow."
- Michael Chen | Active Trader | ⭐⭐⭐⭐⭐

**Testimonial 4:**
- "The data visualization and analytics tools make complex financial information far easier to interpret."
- Emily Rodriguez | Financial Analyst | ⭐⭐⭐⭐⭐

**Testimonial 5:**
- "The insights are clear and actionable. It helps me track performance and make better investment decisions every day."
- Daniel Carter | Portfolio Manager | ⭐⭐⭐⭐⭐

### Layout
- Headline + Meta-Stats links, CTA rechts (2-Spalten Desktop)
- Testimonial-Cards: Single Column auf Mobile, vermutlich stacked
- Hintergrund: Natur-Foto (Berge, Blumen) als parallax BG

### Visual Design
- Cards: Weiß, border 1px #E5E7EB, border-radius 16px, padding 24px
- Stars: Gelb (#F59E0B)
- Avatar: Runde Fotos, ~48px
- Name: weight 600, #0A0A0A
- Rolle: weight 400, #6B7280

---

## SECTION 13: PRICING

**Zweck:** Kaufentscheidung ermöglichen
**Conversion-Frage:** "Was kostet das und ist es das wert?"

### Exakte Texte
- Badge: "Subscription plans"
- Headline: "Transparent pricing without hidden fees"
- Toggle: "Monthly | Yearly | 20% off" (Pill-Toggle)
- Trust-Line: "7-day free trial available • No credit card required • Cancel anytime"

**Starter Plan:**
- "$19 /month"
- "Best for individual investors"
- CTA: "Get started" (dunkler Pill-Button, volle Breite)
- Features: "Connect up to 5 investment accounts | Portfolio performance tracking | Basic AI insights | Market updates & alerts | Real-time price alerts | Email support"

**Pro Plan (Featured):**
- "$39 /month"
- "Best for active investors"
- Badge: "Popular" (blauer Chip)
- CTA: "Get started" (weißer Pill-Button auf dunklem BG)
- Features: "Unlimited account connections | Advanced AI investment insights | Portfolio risk analysis | Smart alerts & automation | Historical performance analytics | Priority support"
- BG: bg #0A0A0A (dunkel)

**Enterprise Plan:**
- "Need a custom solution for your organization? Talk with our team to design a plan for your needs."
- CTA: "Contact sales" (dunkler Pill-Button)

### Layout
- 3 Cards: Starter (grau bg) | Pro (schwarz bg, elevated) | Enterprise (hellgrau bg)
- Desktop: 3 Spalten
- Pro-Card: leicht größer oder erhöht (Most Popular)

### Visual Design
- Starter: bg #F5F5F5, text dunkel
- Pro: bg #0A0A0A, text weiß, "Popular" badge blau
- Enterprise: bg #F5F5F5 oder Naturhintergrund
- Feature-Icons: ➤ Chevron blau
- Toggle: Pill-Form, aktiv = dunkel/blau

---

## SECTION 14: FAQ

**Zweck:** Letzte Einwände ausräumen
**Conversion-Frage:** "Was wenn ich Fragen habe?"

### Exakte Texte
- Headline: "Frequently asked questions"
- Subtext: "Find quick answers to common questions about the platform, pricing, and security."
- FAQ 1 (geöffnet): "How secure is my financial data?" → "Your data is protected with industry-standard encryption and secure infrastructure. We follow strict security practices to ensure your financial information remains private and safe."
- FAQ 2: "Can I connect multiple investment accounts?"
- FAQ 3: "How do the AI insights work?"
- FAQ 4: "Is a trial available before subscribing?"
- FAQ 5: "Do you offer plans for financial teams or organizations?"
- Fallback-Section: "Still have questions?" | "Reach out, and our team will guide you." | CTA: "Talk to our team →" + Avatar-Stack

### Layout
- Single-Column Accordion
- Erster FAQ geöffnet standardmäßig
- "Still have questions?" Box am Ende

### Visual Design
- Accordion: bg weiß, border-bottom 1px #E5E7EB
- Geöffnet: "×" Icon, Text sichtbar
- Geschlossen: "+" Icon
- "Talk to our team" Button: dunkler Pill

---

## SECTION 15: FINAL CTA + FOOTER

**Zweck:** Letzter Push zur Conversion + Navigation/Info

### Exakte Texte — CTA
- Headline: "Ready to invest smarter?"
- Subtext: "Join investors using AI insights and real-time data to track portfolios and make better financial decisions."
- CTA 1: "Start free trial →" (blauer Pill-Button)
- CTA 2: "Try the live demo" (Ghost)

### Exakte Texte — Footer
- Logo: FintechX + Code-Icon
- Tagline: "A modern platform for smarter portfolio tracking and financial insights."
- Email: "support@yourbrand.com" (dunkler Pill-Button)
- **Quick links:** Features | How It Works | Use Cases | Integrations
- **Pages:** About | Feature | Blog | Waitlist | Request a Demo | Error 404
- **Support:** FAQs | Contact | Changelog | Privacy Policy
- Credit: "Designed by vaibhav Tiwari, Powered by Framer."
- Social: Instagram | LinkedIn | Facebook | X/Twitter

### Layout — CTA
- Zentrierter Block auf weißem/hellgrauem BG
- Natur-Foto als subtle BG (Berglandschaft)

### Layout — Footer
- 4-Spalten-Grid: Logo+Tagline+Email | Quick Links | Pages | Support
- Bottom: Credits + Social Icons

### Visual Design — Footer
- BG: Weiß (#FFFFFF)
- Trennlinie: 1px #E5E7EB
- Links: 14px, #374151, hover: #0A0A0A
- Social Icons: Kleine Kreise oder Lucide-Icons

---

## VOLLSTÄNDIGE FARB-PALETTE

| Farbe | Hex | Verwendung |
|---|---|---|
| Primary Blue | `#4A90E2` | CTAs, Highlights, aktive Elemente |
| Dark/Black | `#0A0A0A` | Nav-CTA, Pro-Card, Features, Text |
| Dark Alt | `#0D1117` | AI-powered insights Card |
| Near Black | `#1A1A1A` | Stats Cards, Footer-Text |
| White | `#FFFFFF` | Backgrounds, Cards, Text auf Dunkel |
| Light Gray 1 | `#F5F5F5` | Section-BGs, Cards |
| Light Gray 2 | `#F3F4F6` | Chips, Hover-States |
| Medium Gray | `#6B7280` | Secondary Text |
| Feature Blue BG | `#D4E8F7` | Market Insights Card |
| Feature Gray BG | `#E8EEF5` | Risk Analysis Card |
| Red (Error/Before) | `#E74C3C` | Before-State ✗ Icons |
| Green (AI/SELL) | `#00FF41` | SELL-Text in AI Card |
| Green (Positive) | `#16A34A` | After-State ✓ Icons |
| Yellow (Stars) | `#F59E0B` | Rating Stars |
| Border | `#E5E7EB` | Subtile Trennlinien |
| Purple Cloud | Gradient lila | Security Illustration |

---

## TYPOGRAPHY SCALE

| Element | Größe | Gewicht | Farbe |
|---|---|---|---|
| H1 Hero | 48px (28px mobile) | 800 | #0A0A0A |
| H2 Section | 36–40px | 700–800 | #0A0A0A |
| H3 Feature | 20–24px | 600–700 | #0A0A0A |
| Stat Number | 32–48px | 700–800 | context |
| Body Large | 18px | 400 | #6B7280 |
| Body | 16px | 400 | #374151 |
| Small/Caption | 13–14px | 400–500 | #9CA3AF |
| Badge/Chip | 12–13px | 500–600 | context |
| Nav Links | 14px | 500 | #374151 |
| Button | 14–15px | 600 | context |

Font-Familie: **Inter** (vermutlich) oder sehr ähnliche sans-serif

---

## KOMPONENTEN-INVENTAR

### Navigation
- Floating Pill-Nav: weißer Container, border-radius 999px, shadow
- Logo: Quadratisches Icon + Text
- Nav-Links: Text-Links mit hover-BG
- CTA-Button: Schwarzer Pill mit Pfeil

### Hero-Elemente
- Headline-Badge: Kleines Chip innerhalb der Headline für "AI"
- CTA-Button Primary: Blauer Pill #4A90E2
- CTA-Button Ghost: Transparent, Text-only
- Trust-Chips: Kleine Pill-Chips mit Icon + Text
- Dashboard-Mockup: Dark App-Screenshot als floating Card

### Karten
- Feature-Card: bg-variabel, radius 16px, padding 24px, shadow
- Stat-Card: bg-variabel, bold Zahl, Icon, radius 16px
- Testimonial-Card: weiß, border, stars, quote, avatar+name
- Pricing-Card: 3 Varianten (hell/dunkel/dunkel), radius 16px
- Persona/Use-Case-Card: Bild + Gradient-Overlay + Text

### Badges & Chips
- Section-Badge: Light gray bg, border-radius 999px, padding 6px 14px, 13px text
- "Popular" Badge: Blau bg, weiß text, border-radius 999px
- Trust-Chip: Sehr klein, icon + text, pill-form
- Step-Badge: "Step 01/02/03", schwarz bg, weiß text, pill

### Icons
- Navigation-Icon: </>  in schwarzem Quadrat
- Feature-Icons: 3D-ähnlich (Shield, Chart, Schloss, Cloud)
- Compliance-Badges: SOC2, ISO27001, GDPR als runde Icons
- Social Icons: Standard (IG, LinkedIn, FB, X)

### Spezial-Komponenten
- Before/After Toggle-Dial: Runder Knopf, rotiert
- Pricing Toggle: Monthly/Yearly Pill-Toggle
- FAQ Accordion: Expand/Collapse mit +/× Icon
- Integration Orbital: Icons um zentrales Icon

---

## ANIMATIONEN (vollständig)

| Animation | Trigger | Was passiert | Dauer |
|---|---|---|---|
| Parallax Hero BG | Scroll | Sky-Foto bewegt sich langsamer | kontinuierlich |
| Before/After Switch | Scroll in Section | Karte wechselt hell↔dunkel, Dial rotiert | 0.4–0.6s |
| Feature Cards Stagger | Viewport Enter | Cards erscheinen nacheinander von unten | 0.1s Delay je |
| Feature Tags Marquee | Immer | Tags scrollen horizontal in Loop | 20–30s Loop |
| CountUp Numbers | Viewport Enter | Zahlen zählen von 0 auf Endwert | 1.5–2s |
| Dashboard Entrance | Viewport/Load | Dashboard fährt von unten ein | 0.6–0.8s |
| Parallax Sections | Scroll | Natur-Fotos hinter Content scrollen mit |kontinuierlich |
| Card Hover | Hover | Shadow zunimmt, leichtes Scale | 0.2s |
| Button Hover | Hover | Farbe vertieft sich | 0.15s |
| FAQ Accordion | Click | Smooth height expand/collapse | 0.25s |
| Pricing Toggle | Click | Smooth Slide + Zahlen wechseln | 0.3s |

---

## CONVERSION-LOGIK (Psychologische Reihenfolge)

```
1. NAV: Branding → Vertrauen → einfacher Einstieg (CTA immer sichtbar)
      ↓
2. HERO: Versprechen + sofortiger Beweis (Dashboard) + Social Proof Chips
      ↓
3. CLIENT LOGOS: "Andere vertrauen dem auch" — Herd-Mentalität
      ↓
4. BEFORE/AFTER: "Das ist mein Problem" → "Das löst es" — Identifikation
      ↓
5. FEATURES: "Es kann wirklich alles was ich brauche" — Vollständigkeit
      ↓
6. DASHBOARD: "Ich kann mir vorstellen das zu nutzen" — Visualisierung
      ↓
7. HOW IT WORKS: "Das ist nicht kompliziert" — Einstiegshürde abbauen
      ↓
8. SECURITY: "Meine Daten sind sicher" — Bedenken ausräumen
      ↓
9. PERSONAS: "Das ist für jemanden wie mich gemacht" — Fit bestätigen
      ↓
10. INTEGRATIONS: "Das passt in meinen Workflow" — Lock-in Risiko minimieren
      ↓
11. STATS: "Das ist kein Startup-Experiment" — Legitimität beweisen
      ↓
12. TESTIMONIALS: "Echte Menschen profitieren davon" — Sozialer Beweis
      ↓
13. PRICING: "Der Preis ist fair, ich kann testen ohne Risiko" → CONVERSION
      ↓
14. FAQ: "Meine letzten Fragen werden beantwortet"
      ↓
15. CTA + FOOTER: Letzter Push + Navigations-Sicherheit
```

---

## DESIGN-SPRACHE: "NATURE-INSPIRED PREMIUM FINANCE"

**Kernkontrast:** Technisches Produkt (Dark Dashboards, Charts, AI) ↔ Natürliche Wärme (Wiesen, Himmel, Blumen)

**Wirkung auf Nutzer:**
- Finance-Tools wirken oft kalt und einschüchternd → Natur macht sie zugänglich
- Dark Dashboard = Expertise und Professionalität
- Helle Sektionen mit Naturfotos = Vertrauen und Menschlichkeit

**Schlüssel-Designentscheidungen:**
1. Parallax-Naturfotos als Section-Hintergründe — nie als Hero-Fullscreen
2. Dark Cards für "AI/Intelligence" Features → signalisiert Technologie
3. Floating Pill-Nav → modern, nicht aggressiv
4. Asymmetrisches Feature-Grid → visuelles Interesse, nicht generisch
5. Before/After Toggle → interaktiv, demonstriert Mehrwert
6. 3 Pricing-Tiers mit klarem "Popular" → Decoy-Effekt
7. Konsistente CTA-Hierarchie: Blau Primary → Schwarz Secondary → Ghost

---

## SCREENSHOT-REFERENZ

```
framer/screenshots/deep-scroll/
├── deep-scroll-00.png  → Nav + Hero (scroll 0)
├── deep-scroll-01.png  → Client Logos + Before/After (scroll 820)
├── deep-scroll-02.png  → Before/After After-State + Features Intro (scroll 1640)
├── deep-scroll-03.png  → Features: Risk + Market Insights (scroll 2460)
├── deep-scroll-04.png  → Features: Portfolio + AI-SELL + Smart Alerts (scroll 3280)
├── deep-scroll-05.png  → Smart Alerts + Platform Overview (scroll 4100)
├── deep-scroll-06.png  → Dashboard Callouts + How It Works (scroll 4920)
├── deep-scroll-07.png  → How It Works Steps + Security (scroll 5740)
├── deep-scroll-08.png  → Security Features + Compliance (scroll 6560)
├── deep-scroll-09.png  → Use Cases / Personas (scroll 7380)
├── deep-scroll-10.png  → Active Traders + Integrations (scroll 8200)
├── deep-scroll-11.png  → Integrations Orbital + Stats Intro (scroll 9020)
├── deep-scroll-12.png  → Stats Cards: $250M+ / 99.9% / 120+ / 1M+ (scroll 9840)
├── deep-scroll-13.png  → Testimonials (scroll 10660)
├── deep-scroll-14.png  → Testimonials + Pricing Intro (scroll 11480)
├── deep-scroll-15.png  → Pricing: Starter + Pro (scroll 12300)
├── deep-scroll-16.png  → Pricing: Enterprise + FAQ (scroll 13120)
├── deep-scroll-17.png  → FAQ + Final CTA (scroll 13940)
├── deep-scroll-18.png  → Footer (scroll 14760)
└── deep-scroll-19.png  → Footer vollständig (scroll 15580)
```
