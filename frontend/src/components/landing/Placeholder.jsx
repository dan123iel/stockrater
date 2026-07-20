import { C } from '../../lib/colors'

const M = { fontFamily: 'Chivo Mono, monospace' }
const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }

export default function Placeholder({ id, title, why, height = '200px' }) {
  return (
    <section id={id} style={{ padding: '48px 32px', background: C.white }}>
      <div className="bungee-container">
        <div style={{
          height,
          border: `2px dashed ${C[200]}`,
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${C[100]}44 10px,
            ${C[100]}44 11px
          )`,
        }}>
          <p style={{ ...M, fontSize: '10px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            [ PLACEHOLDER ]
          </p>
          <p style={{ ...S, fontSize: '20px', fontWeight: 500, color: C[500], textAlign: 'center' }}>
            {title}
          </p>
          <p style={{ ...M, fontSize: '11px', color: C[400], textAlign: 'center', maxWidth: '480px' }}>
            Why: {why}
          </p>
        </div>
      </div>
    </section>
  )
}
