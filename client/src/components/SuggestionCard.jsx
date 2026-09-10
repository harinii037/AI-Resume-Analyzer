import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

export default function SuggestionCard({ suggestion }) {
  return (
    <motion.li
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-300 ring-1 ring-white/10">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">AI recommendation</p>
          <p className="mt-1 text-sm text-slate-400">Improve your resume for this role.</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{suggestion}</p>
    </motion.li>
  )
}
