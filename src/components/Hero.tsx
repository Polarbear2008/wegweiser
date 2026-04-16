import { useRef, useState, useEffect } from 'react'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const content: Record<Lang, {
  badge: string
  headingBefore: string
  headingAccent: string
  headingAfter: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}> = {
  UZ: {
    badge: "O'qish · Sayohat · Ish",
    headingBefore: "Nemis tilini o'rganing,",
    headingAccent: 'yangi imkoniyatlar',
    headingAfter: 'eshigini oching',
    subtitle: "O'zbekistondagi eng yetakchi nemis tili markazi bilan xalqaro sertifikatlarni olish, chet elda ta'lim olish va ish topish yo'lidagi ishonchli hamrohingiz.",
    ctaPrimary: 'Birinchi darsga yozilish',
    ctaSecondary: "Kurslarni ko'rish",
  },
  EN: {
    badge: 'Study · Travel · Work',
    headingBefore: 'Learn German,',
    headingAccent: 'open doors',
    headingAfter: 'to new opportunities',
    subtitle: "Your trusted partner on the journey to international certificates, studying abroad, and finding employment — with Uzbekistan's leading German language center.",
    ctaPrimary: 'Enroll in first class',
    ctaSecondary: 'View courses',
  },
  RU: {
    badge: 'Учёба · Путешествия · Работа',
    headingBefore: 'Изучайте немецкий,',
    headingAccent: 'откройте двери',
    headingAfter: 'к новым возможностям',
    subtitle: 'Ваш надёжный партнёр на пути к международным сертификатам, обучению за рубежом и трудоустройству — с ведущим центром немецкого языка в Узбекистане.',
    ctaPrimary: 'Записаться на первый урок',
    ctaSecondary: 'Смотреть курсы',
  },
  DE: {
    badge: 'Studieren · Reisen · Arbeiten',
    headingBefore: 'Deutsch lernen,',
    headingAccent: 'neue Türen',
    headingAfter: 'öffnen',
    subtitle: 'Ihr zuverlässiger Partner auf dem Weg zu internationalen Zertifikaten, Auslandsstudium und Karriere — mit dem führenden Deutschzentrum in Usbekistan.',
    ctaPrimary: 'Zum ersten Kurs anmelden',
    ctaSecondary: 'Kurse ansehen',
  },
}

export default function Hero() {
  const { lang } = useLang()
  const c = content[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacityImg = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  
  // Mouse tilt effect for the image
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 })
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 })

  const [currentSlide, setCurrentSlide] = useState(0)
  const images = [
    '/hero_1.webp',
    '/hero_3.webp'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 15)
    mouseY.set(y * -15)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "circOut" }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={c.subtitle}
      className="relative w-full pt-32 pb-20 overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* ── Ambient blue gradient orbs ── */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none select-none will-change-transform"
      >
        <div className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(16, 110, 251, 0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(16, 110, 251, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      {/* ── Fine dot grid texture overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16, 110, 251, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-content mx-auto flex flex-col gap-14 relative z-10"
      >
        <div className="items-center text-center flex flex-col gap-5">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div
              className="relative z-10 rounded-full w-fit px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase inline-flex items-center gap-2"
              style={{
                background: 'rgba(16, 110, 251, 0.06)',
                border: '1px solid rgba(16, 110, 251, 0.15)',
                color: '#106EFB',
              }}
            >
              <Sparkles className="h-3 w-3" />
              <span>{c.badge}</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-center font-bold text-balance"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.2rem)',
              color: 'var(--color-foreground)',
              lineHeight: '1.05',
              letterSpacing: '-0.04em',
              maxWidth: '52rem',
              margin: '0 auto',
            }}
          >
            {c.headingBefore}{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #106EFB 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {c.headingAccent}
            </span>{' '}
            {c.headingAfter}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-center leading-relaxed"
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(0, 6, 18, 0.6)',
              maxWidth: '40rem',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            {c.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="w-full justify-center flex flex-wrap gap-4 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(16, 110, 251, 0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              className="primary-btn cursor-pointer h-12 px-8 rounded-full text-[15px] font-bold transition-all duration-200"
              style={{
                background: 'var(--color-primary-cta)',
                color: '#fff',
                boxShadow: '0 4px 14px 0 rgba(16, 110, 251, 0.35)',
              }}
            >
              {c.ctaPrimary}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(0,0,0,0.03)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('pricing')}
              className="cursor-pointer h-12 px-8 rounded-full text-[15px] font-bold transition-all duration-200"
              style={{
                background: 'transparent',
                color: 'var(--color-foreground)',
                border: '1px solid rgba(0, 6, 18, 0.1)',
              }}
            >
              {c.ctaSecondary}
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image — aesthetic SaaS browser mockup with 3D tilt */}
        <motion.div
          variants={itemVariants}
          style={{ y: yImg, opacity: opacityImg, scale: scaleImg }}
          className="perspective-1000"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              rotateX: mouseY, 
              rotateY: mouseX,
              background: '#fff',
              border: '1px solid rgba(16, 110, 251, 0.1)',
              boxShadow: '0 20px 40px -8px rgba(16, 110, 251, 0.12), 0 40px 80px -16px rgba(16, 110, 251, 0.08)',
              transformStyle: 'preserve-3d'
            }}
            className="relative w-full rounded-2xl overflow-hidden flex flex-col will-change-transform"
          >
            {/* Window controls bar */}
            <div
              className="flex px-5 py-4 gap-2 items-center"
              style={{
                background: 'linear-gradient(to bottom, #fafafa, #f5f5f5)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <div
                className="ml-5 flex-1 max-w-sm h-7 rounded-md flex items-center px-4"
                style={{
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <span className="text-[10px] font-bold tracking-tight text-gray-400">
                  wegweiser.uz
                </span>
              </div>
            </div>
            {/* Browser content / Image Carousel */}
            <div className="w-full h-full relative overflow-hidden group aspect-[16/10] md:aspect-video bg-gray-100 dark:bg-gray-900">
               <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={images[currentSlide]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  alt={`Wegweiser German language culture - slide ${currentSlide + 1}`}
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-20" />
              
              {/* Carousel Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="group relative p-2 focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                        idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 group-hover:bg-white/60'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Navigation Arrows (Visible on hover) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-auto">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-auto">
                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
