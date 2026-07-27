const sources = ["Yahoo Finance", "SEC EDGAR", "Groq AI", "Alpha Vantage", "Finnhub", "IEX Cloud"];

export function TrustBar() {
  return (
    <section className="bg-ink py-8 text-white/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          Data from sources you can verify
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee flex w-max gap-3">
            {[...sources, ...sources, ...sources].map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-pill border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium"
              >
                <span className="size-1.5 rounded-full bg-data" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
