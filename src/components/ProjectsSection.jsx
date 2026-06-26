import ProjectCard from './ProjectCard'

export default function ProjectsSection({ projects }) {
  const featured = [...projects].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-purple-600 text-xs font-semibold font-mono tracking-widest uppercase mb-2">03 — Projects</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl font-medium">
            From campus ecosystems to AI-powered operating systems — each project represents a real problem solved with modern technology.
          </p>
        </div>

        {/* Bento Grid — 2 cols, first project is featured (larger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((project, i) => (
            <div
              key={project.id}
              className={
                // Make the first project span full width as featured
                i === 0 ? 'md:col-span-2' : ''
              }
            >
              <ProjectCard project={project} index={i} featured={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
