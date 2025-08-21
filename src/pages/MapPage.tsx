import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet"
import L, { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"

type CampusPlace = {
  key: string
  name: string
  coords: LatLngExpression
  description: string
  image?: string
}

const CAMPUS_PLACES: CampusPlace[] = [
  {
    key: "gate",
    name: "Campus Gate",
    coords: [28.797629, 77.53698],
    description: "Main entrance to the university campus.",
    image: "/places/main_gate.jpg",
  },
  {
    key: "atm",
    name: "Axis Bank ATM",
    coords: [28.7968044, 77.5379392],
    description: "ATM for cash withdrawals and banking services.",
    image: "/places/atm.jpg",
  },
  {
    key: "zoysia_lawn",
    name: "Zoysia Lawn",
    coords: [28.7967601, 77.5381506],
    description: "Spacious lawn area for relaxation and events.",
    image: "/places/zoysia_lawn.jpg",
  },
  {
    key: "admin",
    name: "Admin Block",
    coords: [28.7966238, 77.5380648],
    description: "Administrative offices for student and faculty support.",
    image: "/places/admin.jpg",
  },
  {
    key: "stationary",
    name: "Stationary",
    coords: [28.796807729990185, 77.53836186382996],
    description: "Stationary shop for books, pens, and other essentials.",
    image: "/places/stationary.jpg",
  },
  {
    key: "academic_block",
    name: "Academic Block",
    coords: [28.796330575437615, 77.53815131042977],
    description: "Main academic building with classrooms and labs.",
    image: "/places/academic_block.jpg",
  },
  {
    key: "basketball_court",
    name: "Basketball Court",
    coords: [28.797125048309947, 77.5390283927739],
    description: "Outdoor basketball court for sports activities.",
    image: "/places/basketball_court.jpg",
  },
  {
    key: "volleyball_court",
    name: "Volleyball Court",
    coords: [28.79696403876668, 77.53922687623707],
    description: "Outdoor volleyball court for sports activities.",
    image: "/places/volleyball_court.jpg",
  },
  {
    key: "red_canteen",
    name: "Red Canteen",
    coords: [28.79627886397272, 77.53913165781404],
    description: "Popular canteen serving snacks and beverages.",
    image: "/places/red_canteen.jpg",
  },
  {
    key: "cricket_ground",
    name: "Cricket Ground",
    coords: [28.796664348805024, 77.54026623223562],
    description: "Cricket ground for matches and practice.",
    image: "/places/cricket_ground.jpg",
  },
  {
    key: "football_ground",
    name: "Football Ground",
    coords: [28.797556364622015, 77.53942670082552],
    description: "Football ground for matches and practice.",
    image: "/places/football_ground.jpg",
  },
  {
    key: "hblock",
    name: "H Block Hostel",
    coords: [28.79554667392576, 77.54028232548832],
    description: "Hostel accommodation for students.",
    image: "/places/hblock.jpg",
  },
  {
    key: "gblock",
    name: "G Block",
    coords: [28.796133131536337, 77.54073293660865],
    description: "Hostel accommodation for students.",
    image: "/places/gblock.jpg",
  },
  {
    key: "dblock",
    name: "D Block",
    coords: [28.796492761215497, 77.54108967040057],
    description: "Hostel accommodation for students.",
    image: "/places/gblock.jpg",
  },
]

const SUGGESTED_LOCATIONS = CAMPUS_PLACES.map((p) => p.name)

export default function MapPage() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<CampusPlace | null>(null)
  const [showPath, setShowPath] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const onSearch = (locName: string) => {
    const place = CAMPUS_PLACES.find(
      (p) => p.name.toLowerCase() === locName.toLowerCase()
    )
    if (place) {
      setSelected(place)
      setShowPath(true)
      setQuery(place.name)
      setSuggestions([])
    }
  }

  const handleInput = (value: string) => {
    setQuery(value)
    if (value.length > 0) {
      const matches = SUGGESTED_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        {/* Sidebar */}
        <aside className="glass rounded-xl p-4 max-h-[90vh] overflow-y-auto">
          <h2 className="mb-3 font-semibold">Search Location</h2>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Try 'Campus Gate'"
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-brand-500/40 focus:ring-2"
            />
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute z-20 mt-1 w-full rounded-lg border border-white/10 bg-slate-900/95 text-sm shadow-lg"
                >
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      onClick={() => onSearch(s)}
                      className="cursor-pointer px-3 py-2 hover:bg-white/10"
                    >
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => onSearch(query || "Campus Gate")}
            className="mt-3 w-full rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium hover:bg-brand-400"
          >
            Go
          </button>

          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
              Suggested
            </p>
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

          {/* Info Panel */}
          {selected && (
            <motion.div
              key={selected.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-lg border border-white/10 bg-slate-800/50 p-4"
            >
              <h3 className="font-semibold">{selected.name}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {selected.description}
              </p>
              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="mt-3 w-full rounded-lg object-cover"
                />
              )}
            </motion.div>
          )}
        </aside>

        {/* Map */}
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

function LeafletMap({
  selected,
  showPath,
}: {
  selected: CampusPlace | null
  showPath: boolean
}) {
  const defaultCenter: LatLngExpression = [28.796568, 77.538177]
  const mapRef = useRef<L.Map | null>(null)

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: #3b82f6; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px rgba(59,130,246,0.8); animation: pulse 2s infinite;"></div>`,

        iconSize: [18, 18],
        iconAnchor: [9, 9],
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
    return (
      <Polyline
        positions={[start, end]}
        pathOptions={{ color: "#3b82f6", weight: 4, opacity: 0.8 }}
      />
    )
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={17}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      ref={mapRef} // ✅ use ref instead of whenCreated
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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