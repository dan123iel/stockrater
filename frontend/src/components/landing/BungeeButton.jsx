import { motion } from 'framer-motion'

// Bungee-style CTA: Text + Plus icon + underline appears ONLY on hover (starts at 0%)
export function BungeeButton({ children, href = '#', onClick, className = '' }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={className}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '16px', fontFamily: 'Interdisplay, Inter, Arial, sans-serif', fontSize: '17.6px', fontWeight: 500, color: '#1e1e1e', paddingBottom: '4px', textDecoration: 'none', cursor: 'pointer' }}
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.span
        variants={{ rest: { rotate: 0 }, hover: { rotate: 90 } }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: '20px', lineHeight: 1, display: 'inline-block' }}
      >
        +
      </motion.span>
      {/* Underline — 0% at rest, 100% on hover */}
      <motion.div
        style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', background: '#1e1e1e' }}
        variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.a>
  )
}

// White variant for dark backgrounds
export function BungeeButtonWhite({ children, href = '#' }) {
  return (
    <motion.a
      href={href}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '16px', fontFamily: 'Interdisplay, Inter, Arial, sans-serif', fontSize: '17.6px', fontWeight: 500, color: '#ffffff', paddingBottom: '4px', textDecoration: 'none', cursor: 'pointer' }}
      whileHover="hover"
      initial="rest"
    >
      {children}
      <motion.span
        variants={{ rest: { rotate: 0 }, hover: { rotate: 90 } }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: '20px', lineHeight: 1 }}
      >
        +
      </motion.span>
      <motion.div
        style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', background: '#ffffff' }}
        variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.a>
  )
}
