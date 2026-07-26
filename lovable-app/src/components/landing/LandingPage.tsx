import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { DEMO_SCORES, DEMO_QUOTES } from "@/lib/demo-data";

// ── Score Card ────────────────────────────────────────────────────────────────
function ScoreCard() {
  const s = DEMO_SCORES.AAPL;
  const q = DEMO_QUOTES.AAPL;
  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "24px 22px", boxShadow: "0 12px 48px rgba(0,0,0,0.10)", width: "100%", maxWidth: 320 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 2 }}>AAPL · NASDAQ</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#0A0A0A" }}>Apple Inc.</p>
          <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>${q.price.toFixed(2)} <span style={{ color: "#16A34A" }}>+{q.changePercent.toFixed(2)}%</span></p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "#FEF9C3", color: "#92400E", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 9px", borderRadius: 999, textTransform: "uppercase", marginBottom: 4 }}>HOLD</div>
          <p style={{ fontSize: 32, fontWeight: 800, color: "#D97706", letterSpacing: "-2px", lineHeight: 1 }}>78<span style={{ fontSize: 14, color: "#9CA3AF", fontWeight: 400 }}>/100</span></p>
        </div>
      </div>
      {s.factors.map((f, i) => (
        <div key={f.name} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: "#374151" }}>{f.name}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626" }}>{f.score}</span>
          </div>
          <div style={{ height: 3, background: "#F3F4F6", borderRadius: 50 }}>
            <div style={{ height: "100%", width: `${f.score}%`, background: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626", borderRadius: 50, transition: `width 700ms cubic-bezier(0.16,1,0.3,1) ${i*80}ms` }} />
          </div>
        </div>
      ))}
      <p style={{ fontSize: 9, color: "#9CA3AF", textAlign: "center", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Yahoo Finance · SEC EDGAR · Not financial advice</p>
    </div>
  );
}

