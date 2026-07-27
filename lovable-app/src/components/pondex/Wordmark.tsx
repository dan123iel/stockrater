export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/stockrater/pondex-logo.png"
      alt="pondex_"
      className={`object-contain ${className}`}
      style={{ height: "28px", width: "auto" }}
    />
  );
}
