-- ============================================================
-- TEJA Portfolio — Neon (PostgreSQL) Schema
-- Run this in: https://console.neon.tech → SQL Editor
-- ============================================================

-- ------------------------------------------------------------
-- Profile table (single row — holds bio + resume URL)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL DEFAULT 'Molleti Teja Yeswanth Veera Manikanta',
  title       TEXT DEFAULT 'Full-Stack Developer, Photo/Video Editor & AI Innovator',
  bio         TEXT DEFAULT 'Student of Artificial Intelligence at GIET Polytechnic College, Rajahmundry. Building modern web ecosystems with React, Neon, and Python.',
  location    TEXT DEFAULT 'Srirangapatnam, Andhra Pradesh',
  resume_url  TEXT,
  resume_data BYTEA,
  resume_mime TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial profile (only if empty)
INSERT INTO profile (name, title, bio, location)
SELECT
  'Molleti Teja Yeswanth Veera Manikanta',
  'Full-Stack Developer, Photo/Video Editor & AI Innovator',
  'Student of Artificial Intelligence at GIET Polytechnic College, Rajahmundry. Building modern web ecosystems with React, Neon, and Python. Creator of Nexus campus ecosystem and Teja OS.',
  'Srirangapatnam, Andhra Pradesh'
WHERE NOT EXISTS (SELECT 1 FROM profile);

-- ------------------------------------------------------------
-- Skills table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT 'General',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO skills (name, category)
SELECT name, category FROM (VALUES
  ('React',            'Frontend'),
  ('TypeScript',       'Frontend'),
  ('JavaScript',       'Frontend'),
  ('HTML / CSS',       'Frontend'),
  ('Tailwind CSS',     'Frontend'),
  ('Vite',             'Frontend'),
  ('Neon',             'Backend'),
  ('Python',           'Backend'),
  ('SQL',              'Backend'),
  ('PostgreSQL',       'Backend'),
  ('REST APIs',        'Backend'),
  ('Express.js',       'Backend'),
  ('AI Integration',   'AI/ML'),
  ('Claude API',       'AI/ML'),
  ('AI Ethics & Safety', 'AI/ML'),
  ('Git',              'Tools'),
  ('VS Code',          'Tools'),
  ('Minecraft Modding','Creative'),
  ('Photo Editing',    'Creative'),
  ('Video Editing',    'Creative')
) AS v(name, category)
WHERE NOT EXISTS (SELECT 1 FROM skills LIMIT 1);

-- ------------------------------------------------------------
-- Projects table
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  tech_stack  TEXT[],
  github_url  TEXT,
  live_url    TEXT,
  image_url   TEXT,
  featured    BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO projects (title, description, tech_stack, featured, sort_order)
SELECT title, description, tech_stack, featured, sort_order FROM (VALUES
  (
    'Nexus',
    'A comprehensive campus ecosystem built for GIET Polytechnic. Features student dashboards, faculty attendance portals, and results monitoring — connecting the entire college on one unified platform.',
    ARRAY['React', 'Neon', 'Python', 'SQL', 'PostgreSQL'],
    true, 1
  ),
  (
    'Teja OS',
    'An AI-integrated operating system featuring a graphical user interface supporting multiple file formats. A full desktop environment in the browser, developed using Claude Code and React.',
    ARRAY['React', 'Claude API', 'JavaScript', 'CSS'],
    true, 2
  ),
  (
    'GGU Maitri 2026 Portal',
    'A web portal developed for Godavari Global University to handle student registration and generate/verify QR code entry passes for the Maitri 2026 event.',
    ARRAY['React', 'Neon', 'QR Codes', 'JavaScript'],
    true, 3
  ),
  (
    'Minecraft Security Zone Mod',
    'A custom modded experience featuring JSON definitions for doors and keycards, complete with tailored .mcaddon manifest and texture definitions for an immersive security zone gameplay.',
    ARRAY['JSON', 'Minecraft Add-on API', 'Texture Design'],
    true, 4
  )
) AS v(title, description, tech_stack, featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

-- ------------------------------------------------------------
-- Admins table (holds credentials for dashboard authentication)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
