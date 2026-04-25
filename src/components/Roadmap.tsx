import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

// Import 3D Icons
import flagIcon from '../assets/icons/3d_german_flag.webp'
import capIcon from '../assets/icons/3d_graduation_cap.webp'
import uniIcon from '../assets/icons/3d_university.webp'
import passportIcon from '../assets/icons/3d_passport.webp'
import planeIcon from '../assets/icons/3d_airplane.webp'

const stepsIcons = [
  { icon: flagIcon, color: '#106EFB' },
  { icon: capIcon, color: '#FFD700' },
  { icon: uniIcon, color: '#FFFFFF' },
  { icon: passportIcon, color: '#106EFB' },
  { icon: planeIcon, color: '#FFD700' },
]

const stepsByLang: Record<Lang, Array<{ title: string; description: string }>> = {
  UZ: [
    {
      title: "NEMIS TILINI O'RGANISH",
      description: "A1 dan B2 gacha bo'lgan barcha darajalar uchun professional o'quv dasturlari va tajribali ustozlar.",
    },
    {
      title: "SERTIFIKAT OLISH",
      description: "Goethe, TestDaF yoki Telc imtihonlariga maxsus tayyorgarlik va muvaffaqiyatli topshirish kafolati.",
    },
    {
      title: 'UNIVERSITET VA KARYERA',
      description: "Germaniyadagi eng yaxshi oliygohlar va Ausbildung (kasbiy ta'lim) dasturlariga yo'naltirish.",
    },
    {
      title: 'VISA VA HUJJATLAR',
      description: "Germaniya elchixonasi uchun kerakli barcha hujjatlarni tayyorlashda to'liq ko'mak.",
    },
    {
      title: 'GERMANIYAGA SALOM!',
      description: 'Sizning orzingizdagi hayot Germaniyada boshlanadi. Biz siz bilan birgamiz!',
    },
  ],
  EN: [
    {
      title: 'LEARN GERMAN',
      description: 'Professional courses and experienced teachers for all levels from A1 to B2.',
    },
    {
      title: 'GET YOUR CERTIFICATE',
      description: 'Special preparation for Goethe, TestDaF, or Telc exams—plus confidence to succeed.',
    },
    {
      title: 'UNIVERSITY & CAREER',
      description: 'Guidance toward the best universities in Germany and Ausbildung (vocational training) programs.',
    },
    {
      title: 'VISA & DOCUMENTS',
      description: 'Full support in preparing all the documents needed by the German embassy.',
    },
    {
      title: 'WELCOME TO GERMANY!',
      description: 'Your dream life starts in Germany. We are with you!',
    },
  ],
  RU: [
    {
      title: 'ИЗУЧАЙТЕ НЕМЕЦКИЙ',
      description: 'Профессиональные программы и опытные преподаватели для всех уровней от A1 до B2.',
    },
    {
      title: 'ПОЛУЧИТЕ СЕРТИФИКАТ',
      description: 'Специальная подготовка к экзаменам Goethe, TestDaF или Telc и гарантия успешной сдачи.',
    },
    {
      title: 'УНИВЕРСИТЕТ И КАРЬЕРА',
      description: 'Помогаем ориентироваться на лучшие вузы Германии и программы Ausbildung (профессиональное обучение).',
    },
    {
      title: 'ВИЗА И ДОКУМЕНТЫ',
      description: 'Полная помощь в подготовке всех документов, необходимых для немецкого посольства.',
    },
    {
      title: 'ПРИВЕТ, ГЕРМАНИЯ!',
      description: 'Ваша жизнь мечты начинается в Германии. Мы рядом с вами!',
    },
  ],
  DE: [
    {
      title: 'DEUTSCH LERNEN',
      description: 'Professionelle Lernprogramme und erfahrene Lehrkräfte für alle Niveaus von A1 bis B2.',
    },
    {
      title: 'ZERTIFIKAT ERHALTEN',
      description: 'Gezielte Vorbereitung auf Goethe-, TestDaF- oder Telc-Prüfungen und eine Garantie für erfolgreiches Bestehen.',
    },
    {
      title: 'UNIVERSITÄT & KARRIERE',
      description: 'Ausrichtung auf die besten Hochschulen in Deutschland sowie auf Ausbildung-Programme (berufliche Bildung).',
    },
    {
      title: 'VISA & UNTERLAGEN',
      description: 'Umfassende Unterstützung bei der Vorbereitung aller Unterlagen für die deutsche Botschaft.',
    },
    {
      title: 'HALLO, DEUTSCHLAND!',
      description: 'Ihr Leben Ihres Traums beginnt in Deutschland. Wir sind an Ihrer Seite!',
    },
  ],
}

