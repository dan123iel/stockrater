# pondex — Technische Risiken & Constraints

---

## Kritische Risiken

### 1. Yahoo Finance API — Hauptdatenquelle ohne Garantie

**Risiko:** Yahoo Finance wird ohne offiziellen Key über inoffizielle Endpunkte genutzt. Yahoo ändert diese unangekündigt.

**Konsequenz wenn es passiert:** Alle Charts, Financials, Preise fallen aus. Die App ist ohne Fallback sofort unbenutzbar.

**Plan B:**
- Cloudflare Worker implementiert Failover: wenn Yahoo-Endpunkt 5xx zurückgibt, fällt das betroffene Tile elegant auf "Temporär nicht verfügbar" zurück statt die gesamte App zum Absturz zu bringen
- Für Fundamentaldaten: FMP als sekundäre Quelle (User-Key in localStorage)
- Gecachte Daten (1h localStorage) puffern kurzfristige Ausfälle

**Status:** Failover noch nicht implementiert — höchste Priorität vor V1.

---

### 2. Massive/Polygon Rate Limit — Flaschenhals bei Skalierung

**Risiko:** Free Tier = 5 Requests/Minute. Die geplante Discovery Engine braucht 10–30 Ticker im Hintergrund. Bei 3+ gleichzeitigen Nutzern schlägt das Rate Limit an.

**Lösung:**
- Cloudflare Cron Trigger (täglich nachts): ~200 kuratierte Qualitätsaktien abfragen, Fundamentaldaten in Cloudflare KV speichern
- Nutzer-Browser zieht einmal den fertigen Datensatz (1 Request)
- Profil-Matching läuft lokal im Browser — kein API-Druck

**Status:** Noch nicht implementiert — muss vor Discovery Engine gebaut werden.

---

### 3. AI-Halluzinationen — Vertrauensverlust im Finanzkontext

**Risiko:** LLMs nennen falsche Zahlen aus Trainingswissen. Im Finanzbereich ist das tödlich für Nutzervertrauen.

**Lösung — RAG-Architektur:**
- AI darf niemals Zahlen aus Trainingswissen nennen
- Worker packt exakte JSON-Daten (frisch von Yahoo/EDGAR) als Kontext in jeden Prompt
- System-Prompt: "Nutze ausschließlich die im Kontext bereitgestellten Daten. Wenn eine Zahl nicht im Kontext existiert, sage 'Daten nicht verfügbar' statt zu schätzen."

**Status:** Teilweise implementiert — muss vor AI-Chat-Launch verifiziert werden.

---

### 4. localStorage — Datenverlust-Risiko

**Risiko:** Nutzer verliert Portfolio, Journal, Profil wenn er Browser-Cache leert oder Gerät wechselt.

**Lösung:** JSON Export/Import — prominenter Button, muss im MVP vorhanden sein.

**Status:** Noch nicht implementiert — MVP-Blocker.

---

### 5. Single-File-Architektur — Skalierungsgrenze

**Risiko:** Mit AI-Chat, Thesis Tracker, Discovery Engine und Journal wird index.html unlesbar und fehleranfällig. Spaghetti-Code.

**Lösung:** Vite mit Single-File-Inlining als Build-Step einführen. Deployment-Einheit bleibt eine HTML-Datei (USP erhalten), intern aber saubere Komponenten-Struktur.

**Status:** Noch nicht implementiert — muss vor V1 angedacht werden.

---

### 6. CORS — Lokal funktioniert nichts

**Risiko:** Der Cloudflare Worker erlaubt nur `https://dan123iel.github.io` als Origin. Lokale Entwicklung ist deshalb CORS-blockiert.

**Lösung:** Worker-Config für localhost:* ergänzen (nur in dev-Umgebung).

**Status:** Bekannt, kein Blocker für GitHub Pages Deployment.

---

### 7. Finnhub Key — öffentlich im Code

**Risiko:** Der hardcodierte Finnhub-Key ist für jeden sichtbar der den Source-Code anschaut. Bei Missbrauch durch Dritte schlägt das Rate Limit an.

**Lösung:** Key in Cloudflare Worker Secret verlagern.

**Status:** Niedrige Priorität (Finnhub nur für Ticker-Tape, keine kritischen Daten).

---

## Technische Constraints

| Constraint | Begründung |
|---|---|
| Single-File HTML | USP für Nutzer — downloadbar, keine Installation |
| Kein Backend | Privacy-first, keine Serverkosten, kein Account |
| localStorage only | Keine Nutzerdaten auf Server |
| Free-Tier APIs | Kein bezahlter API-Zugang nötig |
| Cloudflare Worker als einziger Server | Proxy für CORS + API-Key-Schutz |
| Kein Build-System aktuell | Muss vor V1 geändert werden |

---

## Währungs-Inkonsistenz (Offene Baustelle)

Yahoo Finance liefert Kennzahlen in der Berichtswährung des Unternehmens. SAP in EUR, NVDA in USD. Wenn ein Nutzer ein EUR-Portfolio führt und US-Aktien hält stimmen DCF-Berechnungen und Portfolio-Werte nicht überein.

**Lösung:** FX-Kurs (EUR/USD etc.) via Yahoo-Chart im Worker holen, Portfolio auf Basiswährung normalisieren.

**Status:** Nicht implementiert — muss vor Portfolio-Metriken gebaut werden.
