import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/app/StubPage";

export const Route = createFileRoute("/_authenticated/app/robo")({
  head: () => ({ meta: [{ title: "Robo Advisor — pondex_" }, { name: "description", content: "Investing on autopilot." }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <StubPage
      label="Robo Advisor"
      title="Investing on autopilot."
      description="Automated portfolios in three flavours — Conservative (~5.1% p.a.), Core (~8.2% p.a.), Growth (~11.4% p.a.). Historical estimate only — not a guarantee. Coming Q4 2026."
    />
  ),
});
