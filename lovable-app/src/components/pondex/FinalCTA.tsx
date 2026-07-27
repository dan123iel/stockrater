import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ready to invest smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Join investors using AI insights and real-time data to track portfolios and make better financial decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_rgba(91,91,214,0.7)] transition-transform hover:-translate-y-0.5 hover:bg-brand/95"
            >
              Start free trial <ArrowRight className="size-4" />
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Try the live demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
