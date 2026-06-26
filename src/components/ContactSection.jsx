export default function ContactSection() {
  const socials = [
    {
      id: 'contact-github',
      label: 'GitHub',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      href: 'https://github.com/tejagiet',
      color: 'hover:text-gray-900 hover:border-purple-250 hover:bg-purple-50/30',
    },
    {
      id: 'contact-linkedin',
      label: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: 'https://linkedin.com/in/teja-manikanta-910542353',
      color: 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/30',
    },
    {
      id: 'contact-email',
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:mteja819@gmail.com',
      color: 'hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50/30',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-purple-600 text-xs font-semibold font-mono tracking-widest uppercase mb-2">05 — Contact</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CTA Card */}
          <div className="glass rounded-2xl p-8 border border-purple-100 relative overflow-hidden glass-hover shadow-sm">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-200/30 rounded-full filter blur-3xl pointer-events-none" />
            <h3 className="font-display font-bold text-2xl text-gray-800 mb-3">
              Open to collaboration & opportunities
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
              Whether you're looking for a full-stack developer, a creative collaborator, or want to discuss AI projects — I'd love to hear from you. Based in Andhra Pradesh, working globally.
            </p>
            <a
              id="contact-email-cta"
              href="mailto:mteja819@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                boxShadow: '0 4px 12px rgba(124,58,237,0.15)',
              }}
            >
              Say Hello
            </a>
          </div>

          {/* Social Links Card */}
          <div className="glass rounded-2xl p-8 border border-purple-100 glass-hover shadow-sm">
            <p className="text-xs font-semibold font-mono text-gray-400 uppercase tracking-widest mb-6">Find me on</p>
            <div className="space-y-3">
              {socials.map(({ id, label, icon, href, color }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-purple-100 text-gray-500 transition-all duration-200 hover:bg-white shadow-sm ${color}`}
                >
                  {icon}
                  <span className="text-sm font-semibold">{label}</span>
                  <svg className="w-3.5 h-3.5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-purple-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs font-semibold font-mono">
            © 2026 <span className="gradient-text font-bold">TEJA</span>. Built with React + Neon
          </p>
          <p className="text-gray-400 text-xs font-semibold font-mono">
            Molleti Teja Yeswanth Veera Manikanta · GIET Polytechnic College, Rajahmundry
          </p>
        </div>
      </div>
    </section>
  )
}
