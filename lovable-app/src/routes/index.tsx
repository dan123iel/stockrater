import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/pondex/Nav";
import { BlurMask } from "@/components/pondex/BlurMask";
import { Hero } from "@/components/pondex/Hero";
import { TrustBar } from "@/components/pondex/TrustBar";
import { VerdictBanner } from "@/components/pondex/VerdictBanner";
import { BeforeAfter } from "@/components/pondex/BeforeAfter";
import { Features } from "@/components/pondex/Features";
import { DashboardPreview } from "@/components/pondex/DashboardPreview";
import { InvestorProfile } from "@/components/pondex/InvestorProfile";
import { HowItWorks } from "@/components/pondex/HowItWorks";
import { CompareTeaser } from "@/components/pondex/CompareTeaser";
import { Security } from "@/components/pondex/Security";
import { UseCases } from "@/components/pondex/UseCases";
import { Stats } from "@/components/pondex/Stats";
import { Testimonials } from "@/components/pondex/Testimonials";
import { Pricing } from "@/components/pondex/Pricing";
import { FAQ } from "@/components/pondex/FAQ";
import { FinalCTA } from "@/components/pondex/FinalCTA";
import { Footer } from "@/components/pondex/Footer";

const title = "pondex_ — A 0–100 score for any stock";
const description =
  "Too much data. No clear answer. pondex_ ends that. A 0–100 score for any stock. Five factors. Every number sourced.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <BlurMask />
      <Hero />
      <TrustBar />
      <VerdictBanner />
      <BeforeAfter />
      <Features />
      <DashboardPreview />
      <InvestorProfile />
      <HowItWorks />
      <CompareTeaser />
      <Security />
      <UseCases />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <div
        style={{
          backgroundImage: "url('/stockrater/hero-landscape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local",
        }}
      >
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
