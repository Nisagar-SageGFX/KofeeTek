import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Machines' },
  { to: '/consumables', label: 'Consumables' },
  { to: '/rental', label: 'Rental' },
  { to: '/industries', label: 'Industries' },
  { to: '/clients', label: 'Clients' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
     className={`fixed top-0 left-0 right-0 z-50 bg-[#120803] transition-all duration-400 ${
  scrolled
    ? 'shadow-lg shadow-black/20 py-2'
    : 'py-4'
}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo: transparent PNG, no background box ── */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo/kofeetek_logo.svg"
            alt="KofeeTek – Feel The Brews"
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'
              }`}
            
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${isActive
                  ? 'text-brand-gold bg-white/10'
                  : 'text-white/90 hover:text-brand-gold hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+919962242499"
            className="flex items-center gap-1.5 text-[13px] font-medium text-white/75 hover:text-brand-gold transition-colors duration-200"
          >
            <Phone size={13} />+91 99622 42499
          </a>
          <Link to="/contact" className="btn-primary py-2.5 px-5 text-[13px] font-semibold">
            Free Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-brand-brownDark border-t border-white/10 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-200 ${isActive ? 'bg-white/10 text-brand-gold' : 'text-white/85 hover:bg-white/10 hover:text-brand-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center mt-2"
              >
                Get Free Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
