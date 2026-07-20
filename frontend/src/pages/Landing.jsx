import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import ScoreCardSection from '../components/landing/ScoreCardSection'
import Placeholder from '../components/landing/Placeholder'
import Testimonials from '../components/landing/Testimonials'
import HowItWorks from '../components/landing/HowItWorks'
import ProductDemo from '../components/landing/ProductDemo'
import Differentiation from '../components/landing/Differentiation'
import FeatureShowcase from '../components/landing/FeatureShowcase'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'
import LandingFooter from '../components/landing/LandingFooter'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNav />

      {/* 1. Hero — clean fullscreen, Headline + CTA + Partikel */}
      <Hero />

      {/* 2. "Aha"-Moment — Score Card mit Gauge animiert rein */}
      <ScoreCardSection />

      {/* ── PLACEHOLDER: Buy/Hold/Sell Verdict Banner ─────────────────────────
          Research: José sagte er vertraut Gemini wegen Klartextempfehlung.
          Zeigen: große klare Aussage "HOLD · 78/100 · Good Fit"
          Format: Fullwidth Banner, schwarz, große Typografie
          ──────────────────────────────────────────────────────────────────── */}
      <Placeholder
        id="verdict-banner"
        title="Buy / Hold / Sell — Plain Verdict Banner"
        why="José Interview: vertraut Gemini wegen Klartextempfehlung. Research Council MVP-Requirement M1: verdict muss Richtung (Buy/Hold/Sell) zeigen, nicht nur Zahl."
        height="160px"
      />

      {/* 3. Social Proof — Testimonials aus echten Interviews */}
      <Testimonials />

      {/* 4. How it works — 3 Schritte */}
      <HowItWorks />

      {/* ── PLACEHOLDER: Comparison Feature Teaser ────────────────────────────
          Research: stärkste positive Reaktion in ALLEN User-Tests (Gunnar, Patricia, José).
          José: "I really like the comparison part. That's how you actually make a decision."
          Zeigen: 2 Aktien nebeneinander + Sektor-Durchschnitt als dritte Spalte
          Format: Interaktive Demo oder Screenshot, prominent platziert
          ──────────────────────────────────────────────────────────────────── */}
      <Placeholder
        id="comparison-teaser"
        title="Peer Comparison Feature — Side-by-Side Demo"
        why="Stärkste Reaktion aller 3 Interviews + Wave 2. Zeige AAPL vs MSFT + Sektor-Average. Das ist das Killer-Feature für den Pro-Upgrade-Trigger."
        height="300px"
      />

      {/* 5. Interaktive Demo — Ticker eingeben */}
      <ProductDemo />

      {/* ── PLACEHOLDER: Investor-Profil Erklärung ────────────────────────────
          Research: Score ist zu deiner Strategie gewichtet (Value/Growth/Dividend/Momentum).
          Das steht nirgends auf der LP — aber ist ein Differenziator.
          Zeigen: 4 Investor-Typen mit je einem anderen Score-Ergebnis für dieselbe Aktie
          Format: Vergleichs-Grid oder Tab-Auswahl
          ──────────────────────────────────────────────────────────────────── */}
      <Placeholder
        id="investor-profile"
        title="Dein Score — gewichtet nach deiner Strategie"
        why="Differenziator: Value-Investor bekommt anderen Score als Growth-Investor für dieselbe Aktie. Patricia: 'Das Tool muss mich kennen.' Noch nie auf der LP kommuniziert."
        height="240px"
      />

      {/* 6. Differenzierung — vs. Yahoo / ChatGPT / Bloomberg */}
      <Differentiation />

      {/* 7. Features */}
      <FeatureShowcase />

      {/* 8. Pricing */}
      <Pricing />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Final CTA */}
      <FinalCTA />

      <LandingFooter />
    </div>
  )
}
