import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutCard from '../components/AboutCard'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import ResumeCard from '../components/ResumeCard'
import ContactSection from '../components/ContactSection'
import { getProfile, getSkills, getProjects } from '../lib/api'
import { staticProfile, staticSkills, staticProjects } from '../lib/data'

export default function Portfolio() {
  const [profile, setProfile] = useState(staticProfile)
  const [skills, setSkills] = useState(staticSkills)
  const [projects, setProjects] = useState(staticProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, skillsData, projectsData] = await Promise.all([
          getProfile(),
          getSkills(),
          getProjects(),
        ])
        if (profileData) setProfile(profileData)
        if (skillsData?.length) setSkills(skillsData)
        if (projectsData?.length) {
          // Merge accent from static map by title
          const staticMap = Object.fromEntries(staticProjects.map((p) => [p.title, p]))
          setProjects(
            projectsData.map((p) => ({
              ...p,
              accent: staticMap[p.title]?.accent || 'purple',
            }))
          )
        }
      } catch (err) {
        console.warn('API fetch failed — using static data:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Scroll-reveal observer
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Global ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/30 rounded-full filter blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-100/40 rounded-full filter blur-[200px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-purple-600/30 border-t-purple-600 animate-spin" />
              <p className="text-gray-400 text-sm font-mono">Loading TEJA.dev…</p>
            </div>
          </div>
        ) : (
          <>
            <HeroSection profile={profile} />
            <div className="reveal"><AboutCard profile={profile} /></div>
            <div className="reveal"><SkillsSection skills={skills} /></div>
            <div className="reveal"><ProjectsSection projects={projects} /></div>
            <div className="reveal"><ResumeCard profile={profile} /></div>
            <div className="reveal"><ContactSection /></div>
          </>
        )}
      </div>
    </div>
  )
}
