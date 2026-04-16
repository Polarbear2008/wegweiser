import { useState, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, CircleCheckBig, BookOpen, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const featuresByLang: Record<Lang, Array<{
  title: string
  description: string
  icon: any
  img: string
}>> = {
  UZ: [
    {
      title: 'Test markazi',
      description: "Maktabimizda alohida test markazi mavjud. Bu yerda siz MOCK imtihonlar orqali bilim darajangizni sinab ko'rishingiz mumkin. Shuningdek, haqiqiy Goethe, TestDaF yoki DSD imtihonlariga tayyorgarlik ko'rish bo'yicha to'liq yo'naltirish beriladi.",
      icon: CircleCheckBig,
      img: '/feature_test.webp',
    },
    {
      title: 'Co Working zonalar',
      description: "Har bir filialimizda o'quvchilarimiz uchun maxsus co-working zonalar mavjud. Bu yerda siz darslardan bo'sh vaqtingizda nemis tilini mustaqil o'rganishingiz mumkin.",
      icon: BookOpen,
      img: '/feature_coworking.webp',
    },
    {
      title: "Bepul ikkinchi o'qituvchi",
      description: "Mavzuni yaxshi o'zlashtirolmagan bo'lsangiz, yordamchi o'qituvchilar har doim yoningizda va istagan mavzuyingizni qayta tushuntirib berishadi.",
      icon: Briefcase,
      img: '/feature_teacher.webp',
    },
  ],
  EN: [
    {
      title: 'Test center',
      description: 'We have a dedicated test center. Here you can test your level through MOCK exams. Full guidance is also provided for preparing for real Goethe, TestDaF, or DSD exams.',
      icon: CircleCheckBig,
      img: '/feature_test.webp',
    },
    {
      title: 'Co-working areas',
      description: 'Every branch has special co-working zones for students. Here you can independently study German during your free time between classes.',
      icon: BookOpen,
      img: '/feature_coworking.webp',
    },
    {
      title: 'Free support teacher',
      description: "If you haven't mastered a topic, support teachers are always by your side and will re-explain any subject you need.",
      icon: Briefcase,
      img: '/feature_teacher.webp',
    },
  ],
  RU: [
    {
      title: 'Тестовый центр',
      description: 'В нашей школе есть отдельный тестовый центр. Здесь вы можете проверить свой уровень знаний через MOCK-экзамены. Также предоставляется полное руководство по подготовке к реальным экзаменам Goethe, TestDaF или DSD.',
      icon: CircleCheckBig,
      img: '/feature_test.webp',
    },
    {
      title: 'Зоны коворкинга',
      description: 'В каждом филиале есть специальные коворкинг-зоны для студентов. Здесь вы можете самостоятельно изучать немецкий в свободное время.',
      icon: BookOpen,
      img: '/feature_coworking.webp',
    },
    {
      title: 'Бесплатный помощник-преподаватель',
      description: 'Если вы не усвоили тему, преподаватели-помощники всегда рядом и объяснят любую тему заново.',
      icon: Briefcase,
      img: '/feature_teacher.webp',
    },
  ],
  DE: [
    {
      title: 'Testzentrum',
      description: 'Wir haben ein eigenes Testzentrum. Hier können Sie Ihr Niveau durch MOCK-Prüfungen testen. Außerdem erhalten Sie eine umfassende Vorbereitung auf echte Goethe-, TestDaF- oder DSD-Prüfungen.',
      icon: CircleCheckBig,
      img: '/feature_test.webp',
    },
    {
      title: 'Co-Working-Bereiche',
      description: 'Jede Filiale verfügt über spezielle Co-Working-Zonen für Schüler. Hier können Sie in Ihrer Freizeit eigenständig Deutsch lernen.',
      icon: BookOpen,
      img: '/feature_coworking.webp',
    },
    {
      title: 'Kostenloser Hilfslehrer',
      description: 'Wenn Sie ein Thema nicht verstanden haben, stehen Ihnen Hilfslehrer jederzeit zur Seite und erklären jedes Thema erneut.',
      icon: Briefcase,
      img: '/feature_teacher.webp',
    },
  ],
}

const headerByLang: Record<Lang, { badge: string; heading: string; ariaLabel: string }> = {
  UZ: { badge: 'ASOSIY USTUNLIKLAR', heading: 'Talabalar nega Wegweiser-ni tanlashadi', ariaLabel: 'Afzalliklar bo‘limi' },
  EN: { badge: 'KEY ADVANTAGES', heading: 'Why students choose Wegweiser', ariaLabel: 'Key advantages section' },
  RU: { badge: 'КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА', heading: 'Почему студенты выбирают Wegweiser', ariaLabel: 'Раздел преимуществ' },
  DE: { badge: 'WICHTIGSTE VORTEILE', heading: 'Warum Studierende Wegweiser wählen', ariaLabel: 'Vorteile' },
}

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Features() {
  const { lang } = useLang()
  const features = featuresByLang[lang]
  const header = headerByLang[lang]
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  function prev() {
    setDirection(-1)
    setActiveIndex((i) => (i - 1 + features.length) % features.length)
  }
  function next() {
    setDirection(1)
    setActiveIndex((i) => (i + 1) % features.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-24 w-full overflow-hidden"
      aria-label={header.ariaLabel}
      style={{ background: 'var(--color-background)' }}
    >
      <div className="w-content mx-auto flex flex-col gap-16">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row gap-8 md:items-end justify-between"
        >
          <div className="flex flex-col gap-6 max-w-2xl">
            <motion.div variants={itemVariants}>
              <div className="badge-pill">
                <Star className="h-3.5 w-3.5" />
                <span>{header.badge}</span>
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
              {header.heading}
            </motion.h2>
          </div>
          
          {/* Custom Navigation Controls */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 110, 251, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="h-14 w-auto aspect-square rounded-full flex items-center justify-center border border-primary/10 cursor-pointer transition-colors duration-200"
              style={{ background: 'rgba(16, 110, 251, 0.05)', color: '#106EFB' }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 110, 251, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="h-14 w-auto aspect-square rounded-full flex items-center justify-center border border-primary/10 cursor-pointer transition-colors duration-200"
              style={{ background: 'rgba(16, 110, 251, 0.05)', color: '#106EFB' }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Carousel Content */}
        <div className="relative h-[500px] md:h-[600px] w-full will-change-transform">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image side */}
                <div className="lg:col-span-7 h-full relative rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-primary/10">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    src={features[activeIndex].img}
                    alt={features[activeIndex].title}
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-8 right-8 h-16 w-16 rounded-2xl bg-[#106EFB] flex items-center justify-center shadow-lg shadow-[#106EFB]/20"
                  >
                    {(() => {
                      const Icon = features[activeIndex].icon;
                      return Icon ? <Icon className="h-8 w-8 text-white" /> : null;
                    })()}
                  </motion.div>
                </div>

                {/* Text side */}
                <div className="lg:col-span-5 flex flex-col gap-8 pr-4">
                   <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3
                      className="font-bold mb-6"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: 'var(--color-foreground)',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.1',
                      }}
                    >
                      {features[activeIndex].title}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        fontSize: 'var(--text-lg)',
                        color: 'rgba(0, 6, 18, 0.6)',
                        lineHeight: '1.8',
                      }}
                    >
                      {features[activeIndex].description}
                    </p>
                  </motion.div>
                  
                  {/* Progress Indicator */}
                  <div className="flex gap-2 mt-4">
                    {features.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => {
                          setDirection(i > activeIndex ? 1 : -1)
                          setActiveIndex(i)
                        }}
                        className="h-1.5 rounded-full transition-all duration-300"
                        animate={{
                          width: i === activeIndex ? 40 : 12,
                          backgroundColor: i === activeIndex ? '#106EFB' : 'rgba(16, 110, 251, 0.15)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
