# pondex_ — CLAUDE.md

> Wird von Claude Code bei jeder Session automatisch geladen.
> Vor jeder Aktion lesen.

---

## 1. Was ist dieses Projekt?

pondex_ ist ein Stock-Research-Tool. Klares Plain-Language-Urteil für jede Aktie, jede Zahl mit benannter Quelle. Zielnutzer: selbstständiger Value-Investor (EU-NW), hat bereits für Research-Tools bezahlt, hat gekündigt weil Noise nicht gelöst wurde.

**Die eine Regel die alles übersteuert:** Jede angezeigte Kennzahl und jeder AI-Output muss seine primäre Datenquelle namentlich ausweisen. Keine Zahl ohne Quellenangabe.

---

## 2. Diese Dateien zuerst lesen

In dieser Reihenfolge, bevor Code geschrieben wird:

1. `.project-context/MASTER.md` — Zweck, aktueller Milestone, Hard Rules
2. `.project-context/context/architecture.md` — wo jede Datei liegt, alle API-Endpoints
3. `.project-context/context/tech-stack.md` — nur approved Tech (keine FMP, kein OpenAI)
4. `.project-context/context/coding-guidelines.md` — Code-Regeln + Definition of Done

---

## 3. Wo was hingehört — keine Verwechslungen

| Was | Wo | Niemals in |
|---|---|---|
| Frontend-Seiten | `frontend/src/pages/` | `components/` |
| Wiederverwendbare Komponenten | `frontend/src/components/` | `pages/` |
| API-Client (ruft Backend auf) | `frontend/src/lib/fmp.js` | Direkt in Komponenten |
| User-Daten (localStorage) | `frontend/src/lib/storage.js` | Hardcoded |
| CSS-Variablen / Design-Tokens | `frontend/src/index.css` | Inline-Styles |
| shadcn-Komponenten | `frontend/src/components/ui/` | NICHT BEARBEITEN |
| Alle Backend-Endpoints | `backend/main.py` | Separate Dateien |
| Produktentscheidungen, Roadmap | `doc/ROADMAP.md`, `doc/PRD.md` | Memory, Chat |
| GTM, ICP, Messaging | `doc/product/strategy.md` | Root-Ebene |
| Survey-Daten, Research | `doc/research/` | Memory |
| Architektur-Entscheidungen | `doc/adr/ADR-NNN-*.md` | Code-Kommentare |
| AI-Agent-Regelwerk | `.project-context/` | CLAUDE.md direkt |
| Persistente AI-Memory | `~/.claude/projects/.../memory/` | Dieses Repo |

---

## 4. Hard Rules

- **Kein FMP.** Daten kommen aus `backend/main.py` via `yfinance`. `lib/fmp.js` ruft das Backend auf, nicht FMP.
- **Kein OpenAI / Claude für AI-Features.** Nur Groq Llama 3.3 70B.
- **Jede Kennzahl zeigt ihre Quelle.** `explanations{}` und `sources[]` aus `/score` müssen gerendert werden.
- **Score ist eine Schlussfolgerung.** Erklärung rendert zuerst, Score-Zahl zuletzt.
- **`frontend/src/components/ui/` nicht bearbeiten.** Das sind shadcn-generierte Dateien.
- **Vor "fertig" verifizieren.** `npm run build`, Dateien prüfen, FMP-grep, commit, push.

---

## 5. Aktueller Milestone

**Phase 1 — MVP** · Target: 15. Juli 2026

In scope: 12-Tab-Analytics, Explanation-first UX, Source Attribution, 6 Nav-Seiten, Backend auf Railway.
Noch nicht: Login, Stripe, Macro Hub, Multilingual, Dark Mode.

→ `doc/ROADMAP.md` für vollständige Phase-Details.
→ `doc/product/strategy.md` für ICP, Messaging, Wachstumshypothese.
