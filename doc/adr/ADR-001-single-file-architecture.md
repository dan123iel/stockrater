# ADR-001 — Single-file HTML architecture

| Field | Value |
|-------|-------|
| **Date** | 2026-05 (estimated) |
| **Status** | Accepted |
| **Decided by** | Daniel |

---

## Context

pondex needed a deployment strategy for Phase 1–3. The primary goals were: maximum portability, minimum infrastructure overhead, and the ability to iterate rapidly without a build pipeline. The target user is a solo developer running a side project with 5–10 hours/week available.

---

## Decision

All HTML, CSS, and JavaScript lives in a single `pondex.html` file. No build step, no bundler, no npm, no framework. The file is served from GitHub Pages.

---

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Single-file HTML | Zero dependencies, zero build, deployable anywhere, editable in any editor | File grows large (~4,800+ lines), no module system, no code splitting |
| Vite + vanilla JS | Module system, fast HMR, tree-shaking | Adds build step, node_modules, CI/CD requirement |
| Next.js / React | Component model, ecosystem, TypeScript | Heavy for a single-developer side project in Phase 1–3; over-engineering |

---

## Reasoning

For Phase 1–3, the single-file approach eliminates all infrastructure friction: no npm install, no build commands, no CI/CD setup, no environment management. The file is deployable by dragging it to any static host. It works as a `file://` URL for local development.

The downside (file size, no modules) is accepted as a Phase 1–3 constraint and is tracked in TECH-DEBT.md TD-001.

---

## Consequences

**Positive:**
- Zero infrastructure overhead for Phase 1–3
- No dependency CVEs to manage
- Fast iteration — edit and reload
- Deployable anywhere (GitHub Pages, Vercel, Netlify, file://)

**Negative / Trade-offs:**
- File will grow to 5,000+ lines — finding things requires search
- No TypeScript — no static type checking
- Cannot code-split or lazy-load sections

**When this should be revisited:**
When Phase 4 begins (multi-user, Supabase auth, broker APIs), a build step should be introduced and the codebase split into modules. See ROADMAP.md Phase 4.

---

*Superseded by: not yet*
