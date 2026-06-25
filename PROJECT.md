# pondex

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

> pondex ist das Investment-Betriebssystem für selbstbestimmte Privatanleger — es begleitet Entscheidungen statt Daten anzuzeigen.

---

## Dokumentation

### Produkt
| Dokument | Inhalt |
|---|---|
| [VISION.md](doc/product/VISION.md) | Vision Statement, Kernprobleme, Positionierung, Zielgruppe, Prinzipien |
| [STRATEGY.md](doc/product/STRATEGY.md) | Wie pondex gewinnt, Wachstumsstrategie, Erfolgsmetriken |
| [ROADMAP.md](doc/product/ROADMAP.md) | MVP / V1 / V2 / V3 mit Exit-Kriterien |
| [BACKLOG.md](doc/product/BACKLOG.md) | Alle Feature-Ideen mit Priorität, Phase, Bewertung |
| [RISKS.md](doc/product/RISKS.md) | Technische Risiken, Constraints, offene Baustellen |

### Engineering
| Dokument | Inhalt |
|---|---|
| [ARCHITECTURE.md](doc/ARCHITECTURE.md) | Technischer Aufbau, Worker, Datenfluss |
| [CODING-CONVENTIONS.md](doc/CODING-CONVENTIONS.md) | Code-Standards |
| [ENGINEERING-PRINCIPLES.md](doc/ENGINEERING-PRINCIPLES.md) | Entwicklungs-Prinzipien |
| [DATA-COVERAGE.md](doc/DATA-COVERAGE.md) | Datenverfügbarkeit nach Region/Aktie |
| [DATA-GOVERNANCE.md](doc/DATA-GOVERNANCE.md) | Datenquellen, Caching, Privacy |
| [SECURITY.md](doc/SECURITY.md) | Sicherheitsüberlegungen |
| [TECH-DEBT.md](doc/TECH-DEBT.md) | Bekannte technische Schulden |
| [RISK-REGISTER.md](doc/RISK-REGISTER.md) | Technisches Risiko-Register |
| [DEFINITION-OF-DONE.md](doc/DEFINITION-OF-DONE.md) | Was "fertig" bedeutet |

### Specs
| Dokument | Inhalt |
|---|---|
| [DISCOVERY-AI-CHAT-SPEC.md](doc/DISCOVERY-AI-CHAT-SPEC.md) | AI-Chat & Discovery Engine Spezifikation |
| [INTELLIGENCE-ARCHITECTURE.md](doc/INTELLIGENCE-ARCHITECTURE.md) | Intelligence Layer Architektur |
| [PROJECT-BRIEF.md](doc/PROJECT-BRIEF.md) | Ursprüngliches Project Brief |

---

## Technischer Stack (Kurzfassung)

```
Browser (index.html — single file, kein Framework)
  └── localStorage: Portfolio, Watchlist, Trades, Theme, Profil

Cloudflare Worker (trading.d-lenz-contact.workers.dev)
  ├── /yahoo/summary + /yahoo/chart   ← Financials, Charts (global)
  ├── /yahoo-news                     ← News
  ├── /massive/{endpoint}             ← Ticker-Details, Dividenden, Logos
  ├── /edgar/{path}                   ← Insider-Trades, EPS (US only)
  └── /ai/groq                        ← AI Proxy (Llama 3.3 70B)
```

## Entwicklungsregeln

- Eine Datei — kein Build-System, kein npm, kein Framework (bis Vite-Migration in V1)
- Keine kostenpflichtigen APIs für Nutzer
- Alle API-Keys server-seitig (Cloudflare Worker Secrets)
- Kein Backend, keine Datenbank, keine Server-seitige Nutzerdaten
- Jedes neue Feature muss den Filter bestehen: Macht es Entscheidungen, Lernen oder Verhalten besser?
