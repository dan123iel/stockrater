import { motion } from 'framer-motion'

const quotes = [
  '"I have 5 tabs open and still don\'t know what to do"',
  '"ChatGPT gives numbers with no source"',
  '"I don\'t know if a P/E of 28x is cheap or expensive"',
  '"I paid for Bloomberg. Still noisy."',
  '"2 hours of research. Gut decision anyway."',
  '"I can\'t tell what the chart is telling me"',
]

export default function PainMarquee() {
  const doubled = [...quotes, ...quotes]
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-white">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((q, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-mono text-[12px] uppercase tracking-widest text-mid-gray">{q}</span>
            <span className="font-mono text-[12px] text-mid-gray opacity-30">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
