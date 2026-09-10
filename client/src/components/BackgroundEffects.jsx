import { motion } from 'framer-motion'

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-1/2 top-[-6rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.28),_transparent_55%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, delay: 0.15, ease: 'easeOut' }}
        className="absolute right-0 top-[15%] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.18),_transparent_50%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.25, ease: 'easeOut' }}
        className="absolute left-10 bottom-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.14),_transparent_55%)] blur-3xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent" />
    </div>
  )
}
