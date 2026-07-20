# Opportunity Scorecard & Discovery Decision Log

**Erstellt:** 2026-07-02  
**Basis:** Wave 1 Survey Analysis (n=56) → `doc/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md`  
**Playbook:** `doc/research/_playbooks/post_analysis_discovery_process.md` Step 1

---

## Opportunity Scoring (1–5 pro Kriterium, max 30)

| Kriterium | Gewicht | Cluster 1: Noise/Clarity | Cluster 2: Data Trust/AI | Cluster 3: Time/Fragmentation | Cluster 4: Access Barrier |
|-----------|---------|--------------------------|--------------------------|-------------------------------|--------------------------|
| **Frequency** (Wie oft tritt der Schmerz auf?) | Hoch | **5** — bei jeder Research-Session | **4** — jedes Mal wenn AI genutzt | **4** — jedes Mal wenn mehrere Tools offen | **5** — dauerhafter Zustand |
| **Intensity** (Wie stark ist der Schmerz?) | Hoch | **5** — Churner haben dafür bezahlt + abgebrochen | **4** — "AI has no place" / starke Sprache | **3** — Ärger, kein dealbreaker | **4** — verhindert Einstieg komplett |
| **WTP-Evidenz** (Zahlen sie bereits dafür?) | Hoch | **4** — 2 Churner bei $15–50/mo, gleicher Grund | **2** — kein direktes Zahlungssignal | **1** — kein Zahlungssignal | **0** — 0% Zahlungshistorie in Aspirer-Gruppe |
| **Marktgröße** (Wie groß ist das Segment?) | Mittel | **4** — 62% der Stichprobe sind Investoren | **3** — quer durch alle Investoren | **3** — vor allem Passive + Active | **3** — 32% der Stichprobe |
| **Alignment** (Passt zu unseren Stärken?) | Mittel | **5** — ist das Kernversprechen von pondex | **5** — Quellenattribution ist bereits ADR-007 | **3** — teilweise adressierbar | **2** — andere Produktlogik nötig |
| **Solvability** (Können wir es besser lösen?) | Mittel | **4** — Yahoo + SEC + Groq + Erklärung-zuerst | **5** — Quellenattribution pro Metrik ist gebaut | **3** — One-Stop-Shop hilft, löst es nicht komplett | **2** — Erfordert Education-Layer, nicht gebaut |
| **TOTAL** | | **27/30** | **23/30** | **17/30** | **16/30** |

---

## Entscheidung

| Cluster | Score | Entscheidung | Begründung |
|---------|-------|-------------|------------|
| **Cluster 1 — Noise/Clarity** | 27/30 | ✅ **Verfolgen (primär)** | Höchster Score, stärkste WTP-Evidenz (Churner), Kernkompetenz, 62% Zielgruppe |
| **Cluster 2 — Data Trust/AI** | 23/30 | ✅ **Verfolgen (sekundär, integriert)** | Nicht separat — löst sich durch konsequente Quellenattribution. Ist bereits Bestandteil von Cluster 1. |
| **Cluster 3 — Time/Fragmentation** | 17/30 | 🟡 **Geparkt** | Kein eigenständiges WTP-Signal. One-Stop-Shop löst es teilweise als Nebeneffekt von Cluster 1. |
| **Cluster 4 — Access Barrier** | 16/30 | ❌ **Killed für Phase 1** | 0% Zahlungshistorie in Aspirer-Gruppe. Völlig andere Produktlogik. Phase 2 frühestens nach Interview-Validierung. |

**Fazit:** Cluster 1 und 2 sind dasselbe Problem aus zwei Winkeln — "Ich bekomme kein klares Signal" + "Ich vertraue dem Signal nicht." pondex löst beides mit einem Ansatz: Erklärung-zuerst + Quellenattribution pro Metrik.

---

## Discovery Decision Log

| Datum | Entscheidung | Evidenz | Alternativen erwogen | Owner |
|-------|-------------|---------|---------------------|-------|
| 2026-07-02 | Cluster 1 (Noise/Clarity) als primäre Opportunity | Score 27/30; 2 Churner mit identischem Kündigungsgrund; Quellenattribution bereits validiert (ADR-007) | Cluster 2 separat verfolgen (gleicher Lösungsweg, nicht sinnvoll) | PM |
| 2026-07-02 | Passive Investoren als MVP-Zielgruppe | 41% der Stichprobe; kohärentes Pain-Profil; 80% <1h/Woche → Radikale Reduktion als UX-Prinzip | Active Investoren (höhere Zahlungsbereitschaft, aber n=12 und nischigere Anforderungen) | PM |
| 2026-07-02 | EOD-Daten ausreichend für Phase 1 | 80% der Investoren checken <1h/Woche; kein Real-Time-Signal in Survey | Real-Time (höherer Infra-Cost, kein validierter Bedarf) | Tech |
| 2026-07-02 | Cluster 4 (Access Barrier / Aspirers) killed für Phase 1 | 0% Zahlungshistorie; andere Produktlogik; Phase 1 Budget zu knapp | Paralleler Onboarding-Track (scope creep risk zu hoch) | PM |
| 2026-07-02 | Van Westendorp Preistest vor Paywall | Nur 5 Personen mit Zahlungshistorie; kein Preispunkt in Wave 1 getestet | Direkt €9/Monat launchen (zu riskant ohne Evidenz) | PM |
| 2026-07-02 | Gunnar Leu als Interview #1 | Einziger Churner mit vollständigem Profil: Zahlungshistorie, benannter Pain, Kontaktfreigabe, detaillierter Q9-Verbatim | Andere Follow-up-Kontakte (kein Zahlungssignal) | PM |

---

## Nächste Schritte (aus Scorecard abgeleitet)

1. **Gunnar Leu Interview** — Cluster 1 Tiefe validieren, Geopolitik-Bedarf klären, echten WTP-Range erfragen
2. **4–7 weitere Interviews** — passive Investoren aus Follow-up-Liste, Cluster 1+2 Bestätigung
3. **Interview Synthesis** → `doc/discovery/interview-synthesis.md`
4. **Wave 2 Survey** (r/eupersonalfinance) — nach erstem Interview
5. **Van Westendorp Pricing Test** — nach Interviews, mit den 5 WTP-Kontakten
6. **Lo-Fi Prototype "Verdict Screen"** — nach Interview-Synthese

---

## Offene Fragen (aus Survey noch nicht beantwortbar)

| Frage | Warum wichtig | Wie validieren |
|-------|--------------|----------------|
| Ist Geopolitik + Fundamentals eine echte Must-have-Kombination oder Wunschdenken? | Würde neue Datenquelle (nicht in Stack) erfordern | Gunnar Leu Interview |
| Was ist der echte WTP-Preispunkt ($9/$19/$49)? | Paywall-Design, Unit Economics | Van Westendorp Test |
| Replizieren sich die Findings bei kaltem Publikum? | Warm-Network-Bias ist hoch | Wave 2 auf Reddit |
| Ist "Verdict in 60s" der richtige Frame, oder reicht auch "3 Key Facts mit Quellen"? | UX-Architektur der ersten Seite | Prototype Usability Test |
