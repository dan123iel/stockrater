"""
pondex_ backend
Run: uvicorn app.main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.analysis import router as analysis_router
from app.api.score import router as score_router

app = FastAPI(title="pondex_ API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)
app.include_router(score_router)


@app.get("/")
def health():
    return {"status": "ok", "version": "2.0.0", "sources": ["yahoo_finance", "sec_edgar", "groq_llama"]}