// ── CTA Button ────────────────────────────────────────────────────────────────
function CTAButton({ children, to = "/signup" }: { children: string; to?: string }) {
  return (
    <Link to={to} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0A0A0A", color: "#fff", padding: "15px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "-0.2px" }}>
      {children}
      <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
    </Link>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function LandingPage() {
  const [phrase, setPhrase] = useState(0);
  const phrases = ["where to invest.", "which stock to pick.", "if the price is right.", "which source to trust."];
  useEffect(() => {
    const t = setInterval(() => setPhrase(v => (v + 1) % phrases.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: "Inter, -apple-system, sans-serif", color: "#0A0A0A", background: "#fff" }}>
      <LandingNav />

      {/* 1 ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 32px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center" }}>
          <div style={{ maxWidth: 580 }}>
            <h1 style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, marginBottom: 20 }}>
              Still not sure{" "}
              <br />
              <span key={phrase} style={{ color: "#9CA3AF", display: "inline-block", animation: "fadein 0.35s ease-out" }}>
                {phrases[phrase]}
              </span>
              <style>{`@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
              <br />
              pondex_ gives you<br />one verdict.
            </h1>
            <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.65, marginBottom: 36, maxWidth: 440 }}>
              A 0–100 score for any stock. Every number cites its source. Clear. Fast. Free.
            </p>
            <CTAButton>Start for free</CTAButton>
            <p style={{ marginTop: 14, fontSize: 12, color: "#9CA3AF" }}>No credit card required · 1 verdict/day free</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScoreCard />
          </div>
        </div>
      </section>

      {/* 2 ── TRUST NUMBERS ──────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F5F5", padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 32 }}>
          {[
            ["45", "Investors interviewed"],
            ["71%", "Only trust sourced data"],
            ["60s", "To your first verdict"],
            ["€0", "To start"],
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: 13, color: "#6B7280", marginTop: 6 }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 ── ONE BIG PROMISE ────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 20 }}>Why pondex_</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 24 }}>
          The signal is missing.<br />Not more data.
        </h2>
        <p style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
          You already have Yahoo Finance. You already have ChatGPT. What you don't have is one clear answer — with every number linked to its source.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, border: "1.5px solid #E5E7EB", borderRadius: 16, overflow: "hidden" }}>
          {[
            { icon: "◎", title: "Source on every number", desc: "Yahoo Finance · SEC EDGAR · Groq AI" },
            { icon: "◈", title: "BUY / HOLD / SELL", desc: "One clear verdict. No noise." },
            { icon: "◉", title: "Your investor profile", desc: "Value, Growth, or Balanced — your score." },
            { icon: "◇", title: "Exit signals", desc: "Know when your thesis has changed." },
          ].map((b, i) => (
            <div key={b.title} style={{ padding: "32px 24px", background: "#fff", borderRight: i < 3 ? "1.5px solid #E5E7EB" : "none" }}>
              <p style={{ fontSize: 22, marginBottom: 12 }}>{b.icon}</p>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{b.title}</p>
              <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F5F5", padding: "80px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 20, textAlign: "center" }}>How it works</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 56 }}>
            Three steps. 60 seconds.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { n: "01", t: "Enter a ticker.", d: "Any stock. Takes 2 seconds." },
              { n: "02", t: "We analyse it.", d: "5 factors. Every number cited." },
              { n: "03", t: "You decide.", d: "BUY · HOLD · SELL — plain language." },
            ].map(s => (
              <div key={s.n}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#9CA3AF", marginBottom: 14 }}>{s.n}</p>
                <div style={{ width: 40, height: 3, background: "#0A0A0A", borderRadius: 2, marginBottom: 20 }} />
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.t}</p>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 20, textAlign: "center" }}>User research · n=45 · June 2026</p>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 48 }}>
            What investors say.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { q: "The score is much better than a raw price. Undervalued/overvalued with a number — that's what I need.", name: "Gunnar L.", role: "Value Investor · Berlin" },
              { q: "Gen-Z mindset — rate everything out of ten. That's how I think. I find it amazing.", name: "Patricia M.", role: "Passive Investor · Hamburg" },
              { q: "I really like the comparison part. That's how you can actually make a decision.", name: "José R.", role: "Finance Professional · Madrid" },
            ].map(t => (
              <div key={t.name} style={{ background: "#F5F5F5", borderRadius: 16, padding: "28px 24px" }}>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#374151", marginBottom: 24 }}>"{t.q}"</p>
                <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 ── PRICING ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F5F5", padding: "80px 32px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 20 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16 }}>Free until you need more.</h2>
          <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 48 }}>No credit card. No setup. Upgrade only if you want unlimited access.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "32px 24px", textAlign: "left" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 12 }}>Free</p>
              <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", marginBottom: 24 }}>€0</p>
              {["1 full verdict/day", "All 5 factor scores", "Source on every number", "Price chart + Financials"].map(f => (
                <p key={f} style={{ fontSize: 13, color: "#374151", marginBottom: 8, display: "flex", gap: 8 }}>
                  <span style={{ color: "#16A34A", fontWeight: 700 }}>✓</span>{f}
                </p>
              ))}
              <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#0A0A0A", color: "#fff", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Start for free</Link>
            </div>
            <div style={{ background: "#0A0A0A", borderRadius: 16, padding: "32px 24px", textAlign: "left" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Pro</p>
              <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", color: "#fff", marginBottom: 4 }}>€4.99</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>per month</p>
              {["Unlimited verdicts", "Peer comparison", "Exit Strategy signals", "My Profile Score"].map(f => (
                <p key={f} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 8, display: "flex", gap: 8 }}>
                  <span style={{ color: "#16A34A", fontWeight: 700 }}>✓</span>{f}
                </p>
              ))}
              <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#fff", color: "#0A0A0A", textAlign: "center", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Start 7-day trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
            Stop guessing.<br />Start verifying.
          </h2>
          <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 36 }}>Your first verdict takes 60 seconds. Free.</p>
          <CTAButton>Analyse a stock now</CTAButton>
          <p style={{ marginTop: 14, fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Research tool only · Not financial advice
          </p>
        </div>
      </section>

      {/* 8 ── FOOTER (Zasta-style) ───────────────────────────────────────────── */}
      <footer style={{ background: "#F5F5F5", padding: "64px 32px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Top: logo + columns */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            {/* Logo + copyright */}
            <div>
              <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>pondex_</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>
                Copyright © 2026 pondex_.<br />All rights reserved.
              </p>
            </div>
            {/* Company */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Company</p>
              {["About", "Privacy", "Terms", "Imprint"].map(l => (
                <p key={l} style={{ marginBottom: 10 }}>
                  <a href={l === "Privacy" ? "/privacy" : l === "Terms" ? "/terms" : "#"} style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>{l}</a>
                </p>
              ))}
            </div>
            {/* Product */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Product</p>
              {["Stock Analysis", "Exit Strategy", "My Profile Score", "Pricing"].map(l => (
                <p key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>{l}</a>
                </p>
              ))}
            </div>
            {/* Help */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Help</p>
              {["FAQ", "Data Sources", "Contact"].map(l => (
                <p key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>{l}</a>
                </p>
              ))}
              <p style={{ marginTop: 16, fontSize: 13, color: "#9CA3AF" }}>hello@pondex.app</p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#E5E7EB", marginBottom: 32 }} />

          {/* Bottom: social icons */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "X", path: "M 4 4 L 20 20 M 20 4 L 4 20" },
              { label: "in", path: "M 4 8 L 4 20 M 4 5 A 1 1 0 0 1 5 4 A 1 1 0 0 1 6 5 A 1 1 0 0 1 5 6 A 1 1 0 0 1 4 5 M 10 20 L 10 13 Q 10 8 16 8 Q 20 8 20 13 L 20 20" },
              { label: "ig", path: "M 7 2 L 17 2 Q 22 2 22 7 L 22 17 Q 22 22 17 22 L 7 22 Q 2 22 2 17 L 2 7 Q 2 2 7 2 M 12 8 A 4 4 0 1 0 12.001 8" },
            ].map(s => (
              <a key={s.label} href="#" style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
