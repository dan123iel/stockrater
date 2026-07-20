import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

export default function LandingFooter() {
  return (
    <footer style={{ background: C.white, padding: '32px', borderTop: `1px solid ${C.black}` }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ ...S, fontWeight: 700, fontSize: '18px', color: C.black, letterSpacing: '-0.02em' }}>pondex_</a>
            <BungeeButton href="#demo">Get free access</BungeeButton>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ ...S, fontSize: '48px', fontWeight: 500, color: C.black, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Get research insights.</h3>
              <p style={{ ...S, fontSize: '17.6px', color: C[400], marginTop: '8px' }}>Research insights, product updates, and early access.</p>
            </div>
            <form style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: `1px solid ${C[200]}`, paddingBottom: '16px', maxWidth: '480px' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{ ...S, fontSize: '16px', background: 'transparent', border: 'none', outline: 'none', color: C.black, flex: 1 }}
              />
              <button
                type="submit"
                style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', background: C.black, color: C.white, border: 'none', borderRadius: '12px', padding: '9px 15px', cursor: 'pointer' }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '250px' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {['How it works', 'Pricing', 'Changelog', 'Privacy', 'Terms', 'Disclaimer'].map(l => (
              <a key={l} href="#" style={{ ...S, fontSize: '14px', color: C[400], textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = C.black}
                onMouseLeave={e => e.target.style.color = C[400]}
              >
                {l}
              </a>
            ))}
          </div>
          <p style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: C[300], flexShrink: 0 }}>
            © 2026 pondex · Not financial advice · Data: Yahoo Finance &amp; SEC EDGAR
          </p>
        </div>
      </div>
    </footer>
  )
}
