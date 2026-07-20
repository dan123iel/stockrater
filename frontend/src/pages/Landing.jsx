import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import ProductDemo from '../components/landing/ProductDemo'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
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

      {/* 1. Hero — Neugier wecken */}
      <Hero />

      {/* 2. Trust — Research-Zahlen + Quotes (Social Proof VOR Demo) */}
      <Testimonials />

      {/* 3. How it works — 3 Schritte */}
      <HowItWorks />

      {/* 4. Product Proof — Demo direkt */}
      <ProductDemo />

      {/* 5. Differenzierung — vs. Yahoo / ChatGPT / Bloomberg */}
      <Differentiation />

      {/* 6. Features — was genau bekommt man */}
      <FeatureShowcase />

      {/* 7. Pricing */}
      <Pricing />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Final CTA */}
      <FinalCTA />

      <LandingFooter />
    </div>
  )
}
