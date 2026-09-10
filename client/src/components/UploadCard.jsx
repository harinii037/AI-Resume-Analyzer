import { useState } from 'react'
import { CloudUpload, FileText, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UploadCard({ resumeFile, onFileChange }) {
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const syntheticEvent = { target: { files: event.dataTransfer.files } }
      onFileChange(syntheticEvent)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 ring-1 ring-white/10">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Resume Upload</h2>
            <p className="text-sm text-slate-400">Drag & drop a PDF or click to select your resume.</p>
          </div>
        </div>
        <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
          {resumeFile ? 'PDF ready to analyze' : 'PDF only · max 10MB'}
        </div>
      </div>

      <label
        htmlFor="resume-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mt-6 block cursor-pointer rounded-3xl border-2 border-dashed px-6 py-8 transition ${
          dragging ? 'border-violet-400/90 bg-violet-500/5' : 'border-white/20 bg-white/5'
        } hover:border-violet-400/80 hover:bg-white/10`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950/80 text-slate-100 ring-1 ring-white/10 shadow-lg shadow-black/20">
            {resumeFile ? <FileText className="h-8 w-8" /> : <CloudUpload className="h-8 w-8" />}
          </div>
          <div className="space-y-2">
            <p className="text-base font-semibold text-white">
              {resumeFile ? resumeFile.name : 'Drop your resume here'}
            </p>
            <p className="text-sm text-slate-400">
              {resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB · PDF` : 'Click to browse files'}
            </p>
          </div>
        </div>
        <input
          id="resume-upload"
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          className="hidden"
        />
      </label>
    </motion.div>
  )
}
