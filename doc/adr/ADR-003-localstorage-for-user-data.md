# ADR-003 — localStorage for all user data (Phase 1–3)

| Field | Value |
|-------|-------|
| **Date** | 2026-05 (estimated) |
| **Status** | Accepted for Phase 1–3. Will be superseded by ADR-004 (Supabase) in Phase 4. |
| **Decided by** | Daniel |

---

## Context

pondex needs to persist user state: strategy profile, portfolio holdings, trade journal, API keys, watchlist. The application is client-side only in Phase 1–3. There is no server.

---

## Decision

All user data is stored in the browser's `localStorage` under `pondex_*` prefixed keys. No server, no database, no user accounts in Phase 1–3.

---

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| localStorage | Zero infrastructure, synchronous reads, ~5–10MB limit, GDPR-friendly (no server) | Data is browser-local, lost if browser cleared, not cross-device |
| IndexedDB | Larger storage, async, better for large datasets | More complex API, overkill for current data volumes (~10KB max) |
| Supabase | Cross-device, persistent, real-time | Requires user accounts, backend, auth — Phase 4 scope |
| URL state | Shareable | Not suitable for persistent data |

---

## Reasoning

localStorage is the correct choice for Phase 1–3 because the data volumes are small (strategy profile: ~200 bytes, portfolio: ~1KB, trades: ~2KB), the app is intentionally single-user, and avoiding a backend eliminates an entire category of security, compliance, and infrastructure concerns. GDPR does not apply when no personal data leaves the user's device.

The accepted trade-off is that users lose data if they clear browser storage or switch devices. This is mitigated by a planned JSON export feature (Profile → Storage tab).

---

## Consequences

**Positive:**
- No backend infrastructure needed
- No user accounts, no auth, no GDPR server-side obligations
- Fast synchronous reads
- No vendor dependency for data storage

**Negative / Trade-offs:**
- Data is browser-local — not cross-device, not backed up automatically
- Data lost on browser clear
- Phase 4 migration will require an export/import flow for existing users

**When this will be superseded:**
Phase 4 introduces Supabase PostgreSQL for user data. This ADR will be superseded by ADR-004 (Supabase as database). The migration plan must include: localStorage export → server import on first login.

---

*Superseded by: ADR-004 (to be written in Phase 4 planning)*
