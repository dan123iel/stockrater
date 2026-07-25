import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — pondex_" },
      { name: "description", content: "Terms of Service for pondex_ — a financial research tool." },
      { property: "og:title", content: "Terms of Service — pondex_" },
      { property: "og:description", content: "Terms of Service for pondex_." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[720px] px-6 py-16">
        <Link to="/" className="text-lg font-bold">pondex_</Link>
        <p className="section-label mt-8">Terms of Service</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Last updated: July 2026 · Governing law: Germany</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">1. Service Description</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>pondex_ is a financial research tool that provides algorithmic stock analysis scores. It is not a licensed investment advisor. All content is for informational purposes only and does not constitute investment advice.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">2. Data Sources</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>Scores are computed using data from Yahoo Finance and SEC EDGAR. AI-generated explanations use Groq AI (Llama 3.3). Data accuracy is not guaranteed.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">3. No Investment Advice</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>pondex_ scores and signals (BUY/HOLD/SELL) are research tools only. All investment decisions are made solely by the user. pondex_ accepts no liability for investment outcomes.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">4. Free Tier Limitations</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>Free accounts are limited to 1 full analysis per day. This limit resets at midnight UTC.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">5. Account &amp; Data</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>We store only your email address and investor profile preferences. You may delete your account at any time from the Account page.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">6. GDPR Rights (EU Users)</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>You have the right to access, correct, and delete your personal data. To exercise these rights, contact: legal@pondex.app</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">7. Changes</h2>
            <p className="mt-2" style={{ color: "var(--text-secondary)" }}>We may update these terms. Continued use after changes constitutes acceptance.</p>
          </section>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}><strong>Contact:</strong> legal@pondex.app</p>
        </div>
      </div>
    </div>
  );
}
