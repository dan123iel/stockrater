import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Shield, Zap } from "lucide-react";
import { ScoreCard } from "./ScoreCard";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/stockrater/hero-mountains.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/55" aria-hidden />
      {/* Fade top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" aria-hidden />
      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/70 to-transparent" aria-hidden />

      {/* Content — centered like FintechX */}
      <div className="relative mx-auto max-w-4xl px-6 pt-36 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-white/80 px-3 py-1 text-xs font-medium text-ink-mid backdrop-blur mb-6">
            <Sparkles className="size-3.5 text-brand" />
            AI-Powered Stock Research
          </div>

          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
            One verdict.<br />
            <span className="text-brand">Every stock. Always sourced.</span>
          </h1>

          <p className="mt-5 text-lg text-ink-mid max-w-xl mx-auto">
            Stop drowning in data. Get a clear 0–100 score for any stock — five factors, every number cited.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_rgba(67,56,202,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-brand/95"
            >
              Analyse a stock — it's free <ArrowRight className="size-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-pill border border-border-soft bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink hover:bg-white backdrop-blur"
            >
              See how it works
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-mid">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" /> 4.9/5 Rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="size-4 text-data" /> Bank-level security
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="size-4 text-urgency" /> Real-time insights
            </span>
          </div>
        </motion.div>

        {/* Dashboard mockup below — like FintechX */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 relative"
        >
          <ScoreCard />
        </motion.div>
      </div>
    </section>
  );
}
