import { ArrowRight, Layers, Zap, Focus } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

function Callout({
  icon,
  title,
  body,
  className = "",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-64 rounded-2xl border border-border-soft bg-white/95 p-4 shadow-[0_20px_60px_-20px_rgba(29,29,29,0.25)] backdrop-blur ${className}`}
    >
      <div className="inline-grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
        {icon}
      </div>
      <div className="mt-3 text-sm font-semibold text-ink">{title}</div>
      <p className="mt-1 text-xs leading-relaxed text-ink-mid">{body}</p>
    </motion.div>
  );
}

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-soft/60 to-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-medium text-ink-mid">
            Platform overview
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            See your financial intelligence in action
          </h2>
          <p className="mt-4 text-lg text-ink-mid">
            A real-time dashboard that brings your portfolio, insights, and risk analysis together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand/95"
            >
              Explore features <ArrowRight className="size-4" />
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/90"
            >
              Try the live demo
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16">
          {/* dashboard mock */}
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border-soft bg-white shadow-[0_40px_100px_-30px_rgba(91,91,214,0.35)]">
            <div className="flex items-center gap-1.5 border-b border-border-soft bg-surface/60 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="grid grid-cols-12 gap-0">
              {/* sidebar */}
              <aside className="col-span-3 hidden border-r border-border-soft bg-surface/40 p-4 md:block">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-mid">
                  Workspace
                </div>
                {["Overview", "Portfolio", "Signals", "Watchlist", "Reports"].map((l, i) => (
                  <div
                    key={l}
                    className={`mb-1 rounded-lg px-3 py-2 text-sm ${
                      i === 0 ? "bg-white font-semibold text-ink shadow-sm" : "text-ink-mid"
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </aside>
              <div className="col-span-12 p-6 md:col-span-9">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-ink-mid">Total portfolio value</div>
                    <div className="mt-1 text-3xl font-bold tabular-nums">$284,120.55</div>
                  </div>
                  <div className="rounded-full bg-data/10 px-3 py-1 text-xs font-semibold text-data">
                    +8.2% MTD
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { l: "Buy signals", v: "12" },
                    { l: "Hold", v: "34" },
                    { l: "Sell", v: "3" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-2xl border border-border-soft p-4">
                      <div className="text-xs text-ink-mid">{k.l}</div>
                      <div className="mt-1 text-2xl font-bold">{k.v}</div>
                    </div>
                  ))}
                </div>
                {/* fake chart */}
                <div className="mt-6 h-40 overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-brand-soft to-white p-4">
                  <svg viewBox="0 0 400 120" className="h-full w-full">
                    <defs>
                      <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,90 C40,80 60,60 100,55 C140,50 160,75 200,65 C240,55 260,30 300,25 C340,20 360,40 400,30 L400,120 L0,120 Z"
                      fill="url(#dash-fill)"
                    />
                    <path
                      d="M0,90 C40,80 60,60 100,55 C140,50 160,75 200,65 C240,55 260,30 300,25 C340,20 360,40 400,30"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* floating callouts */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <Callout
              icon={<Layers className="size-4" />}
              title="All your work in one place"
              body="Unified view of all portfolios."
              className="pointer-events-auto absolute -left-6 top-16"
              delay={0.3}
            />
            <Callout
              icon={<Zap className="size-4" />}
              title="Make progress faster"
              body="Act on key insights instantly."
              className="pointer-events-auto absolute -right-4 top-32"
              delay={0.45}
            />
            <Callout
              icon={<Focus className="size-4" />}
              title="Built for better focus"
              body="Clean interface, zero noise."
              className="pointer-events-auto absolute -right-6 bottom-8"
              delay={0.6}
            />
          </div>
        </Reveal>

        {/* mobile callouts stacked */}
        <div className="mt-8 grid gap-3 lg:hidden">
          <Callout icon={<Layers className="size-4" />} title="All your work in one place" body="Unified view of all portfolios." className="!w-full" />
          <Callout icon={<Zap className="size-4" />} title="Make progress faster" body="Act on key insights instantly." className="!w-full" />
          <Callout icon={<Focus className="size-4" />} title="Built for better focus" body="Clean interface, zero noise." className="!w-full" />
        </div>
      </div>
    </section>
  );
}
