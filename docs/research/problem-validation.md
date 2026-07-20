# Problem Validation

> ⚠ This document currently contains assumptions, not validated research. Each claim is marked as [ASSUMPTION] or [VALIDATED]. Goal: validate all P1–P4 assumptions through user interviews before V1 launch.

---

## P1 — Data Without Context

**Claim:** Free financial tools show data but don't interpret it relative to the user's situation.

**Status:** [ASSUMPTION]

**Evidence so far:**
- Yahoo Finance, Morningstar, and Seeking Alpha (free) show raw metrics without contextual interpretation
- Seeking Alpha Premium adds analyst opinions but at $239/year — out of budget for target persona
- No free tool observed that connects a metric value to a verdict ("this P/E is high for this growth rate")

**To validate:**
- [ ] Interview 5+ target users: "When you analyze a stock, what question do you most often leave unanswered?"
- [ ] Screen recording sessions: where do users get stuck?

---

## P2 — Strategy Blindness

**Claim:** No free tool personalizes the analysis to the investor's strategy profile.

**Status:** [ASSUMPTION — partially observable]

**Evidence so far:**
- Reviewed: Yahoo Finance, Morningstar Free, Seeking Alpha Free, Finviz, Koyfin Free, Macrotrends
- None ask for strategy profile before displaying scores or data
- Morningstar's star rating is a single absolute quality score

**To validate:**
- [ ] Confirm no free competitor offers strategy-relative scoring (ongoing competitive monitoring)

---

## P3 — Research Fragmentation

**Claim:** Retail investors use 3–5 tools per stock analysis and still feel uncertain.

**Status:** [ASSUMPTION]

**Evidence so far:**
- Anecdotal from r/investing, r/Finanzen threads about "stock research workflow"
- Common pattern observed: Yahoo Finance + Seeking Alpha + one YouTube video + Reddit thread

**To validate:**
- [ ] Survey question: "How many sources do you typically consult before making a buy decision?"
- [ ] Interview question: "Walk me through your last stock analysis. What did you open?"

---

## P4 — The Discovery Gap

**Claim:** Self-directed investors miss relevant opportunities because they only analyze stocks they already know.

**Status:** [ASSUMPTION]

**To validate:**
- [ ] Interview question: "Have you ever bought a stock you discovered through a tool rather than external media?"
- [ ] Proxy metric post-launch: what % of Discovery Engine suggestions are stocks the user had never analyzed before?

---

## Next Steps

1. Recruit 5–8 target users (self-directed investors, 25–45, own portfolio with individual stocks)
2. Run 30-minute interviews covering: research workflow, tools used, frustrations, last 3 purchase decisions
3. Update this document with quotes and validated/invalidated assumptions
4. Feed validated insights into personas.md
