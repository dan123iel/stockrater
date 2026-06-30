import { useState } from 'react';
import { FileText, Loader2, X } from 'lucide-react';
import { getGroqKey } from '../lib/storage';
import { getFitLabel } from '../lib/scoring';

export default function InvestmentMemo({ ticker, company, scoreResult, profile, onClose }) {
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(false);
  const groqKey = getGroqKey();

  const generate = async () => {
    if (!groqKey) return;
    setLoading(true);
    const prompt = `Generate a concise investment memo for ${ticker} (${company?.companyName || ticker}).

Context:
- Strategy: ${profile?.strategy || 'not set'}, ${profile?.horizon || 'medium'} horizon, ${profile?.risk || 'moderate'} risk
- Fit Score: ${scoreResult?.fitScore?.toFixed(1)} / 5.0 (${getFitLabel(scoreResult?.fitScore)})
- Confidence: ${scoreResult?.confidence}%
- Factor scores: ${Object.entries(scoreResult?.scores || {}).map(([k, v]) => `${k}: ${v !== null ? v?.toFixed(1) : 'N/A'}`).join(', ')}
- Sector: ${company?.sector || 'Unknown'}, Country: ${company?.country || 'Unknown'}

Write in this EXACT format (use these exact headings):

**Thesis in one sentence**
[One concise sentence]

**Bull case**
[3 bullet points — specific reasons to be optimistic, grounded in the data]

**Bear case / Risks**
[3 bullet points — what could go wrong, what would invalidate this]

**Exit criteria**
[2–3 measurable conditions under which you would reconsider this position]

**Fair value check**
[One sentence on valuation using EV/EBITDA or P/E context]

Keep each section tight. No preamble. No disclaimer. No recommendations to buy or sell.`;

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 600, temperature: 0.3 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setMemo(data.choices[0].message.content);
    } catch (err) {
      setMemo(`Error generating memo: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="thesis-drawer open" style={{ width: '520px' }}>
        <div style={{ padding: '32px 36px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="mono-label mb-2">{ticker}</div>
            <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '28px', lineHeight: 1.1 }}>Investment Memo</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.45, marginTop: '6px' }}>AI-generated · {getFitLabel(scoreResult?.fitScore)} · {scoreResult?.fitScore?.toFixed(1)} / 5.0</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}><X size={18} /></button>
        </div>
        <div style={{ padding: '32px 36px' }}>
          {!memo && !loading && (
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.6, lineHeight: 1.6, marginBottom: '24px' }}>Generate a structured investment memo — bull case, bear case, exit criteria, and a fair value check — based on your profile and this stock's data.</p>
              {!groqKey ? (
                <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', color: 'var(--color-warning)' }}>Groq API key required. Add it in Settings.</p>
              ) : (
                <button className="btn-primary" onClick={generate}><FileText size={13} />Generate Memo</button>
              )}
            </div>
          )}
          {loading && (
            <div className="flex items-center gap-3" style={{ opacity: 0.5 }}>
              <Loader2 size={16} className="animate-spin" />
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>Writing memo…</span>
            </div>
          )}
          {memo && !loading && (
            <div className="animate-fade-in">
              <div style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--color-ink)' }} dangerouslySetInnerHTML={{ __html: memo.replace(/\*\*(.+?)\*\*/g, '<strong style="font-family: IBM Plex Mono; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.5; display: block; margin-top: 20px; margin-bottom: 6px;">$1</strong>').replace(/^- /gm, '· ') }} />
              <button className="btn-ghost mt-6" onClick={() => setMemo(null)}>Regenerate</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
