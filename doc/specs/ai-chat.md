# Feature Spec — AI Chat

## Problem This Solves

Users can see data. They cannot always interpret it relative to their own situation. A P/E of 35x might be cheap for one investor and expensive for another. The AI Chat bridges the gap between raw analysis and actionable understanding — in the context of the user's specific profile, portfolio, and current stock.

---

## User Story

As an investor analyzing ASML, I want to ask "does this make sense for my portfolio?" and get an answer that considers my current holdings, my growth profile, and what the data actually says — not a generic response.

---

## What the Chat Knows (Context Injected per Request)

| Context | Source | Required |
|---|---|---|
| Strategy profile | localStorage | Yes |
| Current stock data | Yahoo Finance (live, via Worker) | Yes |
| Current stock score + breakdown | Calculated client-side | Yes |
| Portfolio positions | localStorage | If available |
| Thesis for current stock | localStorage | If available |
| Last 10 chat exchanges | Session state | Yes |

**Hard rule:** The AI must only use context-provided financial figures. It must never use training knowledge for specific metrics, prices, or estimates. See ADR-005.

---

## Acceptance Criteria

- [ ] Chat opens inline on the Analytics page (no navigation away)
- [ ] First response always acknowledges the user's profile: "As a Growth investor with a long horizon..."
- [ ] AI can answer: "Should I buy this?" — response references score, profile fit, and portfolio context
- [ ] AI can answer: "Compare NVDA and AMD for my profile" — fetches both data sets
- [ ] AI can answer: "What does gross margin mean?" — explains concepts in plain language
- [ ] AI flags when it lacks data: "Insider data is not available for this stock"
- [ ] AI never contradicts the pondex score without explaining why
- [ ] Chat history persists for the session (not across sessions by default)

---

## Out of Scope (this version)

- Persistent chat history across sessions
- Proactive chat suggestions ("You should look at...")
- Portfolio scenario questions ("What if I add $5k to NVDA?") — requires Digital Twin feature
- Voice input

---

## Open Questions

- [ ] What's the right chat entry point? Floating button, inline panel, or dedicated tab?
- [ ] Should chat history be optionally exportable to the trade journal?
- [ ] How do we handle questions about stocks not currently being analyzed?

---

## Technical Notes

- API call: POST to `/ai/groq` Worker endpoint
- System prompt injected server-side in Worker (never exposed to browser)
- Context payload: `{ profile, stockData, score, portfolio (optional), chatHistory }`
- Model: Llama 3.3 70B via Groq (see ADR-004)
- Response streamed where possible for perceived speed
- Rate limit: Groq free tier — implement client-side debounce (min 2s between requests)
