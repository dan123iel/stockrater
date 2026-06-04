# vistaclara — Design System Guide

> Diese Datei ist die verbindliche Designregel. Jede neue Seite, jede neue Sektion folgt diesen Regeln automatisch — kein manuelles Layout mehr.

---

## 1. Grundprinzip: Vollbild-Sektionen

**Jede Seite/Sektion ist 100vh.** Keine halben Sachen. Entweder volle Farbfläche oder weißer Content-Block.

```
Sektion = volle Farbfläche (100vh, min-height)
  └── Nav-Pill (fixed, immer oben)
  └── Inhalt (zentriert oder unten)
  └── Action-Element (Searchbar, Button) → immer unten
```

---

## 2. Farben — zufällig, aber kontrolliert

Farben werden bei jedem Seitenaufruf **zufällig neu gemischt** aus festen Paletten pro Sektion.  
Das JS-Colorizer-System setzt CSS-Variablen (`--section-X-color`) — nie hardcoden.

**Palette-Kategorien:**
| Sektion | Farbton | Beispiele |
|---------|---------|-----------|
| Home | Heißpink / Neon | `#ff2d6b`, `#ff6b00`, `#cc00ff` |
| Analysis | Elektrisch-Blau / Lila | `#4a1ae8`, `#6600ff`, `#2200aa` |
| Compare | Aubergine / Dunkelviolett | `#2a0a40`, `#3d0070`, `#0a1a60` |
| Portfolio | Navy / Dunkelgrün | `#0d0b2e`, `#001a40`, `#0a2a1a` |
| Settings | Tiefviolett / Plum | `#3d1060`, `#2a0050`, `#400030` |
| Result/Content | Coral / Warm-Orange | `#ff6b52`, `#ff9500`, `#ff4488` |

**Regel:** Alle Farben innerhalb einer Sektion sind **monochrom** — eine Hauptfarbe, der Rest ist transparent/weiß.

---

## 3. Navigation — immer sichtbar, immer ehrlich

```
Position: fixed, top: 1.25rem, zentriert (left: 50%, transform: translateX(-50%))
Form:      Pill (border-radius: 999px)
Hintergrund: rgba(dunkel, .5) + backdrop-filter: blur(20px)
```

**Regeln:**
- Kein Logo in der Nav (außer auf Home-Sektion als kleines vc-Logo möglich)
- Aktive Sektion ist **immer** highlighted (weißes Pill im Pill)
- Nav-Farbe passt sich zur aktiven Sektion an (dunklere Version der Sektionsfarbe)
- Nav enthält maximal 6 Items: `home · analysis · compare · portfolio · settings` (+ optional mehr)

---

## 4. Typografie — Schrift als Designelement

### Home-Sektion
```
Schrift: DM Sans, font-weight: 900
Größe:   clamp(16rem, 40vw, 38rem) — nimmt den ganzen Viewport ein
Farbe:   rgba(255,255,255,.18) — Ghost über Hintergrundfarbe
Layout:  Absolute, überlappt sich absichtlich (zweite Zeile margin-top: -2rem)
```

### Page-Titel (andere Sektionen)
```
Schrift: DM Sans, font-weight: 900
Größe:   clamp(3rem, 10vw, 7rem)
Farbe:   #fff
```

### Labels / Eyebrows
```
Schrift: DM Mono
Größe:   0.65rem
Style:   ALL CAPS, letter-spacing: .2em
Farbe:   rgba(255,255,255,.4)
```

### Body / Content
```
Schrift: DM Sans
Hintergrund: var(--cream) #f5f1e8
Karten: weißer Hintergrund, abgerundet (18px)
```

---

## 5. Suchbar-Pattern

Die Suchbar ist das **primäre Aktionselement** einer Sektion. Sie sitzt **immer unten**.

```css
/* Grundstruktur */
.search-bar {
  background: var(--section-search-color);  /* kontrastierend zur Sektionsfarbe */
  border-radius: 999px;
  padding: .5rem .5rem .5rem 1.75rem;
  border: 2px solid rgba(255,255,255,.15);
}

/* Input */
font-size: 1.5rem; font-weight: 700;
color: Sektionsfarbe (Kontrast zum Searchbar-BG)

/* Button */
background: Sektionsfarbe;
color: Searchbar-BG-Farbe;
border-radius: 999px;
```

