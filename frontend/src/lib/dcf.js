// pondex DCF Model — runs client-side

export const getDefaultInputs = (profile, keyMetrics, incomeStatements) => {
  const ttmRevGrowth = incomeStatements?.length >= 2
    ? (incomeStatements[0]?.revenue - incomeStatements[1]?.revenue) / Math.abs(incomeStatements[1]?.revenue || 1)
    : 0.1;
  const ttmOpMargin = incomeStatements?.[0]?.operatingIncomeRatio || 0.15;
  const beta = profile?.beta || 1.0;
  const wacc = Math.min(0.20, Math.max(0.05, 0.04 + beta * 0.045));
  return {
    revenueGrowth: Math.min(0.5, Math.max(-0.2, ttmRevGrowth)),
    terminalGrowth: 0.03,
    operatingMargin: Math.min(0.6, Math.max(-0.1, ttmOpMargin)),
    wacc: parseFloat(wacc.toFixed(3)),
    taxRate: 0.21,
    sharesOutstanding: keyMetrics?.marketCap && profile?.price ? keyMetrics.marketCap / profile.price : 1000000000,
  };
};

export const runDCF = (baseInputs, scenario, revenue) => {
  const multipliers = { bear: { growth: 0.5, margin: 0.85 }, base: { growth: 1.0, margin: 1.0 }, bull: { growth: 1.5, margin: 1.1 } };
  const m = multipliers[scenario];
  const growth = baseInputs.revenueGrowth * m.growth;
  const margin = Math.min(0.6, baseInputs.operatingMargin * m.margin);
  const { terminalGrowth, wacc, taxRate, sharesOutstanding } = baseInputs;
  if (!revenue || revenue <= 0) return null;
  let totalPV = 0;
  let currentRevenue = revenue;
  for (let year = 1; year <= 5; year++) {
    currentRevenue *= (1 + growth);
    const fcf = currentRevenue * margin * (1 - taxRate);
    totalPV += fcf / Math.pow(1 + wacc, year);
  }
  const terminalFCF = currentRevenue * margin * (1 - taxRate) * (1 + terminalGrowth);
  const terminalPV = (terminalFCF / (wacc - terminalGrowth)) / Math.pow(1 + wacc, 5);
  totalPV += terminalPV;
  return parseFloat((sharesOutstanding > 0 ? totalPV / sharesOutstanding : 0).toFixed(2));
};

export const calcReverseDCF = (currentPrice, inputs, revenue) => {
  if (!currentPrice || !revenue || revenue <= 0) return null;
  const targetMktCap = currentPrice * inputs.sharesOutstanding;
  const { terminalGrowth, wacc, taxRate } = inputs;
  let low = -0.2, high = 0.8;
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    let totalPV = 0, rev = revenue;
    for (let year = 1; year <= 5; year++) {
      rev *= (1 + mid);
      totalPV += (rev * inputs.operatingMargin * (1 - taxRate)) / Math.pow(1 + wacc, year);
    }
    const terminalPV = ((rev * inputs.operatingMargin * (1 - taxRate) * (1 + terminalGrowth)) / (wacc - terminalGrowth)) / Math.pow(1 + wacc, 5);
    totalPV += terminalPV;
    if (totalPV > targetMktCap) high = mid; else low = mid;
  }
  return parseFloat(((low + high) / 2 * 100).toFixed(1));
};
