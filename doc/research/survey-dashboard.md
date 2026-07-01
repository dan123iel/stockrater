# Survey Dashboard — pondex_ Wave 1

> How the survey was built, where it runs, how to read it, and how to extend it for Wave 2.

---

## Links

| What | URL |
|---|---|
| Survey (Tally) | https://tally.so/r/QKXBEG |
| Live Dashboard | https://dan123iel.github.io/survey/ |
| Dashboard Repo | https://github.com/dan123iel/survey |
| Raw data (Google Sheets) | https://docs.google.com/spreadsheets/d/1Y6UaYRc0lWz7TTdhzLFDuVsk-T7wowrWExAhiUsquew/edit |

---

## How the dashboard works

The dashboard is a single `index.html` file in the repo `dan123iel/survey`, deployed via GitHub Pages.

**Data flow:**
```
Google Sheets (Tally responses)
    → "Publish to web" as CSV
    → Dashboard fetches CSV on load
    → Client-side JS parses + renders everything
    → Live on every refresh
```

**No backend required.** Everything happens in the browser. Google Sheets is the only data source.

**Where the CSV URL is defined:**
```javascript
// dashboard/index.html, line 321
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv";
```

To switch the data source (e.g. for Wave 2): just replace this URL.

---

## Dashboard structure (5 parts)

| Part | Content |
|---|---|
| Executive Summary | Verdict hero + 3 signal tiles (Problem strength, WTP, Sample quality) |
| Part 1 — The Opportunity | Market segments, pain chart, investors' tool stack |
| Part 2 — The User | Demographics, ICP profiles (churners + paying), AI trust split |
| Part 3 — What to Build | Non-investor barriers, product requirements (derived from data) |
| Part 4 — The Risks | 6 risks with severity badges |
| Part 5 — The Evidence | Cross-tabs, verbatims (Q9), follow-up contacts, Wave 2 spec, methodology |

---

## Survey questions (Tally, 16 pages)

**Branching:**
- Q1 → Investor? → Section A (investor questions)
- Q1 → "No, want to start" → Section B (aspirer questions)
- Q1 → "No, not interested" → Exit

**Investors (Section A):**
- Q2A: Weekly research time
- Q3A: Which tools (multi-select)
- Q4A: Biggest frustration (single)
- Q5A: Paid for tools? + How much?

**Aspirers (Section B):**
- Q2B: Main barrier (multi-select)
- Q3B: What would enable the first step (multi-select)

**Everyone:**
- Q6: AI trust level
- Q7: Profession
- Q8: Region
- Q9: "Magic Wand" — open question
- Q10: Follow-up contact OK?

---

## Wave 2 — Planned improvements

Known weaknesses of Wave 1 that Wave 2 should address:

| Problem Wave 1 | Solution Wave 2 |
|---|---|
| Multi-select for barriers → no primary pain identifiable | Forced single choice |
| Feature questions before concept presentation → inflated demand | Show concept, then ask |
| No WTP price point | Direct price question ($9/$19/$49) |
| Warm-network sample | Deployment on r/eupersonalfinance + r/finanzen |
| Inconsistent scales | 5-point Likert throughout |

**Start Wave 2 once:** Gunnar Leu interview completed, Phase 1 MVP deployed.

---

## Updating the dashboard (for Wave 2)

1. Create new Tally survey (Wave 2 spec → end of `survey-wave1.md`)
2. Connect Tally → Google Sheets
3. Publish new sheet as CSV (File → Share → Publish to web → CSV)
4. Replace `CSV_URL` in `dashboard/index.html`
5. Commit + push → GitHub Pages deploys automatically

Alternatively: separate dashboard for Wave 2 to preserve Wave 1 as a historical snapshot.

---

## Methodological limitations

- n=45, warm network (WhatsApp blast)
- 25/45 responses in 2h window → not a representative cross-section
- Wave 2 (n=10) shows 44% AI skepticism vs. 21% in Wave 1 → cold audiences are more conservative
- All numbers are **directional signals**, not statistically significant findings
- Not suitable for external presentation without cold-audience replication
