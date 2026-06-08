import { createFileRoute } from "@tanstack/react-router";
import { OsShell } from "@/components/os/OsShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "~/josh | Joshua S Portfolio" },
      {
        name: "description",
        content:
          "Joshua S Portfolio — AI Engineer & B.Tech AI/DS student. Agentic systems, LLM orchestration, and production AI shipped from Coimbatore, India.",
      },
      { property: "og:title", content: "~/josh | Joshua S Portfolio" },
      {
        property: "og:description",
        content: "Joshua S Portfolio: Agentic systems, LLM orchestration, and production AI.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <OsShell />;
}
