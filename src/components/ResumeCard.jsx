import { useState } from 'react'

export default function ResumeCard({ profile }) {
  const rawResumeUrl = profile?.resume_url || null
  const resumeUrl = rawResumeUrl
    ? (rawResumeUrl.startsWith('http://localhost:3001') || rawResumeUrl.startsWith('http://127.0.0.1:3001') || rawResumeUrl.startsWith(window.location.origin)
      ? rawResumeUrl.replace(/^https?:\/\/[^\/]+/, '')
      : rawResumeUrl)
    : null
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    if (!resumeUrl) return
    try {
      const response = await fetch(resumeUrl)
      const blob = await response.blob()
      // Force octet-stream mime type to ensure it is downloaded as a file and respects the filename parameter
      const downloadBlob = new Blob([blob], { type: 'application/octet-stream' })
      const url = window.URL.createObjectURL(downloadBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Teja_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      window.open(resumeUrl, '_blank')
    }
  }

  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-purple-600 text-xs font-semibold font-mono tracking-widest uppercase mb-2">04 — Resume</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800">
              My <span className="gradient-text">Resume</span>
            </h2>
          </div>

        </div>

        {/* --- Desktop 3D Book Layout --- */}
        <div className="hidden md:block">
          {resumeUrl ? (
            <div className="book-container max-w-[780px] h-[590px] mx-auto relative select-none">

              {/* Book base wrapper */}
              <div className="book w-full h-full relative">

                {/* 1. Left Cover backing page (statically on left half, only visible when open) */}
                <div
                  className={`absolute left-0 top-0 w-1/2 h-full rounded-l-2xl border-l border-y border-purple-100 bg-white/40 shadow-sm transition-all duration-500 origin-right ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(243, 232, 255, 0.4))',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Subtle page lining decoration */}
                  <div className="absolute inset-2 border border-purple-100/50 rounded-xl pointer-events-none" />
                </div>

                {/* 2. Sheet 2 (Static Page underneath on the right half, visible when Sheet 1 flips) */}
                <div
                  className="absolute left-1/2 top-0 w-1/2 h-full rounded-r-2xl border-r border-y border-purple-100 bg-white shadow-sm overflow-hidden flex flex-col justify-between"
                  style={{
                    zIndex: 1,
                  }}
                >
                  {/* Page content: Page 3 (PDF Page 2) */}
                  <div className="h-full flex flex-col justify-between">
                    <div className="flex-1 w-full relative bg-white overflow-hidden">
                      <iframe
                        src={`${resumeUrl}#page=2&view=Fit&toolbar=0&navpanes=0`}
                        title="Resume Page 2"
                        className="absolute top-0 left-0 border-none pointer-events-none"
                        style={{ width: 'calc(100% + 20px)', height: '100%', background: '#ffffff' }}
                        scrolling="no"
                      />
                      {/* Transparent overlay to capture clicks and allow turning page back */}
                      <div
                        className="absolute inset-0 z-20 bg-transparent cursor-pointer"
                        onClick={handleToggle}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold px-8 py-3 border-t border-purple-50 bg-white">
                      <span>Page 2 of 2</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(e)
                        }}
                        className="text-gray-500 hover:text-purple-600 font-bold flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                      </button>
                      <button
                        onClick={handleToggle}
                        className="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1 transition-colors"
                      >
                        Close Book
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Sheet 1 (Flipping Page, hinges at the center spine) */}
                <div
                  className={`page page-right ${isOpen ? 'page-turned-left' : ''}`}
                  style={{
                    zIndex: isOpen ? 20 : 10,
                  }}
                >
                  {/* --- FRONT SIDE of Sheet 1: Cover Page --- */}
                  <div
                    className="page-face rounded-r-2xl border-r border-y border-purple-100 p-8 flex flex-col justify-between shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={handleToggle}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 247, 255, 0.9))',
                      backdropFilter: 'blur(24px)',
                    }}
                  >
                    <div className="absolute inset-2 border border-purple-100/50 rounded-xl pointer-events-none" />

                    <div className="text-center my-auto">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>

                      <p className="text-purple-600 text-[10px] font-bold font-mono tracking-[0.25em] uppercase mb-2">
                        Interactive Resume
                      </p>

                      <h3 className="font-display font-black text-5xl tracking-tight text-gray-800 leading-none mb-3">
                        TEJA
                      </h3>

                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-6">
                        Molleti Teja Yeswanth Veera Manikanta
                      </p>

                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-semibold text-purple-600 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                        <span>Full-Stack & AI Specialty</span>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggle()
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md active:scale-95 hover:scale-[1.02]"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                          }}
                        >
                          Open Resume
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(e)
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-gray-700 bg-white hover:bg-gray-50 border border-purple-100 transition-all shadow-md hover:scale-[1.02]"
                        >
                          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download PDF
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-[9px] text-gray-400 font-mono tracking-wider">
                      Click anywhere on page to open
                    </div>
                  </div>

                  {/* --- BACK SIDE of Sheet 1: Page 2 (PDF Page 1) --- */}
                  <div
                    className="page-face page-face-back rounded-l-2xl border-l border-y border-purple-100 overflow-hidden shadow-md flex flex-col justify-between"
                    style={{
                      background: '#ffffff',
                    }}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex-1 w-full relative bg-white overflow-hidden">
                        <iframe
                          src={`${resumeUrl}#page=1&view=Fit&toolbar=0&navpanes=0`}
                          title="Resume Page 1"
                          className="absolute top-0 left-0 border-none pointer-events-none"
                          style={{ width: 'calc(100% + 20px)', height: '100%', background: '#ffffff' }}
                          scrolling="no"
                        />
                        {/* Transparent overlay to capture clicks and allow turning page back */}
                        <div
                          className="absolute inset-0 z-20 bg-transparent cursor-pointer"
                          onClick={handleToggle}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold px-8 py-3 border-t border-purple-50 bg-white">
                        <button
                          onClick={handleToggle}
                          className="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                          Cover
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(e)
                          }}
                          className="text-gray-500 hover:text-purple-600 font-bold flex items-center gap-1 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download PDF
                        </button>
                        <span>Page 1 of 2</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 4. Spine line decoration */}
                {isOpen && <div className="book-spine" />}

              </div>
            </div>
          ) : (
            /* Placeholder when no resume is uploaded */
            <div className="glass rounded-2xl relative shadow-sm border border-purple-100 z-10 flex flex-col items-center justify-center py-24 px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-gray-800 text-lg mb-2">Resume coming soon</h3>
              <p className="text-gray-500 text-sm max-w-sm font-medium">
                The resume is currently unavailable. Please check back later or upload one via the Admin portal.
              </p>
            </div>
          )}
        </div>

        {/* --- Responsive Mobile View (Clean stack layout) --- */}
        <div className="md:hidden">
          {resumeUrl ? (
            <div className="glass rounded-2xl border border-purple-100 shadow-sm overflow-hidden flex flex-col justify-between">
              {/* Header Info */}
              <div className="px-6 py-4 border-b border-purple-50 bg-white/40 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Molleti Teja — Resume.pdf</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Live PDF document</p>
                </div>
                {resumeUrl && (
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                    }}
                  >
                    Download
                  </button>
                )}
              </div>

              {/* Standard PDF Embed for Mobile since 3D flipbook needs space */}
              <div className="relative w-full h-[500px]">
                <iframe
                  src={resumeUrl}
                  title="Teja Resume Mobile"
                  className="w-full h-full border-none"
                  style={{ background: '#ffffff' }}
                />
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 border border-purple-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-gray-800 text-md mb-2">Resume coming soon</h3>
              <p className="text-gray-500 text-xs font-medium">
                The resume is currently unavailable. Please check back later.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
