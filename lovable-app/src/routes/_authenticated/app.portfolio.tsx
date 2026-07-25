import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/app/StubPage";

export const Route = createFileRoute("/_authenticated/app/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — pondex_" }, { name: "description", content: "Your investments and watchlist." }, { name: "robots", content: "noindex" }] }),
  component: () => <StubPage label="Portfolio" title="Your investments." description="Positions, watchlist, and transaction history are coming Q4 2026." />,
});
