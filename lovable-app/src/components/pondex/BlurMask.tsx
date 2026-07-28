export function BlurMask() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24"
      style={{
        maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        backdropFilter: "blur(12px)",
      }}
    />
  );
}
