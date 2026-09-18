import { useEffect, useState } from "react"
import { projects } from "@/data/projects"
import { certifications } from "@/data/certifications"
import { events } from "@/data/events"

type Media = { id: string; name: string; dataUrl: string }

const MEDIA_KEY = "portfolio_media"
const OVERRIDES_KEY = "portfolio_overrides"

function loadMedia(): Media[] {
  try {
    return JSON.parse(localStorage.getItem(MEDIA_KEY) || "[]")
  } catch (e) {
    return []
  }
}

function saveMedia(list: Media[]) {
  localStorage.setItem(MEDIA_KEY, JSON.stringify(list))
}

function loadOverrides(): Record<string, any> {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || "{}")
  } catch (e) {
    return {}
  }
}

function saveOverrides(obj: Record<string, any>) {
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(obj))
}

export function AdminMedia() {
  const [media, setMedia] = useState<Media[]>([])
  const [overrides, setOverrides] = useState<Record<string, any>>({})
  const [targetType, setTargetType] = useState<"project" | "cert" | "event">("project")
  const [selectedProject, setSelectedProject] = useState<string | null>(projects[0]?.slug || null)

  useEffect(() => {
    // update selectedProject when targetType changes
    if (targetType === "project") setSelectedProject(projects[0]?.slug || null)
    if (targetType === "cert") setSelectedProject(certifications[0]?.id || null)
    if (targetType === "event") setSelectedProject(events[0]?.slug || null)
  }, [targetType])

  useEffect(() => {
    setMedia(loadMedia())
    setOverrides(loadOverrides())
  }, [])

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const arr = Array.from(files)
    arr.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = String(reader.result || "")
        const m: Media = { id: String(Date.now()) + Math.random().toString(36).slice(2, 7), name: file.name, dataUrl }
        const next = [m, ...media]
        setMedia(next)
        saveMedia(next)
      }
      reader.readAsDataURL(file)
    })
  }

  const attachToProject = (mediaId: string) => {
    if (!selectedProject) return
    const m = media.find((x) => x.id === mediaId)
    if (!m) return
    const next = { ...overrides }
    const key = `${targetType}:${selectedProject}`
    next[key] = next[key] || {}
    // for events we might want coverImage vs gallery; by default append to gallery
    if (targetType === "event") {
      next[key].gallery = [...(next[key].gallery || []), { src: m.dataUrl, caption: m.name, alt: m.name }]
      // if no coverImage set, set it
      if (!next[key].coverImage) next[key].coverImage = m.dataUrl
    } else if (targetType === "cert") {
      next[key].image = m.dataUrl
    } else {
      next[key].images = [...(next[key].images || []), m.dataUrl]
    }
    setOverrides(next)
    saveOverrides(next)
  }

  const setLinkForProject = (field: "github" | "liveDemo", value: string) => {
    if (!selectedProject) return
    const next = { ...overrides }
    const key = `${targetType}:${selectedProject}`
    next[key] = next[key] || {}
    next[key][field] = value
    setOverrides(next)
    saveOverrides(next)
  }

  const deleteMedia = (id: string) => {
    const next = media.filter((m) => m.id !== id)
    setMedia(next)
    saveMedia(next)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Media Manager</h2>

      <div className="mb-6">
        <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2">Target Type</label>
        <div className="flex gap-2 mb-3">
          <button onClick={() => setTargetType("project")} className={`px-3 py-1 rounded ${targetType === "project" ? "bg-primary text-primary-foreground" : "bg-card"}`}>Project</button>
          <button onClick={() => setTargetType("event")} className={`px-3 py-1 rounded ${targetType === "event" ? "bg-primary text-primary-foreground" : "bg-card"}`}>Event</button>
          <button onClick={() => setTargetType("cert")} className={`px-3 py-1 rounded ${targetType === "cert" ? "bg-primary text-primary-foreground" : "bg-card"}`}>Certification</button>
        </div>

        <label className="block text-sm mb-2">Select item to attach media</label>
        <select value={selectedProject || ""} onChange={(e) => setSelectedProject(e.target.value)} className="p-2 border rounded">
          {targetType === "project" && projects.map((p) => (
            <option value={p.slug} key={p.slug}>{p.title}</option>
          ))}
          {targetType === "event" && events.map((p) => (
            <option value={p.slug} key={p.slug}>{p.title}</option>
          ))}
          {targetType === "cert" && certifications.map((c) => (
            <option value={c.id} key={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm mb-2">Project Links (override)</label>
        <div className="flex gap-2">
          <input type="text" placeholder="GitHub URL" defaultValue={overrides[selectedProject || ""]?.github || ""} onBlur={(e) => setLinkForProject("github", e.target.value)} className="flex-1 p-2 border rounded" />
          <input type="text" placeholder="Live demo URL" defaultValue={overrides[selectedProject || ""]?.liveDemo || ""} onBlur={(e) => setLinkForProject("liveDemo", e.target.value)} className="flex-1 p-2 border rounded" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Uploaded Media</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {media.map((m) => (
          <div key={m.id} className="border p-2 rounded">
            <img src={m.dataUrl} alt={m.name} className="w-full h-32 object-cover mb-2 rounded" />
            <div className="flex justify-between items-center">
              <button onClick={() => attachToProject(m.id)} className="text-sm text-primary">Attach</button>
              <button onClick={() => deleteMedia(m.id)} className="text-sm text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">Current Overrides</h3>
      <pre className="p-3 bg-card border rounded text-sm">{JSON.stringify(overrides, null, 2)}</pre>
    </div>
  )
}

export default AdminMedia
