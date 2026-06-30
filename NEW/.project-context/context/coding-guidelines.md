# pondex_ — Coding Guidelines & Definition of Done

## 1. Core Principles

- **Readability over cleverness.** Self-documenting code. No magic one-liners.
- **No comments that explain what the code does.** Only comment the WHY — hidden constraints, workarounds, non-obvious invariants.
- **No error handling for impossible cases.** Only validate at system boundaries (user input, API responses).
- **No premature abstraction.** Three similar lines is better than a helper that doesn't pay for itself.

---

## 2. React / Frontend

- Functional components only. No class components.
- Props must be destructured in the function signature.
- No inline `style` for colors — use CSS variables (`var(--color-ink)` etc.)
- API calls go through `lib/fmp.js` — never call the backend directly from a component.
- Loading and error states must always be handled — no silent failures.
- **Source attribution is mandatory:** Any metric rendered from `/score` must display its `source` string. Any AI response must render its `sources[]`. This is a product requirement (ADR-007), not a nice-to-have.

---

## 3. Python / Backend

- Type hints on all function signatures.
- Use `safe()` helper for all float values from yfinance (handles NaN/Inf).
- All external calls (yfinance, SEC EDGAR, Groq) wrapped in try/except.
- Cache all yfinance responses with `cached()` / `set_cache()` (5-min TTL).
- Never return raw yfinance errors to the frontend — return structured HTTP errors.

---

## 4. Git

- Commit message format: `type: short description` (feat / fix / chore / docs / refactor)
- Never commit: `venv/`, `node_modules/`, `.env`, `dist/`, `__pycache__/`
- One logical change per commit. Don't batch unrelated changes.

---

## 5. Definition of Done

A task is only complete when ALL of these are true:

- [ ] `npm run build` passes with zero errors (frontend)
- [ ] Backend starts with `uvicorn main:app --reload` without errors
- [ ] All intended files exist (verify with `ls` or equivalent)
- [ ] Old/deleted files are actually gone
- [ ] No FMP references remain in active code
- [ ] Source attribution renders for any new metric or AI output
- [ ] `.project-context/MASTER.md` and `architecture.md` updated if structure changed
- [ ] Changes committed and pushed to GitHub

**Do not report a task as complete without running this checklist.**
