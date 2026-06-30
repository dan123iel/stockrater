# ADR-007: Explanation-first UX (score as conclusion, not entry point)

**Date:** 30 June 2026
**Status:** Accepted
**Survey basis:** Wave 1 Q3B cross-tab, n=45

## Decision

In the ScoreHero component and throughout the analytics flow, plain-language factor explanations are shown before the numerical score. The overall fit score is the last element rendered — it is a conclusion drawn from visible reasoning, not an opening verdict.

## Context

Survey Wave 1 cross-tab of barriers × unlock features revealed three distinct non-investor types:

- "Too complicated" (10/16): want plain language first, health score second — need to understand what the score means before trusting it
- "Fearful" (6/16): need lower stakes, not more information
- "Distrustful" (3/16): selected zero for health score — a verdict from a platform they don't trust yet is worthless

Showing the score on screen 1 actively repels 3/16 of the target aspirer segment. The same finding applies to passive investors with identical frustration profiles.

Additionally, 58% of all respondents require AI outputs to show their primary source. A number shown without attribution has zero credibility to this audience.

## Consequences

- ScoreHero renders: [explanation per factor] → [score as conclusion]
- Every metric shows its named source inline (not in tooltip, not hidden)
- Sources are expandable per factor — not cluttering the default view
- This UX pattern is preserved across all future feature additions
- The score number remains prominent — it is not hidden, just positioned last
