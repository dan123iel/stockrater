# Wave 2 Survey — pondex

**Status:** Ready to post
**Created:** 2026-07-13
**Based on:** Wave 1 (n=56) + Interviews Gunnar Leu + Patricia Parnet
**Language:** English only
**Channels:** r/eupersonalfinance → r/Bogleheads → r/investing
**Tool:** Tally (free, no account needed to fill out)
**Format:** Reddit post first → Survey link optional for those who want to give more

---

## Fixes vs. Wave 1

| Wave 1 Problem | Wave 2 Fix |
|---|---|
| Barriers multi-select → no primary pain identifiable | Single-select: "What is your BIGGEST frustration?" |
| WTP open-ended → no comparable numbers | Direct price question: Free / $4.99 / $9.99 |
| Too long for cold audience | Max 8 questions, ~2 minutes |
| Concept shown first → inflated demand | Behavior/pain first, concept second |
| No segmentation by experience | Investment experience question added |
| No email capture | Last question: email optional for beta access |

---

## Reddit Posts — one version per subreddit

> Post the text below. No survey link in the title. Honest tone, no marketing.
> Add the Tally link at the bottom once created.

---

### Post A — r/eupersonalfinance

**Title:**
```
How do you actually research stocks? Building a tool and want to understand what frustrates you
```

**Body:**
```
Hey r/eupersonalfinance,

I'm building a stock research tool and I'm at the stage where I want to understand how people actually do research — before I keep coding.

Not a pitch. I genuinely want to know:

**How does your process look from first idea to actual buy?**
- Which tools do you open?
- Where does it break down?
- What would you throw away immediately if there was a better way?

Any comment helps, no matter how short.

If you have 2 minutes and want to give more structured feedback: [Tally link]
(fully anonymous, 8 questions)
```

---

### Post B — r/Bogleheads

**Title:**
```
How do you research individual stocks or ETFs before buying? Looking for honest feedback
```

**Body:**
```
Hey everyone,

I'm building a tool to simplify stock research and I'm trying to understand real workflows before building further.

Specifically curious about the passive/long-term investor perspective:

**When you do look at a stock or ETF — what does that process look like?**
- Where do you start?
- Which sources do you actually trust?
- What's the most frustrating part?

Happy to hear any experience — even "I don't research, I just buy index funds" is useful.

For those who want to give more specific feedback: [Tally link]
(anonymous, 8 questions, 2 min)
```

---

### Post C — r/investing

**Title:**
```
What's your stock research process? Building a tool and trying to understand the real pain points
```

**Body:**
```
Hey r/investing,

Working on a stock research tool and trying to understand how people actually work — not what they say they do, but the real process.

**Quick questions:**
- What tools do you open when researching a stock?
- What's the single most frustrating part?
- What do you wish existed that doesn't?

Drop a comment — any length welcome.

If you want to give structured feedback (2 min, anonymous): [Tally link]
```

---

## Tally Survey — Question Structure

> 8 questions, one per page, ~90 seconds.
> Order: screening → experience → tools → pain → concept → trust → pricing → email
> Design principle: every question maps to exactly one hypothesis. No noise.

**Conditional logic:** If Q1 = "I don't currently invest" → skip Q2, Q3 → go to Q4, Q5, Q6 → skip Q7 → go to Q8.

---

### Q1 — Trading Frequency (Single Select, Required)
**Question:** How often do you buy or sell stocks or ETFs?

- Multiple times a week
- About once a month
- Every few months
- Less than once a year
- I don't currently invest *(→ skip Q2, Q3 and Q7 → answer Q4, Q5, Q6, Q8)*

---

### Q2 — Investment Experience (Single Select, Required)
**Question:** How long have you been investing?

- Less than 1 year
- 1–3 years
- 3–10 years
- More than 10 years

---

### Q3 — Tool Stack (Multi Select, Required, min 1)
**Question:** Which tools or sources do you use for stock research? Select all that apply.

- YouTube / Podcasts
- AI assistants (ChatGPT, Claude, Gemini, etc.)
- TradingView
- Broker app (Trade Republic, Scalable, IBKR, etc.)
- Seeking Alpha / financial portals
- Annual reports / investor relations pages
- Reddit / forums
- X (Twitter)
- Company earnings calls
- Friends / word of mouth
- Other: [free text]

---

### Q4 — Biggest Pain (Single Select, Required)
**Question:** What is your BIGGEST frustration with stock research?

**Helper text:** Pick the one that bothers you most.

- Too many sources or conflicting information — I don't know what to trust
- I can't tell if the data is current or reliable
- I don't understand the metrics (P/E ratio, DCF, etc.)
- It takes too long to reach a decision
- I'm generally satisfied with my current research process

