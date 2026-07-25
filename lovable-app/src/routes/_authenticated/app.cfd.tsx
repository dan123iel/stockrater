import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/_authenticated/app/cfd")({
  head: () => ({ meta: [{ title: "CFD — pondex_" }, { name: "description", content: "CFD preview." }, { name: "robots", content: "noindex" }] }),
  component: CfdPage,
});

function CfdPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1000px] px-6 md:px-8 py-16">
        <p className="section-label">CFD</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Trade with leverage.</h1>
        <div
          className="mt-8 p-6 rounded-xl"
          style={{ background: "var(--badge-sell-bg)", color: "var(--badge-sell-text)" }}
        >
          <p className="text-sm font-semibold">⚠ Risk Warning</p>
          <p className="mt-2 text-sm">
            CFDs are complex instruments with a high risk of losing money due to leverage. Most retail investors lose money trading CFDs. pondex_ does not provide investment advice.
          </p>
        </div>
        <p className="mt-8 text-sm" style={{ color: "var(--text-secondary)" }}>
          CFD trading is coming Q4 2026. Preview data only — nothing on this page is live.
        </p>
      </div>
    </AppShell>
  );
}
