import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const stats = [
  { value: 10000, suffix: "+", label: "Active investors", format: "k" },
  { value: 250, prefix: "$", suffix: "M+", label: "Assets tracked" },
  { value: 99.9, suffix: "%", label: "Platform uptime", decimals: 1 },
  { value: 120, suffix: "+", label: "Markets covered" },
  { value: 1, suffix: "M+", label: "AI insights / month" },
];

export function Stats() {
  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            Platform stats
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Powering smarter investment decisions
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
                {s.format === "k" ? (
                  <>
                    <CountUp to={10} duration={1.8} />
                    K+
                  </>
                ) : (
                  <CountUp
                    to={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                    duration={1.8}
                  />
                )}
              </div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
