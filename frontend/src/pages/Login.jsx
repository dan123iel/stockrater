import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { C } from '../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setError(null)
    setLoading(true)
    // TODO: replace with Supabase auth
    setTimeout(() => {
      localStorage.setItem('pondex_user', JSON.stringify({ email }))
      navigate('/app')
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.white, display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <header style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path d="M4 3 L4 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="13" cy="11" r="6.5" stroke={C.black} strokeWidth="3.5" fill="none"/>
            <path d="M13 25 L24 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
          <span style={{ ...M, fontSize: '12px', color: C[400], letterSpacing: '0.06em' }}>pondex_</span>
        </Link>
        <Link to="/signup" style={{ ...M, fontSize: '12px', color: C[400], textDecoration: 'none', letterSpacing: '0.04em' }}>
          No account? Sign up →
        </Link>
      </header>

      {/* Form */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <motion.div
          style={{ width: '100%', maxWidth: '400px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ ...S, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, letterSpacing: '-1.5px', color: C.black, marginBottom: '8px' }}>
            Welcome back.
          </h1>
          <p style={{ ...S, fontSize: '16px', color: C[400], marginBottom: '40px' }}>
            Log in to your pondex_ account.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
                style={{ width: '100%', background: C[100], border: `1px solid ${C[200]}`, borderRadius: '12px', padding: '14px 16px', ...S, fontSize: '16px', color: C.black, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', background: C[100], border: `1px solid ${C[200]}`, borderRadius: '12px', padding: '14px 16px', ...S, fontSize: '16px', color: C.black, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {error && <p style={{ ...M, fontSize: '11px', color: '#dc2626' }}>⚠ {error}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ background: C.black, color: C.white, border: 'none', borderRadius: '12px', padding: '15px', ...S, fontSize: '16px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1, marginTop: '8px' }}
            >
              {loading ? '...' : 'Log in →'}
            </button>
          </form>

          <p style={{ ...M, fontSize: '10px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '32px', textAlign: 'center' }}>
            No credit card required · Free forever
          </p>
        </motion.div>
      </main>
    </div>
  )
}
