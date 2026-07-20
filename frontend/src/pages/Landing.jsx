import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import ScoreCardSection from '../components/landing/ScoreCardSection'
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

      {/* 1. Hero — clean, fullscreen, nur Headline + CTA + Trust */}
      <Hero />

      {/* 2. "Aha"-Moment — Score Card scrollt elegant rein */}
      <ScoreCardSection />

      {/* 3. Social Proof — Testimonials */}
      <Testimonials />

      {/* 4. How it works — 3 Schritte */}
      <HowItWorks />

      {/* 5. Interaktive Demo */}
      <ProductDemo />

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