export default function Roadmap() {
  const { lang } = useLang()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  // Smooth scroll progress for the path
  const pathProg = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })
  
  const steps = stepsIcons.map((s, i) => ({
    ...s,
    ...stepsByLang[lang][i],
  }))

  const c: Record<Lang, { badge: string; headingPrefix: string; headingAccent: string; cta: string }> = {
    UZ: { badge: "Sizning Yo'lingiz", headingPrefix: 'Germaniyada', headingAccent: '5 ta qadam', cta: 'Sayohatni boshlash →' },
    EN: { badge: 'Your path', headingPrefix: 'In Germany', headingAccent: '5 steps', cta: 'Start your journey →' },
    RU: { badge: 'Ваш путь', headingPrefix: 'В Германии', headingAccent: '5 шагов', cta: 'Начать путешествие →' },
    DE: { badge: 'Ihr Weg', headingPrefix: 'In Deutschland', headingAccent: '5 Schritte', cta: 'Reise starten →' },
  }[lang]

  return (
    <section 
      ref={containerRef}
      className="relative py-32 w-full overflow-hidden bg-white dark:bg-[#070a11] transition-colors duration-500"
      id="roadmap"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-[#106EFB]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-[#106EFB]/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-content mx-auto relative z-10 px-4">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="badge-pill mx-auto mb-6"
          >
            {c.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-6xl font-black tracking-tighter text-[#070a11] dark:text-white"
          >
            {c.headingPrefix} <br /> <span className="text-[#106EFB]">{c.headingAccent}</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Scroll Driven) */}
          <div className="hidden md:block absolute top-[120px] left-[10%] right-[10%] h-[4px] bg-[#106EFB]/10 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="w-full h-full bg-[#106EFB]"
            />
          </div>
          
          {/* Dynamic SVG Path (Optional for more complex shapes, but scaleX on a div is cleaner for straight lines) */}
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="group relative flex flex-col items-center text-center"
              >
                {/* 3D Icon Container */}
                <div className="relative w-24 h-24 md:w-40 md:h-40 mb-8 flex items-center justify-center">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 15, 
                      rotateX: -10,
                      z: 50 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10 w-full h-full flex items-center justify-center p-4 drop-shadow-2xl"
                  >
                    <img 
                      src={step.icon} 
                      alt={step.title}
                      className="w-full h-full object-contain filter brightness-110"
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#106EFB] text-white font-bold flex items-center justify-center shadow-lg z-20 text-lg border-4 border-white dark:border-[#070a11]">
                    {index + 1}
                  </div>
                  
                  {/* Aura Effect */}
                  <div className="absolute inset-0 bg-[#106EFB]/5 blur-2xl rounded-full scale-75 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <h3 className="text-xl font-bold mb-4 tracking-tight dark:text-white group-hover:text-[#106EFB] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-[#070a11]/60 dark:text-white/40 leading-relaxed font-medium">
                  {step.description}
                </p>
                
                {/* Subtle vertical line for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-[2px] h-12 bg-gradient-to-b from-[#106EFB]/30 to-transparent mt-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA in Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <button className="bg-[#106EFB] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#106EFB]/40 hover:-translate-y-1 transition-all duration-300 active:scale-95">
            {c.cta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
