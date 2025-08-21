import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Location {
  id: string
  name: string
  description: string
  coordinates: { x: number; y: number }
  type: 'building' | 'facility' | 'landmark'
  details: {
    floors: number
    departments: string[]
    facilities: string[]
    hours: string
  }
}

const locations: Location[] = [
  { id: 'admin-block', name: 'Admin Block', description: 'Main administrative building with student services', coordinates: { x: 45, y: 35 }, type: 'building', details: { floors: 4, departments: ['Admissions', 'Student Affairs', 'Finance', 'HR'], facilities: ['Reception', 'Conference Rooms', 'Student Center'], hours: '8:00 AM - 6:00 PM' } },
  { id: 'campus-gate', name: 'Campus Gate', description: 'Main entrance to SRM University', coordinates: { x: 20, y: 20 }, type: 'landmark', details: { floors: 1, departments: ['Security', 'Information Desk'], facilities: ['Security Check', 'Visitor Registration'], hours: '24/7' } },
  { id: 'red-canteen', name: 'Red Canteen', description: 'Popular food court with multiple cuisines', coordinates: { x: 70, y: 60 }, type: 'facility', details: { floors: 2, departments: ['Food Services'], facilities: ['Food Courts', 'Beverage Station', 'Seating Area'], hours: '7:00 AM - 10:00 PM' } },
  { id: 'h-block-hostel', name: 'H Block Hostel', description: 'Student accommodation with modern amenities', coordinates: { x: 80, y: 25 }, type: 'building', details: { floors: 6, departments: ['Student Housing'], facilities: ['Rooms', 'Common Areas', 'Laundry', 'Study Rooms'], hours: '24/7' } },
  { id: 'g-block', name: 'G Block', description: 'Academic building with lecture halls', coordinates: { x: 60, y: 45 }, type: 'building', details: { floors: 5, departments: ['Computer Science', 'Engineering', 'Mathematics'], facilities: ['Lecture Halls', 'Labs', 'Faculty Offices'], hours: '7:00 AM - 9:00 PM' } },
  { id: 'stationary', name: 'Stationary Store', description: 'Campus bookstore and supplies', coordinates: { x: 35, y: 70 }, type: 'facility', details: { floors: 1, departments: ['Retail Services'], facilities: ['Bookstore', 'Office Supplies', 'Printing Services'], hours: '9:00 AM - 7:00 PM' } },
]

// Real lat/lng for the markers
const LATLNG: Record<string, [number, number]> = {
  'campus-gate': [28.797629, 77.53698],
  'admin-block': [28.796568, 77.538177],
  'stationary': [28.796775, 77.538381],
  'red-canteen': [28.796051, 77.53915],
  'h-block-hostel': [28.795657, 77.539948],
  'g-block': [28.796079, 77.540866],
}

const HAS_STREET_VIEW: Record<string, boolean> = {
  'campus-gate': true,
  'admin-block': true,
  'stationary': false,
  'red-canteen': false,
  'h-block-hostel': false,
  'g-block': false,
}

function getStreetViewEmbedUrl(lat: number, lng: number) {
  const base = 'https://maps.google.com/maps'
  const params = new URLSearchParams({ q: '', layer: 'c', cbll: `${lat},${lng}`, cbp: '11,0,0,0,0', lci: 'com.google.streetview', source: 'embed', output: 'svembed' })
  return `${base}?${params.toString()}`
}

