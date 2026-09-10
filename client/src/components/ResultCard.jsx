import { AnimatePresence, motion } from 'framer-motion'
import ScoreCircle from './ScoreCircle'
import MissingSkills from './MissingSkills'
import SuggestionCard from './SuggestionCard'

export default function ResultCard({ result }) {
  return (
    <AnimatePresence>
      {result && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid gap-8 rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,_1fr)] lg:items-start">
            <div className="flex flex-col gap-6">
              <ScoreCircle score={result.matchScore} />
              <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/20">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Resume Summary</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Insights at a glance</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/80 px-3 py-2 text-xs font-semibold uppercase text-slate-400 ring-1 ring-white/10">
                    {result.suggestions.length} tips
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p>
                    Your resume is scored against the provided job description using AI-powered analysis to highlight gaps and suggestions.
                  </p>
                  <p className="text-slate-400">Review the missing skills and recommendations below to refine your resume.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <MissingSkills skills={result.missingSkills} />
              <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-200 ring-1 ring-white/10">
                    <span className="text-sm font-semibold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Suggestions</h3>
                    <p className="text-sm text-slate-400">Actionable changes to improve your fit.</p>
                  </div>
                </div>
                <ul className="grid gap-4">
                  {result.suggestions.map((suggestion, index) => (
                    <SuggestionCard key={`${suggestion}-${index}`} suggestion={suggestion} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
