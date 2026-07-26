import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { DEMO_SCORES } from "@/lib/demo-data";
import { FileSearch, TrendingUp, User, Bell, CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const vp = { once: true, amount: 0.15 };


// ── Eyebrow Tag — Jasper-style highlighted label ─────────────────────────────
function EyebrowTag({ children, color = "#FEFCE8", textColor = "#713F12" }: { children: string; color?: string; textColor?: string }) {
  return (
    <span style={{
      display: "inline-block",
      background: color,
      color: textColor,
      fontFamily: "'Chivo Mono', 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: "0.04em",
      padding: "3px 10px",
      borderRadius: 4,
      marginBottom: 20,
    }}>
      {children}
    </span>
  );
}

// ── CountUp — animated number on scroll ──────────────────────────────────────
function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1600, bounce: 0 });
  const inView = useInView(ref, { once: true, amount: 0.5 });
  useEffect(() => { if (inView) motionVal.set(to); }, [inView, motionVal, to]);
  useEffect(() => spring.on("change", (v) => {
    if (ref.current) ref.current.textContent = prefix + Math.round(v) + suffix;
  }), [spring, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ── Browser-frame Score Card ──────────────────────────────────────────────────
function BrowserScoreCard() {
  const factors = DEMO_SCORES.AAPL.factors;
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ flexShrink: 0, width: 340 }}
    >
      {/* Browser chrome */}
      <div style={{ background: "#F3F4F6", borderRadius: "16px 16px 0 0", padding: "10px 14px 0", border: "1.5px solid #E5E7EB", borderBottom: "none" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ background: "#fff", borderRadius: "6px 6px 0 0", padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", fontFamily: "monospace", border: "1px solid #E5E7EB", borderBottom: "none" }}>
          pondex.app/stock?ticker=AAPL
        </div>
      </div>
      {/* Card content */}
      <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderTop: "none", borderRadius: "0 0 16px 16px", padding: "24px", boxShadow: "0 8px 40px rgba(91,91,214,0.12)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#9CA3AF", marginBottom: 5 }}>pondex_ verdict</p>
            <span style={{ background: "#FEF9C3", color: "#92400E", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 999, textTransform: "uppercase" as const }}>HOLD</span>
          </div>
          <div style={{ textAlign: "right" as const }}>
            <p style={{ fontSize: 44, fontWeight: 800, color: "#D97706", letterSpacing: "-3px", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const }}>78</p>
            <p style={{ fontSize: 11, color: "#9CA3AF" }}>/100</p>
          </div>
        </div>
        {factors.map((f, i) => (
          <div key={f.name} style={{ marginBottom: 9 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{f.name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626" }}>{f.score}</span>
            </div>
            <div style={{ height: 3, background: "#F3F4F6", borderRadius: 50 }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${f.score}%` }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ height: "100%", background: f.score >= 70 ? "#16A34A" : f.score >= 45 ? "#D97706" : "#DC2626", borderRadius: 50 }}
              />
            </div>
          </div>
        ))}
        <p style={{ fontSize: 8, color: "#D1D5DB", textAlign: "center" as const, marginTop: 12, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
          Yahoo Finance · SEC EDGAR · Not financial advice
        </p>
      </div>
    </motion.div>
  );
}

// ── ScoreCard (kept for fallback) ─────────────────────────────────────────────
function ScoreCard() {
  const factors = DEMO_SCORES.AAPL.factors;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      style={{ background: "#fff", borderRadius: 24, padding: "28px 26px", border: "1.5px solid #E5E7EB", boxShadow: "0 4px 32px rgba(91,91,214,0.16)", width: 300, flexShrink: 0 }}
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
              initial={{ width: 0 }} animate={{ width: `${f.score}%` }}
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

// ── Pricing Section ───────────────────────────────────────────────────────────
function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const plans = {
    starter: { monthly: 0, yearly: 0 },
    pro:     { monthly: 4.99, yearly: 2.99 },
    max:     { monthly: 9.99, yearly: 5.99 },
  };

  const yearlyTotal = (plans.pro.yearly * 12).toFixed(2);
  const maxYearlyTotal = (plans.max.yearly * 12).toFixed(2);

  return (
    <motion.div variants={stagger} whileInView="visible" viewport={vp}>
      {/* Header */}
      <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
        <EyebrowTag color="#EDE9FE" textColor="#4C1D95">Pricing</EyebrowTag>
        <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>
          Simple pricing.
        </h2>
        <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 28 }}>
          Start free. Upgrade when you're ready.
        </p>

        {/* Pill slider */}
        <div style={{ display: "inline-flex", background: "#F3F4F6", borderRadius: 999, padding: 4, position: "relative" as const }}>
          <div style={{
            position: "absolute" as const, top: 4, bottom: 4,
            left: yearly ? "50%" : 4, width: "calc(50% - 4px)",
            background: "#5B5BD6", borderRadius: 999,
            transition: "left 0.25s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 1px 4px rgba(91,91,214,0.25)",
          }} />
          <button onClick={() => setYearly(false)} style={{ position: "relative" as const, zIndex: 1, padding: "9px 24px", borderRadius: 999, border: "none", background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 600, color: yearly ? "#9CA3AF" : "#fff", transition: "color 0.2s" }}>
            Monthly
          </button>
          <button onClick={() => setYearly(true)} style={{ position: "relative" as const, zIndex: 1, padding: "9px 24px", borderRadius: 999, border: "none", background: "transparent", cursor: "pointer", fontSize: 14, fontWeight: 600, color: yearly ? "#fff" : "#9CA3AF", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
            Yearly
            <span style={{ background: yearly ? "rgba(255,255,255,0.2)" : "#5B5BD6", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, transition: "background 0.2s" }}>−40%</span>
          </button>
        </div>
      </motion.div>

      {/* 3-column cards */}
      <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* Starter */}
        <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "32px 28px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", marginBottom: 20 }}>Starter</p>
          <p style={{ fontSize: 17, color: "#6B7280", marginBottom: 4 }}>Always free to start.</p>
          <p style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 24 }}>No card needed.</p>
          <div style={{ height: 1, background: "#F3F4F6", marginBottom: 20 }} />
          {["1 verdict per day", "5 factor scores", "Source on every number", "Price chart"].map(f => (
            <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <CheckCircle size={13} color="#9CA3AF" />
              <span style={{ fontSize: 13, color: "#6B7280" }}>{f}</span>
            </div>
          ))}
          <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#F3F4F6", color: "#374151", textAlign: "center" as const, padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Start free
          </Link>
        </div>

        {/* Pro — MOST POPULAR — center, slightly larger */}
        <div style={{ background: "#5B5BD6", borderRadius: 20, padding: "32px 28px", position: "relative" as const, marginTop: -12, marginBottom: -12 }}>
          <div style={{ position: "absolute" as const, top: -14, left: "50%", transform: "translateX(-50%)", background: "#0A0A0A", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.08em", whiteSpace: "nowrap" as const }}>
            MOST POPULAR
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Pro</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", color: "#fff", fontVariantNumeric: "tabular-nums" as const }}>
              €{yearly ? plans.pro.yearly : plans.pro.monthly}
            </span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>/month</span>
          </div>
          {yearly && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>€{yearlyTotal} billed yearly</p>}
          <p style={{ fontSize: 12, marginBottom: 24 }}>
            <span style={{ background: "#FF4D6D", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, marginRight: 6 }}>7 days free</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Cancel anytime.</span>
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 20 }} />
          {["Unlimited verdicts", "Peer comparison", "Exit Strategy signals", "My Profile Score", "Weekly digest"].map(f => (
            <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <CheckCircle size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{f}</span>
            </div>
          ))}
          <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#fff", color: "#5B5BD6", textAlign: "center" as const, padding: "14px", borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            Try free for 7 days →
          </Link>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center" as const, marginTop: 8 }}>No card needed</p>
        </div>

        {/* Pro Max — Power users */}
        <div style={{ background: "#0A0A0A", border: "1.5px solid #1F1F1F", borderRadius: 20, padding: "32px 28px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#6B7280", marginBottom: 20 }}>Pro Max</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", color: "#fff", fontVariantNumeric: "tabular-nums" as const }}>
              €{yearly ? plans.max.yearly : plans.max.monthly}
            </span>
            <span style={{ fontSize: 14, color: "#6B7280" }}>/month</span>
          </div>
          {yearly && <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>€{maxYearlyTotal} billed yearly</p>}
          <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 24 }}>For serious investors.</p>
          <div style={{ height: 1, background: "#1F1F1F", marginBottom: 20 }} />
          <p style={{ fontSize: 11, color: "#5B5BD6", fontWeight: 600, marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>Everything in Pro, plus:</p>
          {["Multi-portfolio tracking", "AI chat with sources", "DCF model + stress test", "Priority support", "Early access features"].map(f => (
            <div key={f} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
              <CheckCircle size={13} color="#5B5BD6" />
              <span style={{ fontSize: 13, color: "#9CA3AF" }}>{f}</span>
            </div>
          ))}
          <Link to="/signup" style={{ display: "block", marginTop: 24, background: "#5B5BD6", color: "#fff", textAlign: "center" as const, padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            Start Pro Max →
          </Link>
        </div>

      </motion.div>
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

      {/* 1 — HERO — two-column */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", paddingTop: "calc(64px + 56px)", background: "linear-gradient(135deg,#fff 0%,#F5F3FF 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 380px", gap: 72, alignItems: "center" }}>

          {/* Left — text */}
          <div>
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {["Value Investor", "Passive Investor", "Finance Professional"].map(p => (
                <span key={p} style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 600, color: "#6B7280" }}>{p}</span>
              ))}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ fontSize: "clamp(36px,5vw,68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: 20 }}>
              Too much data.<br />
              <span style={{ color: "#5B5BD6" }}>No clear answer.</span><br />
              pondex_ ends that.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
              style={{ fontSize: 18, color: "#6B7280", lineHeight: 1.65, maxWidth: 460, marginBottom: 36 }}>
              One verdict. Every number sourced.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#5B5BD6", color: "#fff", padding: "15px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(91,91,214,0.25)" }}>
                Analyse a stock — it's free <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#0A0A0A", padding: "15px 28px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1.5px solid #E5E7EB" }}>
                See how it works
              </a>
            </motion.div>
          </div>

          {/* Right — browser-framed score card */}
          <BrowserScoreCard />
        </div>
      </section>

      {/* 2 — SOURCE TRUST BAR */}
      <section style={{ background: "#F5F3FF", padding: "40px 40px", borderTop: "1px solid #DDD6FE", borderBottom: "1px solid #DDD6FE" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#5B5BD6", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 12 }}>Data from sources you can verify</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Yahoo Finance", "SEC EDGAR", "Groq AI (Llama 3.3)"].map(s => (
              <span key={s} style={{ fontSize: 14, fontWeight: 600, color: "#3730A3" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — THE PROBLEM */}
      <section id="problem" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto", textAlign: "left" as const }}>
        <motion.div variants={stagger} whileInView="visible" viewport={vp}>
          <motion.div variants={fadeUp}>
            <EyebrowTag color="#FFF1F3" textColor="#E02247">The problem</EyebrowTag>
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 24 }}>
            Still uncertain.<br />
            <span style={{ color: "#5B5BD6" }}>pondex_ ends that.</span>
          </motion.h2>
<div style={{ marginBottom: 56 }} />
          <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: "📊", title: "Too many sources", desc: "YouTube, Reddit, newsletters — 5 opinions, no clear answer." },
              { icon: "🤖", title: "No source, no trust", desc: "AI tools give you numbers. But where do they come from?" },
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

      {/* 4 — THE SOLUTION — Sticky scroll (Bold-style) */}
      <section style={{ background: "#fff", padding: "120px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* LEFT — sticky */}
          <div style={{ position: "sticky", top: 120 }}>
            <EyebrowTag color="#EDE9FE" textColor="#4C1D95">How it works</EyebrowTag>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
              One answer.<br />
              <span style={{ color: "#5B5BD6" }}>Every number<br />sourced.</span>
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.65, maxWidth: 380, marginBottom: 40 }}>
              pondex_ scores any stock across 5 factors — and shows you exactly where each number comes from.
            </p>
            <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#5B5BD6", color: "#fff", padding: "13px 24px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              See it in action <ArrowRight size={15} />
            </Link>
          </div>

          {/* RIGHT — scrolling features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                Icon: FileSearch,
                color: "#5B5BD6",
                stat: "100%",
                statLabel: "of numbers linked to a source",
                title: "Source on every number",
                desc: "Yahoo Finance, SEC EDGAR, Groq AI — every single data point links back to where it came from. José R.: \"I need to see where the number comes from.\"",
              },
              {
                Icon: TrendingUp,
                color: "#4F46E5",
                stat: "1",
                statLabel: "clear verdict per analysis",
                title: "BUY · HOLD · SELL",
                desc: "Not five opinions. Not a wall of data. One clear signal — scored across 5 factors, weighted to your strategy.",
              },
              {
                Icon: User,
                color: "#3B82F6",
                stat: "3",
                statLabel: "investor profiles",
                title: "Your investor profile",
                desc: "Value investor, Growth investor, or Balanced. The same stock scores differently depending on who you are. That's the point.",
              },
              {
                Icon: Bell,
                color: "#6366F1",
                stat: "0",
                statLabel: "tools solve this today",
                title: "Exit signals",
                desc: "Know when your thesis has changed — before the damage is done. Gunnar L.: \"I never know when to sell.\" Now you will.",
              },
            ].map(({ Icon, color, stat, statLabel, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  padding: "48px 0",
                  borderBottom: i < 3 ? "1px solid #F3F4F6" : "none",
                }}
              >
                {/* Big stat */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-3px", color, fontVariantNumeric: "tabular-nums" as const, lineHeight: 1 }}>{stat}</span>
                  <span style={{ fontSize: 14, color: "#9CA3AF", maxWidth: 120, lineHeight: 1.3 }}>{statLabel}</span>
                </div>

                {/* Icon + title */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={color} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#0A0A0A" }}>{title}</p>
                </div>

                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, maxWidth: 420 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "104px 40px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" as const }}>
          <motion.div variants={stagger} whileInView="visible" viewport={vp}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16 }}>One verdict. In three steps.</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 18, color: "#6B7280", marginBottom: 72, maxWidth: 460, margin: "0 auto 72px" }}>No finance degree required.</motion.p>

            {/* Lemonade-style: big illustration center + labels floating */}
            <motion.div variants={fadeUp} style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}>
              {/* Phone illustration SVG */}
              <svg viewBox="0 0 320 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
                {/* Phone outline */}
                <rect x="10" y="10" width="300" height="540" rx="36" ry="36" stroke="#D1D5DB" strokeWidth="2" fill="white"/>
                {/* Notch */}
                <rect x="110" y="18" width="100" height="16" rx="8" fill="#E5E7EB"/>
                {/* Screen content - ticker input */}
                <rect x="30" y="60" width="260" height="44" rx="10" fill="#F3F4F6"/>
                <text x="60" y="88" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="600" fill="#374151">AAPL</text>
                <rect x="240" y="68" width="40" height="28" rx="8" fill="#5B5BD6"/>
                <text x="253" y="88" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill="white">GO</text>
                {/* Score display */}
                <rect x="30" y="120" width="260" height="130" rx="16" fill="#F8FFFE" stroke="#DDD6FE" strokeWidth="1.5"/>
                <text x="50" y="150" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="600" fill="#9CA3AF" letterSpacing="2">VERDICT</text>
                <text x="190" y="175" fontFamily="Inter,sans-serif" fontSize="48" fontWeight="800" fill="#D97706">78</text>
                <rect x="50" y="158" width="52" height="20" rx="10" fill="#FEF9C3"/>
                <text x="60" y="172" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#92400E">HOLD</text>
                {/* Factor bars */}
                <text x="50" y="177" fontFamily="Inter,sans-serif" fontSize="8" fill="#9CA3AF">Fundamentals</text>
                <rect x="50" y="180" width="130" height="3" rx="2" fill="#F3F4F6"/>
                <rect x="50" y="180" width="107" height="3" rx="2" fill="#16A34A"/>
                <text x="50" y="197" fontFamily="Inter,sans-serif" fontSize="8" fill="#9CA3AF">Moat</text>
                <rect x="50" y="200" width="130" height="3" rx="2" fill="#F3F4F6"/>
                <rect x="50" y="200" width="114" height="3" rx="2" fill="#16A34A"/>
                <text x="50" y="217" fontFamily="Inter,sans-serif" fontSize="8" fill="#9CA3AF">Valuation</text>
                <rect x="50" y="220" width="130" height="3" rx="2" fill="#F3F4F6"/>
                <rect x="50" y="220" width="81" height="3" rx="2" fill="#D97706"/>
                {/* Source line */}
                <text x="50" y="260" fontFamily="Inter,sans-serif" fontSize="7" fill="#D1D5DB">Yahoo Finance · SEC EDGAR</text>
                {/* Bottom nav dots */}
                <circle cx="145" cy="530" r="16" fill="#F3F4F6"/>
                <rect x="120" y="543" width="80" height="4" rx="2" fill="#E5E7EB"/>
              </svg>

              {/* Floating labels - Lemonade style */}
              <div style={{ position: "absolute", top: "8%", left: "-5%", textAlign: "left" as const }}>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 2 }}>Enter ticker</p>
                <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>In seconds</p>
                <svg width="40" height="30" viewBox="0 0 40 30" style={{ display: "block", marginTop: 4 }}>
                  <path d="M 35 5 Q 40 15 30 25" stroke="#5B5BD6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M 28 22 L 30 25 L 33 22" stroke="#5B5BD6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ position: "absolute", top: "35%", right: "-8%", textAlign: "right" as const }}>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 2 }}>Get your verdict</p>
                <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}>With sources</p>
                <svg width="40" height="30" viewBox="0 0 40 30" style={{ display: "block", marginLeft: "auto", marginTop: 4 }}>
                  <path d="M 5 5 Q 0 15 10 25" stroke="#5B5BD6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M 12 22 L 10 25 L 7 22" stroke="#5B5BD6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: "8%", left: "-5%", textAlign: "left" as const }}>
                <span style={{ background: "#5B5BD6", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999 }}>Done.</span>
                <p style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", marginTop: 6 }}>BUY · HOLD · SELL</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6 — PEER COMPARISON TEASER */}
      <section style={{ background: "#F5F3FF", padding: "80px 40px", borderTop: "1px solid #DDD6FE", borderBottom: "1px solid #DDD6FE" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={stagger} whileInView="visible" viewport={vp}>
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
                <div key={s.ticker} style={{ background: "#fff", border: "1.5px solid #D1FAE5", borderRadius: 12, padding: "18px 14px", paddingTop: 15, textAlign: "center" as const, borderTop: `3px solid ${s.color}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>{s.ticker}</p>
                  <p style={{ fontSize: 30, fontWeight: 800, color: s.color, letterSpacing: "-2px", fontVariantNumeric: "tabular-nums" as const }}>{s.score}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.verdict}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#5B5BD6", color: "#fff", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                Unlock peer comparison <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7 — TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "104px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div variants={stagger} whileInView="visible" viewport={vp}>
            
            <motion.div variants={fadeUp} style={{ textAlign: "center" as const }}><EyebrowTag color="#F0FEFA" textColor="#007A6E">From 45 user interviews · June 2026</EyebrowTag></motion.div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center" as const, marginBottom: 48 }}>What investors actually say.</motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
              {[
                { q: "I need to see where the number comes from. I don't trust anyone who can't show their sources.", name: "José R.", role: "Finance Professional · Madrid" },
                { q: "I never know when to sell. No tool has solved that — until now.", name: "Gunnar L.", role: "Value Investor · Berlin" },
                { q: "It tells me which stock fits ME. My risk, my budget. That's what was missing.", name: "Patricia M.", role: "Passive Investor · Hamburg" },
              ].map(t => (
                <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -4 }}
                  style={{ background: "#FAFAFA", border: "1.5px solid #F3F4F6", borderRadius: 16, padding: "40px 40px" }}>
                  <p style={{ fontSize: 28, marginBottom: 12, color: "#5B5BD6" }}>"</p>
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

      {/* 8 — STATS with CountUp */}
      <section style={{ background: "#5B5BD6", padding: "88px 40px" }}>
        <motion.div variants={stagger} whileInView="visible" viewport={vp}
          style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            { display: <CountUp to={71} suffix="%" />, label: "Only act on data they can verify" },
            { display: <CountUp to={45} />, label: "investors told us what was missing" },
            { display: <CountUp to={5} />, label: "Factors per score" },
            { display: <span>€0</span>, label: "To start" },
          ].map(({ display, label }, i) => (
            <motion.div key={label} variants={fadeUp}
              style={{ textAlign: "center" as const, padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <p style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" as const }}>
                {display}
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.4 }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 9 — PRICING */}
      <section id="pricing" style={{ padding: "104px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <PricingSection />
        </div>
      </section>

      {/* 10 — FAQ */}
      <section style={{ background: "#FAFAFA", padding: "80px 40px", borderTop: "1px solid #F3F4F6" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <motion.div variants={stagger} whileInView="visible" viewport={vp}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 28 }}>Common questions.</motion.h2>
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
          <motion.div variants={stagger} whileInView="visible" viewport={vp}>
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(30px,5vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.06, marginBottom: 20 }}>
              One ticker.<br />One verdict.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", marginBottom: 36 }}>Your first verdict is free.</motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#5B5BD6", color: "#fff", padding: "16px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 24px rgba(91,91,214,0.40)" }}>
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
