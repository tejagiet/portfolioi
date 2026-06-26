import { useState, useEffect } from 'react'
import { getProjects, addProject, updateProject, deleteProject } from '../../lib/api'
import { staticProjects } from '../../lib/data'

export default function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiOnline, setApiOnline] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [message, setMessage] = useState(null)

  // Add form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    featured: false,
    sort_order: 0,
  })

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    featured: false,
    sort_order: 0,
  })

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3500)
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(Array.isArray(data) ? data : staticProjects)
      setApiOnline(true)
    } catch {
      setProjects(staticProjects)
      setApiOnline(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        tech_stack: form.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
        sort_order: parseInt(form.sort_order) || 0,
      }
      const newProj = await addProject(payload)
      setProjects((prev) => [...prev, newProj])
      showMessage(`Project "${newProj.title}" added successfully!`)
      setForm({
        title: '',
        description: '',
        tech_stack: '',
        github_url: '',
        live_url: '',
        featured: false,
        sort_order: 0,
      })
    } catch (err) {
      showMessage(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleStartEdit = (proj) => {
    setEditingId(proj.id)
    setEditForm({
      title: proj.title || '',
      description: proj.description || '',
      tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : proj.tech_stack || '',
      github_url: proj.github_url || '',
      live_url: proj.live_url || '',
      featured: !!proj.featured,
      sort_order: proj.sort_order || 0,
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        ...editForm,
        tech_stack: editForm.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
        sort_order: parseInt(editForm.sort_order) || 0,
      }
      const updated = await updateProject(id, payload)
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
      setEditingId(null)
      showMessage(`Project "${updated.title}" updated successfully!`)
    } catch (err) {
      showMessage(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (proj) => {
    if (!window.confirm(`Are you sure you want to delete "${proj.title}"?`)) return
    setDeletingId(proj.id)
    try {
      await deleteProject(proj.id)
      setProjects((prev) => prev.filter((p) => p.id !== proj.id))
      showMessage(`Project "${proj.title}" deleted.`)
    } catch (err) {
      showMessage(err.message, 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const sortedProjects = [...projects].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-800">Projects Manager</h2>
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

      {/* Add Project Form */}
      <div className="glass rounded-2xl p-6 border border-purple-100 shadow-sm">
        <h3 className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold">+</span>
          Add New Project
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Project Title</label>
              <input
                type="text"
                placeholder="e.g. Nexus Campus Portal"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                className="input-light"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, Express, Neon, Tailwind"
                value={form.tech_stack}
                onChange={(e) => setForm((f) => ({ ...f, tech_stack: e.target.value }))}
                className="input-light"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
            <textarea
              placeholder="Detailed description of the project..."
              value={form.description}
              rows={3}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="input-light resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">GitHub Repository URL</label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={form.github_url}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                className="input-light"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://project-demo.com"
                value={form.live_url}
                onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                className="input-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <input
                id="proj-featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded text-purple-600 border-purple-300 focus:ring-purple-500"
              />
              <label htmlFor="proj-featured" className="text-xs font-semibold text-gray-600">Featured Project</label>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Sort Order:</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className="w-20 px-2 py-1 border border-purple-200 rounded-lg text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !form.title.trim()}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.15)' }}
            >
              {submitting ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
              ) : 'Save Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm">Existing Projects ({sortedProjects.length})</h3>
          {sortedProjects.length === 0 ? (
            <div className="glass rounded-2xl py-12 text-center text-gray-400 text-sm border border-purple-100">
              No projects added yet.
            </div>
          ) : (
            <div className="space-y-3">
              {sortedProjects.map((proj) => (
                <div key={proj.id} className="glass rounded-2xl border border-purple-100 p-5 shadow-sm">
                  {editingId === proj.id ? (
                    /* Inline Editing Mode */
                    <form onSubmit={(e) => handleUpdate(e, proj.id)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Title</label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                            required
                            className="input-light py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Tech Stack</label>
                          <input
                            type="text"
                            value={editForm.tech_stack}
                            onChange={(e) => setEditForm((f) => ({ ...f, tech_stack: e.target.value }))}
                            className="input-light py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Description</label>
                        <textarea
                          value={editForm.description}
                          onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                          rows={2}
                          className="input-light py-1.5 text-xs resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-0.5">GitHub URL</label>
                          <input
                            type="url"
                            value={editForm.github_url}
                            onChange={(e) => setEditForm((f) => ({ ...f, github_url: e.target.value }))}
                            className="input-light py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Live URL</label>
                          <input
                            type="url"
                            value={editForm.live_url}
                            onChange={(e) => setEditForm((f) => ({ ...f, live_url: e.target.value }))}
                            className="input-light py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-purple-50">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                            <input
                              type="checkbox"
                              checked={editForm.featured}
                              onChange={(e) => setEditForm((f) => ({ ...f, featured: e.target.checked }))}
                              className="w-3.5 h-3.5 rounded text-purple-600 border-purple-300"
                            />
                            Featured
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-gray-500">
                            Order:
                            <input
                              type="number"
                              value={editForm.sort_order}
                              onChange={(e) => setEditForm((f) => ({ ...f, sort_order: e.target.value }))}
                              className="w-16 px-1.5 py-0.5 border border-purple-200 rounded text-xs"
                            />
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={submitting || !editForm.title.trim()}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    /* Display Mode */
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-800 text-base">{proj.title}</h4>
                          {proj.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-600 border border-purple-200">
                              Featured
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                            Order: {proj.sort_order || 0}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 max-w-2xl">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {(proj.tech_stack || []).map((t) => (
                            <span key={t} className="text-[10px] font-mono bg-purple-50 text-purple-600 border border-purple-100 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 flex-shrink-0">
                        {/* Action buttons */}
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleStartEdit(proj)}
                            className="w-8 h-8 rounded-lg hover:bg-purple-50 border border-transparent hover:border-purple-100 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all"
                            title="Edit project"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(proj)}
                            disabled={deletingId === proj.id}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
                            title="Delete project"
                          >
                            {deletingId === proj.id ? (
                              <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {/* URL Badges */}
                        <div className="flex gap-2">
                          {proj.github_url && (
                            <a
                              href={proj.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-semibold text-purple-600 hover:underline"
                            >
                              GitHub
                            </a>
                          )}
                          {proj.live_url && (
                            <a
                              href={proj.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-semibold text-purple-600 hover:underline"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