---

### Q5 — Concept Reaction (Single Select, Required)
**Section:** SECTION 3 — THE PRODUCT

**Description block shown above the options (bold text):**

> *"Here's what we're building: You enter a stock ticker and get a plain-language verdict — undervalued, fairly valued, or overvalued — with every number linked to its original source (SEC filings, Yahoo Finance). Every metric is explained in plain language, so you understand exactly why the stock received its rating."*

**Question:** What best describes your reaction?

- A — Not for me
- B — Interesting, but I'd need to see it work first
- C — I'd try it for free
- D — I'd pay for this

---

### Q6 — Trust (Single Select, Required)
**Section:** SECTION 3 — THE PRODUCT

**Question:** How much would you trust a stock verdict that explains every metric in plain language and links every number to its original source?

- A — I wouldn't trust it
- B — I'd double-check everything myself
- C — I'd use it as a starting point
- D — I'd trust it over doing the research myself

---

### Q7 — Pricing (Single Select, Required)
**Description block shown above the options (bold first sentence):**

> ***Assuming the tool works exactly as described.** No commitment — just answer honestly.*

**Question:** If pondex cost $4.99/month for unlimited stock verdicts with source attribution — would you pay for it?

- Yes — I'd pay $4.99/month for this
- Maybe — depends on how well it works in practice
- No — I wouldn't pay for this

---

### Q8 — Email (Optional, with GDPR consent checkbox)
**Question:** Want early beta access when it's ready?

Email field (optional, not required)

**Helper text above the field:** *This survey is anonymous. If you leave your email, it will only be used for beta access.*

**Consent checkbox (conditional: show only if email is filled):**
☐ *I agree to be contacted by email about pondex beta access. No newsletters or marketing emails.*

> **Design note — Pain-first order (Q4 before Q5) is intentional.**
> Pain-first allows measuring whether concept interest correlates with self-reported pain — a stronger PMF signal than an isolated concept score. The framing effect risk is accepted as a known trade-off.
☐ *I agree to be contacted by email about pondex beta access. No newsletters or marketing emails.*

---

## Tally Build Prompt

> Copy this exactly into ChatGPT or Claude to generate the Tally form step by step.

