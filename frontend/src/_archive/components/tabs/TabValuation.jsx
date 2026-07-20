import ValuationTile from '../tiles/ValuationTile';

export default function TabValuation({ ratios, keyMetrics, error }) {
  return <ValuationTile ratios={ratios} keyMetrics={keyMetrics} loading={false} error={error} />;
}
