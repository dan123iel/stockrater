import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

// "Stärkste Reaktion aller 3 Interviews" — José: "That's how you make a decision"
const COMPARE_DATA = {
  a: { ticker: "AAPL", name: "Apple Inc.", score: 78, verdict: "HOLD", pe: "32.4x", fcf: "3.1%", margin: "26.1%", growth: "+4.2%", risk: "Low" },
  b: { ticker: "MSFT", name: "Microsoft", score: 84, verdict: "BUY",  pe: "38.1x", fcf: "2.6%", margin: "36.2%", growth: "+15.1%", risk: "Low" },
  avg: { pe: "26.4x", fcf: "2.8%", margin: "21.0%", growth: "+12.0%", risk: "Med" },
};

const ROWS = [
  { label: "pondex Score",   aVal: `${COMPARE_DATA.a.score}/100`, bVal: `${COMPARE_DATA.b.score}/100`, avgVal: "65/100", aWins: false, bWins: true },
  { label: "P/E Ratio",      aVal: COMPARE_DATA.a.pe,    bVal: COMPARE_DATA.b.pe,    avgVal: COMPARE_DATA.avg.pe,    aWins: true,  bWins: false },
  { label: "FCF Yield",      aVal: COMPARE_DATA.a.fcf,   bVal: COMPARE_DATA.b.fcf,   avgVal: COMPARE_DATA.avg.fcf,   aWins: true,  bWins: false },
  { label: "Net Margin",     aVal: COMPARE_DATA.a.margin,bVal: COMPARE_DATA.b.margin, avgVal: COMPARE_DATA.avg.margin, aWins: false, bWins: true },
  { label: "Revenue Growth", aVal: COMPARE_DATA.a.growth, bVal: COMPARE_DATA.b.growth, avgVal: COMPARE_DATA.avg.growth, aWins: false, bWins: true },
];

export function CompareTeaser() {
  return (
    <Reveal>
      <section style={{ background: "#fafafa", padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 12 }}>Side-by-side comparison</p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", lineHeight: 1.1 }}>
              That's how you make<br />a decision.
            </h2>
            <p style={{ fontSize: 16, color: "#666", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
              Compare any two stocks side by side — score, valuation, profitability — with sector averages as context.
            </p>
          </div>

          {/* Comparison card */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #f0f0f0", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            {/* Stock headers */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ padding: "20px 24px", background: "#f8f9fa" }}>
                <p style={{ fontSize: 11, color: "#aaa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Metric</p>
              </div>
              {[
                { ticker: "AAPL", name: "Apple Inc.", color: "#6366f1", verdict: "HOLD", score: 78 },
                { ticker: "MSFT", name: "Microsoft",  color: "#22c55e", verdict: "BUY",  score: 84 },
                { ticker: "Sector", name: "Tech Avg", color: "#aaa",    verdict: "",      score: 65 },
              ].map((s, i) => (
                <div key={i} style={{ padding: "20px 16px", background: i === 2 ? "#f8f9fa" : "#fff", textAlign: "center", borderLeft: "1px solid #f0f0f0" }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.ticker}</p>
                  <p style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{s.name}</p>
                  {s.verdict && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: s.verdict === "BUY" ? "#dcfce7" : "#fef9c3", color: s.verdict === "BUY" ? "#15803d" : "#a16207" }}>{s.verdict}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", borderBottom: i < ROWS.length - 1 ? "1px solid #f8f8f8" : "none", alignItems: "center" }}>
                <div style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#555" }}>{row.label}</div>
                <div style={{ padding: "14px 16px", textAlign: "center", borderLeft: "1px solid #f8f8f8" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: row.aWins ? "#6366f1" : "#1a1a1a", background: row.aWins ? "#eff0fe" : "transparent", padding: "3px 10px", borderRadius: 8 }}>
                    {row.aVal}{row.aWins && " ✓"}
                  </span>
                </div>
                <div style={{ padding: "14px 16px", textAlign: "center", borderLeft: "1px solid #f8f8f8" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: row.bWins ? "#22c55e" : "#1a1a1a", background: row.bWins ? "#dcfce7" : "transparent", padding: "3px 10px", borderRadius: 8 }}>
                    {row.bVal}{row.bWins && " ✓"}
                  </span>
                </div>
                <div style={{ padding: "14px 16px", textAlign: "center", borderLeft: "1px solid #f8f8f8" }}>
                  <span style={{ fontSize: 13, color: "#aaa" }}>{row.avgVal}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/app/compare" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1a1a1a", color: "#fff", padding: "12px 28px", borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Compare any two stocks →
            </Link>
            <p style={{ fontSize: 11, color: "#aaa", marginTop: 10 }}>⚠ Research tool only. Not financial advice. Data: Yahoo Finance.</p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
