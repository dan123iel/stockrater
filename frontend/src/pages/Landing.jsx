import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import ProductDemo from '../components/landing/ProductDemo'
import HowItWorks from '../components/landing/HowItWorks'
import Placeholder from '../components/landing/Placeholder'
import Differentiation from '../components/landing/Differentiation'
import FeatureShowcase from '../components/landing/FeatureShowcase'
import Testimonials from '../components/landing/Testimonials'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'
import LandingFooter from '../components/landing/LandingFooter'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNav />

      {/* 1. Hero — clean fullscreen, Headline + CTA */}
      <Hero />

      {/* 2. Aha-Moment — Demo mit AAPL vorgeladen, sofort interaktiv */}
      <ProductDemo />

      {/* 3. How it works — 3 Schritte, erklärt den Prozess */}
      <HowItWorks />

      {/* 4. PLACEHOLDER: Verdict Banner — Buy/Hold/Sell Erklärung
          Jetzt sinnvoll: User hat Demo gesehen + Prozess verstanden
          Research: José — Klartextempfehlung ist der Conversion-Trigger */}
      <Placeholder
        id="verdict-banner"
        title="Buy / Hold / Sell — Was bedeutet das für dich?"
        why="José Interview: vertraut Gemini wegen Klartextempfehlung. Nach Demo + HowItWorks verstehen User jetzt was der Verdict bedeutet."
        height="160px"
      />

      {/* 5. Differentiation — Warum nicht Yahoo/ChatGPT/Bloomberg */}
      <Differentiation />

      {/* 6. Features — Was bekommt man konkret */}
      <FeatureShowcase />

      {/* 7. PLACEHOLDER: Comparison Feature Teaser
          Research: stärkste Reaktion aller 3 Interviews
          José: "That's how you actually make a decision." */}
      <Placeholder
        id="comparison-teaser"
        title="Peer Comparison — AAPL vs. MSFT vs. Sector Average"
        why="Stärkste positive Reaktion aller User-Tests. Pro-Feature Teaser: 2 Stocks + Sektor-Durchschnitt nebeneinander."
        height="280px"
      />

      {/* 8. PLACEHOLDER: Investor-Profil Erklärung
          Research: Patricia — "Das Tool muss mich kennen"
          Score wird zu deiner Strategie gewichtet */}
      <Placeholder
        id="investor-profile"
        title="Dein Score — gewichtet nach deiner Strategie"
        why="Differenziator: Value-Investor bekommt anderen Score als Growth-Investor. Patricia: das Tool muss mich kennen."
        height="220px"
      />

      {/* 9. Testimonials — Social Proof (jetzt nach Features: User versteht was er sieht) */}
      <Testimonials />

      {/* 10. Pricing */}
      <Pricing />

      {/* 11. FAQ */}
      <FAQ />

      {/* 12. Final CTA */}
      <FinalCTA />

      <LandingFooter />
    </div>
  )
}
