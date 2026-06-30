import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getFitLabel, getCoverageLabel } from '../lib/scoring';

const FACTOR_LABELS = {
  ratios: 'Financial Health',
  management: 'Management',
  moat: 'Competitive Moat',
  esgRisk: 'Risk',
  valuation: 'Valuation',
};

function scoreColor(s) {
  if (s === null || s === undefined) return 'var(--color-muted)';
  if (s >= 4.0) return 'var(--color-intact)';
  if (s >= 2.5) return 'var(--color-ink)';
  return 'var(--color-warning)';
}

function SourceTag({ source }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.06em',
      color: 'var(--color-muted)', opacity: .6, display: 'block', marginTop: '2px',
    }}>
      {source}
    </span>
  );
}

function FactorRow({ factorKey, label, score, explanation, metrics, expanded, onToggle }) {
  const hasData = score !== null && score !== undefined;
  const sourcesForFactor = metrics || [];

  return (
    <div style={{ borderBottom: '0.5px solid var(--color-divider)', paddingBottom: '12px', marginBottom: '12px' }}>
      {/* Explanation first — the survey insight */}
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '12px', lineHeight: 1.55,
        color: 'var(--color-ink)', opacity: .75, marginBottom: '8px',
      }}>
        {explanation || 'Not enough data.'}
      </div>

      {/* Score row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: hasData ? scoreColor(score) : 'var(--color-faint)' }}>
            {hasData ? score.toFixed(1) : '—'}
          </span>
          {sourcesForFactor.length > 0 && (
            <button
              onClick={onToggle}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: 'var(--color-muted)', opacity: .5, display: 'flex', alignItems: 'center' }}
              title="Show sources"
            >
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
          )}
        </div>
      </div>

      {/* Sources — expandable */}
      {expanded && sourcesForFactor.length > 0 && (
        <div style={{ marginTop: '8px', paddingLeft: '8px', borderLeft: '2px solid var(--color-divider)' }}>
          {sourcesForFactor.map((m, i) => (
            <div key={i} style={{ marginBottom: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-ink)', opacity: .7 }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-ink)' }}>{m.value ?? '—'}</span>
              </div>
              <SourceTag source={m.source} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ScoreHero({ result, ticker, company, onWriteThesis, onGenerateMemo }) {
  const { fitScore, confidence, scores, explanations, sources } = result;
  const [expandedFactor, setExpandedFactor] = useState(null);

  const toggleFactor = (key) => setExpandedFactor(expandedFactor === key ? null : key);

  const metricsFor = (factorKey) => {
    const entry = (sources || []).find(s => s.factor === factorKey);
    return entry?.metrics || [];
  };

  return (
    <div className="score-panel">

      {/* Company */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, lineHeight: 1.2, marginBottom: '4px' }}>
          {company?.companyName || ticker}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.08em', color: 'var(--color-muted)', marginBottom: '4px' }}>
          {[ticker, company?.exchangeShortName, company?.currency].filter(Boolean).join(' · ')}
        </div>
        {company?.price && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-muted)', marginTop: '2px' }}>
            ${parseFloat(company.price).toFixed(2)}
          </div>
        )}
      </div>

      <div style={{ height: '1px', background: 'var(--color-divider)', marginBottom: '20px' }} />

      {/* Factor rows — explanation first, score as conclusion */}
      <div style={{ marginBottom: '20px' }}>
        {Object.entries(FACTOR_LABELS).map(([key, label]) => (
          <FactorRow
            key={key}
            factorKey={key}
            label={label}
            score={scores[key]}
            explanation={(explanations || {})[key]}
            metrics={metricsFor(key)}
            expanded={expandedFactor === key}
            onToggle={() => toggleFactor(key)}
          />
        ))}
      </div>

      {/* Score — verdict, shown after all factors */}
      <div style={{ height: '1px', background: 'var(--color-divider)', marginBottom: '20px' }} />
      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          Overall Score
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          {getFitLabel(fitScore)}
        </div>
      </div>
      <div className="score-number" style={{ marginTop: 0, marginBottom: '4px' }}>{fitScore.toFixed(1)}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-muted)', opacity: .5, marginBottom: '16px' }}>
        out of 5.0 · {company?.strategy || 'Growth'} · 3–5yr
      </div>

      {/* Confidence */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          <span>Data Coverage</span>
          <span>{confidence}% · {getCoverageLabel(confidence)}</span>
        </div>
        <div className="conf-bar-track">
          <div className="conf-bar-fill" style={{ width: `${confidence}%` }} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button className="btn-paper-primary" onClick={onWriteThesis}>Write Thesis</button>
        {onGenerateMemo && (
          <button className="btn-paper-ghost" onClick={onGenerateMemo}>Investment Memo</button>
        )}
      </div>
    </div>
  );
}