function getMapEmbedUrl(lat: number, lng: number, zoom = 17) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`
}

export default function MapPage() {
  const [query, setQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [searchResults, setSearchResults] = useState<Location[]>([])
  const [viewMode, setViewMode] = useState<'street' | 'map'>('map')

  const onSearch = () => {
    if (!query.trim()) return
    const results = locations.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
    if (results.length) {
      const loc = results[0]
      setSelectedLocation(loc)
      setViewMode(HAS_STREET_VIEW[loc.id] ? 'street' : 'map')
      setShowModal(true)
    }
  }

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #60a5fa; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,.35);"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    []
  )

  const defaultCenter: [number, number] = LATLNG['admin-block']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">{/* increased gap and explicit column sizing */}
          {/* Left panel */}
          <aside className="space-y-6 relative z-10">{/* ensure above map */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                Search Location
              </h2>
              <div className="space-y-4">
                <div className="flex gap-2 items-stretch w-full">
                  <input
                    type="text"
                    placeholder="Try 'Admin Block' or 'Red Canteen'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    className="flex-1 min-w-0 bg-slate-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={onSearch}
                    className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25 whitespace-nowrap flex-shrink-0"
                  >
                    Go
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400 font-medium">Search Results:</p>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setSelectedLocation(result)
                          setViewMode(HAS_STREET_VIEW[result.id] ? 'street' : 'map')
                          setShowModal(true)
                        }}
                        className="w-full bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-3 text-left transition-all hover:border-brand-500/30"
                      >
                        <p className="font-medium text-white">{result.name}</p>
                        <p className="text-sm text-slate-400">{result.description}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                {locations.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLocation(l)
                      setViewMode(HAS_STREET_VIEW[l.id] ? 'street' : 'map')
                      setShowModal(true)
                    }}
                    className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-slate-600/50 hover:to-slate-700/50 border border-white/10 hover:border-brand-500/30 rounded-xl p-3 text-left transition-all"
                  >
                    <div className="w-3 h-3 bg-brand-500 rounded-full mb-2" />
                    <p className="font-medium text-white text-sm">{l.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{l.type}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right: real Leaflet map */}
          <div className={`relative lg:col-span-1 overflow-hidden rounded-2xl border border-white/10 ${showModal ? 'pointer-events-none' : ''}`}> {/* disable interactions when modal open */}
            <MapContainer center={defaultCenter} zoom={18} style={{ height: 600, width: '100%' }} scrollWheelZoom>
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {Object.entries(LATLNG).map(([id, [lat, lng]]) => (
                <Marker key={id} position={[lat, lng]} icon={markerIcon} eventHandlers={{ click: () => {
                  const loc = locations.find((l) => l.id === id)
                  if (loc) {
                    setSelectedLocation(loc)
                    setViewMode(HAS_STREET_VIEW[id] ? 'street' : 'map')
                    setShowModal(true)
                  }
                } }}>
                  <Popup>
                    <div className="min-w-[140px]">
                      <p className="font-semibold">{locations.find((l) => l.id === id)?.name}</p>
                      <p className="text-xs text-slate-600">Click marker to view details</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Modal with Street/Map toggle */}
        <AnimatePresence>
          {showModal && selectedLocation && (
            <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-slate-800 rounded-2xl border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-hidden" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setShowModal(false)} className="rounded-md border border-white/15 bg-slate-700/60 px-3 py-1.5 text-sm text-white hover:bg-slate-600 transition">
                        ← Back
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedLocation.name}</h2>
                        <p className="text-slate-300 mt-1">{selectedLocation.description}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg border border-white/20 text-white transition-all flex items-center justify-center hover:scale-110">✕</button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setViewMode('street')} disabled={!HAS_STREET_VIEW[selectedLocation.id]} className={`px-3 py-1.5 rounded-md text-sm border transition ${viewMode === 'street' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-700 text-slate-200 border-white/10 hover:bg-slate-600'} ${!HAS_STREET_VIEW[selectedLocation.id] ? 'opacity-50 cursor-not-allowed' : ''}`}>Street View</button>
                    <button onClick={() => setViewMode('map')} className={`px-3 py-1.5 rounded-md text-sm border transition ${viewMode === 'map' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-700 text-slate-200 border-white/10 hover:bg-slate-600'}`}>Map</button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-900/70 rounded-xl border border-white/10 p-0 h-64 overflow-hidden">
                      {(() => {
                        const coords = LATLNG[selectedLocation.id]
                        if (!coords) return <div className="h-full flex items-center justify-center text-slate-400 text-sm">Location coordinates not available.</div>
                        const [lat, lng] = coords
                        if (viewMode === 'street') {
                          if (!HAS_STREET_VIEW[selectedLocation.id]) return <div className="h-full flex items-center justify-center text-slate-400 text-sm">Street View not available here. Switch to Map.</div>
                          return <iframe title={`${selectedLocation.name} Street View`} src={getStreetViewEmbedUrl(lat, lng)} className="w-full h-full" allowFullScreen loading="lazy" />
                        }
                        return <iframe title={`${selectedLocation.name} Map`} src={getMapEmbedUrl(lat, lng, 17)} className="w-full h-full" loading="lazy" />
                      })()}
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                        <h4 className="font-medium text-white mb-2">Building Information</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-slate-400">Floors:</span><span className="text-white ml-2">{selectedLocation.details.floors}</span></div>
                          <div><span className="text-slate-400">Hours:</span><span className="text-white ml-2">{selectedLocation.details.hours}</span></div>
                        </div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                        <h4 className="font-medium text-white mb-2">Departments</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.details.departments.map((d, i) => (
                            <span key={i} className="px-2 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-md border border-brand-500/30">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                        <h4 className="font-medium text-white mb-2">Facilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.details.facilities.map((f, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-md border border-green-500/30">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


