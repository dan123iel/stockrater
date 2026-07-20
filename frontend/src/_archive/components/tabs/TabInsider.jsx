import InsiderTile from '../tiles/InsiderTile';

export default function TabInsider({ trades, error }) {
  return <InsiderTile trades={trades} loading={false} error={error} />;
}
