import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Request a Demo — pondex_" },
      { name: "description", content: "Request a demo of pondex_ — see the platform in action." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/" className="text-sm text-ink-mid hover:text-ink transition-colors">← Back to pondex_</Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink">Request a Demo</h1>
        <p className="mt-4 text-lg text-ink-mid">This page is coming soon.</p>
      </div>
    </div>
  );
}
