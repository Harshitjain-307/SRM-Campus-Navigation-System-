import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative isolate min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left: Hero copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main heading with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                <motion.span 
                  className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Navigate Our
                </motion.span>
                <motion.span 
                  className="mt-2 block bg-gradient-to-r from-brand-300 via-brand-500 to-cyan-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Campus
                </motion.span>
                <motion.span 
                  className="mt-2 block bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  with Intelligence
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-8 max-w-xl text-xl text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Experience the future of campus navigation with real-time maps, AI-powered assistance, and seamless discovery of every corner of SRM University.
            </motion.p>

            {/* Feature badges with staggered animation */}
            <motion.ul
              className="mt-10 flex flex-wrap items-center gap-3 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                '🗺️ Live Interactive Maps',
                '🤖 AI-Powered Assistant',
                '📍 Street View Preview',
                '⚡ Quick Access Shortcuts',
              ].map((feat, index) => (
                <motion.li
                  key={feat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-200 backdrop-blur hover:border-brand-500/40 hover:bg-white/10 transition-all duration-300"
                >
                  {feat}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs with enhanced animations */}
            <motion.div
              className="mt-12 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <Link
                  to="/map"
                  className="relative inline-flex items-center rounded-xl bg-gradient-to-r from-brand-500 via-brand-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl shadow-brand-500/25 transition-all duration-300 hover:shadow-brand-500/40"
                >
                  <span className="relative z-10">Start Navigating</span>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  />
                  <motion.div
                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-brand-400 to-indigo-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"
                    initial={false}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/assistant"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-slate-200 backdrop-blur transition-all duration-300 hover:border-brand-500/40 hover:bg-white/10 hover:text-white"
                >
                  Ask the AI
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats with staggered animation */}
            <motion.div
              className="mt-16 grid w-full max-w-lg grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {[
                { number: '50+', label: 'Buildings' },
                { number: '200+', label: 'Classrooms' },
                { number: '24/7', label: 'AI Assistant' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition-all duration-300 hover:border-brand-500/30 hover:bg-white/10"
                >
                  <motion.p
                    className="text-3xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating preview cards */}
          <motion.div
            className="relative mx-auto w-full max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900/40 p-6 backdrop-blur"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background effects */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-tr from-brand-500/20 to-cyan-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/15 to-brand-400/10 blur-3xl" />

              {/* Feature cards with staggered animation */}
              <div className="grid gap-4">
                {[
                  { icon: '🤖', title: 'AI Assistant', desc: 'Get instant directions and campus information with our intelligent chatbot.' },
                  { icon: '🗺️', title: 'Interactive Maps', desc: 'Explore campus with smooth pan, zoom, and custom location markers.' },
                  { icon: '📍', title: 'Street View', desc: 'Preview locations when available with seamless toggle between map and street view.' },
                  { icon: '⚡', title: 'Quick Access', desc: 'Find buildings, hostels, and facilities with intelligent search and filters.' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-brand-500/30 hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{feature.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Multiple moving gradient orbs */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-600/20 to-brand-400/15 blur-3xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 50, ease: "linear" },
          scale: { repeat: Infinity, duration: 8, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-500/15 to-brand-400/10 blur-3xl"
        animate={{ 
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 60, ease: "linear" },
          scale: { repeat: Infinity, duration: 10, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 40, ease: "linear" },
          scale: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
      />

      {/* Enhanced textured background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(ellipse_at_80%_30%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(ellipse_at_40%_80%,rgba(255,255,255,0.05),transparent_40%)]" />

      {/* Base background with enhanced gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b1220_0%,#1e293b_25%,#0f172a_50%,#1e293b_75%,#0b1220_100%)] opacity-95" />
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}



