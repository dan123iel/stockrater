import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Imprint — pondex_" },
      { name: "description", content: "Legal imprint for pondex_." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/" className="text-sm text-ink-mid hover:text-ink transition-colors">← Back to pondex_</Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink">Imprint</h1>
        <p className="mt-4 text-lg text-ink-mid">This page is coming soon.</p>
      </div>
    </div>
  );
}
