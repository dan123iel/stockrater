# ADR-008: Split deployment — GitHub Pages (frontend) + Railway (backend)

**Date:** July 2026
**Status:** Accepted
**Supersedes:** The implicit assumption that docker-compose serves production

## Decision

Frontend deploys to **GitHub Pages** (static hosting, free).
Backend deploys to **Railway** (~$5/mo, always-on Python).
`docker-compose.yml` is **development-only** — not a production artifact.

## Context

GitHub Pages hosts only static files. The React frontend builds to `frontend/dist/` — pure HTML/JS/CSS — which GitHub Pages can serve. The FastAPI backend requires a running Python process and cannot be hosted on GitHub Pages.

Two separate deployments are intentional and correct:

| Layer | Host | Why |
|---|---|---|
| Frontend (`frontend/`) | GitHub Pages | Free, zero-config, auto-deploy via `.github/workflows/deploy.yml` |
| Backend (`backend/`) | Railway | Cheapest always-on Python host, Railway auto-deploys from `backend/` on push |

## Consequences

- `VITE_API_URL` in `frontend/.env` points to the Railway backend URL in production
- Set `VITE_API_URL` as a GitHub Actions secret for the Pages deploy workflow
- `docker-compose.yml` remains for local development only — add a comment to make this clear
- The frontend shows demo data if the backend is unreachable (existing fallback in `lib/fmp.js`)
- No Dockerfile changes needed — Railway detects Python via `requirements.txt` automatically

## What "deploy the app" means

```
Frontend: git push main → GitHub Action builds → live at dan123iel.github.io/stockrater/
Backend:  git push main → Railway detects backend/ → pip install → uvicorn starts
```
