import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setToken } from '../lib/api'

export default function AdminSetup() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [message, setMessage]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSetup = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setMessage({ text: 'Passwords do not match.', type: 'error' })
      return
    }
    if (password.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters.', type: 'error' })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessage({ text: 'Admin account created! Signing you in…', type: 'success' })
      // Auto login
      const loginData = await login(email, password)
      setToken(loginData.token)
      sessionStorage.setItem('teja-admin-auth', 'true')
      setTimeout(() => navigate('/admin/dashboard'), 1000)
    } catch (err) {
      setMessage({ text: err.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-200/40 filter blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-5xl gradient-text mb-1">TEJA</h1>
          <p className="text-sm text-gray-400 font-mono tracking-widest uppercase">First-Time Setup</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-purple-200/50 shadow-glass-lg">
          <p className="text-xs text-gray-500 mb-5 leading-relaxed bg-purple-50 rounded-xl p-3 border border-purple-100">
            This page only works once — when no admin account exists yet. After setup it's permanently disabled.
          </p>

          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="teja@example.com" className="input-light" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Min. 8 characters" className="input-light" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                placeholder="Repeat password" className="input-light" />
            </div>

            {message && (
              <div className={`text-xs px-3 py-2.5 rounded-xl border ${
                message.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                {message.text}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', boxShadow: '0 4px 20px rgba(124,58,237,0.25)' }}>
              {loading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating…</> : 'Create Admin Account'}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600">← Back to Login</a>
        </div>
      </div>
    </div>
  )
}
