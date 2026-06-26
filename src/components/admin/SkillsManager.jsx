import { useState, useEffect } from 'react'
import { getSkills, addSkill, deleteSkill } from '../../lib/api'
import { staticSkills, skillCategories } from '../../lib/data'

const categoryColors = {
  Frontend: 'text-blue-600 bg-blue-50 border-blue-100',
  Backend: 'text-green-600 bg-green-50 border-green-100',
  'AI/ML': 'text-purple-600 bg-purple-50 border-purple-100',
  Tools: 'text-orange-600 bg-orange-50 border-orange-100',
  Creative: 'text-pink-600 bg-pink-50 border-pink-100',
  General: 'text-gray-600 bg-gray-50 border-gray-100',
}

export default function SkillsManager() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState({ name: '', category: 'Frontend' })
  const [message, setMessage] = useState(null)
  const [filter, setFilter] = useState('All')
  const [apiOnline, setApiOnline] = useState(true)

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3500)
  }

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const data = await getSkills()
      setSkills(Array.isArray(data) ? data : staticSkills)
      setApiOnline(true)
    } catch {
      setSkills(staticSkills)
      setApiOnline(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setAdding(true)
    try {
      const newSkill = await addSkill(form)
      setSkills((prev) => [...prev, newSkill])
      showMessage(`"${newSkill.name}" added successfully!`)
      setForm({ name: '', category: 'Frontend' })
    } catch (err) {
      showMessage(err.message, 'error')
    }
    setAdding(false)
  }

  const handleDelete = async (skill) => {
    if (!window.confirm(`Delete "${skill.name}"?`)) return
    setDeletingId(skill.id)
    try {
      await deleteSkill(skill.id)
      setSkills((prev) => prev.filter((s) => s.id !== skill.id))
      showMessage(`"${skill.name}" deleted.`)
    } catch (err) {
      showMessage(err.message, 'error')
    }
    setDeletingId(null)
  }

  const categories = ['All', ...skillCategories]
  const filtered = filter === 'All' ? skills : skills.filter((s) => s.category === filter)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-800">Skills Manager</h2>
        <p className={`text-sm mt-1 ${apiOnline ? 'text-emerald-600' : 'text-amber-600'}`}>
          {apiOnline ? '● Live — connected to Neon' : '⚠ API offline — showing static data'}
        </p>
      </div>

      {message && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${
          message.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <span>{message.type === 'error' ? '✗' : '✓'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Add Skill Form */}
      <div className="glass rounded-2xl p-6 border border-purple-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">+</span>
          Add New Skill
        </h3>
        <form id="add-skill-form" onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Skill Name</label>
            <input
              id="skill-name"
              type="text"
              placeholder="e.g. Next.js"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="input-light"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
            <select
              id="skill-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="input-light"
            >
              {skillCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="sm:col-span-3 pt-2">
            <button
              id="skill-add-submit"
              type="submit"
              disabled={adding || !form.name.trim()}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)' }}
            >
              {adding ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Adding…</>
              ) : '+ Add Skill'}
            </button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              filter === cat
                ? 'bg-purple-100 border-purple-200 text-purple-600 shadow-sm'
                : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No skills in this category yet.</div>
          ) : (
            <div className="divide-y divide-purple-50">
              {filtered.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-purple-50/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Circle dot in place of icon */}
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{skill.name}</p>
                      <span className={`inline-block text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border mt-1 ${categoryColors[skill.category] || categoryColors.General}`}>
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <button
                    id={`delete-skill-${skill.id}`}
                    onClick={() => handleDelete(skill)}
                    disabled={deletingId === skill.id}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 flex items-center justify-center text-gray-400 hover:text-red-600 transition-all disabled:opacity-40"
                    aria-label={`Delete ${skill.name}`}
                  >
                    {deletingId === skill.id ? (
                      <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="text-gray-400 text-xs text-right font-mono">{filtered.length} skill{filtered.length !== 1 ? 's' : ''} shown</p>
    </div>
  )
}
