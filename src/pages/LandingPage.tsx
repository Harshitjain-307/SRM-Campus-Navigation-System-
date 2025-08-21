import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <section className="relative isolate">
      <AnimatedBackground />

      <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: Hero copy */}
          <div>
            <motion.h1
              className="text-balance text-4xl font-extrabold tracking-tight sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Navigate Our Campus
              </span>
              <span className="mt-2 block bg-gradient-to-r from-brand-300 via-brand-500 to-cyan-300 bg-clip-text text-transparent">
                with Intelligence
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Real-time maps, smart routes, and an AI assistant designed for students. Find classrooms, labs, canteens, and events with a beautiful, fluid experience.
            </motion.p>

            {/* Feature badges */}
            <motion.ul
              className="mt-8 flex flex-wrap items-center gap-3 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {[
                'Live Map • Leaflet',
                'Street View Preview',
                'AI Q&A Assistant',
                'Quick Access Shortcuts',
              ].map((feat) => (
                <li
                  key={feat}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200 backdrop-blur hover:border-brand-500/40"
                >
                  {feat}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/map"
                className="group relative rounded-xl bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 px-6 py-3 text-white shadow-lg shadow-brand-500/25 transition hover:scale-[1.02]"
              >
                <span className="relative z-10">Start Navigating</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/0 opacity-0 transition group-hover:opacity-100" />
              </Link>
              <Link
                to="/assistant"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-slate-200 backdrop-blur transition hover:border-brand-500/40 hover:text-white"
              >
                Ask the AI
              </Link>
            </motion.div>

            {/* Social proof / stats */}
            <motion.div
              className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4 text-center text-sm text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold text-white">50+</p>
                <p>Buildings</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold text-white">200+</p>
                <p>Classrooms</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xl font-bold text-white">24/7</p>
                <p>Assistant</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating preview card */}
          <motion.div
            className="relative mx-auto w-full max-w-xl"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur">
              <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-tr from-brand-500/30 to-cyan-400/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500/20 to-brand-400/10 blur-2xl" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Assistant</p>
                  <p className="mt-2 text-sm text-white">Ask for directions or find facilities instantly.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Map</p>
                  <p className="mt-2 text-sm text-white">Pan, zoom and explore campus with interactive markers.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Street View</p>
                  <p className="mt-2 text-sm text-white">Preview locations when available, with a clean toggle.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute -top-32 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-600/25 to-brand-400/20 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tr from-cyan-500/20 to-brand-400/15 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      />

      {/* Subtle textured background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(ellipse_at_40%_80%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Base background tint */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#0b1220_0%,#0f172a_50%,#0b1220_100%)] opacity-90" />
    </div>
  )
}



