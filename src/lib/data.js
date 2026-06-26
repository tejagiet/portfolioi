// Static fallback data (used when API server is unreachable)
// No emojis — clean professional design

export const staticProfile = {
  name: 'Molleti Teja Yeswanth Veera Manikanta',
  title: 'Full-Stack Developer, Photo/Video Editor & AI Innovator',
  bio: 'Student of Artificial Intelligence at GIET Polytechnic College, Rajahmundry. I build modern web ecosystems with React, Neon, and Python — from campus platforms to AI-integrated operating systems.',
  location: 'Srirangapatnam, Andhra Pradesh',
  college: 'GIET Polytechnic College, Rajahmundry',
  hardware: 'Custom Touchscreen Dell Latitude 5420',
  resume_url: null,
  photo_url: '/teja.png',
}

export const staticSkills = [
  { id: '1',  name: 'React',            category: 'Frontend' },
  { id: '2',  name: 'TypeScript',       category: 'Frontend' },
  { id: '3',  name: 'JavaScript',       category: 'Frontend' },
  { id: '4',  name: 'HTML / CSS',       category: 'Frontend' },
  { id: '5',  name: 'Tailwind CSS',     category: 'Frontend' },
  { id: '6',  name: 'Vite',             category: 'Frontend' },
  { id: '7',  name: 'Neon',             category: 'Backend'  },
  { id: '8',  name: 'Python',           category: 'Backend'  },
  { id: '9',  name: 'SQL',              category: 'Backend'  },
  { id: '10', name: 'PostgreSQL',       category: 'Backend'  },
  { id: '11', name: 'REST APIs',        category: 'Backend'  },
  { id: '12', name: 'Express.js',       category: 'Backend'  },
  { id: '13', name: 'AI Integration',   category: 'AI/ML'    },
  { id: '14', name: 'Claude API',       category: 'AI/ML'    },
  { id: '15', name: 'AI Ethics & Safety', category: 'AI/ML'    },
  { id: '16', name: 'Git',              category: 'Tools'    },
  { id: '17', name: 'VS Code',          category: 'Tools'    },
  { id: '18', name: 'Minecraft Modding',category: 'Creative' },
  { id: '19', name: 'Photo Editing',    category: 'Creative' },
  { id: '20', name: 'Video Editing',    category: 'Creative' },
]

export const staticProjects = [
  {
    id: '1',
    title: 'Nexus',
    description: 'A comprehensive campus ecosystem built for GIET Polytechnic. Features student dashboards, faculty attendance portals, and results monitoring — connecting the entire college on one unified platform.',
    tech_stack: ['React', 'Neon', 'Python', 'SQL', 'PostgreSQL'],
    github_url: null,
    live_url: null,
    featured: true,
    sort_order: 1,
    accent: 'purple',
  },
  {
    id: '2',
    title: 'Teja OS',
    description: 'An AI-integrated operating system featuring a graphical user interface supporting multiple file formats. A full desktop environment in the browser, developed using Claude Code and React.',
    tech_stack: ['React', 'Claude API', 'JavaScript', 'CSS'],
    github_url: null,
    live_url: null,
    featured: true,
    sort_order: 2,
    accent: 'blue',
  },
  {
    id: '3',
    title: 'GGU Maitri 2026 Portal',
    description: 'A web portal developed for Godavari Global University to handle student registration and generate/verify QR code entry passes for the Maitri 2026 event.',
    tech_stack: ['React', 'Neon', 'QR Codes', 'JavaScript'],
    github_url: null,
    live_url: null,
    featured: true,
    sort_order: 3,
    accent: 'teal',
  },
  {
    id: '4',
    title: 'Minecraft Security Zone Mod',
    description: 'A custom modded experience featuring JSON definitions for doors and keycards, complete with tailored .mcaddon manifest and texture definitions for an immersive security zone gameplay.',
    tech_stack: ['JSON', 'Minecraft Add-on API', 'Texture Design'],
    github_url: null,
    live_url: null,
    featured: true,
    sort_order: 4,
    accent: 'green',
  },
]

export const skillCategories = ['Frontend', 'Backend', 'AI/ML', 'Tools', 'Creative']
