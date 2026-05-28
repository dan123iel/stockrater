// Cloudflare Worker — FMP CORS Proxy for StockRater
// Deploy at: https://dash.cloudflare.com → Workers & Pages → Create Worker
// Then paste this code and click "Deploy"

const ALLOWED_ORIGIN = 'https://dan123iel.github.io';
const FMP_BASE = 'https://financialmodelingprep.com/api/v3';

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    // Expects: /fmp/<endpoint>?apikey=KEY&...params
    const path = url.pathname.replace(/^\/fmp/, '');
    const fmpUrl = `${FMP_BASE}${path}${url.search}`;

    const fmpRes = await fetch(fmpUrl, {
      headers: { 'User-Agent': 'StockRater/1.0' },
    });

    const body = await fmpRes.text();

    return new Response(body, {
      status: fmpRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
