import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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

function AnchorScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
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
  }, [location.hash])

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
      <AnchorScroll />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/events/:slug" element={<EventDetail />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
