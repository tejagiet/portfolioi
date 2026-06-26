import { useState } from 'react'

const categoryColors = {
  Frontend: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', dot: 'bg-blue-500' },
  Backend: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600', dot: 'bg-green-500' },
  'AI/ML': { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600', dot: 'bg-purple-500' },
  Tools: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', dot: 'bg-orange-500' },
  Creative: { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-600', dot: 'bg-pink-500' },
  General: { bg: 'bg-gray-50', border: 'border-gray-150', text: 'text-gray-600', dot: 'bg-gray-400' },
}

export default function SkillsSection({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(skills.map((s) => s.category))]

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  // Group by category for display
  const grouped = filtered.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-purple-600 text-xs font-semibold font-mono tracking-widest uppercase mb-2">02 — Skills</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-800">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const colors = categoryColors[cat] || categoryColors.General
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                id={`skills-filter-${cat.toLowerCase().replace('/', '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  isActive
                    ? `${colors.bg} ${colors.border} ${colors.text} shadow-sm`
                    : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catSkills]) => {
            const colors = categoryColors[category] || categoryColors.General
            return (
              <div key={category} className="glass rounded-2xl p-6 border border-purple-100 shadow-sm">
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className={`text-xs font-semibold font-mono uppercase tracking-widest ${colors.text}`}>
                    {category}
                  </span>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className={`group inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-default ${colors.bg} ${colors.border} ${colors.text} hover:scale-105`}
                    >
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
