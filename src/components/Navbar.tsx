import { useState, useEffect, useRef } from 'react'
import { Plus, ArrowRight, Globe } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'
import { LANGUAGES } from '../i18n/languages'

const navItemsByLang: Record<Lang, Array<{ label: string; href: string; isPage?: boolean; pagePath?: string }>> = {
  UZ: [
    { label: 'Kurslar', href: 'courses' },
    { label: "O'qituvchilar", href: 'teachers', isPage: true, pagePath: '/teachers' },
    { label: 'Placement Test', href: 'placement-test', isPage: true, pagePath: '/placement-test' },
    { label: 'Biz haqimizda', href: 'about' },
    { label: 'FAQ', href: 'faq' },
  ],
  EN: [
    { label: 'Courses', href: 'courses' },
    { label: 'Teachers', href: 'teachers', isPage: true, pagePath: '/teachers' },
    { label: 'Placement Test', href: 'placement-test', isPage: true, pagePath: '/placement-test' },
    { label: 'About us', href: 'about' },
    { label: 'FAQ', href: 'faq' },
  ],
  RU: [
    { label: 'Курсы', href: 'courses' },
    { label: 'Преподаватели', href: 'teachers', isPage: true, pagePath: '/teachers' },
    { label: 'Placement Test', href: 'placement-test', isPage: true, pagePath: '/placement-test' },
    { label: 'О нас', href: 'about' },
    { label: 'FAQ', href: 'faq' },
  ],
  DE: [
    { label: 'Kurse', href: 'courses' },
    { label: 'Lehrkräfte', href: 'teachers', isPage: true, pagePath: '/teachers' },
    { label: 'Placement Test', href: 'placement-test', isPage: true, pagePath: '/placement-test' },
    { label: 'Über uns', href: 'about' },
    { label: 'FAQ', href: 'faq' },
  ],
}

const ctaByLang: Record<Lang, string> = {
  UZ: 'Boshlash',
  EN: 'Get started',
  RU: 'Начать',
  DE: 'Loslegen',
}

const toggleMenuAriaByLang: Record<Lang, string> = {
  UZ: 'Menyu-ni ochish va yopish',
  EN: 'Toggle menu',
  RU: 'Переключить меню',
  DE: 'Menü ein/aus',
}

const flagByLang: Record<Lang, string> = {
  UZ: '🇺🇿',
  EN: '🇬🇧',
  RU: '🇷🇺',
  DE: '🇩🇪',
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = navItemsByLang[lang]
  const ctaText = ctaByLang[lang]

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

    if (item.isPage && item.pagePath) {
      navigate({ to: item.pagePath })
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
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    if (menuOpen || langMenuOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen, langMenuOpen])

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

            <div className="w-px h-4 bg-black/10 mx-2" />

            <div className="relative" ref={langMenuRef}>
              <motion.button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                whileHover={{ backgroundColor: 'rgba(16, 110, 251, 0.08)', color: '#106EFB' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer"
                style={{ color: 'rgba(0, 6, 18, 0.7)' }}
              >
                <span className="text-base leading-none">{flagByLang[lang]}</span>
                <span className="font-bold">{lang}</span>
              </motion.button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden w-20 py-1.5 z-50"
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setLangMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-black/5 text-left ${lang === l ? 'text-[#106EFB]' : 'text-black/70'}`}
                      >
                        <span className="text-base leading-none">{flagByLang[l]}</span>
                        <span>{l}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              onClick={() => handleNav({ label: 'Contact', href: 'contact' })}
            >
              {ctaText}
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
            aria-label={toggleMenuAriaByLang[lang]}
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

            {/* Mobile Language Picker */}
            <div className="flex gap-2 justify-center pt-2 border-t border-black/5">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l)
                    setMenuOpen(false)
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${lang === l ? 'bg-[#106EFB] text-white' : 'bg-black/5 text-black/60 hover:bg-black/10'}`}
                >
                  <span className="text-base leading-none">{flagByLang[l]}</span>
                  <span>{l}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
