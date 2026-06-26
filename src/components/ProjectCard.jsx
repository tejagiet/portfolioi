const accentMap = {
  purple: {
    border: 'border-purple-100',
    glow: 'hover:shadow-[0_20px_50px_rgba(124,58,237,0.06)] hover:border-purple-250',
    chip: 'bg-purple-50 border-purple-100/80 text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    orb: 'bg-purple-200/25',
    emoji_bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  blue: {
    border: 'border-blue-100',
    glow: 'hover:shadow-[0_20px_50px_rgba(59,130,246,0.06)] hover:border-blue-250',
    chip: 'bg-blue-50 border-blue-100/80 text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    orb: 'bg-blue-200/25',
    emoji_bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  teal: {
    border: 'border-teal-100',
    glow: 'hover:shadow-[0_20px_50px_rgba(20,184,166,0.06)] hover:border-teal-250',
    chip: 'bg-teal-50 border-teal-100/80 text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
    orb: 'bg-teal-200/25',
    emoji_bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  green: {
    border: 'border-green-100',
    glow: 'hover:shadow-[0_20px_50px_rgba(34,197,94,0.06)] hover:border-green-250',
    chip: 'bg-green-50 border-green-100/80 text-green-600',
    badge: 'bg-green-100 text-green-700',
    orb: 'bg-green-200/25',
    emoji_bg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
}

export default function ProjectCard({ project, index }) {
  const accent = accentMap[project.accent] || accentMap.purple

  return (
    <div
      className={`relative group glass rounded-2xl p-6 border ${accent.border} ${accent.glow} transition-all duration-400 overflow-hidden flex flex-col h-full shadow-sm`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background orb */}
      <div className={`absolute -top-8 -right-8 w-32 h-32 ${accent.orb} rounded-full filter blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:opacity-70`} />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        {/* SVG folder icon in place of emoji */}
        <div className={`w-12 h-12 rounded-xl ${accent.emoji_bg} border ${accent.border} flex items-center justify-center`}>
          <svg className={`w-5 h-5 ${accent.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <div className="flex gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-purple-50/50 border border-purple-100 hover:bg-purple-100/50 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all shadow-sm"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-purple-50/50 border border-purple-100 hover:bg-purple-100/50 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all shadow-sm"
              aria-label="Live Demo"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm text-gray-500 leading-relaxed flex-1 mb-4 font-medium">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="relative z-10 flex flex-wrap gap-1.5">
        {(project.tech_stack || []).map((tech) => (
          <span
            key={tech}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${accent.chip}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
