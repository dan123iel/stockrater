import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const stats = [
  { value: 91,   suffix: "",  label: "Investors surveyed",    format: "" },
  { value: 71,   suffix: "%", label: "Trust only sourced AI", format: "" },
  { value: 45,   suffix: "",  label: "In-depth interviews",   format: "" },
  { value: 93,   suffix: "%", label: "Say process is broken", format: "" },
  { value: 2,    suffix: "",  label: "Named data sources",    format: "" },
];

export function Stats() {
  return (
    <section className="bg-ink py-32 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            Platform stats
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Built on real research
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
                <CountUp
                  to={s.value}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                  duration={1.8}
                />
              </div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
