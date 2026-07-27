import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Shield, Zap } from "lucide-react";
import { ScoreCard } from "./ScoreCard";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      style={{
        backgroundImage: "url('/stockrater/hero-mountains.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle white overlay so text stays readable */}
      <div className="absolute inset-0 bg-white/55" aria-hidden />
      {/* Fade to white at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(91,91,214,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,194,168,0.10), transparent 45%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-white/80 px-3 py-1 text-xs font-medium text-ink-mid backdrop-blur">
            <Sparkles className="size-3.5 text-brand" />
            AI-Powered Stock Research
          </div>
          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-tight text-ink">
            Too much data.{" "}
            <span className="text-ink-mid">No clear answer.</span>{" "}
            <span className="whitespace-nowrap">
              <span className="text-brand">pondex</span>
              <span className="text-brand">_</span>
            </span>{" "}
            ends that.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-mid">
            A 0–100 score for any stock. Five factors. Every number sourced.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_rgba(91,91,214,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-brand/95"
            >
              Analyse a stock — it's free <ArrowRight className="size-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-pill border border-border-soft bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              See how it works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-mid">
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
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <ScoreCard />
        </motion.div>
      </div>
    </section>
  );
}
