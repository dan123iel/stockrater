import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

// Animiert: HOLD · 78/100 · GOOD FIT — Conversion-Trigger (José Interview)
export function VerdictBanner() {
  const verdicts = [
    { ticker: "MSFT", score: 84, verdict: "BUY",  fit: "STRONG FIT",  color: "#22c55e" },
    { ticker: "AAPL", score: 78, verdict: "HOLD", fit: "GOOD FIT",    color: "#f59e0b" },
    { ticker: "TSLA", score: 42, verdict: "SELL", fit: "WEAK FIT",    color: "#ef4444" },
    { ticker: "GOOGL",score: 76, verdict: "BUY",  fit: "GOOD FIT",    color: "#22c55e" },
    { ticker: "NVDA", score: 71, verdict: "HOLD", fit: "MODERATE FIT",color: "#f59e0b" },
    { ticker: "AMZN", score: 65, verdict: "HOLD", fit: "GOOD FIT",    color: "#f59e0b" },
  ];

  return (
    <Reveal>
      <section style={{ background: "#0f0f0f", padding: "60px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", padding: "0 24px 40px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", marginBottom: 12 }}>One clear verdict — always sourced</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
            No more guessing.<br />One number. One verdict.
          </h2>
          <p style={{ fontSize: 16, color: "#888", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
            pondex_ distils thousands of data points into a single 0–100 score with a plain-English verdict you can act on.
          </p>
        </div>

        {/* Scrolling verdict ticker */}
        <div style={{ display: "flex", gap: 16, animation: "marquee 18s linear infinite", width: "max-content" }}>
          {[...verdicts, ...verdicts].map((v, i) => (
            <div key={i} style={{
              background: "#1a1a1a", borderRadius: 16, padding: "20px 28px",
              border: `1px solid ${v.color}22`, minWidth: 200, flexShrink: 0,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{v.ticker}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${v.color}22`, color: v.color }}>{v.verdict}</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: v.color, lineHeight: 1 }}>{v.score}</div>
              <div style={{ fontSize: 10, color: "#666", marginTop: 4, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{v.fit}</div>
              <div style={{ marginTop: 12, height: 4, background: "#333", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${v.score}%`, height: "100%", background: v.color, borderRadius: 4 }} />
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: "#555" }}>📊 Yahoo Finance · SEC EDGAR</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link to="/app" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#6366f1", color: "#fff", padding: "12px 28px", borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Get your first verdict free →
          </Link>
          <p style={{ fontSize: 11, color: "#555", marginTop: 10 }}>⚠ Research tool only. Not financial advice.</p>
        </div>
      </section>
    </Reveal>
  );
}
