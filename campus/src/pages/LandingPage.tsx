import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <section className="relative isolate">
      <AnimatedBackground />

      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="text-center">
          <motion.h1
            className="mx-auto max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Navigate Our Campus with AI
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find your way to classrooms, labs, and events with smooth animations and an AI chat assistant.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/map"
              className="rounded-lg bg-brand-500 px-5 py-3 text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              Start Navigating
            </Link>
            <Link to="/assistant" className="rounded-lg border border-white/10 px-5 py-3 hover:bg-white/10">
              Ask the AI
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-600/30 to-brand-400/30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
    </div>
  )
}



