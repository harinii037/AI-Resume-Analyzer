import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-10 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_35%)]" />
      <div className="relative z-10 flex flex-col gap-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/85 text-violet-200 shadow-lg shadow-violet-500/10 ring-1 ring-white/10">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">AI-powered resume intelligence</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Smart Resume Analyzer
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Analyze how well your resume matches any job description using AI-powered insights.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
