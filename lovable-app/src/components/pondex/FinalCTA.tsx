import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-32 text-center">
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Ready to take your investing to the next level?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-mid">
            Leverage AI-driven insights and real-time data to track performance and make better decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_rgba(67,56,202,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-brand/95"
            >
              Start free trial <ArrowRight className="size-4" />
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-pill border border-ink/20 bg-white/70 px-5 py-3 text-sm font-semibold text-ink hover:bg-white/90 backdrop-blur-sm"
            >
              Try the live demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
