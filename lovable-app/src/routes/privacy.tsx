import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — pondex_" },
      { name: "description", content: "Privacy policy for pondex_ — GDPR compliant, EU hosted, privacy-first." },
      { property: "og:title", content: "Privacy Policy — pondex_" },
      { property: "og:description", content: "Privacy policy for pondex_." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[720px] px-6 py-16">
        <Link to="/" className="text-lg font-bold">pondex_</Link>
        <p className="section-label mt-8">Privacy Policy</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>1. Data We Collect</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Email address (required for account)</li>
              <li>Investor profile answers (3 onboarding questions — optional)</li>
              <li>Watchlist tickers</li>
              <li>Daily verdict count</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>2. What We Do NOT Collect</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>No financial account data</li>
              <li>No trading history</li>
              <li>No payment data (Stripe handles payments directly)</li>
              <li>No device fingerprinting</li>
              <li>No third-party tracking without consent</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>3. How We Use Your Data</h2>
            <p className="mt-2">Email for authentication and product updates. Investor profile to personalize stock scores. We do not sell or share your data with third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>4. Analytics</h2>
            <p className="mt-2">We use privacy-first, cookie-free analytics hosted in the EU. No personal data collected. No cookie banner required.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>5. Data Storage</h2>
            <p className="mt-2">Data is stored in the EU. GDPR-compliant infrastructure with a signed Data Processing Agreement.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>6. Your Rights (GDPR)</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Right of access: request a copy of your data</li>
              <li>Right to rectification: correct inaccurate data</li>
              <li>Right to erasure: delete your account from the Account page</li>
              <li>Right to portability: export your data on request</li>
            </ul>
            <p className="mt-2">To exercise these rights: legal@pondex.app</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>7. Contact</h2>
            <p className="mt-2">pondex_ · legal@pondex.app · Germany</p>
          </section>
        </div>
      </div>
    </div>
  );
}
