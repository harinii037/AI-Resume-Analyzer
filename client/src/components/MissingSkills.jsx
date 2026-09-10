import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const skillStyles = [
  'bg-slate-900/80 text-slate-100 ring-slate-700/50',
  'bg-violet-950/80 text-violet-200 ring-violet-500/20',
  'bg-sky-950/80 text-sky-200 ring-sky-400/20',
  'bg-emerald-950/80 text-emerald-200 ring-emerald-400/20',
]

export default function MissingSkills({ skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
      className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900/80 text-slate-100 ring-1 ring-white/10">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Missing skills</h3>
          <p className="text-sm text-slate-400">Skills the resume should better reflect for this job description.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => {
          const style = skillStyles[index % skillStyles.length]
          return (
            <motion.span
              key={skill}
              whileHover={{ y: -2, scale: 1.02 }}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition duration-300 ${style}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-200">
                <AlertCircle className="h-4 w-4" />
              </span>
              {skill}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}
