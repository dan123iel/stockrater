# ADR-006: Groq Llama 3.3 70B as AI engine (no OpenAI/Claude)

**Date:** June 2026
**Status:** Accepted

## Decision

Use Groq API with Llama 3.3 70B Versatile for all AI features (AI Insights, Investment Memo). No OpenAI, no Anthropic/Claude.

## Context

The product needs AI summarisation and Q&A. OpenAI GPT-4o and Anthropic Claude are both viable technically but cost ~$0.01–0.03 per request at volume. Groq's free tier is sufficient for MVP-scale usage and Llama 3.3 70B performs comparably for financial summarisation tasks.

## Consequences

- Groq API key required (free tier: sufficient for MVP)
- Llama 3.3 70B is an open-source model — no vendor lock-in
- Responses are fast (Groq hardware, <1s typical)
- Max tokens capped at 400 for AI Insights, 600 for Investment Memo
- System prompt enforces citation discipline: "only state facts traceable to a named source"
