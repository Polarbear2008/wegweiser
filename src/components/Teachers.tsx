import { useRef } from 'react'
import { Medal, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const teachers = [
  {
    name: "Komilov Furqatbek",
    degree: "C1 Goethe and CEFR",
    img: "/Teachers/1.webp"
  },
  {
    name: "Ahmadova Azima",
    degree: "DSD C1, CEFR C1",
    img: "/Teachers/3.webp"
  },
  {
    name: "Hamidova Lobarxon",
    degree: "Test DaF C1, Goethe C1, CEFR C1",
    img: "/Teachers/13.webp"
  },
  {
    name: "Xoshimov Doniyorbek",
    degree: "Goethe B2",
    img: "/Teachers/2.webp"
  },
  {
    name: "Sodirjonov Tursunali",
    degree: "ECL B2",
    img: "/Teachers/4.webp"
  },
  {
    name: "Tolibjonov Samariddin",
    degree: "ÖSD B2",
    img: "/Teachers/5.webp"
  },
  {
    name: "Azimjonov Sardor",
    degree: "Goethe B2",
    img: "/Teachers/6.webp"
  },
  {
    name: "Abdug'aniev Oybek",
    degree: "Goethe B2",
    img: "/Teachers/7 (2).webp"
  },
  {
    name: "Olimov Mirzo Ulug'bek",
    degree: "Goethe B2",
    img: "/Teachers/8.webp"
  },
  {
    name: "Anvarova Ominaxon",
    degree: "Goethe B2",
    img: "/Teachers/9.webp"
  },
  {
    name: "Orufjonova Nilufar",
    degree: "Goethe B2",
    img: "/Teachers/10.webp"
  },
  {
    name: "Adxamova Fotimaxon",
    degree: "CEFR B2",
    img: "/Teachers/11.webp"
  },
  {
    name: "Iminova Tamilova",
    degree: "Test DaF B2",
    img: "/Teachers/12.webp"
  },
  {
    name: "Mamatisaqov Oyatillo",
    degree: "Goethe B2",
    img: "/Teachers/14.webp"
  },
]

const content: Record<Lang, {
  badge: string
  heading: string
  description: string
  viewAll: string
}> = {
  UZ: {
    badge: "MUTAXASSIS O'QITUVCHILAR",
    heading: 'Bilim beruvchi eng yaxshi jamoa',
    description: "Wegweiser-dagi har bir o'qituvchi Goethe-Institut sertifikatiga ega bo'lib, talabalarga nemis tilini eng samarali usullarda o'rgatadi.",
    viewAll: "Hammasini ko'rish",
  },
  EN: {
    badge: 'EXPERT TEACHERS',
    heading: 'The best team delivering knowledge',
    description: 'Every teacher at Wegweiser holds a Goethe-Institut certificate and teaches German using the most effective methods.',
    viewAll: 'View all',
  },
  RU: {
    badge: 'КВАЛИФИЦИРОВАННЫЕ ПРЕПОДАВАТЕЛИ',
    heading: 'Лучшая команда преподавателей',
    description: 'Каждый преподаватель Wegweiser имеет сертификат Goethe-Institut и обучает немецкому языку самыми эффективными методами.',
    viewAll: 'Показать всех',
  },
  DE: {
    badge: 'QUALIFIZIERTE LEHRKRÄFTE',
    heading: 'Das beste Team für Ihren Lernerfolg',
    description: 'Jede Lehrkraft bei Wegweiser besitzt ein Goethe-Institut-Zertifikat und unterrichtet Deutsch mit den effektivsten Methoden.',
    viewAll: 'Alle anzeigen',
  },
}

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function Teachers({ limit = 100 }: { limit?: number }) {
  const { lang } = useLang()
  const c = content[lang]
  const sectionRef = useRef<HTMLElement>(null)
  
  const displayedTeachers = teachers.slice(0, limit)
  const isTruncated = teachers.length > limit

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="teachers"
      className="relative py-24 w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label={c.heading}
    >
      <div className="w-content mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row gap-8 md:items-end justify-between"
        >
          <div className="flex flex-col gap-6 max-w-3xl">
            <motion.div variants={itemVariants}>
              <div className="badge-pill">
                <Medal className="h-3.5 w-3.5" />
                <span>{c.badge}</span>
              </div>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-balance font-bold"
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                color: 'var(--color-foreground)',
                letterSpacing: '-0.04em',
                lineHeight: '1.05',
              }}
            >
              {c.heading}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="leading-relaxed text-balance"
              style={{ 
                fontSize: 'var(--text-lg)', 
                color: 'rgba(0, 6, 18, 0.6)', 
                lineHeight: '1.7' 
              }}
            >
              {c.description}
            </motion.p>
          </div>

          <motion.div variants={itemVariants}>
            {isTruncated ? (
               <Link
                to="/teachers"
                className="group h-14 px-8 rounded-2xl bg-primary text-white font-bold text-[15px] flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                style={{ background: '#106EFB' }}
              >
                {c.viewAll}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : (
                <button
                onClick={() => scrollTo('contact')}
                className="group h-14 px-8 rounded-2xl bg-primary text-white font-bold text-[15px] flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                style={{ background: '#106EFB' }}
              >
                {c.viewAll}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Teachers Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayedTeachers.map((t, idx) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative h-[320px] md:h-[400px] rounded-[2rem] overflow-hidden bg-gray-900 shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={t.img}
                alt={t.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-white text-2xl tracking-tight leading-tight">
                    {t.name}
                  </h3>
                  <p className="text-[#106EFB] font-bold text-sm tracking-wide">
                    {t.degree}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-[#106EFB]/0 group-hover:border-[#106EFB]/30 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
