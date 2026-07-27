export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-tight ${className}`}>
      <span className="mr-1.5 grid size-6 place-items-center rounded-md bg-brand text-brand-foreground text-[11px] font-bold">
        p_
      </span>
      <span>pondex</span>
      <span className="text-brand">_</span>
    </span>
  );
}
