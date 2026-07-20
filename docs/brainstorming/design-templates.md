# Design Template Vergleich

_Stand: 2026-07-17 · Entscheidung: Bungee gekauft_

---

## Kandidaten

### 1. Zinve (zinve.webflow.io)
- **Stil:** Dark/light alternierend, Khand + Kanit uppercase Headlines, very bold
- **Bg:** #0a0a0a + #f5f5f5 alternierend
- **Font:** Khand (Headings) + Kanit (Body)
- **Buttons:** Pill-shaped, slide-text hover
- **Charakter:** Sehr ernst, schwer, editorial — wie eine Finanz-Zeitung
- **Preis:** $49
- **Status:** Analysiert, DESIGN_SPEC.md + WEBFLOW_VARIABLES.md vorhanden

### 2. Bungee (bungee-pro.webflow.io) ✅ GEKAUFT
- **Stil:** Weiß bg, Interdisplay Font, sehr clean und modern
- **Bg:** Weiß (#ffffff) mit dunklen Akzenten
- **Font:** Interdisplay (Headlines) + Chivo Mono (Labels)
- **Nav:** Fixed 80px, rgba(255,255,255,0.7) + blur(10px), Offcanvas mit riesigen Links
- **Buttons:** Kein Radius (0px) — sehr minimal
- **Charakter:** Creative Agency, selbstbewusst, modern, nicht zu ernst
- **Preis:** $59
- **Status:** GEKAUFT ✅

### 3. LunarPro (lunarpro.webflow.io)
- **Stil:** Komplett dark, Inter font, sehr elegant und luftig
- **Bg:** #000000 + #0e0e10
- **Font:** Inter, 400 weight — nicht bold, nicht uppercase
- **Accent:** Mint-Grün #56DCAD
- **Headings:** 64px, grau (#cccccc), leicht
- **Buttons:** Pill-shaped (65px radius), Mint-Grün
- **Charakter:** Premium, clean, dark — näher an Revolut als an Agency
- **Status:** Inspirationsquelle, nicht gekauft

### 4. Okio (okio-pro.webflow.io)
- **Stil:** Hellblaugrau (#eef0f6), bunt, lebendig
- **Charakter:** Design Agency, zu bunt für FinTech
- **Status:** Ausgeschlossen für pondex

---

## Entscheidung

**Bungee gekauft.** Nächster Schritt: Lovable-Prompt auf Bungee-Design-System umschreiben.

**Offen:** Soll LunarPro's dunkles System als Referenz für die App-Screens (eingeloggte Version) verwendet werden, während Bungee für die Landing Page (nicht eingeloggt) verwendet wird?

---

## Was aus Bungee direkt verwendbar ist

| Element | Bungee-Wert | pondex-Anpassung |
|---|---|---|
| Font | Interdisplay | Beibehalten |
| Mono Font | Chivo Mono | Für Labels, Quellen-Badges |
| Nav | Fixed, 80px, blur | Beibehalten |
| Nav Links | Offcanvas, 60px groß | Für Marketing-Nav |
| Button Style | 0px radius, minimal | Anpassen auf pill (999px) für pondex-Brand |
| Section Colors | Weiß + dunkel (#1e1e1e) | Weiß für light, #0a0a0a für dark |
| Accent Colors | Violett (#e5daf6), Grün (#cfffb2), Rosa (#ffc9c9) | Ersetzen mit pondex Gradient + #00ff88 |
