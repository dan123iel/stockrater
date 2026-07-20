# Security — pondex

> Last updated: 2026-06-21
> Reviewed by: Daniel

---

## Current Security Profile

pondex Phase 1–3 is a **client-side-only, single-user, no-auth application.**
There is no server, no database, no user accounts, and no PII stored beyond what the user explicitly enters.
The threat surface is fundamentally different from a SaaS application.

This document covers Phase 1–3 (current) and flags what changes in Phase 4.

---

## What We Protect

| Asset | Classification | Where it lives | Current risk |
|-------|---------------|----------------|-------------|
| FMP API key | Sensitive | localStorage | Low — single user, own browser. Key only leaves browser in API calls to FMP. |
| Groq API key | Sensitive | localStorage | Low — same as above. Free tier key. |
| Portfolio holdings | Personal-financial | localStorage | Low — not transmitted anywhere. Lost if browser data cleared. |
| Trade journal | Personal-financial | localStorage | Low — same as above. |
| Strategy profile | Personal | localStorage | Negligible — not sensitive. |

**There is no PII (name, email, password) stored in Phase 1–3.**

---

## Threat Model

### Threats that apply

| Threat | Description | Mitigation |
|--------|-------------|-----------|
| API key exposure via XSS | If pondex rendered attacker-controlled HTML, keys could be exfiltrated | API data interpolated into HTML must be escaped (see CODING-CONVENTIONS.md) |
| API key in git history | Developer accidentally commits a hardcoded key | Keys are never hardcoded — entered at runtime, stored in localStorage only. `.gitignore` covers `.env`. |
| Malicious FMP response | FMP returns crafted payload that causes XSS | FMP API data rendered into HTML must be sanitized. Using `textContent` for user-visible strings where possible. |
| localStorage theft by other tabs | Another page on same domain reads pondex keys | pondex is served from its own domain (GitHub Pages). No shared origin risk. |
| Insecure Cloudflare Worker | Worker leaks data or is exploited | Worker only proxies Yahoo Finance RSS. No user data transits through it. Source in `worker.js`. |

### Threats that do NOT apply (current phase)

- Privilege escalation — no auth, no roles
- SQL injection — no database
- CSRF — no state-changing server endpoints
- Session hijacking — no sessions
- Data breach notification — no stored PII
- DDoS — GitHub Pages handles this

---

## Security Controls — Phase 1–3

### API Key Handling

- [x] Keys stored in `localStorage` under `pondexfmp_key` and `pondexgroq_key`
- [x] Keys shown masked in Profile UI (`abc123••••••••`)
- [x] Keys travel only in HTTPS requests to FMP and Groq APIs directly — never to any pondex server
- [x] Keys never committed to git — entered at runtime only
- [ ] Keys not persisted across browsers — user must re-enter per device. (Phase 4: Supabase vault)

### HTML Injection Prevention

- [x] All tile builders must escape any string from external APIs before `innerHTML` assignment
- [x] Company names, headlines, and analyst data from FMP should use `textContent` assignment where possible
- [ ] Full audit of all `innerHTML` interpolations using API data — **tracked as TD-007** (not yet complete)

### Transport Security

- [x] All API calls use HTTPS — FMP, Groq, Cloudflare Worker
- [x] GitHub Pages serves over HTTPS with HSTS by default
- [x] No HTTP fallback

### Cloudflare Worker (`worker.js`)

- [x] Worker proxies only Yahoo Finance RSS — no user data processed
- [x] Worker does not log or store any request data
- [x] CORS origin not restricted in current Worker — acceptable since no user data transits it. Phase 4: restrict to pondex domain.

---

## What Changes in Phase 4

Phase 4 introduces user accounts, server-side storage, and broker API connections. Security profile changes significantly:

| Area | Phase 4 requirement |
|------|-------------------|
| Authentication | Supabase Auth (email/Google) — JWT tokens in HttpOnly cookies, not localStorage |
| API key storage | Server-side Supabase vault — FMP/Groq keys no longer in browser localStorage |
| Authorization | Every data endpoint checks user ownership before returning data |
| CSRF | Anti-CSRF tokens on all state-changing requests |
| Rate limiting | Supabase Edge Functions rate-limited per user |
| Secrets management | All secrets in Supabase/Railway env vars — never in code |
| GDPR | Privacy policy published, data export and deletion flows built |
| Dependency scanning | Dependabot enabled on GitHub repo |

---

## Secrets — What Must Never Be Committed

```
pondexfmp_key (from localStorage)
pondexgroq_key (from localStorage)
Any .env file
Any service account JSON
```

The Finnhub WebSocket key currently **hardcoded** in `pondex.html` (`FINNHUB_KEY`) is a free-tier key used for the ticker tape. It is not a secret — free-tier Finnhub keys are rate-limited and have no sensitive scope. It should still be moved to localStorage in Phase 4. Tracked as TD-008.

---

## OWASP Top 10 — Current Status

| Risk | Status | Notes |
|------|--------|-------|
| A01 Broken Access Control | N/A — Phase 1–3 | No access control exists. Phase 4 must implement. |
| A02 Cryptographic Failures | N/A | No sensitive data encrypted at rest needed. Phase 4: passwords/tokens. |
| A03 Injection | Partial mitigation | HTML injection risk in API data → `innerHTML`. See TD-007. |
| A04 Insecure Design | Low risk | Client-side only. No server attack surface. |
| A05 Security Misconfiguration | Low | GitHub Pages default config is secure. Worker is minimal. |
| A06 Vulnerable Components | Low — no dependencies | Zero npm/pip dependencies in Phase 1–3. Nothing to CVE-scan. |
| A07 Auth Failures | N/A — Phase 1–3 | No auth. Phase 4 must follow OWASP auth guidelines. |
| A08 Software Integrity Failures | Low | Single-file, no supply chain. Phase 4: add Dependabot. |
| A09 Logging Failures | N/A | No server logs. Phase 4: structured logging required. |
| A10 SSRF | N/A | No server-side requests in Phase 1–3. |

---

## Security Contacts

```
Security issues: Create a private GitHub issue at https://github.com/dan123iel/stockrater
Responsible disclosure: See SECURITY.md in repo root
```

---

*Last updated: 2026-06-21*
*Phase 4 security review required before any user accounts are created.*
