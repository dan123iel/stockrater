import LandingNav from '../components/landing/LandingNav'
import Hero from '../components/landing/Hero'
import ProductDemo from '../components/landing/ProductDemo'
import HowItWorks from '../components/landing/HowItWorks'
import VerdictBanner from '../components/landing/VerdictBanner'
import Differentiation from '../components/landing/Differentiation'
import FeatureShowcase from '../components/landing/FeatureShowcase'
import ComparisonTeaser from '../components/landing/ComparisonTeaser'
import InvestorProfile from '../components/landing/InvestorProfile'
import Testimonials from '../components/landing/Testimonials'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'
import LandingFooter from '../components/landing/LandingFooter'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNav />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Aha-Moment — Demo mit AAPL vorgeladen */}
      <ProductDemo />

      {/* 3. How it works */}
      <HowItWorks />

      {/* 4. Verdict Banner — BUY/HOLD/SELL erklärt */}
      <VerdictBanner />

      {/* 5. Differentiation — vs. Yahoo/ChatGPT/Bloomberg */}
      <Differentiation />

      {/* 6. Features */}
      <FeatureShowcase />

      {/* 7. Comparison Teaser — AAPL vs MSFT + Sektor */}
      <ComparisonTeaser />

      {/* 8. Investor-Profil — Same stock, different score */}
      <InvestorProfile />

      {/* 9. Testimonials */}
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
