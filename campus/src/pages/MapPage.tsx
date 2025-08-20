import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SUGGESTED_LOCATIONS = ['Library', 'Cafeteria', 'Admin Block', 'Auditorium', 'Hostel', 'Sports Complex']

export default function MapPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showPath, setShowPath] = useState(false)

  const onSearch = (loc: string) => {
    setSelected(loc)
    setShowPath(true)
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
              placeholder="Try 'Library'"
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-brand-500/40 focus:ring-2"
            />
            <button
              onClick={() => onSearch(query || 'Library')}
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
            <div className="absolute inset-0 grid place-items-center">
              <div className="pointer-events-none select-none text-center">
                <div className="text-sm text-slate-400">Campus Map (placeholder)</div>
                <div className="mt-2 text-xs text-slate-500">Markers and paths animate in</div>
              </div>
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  key="marker"
                  className="absolute left-1/3 top-1/3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-brand-500/30" />
                  <div className="mt-2 text-xs text-slate-300">{selected}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showPath && (
                <motion.svg
                  key="path"
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full"
                >
                  <motion.path
                    d="M10 90 C 30 70, 50 60, 70 40 S 90 20, 90 10"
                    fill="transparent"
                    stroke="url(#grad)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.0" />
                      <stop offset="20%" stopColor="#60a5fa" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



