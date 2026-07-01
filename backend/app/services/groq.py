import httpx
from fastapi import HTTPException
from app.core.config import GROQ_API_KEY

GROQ_MODEL = "llama-3.3-70b-versatile"
GROQ_URL   = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = (
    "You are pondex, a calm investment research assistant. "
    "You only state facts that are grounded in the data provided. "
    "Every factual claim must be attributable to a named source (Yahoo Finance, SEC EDGAR). "
    "Never speculate without flagging it. Keep answers concise — under 4 sentences."
)


async def chat(messages: list, max_tokens: int = 400) -> str:
    if not GROQ_API_KEY:
        raise HTTPException(400, "GROQ_API_KEY not set in backend .env")

    async with httpx.AsyncClient() as client:
        r = await client.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model":       GROQ_MODEL,
                "messages":    [{"role": "system", "content": SYSTEM_PROMPT}] + messages,
                "max_tokens":  max_tokens,
                "temperature": 0.3,
            },
            timeout=20,
        )

    if not r.is_success:
        raise HTTPException(r.status_code, r.text)

    return r.json()["choices"][0]["message"]["content"]
