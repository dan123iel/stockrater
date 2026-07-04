"""
pondex_ backend
Run: uvicorn app.main:app --reload --port 8000
"""
import os
import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sentry_sdk.integrations.fastapi import FastApiIntegration

from app.api.analysis import router as analysis_router
from app.api.score import router as score_router

_SENTRY_DSN = os.getenv("SENTRY_DSN")
if _SENTRY_DSN:
    sentry_sdk.init(
        dsn=_SENTRY_DSN,
        integrations=[FastApiIntegration()],
        traces_sample_rate=0.2,
        send_default_pii=False,
    )

app = FastAPI(title="pondex_ API", version="2.0.0")

_ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:5174,https://dan123iel.github.io",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(analysis_router)
app.include_router(score_router)


@app.get("/")
def health():
    return {"status": "ok", "version": "2.0.0", "sources": ["yahoo_finance", "sec_edgar", "groq_llama"]}