```
Create a Tally form with the following exact structure.

Form title: pondex — Stock Research Survey
Form description: 2 minutes, fully anonymous. Helping us understand how investors actually research stocks.
Settings: one question per page, progress bar visible, no multiple submissions from same device.
Thank-you message:
"Submission received. Thank you — your insights are officially hardcoded into our roadmap.

What happens next:
1. We review this batch of responses over the next two weeks.
2. If you left your email, you'll hear from us when beta is ready.

Interested in following the build? Connect with Daniel on LinkedIn → [your LinkedIn URL]"

---

SECTION 1: YOUR INVESTING HABITS
Section description: Quick context so we can show you the right questions.

---

QUESTION 1
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 1 — YOUR INVESTING HABITS
Label: How often do you buy or sell stocks or ETFs?
Why this question: Your answer determines which questions you see next.
Options:
- Multiple times a week
- About once a month
- Every few months
- Less than once a year
- I don't currently invest
Conditional logic: If answer is "I don't currently invest" → skip Q2, Q3 → go to Q4, Q5, Q6 → skip Q7 → go to Q8.

---

QUESTION 2
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 1 — YOUR INVESTING HABITS
Label: How long have you been investing?
Why this question: Helps us understand how much experience shapes your research process.
Options:
- Less than 1 year
- 1–3 years
- 3–10 years
- More than 10 years

---

QUESTION 3
Type: Checkboxes (multi select)
Required: Yes
Minimum selections: 1
Section: SECTION 1 — YOUR INVESTING HABITS
Label: Which tools or sources do you use for stock research? Select all that apply.
Why this question: We want to know exactly what you already use — and what we'd need to replace or complement.
Options:
- YouTube / Podcasts
- AI assistants (ChatGPT, Claude, Gemini, etc.)
- TradingView
- Broker app (Trade Republic, Scalable, IBKR, etc.)
- Seeking Alpha / financial portals
- Annual reports / investor relations pages
- Reddit / forums
- X (Twitter)
- Company earnings calls
- Friends / word of mouth
- Other (with open text field)

---

SECTION 2: YOUR BIGGEST PAIN
Section description: This is the most important question in the survey.

---

QUESTION 4
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 2 — YOUR BIGGEST PAIN
Label: What is your BIGGEST frustration with stock research?
Why this question: This single answer directly shapes what we build first.
Helper text: Pick the one that bothers you most.
Options:
- Too many sources or conflicting information — I don't know what to trust
- I can't tell if the data is current or reliable
- I don't understand the metrics (P/E ratio, DCF, etc.)
- It takes too long to reach a decision
- I'm generally satisfied with my current research process

---

SECTION 3: THE PRODUCT
Section description: Here's what we're building — tell us what you think.

---

QUESTION 5
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 3 — THE PRODUCT
Description block shown above the options:
"Stock research is broken.

You spend time across multiple sources, get conflicting opinions, and still aren't sure.

pondex gives you one clear verdict per stock. Sourced. Explained. Done."
(bold "pondex" only)
Label: What best describes your reaction?
Why this question: Tells us whether the core concept resonates before we go further.
Options:
- A — Not for me
- B — Interesting, but I'd need to see it work first
- C — I'd try it for free
- D — I'd pay for this

---

QUESTION 6
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 3 — THE PRODUCT
Label: How much would you trust a stock verdict that explains every metric in plain language and links every number to its original source?
Why this question: Trust is the #1 adoption barrier for AI-assisted tools. This tells us how much we need to prove ourselves.
Options:
- A — I wouldn't trust it
- B — I'd double-check everything myself
- C — I'd use it as a starting point
- D — I'd trust it over doing the research myself

---

SECTION 4: PRICING
Section description: One honest question about money.

---

QUESTION 7
Type: Multiple choice (single select)
Required: Yes
Section: SECTION 4 — PRICING
Description block shown above the options (bold the first sentence):
"Assuming the tool works exactly as described. No commitment — just answer honestly."
Label: If pondex cost $4.99/month for unlimited stock verdicts with source attribution — would you pay for it?
Why this question: This is the most important number for us. Your honest answer — even if it's No — helps us build the right product.
Options:
- Yes — I'd pay $4.99/month for this
- Maybe — depends on how well it works in practice
- No — I wouldn't pay for this

---

SECTION 5: STAY IN THE LOOP
Section description: Optional — only if you want early access.

---

QUESTION 8
Type: Email input
Required: No
Section: SECTION 5 — STAY IN THE LOOP
Label: Want early beta access when it's ready?
Why this question: We'll only reach out when beta is live. No newsletters, no marketing.
Helper text above field: This survey is anonymous. If you leave your email, it will only be used for beta access.
Add conditional logic: show the following checkbox only if the email field is not empty.
Checkbox label: I agree to be contacted by email about pondex beta access. No newsletters or marketing emails.
```

QUESTION 1
Type: Multiple choice (single select)
Required: Yes
Label: How often do you buy or sell stocks or ETFs?
Options:
- Multiple times a week
- About once a month
- Every few months
- Less than once a year
- I don't currently invest
Conditional logic: If answer is "I don't currently invest" → skip Q2, Q3 → go to Q4, Q5, Q6 → skip Q7 → go to Q8.

---

QUESTION 2
Type: Multiple choice (single select)
Required: Yes
Label: How long have you been investing?
Options:
- Less than 1 year
- 1–3 years
- 3–10 years
- More than 10 years

---

QUESTION 3
Type: Checkboxes (multi select)
Required: Yes
Minimum selections: 1
Label: Which tools or sources do you use for stock research? Select all that apply.
Options:
- YouTube / Podcasts
- AI assistants (ChatGPT, Claude, Gemini, etc.)
- TradingView
- Broker app (Trade Republic, Scalable, IBKR, etc.)
- Seeking Alpha / financial portals
- Annual reports / investor relations pages
- Reddit / forums
- X (Twitter)
- Company earnings calls
- Friends / word of mouth
- Other (with open text field)

---

QUESTION 4
Type: Multiple choice (single select)
Required: Yes
Label: What is your BIGGEST frustration with stock research?
Helper text: Pick the one that bothers you most.
Options:
- Too many sources or conflicting information — I don't know what to trust
- I can't tell if the data is current or reliable
- I don't understand the metrics (P/E ratio, DCF, etc.)
- It takes too long to reach a decision
- I'm generally satisfied with my current research process

---

QUESTION 5
Type: Linear scale (/linear block)
Required: Yes
Scale: 1 to 5
Label all five points:
- 1 = Not interesting at all
- 2 = Probably not for me
- 3 = Maybe, depends on execution
- 4 = Interesting
- 5 = I'd use this immediately
Description block shown above the scale (bold text, not a callout box):
"Here's what we're building: You enter a stock ticker and get a plain-language verdict — undervalued, fairly valued, or overvalued — with every number linked to its original source (SEC filings, Yahoo Finance). Every metric is explained in plain language, so you understand exactly why the stock received its rating."
Question label: How interesting is this to you?

