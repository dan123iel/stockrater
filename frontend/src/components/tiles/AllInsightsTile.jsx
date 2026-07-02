import { useState } from 'react';
import { getChat, setChat, getGroqKey } from '../../lib/storage';
import { ArrowRight, Loader2 } from 'lucide-react';

const CHIPS = [
  'Does this fit my profile?',
  'What is the biggest risk?',
  'Is the valuation justified?',
];

const buildSystemPrompt = (profile, scoreResult, ticker, portfolio, thesis) => `You are pondex, a calm, direct investment decision assistant for self-directed investors.

Rules:
- Use ONLY the data provided. If a number is missing, say so.
- Never say "buy", "sell", "strong buy", "avoid".
- Be precise: cite numbers. "gross margin of 61%" not "high margin".
- Be calm. No exclamation marks. No hype.
- 3–5 sentences max unless more is needed.

Context:
- Strategy: ${profile?.strategy || 'not set'}, ${profile?.horizon || ''} horizon, ${profile?.risk || ''} risk
- Ticker: ${ticker}
- Fit Score: ${scoreResult?.fitScore?.toFixed(1)} / 5.0 (${scoreResult?.fitScore >= 4 ? 'Excellent Fit' : scoreResult?.fitScore >= 3.3 ? 'Good Fit' : scoreResult?.fitScore >= 2.5 ? 'Neutral Fit' : 'Poor Fit'})
- Confidence: ${scoreResult?.confidence}%
- Factor scores: ${Object.entries(scoreResult?.scores || {}).map(([k, v]) => `${k}: ${v !== null ? v?.toFixed(1) : 'N/A'}`).join(', ')}
${portfolio?.length ? `- Portfolio: ${portfolio.slice(0, 5).map(p => p.ticker).join(', ')}` : ''}
${thesis ? `- Thesis: "${thesis.note}"` : ''}`;

export default function AIInsightsTile({ ticker, scoreResult, profile, portfolio, thesis, compact }) {
  const groqKey = getGroqKey();
  const [messages, setMessages] = useState(() => getChat(ticker));
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || sending) return;
    const userMsg = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: buildSystemPrompt(profile, scoreResult, ticker, portfolio, thesis) },
            ...newMessages.slice(-10),
          ],
          max_tokens: 400, temperature: 0.3,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const aiMsg = { role: 'assistant', content: data.choices[0].message.content };
      const updated = [...newMessages, aiMsg];
      setMessages(updated);
      setChat(ticker, updated);
    } catch (err) {
      const errMsg = { role: 'assistant', content: `Unable to load: ${err.message}` };
      const updated = [...newMessages, errMsg];
      setMessages(updated);
      setChat(ticker, updated);
    } finally {
      setSending(false);
    }
  };

  if (!groqKey) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>
          Add your Groq API key in Settings to enable AI Insights.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: compact ? '320px' : '400px' }}>

      {/* Messages / empty state */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 8px' }}>
        {messages.length === 0 && !sending && (
          <>
            {/* Italic verdict-style placeholder */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--color-muted)', marginBottom: '16px' }}>
              Ask anything about this stock in context of your strategy.
            </p>
            {/* Chip suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CHIPS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px',
                    padding: '9px 12px', textAlign: 'left',
                    border: '1px solid var(--color-divider)',
                    background: 'var(--color-surface)',
                    cursor: 'pointer', color: 'var(--color-ink)',
                    opacity: .7, transition: 'opacity .15s, border-color .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '.7'; e.currentTarget.style.borderColor = 'var(--color-divider)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            {msg.role === 'user' ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>
                You
              </div>
            ) : (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '4px' }}>
                pondex
              </div>
            )}
            <div style={{
              fontFamily: msg.role === 'assistant' ? 'var(--font-body)' : 'var(--font-mono)',
              fontSize: '13px', lineHeight: 1.6,
              fontStyle: msg.role === 'assistant' ? 'italic' : 'normal',
              color: 'var(--color-ink)',
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {sending && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: .4 }}>
            <Loader2 size={12} className="animate-spin" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>Analyzing…</span>
          </div>
        )}

        {messages.length > 0 && (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.3, lineHeight: 1.5, marginTop: '8px', padding: '0 0 4px' }}>
            For informational purposes only. Not investment advice. AI output: Groq / Llama 3.3 · Data: Yahoo Finance / SEC EDGAR.
          </p>
        )}
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid var(--color-divider)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask about this stock…"
          style={{
            flex: 1, fontFamily: 'var(--font-body)', fontSize: '13px',
            border: 'none', background: 'transparent', outline: 'none',
            color: 'var(--color-ink)',
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || sending}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-ink)',
            opacity: !input.trim() || sending ? .2 : .7,
            transition: 'opacity .15s', display: 'flex', alignItems: 'center',
          }}
        >
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
