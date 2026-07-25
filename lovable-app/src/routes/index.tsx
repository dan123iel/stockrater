import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "pondex_ — One clear verdict for any stock" },
      { name: "description", content: "A 0–100 score for any stock. Every number cites its source. No noise — just a clear verdict in under 60 seconds." },
      { property: "og:title", content: "pondex_ — One clear verdict for any stock" },
      { property: "og:description", content: "A 0–100 score for any stock. Every number cites its source." },
    ],
  }),
  component: LandingPage,
});
