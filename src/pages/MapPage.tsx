import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  {
    id: 'admin-block',
    name: 'Admin Block',
    description: 'Main administrative building with student services',
    coordinates: { x: 45, y: 35 },
    type: 'building',
    details: {
      floors: 4,
      departments: ['Admissions', 'Student Affairs', 'Finance', 'HR'],
      facilities: ['Reception', 'Conference Rooms', 'Student Center'],
      hours: '8:00 AM - 6:00 PM'
    }
  },
  {
    id: 'campus-gate',
    name: 'Campus Gate',
    description: 'Main entrance to SRM University',
    coordinates: { x: 20, y: 20 },
    type: 'landmark',
    details: {
      floors: 1,
      departments: ['Security', 'Information Desk'],
      facilities: ['Security Check', 'Visitor Registration'],
      hours: '24/7'
    }
  },
  {
    id: 'red-canteen',
    name: 'Red Canteen',
    description: 'Popular food court with multiple cuisines',
    coordinates: { x: 70, y: 60 },
    type: 'facility',
    details: {
      floors: 2,
      departments: ['Food Services'],
      facilities: ['Food Courts', 'Beverage Station', 'Seating Area'],
      hours: '7:00 AM - 10:00 PM'
    }
  },
  {
    id: 'h-block-hostel',
    name: 'H Block Hostel',
    description: 'Student accommodation with modern amenities',
    coordinates: { x: 80, y: 25 },
    type: 'building',
    details: {
      floors: 6,
      departments: ['Student Housing'],
      facilities: ['Rooms', 'Common Areas', 'Laundry', 'Study Rooms'],
      hours: '24/7'
    }
  },
  {
    id: 'g-block',
    name: 'G Block',
    description: 'Academic building with lecture halls',
    coordinates: { x: 60, y: 45 },
    type: 'building',
    details: {
      floors: 5,
      departments: ['Computer Science', 'Engineering', 'Mathematics'],
      facilities: ['Lecture Halls', 'Labs', 'Faculty Offices'],
      hours: '7:00 AM - 9:00 PM'
    }
  },
  {
    id: 'stationary',
    name: 'Stationary Store',
    description: 'Campus bookstore and supplies',
    coordinates: { x: 35, y: 70 },
    type: 'facility',
    details: {
      floors: 1,
      departments: ['Retail Services'],
      facilities: ['Bookstore', 'Office Supplies', 'Printing Services'],
      hours: '9:00 AM - 7:00 PM'
    }
  }
]

// Real-world lat/lng per location
const LOCATION_LATLNG: Record<string, [number, number]> = {
  'campus-gate': [28.797629, 77.53698],
  'admin-block': [28.796568, 77.538177],
  'stationary': [28.796775, 77.538381],
  'red-canteen': [28.796051, 77.53915],
  'h-block-hostel': [28.795657, 77.539948],
  'g-block': [28.796079, 77.540866],
}

// Whether Google has decent Street View coverage nearby (fallback to Map if false)
const HAS_STREET_VIEW: Record<string, boolean> = {
  'campus-gate': true,
  'admin-block': true,
  'stationary': false,
  'red-canteen': false,
  'h-block-hostel': false,
  'g-block': false,
}

function getStreetViewEmbedUrl(lat: number, lng: number): string {
  const base = 'https://maps.google.com/maps'
  const params = new URLSearchParams({
    q: '',
    layer: 'c',
    cbll: `${lat},${lng}`,
    cbp: '11,0,0,0,0',
    lci: 'com.google.streetview',
    source: 'embed',
    output: 'svembed',
  })
  return `${base}?${params.toString()}`
}

