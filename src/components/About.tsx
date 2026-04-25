import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const content: Record<Lang, {
  badge: string
  heading: string
  description: string
  stats: Array<{ value: string; label: string }>
  quote: string
  quoteAuthor: string
}> = {
  UZ: {
    badge: 'BIZNING MAQSAD',
    heading: "O'zbekistondagi eng ishonchli nemis tili markazida ta'lim oling",
    description: "Wegweiser 2020-yildan yildan buyon yoshlarga nemis tilini o'rgatib kelmoqda va hozirga kelib 7 ta filialga ega. Sertifikat olgan o'qituvchilar, zamonaviy o'quv usullari va Goethe-Institut hamkorligida 95% muvaffaqiyyat ko'rsatkichini ta'minlaymiz.",
    stats: [
      { value: '95%', label: 'Sertifikat muvaffaqiyati' },
      { value: '2000+', label: 'Bitiruvchi talabalar' },
    ],
    quote: '"Bizning maqsadimiz — har bir talabaning Germaniyadagi orzularini haqiqatga aylantirish."',
    quoteAuthor: 'Wegweiser Rahbariyati',
  },
  EN: {
    badge: 'OUR MISSION',
    heading: "Study at Uzbekistan's most trusted German language center",
    description: "Since 2020, Wegweiser has been teaching young people German and now has 7 branches. With certified teachers, modern teaching methods, and Goethe-Institut partnership, we ensure a 95% success rate.",
    stats: [
      { value: '95%', label: 'Certificate success rate' },
      { value: '2000+', label: 'Graduated students' },
    ],
    quote: '"Our mission is to turn every student\'s dreams of Germany into reality."',
    quoteAuthor: 'Wegweiser Leadership',
  },
  RU: {
    badge: 'НАША МИССИЯ',
    heading: 'Обучайтесь в самом надёжном центре немецкого языка в Узбекистане',
    description: 'С 2020 года Wegweiser обучает молодёжь немецкому языку и уже имеет 7 филиалов. Сертифицированные преподаватели, современные методики и партнёрство с Goethe-Institut обеспечивают 95% успешной сдачи экзаменов.',
    stats: [
      { value: '95%', label: 'Успешная сдача' },
      { value: '2000+', label: 'Выпускников' },
    ],
    quote: '"Наша цель — воплотить мечту каждого студента о Германии в реальность."',
    quoteAuthor: 'Руководство Wegweiser',
  },
  DE: {
    badge: 'UNSERE MISSION',
    heading: 'Lernen Sie am vertrauenswürdigsten Deutschzentrum Usbekistans',
    description: 'Seit 2020 bringt Wegweiser jungen Menschen Deutsch bei und verfügt mittlerweile über 7 Filialen. Mit zertifizierten Lehrkräften, modernen Unterrichtsmethoden und der Partnerschaft mit dem Goethe-Institut gewährleisten wir eine Erfolgsquote von 95%.',
    stats: [
      { value: '95%', label: 'Zertifikatserfolg' },
      { value: '2000+', label: 'Absolventen' },
    ],
    quote: '"Unser Ziel ist es, den Traum jedes Studenten von Deutschland Wirklichkeit werden zu lassen."',
    quoteAuthor: 'Wegweiser-Leitung',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function About() {
  const { lang } = useLang()
  const c = content[lang]

  return (
    <section
      id="about"
      aria-label={c.heading}
      className="relative py-24 w-full dark-section overflow-hidden"
      style={{ background: '#070a11' }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(16, 110, 251, 0.1) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="w-content mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: text + stats */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <div className="badge-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Target className="h-3.5 w-3.5" />
                  <span>{c.badge}</span>
                </div>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-balance font-bold"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  lineHeight: '1.1',
                }}
              >
                {c.heading}
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="leading-relaxed text-balance"
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: '1.7',
                }}
              >
                {c.description}
              </motion.p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {c.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                  className="webild-card rounded-2xl p-8 flex flex-col gap-4 border border-white/5"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <span
                    className="font-bold tabular-nums"
                    style={{ fontSize: 'var(--text-5xl)', color: '#fff', letterSpacing: '-0.02em' }}
                  >
                    {stat.value}
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider opacity-40" style={{ color: '#fff' }}>
                    {stat.label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <motion.div
            variants={itemVariants}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                alt="Wegweiser German learning center facility"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                src="/about.webp"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a11]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Minimalist Floating Card Overlay */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              <p className="text-white font-medium text-sm leading-relaxed">
                {c.quote}
              </p>
              <p className="text-white/40 text-xs mt-3 font-bold uppercase tracking-widest">
                {c.quoteAuthor}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