**Varianten:**
- Analysis → Coral Searchbar, Lila Button
- Compare → 2× Acid-Grün Searchbar, Aubergine Button
- Risk Engine → gleiche Logik wie Analysis

---

## 6. Content-Sektionen (nach Suchergebnis)

Wenn Inhalt geladen wird, erscheint eine neue Sektion unterhalb:

```
Coral/Warm-Fläche
  └── Company Name: clamp(3rem, 9vw, 7rem), font-weight:900, color: Sektionsfarbe
  └── Chips: kleine Pills mit Sektionsfarbe als BG
  └── Preis: DM Mono, riesig, color: Sektionsfarbe

Darunter: Cream-Hintergrund (#f5f1e8)
  └── Weiße Cards mit leichtem Schatten
  └── Linker Farbstreifen als Card-Akzent
```

---

## 7. Farbige Seiten (Portfolio, Settings, etc.)

Jede Sektion **ohne** Suchergebnis lebt komplett auf der Farbfläche.

```
Sektion: volle Sektionsfarbe
  └── Eyebrow: rgba(255,255,255,.4), MONO, CAPS
  └── Titel: #fff, riesig
  └── Cards: rgba(255,255,255,.12), border: rgba(255,255,255,.15)
      └── Text: #fff
      └── Labels: rgba(255,255,255,.5)
  └── Listen-Items: #fff, hover: leicht heller
  └── Buttons: rgba(255,255,255,.2) / #fff mit Sektionsfarbe-Text
```

---

## 8. Kein Ticker

**Ticker sind verboten.** Kein scrollender Text. Stattdessen: Whitespace, Farbe, Typografie.

---

## 9. Section-Layout Template

Jede neue Sektion folgt diesem Template:

```html
<section class="section" id="section-NAME" style="background:var(--section-NAME-color)">
  
  <!-- Spacer für Nav -->
  <div style="height:5.5rem;flex-shrink:0"></div>
  
  <!-- Optional: Eyebrow + Titel oben -->
  <div style="padding:2rem 2.5rem 0">
    <div class="eyebrow">KATEGORIE</div>
    <div class="page-title">seitenname</div>
  </div>
  
  <!-- Inhalt wächst -->
  <div style="flex:1;padding:2rem 2.5rem">
    <!-- Cards mit rgba(255,255,255,.12) -->
  </div>
  
  <!-- Action-Element unten (wenn vorhanden) -->
  <div style="padding:2rem 2.5rem 3rem">
    <!-- Searchbar oder Button -->
  </div>
  
</section>
```

---

## 10. Do's and Don'ts

| Do ✓ | Don't ✗ |
|------|---------|
| Volle Farbflächen, immer 100vh | Weiße oder graue Seitenränder |
| Riesige Ghost-Schrift als Hintergrund | Ticker / scrollende Elemente |
| Suchbar unten, groß und rund | Kleine Inputs oben |
| Farben zufällig aus Paletten | Feste Farben hardcoden |
| DM Sans + DM Mono | Andere Fonts |
| Nav-Pill immer aktiv | Nav ohne aktiven State |
| Monochrome Sektionen | Zu viele Farben pro Sektion |
| Overlapping Typografie auf Home | Normale zentrierte Texte |
| Transparente Cards auf Farbe | Weiße Cards auf Farbe |

---

## Farbpaletten-Referenz

```js
const PALETTES = {
  home:     ['#ff2d6b','#ff6b00','#cc00ff','#ff0088'],
  analysis: ['#4a1ae8','#2200aa','#6600ff','#3300cc'],
  compare:  ['#2a0a40','#1a0050','#3d0070','#0a1a60'],
  portfolio:['#0d0b2e','#001a40','#0a2a1a','#1a0a30'],
  settings: ['#3d1060','#2a0050','#1a0a50','#400030'],
  search:   ['#ff6b52','#ff9500','#ff4488','#ff6600']
}
```

Jede Sektion greift zufällig auf ihre Palette zu — so ist jeder Aufruf anders, aber immer kohärent.
