import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative h-10 w-10 overflow-hidden rounded-xl ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300"
              initial={{ rotate: -5, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <img 
                src="/srm.jpg" 
                alt="SRM Logo" 
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                CampusAI
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                Powered by SRM
              </span>
            </div>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <NavItem to="/" label="Home" current={location.pathname === '/'} />
            <NavItem to="/map" label="Map" current={location.pathname === '/map'} />
            <NavItem to="/assistant" label="Assistant" current={location.pathname === '/assistant'} />
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavItem({ to, label, current }: { to: string; label: string; current: boolean }) {
  return (
    <NavLink to={to} className="relative px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors duration-200">
      {({ isActive }) => (
        <>
          <span className="relative z-10">{label}</span>
          {(isActive || current) && (
            <motion.span
              layoutId="active-pill"
              className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-brand-500/20 to-brand-600/20 border border-brand-500/30"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}



