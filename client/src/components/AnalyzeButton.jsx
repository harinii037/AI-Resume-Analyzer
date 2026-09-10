import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function AnalyzeButton({ loading }) {
  return (
    <motion.button
      type="submit"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.99 }}
      disabled={loading}
      className="group inline-flex w-full items-center justify-center gap-3 rounded-[28px] bg-gradient-to-r from-violet-500 via-blue-500 to-sky-500 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-violet-500/25 transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      <span>{loading ? 'Analyzing Resume...' : 'Analyze Resume'}</span>
      {!loading && <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
    </motion.button>
  )
}
