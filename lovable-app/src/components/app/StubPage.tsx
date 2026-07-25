import { AppShell } from "@/components/app/AppShell";

export function StubPage({
  label,
  title,
  description,
  disclaimer,
}: {
  label: string;
  title: string;
  description: string;
  disclaimer?: string;
}) {
  return (
    <AppShell>
      <div className="mx-auto max-w-[900px] px-6 md:px-8 py-16">
        <p className="section-label">{label}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-base" style={{ color: "var(--text-secondary)" }}>{description}</p>
        {disclaimer && (
          <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>{disclaimer}</p>
        )}
      </div>
    </AppShell>
  );
}
