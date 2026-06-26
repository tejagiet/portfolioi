// Frontend API client — uses JWT token for all admin requests

const BASE = '/api'

// ── Token helpers ────────────────────────────────────────────────────────────
export function getToken() {
  return sessionStorage.getItem('teja-admin-token') || ''
}
export function setToken(token) {
  sessionStorage.setItem('teja-admin-token', token)
}
export function clearToken() {
  sessionStorage.removeItem('teja-admin-token')
  sessionStorage.removeItem('teja-admin-auth')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return res.json()
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export const login = (email, password) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)

export const verifyToken = () =>
  fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then(handleResponse)

// ── Public Read ───────────────────────────────────────────────────────────────

export const getProfile  = () => fetch(`${BASE}/profile`).then(handleResponse)
export const getSkills   = () => fetch(`${BASE}/skills`).then(handleResponse)
export const getProjects = () => fetch(`${BASE}/projects`).then(handleResponse)

// ── Admin — Skills ────────────────────────────────────────────────────────────

export const addSkill = (skill) =>
  fetch(`${BASE}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(skill),
  }).then(handleResponse)

export const deleteSkill = (id) =>
  fetch(`${BASE}/skills/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse)

// ── Admin — Projects ──────────────────────────────────────────────────────────

export const addProject = (project) =>
  fetch(`${BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(project),
  }).then(handleResponse)

export const updateProject = (id, project) =>
  fetch(`${BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(project),
  }).then(handleResponse)

export const deleteProject = (id) =>
  fetch(`${BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse)

// ── Admin — Resume ────────────────────────────────────────────────────────────

export const uploadResume = (file) => {
  const form = new FormData()
  form.append('file', file)
  return fetch(`${BASE}/resume`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  }).then(handleResponse)
}

export const deleteResume = () =>
  fetch(`${BASE}/resume`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse)

// ── Admin — Profile ───────────────────────────────────────────────────────────

export const updateProfile = (data) =>
  fetch(`${BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  }).then(handleResponse)
