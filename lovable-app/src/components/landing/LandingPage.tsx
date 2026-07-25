import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { DEMO_SCORES, DEMO_QUOTES, DEMO_TICKERS, isDemoTicker, verdictColor } from "@/lib/demo-data";

const ROTATING = ["where to invest", "which stock to pick", "if the price is right"];

function RotatingHeadline() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <h1
      className="font-bold tracking-tight"
      style={{
        color: "var(--text-inverse)",
        fontSize: "clamp(40px, 6vw, 88px)",
        letterSpacing: "-0.04em",
        lineHeight: 1.02,
      }}
    >
      Still not sure{" "}
      <span
        key={i}
        className="inline-block"
        style={{
          color: "var(--text-muted)",
          animation: "pondex-fade 400ms ease-out",
        }}
      >
        {ROTATING[i]}
      </span>
      …
      <br />
      <span>pondex_ gives you one verdict.</span>
      <style>{`@keyframes pondex-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </h1>
  );
}

function ScoreCardMock() {
  const q = DEMO_QUOTES.AAPL;
  const s = DEMO_SCORES.AAPL;
  return (
    <div
      className="w-full max-w-md"
      style={{
        background: "var(--bg-dark-elev)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 24,
        color: "var(--text-inverse)",
      }}
    >
      <p className="section-label" style={{ color: "var(--text-muted)" }}>
        AAPL · NASDAQ · Technology
      </p>
      <p className="mt-2 text-lg font-semibold">{q.companyName}</p>
      <p className="mt-1 text-sm tabular" style={{ color: "var(--text-muted)" }}>
        ${q.price.toFixed(2)} · Illustrative
      </p>
      <div className="mt-6 flex items-baseline justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ background: "var(--badge-hold-bg)", color: "var(--badge-hold-text)" }}
        >
          HOLD
        </span>
        <span className="text-5xl font-bold tabular" style={{ letterSpacing: "-0.02em" }}>
          {s.score}
          <span className="text-xl" style={{ color: "var(--text-muted)" }}>
            /100
          </span>
        </span>
      </div>
      <div className="mt-6 space-y-2.5">
        {s.factors.map((f) => (
          <div key={f.name} className="flex items-center gap-3">
            <span className="text-xs w-24" style={{ color: "var(--text-muted)" }}>
              {f.name}
            </span>
            <span className="text-xs tabular w-10">{f.score}</span>
            <div
              className="flex-1 h-[3px] rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                style={{
                  width: `${f.score}%`,
                  height: "100%",
                  borderRadius: 50,
                  background:
                    f.score >= 70 ? "var(--color-up)" : f.score >= 45 ? "var(--color-hold)" : "var(--color-down)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[11px]" style={{ color: "var(--text-muted)" }}>
        Source: Yahoo Finance · SEC EDGAR · Not financial advice
      </p>
    </div>
  );
}

function DemoSection() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | { ticker: string; score: number; verdict: string; summary: string; factors: { name: string; score: number; source: string }[] }>(null);
  const [error, setError] = useState<string | null>(null);

  const runDemo = () => {
    const t = input.trim().toUpperCase();
    if (!t) return;
    if (!isDemoTicker(t)) {
      setError(t);
      setResult(null);
      return;
    }
    const s = DEMO_SCORES[t as keyof typeof DEMO_SCORES];
    setError(null);
    setResult({
      ticker: t,
      score: s.score,
      verdict: s.verdict,
      summary: s.summary,
      factors: s.factors.slice(0, 3),
    });
  };

  return (
    <section id="demo" className="py-24 border-b" style={{ borderColor: "var(--border-color)" }}>
      <div className="mx-auto max-w-[900px] px-6">
        <p className="section-label">Demo</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Try it yourself.</h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runDemo()}
            placeholder="Enter a ticker…"
            className="input-flat flex-1 uppercase"
          />
          <button onClick={runDemo} className="btn-dark">
            GET SCORE →
          </button>
        </div>
        {error && (
          <div className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            Ticker not found or not in demo set.
            <div className="mt-3 flex flex-wrap gap-2">
              {DEMO_TICKERS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setInput(t);
                    setError(null);
                    setResult({
                      ticker: t,
                      score: DEMO_SCORES[t].score,
                      verdict: DEMO_SCORES[t].verdict,
                      summary: DEMO_SCORES[t].summary,
                      factors: DEMO_SCORES[t].factors.slice(0, 3),
                    });
                  }}
                  className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
        {result && (
          <div className="mt-8 card-flat">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="section-label">{result.ticker}</p>
                <p className="mt-2 text-2xl font-semibold tabular">
                  Score {result.score}/100 ·{" "}
                  <span
                    className={
                      verdictColor(result.score) === "buy"
                        ? "badge-buy"
                        : verdictColor(result.score) === "hold"
                        ? "badge-hold"
                        : "badge-sell"
                    }
                    style={{ padding: "2px 10px", borderRadius: 999, fontSize: 12 }}
                  >
                    {result.verdict}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              {result.summary}
            </p>
            <div className="mt-6 space-y-3">
              {result.factors.map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <span className="text-xs w-28" style={{ color: "var(--text-secondary)" }}>{f.name}</span>
                  <span className="text-xs tabular w-8">{f.score}</span>
                  <div className="flex-1 h-[3px] rounded-full" style={{ background: "var(--bg-subtle)" }}>
                    <div style={{ width: `${f.score}%`, height: "100%", borderRadius: 50, background: f.score >= 70 ? "var(--color-up)" : f.score >= 45 ? "var(--color-hold)" : "var(--color-down)" }} />
                  </div>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{f.source}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/signup" className="text-sm font-medium underline underline-offset-4">
                Full analysis in the app →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <div style={{ background: "var(--bg-primary)" }}>
      <LandingNav />

      {/* Hero */}
      <section style={{ background: "var(--bg-dark)", paddingTop: 120, paddingBottom: 80 }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block text-xs px-3 py-1.5 rounded-full"
                style={{ background: "#1f1f1f", color: "var(--text-muted)", border: "1px solid #2d2d2d" }}
              >
                Free · Every source cited
              </span>
              <div className="mt-6">
                <RotatingHeadline />
              </div>
              <p
                className="mt-6 text-lg max-w-xl"
                style={{ color: "var(--text-muted)" }}
              >
                A 0–100 score for any stock. Every number cites its source. No noise — just a clear verdict in under 60 seconds.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup" className="btn-light">Start free trial</Link>
                <a href="#demo" className="btn-outline-dark">Get a demo</a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 max-w-md md:hidden">
                <div>
                  <p className="text-3xl font-bold tabular" style={{ color: "var(--text-inverse)" }}>71%</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>trust only sourced data</p>
                </div>
                <div>
                  <p className="text-3xl font-bold tabular" style={{ color: "var(--text-inverse)" }}>60s</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>time to verdict</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-end relative">
              <ScoreCardMock />
              <div className="absolute -left-8 top-8 hidden lg:block card-flat" style={{ background: "#1a1a1a", borderColor: "rgba(255,255,255,0.08)", color: "var(--text-inverse)", padding: 16, width: 180 }}>
                <p className="text-3xl font-bold tabular">71%</p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>trust only sourced data</p>
                <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>Investor research · n=45</p>
              </div>
              <div className="absolute -right-4 bottom-8 hidden lg:block" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: "var(--text-inverse)", padding: 16, width: 160 }}>
                <p className="text-3xl font-bold tabular">60s</p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>any stock, always sourced</p>
                <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>Time to verdict</p>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-6 border-t flex flex-wrap gap-6 text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--text-muted)" }}>
            <span>Data sources:</span>
            <span>Yahoo Finance</span>
            <span>SEC EDGAR</span>
            <span>Groq AI</span>
          </div>
        </div>
      </section>

      <DemoSection />

      {/* How it works */}
      <section id="how-it-works" className="py-24 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <p className="section-label">How it works</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { n: "001", t: "Enter a ticker.", d: "Type any stock symbol. 2 seconds." },
              { n: "002", t: "We analyse it.", d: "5 factors, every number sourced." },
              { n: "003", t: "You decide.", d: "BUY / HOLD / SELL — plain language." },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-sm tabular" style={{ color: "var(--text-muted)" }}>{s.n}</p>
                <p className="mt-4 text-2xl font-semibold">{s.t}</p>
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict banner */}
      <section style={{ background: "var(--bg-dark)" }} className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 flex flex-wrap items-baseline gap-6">
          <span className="badge-hold text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">HOLD</span>
          <span className="text-4xl font-bold tabular" style={{ color: "var(--text-inverse)" }}>78/100</span>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>GOOD FIT</span>
          <p className="text-lg md:text-2xl mt-2 md:mt-0" style={{ color: "var(--text-inverse)" }}>
            "The score is there. Now you know."
          </p>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-24 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="mx-auto max-w-[1000px] px-6 md:px-8">
          <p className="section-label">Different by design</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Nobody else cites their sources.</h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: "var(--text-secondary)" }}>
                  <th className="text-left py-3"></th>
                  <th className="text-left py-3">Yahoo Finance</th>
                  <th className="text-left py-3">ChatGPT</th>
                  <th className="text-left py-3">Bloomberg</th>
                  <th className="text-left py-3 font-semibold" style={{ color: "var(--text-primary)" }}>pondex_</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sources cited", "✗", "✗", "✗", "✓"],
                  ["Clear verdict", "✗", "✗", "✗", "✓"],
                  ["Your strategy", "✗", "✗", "✗", "✓"],
                  ["Affordable", "✓", "✓", "✗", "✓"],
                ].map((row) => (
                  <tr key={row[0]} style={{ borderTop: "1px solid var(--border-color)" }}>
                    <td className="py-3 text-sm">{row[0]}</td>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} className="py-3 tabular" style={{ color: i === 3 ? "var(--color-up)" : cell === "✓" ? "var(--text-primary)" : "var(--text-muted)" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="mx-auto max-w-[1000px] px-6 md:px-8">
          <p className="section-label">Reviews</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            Trusted by investors who aren&apos;t afraid to question the data.
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>From user research interviews · n=45 · June 2026</p>
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { n: "Gunnar L.", r: "Value Investor · Berlin", q: "The score is much better than a raw price — it tells me if I should even bother reading the 10-K." },
              { n: "Patricia M.", r: "Passive Investor · Hamburg", q: "Gen-Z mindset — rate everything out of ten. Score with sources is what convinced me." },
              { n: "José R.", r: "Finance Professional · Madrid", q: "I really like the comparison part. That's how you make a decision." },
            ].map((c) => (
              <div key={c.n} className="card-flat">
                <p className="text-sm">"{c.q}"</p>
                <p className="mt-5 text-sm font-semibold">{c.n}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{c.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="mx-auto max-w-[1000px] px-6 md:px-8">
          <p className="section-label">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Simple pricing.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="card-flat">
              <p className="section-label">Free</p>
              <p className="mt-4 text-5xl font-bold tabular">€0<span className="text-lg font-normal" style={{ color: "var(--text-secondary)" }}>/month</span></p>
              <ul className="mt-6 space-y-2 text-sm">
                <li>1 full verdict per day</li>
                <li>Source attribution on every number</li>
                <li>Plain-language explanations</li>
                <li>Price chart</li>
                <li>No credit card required</li>
              </ul>
              <Link to="/signup" className="btn-outline mt-8 inline-flex">Start for free →</Link>
            </div>
            <div className="card-flat" style={{ background: "var(--bg-dark)", color: "var(--text-inverse)", borderColor: "var(--bg-dark)" }}>
              <p className="section-label" style={{ color: "var(--text-muted)" }}>Pro</p>
              <p className="mt-4 text-5xl font-bold tabular">€4.99<span className="text-lg font-normal" style={{ color: "var(--text-muted)" }}>/month</span></p>
              <ul className="mt-6 space-y-2 text-sm">
                <li>Unlimited verdicts</li>
                <li>Peer comparison</li>
                <li>DCF model + stress test (Q4 2026)</li>
                <li>Watchlist + portfolio tracker</li>
                <li>Weekly digest email</li>
              </ul>
              <Link to="/signup" className="btn-light mt-8 inline-flex">Start 7-day trial →</Link>
            </div>
          </div>
          <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>No credit card required for free tier. Cancel anytime.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "var(--bg-dark)" }} className="py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: "var(--text-inverse)", letterSpacing: "-0.03em" }}>
            Stop guessing. Start verifying.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-muted)" }}>
            Your first verdict takes 60 seconds. No account. No credit card.
          </p>
          <div className="mt-8">
            <a href="#demo" className="btn-light inline-flex">Analyse a stock now — it&apos;s free</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ background: "var(--bg-primary)" }}>
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-bold">pondex_</p>
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
              <a href="#pricing">Pricing</a>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
          <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 pondex_ · Research tool only — not financial advice · Data: Yahoo Finance &amp; SEC EDGAR
          </p>
        </div>
      </footer>
    </div>
  );
}
