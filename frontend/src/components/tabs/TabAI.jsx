import AIInsightsTile from '../tiles/AllInsightsTile';

export default function TabAI({ ticker, scoreResult, profile, portfolio, thesis }) {
  return (
    <AIInsightsTile
      ticker={ticker}
      scoreResult={scoreResult}
      profile={profile}
      portfolio={portfolio}
      thesis={thesis}
    />
  );
}