function getMapEmbedUrl(lat: number, lng: number, zoom = 17): string {
  // Simple Google Maps embed (no API key): centers map at lat,lng
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export default function MapPage() {
  const [query, setQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showStreetView, setShowStreetView] = useState(false)
  const [searchResults, setSearchResults] = useState<Location[]>([])
  const [viewMode, setViewMode] = useState<'street' | 'map'>('map')

  const handleSearch = () => {
    if (!query.trim()) return

    const results = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.description.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)

    if (results.length > 0) {
      const loc = results[0]
      setSelectedLocation(loc)
      setViewMode(HAS_STREET_VIEW[loc.id] ? 'street' : 'map')
      setShowStreetView(true)
    }
  }

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setViewMode(HAS_STREET_VIEW[location.id] ? 'street' : 'map')
    setShowStreetView(true)
    setQuery(location.name)
  }

  const closeStreetView = () => {
    setShowStreetView(false)
    setSelectedLocation(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Campus Explorer
          </h1>
          <p className="text-slate-400 text-lg">
            Discover SRM University with interactive 3D navigation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Panel */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                Search Location
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try 'Admin Block' or 'Red Canteen'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-slate-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25"
                  >
                    Go
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm text-slate-400 font-medium">Search Results:</p>
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        onClick={() => handleLocationSelect(result)}
                        className="bg-slate-700/30 hover:bg-slate-700/50 border border-white/10 rounded-lg p-3 cursor-pointer transition-all hover:border-brand-500/30 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="font-medium text-white group-hover:text-brand-300 transition-colors">
                          {result.name}
                        </h3>
                        <p className="text-sm text-slate-400">{result.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                {locations.map((location) => (
                  <motion.button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 hover:from-slate-600/50 hover:to-slate-700/50 border border-white/10 hover:border-brand-500/30 rounded-xl p-3 text-left transition-all duration-200 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-3 h-3 bg-brand-500 rounded-full mb-2 group-hover:bg-brand-400 transition-colors"></div>
                    <h4 className="font-medium text-white text-sm group-hover:text-brand-300 transition-colors">
                      {location.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{location.type}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Interactive Map */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl border border-white/10 overflow-hidden h-[600px] bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_25%),linear-gradient(to_br,#0f172a,#0b1220)]">
              {/* Subtle grid */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Campus Buildings */}
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  className={`absolute w-20 h-24 cursor-pointer transition-all duration-300 ${
                    selectedLocation?.id === location.id ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                  }`}
                  style={{
                    left: `${location.coordinates.x}%`,
                    top: `${location.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleLocationSelect(location)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Building card */}
                  <div className={`relative w-full h-full rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-all ${
                    location.type === 'building'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : location.type === 'facility'
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white/90">
                      {location.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                      <div className="bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md border border-white/10 shadow">
                        <p className="text-xs text-white font-medium text-center w-max max-w-[120px] truncate">{location.name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Path overlays */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path d="M 20% 20% Q 40% 30% 60% 45% T 80% 25%" stroke="url(#pathGradient)" strokeWidth="3" fill="none" strokeDasharray="6,6" />
                <path d="M 35% 70% Q 50% 60% 60% 45%" stroke="url(#pathGradient)" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.7" />
              </svg>

              {/* Zoom controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-slate-700/80 transition-all flex items-center justify-center shadow">
                  <span className="text-lg font-bold">+</span>
                </button>
                <button className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-slate-700/80 transition-all flex items-center justify-center shadow">
                  <span className="text-lg font-bold">−</span>
                </button>
              </div>

              {/* Attribution */}
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 shadow">
                <p className="text-xs text-slate-300">SRM University Campus Map • Interactive 3D View</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Street/Map Modal */}
        <AnimatePresence>
          {showStreetView && selectedLocation && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-800 rounded-2xl border border-white/20 max-w-5xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedLocation.name}</h2>
                      <p className="text-slate-300 mt-1">{selectedLocation.description}</p>
                    </div>
                    <button
                      onClick={closeStreetView}
                      className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg border border-white/20 text-white transition-all flex items-center justify-center hover:scale-110"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Map viewer with toggle */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => setViewMode('street')}
                          disabled={!HAS_STREET_VIEW[selectedLocation.id]}
                          className={`px-3 py-1.5 rounded-md text-sm border transition ${
                            viewMode === 'street' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-700 text-slate-200 border-white/10 hover:bg-slate-600'
                          } ${!HAS_STREET_VIEW[selectedLocation.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Street View
                        </button>
                        <button
                          onClick={() => setViewMode('map')}
                          className={`px-3 py-1.5 rounded-md text-sm border transition ${
                            viewMode === 'map' ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-700 text-slate-200 border-white/10 hover:bg-slate-600'
                          }`}
                        >
                          Map
                        </button>
                      </div>
                      <div className="bg-slate-900/70 rounded-xl border border-white/10 p-0 h-64 overflow-hidden">
                        {(() => {
                          const coords = LOCATION_LATLNG[selectedLocation.id]
                          if (!coords) {
                            return (
                              <div className="h-full flex items-center justify-center text-slate-400 text-sm">Location coordinates not available.</div>
                            )
                          }
                          const [lat, lng] = coords
                          if (viewMode === 'street') {
                            if (!HAS_STREET_VIEW[selectedLocation.id]) {
                              return (
                                <div className="h-full flex items-center justify-center text-slate-400 text-sm">Street View not available here. Switch to Map.</div>
                              )
                            }
                            return (
                              <iframe
                                title={`${selectedLocation.name} Street View`}
                                src={getStreetViewEmbedUrl(lat, lng)}
                                className="w-full h-full"
                                allowFullScreen
                                loading="lazy"
                              />
                            )
                          }
                          // Map mode
                          return (
                            <iframe
                              title={`${selectedLocation.name} Map`}
                              src={getMapEmbedUrl(lat, lng, 17)}
                              className="w-full h-full"
                              loading="lazy"
                            />
                          )
                        })()}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Details
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Building Information</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-slate-400">Floors:</span>
                              <span className="text-white ml-2">{selectedLocation.details.floors}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Hours:</span>
                              <span className="text-white ml-2">{selectedLocation.details.hours}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Departments</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedLocation.details.departments.map((dept, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-brand-500/20 text-brand-300 text-xs rounded-md border border-brand-500/30"
                              >
                                {dept}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-700/50 rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Facilities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedLocation.details.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-md border border-green-500/30"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                    <button className="flex-1 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95">
                      Get Directions
                    </button>
                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 border border-white/20">
                      Save Location
                    </button>
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


