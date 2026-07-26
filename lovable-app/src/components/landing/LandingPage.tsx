import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { DEMO_SCORES, DEMO_QUOTES } from "@/lib/demo-data";

// ── Rotating headline ─────────────────────────────────────────────────────────
const ROTATING = [
  "where to invest.",
  "which stock to pick.",
  "if the price is right.",
  "what the numbers mean.",
  "which source to trust.",
];

function RotatingHeadline() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setI((v) => (v + 1) % ROTATING.length); setVisible(true); }, 300);
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ color: "#6B7280", transition: "opacity 0.3s", opacity: visible ? 1 : 0, display: "inline-block" }}>
      {ROTATING[i]}
    </span>
  );
}

// ── Score Card Mock ───────────────────────────────────────────────────────────
function ScoreCard() {
  const s = DEMO_SCORES.AAPL;
  const q = DEMO_QUOTES.AAPL;
  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 20px 60px rgba(0,0,0,0.10)", maxWidth: 340, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 4 }}>AAPL · NASDAQ</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#0A0A0A", marginBottom: 2 }}>Apple Inc.</p>
          <p style={{ fontSize: 13, color: "#6B7280" }}>${q.price.toFixed(2)} <span style={{ color: "#16A34A" }}>+{q.change.toFixed(2)} (+{q.changePercent.toFixed(2)}%)</span></p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "#FEF9C3", color: "#92400E", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase", marginBottom: 4 }}>HOLD</div>
          <p style={{ fontSize: 36, fontWeight: 800, color: "#D97706", letterSpacing: "-2px", lineHeight: 1 }}>78<span style={{ fontSize: 16, color: "#9CA3AF", fontWeight: 400 }}>/100</span></p>
        </div>
      </div>
      {s.factors.map((f, i) => (
        <div key={f.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#374151" }}>{f.name}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626" }}>{f.score}/100</span>
          </div>
          <div style={{ height: 3, background: "#F3F4F6", borderRadius: 50, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${f.score}%`, background: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626", borderRadius: 50, transitionDelay: `${i * 80}ms`, transition: "width 600ms cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
        </div>
      ))}
      <p style={{ fontSize: 10, color: "#9CA3AF", textAlign: "center", marginTop: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Source: Yahoo Finance · SEC EDGAR · Not financial advice</p>
    </div>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>{children}</p>;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div style={{ background: "#FFFFFF", fontFamily: "Inter, -apple-system, sans-serif", color: "#0A0A0A" }}>
      <LandingNav />

      {/* ── Announcement Bar ───────────────────────────────────────────── */}
      <div style={{ background: "#0A0A0A", color: "#FFFFFF", textAlign: "center", padding: "10px 16px", fontSize: 13, fontWeight: 500 }}>
        pondex_ is free. <Link to="/signup" style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>Start your first verdict now →</Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F3F4F6", borderRadius: 999, padding: "4px 14px", marginBottom: 28 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Free · Every number cites its source</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              Still not sure{" "}<br />
              <RotatingHeadline />
              <br />
              <span>pondex_ gives you one verdict.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              A 0–100 score for any stock. Every number cites its source. No noise — just a clear verdict in under 60 seconds.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/signup" style={{ background: "#0A0A0A", color: "#FFFFFF", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>
                Start for free →
              </Link>
              <a href="#demo" style={{ background: "transparent", color: "#0A0A0A", padding: "14px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1.5px solid #E5E7EB", display: "inline-block" }}>
                See how it works
              </a>
            </div>
            {/* Trust signals */}
            <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#0A0A0A" }}>45</span>
                <span style={{ fontSize: 12, color: "#6B7280" }}>investors interviewed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#0A0A0A" }}>71%</span>
                <span style={{ fontSize: 12, color: "#6B7280" }}>trust only sourced data</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#0A0A0A" }}>60s</span>
                <span style={{ fontSize: 12, color: "#6B7280" }}>to your first verdict</span>
              </div>
            </div>
          </div>
          {/* Right */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScoreCard />
          </div>
        </div>
      </section>

      {/* ── Benefits strip ────────────────────────────────────────────────── */}
      <section style={{ background: "#F9FAFB", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
          {[
            { num: "1", title: "Source-cited scores", desc: "Every number links to Yahoo Finance or SEC EDGAR. No black boxes." },
            { num: "2", title: "BUY / HOLD / SELL", desc: "One clear signal. No more hours of research for a vague answer." },
            { num: "3", title: "Your investor profile", desc: "The same stock scores differently for a value vs. growth investor." },
            { num: "4", title: "Exit signals", desc: "Know when your thesis has changed — before the damage is done." },
          ].map(b => (
            <div key={b.num} style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0A0A0A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{b.num}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{b.title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── "0€ until you get value" block ────────────────────────────────── */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Pricing</SectionLabel>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
          Free until you need more.
        </h2>
        <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
          Your first verdict is completely free. No credit card. No setup. You only upgrade if you want unlimited access.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
          <div style={{ border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "32px 28px", textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 8 }}>Free</p>
            <p style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-2px", marginBottom: 20 }}>€0<span style={{ fontSize: 16, fontWeight: 400, color: "#9CA3AF" }}>/month</span></p>
            {["1 full verdict per day", "All 5 factor scores", "Source on every number", "Price chart + Key Metrics"].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#16A34A", fontWeight: 700 }}>—</span>
                <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
              </div>
            ))}
            <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#0A0A0A", color: "#FFFFFF", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Start for free
            </Link>
          </div>
          <div style={{ background: "#0A0A0A", borderRadius: 16, padding: "32px 28px", textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8 }}>Pro</p>
            <p style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-2px", color: "#FFFFFF", marginBottom: 20 }}>€4.99<span style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>/month</span></p>
            {["Unlimited verdicts", "Peer comparison", "Exit Strategy signals", "My Profile Score", "Weekly digest email"].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#16A34A", fontWeight: 700 }}>—</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{f}</span>
              </div>
            ))}
            <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#FFFFFF", color: "#0A0A0A", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Start 7-day trial
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section id="demo" style={{ background: "#F9FAFB", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>How it works</SectionLabel>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 48 }}>
            Three steps to your verdict.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { n: "01", t: "Enter a ticker.", d: "Type any stock symbol. Takes 2 seconds." },
              { n: "02", t: "We analyse it.", d: "5 factors. Every number cites its source — Yahoo Finance, SEC EDGAR, Groq AI." },
              { n: "03", t: "You decide.", d: "BUY / HOLD / SELL — plain language, no jargon, no noise." },
            ].map(s => (
              <div key={s.n} style={{ textAlign: "left", borderTop: "3px solid #0A0A0A", paddingTop: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#9CA3AF", marginBottom: 12 }}>{s.n}</p>
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.t}</p>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 40, maxWidth: 600 }}>
            Trusted by investors who aren't afraid to question the data.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { q: "The score is much better than a raw price. Undervalued/overvalued with a number — that's what I need.", name: "Gunnar L.", role: "Value Investor · Berlin", init: "G" },
              { q: "Gen-Z mindset — rate everything out of ten. That's how I think. I find it amazing.", name: "Patricia M.", role: "Passive Investor · Hamburg", init: "P" },
              { q: "I really like the comparison part. That's how you can actually make a decision.", name: "José R.", role: "Finance Professional · Madrid", init: "J" },
            ].map(t => (
              <div key={t.name} style={{ border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "28px 24px" }}>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#374151", marginBottom: 20 }}>"{t.q}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0A0A0A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>{t.init}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#9CA3AF" }}>{t.role} · User interview · June 2026</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 48, borderTop: "1.5px solid #E5E7EB", paddingTop: 32 }}>
            {[["45", "Investors interviewed"],["71%", "Trust only sourced data"],["60s", "To your first verdict"],["€0", "To start — no card needed"]].map(([n, l]) => (
              <div key={l} style={{ padding: "0 24px", borderRight: "1px solid #E5E7EB" }}>
                <p style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── vs. Competition ──────────────────────────────────────────────────── */}
      <section style={{ background: "#F9FAFB", padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionLabel>Why pondex_</SectionLabel>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 32 }}>
            Not just another finance tool.
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["", "Yahoo Finance", "ChatGPT", "Bloomberg", "pondex_"].map((h, i) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: i === 0 ? "left" : "center", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: i === 4 ? "#0A0A0A" : "#9CA3AF", textTransform: "uppercase", borderBottom: `2px solid ${i === 4 ? "#0A0A0A" : "#E5E7EB"}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sources cited",   "✗", "✗", "✗", "✓"],
                  ["Clear verdict",   "✗", "✗", "✗", "✓"],
                  ["Your strategy",   "✗", "✗", "✗", "✓"],
                  ["Affordable",      "✓", "✓", "✗", "✓"],
                  ["Exit signals",    "✗", "✗", "✗", "✓"],
                ].map(([label, ...vals]) => (
                  <tr key={label} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 500 }}>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ padding: "14px 16px", textAlign: "center", fontSize: 16, fontWeight: i === 3 ? 700 : 400, color: v === "✓" ? "#16A34A" : "#D1D5DB" }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 32 }}>Got questions?</h2>
          {[
            ["Is pondex_ financial advice?", "No. pondex_ is a research tool. Every score is a data-driven signal, not a recommendation. All investment decisions are yours."],
            ["What data sources do you use?", "Yahoo Finance, SEC EDGAR, and Groq AI (Llama 3.3) for plain-language explanations. Every number on every page cites its source."],
            ["How is the score calculated?", "Five factors: Fundamentals, Moat, Risk, Valuation, Management — each scored 0–100 from real financial data, then weighted into a single verdict."],
            ["What does '1 verdict per day' mean?", "Free users can run one full analysis per day. The counter resets at midnight UTC. Pro users get unlimited verdicts."],
            ["Is my data safe?", "We store only your email address. No financial data, no trading history, no payment data. Hosted on EU servers (Frankfurt)."],
          ].map(([q, a]) => (
            <FaqItem key={q as string} q={q as string} a={a as string} />
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0A0A0A", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Get started</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1.05, marginBottom: 20 }}>
            Stop guessing.<br />Start verifying.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
            Your first verdict takes 60 seconds. No account. No credit card.
          </p>
          <Link to="/signup" style={{ background: "#FFFFFF", color: "#0A0A0A", padding: "16px 40px", borderRadius: 10, fontWeight: 800, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
            Analyse a stock now — it's free →
          </Link>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Research tool only · Not financial advice · Data: Yahoo Finance & SEC EDGAR
          </p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#F9FAFB", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.5px" }}>pondex_</p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Pricing", "#pricing"]].map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>© 2026 pondex_ · Research tool only — not financial advice</p>
        </div>
      </footer>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5E7EB", padding: "16px 0", cursor: "pointer" }} onClick={() => setOpen(v => !v)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 600 }}>{q}</p>
        <span style={{ fontSize: 20, color: "#9CA3AF", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 16 }}>+</span>
      </div>
      {open && <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginTop: 12 }}>{a}</p>}
    </div>
  );
}
