# Survey Analysis Playbook – Master Guide

**Framework:** Marty Cagan, *Inspired* (Product Discovery)
**Scope:** AI-assisted analysis of raw survey data for new product development
**Companion Files:**
- → [`sub_detailed_execution_guide.md`](./sub_detailed_execution_guide.md) (Analysis execution)
- → [`post_analysis_discovery_process.md`](./post_analysis_discovery_process.md) (Post-analysis: interviews, prototypes, experiments, delivery)

---

## Purpose

This playbook governs how an AI assistant (or analyst) transforms raw survey responses into actionable, decision-ready insights for a Product Trio (Product Manager, Product Designer, Tech Lead). It enforces Cagan's core discipline: we do not build what users say they want — we solve problems that their behavior reveals.

---

## Non-Negotiable Principles

| # | Principle | Implication |
|---|-----------|-------------|
| 1 | **Behavior beats opinion** | Self-reported preferences and hypothetical WTP are weak evidence. Prioritize what respondents already do and pay for. |
| 2 | **Problem over solution** | Translate every "feature request" into the underlying pain or job. Never prioritize features directly from survey responses. |
| 3 | **Segment before summarize** | No overall averages without behaviorally meaningful cohorts. Report differences, not just means. |
| 4 | **Triangulate** | Cross-check survey signals with behavioral data, support tickets, and sales notes. Note contradictions explicitly. |
| 5 | **Decision-useful outputs** | Every finding must have a concrete "So-What?" for PM (Value), Design (Usability), and Tech (Feasibility/Cost). |
| 6 | **Transparency over polish** | Surface limitations, small-sample caveats, and assumption impacts. Never overclaim. |

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────┐
│  PHASE 1: INTAKE & PREP                                 │
│  • Receive raw data (CSV/Excel/Text)                    │
│  • Map schema to standard fields                        │
│  • Clean, normalize, deduplicate                        │
│  • Log all transformations                              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 2: SEGMENTATION                                  │
│  • Define behavior-based cohorts                        │
│  • Compute shares, medians, Ns                          │
│  • Isolate dominant cohort for MVP focus                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 3: ANALYSIS                                      │
│  • Behavior vs. Opinion Sieve                           │
│  • Qualitative Text Clustering (problem extraction)     │
│  • Contradiction detection                              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 4: SYNTHESIS                                     │
│  • "So-What?" for PM / Design / Tech                    │
│  • MVP Persona from dominant segment                    │
│  • Next experiments and validation steps                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  PHASE 5: DOCUMENTATION & QA                            │
│  • Structured Markdown report                           │
│  • QA rubric pass                                       │
│  • Handover checklist                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Roles and Responsibilities

| Role | Responsibility in This Process |
|------|-------------------------------|
| **Human (you)** | Provide raw data, confirm segment definitions, validate assumptions, decide on next experiments. |
| **AI Assistant** | Execute the playbook: clean data, segment, analyze, cluster, synthesize, and produce the report. Flag uncertainties and ask for clarification. |
| **Product Trio** | Consume the "So-What?" outputs and decide on discovery actions (interviews, prototypes, experiments). |

---

## Key Definitions

| Term | Definition |
|------|-----------|
| **Cohort** | A behaviorally defined group (e.g., by weekly time spent). NOT demographic. |
| **Hard evidence** | Observable, past behavior: tools used, money spent, frequency of action. |
| **Soft evidence** | Stated preferences, hypothetical WTP, feature wishes. Treat as directional only. |
| **Problem cluster** | A thematic grouping of underlying pains/jobs extracted from free-text responses. Not a feature category. |
| **Skin in the game** | Recurring financial commitment (subscription, monthly fee). One-off purchases do not qualify. |
| **Contradiction** | A respondent or cohort expressing high intent (e.g., "would pay a lot") while exhibiting low commitment behavior (e.g., uses only free tools). |

---

## Configurable Parameters

Before starting analysis, confirm or adjust these defaults:

| Parameter | Default | Notes |
|-----------|---------|-------|
| Passive cohort threshold | < 1 hour/week | Adjust based on domain |
| Heavy cohort threshold | ≥ 3 hours/week | Adjust based on domain |
| Currency | EUR | Normalize all spend |
| "Paid" definition | Recurring subscription only | Excludes one-time purchases |
| Small-cohort warning | n < 10 or < 15% of sample | Flag as directional only |
| Cluster count target | 3–4 main clusters | Plus "Other" bucket |
| Confidence threshold for reporting | ≥ 15% of target cohort | Below this, mention but do not promote |

---

## Deliverables

1. **Structured Markdown Report** (see template in sub-file)
2. **Methods & Limitations Section** (transparency)
3. **Handover Checklist** (completeness verification)

---

## What This Playbook Does NOT Do

- It does not produce a feature roadmap or backlog from survey data.
- It does not replace qualitative discovery (interviews, usability tests).
- It does not claim statistical significance from small samples.
- It does not treat the survey as the final word — it is one input among many.

---

## How to Use This Document

1. Read this master file for principles, workflow, and definitions.
2. Open [`sub_detailed_execution_guide.md`](./sub_detailed_execution_guide.md) for step-by-step instructions, templates, internal prompts, QA rubric, and checklists.
3. Feed your raw data to the AI assistant along with both files.
4. Review the output against the QA rubric before sharing with the Product Trio.
5. After analysis is complete, proceed to [`post_analysis_discovery_process.md`](./post_analysis_discovery_process.md) for the full discovery-to-delivery workflow (interviews, prototyping, experiments, Go/No-Go, MVP scoping).

---

## References

- Cagan, Marty. *Inspired: How to Create Tech Products Customers Love.* 2nd Edition.
- Cagan, Marty. *Empowered: Ordinary People, Extraordinary Products.*
- Torres, Teresa. *Continuous Discovery Habits.*

---

*End of Master Guide. Proceed to → [`sub_detailed_execution_guide.md`](./sub_detailed_execution_guide.md)*
