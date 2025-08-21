import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Map, Bot, Compass, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <section className="relative isolate">
      <AnimatedBackground />

      {/* Hero Section */}
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
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/map"
              className="rounded-lg bg-brand-500 px-6 py-3 text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              Start Navigating
            </Link>
            <Link
              to="/assistant"
              className="rounded-lg border border-white/10 px-6 py-3 hover:bg-white/10"
            >
              Ask the AI
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={<Map className="h-8 w-8 text-brand-400" />}
          title="Interactive Map"
          desc="Explore classrooms, labs, and events with a smooth and dynamic campus map."
        />
        <FeatureCard
          icon={<Bot className="h-8 w-8 text-brand-400" />}
          title="AI Assistant"
          desc="Chat with our AI to quickly find directions, schedules, and campus info."
        />
        <FeatureCard
          icon={<Compass className="h-8 w-8 text-brand-400" />}
          title="Smart Navigation"
          desc="Get real-time route guidance and estimated walking times."
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-brand-400" />}
          title="Community"
          desc="Connect with peers and explore upcoming events around campus."
        />
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden bg-brand-600/10 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to explore the campus?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Start your journey now with our interactive campus AI platform.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/map"
              className="rounded-lg bg-brand-500 px-6 py-3 text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
            >
              Open the Map
            </Link>
            <Link
              to="/assistant"
              className="rounded-lg border border-white/10 px-6 py-3 hover:bg-white/10"
            >
              Chat with AI
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <motion.div
      className="rounded-xl border border-white/10 bg-white/5 p-6 text-center shadow hover:bg-white/10 transition"
      whileHover={{ scale: 1.03 }}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </motion.div>
  )
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-600/30 to-brand-400/30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
    </div>
  )
}
