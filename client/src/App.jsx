import { useState } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Hero from './components/Hero'
import UploadCard from './components/UploadCard'
import JobDescription from './components/JobDescription'
import AnalyzeButton from './components/AnalyzeButton'
import ResultCard from './components/ResultCard'

function App() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and paste a job description.')
      return
    }

    setLoading(true)
    setResult(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)

    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      formData.append('jobDescription', jobDescription)

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const text = await response.text()
        let message = 'Server returned an error. Please try again.'
        try {
          const body = JSON.parse(text)
          if (body.error) message = body.error
        } catch {
          if (text) message = text
        }
        throw new Error(message)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      if (err.name === 'AbortError') {
        setError('Analysis is taking longer than expected. Please try again in a moment.')
      } else {
        setError(err.message || 'Something went wrong while analyzing your resume. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <BackgroundEffects />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <Hero />

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <UploadCard resumeFile={resumeFile} onFileChange={handleFileChange} />
            <JobDescription jobDescription={jobDescription} setJobDescription={setJobDescription} />

            {error && (
              <div className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100 shadow-lg shadow-rose-500/10">
                {error}
              </div>
            )}

            <AnalyzeButton loading={loading} />
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resume assistant</p>
                <h2 className="text-3xl font-semibold text-white">Ready when you are</h2>
              </div>
              <p className="text-sm leading-7 text-slate-400">
                Upload your resume, provide the job description, and get instant AI-driven feedback with polished insights designed for confident resumes.
              </p>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-400">Best for</p>
                  <p className="mt-2 text-lg font-semibold text-white">Product, engineering, marketing, and design roles</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-400">Highlight</p>
                  <p className="mt-2 text-lg font-semibold text-white">Actionable resume improvements and skill gaps</p>
                </div>
              </div>
            </div>
          </aside>
        </form>

        <div className="mt-10">
          <ResultCard result={result} />
        </div>
      </div>
    </div>
  )
}

export default App
