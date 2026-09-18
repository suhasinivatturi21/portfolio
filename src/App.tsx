import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Skills } from "@/components/Skills"
import { DataLab } from "@/components/DataLab"
import { Projects } from "@/components/Projects"
import { ProjectDetail } from "@/components/ProjectDetail"
import { EventDiary } from "@/components/EventDiary"
import { EventDetail } from "@/components/EventDetail"
import { DataMeetsEvents } from "@/components/DataMeetsEvents"
import { Experience } from "@/components/Experience"
import { CreativeCorner } from "@/components/CreativeCorner"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/CustomCursor"
import { ScrollProgress } from "@/components/ScrollProgress"
import { ProjectModal } from "@/components/ProjectModal"
import { projects } from "@/data/projects"
import { AdminMedia } from "@/components/AdminMedia"

function AnchorScroll() {
  const location = useLocation()

  useEffect(() => {
    // Prefer explicit state scroll instruction, fall back to hash
    const targetFromState = (location.state && (location.state as any).scrollTo) as string | undefined
    const id = targetFromState || (location.hash ? location.hash.slice(1) : undefined)
    if (!id) return
    let cancelled = false
    const tryScroll = (attempts = 0) => {
      if (cancelled) return
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } else if (attempts < 20) {
        window.setTimeout(() => tryScroll(attempts + 1), 50)
      }
    }
    tryScroll()
    return () => { cancelled = true }
  }, [location])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <DataLab />
      <Projects />
      <DataMeetsEvents />
      <EventDiary />
      <Experience />
      <CreativeCorner />
      <Contact />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state as any)
  const background = state && state.background

  const closeModal = () => {
    // prefer going back in history when possible
    navigate(-1)
  }

  return (
    <>
      <AnchorScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/admin" element={<AdminMedia />} />
          <Route path="/events/:slug" element={<EventDetail />} />
        </Routes>

        {/* Modal routes (rendered over the background) */}
        {background && (
          <Routes>
            <Route
              path="/projects/:slug"
              element={<ModalProjectRoute onClose={closeModal} />}
            />
          </Routes>
        )}
      </main>
      <Footer />
    </>
  )
}

function ModalProjectRoute({ onClose }: { onClose: () => void }) {
  // read slug from the URL and find project
  const loc = useLocation()
  const match = loc.pathname.match(/\/projects\/(.+)/)
  const slug = match ? match[1] : undefined
  const project = projects.find((p) => p.slug === slug)
  if (!project) return null
  return <ProjectModal project={project} onClose={onClose} />
}

export default App
