import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const before = {
  title: "Challenges of managing investments today",
  points: [
    "Financial data is spread across platforms and hard to understand",
    "No clear direction for buy, hold, or sell decisions",
    "Tracking investments manually takes time and effort",
  ],
  stats: [
    { value: 68, suffix: "%", label: "Financial data confusion" },
    { value: 55, suffix: "%", label: "Poor data understanding" },
  ],
};

const after = {
  title: "Smarter way to manage your investments",
  points: [
    "Get clear recommendations based on real-time data",
    "Understand risks before making investment decisions",
    "Monitor your portfolio in real time — no manual effort",
  ],
  stats: [
    { value: 3, suffix: "X", label: "Faster smart decisions" },
    { value: 24, suffix: "/7", label: "Real-time tracking" },
  ],
};

export function BeforeAfter() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const data = mode === "before" ? before : after;
  const dark = mode === "after";

  return (
    <section id="why" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Smarter decisions start with clear data
          </h2>
          <div className="mt-8 inline-flex rounded-pill border border-border-soft bg-surface p-1">
            {(["before", "after"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative rounded-pill px-5 py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "text-white" : "text-ink-mid hover:text-ink"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="ba-pill"
                    className="absolute inset-0 rounded-pill bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {m === "before" ? "Before pondex_" : "After pondex_"}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl p-8 md:p-12 ${
                dark ? "bg-ink text-white" : "bg-surface text-ink"
              }`}
            >
              <h3 className={`text-2xl font-semibold md:text-3xl ${dark ? "text-white" : "text-ink"}`}>
                {data.title}
              </h3>
              <ul className="mt-6 grid gap-3 md:grid-cols-1">
                {data.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3 text-base"
                  >
                    <span
                      className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                        dark ? "bg-data/20 text-data" : "bg-urgency/15 text-urgency"
                      }`}
                    >
                      {dark ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    </span>
                    <span className={dark ? "text-white/85" : "text-ink-mid"}>{p}</span>
                  </motion.li>
                ))}
              </ul>
              <div className={`mt-8 grid gap-4 border-t pt-8 sm:grid-cols-2 ${dark ? "border-white/10" : "border-border-soft"}`}>
                {data.stats.map((s) => (
                  <div key={s.label}>
                    <div className={`text-4xl font-bold tracking-tight ${dark ? "text-data" : "text-urgency"}`}>
                      <CountUp to={s.value} suffix={s.suffix} duration={1.4} />
                    </div>
                    <div className={`mt-1 text-sm ${dark ? "text-white/60" : "text-ink-mid"}`}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
