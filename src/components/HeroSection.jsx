import { useEffect, useRef, useState } from 'react'

export default function HeroSection({ profile }) {
  const heroRef = useRef(null)
  const [imgError, setImgError] = useState(false)

  // Parallax orbs on mouse move
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { width, height } = el.getBoundingClientRect()
      const x = (clientX / width - 0.5) * 30
      const y = (clientY / height - 0.5) * 20
      const orbs = el.querySelectorAll('.parallax-orb')
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const interests = [
    'Web Designer',
    'Software Developer',
    'Anime Enthusiast',
    'AI Integration Builder',
  ]

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* === Background Orbs === */}
      <div className="parallax-orb absolute top-1/4 -left-32 w-96 h-96 bg-purple-200/40 rounded-full filter blur-[120px] transition-transform duration-200 ease-out pointer-events-none" />
      <div className="parallax-orb absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-100/40 rounded-full filter blur-[120px] transition-transform duration-200 ease-out pointer-events-none" />
      <div className="parallax-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-100/20 rounded-full filter blur-[100px] transition-transform duration-200 ease-out pointer-events-none animate-glow-pulse" />

      {/* === Grid dot background === */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(124,58,237,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* === Main Content === */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Bento-style Hero Card */}
        <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16 shadow-md border border-white/80 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-between">
            {/* Left side info */}
            <div className="flex-1 w-full order-2 lg:order-1">
              {/* Top badge */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-purple-600 font-mono">Available for projects</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/50 border border-purple-100/60">
                  <span className="text-xs text-gray-500 font-semibold">Location:</span>
                  <span className="text-xs text-gray-600 font-semibold">Andhra Pradesh, India</span>
                </div>
              </div>

              {/* TEJA Brand Wordmark */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <h1
                    className="font-display font-black text-7xl sm:text-8xl lg:text-9xl tracking-tight gradient-text select-none"
                    style={{ lineHeight: 1, letterSpacing: '-0.04em' }}
                  >
                    TEJA
                  </h1>
                  {/* Decorative accent line */}
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-400 to-transparent" />
                </div>
              </div>

              {/* Full Name */}
              <p className="text-gray-400 text-xs font-bold font-mono tracking-[0.15em] uppercase mb-4">
                Molleti Teja Yeswanth Veera Manikanta
              </p>

              {/* Subtitle with typewriter feel */}
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mb-8">
                {['Full-Stack Developer', 'Photo/Video Editor', 'AI Innovator'].map((role, i) => (
                  <span key={role} className="flex items-center gap-2">
                    <span className="text-gray-800 font-display font-bold text-xl sm:text-2xl">{role}</span>
                    {i < 2 && <span className="text-purple-500/60 text-xl font-bold">·</span>}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed mb-10 font-medium">
                Building AI-powered ecosystems, campus platforms, and operating systems from
                Andhra Pradesh. Student of Artificial Intelligence at{' '}
                <span className="text-purple-600 font-semibold">GIET Polytechnic College, Rajahmundry</span>.
                Creator of <span className="text-purple-600 font-semibold">Nexus</span> and{' '}
                <span className="text-purple-600 font-semibold">GGU Maitri 2026 Portal</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  id="hero-view-projects"
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                    boxShadow: '0 4px 12px rgba(124,58,237,0.15)',
                  }}
                >
                  <span className="relative z-10">View Projects</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {profile?.resume_url ? (
                  <a
                    id="hero-download-resume"
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-50 border border-purple-100 shadow-sm transition-all"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                ) : (
                  <button
                    id="hero-resume-unavailable"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-400 bg-gray-50 border border-gray-150 cursor-not-allowed"
                    disabled
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume (Upload via Admin)
                  </button>
                )}
              </div>
            </div>

            {/* Right side portrait photo */}
            {!imgError && (
              <div className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] order-1 lg:order-2 lg:mt-20">
                {/* Decorative liquid glass glowing border/orb behind photo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-300 rounded-3xl opacity-20 filter blur-2xl animate-glow-pulse" />
                <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-purple-100 shadow-md p-2 bg-white/50 backdrop-blur-md">
                  <img
                    src="/teja1.jpeg"
                    alt="Teja"
                    className="w-full h-full object-cover rounded-2xl border border-purple-50 shadow-inner"
                    onError={() => setImgError(true)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Personal Interests Row */}
          <div className="mt-10 pt-8 border-t border-purple-50 flex flex-wrap gap-2.5">
            {interests.map((interest) => (
              <span
                key={interest}
                className="flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-gray-500 bg-purple-50/50 border border-purple-100/80 hover:text-purple-600 hover:border-purple-200 transition-colors cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-purple-200 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2 rounded-full bg-purple-500 animate-float" />
          </div>
        </div>
      </div>
    </section>
  )
}
