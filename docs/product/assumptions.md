# pondex — Assumptions Log
_Last updated: 2026-07-24_

> Tracks all key assumptions underlying product decisions.
> Status: Unvalidated → Validated → Refuted

---

## A-001 · Signal/Noise ist der #1 Pain
- **Annahme:** EU-Privatanleger verlassen bestehende Tools primär wegen Noise — nicht wegen fehlender Daten
- **Belege:** Wave 1 n=45 (51%), Wave 2 n=35 (40%), alle 3 Interviews unabhängig
- **Status:** ✅ Validiert (Warm Network)
- **Lücke:** Cold-Audience-Replizierung ausstehend (EXP-001, Reddit)

---

## A-002 · Quellenattribution ist der Kauftrigger
- **Annahme:** User zahlen nur wenn jede Metrik eine benannte Quelle hat
- **Belege:** 71% WTP konditioniert auf Quellenangabe (Wave 1)
- **Status:** ✅ Validiert (Warm Network)
- **Lücke:** Cold-Audience-Replizierung ausstehend

---

## A-003 · Plain-Language Verdict reduziert Entscheidungsreibung
- **Annahme:** Plain-Language Summary reduziert Time-to-Decision vs. rohe Daten
- **Belege:** ADR-007 (explanation-first UX), José B.: "Gemini shows BUY/HOLD/SELL and explains why — that's why I trust it"
- **Status:** ✅ Teilvalidiert (1 Interview)
- **Review:** Measure TTV (Time To Value) in Phase C

---

## A-004 · EU-Privatanleger sind underserved
- **Annahme:** Kein aktuelles Tool kombiniert EU-Abdeckung + Quellenattribution + Plain-Language
- **Belege:** Competitor Analysis 2026-07-03, Revolut-Analyse 2026-07-24
- **Status:** ✅ Validiert
- **Review:** Kontinuierlich — Koyfin, Finchat, Revolut Roadmaps beobachten

---

## A-005 · €4.99/Monat ist der richtige Preispunkt
- **Annahme:** €4.99/Monat (Free/Pro) ist die optimale Preis-Conversion-Balance für EU-Retail-Investoren
- **Belege:** Patricia P. Van Westendorp: €3–5/Monat als "Schnäppchen" (iCloud/Netflix-Tier). Wave 2: 69% offen für $4.99 (10% Hard-Yes, 59% Maybe).
- **Status:** ⚠️ Teilvalidiert (Warm Network nur)
- **Lücke:** Cold-Audience Van-Westendorp-Test (EXP-002) ausstehend. Entscheidung getroffen aber nicht kalt validiert.
- **Review:** Vor Phase E Stripe-Integration — Reddit-Test

---

## A-006 · 30-Day Retention >40% erreichbar
- **Annahme:** User die verstehen warum ein Score X ist, kommen häufiger zurück als bei Score-only Tools
- **Belege:** Keine Daten noch — Phase C OKR
- **Status:** 🔲 Unvalidiert
- **Review:** Erste 100 echte User nach Phase C Launch (Plausible: D7 + D30 Retention)

---

## A-007 · Groq Llama 3.3 70B ausreichend für AI-Qualität
- **Annahme:** Open-Weight LLM via Groq produziert AI-Verdicts gut genug dass User ihnen vertrauen (mit Quellenattribution)
- **Belege:** Internes Testing — kein User-Feedback
- **Status:** 🔲 Unvalidiert
- **Review:** Nach Phase C: "Hat die AI-Erklärung Ihr Vertrauen erhöht?" in User-Interviews

---

## A-008 · Exit Strategy ist echtes Differenzierungs-Feature
- **Annahme:** "Wann verkaufen?" ist ein so großes ungelöstes Problem dass es Conversion und Retention signifikant verbessert
- **Belege:** Gunnar L.: "Ich weiß nie wann ich verkaufen soll." Wave 1: Signal/Noise = #1 Pain (includes exit timing)
- **Status:** ✅ Problem validiert (Warm Network)
- **Lücke:** Ob pondex_ Exit-Signals als ausreichend gut wahrnimmt — unvalidiert
- **Review:** After Phase E2 launch — Thesis Tracker adoption rate

---

## A-009 · 3 Onboarding-Fragen + Skip sind ausreichend für Personalisierung
- **Annahme:** Goal + Horizon + Risk reaction reichen um Value/Growth/Core Profil zuverlässig zu bestimmen
- **Belege:** Entscheidung getroffen (D-010). Logik: Frage 3 (Risk) ist stärkster Diskriminator.
- **Status:** 🔲 Unvalidiert
- **Review:** Nach Phase D: Abbruchrate bei Frage 3 + Profil-Adoptionsrate

---

## A-010 · Cold Audience konvertiert ähnlich wie Warm Network
- **Annahme:** Die Conversion-Signale aus n=91 Warm-Network-Befragungen sind auf fremde User übertragbar
- **Belege:** Keine — das ist die zentrale offene Frage
- **Status:** 🔲 Unvalidiert — **höchstes Risiko vor Phase E**
- **Review:** EXP-001 Reddit-Test vor Phase E Stripe-Investment

---

_Neue Annahmen vor jedem neuen Spec eintragen. Nie ein Feature bauen dessen Kern-Annahme Unvalidated ist ohne einen Test-Plan._
