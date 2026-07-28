import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/pondex/Nav";
import { FinalCTA } from "@/components/pondex/FinalCTA";
import { Footer } from "@/components/pondex/Footer";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "404 — Page not found — pondex_" }],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        {/* Main card */}
        <div className="rounded-3xl overflow-hidden bg-surface/60 border border-border-soft">
          {/* Top content */}
          <div className="px-8 pt-12 pb-8 text-center">
            <span className="inline-flex items-center rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-medium text-ink-mid">
              Something went wrong
            </span>
            <p className="mt-6 text-[clamp(5rem,15vw,9rem)] font-black leading-none tracking-tighter text-ink">
              404
            </p>
            <h1 className="mt-2 text-2xl font-bold text-ink">Page not found</h1>
            <p className="mt-2 text-base text-ink-mid">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand pl-3 pr-5 py-2.5 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/20">
                <ArrowLeft className="size-3.5" />
              </span>
              Back to home
            </Link>
          </div>

          {/* Bottom landscape image */}
          <div
            className="h-48 w-full"
            style={{
              backgroundImage: "url('/stockrater/hero-landscape.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
            }}
          />
        </div>
      </div>

      {/* FinalCTA + Footer */}
      <div
        style={{
          backgroundImage: "url('/stockrater/hero-landscape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
