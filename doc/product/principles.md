# Principles

These are the constraints that define what pondex is. Every feature decision is measured against them.

---

## 1. Decisions over Data

pondex exists to improve investment decisions, not to display more information. Every feature must answer: does this make decisions better, learning better, or behavior better? If none of those, it doesn't ship.

## 2. Honest over Impressive

If a score is based on 3 data points, say so. If data is unavailable for a non-US stock, show a data coverage indicator. If the AI doesn't know, it says "data not available" — not a confident-sounding estimate. Trust is built through honesty, not polish.

## 3. Local by Default

User data — portfolio, journal, strategy profile, theses — stays in the browser's localStorage. It never touches a server unless the user explicitly opts into a cloud sync feature. This is not a privacy policy. It's an architectural constraint.

## 4. Calm over Addictive

No push notifications that create anxiety. No real-time price flashes designed to trigger action. No streaks, no leaderboards, no "trending stocks." The product should feel like a quiet workspace, not a trading floor.

## 5. Explainable over Black Box

Every score, every recommendation, every AI output must be traceable. The user should be able to ask "why?" and get a real answer — which data points, which thresholds, which profile weights. No unexplained verdicts.

## 6. Focus over Completeness

A product with 10 features done exceptionally well beats 50 features done adequately. Features that don't directly support the core decision cycle (thesis → purchase → monitoring → learning) are backlog items, not priorities.

---

## What We Will Never Build

| Feature | Why not |
|---|---|
| Social feed / comments | Adds noise, contradicts calm philosophy |
| Copy trading | Removes decision ownership from the user |
| Gamification / streaks | Optimizes for engagement, not decisions |
| "Top trending stocks" | Promotes FOMO, not analysis |
| Push price alerts | Noise — thesis-level alerts only |
| Leaderboards | Social comparison ≠ better decisions |
| Automated trading | Out of scope, different risk profile |
