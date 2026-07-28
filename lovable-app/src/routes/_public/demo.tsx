import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/demo")({
  head: () => ({
    meta: [{ title: "Request a Demo — pondex_" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <h1 className="text-4xl font-bold tracking-tight text-ink">Request a Demo</h1>
      <p className="mt-4 text-lg text-ink-mid">This page is coming soon.</p>
    </div>
  );
}
