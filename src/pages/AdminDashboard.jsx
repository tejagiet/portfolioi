import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SkillsManager from '../components/admin/SkillsManager'
import ResumeManager from '../components/admin/ResumeManager'
import ProjectsManager from '../components/admin/ProjectsManager'

const navItems = [
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('skills')
  const navigate = useNavigate()

  // Guard: redirect to login if not authenticated
  useEffect(() => {
    if (sessionStorage.getItem('teja-admin-auth') !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('teja-admin-auth')
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* ===== Sidebar ===== */}
      <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col glass border-r border-purple-100 shadow-sm z-20">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center">
              <span className="font-display font-black text-sm text-purple-600">T</span>
            </div>
            <div>
              <p className="font-display font-bold text-gray-800 text-sm">TEJA Admin</p>
              <p className="text-gray-400 text-[10px] font-mono">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-gray-400 text-[10px] font-semibold font-mono uppercase tracking-widest px-3 mb-3">Modules</p>
          {navItems.map(({ id, label, icon }) => (
            <button
              key={id}
              id={`admin-nav-${id}`}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${
                activeTab === id
                  ? 'bg-purple-100 text-purple-600 border border-purple-200/50 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-purple-50/50 border border-transparent'
              }`}
            >
              <span className={activeTab === id ? 'text-purple-600' : 'text-gray-400'}>{icon}</span>
              {label}
              {activeTab === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom — Portfolio link + Logout */}
        <div className="px-3 py-4 border-t border-purple-50 space-y-1">
          <a
            id="admin-view-portfolio"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-800 hover:bg-purple-50/50 transition-all border border-transparent"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Portfolio
          </a>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent text-left"
          >
            <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden z-10">
        {/* Top Header */}
        <header className="glass border-b border-purple-100 px-6 py-4 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile: TEJA logo */}
            <span className="lg:hidden font-display font-black text-xl gradient-text">TEJA</span>
            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span>admin</span>
              <span>/</span>
              <span className="text-purple-600 font-bold">{activeTab}</span>
            </div>
          </div>

          {/* Mobile tab switcher */}
          <div className="flex lg:hidden items-center gap-1 bg-purple-50 rounded-xl p-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 font-semibold font-mono hidden sm:block">Authenticated</span>
            </div>
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8 relative">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-200/30 rounded-full filter blur-[150px]" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/30 rounded-full filter blur-[120px]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'resume' && <ResumeManager />}
          </div>
        </main>
      </div>
    </div>
  )
}
