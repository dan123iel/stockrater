import { motion } from "framer-motion";

const stats = [
  { value: "91",  label: "Investors surveyed" },
  { value: "71%", label: "Trust only sourced AI" },
  { value: "45",  label: "In-depth interviews" },
  { value: "#1",  label: "Signal/noise pain point" },
];

export function TrustedBy() {
  return (
    <section style={{ background: "#0a0a0a", padding: "48px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontFamily: "'Chivo Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.14em", textAlign: "center", marginBottom: 32, margin: "0 0 32px" }}>
          Trusted by investors · Built on real research
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              style={{
                textAlign: "center", padding: "0 40px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 32, fontWeight: 500, color: "#fff", margin: "0 0 4px", letterSpacing: "-1.5px" }}>{s.value}</p>
              <p style={{ fontFamily: "'Chivo Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "'Chivo Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Data from</span>
          {["Yahoo Finance", "SEC EDGAR", "Groq AI"].map(src => (
            <span key={src} style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "-0.2px" }}>{src}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
