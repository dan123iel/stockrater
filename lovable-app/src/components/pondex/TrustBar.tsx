const sources = ["Yahoo Finance", "SEC EDGAR", "Groq AI", "Alpha Vantage", "Finnhub", "IEX Cloud"];

export function TrustBar() {
  return (
    <section className="bg-white py-10 border-y border-border-soft">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-medium text-ink-mid tracking-widest uppercase mb-8">
          Trusted by investors · Data from sources you can verify
        </p>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {sources.map((s) => (
            <span
              key={s}
              className="text-base font-semibold text-ink/30 tracking-tight hover:text-ink/50 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
