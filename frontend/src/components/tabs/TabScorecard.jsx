import ScoreHero from '../ScoreHero';

export default function TabScorecard({ scoreResult, ticker, company, onWriteThesis, onGenerateMemo }) {
  return (
    <ScoreHero
      result={scoreResult}
      ticker={ticker}
      company={company}
      onWriteThesis={onWriteThesis}
      onGenerateMemo={onGenerateMemo}
    />
  );
}
