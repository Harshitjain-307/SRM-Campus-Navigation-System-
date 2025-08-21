import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/map', label: 'Map' },
    { to: '/assistant', label: 'Assistant' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8" src="/favicon.svg" alt="logo" />
            <span className="font-semibold tracking-tight">CampusAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                current={location.pathname === item.to}
              />
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-200 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-950/90 backdrop-blur px-4 pb-4"
          >
            <ul className="flex flex-col gap-2 pt-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="block rounded-md px-3 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavItem({
  to,
  label,
  current,
}: {
  to: string
  label: string
  current: boolean
}) {
  return (
    <NavLink
      to={to}
      className="relative px-2 py-1 text-sm text-slate-200 hover:text-white"
    >
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
