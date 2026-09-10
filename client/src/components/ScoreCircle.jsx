import { motion } from 'framer-motion'

const statusMap = (score) => {
  if (score >= 85) return { label: 'Excellent Match', tone: 'text-emerald-300', ring: 'ring-emerald-400/20' }
  if (score >= 65) return { label: 'Great Match', tone: 'text-blue-300', ring: 'ring-blue-400/20' }
  if (score >= 45) return { label: 'Fair Match', tone: 'text-amber-300', ring: 'ring-amber-400/20' }
  return { label: 'Needs Improvement', tone: 'text-rose-300', ring: 'ring-rose-400/20' }
}

export default function ScoreCircle({ score }) {
  const status = statusMap(score)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className={`relative mx-auto flex h-56 w-56 items-center justify-center rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl ${status.ring}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 220" fill="none">
        <circle cx="110" cy="110" r="106" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      </svg>
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: score / 100 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="relative"
      >
        <svg className="h-56 w-56" viewBox="0 0 220 220" fill="none">
          <circle
            cx="110"
            cy="110"
            r="88"
            stroke="url(#progressGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="552"
            strokeDashoffset={552 - (552 * score) / 100}
            transform="rotate(-90 110 110)"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="220" y2="220">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-5xl font-semibold text-white">{score}%</p>
          <p className={`mt-2 text-sm font-medium ${status.tone}`}>{status.label}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
