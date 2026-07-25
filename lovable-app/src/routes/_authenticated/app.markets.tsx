import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/app/StubPage";

export const Route = createFileRoute("/_authenticated/app/markets")({
  head: () => ({ meta: [{ title: "Markets — pondex_" }, { name: "description", content: "Top movers, collections, and market calendar." }, { name: "robots", content: "noindex" }] }),
  component: () => <StubPage label="Markets" title="What's moving today." description="Top movers, popular stocks, collections, and the market calendar are coming Q4 2026." />,
});
