import { ArrowRight, Bell, ShieldCheck, TrendingUp, LineChart, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Sparkline } from "./Sparkline";

export function Features() {
  return (
    <section id="features" className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header — title left, subtext+CTA right */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-flex items-center rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-ink-mid mb-4">
                Core features
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl leading-tight max-w-md">
                Everything you need<br />to invest confidently
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end md:text-right md:max-w-xs">
              <p className="text-base text-ink-mid leading-relaxed">
                Professional tools designed for active traders and long-term investors managing diverse portfolios.
              </p>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/85 transition-colors"
              >
                View all features <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Asymmetric bento grid — 3 columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Row 1 */}
          {/* 1 — Risk Analysis (light, tall) */}
          <Reveal className="md:row-span-1">
            <div className="h-full min-h-[280px] rounded-3xl bg-surface/60 border border-border-soft p-7 flex flex-col">
              <h3 className="text-xl font-semibold text-ink">Risk Analysis</h3>
              <div className="flex-1 flex items-center justify-center my-6">
                <div
                  className="size-24 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--risk-from), var(--risk-to))" }}
                >
                  <ShieldCheck className="size-10 text-white" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Real-time risk scoring", "Portfolio volatility tracking", "Predictive alerts"].map(t => (
                  <span key={t} className="rounded-full border border-border-soft bg-white px-3 py-1 text-xs text-ink-mid">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 2 — Research / Market Insights (landscape image bg) */}
          <Reveal delay={0.05} className="md:row-span-1">
            <div
              className="h-full min-h-[280px] rounded-3xl overflow-hidden relative"
              style={{
                backgroundImage: "url('/stockrater/hero-landscape.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative p-7">
                <h3 className="text-xl font-semibold text-ink">Research</h3>
                <p className="mt-2 text-sm text-ink-mid">Live signals for your watchlist.</p>
              </div>
              {/* Chart overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="rounded-2xl bg-white/90 backdrop-blur p-4 shadow-lg">
                  <div className="flex gap-2 mb-2">
                    <span className="rounded-full bg-[#16a34a] px-2 py-0.5 text-[10px] font-semibold text-white">Live</span>
                    <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">+2.4%</span>
                  </div>
                  <Sparkline />
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3 — AI Signals (black, tall) */}
          <Reveal delay={0.1} className="md:row-span-2">
            <div className="h-full min-h-[600px] rounded-3xl bg-ink p-7 flex flex-col text-white">
              <h3 className="text-xl font-semibold">AI-powered insights</h3>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <span
                  className="text-7xl font-black tracking-tight"
                  style={{ color: "var(--research-from)" }}
                >
                  BUY
                </span>
                <span
                  className="text-5xl font-black tracking-tight opacity-30"
                  style={{ color: "var(--research-from)" }}
                >
                  BUY
                </span>
              </div>
              <p className="text-sm text-white/60 text-center">
                Real-time market data<br />and predictive analysis.
              </p>
            </div>
          </Reveal>

          {/* Row 2 */}
          {/* 4 — Portfolio (landscape bg, wide) */}
          <Reveal delay={0.12} className="md:col-span-2">
            <div
              className="h-full min-h-[280px] rounded-3xl overflow-hidden relative"
              style={{
                backgroundImage: "url('/stockrater/hero-mountains.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 60%",
              }}
            >
              <div className="absolute inset-0 bg-white/40" />
              <div className="relative p-7">
                <h3 className="text-xl font-semibold text-ink text-center">Portfolio tracking</h3>
                <p className="mt-2 text-sm text-ink-mid text-center max-w-md mx-auto">
                  See your entire financial picture in one place with performance attribution and gain/loss analysis.
                </p>
              </div>
              {/* Floating cards */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <div className="rounded-2xl bg-white/95 shadow-lg backdrop-blur px-5 py-3">
                  <div className="text-xs text-ink-mid mb-1">Portfolio Score</div>
                  <div className="text-2xl font-bold text-ink">78<span className="text-sm text-ink-mid">/100</span></div>
                </div>
                <div className="rounded-2xl bg-white/95 shadow-lg backdrop-blur px-5 py-3">
                  <div className="text-xs text-ink-mid mb-1">Total Value</div>
                  <div className="text-2xl font-bold" style={{ color: "var(--research-from)" }}>$58,420</div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Row 3 — Insider Data full width */}
        <Reveal delay={0.15} className="mt-4">
          <div
            className="rounded-3xl p-6"
            style={{ background: "linear-gradient(135deg, var(--insider-from), var(--insider-to))" }}
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="inline-grid size-10 place-items-center rounded-xl bg-white/20 text-white">
                  <Bell className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Insider Data & Smart Alerts</h3>
                  <p className="mt-1 text-sm text-white/75">Only the signals that matter — no noise.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["AAPL crossed HOLD → BUY", "Portfolio risk +8%", "TSLA earnings tomorrow"].map(tag => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
