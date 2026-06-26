import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

// ── Try to load optional auth deps (bcryptjs + jsonwebtoken)
let bcrypt, jwt
try {
  bcrypt = (await import('bcryptjs')).default
  jwt    = (await import('jsonwebtoken')).default
} catch {
  console.warn('⚠  bcryptjs / jsonwebtoken not installed. Run: npm install bcryptjs jsonwebtoken')
  console.warn('   Auth endpoints will be disabled until then.')
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = process.env.API_PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'teja-portfolio-secret-change-me'

// ── Database Initialization with Graceful Fallback
let sql
if (process.env.DATABASE_URL) {
  try {
    sql = neon(process.env.DATABASE_URL)
    console.log('✔  Neon client initialized.')
  } catch (err) {
    console.error('⚠  Failed to initialize Neon client:', err.message)
  }
} else {
  console.warn('⚠  DATABASE_URL environment variable is missing. Set it in .env to connect to your Neon database.')
}

// Middleware to protect DB-reliant endpoints from crashing if DATABASE_URL is missing
const requireDB = (req, res, next) => {
  if (!sql) {
    return res.status(503).json({
      error: 'Database connection not configured. Please set DATABASE_URL in a .env file.'
    })
  }
  next()
}

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

const uploadsDir = path.join(__dirname, '../public/uploads/resumes')
try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
} catch (e) {
  console.warn('⚠ Could not create uploads directory (expected on Vercel)')
}
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// ── JWT Auth Middleware ─────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  if (!jwt) return res.status(503).json({ error: 'Auth not available — install bcryptjs jsonwebtoken' })
  const auth = req.headers.authorization?.split(' ')[1]
  if (!auth) return res.status(401).json({ error: 'No token provided' })
  try {
    req.admin = jwt.verify(auth, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// ── AUTH ROUTES ─────────────────────────────────────────────────────────────

// POST /api/auth/setup  — create FIRST admin
app.post('/api/auth/setup', requireDB, async (req, res) => {
  if (!bcrypt || !jwt) return res.status(503).json({ error: 'Auth deps not installed' })
  try {
    const existing = await sql`SELECT COUNT(*) as c FROM admins`
    if (parseInt(existing[0].c) > 0)
      return res.status(403).json({ error: 'Setup already complete. An admin already exists.' })

    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

    const hash = await bcrypt.hash(password, 12)
    const [admin] = await sql`
      INSERT INTO admins (email, password_hash) VALUES (${email}, ${hash}) RETURNING id, email, created_at
    `
    res.json({ success: true, admin })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/login
app.post('/api/auth/login', requireDB, async (req, res) => {
  if (!bcrypt || !jwt) return res.status(503).json({ error: 'Auth deps not installed' })
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })

    const rows = await sql`SELECT * FROM admins WHERE email = ${email} LIMIT 1`
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: rows[0].id, email: rows[0].email }, JWT_SECRET, { expiresIn: '24h' })
    res.json({ token, email: rows[0].email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/auth/me  — verify token validity
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ email: req.admin.email, id: req.admin.id })
})

// ── PUBLIC READ ROUTES ───────────────────────────────────────────────────────

app.get('/api/profile', requireDB, async (req, res) => {
  try { res.json((await sql`SELECT * FROM profile LIMIT 1`)[0] || null) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/skills', requireDB, async (req, res) => {
  try { res.json(await sql`SELECT * FROM skills ORDER BY category, name`) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/projects', requireDB, async (req, res) => {
  try { res.json(await sql`SELECT * FROM projects ORDER BY sort_order, created_at`) }
  catch (err) { res.status(500).json({ error: err.message }) }
})

// ── ADMIN — SKILLS ───────────────────────────────────────────────────────────

app.post('/api/skills', requireAuth, requireDB, async (req, res) => {
  try {
    const { name, category } = req.body
    if (!name || !category) return res.status(400).json({ error: 'name and category required' })
    const [row] = await sql`INSERT INTO skills (name, category) VALUES (${name}, ${category}) RETURNING *`
    res.json(row)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/skills/:id', requireAuth, requireDB, async (req, res) => {
  try {
    await sql`DELETE FROM skills WHERE id = ${req.params.id}`
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── ADMIN — PROJECTS ─────────────────────────────────────────────────────────

app.post('/api/projects', requireAuth, requireDB, async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured, sort_order } = req.body
    if (!title) return res.status(400).json({ error: 'title required' })
    const techArray = Array.isArray(tech_stack)
      ? tech_stack
      : (tech_stack || '').split(',').map(s => s.trim()).filter(Boolean)
    const [row] = await sql`
      INSERT INTO projects (title, description, tech_stack, github_url, live_url, featured, sort_order)
      VALUES (${title}, ${description||null}, ${techArray}, ${github_url||null}, ${live_url||null}, ${!!featured}, ${sort_order||0})
      RETURNING *
    `
    res.json(row)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.put('/api/projects/:id', requireAuth, requireDB, async (req, res) => {
  try {
    const { title, description, tech_stack, github_url, live_url, featured, sort_order } = req.body
    const techArray = Array.isArray(tech_stack)
      ? tech_stack
      : (tech_stack || '').split(',').map(s => s.trim()).filter(Boolean)
    const [row] = await sql`
      UPDATE projects SET
        title       = ${title},
        description = ${description||null},
        tech_stack  = ${techArray},
        github_url  = ${github_url||null},
        live_url    = ${live_url||null},
        featured    = ${!!featured},
        sort_order  = ${sort_order||0}
      WHERE id = ${req.params.id}
      RETURNING *
    `
    res.json(row)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/projects/:id', requireAuth, requireDB, async (req, res) => {
  try {
    await sql`DELETE FROM projects WHERE id = ${req.params.id}`
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── ADMIN — PROFILE ──────────────────────────────────────────────────────────

app.put('/api/profile', requireAuth, requireDB, async (req, res) => {
  try {
    const { resume_url } = req.body
    const [row] = await sql`UPDATE profile SET resume_url=${resume_url??null}, updated_at=NOW() RETURNING *`
    res.json(row)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── ADMIN — RESUME UPLOAD ────────────────────────────────────────────────────

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('PDF only')),
})

app.post('/api/resume', requireAuth, upload.single('file'), requireDB, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
    const url = `/api/resume/download`
    const [row] = await sql`
      UPDATE profile 
      SET resume_url = ${url},
          resume_data = ${req.file.buffer},
          resume_mime = ${req.file.mimetype},
          updated_at = NOW() 
      RETURNING *
    `
    res.json({ url, profile: row })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.get('/api/resume/download', requireDB, async (req, res) => {
  try {
    const rows = await sql`SELECT resume_data, resume_mime FROM profile LIMIT 1`
    if (!rows.length || !rows[0].resume_data) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    res.setHeader('Content-Type', rows[0].resume_mime || 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"')
    res.send(rows[0].resume_data)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.delete('/api/resume', requireAuth, requireDB, async (req, res) => {
  try {
    await sql`
      UPDATE profile 
      SET resume_url = NULL, 
          resume_data = NULL, 
          resume_mime = NULL, 
          updated_at = NOW()
    `
    res.json({ success: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ── SERVE FRONTEND STATIC FILES IN PRODUCTION ───────────────────────────────
const distDir = path.join(__dirname, '../dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'))
  })
}

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`\n  TEJA API  →  http://localhost:${PORT}`)
    console.log(`  DB: ${process.env.DATABASE_URL ? 'Neon connected' : 'DATABASE_URL not set (graceful mode active)'}`)
  })
}

export default app
