import { motion } from 'framer-motion'

export default function JobDescription({ jobDescription, setJobDescription }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
      className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Job Description</h2>
          <p className="text-sm text-slate-400">Paste the job description that you want your resume matched against.</p>
        </div>
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 ring-1 ring-white/10">
          AI Ready
        </span>
      </div>
      <textarea
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here..."
        rows={10}
        className="mt-6 w-full resize-none rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-violet-400/80 focus:ring-2 focus:ring-violet-500/20"
      />
    </motion.div>
  )
}
