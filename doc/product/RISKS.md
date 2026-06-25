# Risks

Die drei Dinge die pondex stoppen könnten — und was dagegen tut.

---

## 1. Yahoo Finance fällt aus

Hauptdatenquelle, kein offizieller Key, keine SLA. Wenn Yahoo die Endpunkte ändert steht die App.

Gegenmassnahme: Worker fängt Fehler ab, Tiles fallen auf "Temporär nicht verfügbar" statt App-Absturz. FMP als Fallback für Fundamentaldaten (User-Key). Cached Daten (1h) puffern kurzfristige Ausfälle. — **Noch nicht implementiert. MVP-Blocker.**

---

## 2. Datenverlust durch Browser-Cache

Portfolio, Journal, Profil — alles in localStorage. Ein Cache-Clear und alles weg.

Gegenmassnahme: JSON Export/Import, prominenter Button. — **Noch nicht implementiert. MVP-Blocker.**

---

## 3. Rate Limit bei Skalierung

Massive/Polygon: 5 Requests/Minute. Discovery Engine braucht 10–30 Ticker. Bei 3+ Nutzern gleichzeitig bricht das zusammen.

Gegenmassnahme: Cloudflare Cron täglich ~200 Aktien cachen (KV Store). Browser zieht einen fertigen Datensatz. Matching läuft lokal. — **Muss vor Discovery Engine gebaut werden.**

---

## Kleinere Risiken

**Währungskonsistenz** — EUR-Portfolio mit USD-Aktien stimmt im DCF nicht. FX-Kurs im Worker nötig. Muss vor Portfolio-Metriken gebaut werden.

**AI-Halluzinationen** — LLM darf keine Zahlen aus Trainingswissen nennen. RAG-Architektur: Worker packt echte JSON-Daten als Kontext in jeden Prompt. Teilweise implementiert — vor AI-Chat-Launch verifizieren.

**Single-File-Architektur** — ab V1 zu groß für eine Datei. Vite mit Inlining einführen damit Deployment-Einheit HTML bleibt aber Codebasis wartbar wird.
