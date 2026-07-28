import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "404 — Page not found — pondex_" }],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-8xl font-black text-ink/10">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-ink-mid">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/85 transition-colors">
          ← Back to pondex_
        </Link>
      </div>
    </div>
  );
}
