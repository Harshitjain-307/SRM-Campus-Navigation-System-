import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type CampusPlace = {
  key: string
  name: string
  coords: LatLngExpression
}

const CAMPUS_PLACES: CampusPlace[] = [
  { key: 'gate', name: 'Campus Gate', coords: [28.797629, 77.536980] },
  { key: 'admin', name: 'Admin Block', coords: [28.796568, 77.538177] },
  { key: 'stationary', name: 'Stationary', coords: [28.796775, 77.538381] },
  { key: 'canteen', name: 'Red Canteen', coords: [28.796051, 77.539150] },
  { key: 'hblock', name: 'H Block Hostel', coords: [28.795657, 77.539948] },
  { key: 'gblock', name: 'G Block', coords: [28.796079, 77.540866] },
]

const SUGGESTED_LOCATIONS = CAMPUS_PLACES.map((p) => p.name)

export default function MapPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<CampusPlace | null>(null)
  const [showPath, setShowPath] = useState(false)

  const onSearch = (locName: string) => {
    const place = CAMPUS_PLACES.find((p) => p.name.toLowerCase() === locName.toLowerCase())
    if (place) {
      setSelected(place)
      setShowPath(true)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        <aside className="glass rounded-xl p-4">
          <h2 className="mb-3 font-semibold">Search Location</h2>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'Campus Gate'"
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-brand-500/40 focus:ring-2"
            />
            <button
              onClick={() => onSearch(query || 'Campus Gate')}
              className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium hover:bg-brand-400"
            >
              Go
            </button>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Suggested</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => onSearch(loc)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs hover:bg-white/10"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60">
          <motion.div
            className="relative h-[520px] w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LeafletMap selected={selected} showPath={showPath} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LeafletMap({ selected, showPath }: { selected: CampusPlace | null; showPath: boolean }) {
  const defaultCenter: LatLngExpression = [28.796568, 77.538177]
  const mapRef = useRef<L.Map | null>(null)

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #60a5fa; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    []
  )

  const Path = () => {
    const map = useMap()
    useEffect(() => {
      if (selected) {
        map.flyTo(selected.coords as LatLngExpression, 18, { duration: 1 })
      }
    }, [selected, map])

    if (!selected || !showPath) return null
    const start: LatLngExpression = defaultCenter
    const end: LatLngExpression = selected.coords
    return <Polyline positions={[start, end]} pathOptions={{ color: '#60a5fa', weight: 4, opacity: 0.8 }} />
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={17}
      scrollWheelZoom
      style={{ height: '100%', width: '100%' }}
      whenCreated={(m) => (mapRef.current = m)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {CAMPUS_PLACES.map((p) => (
        <Marker key={p.key} position={p.coords} icon={markerIcon}>
          <Popup>{p.name}</Popup>
        </Marker>
      ))}

      <Path />
    </MapContainer>
  )
}


