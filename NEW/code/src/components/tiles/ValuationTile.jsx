import { useState } from 'react';

const fmt = (v, format) => {
  if (v === null || v === undefined || isNaN(v) || !isFinite(v)) return null;
  if (format === 'pct') return `${(v * 100).toFixed(1)}%`;
  if (format === 'x') return `${v.toFixed(1)}×`;
  return v.toFixed(2);
};

const Row = ({ label, value, format }) => {
  const display = fmt(value, format);
  return (
    <div className="val-row">
      <span className="val-row-label">{label}</span>
      {display !== null
        ? <span className="val-row-value">{display}</span>
        : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', opacity: 0.25 }}>—</span>
      }
    </div>
  );
};

export default function ValuationTile({ ratios, keyMetrics, loading, error, compact }) {
  const [activeTab, setActiveTab] = useState('valuation');

  if (loading) return <div style={{ padding: '20px', opacity: 0.4 }}>Loading…</div>;
  if (error) return <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4 }}>{error}</div>;

  if (compact) {
    return (
      <div style={{ padding: '4px 20px 16px' }}>
        <Row label="P/E" value={ratios?.peRatio} format="x" />
        <Row label="EV/EBITDA" value={ratios?.enterpriseValueMultiple} format="x" />
        <Row label="P/S" value={ratios?.priceToSalesRatio} format="x" />
        <Row label="FCF Yield" value={keyMetrics?.freeCashFlowYield} format="pct" />
        <Row label="Gross Margin" value={ratios?.grossProfitMargin} format="pct" />
      </div>
    );
  }

  const tabs = [{ id: 'valuation', label: 'Valuation' }, { id: 'profitability', label: 'Profitability' }, { id: 'liquidity', label: 'Liquidity' }];
  return (
    <div>
      <div className="flex" style={{ borderBottom: '0.5px solid var(--color-divider)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="mono-label px-5 py-3" style={{ background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === tab.id ? '1.5px solid var(--color-signal)' : '1.5px solid transparent', color: activeTab === tab.id ? 'var(--color-signal)' : 'var(--color-ink)', opacity: activeTab === tab.id ? 1 : 0.5, marginBottom: '-0.5px' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '4px 20px 16px' }}>
        {activeTab === 'valuation' && (<><Row label="P/E Ratio" value={ratios?.peRatio} format="x" /><Row label="EV/EBITDA" value={ratios?.enterpriseValueMultiple} format="x" /><Row label="Price/Sales" value={ratios?.priceToSalesRatio} format="x" /><Row label="FCF Yield" value={keyMetrics?.freeCashFlowYield} format="pct" /><Row label="Dividend Yield" value={ratios?.dividendYield} format="pct" /></>)}
        {activeTab === 'profitability' && (<><Row label="Gross Margin" value={ratios?.grossProfitMargin} format="pct" /><Row label="Operating Margin" value={ratios?.operatingProfitMargin} format="pct" /><Row label="Net Margin" value={ratios?.netProfitMargin} format="pct" /><Row label="Return on Equity" value={ratios?.returnOnEquity} format="pct" /></>)}
        {activeTab === 'liquidity' && (<><Row label="Current Ratio" value={ratios?.currentRatio} format="x" /><Row label="Debt/Equity" value={ratios?.debtEquityRatio} format="x" /><Row label="Interest Coverage" value={ratios?.interestCoverage} format="x" /></>)}
      </div>
    </div>
  );
}
