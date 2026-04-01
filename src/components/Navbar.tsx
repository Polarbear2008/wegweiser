import { useState, useEffect, useRef } from 'react'
import { Plus, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'

const navItems = [
  { label: 'Kurslar', href: 'courses' },
  { label: 'Biz haqida', href: 'about' },
  { label: "O'qituvchilar", href: 'teachers', isPage: true },
  { label: 'Muvaffaqiyyatlar', href: 'testimonials' },
  { label: 'Qiymatlar', href: 'pricing' },
  { label: 'FAQ', href: 'faq' },
  { label: 'Aloqa', href: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(item: typeof navItems[0]) {
    setMenuOpen(false)
    
    if (item.isPage) {
      navigate({ to: '/teachers' })
      return
    }

    if (location.pathname === '/') {
      const el = document.getElementById(item.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate({ to: '/', hash: item.href })
    }
  }

  // Handle hash scrolling on home page if navigated from elsewhere
  useEffect(() => {
    if (location.pathname === '/' && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.pathname])

  // Close menu on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          height: scrolled ? '3.5rem' : '4.5rem',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
          borderBottomColor: scrolled ? 'rgba(0, 6, 18, 0.06)' : 'rgba(0, 6, 18, 0)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-[1000] top-0 left-0 w-full flex items-center justify-center backdrop-blur-xl"
        style={{
          borderBottomWidth: '1px',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Scroll Progress Bar */}
        {location.pathname === '/' && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[#106EFB] origin-left z-[1001]"
            style={{ scaleX, width: '100%' }}
          />
        )}

        <div className="relative flex items-center justify-between h-full w-content mx-auto px-4 md:px-0">
          {/* Logo */}
          <Link
            to="/"
            className="cursor-pointer group flex items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/logo.svg" 
              alt="Wegweiser Logo" 
              className="h-8 md:h-12 w-auto object-contain transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                whileHover={{ backgroundColor: 'rgba(16, 110, 251, 0.06)', color: 'var(--color-foreground)' }}
                className="relative px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-200"
                style={{ 
                  color: (location.pathname === '/teachers' && item.isPage) || (location.pathname === '/' && !item.isPage) 
                    ? 'var(--color-foreground)' 
                    : 'rgba(0, 6, 18, 0.65)' 
                }}
                onClick={() => handleNav(item)}
              >
                {item.label}
              </motion.button>
            ))}
            {/* CTA in navbar */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 4px 15px rgba(16, 110, 251, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="ml-3 h-9 px-6 rounded-full text-[13px] font-semibold transition-all duration-200"
              style={{
                background: 'var(--color-primary-cta)',
                color: 'var(--color-primary-cta-text)',
                boxShadow: '0 2px 8px rgba(16, 110, 251, 0.2)',
              }}
              onClick={() => handleNav({ label: 'Aloqa', href: 'contact' })}
            >
              Boshlash
            </motion.button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex md:hidden shrink-0 h-9 aspect-square rounded-full items-center justify-center cursor-pointer transition-all duration-200"
            style={{
              background: 'var(--color-primary-cta)',
              color: 'var(--color-primary-cta-text)',
            }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            ref={menuRef}
            className="md:hidden z-[999] fixed top-[4.5rem] left-4 right-4 h-fit rounded-[2.5rem] p-8 flex flex-col gap-6"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    className="w-full h-fit flex justify-between items-center cursor-pointer py-4.5 px-4 rounded-2xl transition-colors duration-200 hover:bg-[rgba(16,110,251,0.05)]"
                    onClick={() => handleNav(item)}
                  >
                    <p className="text-[15px] font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {item.label}
                    </p>
                    <ArrowRight className="h-4 w-4 opacity-30" />
                  </button>
                  {i < navItems.length - 1 && (
                    <div className="w-full h-px mx-3" style={{ background: 'rgba(0, 0, 0, 0.04)' }} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
