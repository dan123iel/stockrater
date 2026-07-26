import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { DEMO_SCORES } from "@/lib/demo-data";
import { FileSearch, TrendingUp, User, Bell, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
// Use amount: 0 so trigger fires immediately when ANY part enters viewport
const vp = { once: true, amount: 0 };

// ── Score Card ────────────────────────────────────────────────────────────────
function ScoreCard() {
  const factors = DEMO_SCORES.AAPL.factors;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ background: "#fff", borderRadius: 24, padding: "28px 26px", border: "1.5px solid #E5E7EB", boxShadow: "0 4px 32px rgba(124,58,237,0.10)", width: 300, flexShrink: 0 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 6 }}>pondex_ verdict</p>
          <span style={{ background: "#FEF9C3", color: "#92400E", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" as const }}>HOLD</span>
        </div>
        <div style={{ textAlign: "right" as const }}>
          <p style={{ fontSize: 48, fontWeight: 800, color: "#D97706", letterSpacing: "-3px", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const }}>78</p>
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>/100</p>
        </div>
      </div>
      {factors.map((f, i) => (
        <div key={f.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{f.name}</span>
            <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums" as const, color: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626" }}>{f.score}</span>
          </div>
          <div style={{ height: 4, background: "#F3F4F6", borderRadius: 50 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${f.score}%` }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ height: "100%", background: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626", borderRadius: 50 }}
            />
          </div>
        </div>
      ))}
      <p style={{ fontSize: 9, color: "#D1D5DB", textAlign: "center" as const, marginTop: 14, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Yahoo Finance · SEC EDGAR · Not financial advice</p>
    </motion.div>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(v => !v)} style={{ borderBottom: "1px solid #E5E7EB", padding: "18px 0", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 600 }}>{q}</p>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0, marginLeft: 16, display: "flex" }}>
          <ChevronDown size={18} color="#9CA3AF" />
        </motion.span>
      </div>
      {open && <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginTop: 12 }}>{a}</p>}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div style={{ fontFamily: "Inter, -apple-system, sans-serif", color: "#0A0A0A", background: "#fff", overflowX: "hidden" }}>
      <LandingNav />

      {/* 1 — HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 48px", textAlign: "center", background: "linear-gradient(180deg,#fff 0%,#F0FEFA 100%)" }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {["Value Investor", "Passive Investor", "Finance Professional"].map(p => (
            <span key={p} style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280" }}>{p}</span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: 820, marginBottom: 20 }}
        >
          Too much data.<br />
          <span style={{ color: "#00C2A8" }}>No clear answer.</span><br />
          pondex_ changes that.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.65, maxWidth: 520, marginBottom: 36 }}>
          A 0–100 score for any stock. Five factors.<br />Every number linked to its source. Free to start.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 12 }}>
          <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00C2A8", color: "#fff", padding: "15px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.25)" }}>
            Analyse a stock — it's free <ArrowRight size={16} />
          </Link>
          <a href="#how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0A0A0A", padding: "15px 28px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1.5px solid #E5E7EB" }}>
            See how it works
          </a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 48 }}>
          No account required · No credit card · Free forever
        </motion.p>
        <ScoreCard />
      </section>

      {/* 2 — SOURCE TRUST BAR */}
      <section style={{ background: "#F0FEFA", padding: "40px 40px", borderTop: "1px solid #B2F0E8", borderBottom: "1px solid #B2F0E8" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#00C2A8", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 12 }}>Data from sources you can verify</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Yahoo Finance", "SEC EDGAR", "Groq AI (Llama 3.3)"].map(s => (
              <span key={s} style={{ fontSize: 14, fontWeight: 600, color: "#007A6E" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — THE PROBLEM */}
      <section id="problem" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 20 }}>The actual problem</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px,4.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 24 }}>
            You already have Yahoo Finance.<br />ChatGPT. Your broker.<br />
            <span style={{ color: "#00C2A8" }}>You still don't have an answer.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: "#6B7280", marginBottom: 72, maxWidth: 500, margin: "0 auto 56px" }}>
            Because none of them cite their sources. None of them know your strategy.
          </motion.p>
          <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: "📊", title: "Too many tabs", desc: "5 tools open, 5 different opinions. Still no clear answer." },
              { icon: "🤖", title: "AI that hallucinates", desc: "ChatGPT gives you numbers it invented. No sources." },
              { icon: "❓", title: "Data without context", desc: "P/E of 28x. Is that good? For which strategy?" },
            ].map(b => (
              <motion.div key={b.title} variants={fadeUp} whileHover={{ y: -4 }}
                style={{ background: "#FAFAFA", border: "1.5px solid #F3F4F6", borderRadius: 16, padding: "40px 40px", textAlign: "left" as const }}>
                <p style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</p>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{b.title}</p>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 4 — THE SOLUTION */}
      <section style={{ background: "#F0FEFA", padding: "104px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#00C2A8", marginBottom: 20 }}>The solution</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(24px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16 }}>One answer. Every number sourced.</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: "#6B7280", marginBottom: 64, maxWidth: 520, margin: "0 auto 52px" }}>
              pondex_ scores any stock across 5 factors — and shows you exactly where each number comes from.
            </motion.p>
            <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 0, border: "1.5px solid #B2F0E8", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
              {[
                { Icon: FileSearch, title: "Source on every number", desc: "Yahoo Finance · SEC EDGAR · Groq AI" },
                { Icon: TrendingUp, title: "BUY / HOLD / SELL", desc: "One clear verdict. No noise." },
                { Icon: User, title: "Your investor profile", desc: "Value, Growth, or Balanced — your score." },
                { Icon: Bell, title: "Exit signals", desc: "Know when your thesis has changed." },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp}
                  style={{ padding: "40px 28px", borderRight: i < 3 ? "1.5px solid #B2F0E8" : "none", textAlign: "left" as const }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F0FEFA", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={18} color="#00C2A8" />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</p>
                  <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5 }}>{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5 — HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "104px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 20, textAlign: "center" as const }}>How it works</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", textAlign: "center" as const, marginBottom: 56 }}>Three steps. That's it.</motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 64 }}>
              {[
                { n: "01", t: "Enter any stock ticker.", d: "AAPL, NVDA, MSFT — or any stock you want to research." },
                { n: "02", t: "Get scored across 5 factors.", d: "Fundamentals, Moat, Risk, Valuation, Management. Every number cited." },
                { n: "03", t: "BUY · HOLD · SELL.", d: "For your strategy. Value, Growth, or Balanced — you choose." },
              ].map(s => (
                <motion.div key={s.n} variants={fadeUp}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#00C2A8", marginBottom: 14 }}>{s.n}</p>
                  <div style={{ width: 40, height: 3, background: "#00C2A8", borderRadius: 2, marginBottom: 20 }} />
                  <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{s.t}</p>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{s.d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6 — PEER COMPARISON TEASER */}
      <section style={{ background: "#F0FDF4", padding: "80px 40px", borderTop: "1px solid #DCFCE7", borderBottom: "1px solid #DCFCE7" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 15, fontStyle: "italic", color: "#374151", marginBottom: 8, maxWidth: 520, margin: "0 auto 8px" }}>
              "I really like the comparison part. That's how you can actually make a decision."
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 36 }}>— José R., Finance Professional · User interview, June 2026</motion.p>
            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, maxWidth: 520, margin: "0 auto 28px" }}>
              {[
                { ticker: "AAPL", score: 78, verdict: "HOLD", color: "#D97706" },
                { ticker: "MSFT", score: 84, verdict: "BUY", color: "#16A34A" },
                { ticker: "Tech avg", score: 71, verdict: "—", color: "#9CA3AF" },
              ].map(s => (
                <div key={s.ticker} style={{ background: "#fff", border: "1.5px solid #D1FAE5", borderRadius: 12, padding: "18px 14px", textAlign: "center" as const }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{s.ticker}</p>
                  <p style={{ fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: "-2px", fontVariantNumeric: "tabular-nums" as const }}>{s.score}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.verdict}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#00C2A8", color: "#fff", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                Unlock peer comparison <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7 — TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "104px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 20, textAlign: "center" as const }}>From 45 one-on-one investor interviews · June 2026</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center" as const, marginBottom: 48 }}>What investors actually say.</motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
              {[
                { q: "I need to see where the number comes from. I don't trust anyone who can't show their sources.", name: "José R.", role: "Finance Professional · Madrid" },
                { q: "I never know when to sell. No tool has solved that — until now.", name: "Gunnar L.", role: "Value Investor · Berlin" },
                { q: "It tells me which stock fits ME. My risk, my budget. That's what was missing.", name: "Patricia M.", role: "Passive Investor · Hamburg" },
              ].map(t => (
                <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -4 }}
                  style={{ background: "#FAFAFA", border: "1.5px solid #F3F4F6", borderRadius: 16, padding: "40px 40px" }}>
                  <p style={{ fontSize: 28, marginBottom: 12, color: "#00C2A8" }}>"</p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "#374151", marginBottom: 24 }}>{t.q}</p>
                  <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 14 }}>
                    <p style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8 — STATS on violet */}
      <section style={{ background: "#00C2A8", padding: "88px 40px" }}>
        <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}
          style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            ["71%", "Only act on data they can verify"],
            ["45", "Investors interviewed"],
            ["5", "Factors per score"],
            ["€0", "To start"],
          ].map(([n, l], i) => (
            <motion.div key={l} variants={fadeUp}
              style={{ textAlign: "center" as const, padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <p style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const }}>{n}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.4 }}>{l}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 9 — PRICING */}
      <section id="pricing" style={{ padding: "104px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 20 }}>Pricing</motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>Try it free. Upgrade when you need more.</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: "#6B7280", marginBottom: 48 }}>No credit card. No setup. Your first verdict, on us.</motion.p>
            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "40px 32px", textAlign: "left" as const }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 12 }}>Free</p>
                <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", marginBottom: 24, fontVariantNumeric: "tabular-nums" as const }}>€0</p>
                {["1 full verdict/day", "All 5 factor scores", "Source on every number", "Price chart + Financials"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
                    <CheckCircle size={14} color="#16A34A" />
                    <span style={{ fontSize: 13, color: "#374151" }}>{f}</span>
                  </div>
                ))}
                <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#0A0A0A", color: "#fff", textAlign: "center" as const, padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Start for free
                </Link>
              </div>
              <div style={{ background: "#00C2A8", borderRadius: 20, padding: "40px 32px", textAlign: "left" as const }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>Pro</p>
                <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", color: "#fff", marginBottom: 4, fontVariantNumeric: "tabular-nums" as const }}>€4.99</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>per month</p>
                {["Peer comparison — see how your stock ranks", "Exit Strategy signals", "My Profile Score (Value / Growth)", "Unlimited verdicts"].map(f => (
                  <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                    <CheckCircle size={14} color="#A7F3D0" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{f}</span>
                  </div>
                ))}
                <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#fff", color: "#00C2A8", textAlign: "center" as const, padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  Start 7-day trial
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section style={{ background: "#FAFAFA", padding: "80px 40px", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(20px,3.5vw,34px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 28 }}>Common questions.</motion.h2>
            {[
              ["Is pondex_ financial advice?", "No. pondex_ is a research tool. Every score is a data-driven signal, not a recommendation. All investment decisions are yours."],
              ["What data sources do you use?", "Yahoo Finance, SEC EDGAR, and Groq AI (Llama 3.3) for plain-language explanations. Every single number links to its source."],
              ["How is the score calculated?", "Five factors: Fundamentals, Moat, Risk, Valuation, Management — each scored 0–100 from real financial data, then weighted into a single verdict."],
              ["What does '1 verdict per day' mean?", "Free users can run one full analysis per day. The counter resets at midnight UTC. Pro users get unlimited verdicts."],
              ["Is my data safe?", "We store only your email address. No financial data, no trading history. EU servers (Frankfurt)."],
            ].map(([q, a]) => (
              <motion.div key={q as string} variants={fadeUp}>
                <FaqItem q={q as string} a={a as string} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 11 — FINAL CTA */}
      <section style={{ background: "#0A0A0A", padding: "120px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <motion.div variants={stagger} initial="visible" whileInView="visible" viewport={vp}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.06, marginBottom: 20 }}>
              One ticker.<br />One verdict.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", marginBottom: 36 }}>Free to start. No account required.</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00C2A8", color: "#fff", padding: "16px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 24px rgba(124,58,237,0.4)" }}>
                Analyse a stock — it's free <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 20, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
              Research tool only · Not financial advice · Data: Yahoo Finance & SEC EDGAR
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 12 — FOOTER */}
      <footer style={{ background: "#F5F5F5", padding: "56px 32px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>pondex_</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>Copyright © 2026 pondex_.<br />All rights reserved.</p>
            </div>
            {[
              { title: "Company", links: [["About", "#"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Imprint", "#"]] },
              { title: "Product", links: [["Stock Analysis", "#"], ["Exit Strategy", "#"], ["My Profile Score", "#"], ["Pricing", "#pricing"]] },
              { title: "Help", links: [["FAQ", "#"], ["Data Sources", "#"], ["Contact", "#"]] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 14, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "#9CA3AF" }}>{col.title}</p>
                {col.links.map(([l, h]) => (
                  <p key={l} style={{ marginBottom: 9 }}><a href={h} style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>{l}</a></p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: "#E5E7EB", marginBottom: 24 }} />
          <div style={{ display: "flex", gap: 10 }}>
            {["𝕏", "in", "ig"].map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", border: "1.5px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#374151", textDecoration: "none" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