---

QUESTION 6
Type: Linear scale (/linear block)
Required: Yes
Scale: 1 to 5
Label all five points:
- 1 = I wouldn't trust it at all
- 2 = I'd be skeptical
- 3 = Depends on how accurate it proves to be
- 4 = I'd trust it as a starting point
- 5 = I'd trust it as much as doing the research myself
Question label: How much would you trust a stock verdict that explains every metric in plain language and links every number back to its original source?

---

QUESTION 7
Type: Multiple choice (single select)
Required: Yes
Description block shown above the options (bold the first sentence):
"Assuming the tool works exactly as described. No commitment — just answer honestly."
Label: If pondex cost $4.99/month for unlimited stock verdicts with source attribution — would you pay for it?
Options:
- Yes — I'd pay $4.99/month for this
- Maybe — depends on how well it works in practice
- No — I wouldn't pay for this

---

QUESTION 8
Type: Email input
Required: No
Label: Want early beta access when it's ready?
Helper text above field: This survey is anonymous. If you leave your email, it will only be used for beta access.
Add conditional logic: show the following checkbox only if the email field is not empty.
Checkbox label: I agree to be contacted by email about pondex beta access. No newsletters or marketing emails.
```

---

## Reddit Post Results — r/Bogleheads · 2026-07-14

**Post title:** How do you know when you've done enough research before buying
**Posted:** 2026-07-14
**Views:** 4.9K
**Upvotes:** 0 (neutral)
**Comments:** 12

### Key Finding — WRONG SUBREDDIT

r/Bogleheads is a passive index fund community. The overwhelming majority of comments confirmed this is not the right audience for pondex //:

| Comment | Signal |
|---|---|
| "Are you in the right subreddit? I don't do any research. I buy index funds." (29 upvotes) | Wrong audience |
| "I automatically buy VT with a % of every check" | Wrong audience |
| "No research. Buy and hold." | Wrong audience |
| "Doing this is simply not part of the boglehead investing philosophy." (5 upvotes) | Wrong audience |
| "You don't need to do any research to buy a low-cost diversified index fund." (10 upvotes) | Wrong audience |
| "So this is definitely to plug a research tool in a few minutes, right?" (3 upvotes) | Suspicion |

### Learnings

1. **r/Bogleheads is the wrong channel** — remove from posting plan entirely. Community is 100% passive index investors. pondex // solves a problem they deliberately don't have.
2. **"Plug suspicion" is real** — one user immediately called it out as a tool promotion. Post without survey link next time.
3. **4.9K views with 0 net upvotes** — post was seen but not valued. No meaningful engagement.

### Decision
- r/Bogleheads: **removed from posting plan**
- Replace with: **r/stocks** or **r/personalfinance** — more active/semi-active investors

---

## Posting Plan (updated)

| Channel | Post | When | Notes |
|---|---|---|---|
| r/eupersonalfinance | Post A | Ready | Primary channel |
| ~~r/Bogleheads~~ | ~~Post B~~ | ~~Removed~~ | Wrong audience — passive index investors only |
| r/stocks | Post B (new) | After r/eupersonalfinance | Active stock pickers, better fit |
| r/investing | Post C | 2–3 days after A+B | Broader reach |

> Don't post all three on the same day — space them out to learn from responses before the next post.

---

## Results Template (fill in after posting)

**Tally link:** —

| Channel | Post date | Comments | Survey responses | Emails collected |
|---|---|---|---|---|
| r/eupersonalfinance | — | — | — | — |
| r/Bogleheads | — | — | — | — |
| r/investing | — | — | — | — |

### Key Metrics
| Question | Result |
|---|---|
| Biggest pain (#1 answer) | — |
| Concept score avg. | — |
| % would pay nothing | — |
| % $4.99 | — |
| % $9.99 | — |
| Total emails collected | — |
| Most common experience level | — |

### vs. Wave 1
- Confirms Wave 1 signal: —
- Contradicts Wave 1: —
- New finding: —

### Decision
- [ ] Paywall price set: $___
- [ ] Wave 2 confirms MVP focus: Yes / No / Unclear
- [ ] Wave 3 needed: Yes / No

---

## Open items

- [ ] After Interview #3 (José Bernardo): adjust questions if new hypotheses emerge
- [ ] Create Tally survey using the build prompt above
- [ ] Paste Tally link into all three Reddit posts
- [ ] Post r/eupersonalfinance first
- [ ] Post r/Bogleheads same day
- [ ] Post r/investing 2–3 days later
- [ ] Enter results in `docs/discovery/opportunity-scorecard.md`
