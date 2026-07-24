# Tech Debt Register — pondex
_Last updated: 2026-07-24 · Next review: Phase C Launch_

> Tech debt is not a failure — it is a conscious trade-off.
> The failure is not tracking it.

**Note:** Vollständig neu geschrieben 2026-07-24. Die vorherige Version (2026-06-21) referenzierte die alte Single-File `pondex.html` Architektur, die vollständig durch die React + Vite App ersetzt wurde. Alle alten Einträge (TD-001–TD-010) sind resolved oder obsolet.

---

## Active Debt

| ID | Area | Beschreibung | Priority | Phase |
|---|---|---|---|---|
| TD-011 | Auth | Fake-Auth via localStorage — jede Email/Password funktioniert | High | D |
| TD-014 | Data | Watchlist hardcoded (AAPL/NVDA/MSFT/TSLA) — nicht editierbar | Medium | C |
| TD-016 | UX | AppNav kein Responsive-Verhalten unter 900px | High | C |
| TD-017 | UX | Free Tier Gate (1/Tag) advertised aber nicht implementiert | High | E |
| TD-018 | UX | /app/account Route existiert nicht — Profile-Button → Portfolio | Medium | D |
| TD-019 | UX | Collections-Karten cursor:pointer aber kein click handler | Low | C |
| TD-020 | UX | Login kein "Forgot password?" Placeholder | Low | D |
| TD-021 | Legal | /terms und /privacy nicht in App.jsx registriert | **Critical** | C |
| TD-022 | Legal | Kein GDPR-Consent-Text auf Signup.jsx | **Critical** | C |
| TD-023 | Legal | Kein Account-Delete-Button (GDPR Art. 17) | High | D |
| TD-024 | Design | Interdisplay-Font in grid.js/bungee.js deklariert aber nicht geladen | Medium | C |
| TD-025 | Design | S und M Font-Objekte in bungee.js UND grid.js dupliziert | Low | C |
| TD-026 | Design | Ghost-Design-System in index.css (--color-valuation etc.) widersprüchlich | Low | C |
| TD-027 | Testing | Null automatisierte Tests (unit oder e2e) | Medium | E |
| TD-028 | Backend | Backend nicht auf Railway deployed — nur localhost | **Critical** | C |
| TD-029 | Backend | SENTRY_DSN nicht konfiguriert — kein Error-Monitoring | Medium | C |
| TD-030 | Analytics | Kein Plausible-Script — keine Visibility in Aktivierung/Retention | Medium | C |

---

## Detaileinträge (Critical/High)

### TD-011 — Fake-Auth via localStorage
**Problem:** Jede Email + jedes Passwort → Login erfolgreich. Session geht bei localStorage-Clear verloren.
**Workaround:** Demo-Banner auf Login/Signup ("Demo mode — any credentials work").
**Fix:** Supabase Auth (ADR-010). Email/Password + Google OAuth.
**Phase:** D · **Aufwand:** 2–3 Tage

---

### TD-016 — AppNav kein Responsive
**Problem:** AppNav rendert alle Items inline. Unter ~900px Viewport: Overflow, Items unzugänglich.
**Workaround:** Keiner.
**Fix:** Bottom Navigation Bar (MOBILE-NAV-SPEC.md). 5 Items, fixed footer, CSS media query.
**Phase:** C · **Aufwand:** 1 Tag

---

### TD-017 — Free Tier Gate nicht implementiert
**Problem:** Pricing-Seite wirbt mit "1 verdict/day". Kein Gate existiert. Unlimitierte Analysen. Kein Upgrade-Druck.
**Workaround:** Keiner — User sehen die Paywall nie.
**Fix:** localStorage-Counter `pondex_verdicts_{YYYY-MM-DD}`, bei count ≥ 1 Upgrade-Modal anzeigen.
**Phase:** E · **Aufwand:** 3–4 Stunden

---

### TD-021 — /terms und /privacy fehlen
**Problem:** LandingFooter verlinkt auf /terms und /privacy. Beide Routes nicht registriert → 404 auf GitHub Pages.
**GDPR-Impact:** Art. 13 — keine Datenerhebung ohne diese Seiten live.
**Fix:** Routes in App.jsx registrieren. Templates aus docs/regulatory/ befüllen und deployen.
**Phase:** C (HARD GATE) · **Aufwand:** 2–3h Content + 30min Routing

---

### TD-022 — Kein GDPR-Consent auf Signup
**Problem:** Signup-Formular hat keinen "By creating an account..." Text.
**GDPR-Impact:** Art. 13 Verletzung. Keine legale EU-Datenspeicherung ohne diesen Text.
**Fix:** Eine Zeile unter Submit: "By creating an account you agree to our [Terms] and [Privacy Policy]."
**Phase:** C (HARD GATE) · **Aufwand:** 30 Minuten

---

### TD-023 — Kein Account-Delete (GDPR Art. 17)
**Problem:** Portfolio Account-Tab hat Email + Plan + Logout. Kein "Delete account".
**GDPR-Impact:** Recht auf Löschung muss vor erstem echten EU-Account verfügbar sein.
**Fix Phase C:** Button → `localStorage.clear()` + navigate('/') + Bestätigungs-Dialog.
**Fix Phase D:** Supabase `auth.admin.deleteUser(userId)` + cascade delete aller User-Tabellen.
**Phase:** D · **Aufwand:** 2 Stunden

---

### TD-028 — Backend nicht deployed
**Problem:** FastAPI läuft nur lokal. `VITE_API_URL` defaults zu localhost. Alle Nicht-Demo-Analysen schlagen in Production fehl.
**Workaround:** Demo-Daten für 6 Ticker.
**Fix:** Railway Deploy. `VITE_API_URL` als GitHub Actions Secret. Siehe PHASE-C-LAUNCH-CHECKLIST.md B-01–B-08.
**Phase:** C · **Aufwand:** 2–3 Stunden

---

## Resolved Debt

| ID | Titel | Fixed | Wie |
|---|---|---|---|
| TD-001 | Single-file HTML 4.800+ Zeilen | 2026-07-10 | React + Vite Migration |
| TD-002 | API-Cache bei Reload verloren | 2026-07-10 | backend/app/core/cache.py (ADR-011) |
| TD-003 | DCF hardcoded für NVDA | 2026-07-02 | DCF dynamisch aus Income Statements |
| TD-004 | Kein URL-Routing | 2026-07-10 | React Router, basename='/stockrater' |
| TD-005 | Null automatisierte Tests (alt) | 2026-07-10 | Migrated — TD-027 neu angelegt |
| TD-006 | Mixed localStorage Key-Naming | 2026-07-10 | Alle Keys auf pondex_* standardisiert |
| TD-007 | XSS via FMP innerHTML | 2026-07-02 | FMP vollständig entfernt |
| TD-008 | Finnhub Key hardcoded | 2026-07-10 | Finnhub in React-Rebuild entfernt |
| TD-009 | Chart zeigt zufällige Daten | 2026-07-23 | StockChart.jsx mit echten yfinance OHLCV + illustrative Fallback |
| TD-010 | Mobile CSS-only, nicht UX-nutzbar | 2026-07-24 | MOBILE-NAV-SPEC.md geschrieben — impl. Phase C |
| TD-012 | Wildcard → Landing statt 404 | 2026-07-24 | PageNotFound in App.jsx eingebunden |
| TD-013 | AAPL Score 59 vs 78 | 2026-07-24 | Hero.jsx auf 78/100 korrigiert |
| TD-015 | portfolioValue = rohe Preissumme | 2026-07-24 | Zeigt "N stocks tracked" ohne Live-Daten |
