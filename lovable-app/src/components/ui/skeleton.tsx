import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton rounded-md", className)} {...props} />;
}

function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: "20px 22px" }} aria-busy="true">
      <Skeleton style={{ width: "40%", height: 14 }} />
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} style={{ width: i % 2 === 0 ? "100%" : "70%", height: 12 }} />
        ))}
      </div>
    </div>
  );
}

function SkeletonStatCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <Skeleton style={{ width: 40, height: 40, borderRadius: 10 }} />
            <Skeleton style={{ width: 60, height: 14 }} />
          </div>
          <Skeleton style={{ width: "60%", height: 12 }} />
          <Skeleton style={{ width: "80%", height: 24, marginTop: 8 }} />
        </div>
      ))}
    </div>
  );
}

function SkeletonTable({ rows = 4, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0" }} aria-busy="true">
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, padding: "12px 20px", borderBottom: "1px solid #f0f0f0", gap: 12 }}>
        {Array.from({ length: cols }).map((_, i) => <Skeleton key={i} style={{ height: 10 }} />)}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, padding: "14px 20px", borderBottom: "1px solid #f8f8f8", gap: 12, alignItems: "center" }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} style={{ height: 12, width: c === 0 ? "80%" : "60%" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkeletonChart() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0f0", padding: "16px", height: 220 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[1,2,3,4,5].map(i => <Skeleton key={i} style={{ width: 40, height: 26, borderRadius: 20 }} />)}
      </div>
      <Skeleton style={{ width: "100%", height: 160, borderRadius: 8 }} />
    </div>
  );
}

function SkeletonStockHeader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton style={{ width: 48, height: 48, borderRadius: 12 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton style={{ width: 120, height: 20 }} />
          <Skeleton style={{ width: 80, height: 12 }} />
        </div>
      </div>
      <Skeleton style={{ width: 160, height: 36 }} />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonStatCards, SkeletonTable, SkeletonChart, SkeletonStockHeader };
