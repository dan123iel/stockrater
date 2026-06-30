// pondex Scoring Engine — client-side, profile-adjusted weights

export const PROFILE_WEIGHTS = {
  default:  { ratios: 65, management: 12, moat: 10, esgRisk: 8,  valuation: 5  },
  value:    { ratios: 70, management: 12, moat: 10, esgRisk: 8,  valuation: 0  },
  growth:   { ratios: 60, management: 10, moat: 15, esgRisk: 5,  valuation: 10 },
  dividend: { ratios: 55, management: 12, moat: 10, esgRisk: 13, valuation: 10 },
  momentum: { ratios: 50, management: 8,  moat: 10, esgRisk: 7,  valuation: 25 },
};

const safe = (val) => val !== null && val !== undefined && !isNaN(val) && isFinite(val);

const scoreThreshold = (val, bad, mid, good) => {
  if (!safe(val)) return null;
  if (val >= good) return 5;
  if (val >= mid) return 3 + 2 * ((val - mid) / (good - mid));
  if (val >= bad) return 1 + 2 * ((val - bad) / (mid - bad));
  return Math.max(0, val / bad);
};

const scoreThresholdInverse = (val, good, mid, bad) => {
  if (!safe(val)) return null;
  if (val <= good) return 5;
  if (val <= mid) return 3 + 2 * ((mid - val) / (mid - good));
  if (val <= bad) return 1 + 2 * ((bad - val) / (bad - mid));
  return Math.max(0, 1 - (val - bad) / bad);
};

export const calculateScore = (data, profile) => {
  const { ratios, keyMetrics, profile: companyProfile, incomeStatements, insiderTrades } = data;
  const weights = PROFILE_WEIGHTS[profile?.strategy?.toLowerCase()] || PROFILE_WEIGHTS.default;
  const scores = {};
  const inputs = {};

  const pe = ratios?.peRatio;
  const grossMargin = ratios?.grossProfitMargin;
  const operatingMargin = ratios?.operatingProfitMargin;
  const fcfYield = keyMetrics?.freeCashFlowYield;
  const revenueGrowth = incomeStatements?.length >= 2 ? (incomeStatements[0]?.revenue - incomeStatements[1]?.revenue) / Math.abs(incomeStatements[1]?.revenue) : null;

  const ratioScores = [
    scoreThresholdInverse(pe, 10, 25, 50),
    scoreThreshold(grossMargin, 0.2, 0.4, 0.6),
    scoreThreshold(operatingMargin, 0.05, 0.15, 0.25),
    scoreThreshold(fcfYield, 0.01, 0.04, 0.08),
    scoreThreshold(revenueGrowth, 0, 0.1, 0.25),
  ].filter(s => s !== null);
  scores.ratios = ratioScores.length > 0 ? ratioScores.reduce((a, b) => a + b, 0) / ratioScores.length : null;

  const insiderBuys = insiderTrades?.filter(t => t.transactionType === 'P-Purchase')?.length || 0;
  const insiderSells = insiderTrades?.filter(t => t.transactionType === 'S-Sale')?.length || 0;
  const totalInsider = insiderBuys + insiderSells;
  scores.management = totalInsider > 0 ? scoreThreshold(insiderBuys / totalInsider, 0.1, 0.3, 0.6) : null;

  const grossMarginTrend = incomeStatements?.length >= 2
    ? (incomeStatements[0]?.grossProfit / incomeStatements[0]?.revenue) - (incomeStatements[1]?.grossProfit / incomeStatements[1]?.revenue)
    : null;
  const moatScores = [
    scoreThreshold(grossMargin, 0.2, 0.4, 0.6),
    safe(grossMarginTrend) ? (grossMarginTrend > 0 ? 5 : grossMarginTrend > -0.05 ? 3 : 1) : null,
  ].filter(s => s !== null);
  scores.moat = moatScores.length > 0 ? moatScores.reduce((a, b) => a + b, 0) / moatScores.length : null;

  scores.esgRisk = scoreThresholdInverse(companyProfile?.beta, 0.5, 1.2, 2.5);

  const valScores = [
    scoreThresholdInverse(ratios?.enterpriseValueMultiple, 8, 20, 40),
    scoreThresholdInverse(ratios?.priceToSalesRatio, 2, 5, 15),
  ].filter(s => s !== null);
  scores.valuation = valScores.length > 0 ? valScores.reduce((a, b) => a + b, 0) / valScores.length : null;

  let totalScore = 0, totalWeight = 0;
  for (const [key, wKey] of [['ratios','ratios'],['management','management'],['moat','moat'],['esgRisk','esgRisk'],['valuation','valuation']]) {
    if (scores[key] !== null && scores[key] !== undefined) { totalScore += scores[key] * weights[wKey]; totalWeight += weights[wKey]; }
  }
  const fitScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  const allInputs = [pe, grossMargin, operatingMargin, fcfYield, revenueGrowth, totalInsider > 0 ? insiderBuys / totalInsider : null, grossMarginTrend, companyProfile?.beta, ratios?.enterpriseValueMultiple, ratios?.priceToSalesRatio, ratios?.dividendYield, ratios?.debtToEquity, ratios?.currentRatio, ratios?.returnOnEquity, ratios?.returnOnAssets, keyMetrics?.marketCap, keyMetrics?.enterpriseValue, keyMetrics?.evToFreeCashFlow, companyProfile?.sector, companyProfile?.industry, companyProfile?.country, companyProfile?.currency, companyProfile?.price, companyProfile?.mktCap, companyProfile?.description, incomeStatements?.[0]?.revenue, incomeStatements?.[0]?.netIncome];
  const validCount = allInputs.filter(v => safe(v) || (typeof v === 'string' && v.length > 0)).length;

  return { fitScore: Math.min(5, Math.max(0, parseFloat(fitScore.toFixed(2)))), confidence: Math.round((validCount / 27) * 100), scores, weights, inputs };
};

export const getFitLabel = (score) => {
  if (score >= 4.0) return 'Excellent Fit';
  if (score >= 3.3) return 'Good Fit';
  if (score >= 2.5) return 'Neutral Fit';
  return 'Poor Fit';
};

export const getCoverageLabel = (confidence) => {
  if (confidence >= 75) return 'Full';
  if (confidence >= 45) return 'Partial';
  return 'Limited';
};
