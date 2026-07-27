import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

function Gauge({ value = 78 }: { value?: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="relative grid size-36 place-items-center">
      <svg viewBox="0 0 140 140" className="size-36 -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="var(--surface)" strokeWidth="12" fill="none" />
        <motion.circle
          cx="70"
          cy="70"
          r={r}
          stroke="var(--brand)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: `0 ${c}` }}
          whileInView={{ strokeDasharray: `${dash} ${c}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-4xl font-bold tracking-tight text-ink tabular-nums">
            <CountUp to={value} duration={1.6} />
          </div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-ink-mid">
            / 100
          </div>
        </div>
      </div>
    </div>
  );
}

function Factor({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-ink-mid">{label}</span>
        <span className="font-semibold text-ink tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-brand"
        />
      </div>
    </div>
  );
}

export function ScoreCard() {
  return (
    <div className="relative w-full max-w-[520px]">
      {/* browser chrome */}
      <div className="overflow-hidden rounded-3xl border border-border-soft bg-white shadow-[0_30px_80px_-30px_rgba(91,91,214,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-border-soft bg-surface/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] text-ink-mid">
            <span className="text-data">●</span> pondex.app/analyze/AAPL
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid size-10 place-items-center rounded-xl bg-ink text-sm font-bold text-white">
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">Apple Inc.</div>
                  <div className="text-xs text-ink-mid">AAPL · NASDAQ</div>
                </div>
              </div>
            </div>
            <div className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
              Live · updated 2s ago
            </div>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <Gauge value={78} />
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-mid">
                Verdict
              </div>
              <div className="mt-2 text-3xl font-bold tracking-tight text-ink">HOLD</div>
              <div className="mt-1 text-xs text-ink-mid">
                Balanced signal — strong fundamentals, elevated valuation.
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Factor label="Fundamentals" value={84} />
            <Factor label="Valuation" value={52} />
            <Factor label="Momentum" value={71} />
            <Factor label="Quality" value={88} />
            <Factor label="Sentiment" value={66} />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border-soft pt-4 text-[11px] text-ink-mid">
            <span>Sourced from Yahoo Finance · SEC EDGAR</span>
            <span className="font-mono text-ink">v2.4</span>
          </div>
        </div>
      </div>

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="absolute -left-4 top-32 hidden rounded-2xl border border-border-soft bg-white px-3 py-2 shadow-xl sm:block"
      >
        <div className="text-[10px] uppercase tracking-wider text-ink-mid">Momentum</div>
        <div className="text-sm font-semibold text-data">+3.2% this week</div>
      </motion.div>
    </div>
  );
}
