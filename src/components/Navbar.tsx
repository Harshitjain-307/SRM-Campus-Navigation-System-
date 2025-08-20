import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600"
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
            <span className="font-semibold tracking-tight">CampusAI</span>
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
    <NavLink to={to} className="relative px-2 py-1 text-sm text-slate-200 hover:text-white">
      {({ isActive }) => (
        <>
          <span>{label}</span>
          {(isActive || current) && (
            <motion.span
              layoutId="active-pill"
              className="absolute inset-0 -z-10 rounded-md bg-white/10"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}



