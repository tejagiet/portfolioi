import { useState } from 'react'

export default function AboutCard({ profile }) {
  const [imgError, setImgError] = useState(false)

  const stats = [
    { value: '4+', label: 'Major Projects' },
    { value: 'AI', label: 'Specialization' },
    { value: 'High', label: 'Commit Frequency' },
  ]

  const interests = [
    { label: 'RCB Bangalore', sub: 'Est. fan since forever' },
    { label: 'Gaming & Modding', sub: 'Minecraft · GTA V' },
    { label: 'Anime Fan', sub: 'Japanese animation fan' },
    { label: 'Dell Setup', sub: 'Dell Latitude 5420' },
    { label: 'AI Developer', sub: 'Claude Code · APIs' },
    { label: 'Video Production', sub: 'Photo & Video Editing' },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-purple-600 text-xs font-semibold font-mono tracking-widest uppercase mb-2">01 — About</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800">
            The Person Behind{' '}
            <span className="gradient-text">TEJA</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Main Bio Card — spans 2 columns */}
          <div className="lg:col-span-2 glass rounded-2xl p-8 border border-purple-100 shadow-sm glass-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/30 rounded-full filter blur-3xl pointer-events-none" />

            {/* Avatar image with initials fallback */}
            <div className="flex items-start gap-6 mb-6">
              <div className="relative flex-shrink-0">
                {!imgError ? (
                  <img
                    src="/teja.jpeg"
                    alt="Teja"
                    className="w-20 h-20 rounded-2xl object-cover border border-purple-200 shadow-sm"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-2xl gradient-text select-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(249, 168, 212, 0.1))',
                      border: '1px solid rgba(124, 58, 237, 0.2)',
                    }}
                  >
                    MT
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-gray-800 mb-1">
                  {profile?.name || 'Molleti Teja Yeswanth Veera Manikanta'}
                </h3>
                <p className="text-gray-500 text-sm font-semibold mb-2">
                  {profile?.title || 'Full-Stack Developer & AI Innovator'}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile?.location || 'Srirangapatnam, Andhra Pradesh'}
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm font-medium">
              {profile?.bio || `I'm a student of Artificial Intelligence at GIET Polytechnic College, Rajahmundry — passionate about building things that matter. From campus ecosystems to AI-powered operating systems, I approach every project with a video editor's eye for detail and a developer's love for clean code.`}
            </p>

            {/* Education badges */}
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-xs font-semibold text-purple-600 font-mono">Academic Info</span>
                <div className="h-6 w-px bg-purple-100" />
                <div>
                  <p className="text-xs font-bold text-gray-800">GIET Polytechnic College</p>
                  <p className="text-xs text-gray-500 font-medium">Artificial Intelligence · Rajahmundry, AP</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-xs font-semibold text-purple-600 font-mono">Academic Info</span>
                <div className="h-6 w-px bg-purple-100" />
                <div>
                  <p className="text-xs font-bold text-gray-800">SRI SHIRIDI SAI E.M School</p>
                  <p className="text-xs text-gray-500 font-medium">10th CLASS • Korukonda</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="glass rounded-2xl p-8 border border-purple-100 shadow-sm glass-hover flex flex-col justify-between">
            <p className="text-xs font-semibold font-mono text-gray-400 uppercase tracking-widest mb-6">Overview Metrics</p>
            <div className="space-y-6">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-black text-4xl gradient-text">{value}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            {/* RCB accent */}
            <div className="mt-6 pt-6 border-t border-purple-50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div>
                  <p className="text-xs font-bold" style={{ color: '#c41e1e' }}>Go RCB!</p>
                  <p className="text-[10px] text-gray-400 font-semibold">T20 Cricket Supporter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Grid — 3 columns spanning full width */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {interests.map(({ label, sub }) => (
              <div
                key={label}
                className="glass rounded-xl p-4 border border-purple-100/70 hover:border-purple-200 glass-hover text-center flex flex-col items-center justify-center gap-1.5 min-h-[92px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
