import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

// Patricia: "Das Tool muss mich kennen." — Score wird zur Strategie gewichtet
const PROFILES = [
  {
    label: "Value Investor",
    emoji: "🔍",
    focus: "Undervalued stocks trading below intrinsic value",
    color: "#6366f1",
    bg: "#eff0fe",
    scores: { AAPL: 71, MSFT: 82, TSLA: 28, GOOGL: 79 },
    weight: "Valuation ×2",
  },
  {
    label: "Growth Investor",
    emoji: "🚀",
    focus: "High-growth companies with strong revenue momentum",
    color: "#22c55e",
    bg: "#dcfce7",
    scores: { AAPL: 80, MSFT: 89, TSLA: 52, GOOGL: 78 },
    weight: "Fundamentals ×2",
  },
  {
    label: "Dividend Investor",
    emoji: "💰",
    focus: "Stable income through consistent dividend payments",
    color: "#f59e0b",
    bg: "#fef9c3",
    scores: { AAPL: 82, MSFT: 85, TSLA: 18, GOOGL: 55 },
    weight: "Income Yield ×2",
  },
  {
    label: "Balanced",
    emoji: "⚖️",
    focus: "Risk-adjusted returns across all five factors equally",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    scores: { AAPL: 78, MSFT: 84, TSLA: 42, GOOGL: 76 },
    weight: "Equal weights",
  },
];

const EXAMPLE_TICKER = "MSFT";

export function InvestorProfile() {
  return (
    <Reveal>
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 12 }}>Personalised scoring</p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", lineHeight: 1.1 }}>
              The tool knows you.<br />Your score, your strategy.
            </h2>
            <p style={{ fontSize: 16, color: "#666", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>
              The same stock scores differently depending on your investment strategy. pondex_ weights the five factors to match what matters to <em>you</em>.
            </p>
          </div>

          {/* Profile cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
            {PROFILES.map((p) => (
              <div key={p.label} style={{ background: p.bg, borderRadius: 16, padding: "22px 24px", border: `1px solid ${p.color}22` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{p.emoji}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{p.label}</p>
                    <p style={{ fontSize: 10, color: p.color, fontWeight: 600 }}>{p.weight}</p>
                  </div>
                  {/* Score for MSFT */}
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <p style={{ fontSize: 26, fontWeight: 800, color: p.color, lineHeight: 1 }}>{p.scores[EXAMPLE_TICKER]}</p>
                    <p style={{ fontSize: 10, color: "#888" }}>MSFT score</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{p.focus}</p>
                {/* Score bar */}
                <div style={{ marginTop: 12, height: 4, background: "rgba(0,0,0,0.08)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${p.scores[EXAMPLE_TICKER]}%`, height: "100%", background: p.color, borderRadius: 4, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Same stock, different scores callout */}
          <div style={{ background: "#f8f9fa", borderRadius: 16, padding: "20px 24px", marginBottom: 32, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Same stock. Four different scores.</p>
              <p style={{ fontSize: 12, color: "#666" }}>MSFT scores 82 for a Value investor, 89 for Growth — because what matters is different.</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
              {PROFILES.map(p => (
                <div key={p.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: p.color }}>{p.scores[EXAMPLE_TICKER]}</div>
                  <div style={{ fontSize: 9, color: "#aaa", fontWeight: 600 }}>{p.label.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/app" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#6366f1", color: "#fff", padding: "12px 28px", borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Set up your investor profile →
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
