import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
NEWSAPI_KEY: str = os.getenv("NEWSAPI_KEY", "")
CACHE_TTL: int = 300  # 5 minutes — reduces Yahoo Finance rate-limit hits
