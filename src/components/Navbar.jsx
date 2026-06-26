import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'glass border-b border-purple-100/80 shadow-[0_8px_32px_rgba(124,58,237,0.05)]'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <span
                className="font-display font-black text-2xl tracking-tight gradient-text select-none"
                style={{ letterSpacing: '-0.02em' }}
              >
                TEJA
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeSection === href.slice(1)
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-purple-50/50'
                  }`}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="navbar-menu-toggle"
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-purple-50/50 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-px bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[7.5px] rotate-45' : ''}`} />
              <span className={`block h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[7.5px] -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-purple-50/50 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
