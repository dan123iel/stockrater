import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles.css";
import { Nav } from "../src/components/pondex/Nav";
import { Hero } from "../src/components/pondex/Hero";
import { TrustBar } from "../src/components/pondex/TrustBar";
import { BeforeAfter } from "../src/components/pondex/BeforeAfter";
import { Features } from "../src/components/pondex/Features";
import { DashboardPreview } from "../src/components/pondex/DashboardPreview";
import { HowItWorks } from "../src/components/pondex/HowItWorks";
import { Security } from "../src/components/pondex/Security";
import { UseCases } from "../src/components/pondex/UseCases";
import { Stats } from "../src/components/pondex/Stats";
import { Testimonials } from "../src/components/pondex/Testimonials";
import { Pricing } from "../src/components/pondex/Pricing";
import { FAQ } from "../src/components/pondex/FAQ";
import { FinalCTA } from "../src/components/pondex/FinalCTA";
import { Footer } from "../src/components/pondex/Footer";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <Security />
      <UseCases />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
