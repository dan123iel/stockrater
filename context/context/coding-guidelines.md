# pondex_ — Coding Guidelines & Definition of Done

## Code rules

**General**
- No comments that explain what the code does — only the WHY (hidden constraint, workaround, non-obvious invariant)
- No error handling for impossible cases — validate at system boundaries only
- No premature abstraction — three similar lines beats a helper that doesn't pay for itself
- No new features outside `doc/ROADMAP.md` Phase 1 without updating the roadmap first

**React / Frontend**
- Functional components only
- API calls go through `lib/fmp.js` — never call the backend directly from a component
- Colors and fonts via CSS variables (`var(--color-ink)`) — never inline hex values
- Loading and error states must always be handled
- Source attribution is mandatory: any metric from `/score` must render its `source` string

**Python / Backend**
- Type hints on all function signatures
- Use `safe()` helper for all float values from yfinance (handles NaN/Inf)
- All external calls (yfinance, SEC EDGAR, Groq) wrapped in try/except
- Cache all yfinance responses with `cached()` / `set_cache()` (5-min TTL)

**Git**
- Commit format: `type: short description` (feat / fix / chore / docs / refactor)
- Never commit: `venv/`, `node_modules/`, `.env`, `dist/`, `__pycache__/`

---

## Definition of Done

A task is only complete when ALL of these pass:

- [ ] `npm run build` in `code/` — zero errors
- [ ] Backend starts: `uvicorn main:app --reload` — no errors
- [ ] All intended files exist (verify with ls)
- [ ] Old/deleted files are actually gone
- [ ] No FMP references in active code: `grep -r "getFmpKey\|financialmodelingprep" code/src/`
- [ ] Source attribution renders for any new metric or AI output
- [ ] `architecture.md` updated if any page, endpoint, or component was added
- [ ] Changes committed and pushed to GitHub
