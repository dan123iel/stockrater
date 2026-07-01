# KI-Council — Methodology & Usage Guide

> A decision-making tool for situations with genuine uncertainty and a high cost of being wrong. Not a chatbot feature, not a creative tool — a structured multi-perspective process with anonymous peer review.

---

## 1. Purpose

A single AI response has a blind-spot problem: it can be brilliant or mediocre — you can't tell because you only see one perspective. The Council solves this by routing the same question through five independent, deliberately opposing thinking styles, having them anonymously evaluate each other, and forcing a chair verdict with a clear recommendation at the end.

---

## 2. When to use the Council

**Rule of thumb:** Genuine uncertainty + high cost of a wrong decision.

| Good Council questions | Bad Council questions |
|---|---|
| "Launch a €97 workshop or a €497 course?" | "What is the capital of France?" *(factual — one right answer)* |
| "Which of these 3 positionings is strongest?" | "Write me a tweet" *(creation task)* |
| "Pivot from X to Y — am I crazy?" | "Summarise this article" *(processing task)* |
| "Here's my landing page copy — where is it weak?" | |
| "Hire a VA or build automation first?" | |

> If the answer is already fixed and you're seeking confirmation, the Council will likely say things you don't want to hear — that's the point.

---

## 3. The Five Advisors

Not job titles, not personas — **thinking styles**, deliberately chosen to create tension with each other.

```
                        THE OUTSIDER
                  (keeps everyone honest —
                  no context, pure reaction)
                            │
            ┌───────────────┴───────────────┐
            │                                │
    THE CRITIC                     THE OPPORTUNITY FINDER
  "What will fail here?"   ◄────►   "What's possible if
  hunts for the fatal flaw   Risk      it goes better than
                              vs.      expected?"
                            Opportunity
            │                                │
            │                                │
   THE FIRST PRINCIPLES          ◄────►    THE EXECUTOR
       THINKER                  Thinking  "What do you actually
  "Are we solving the right       vs.     do Monday morning?"
   problem?" rebuilds from      Action
   the ground up
```

| # | Advisor | Asks | Core stance |
|---|---|---|---|
| 1 | **The Critic** | What is wrong, what is missing, what will fail? | Assumes a fatal flaw exists and hunts for it. Not a pessimist — the friend who warns you before a bad deal. |
| 2 | **The First Principles Thinker** | What are we actually trying to solve? | Strips away assumptions, rebuilds the problem from scratch. Strongest sentence: "You're asking the wrong question." |
| 3 | **The Opportunity Finder** | What upside is everyone missing? | Not interested in risk (that's the Critic's job) — focused on the scenario where things go better than expected. |
| 4 | **The Outsider** | What do I see with zero prior knowledge? | No context about the person, field, or history. Catches the "curse of knowledge" — what is obvious to experts but confusing to everyone else. |
| 5 | **The Executor** | Can this be done — and how, as fast as possible? | Ignores theory and strategy. Tests every idea against: "What do you do Monday morning, concretely?" |

**Why exactly these five:** Three natural tension axes — Critic ↔ Opportunity Finder (risk vs. upside), First Principles Thinker ↔ Executor (rethink everything vs. just do it), with the Outsider as the neutral corrective in the middle.

---

## 4. Session Workflow

```
STEP 1 — FRAME THE QUESTION
  • Scan workspace for relevant files
  • Rephrase the raw question neutrally:
    Core decision · Context · What is at stake
  • NO personal opinion injected

STEP 2 — CONVENE THE COUNCIL
  • Launch all 5 advisors SIMULTANEOUSLY
  • Each receives: thinking lens + framed question
  • Instruction: lean in fully, don't hedge, don't balance
  • Each response: 150–300 words

STEP 3 — PEER REVIEW
  • Responses anonymised: A / B / C / D / E (randomly shuffled)
  • 5 new review agents evaluate ALL responses:
      (a) Which is strongest?
      (b) Which has the biggest blind spot?
      (c) What have ALL of them missed?

STEP 4 — CHAIR SYNTHESIS
  Receives: question + all 5 responses (de-anonymised) + reviews
  Delivers fixed structure:
    • Where does the Council agree?
    • Where does it disagree?
    • Which blind spots were uncovered?
    • Clear recommendation (no "it depends")
    • THE ONE THING to do first

STEP 5 — HTML REPORT
  Scannable: verdict prominent, advisor responses collapsible

STEP 6 — PROTOCOL
  Full version saved for future reference
```

---

## 5. Example Session

**Question:** "I'm considering building a €297 course on Claude for beginners. Target: non-technical solopreneurs. Right move?"

| Advisor | Response (condensed) |
|---|---|
| **Critic** | Market flooded with AI courses. At €297, competing against free YouTube content. Non-technical audience → high support load, refund risk. |
| **First Principles Thinker** | What's the actual goal — revenue or authority? A course is one of the slowest paths to revenue. |
| **Opportunity Finder** | Beginner AI for solopreneurs is underserved — everyone teaches advanced content. Whoever owns the entry point owns the whole category. €297 might even be too low. |
| **Outsider** | "€297 Claude course for beginners" doesn't tell me if this is for me. The landing page must sell the outcome, not the tool. |
| **Executor** | Full course = 4–8 weeks of production. Start with a €97 live workshop for 50 people: validates demand, generates testimonials and raw material. If 50 people won't buy the workshop, 500 won't buy the course. |

**Chair Verdict:** Real demand exists, current framing is too tool-specific. Key insight (Outsider): everyone except him assumed the audience already knew the tool. **Recommendation:** Don't build the course yet — validate with a lower-barrier offer, sell the outcome not the tool. **First step:** €97 live workshop for 50 people, tool name not in the title.

---

## 6. Operating Rules

| Rule | Why |
|---|---|
| Launch all 5 advisors **simultaneously** | Sequential responses waste time and let early answers contaminate later ones — destroys independence. |
| Peer review always **anonymised** | Otherwise reviewers orient to the thinking-style label rather than the argument itself. |
| Chair **may disagree with the majority** | If 4 of 5 agree but the one dissenter has the strongest argument, the Chair sides with the dissenter — with reasoning. |
| **Do not use** for trivial questions | For questions with one clearly correct answer: just answer. The Council is reserved for genuine uncertainty where multiple perspectives create real value. |

---

## 7. For pondex_ — When to convene the Council

**Good pondex Council questions:**
- "$9, $19 or $49 — which price point?"
- "Prioritise Macro Hub in Phase 2 or Multilingual first?"
- "Should we approach a broker API partner?"
- "Gunnar Leu's feedback shows X — pivot or stay the course?"

**Bad pondex Council questions:**
- "Which colour for the button?" *(too trivial)*
- "Build me the login feature" *(creation task)*

---

*Council reports (HTML + protocol) are saved in `doc/research/council-sessions/`.*
