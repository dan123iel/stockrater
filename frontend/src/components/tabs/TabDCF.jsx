import DCFTile from '../tiles/DCFTile';

export default function TabDCF({ profile, keyMetrics, incomeStatements }) {
  return (
    <DCFTile
      profile={profile}
      keyMetrics={keyMetrics}
      incomeStatements={incomeStatements}
      loading={false}
      error={!profile ? 'Insufficient data' : null}
    />
  );
}
