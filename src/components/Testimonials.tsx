import { useState, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Boltayeva Lola',
    role: 'DSD II Sertifikat',
    result: 'Goethe B2',
    initials: 'BL',
    color: 'linear-gradient(135deg, #106EFB 0%, #60A5FA 100%)',
    rating: 5,
    text: "Assalomu alaykum, men Wegweiser o'quv markazida 3 oy davomida nemis tili kursini o'qib, DSD II sertifikatini qo'lga kiritdim. Buning uchun ustozlarim Miss Indira va Mr. Sardorga minnatdorchilik bildiraman."
  },
  {
    name: 'Oltiboev Asilbek',
    role: 'TestDaF TDN 5',
    result: 'Goethe-Zertifikat C1',
    initials: 'OA',
    color: 'linear-gradient(135deg, #0047AB 0%, #106EFB 100%)',
    rating: 5,
    text: "Assalomu aleykum! Wegweiser'da 3 oy davomida o'qib, men Goethe-Zertifikat C1 darajasiga erishdim. Bu natijaga eng katta hissa qo'shgan shaxs mening o'qituvchim Ms. Sandra edi. Uning individual yondashuvi, nafaqat qat'iyatligi, balki mehnatsevarlikni namuna orqali ko'rsatishi meni bu natijaga yetkazdi."
  },
  {
    name: 'Odilov Elyor',
    role: 'Goethe C1',
    result: 'Goethe-Zertifikat C1',
    initials: 'OE',
    color: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    rating: 5,
    text: "Wegweiser o'quv markazi menda juda katta taassurot qoldirdi. Uch oy davomida bu yerda o'qish orqali men Goethe-Zertifikat C1 darajasiga erishdim. Bu muvaffaqiyatda eng katta hissa Mr. Sardorga tegishli. Uning saboqlari juda samarali va qiziqarli bo'lib, u har bir o'quvchining ehtiyojlarini inobatga olib o'qitishni biladi."
  },
  {
    name: 'Safarova Oysha',
    role: 'DSD II Sertifikat',
    result: 'DSD II',
    initials: 'SO',
    color: 'linear-gradient(135deg, #106EFB 0%, #00D2FF 100%)',
    rating: 5,
    text: "O'qituvchim Mr. Akhmadkhon, men ko'rgan eng fidoyi o'qituvchilardan biri, va mening yutug'imga juda katta hissa qo'shgan. Uning puxta rejalashtirilgan darslari, Goethe imtihoni talablariga to'g'ridan-to'g'ri mos keladigan tuzilmalari va bizga bo'lgan o'qitishga bo'lgan ishtiyoqi meni bu muvaffaqiyatga yetakladi."
  },
  {
    name: 'Yuldoshev Firdavs',
    role: 'Goethe C1',
    result: 'Goethe-Zertifikat C1',
    initials: 'YF',
    color: 'linear-gradient(135deg, #0F172A 0%, #106EFB 100%)',
    rating: 5,
    text: "Shaxsan menimcha, Wegweiser O'zbekistondagi eng yaxshi o'quv markazlaridan biri, agar yagona bo'lmasa. Ko'pgina o'qituvchilar o'z ishiga sodiq va dars davomida talabalarning diqqatini turli interaktiv faoliyatlar bilan jalb qilishni biladi. Muhiti zerikarli emas, maxsus ishlab chiqilgan."
  },
]

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
    filter: 'blur(4px)',
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const next = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
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
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label="Testimonials section"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-5"
        style={{ background: 'radial-gradient(circle at 20% 50%, rgba(16, 110, 251, 0.4) 0%, transparent 50%)', filter: 'blur(100px)' }} />

      <div className="w-content mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center text-center gap-6"
        >
          <motion.div variants={itemVariants}>
            <div className="badge-pill">
              <Star className="h-3.5 w-3.5" />
              <span>MUVAFFAQIYAT HIKOYALARI</span>
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
              maxWidth: '800px'
            }}
          >
            Talabalarimizning sharhlari
          </motion.h2>
        </motion.div>

        {/* Carousel Content */}
        <div className="relative min-h-[500px] flex items-center justify-center">
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
                opacity: { duration: 0.4 }
              }}
              className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              {/* Profile Image (Gradient Avatar) */}
              <div className="relative shrink-0">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-primary/10 rotate-3 transition-all duration-500 border-8 border-white overflow-hidden"
                  style={{ background: testimonials[activeIndex].color }}
                >
                  <span className="text-white text-7xl md:text-8xl font-black tracking-tighter opacity-90">
                    {testimonials[activeIndex].initials}
                  </span>
                </motion.div>
                <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 z-20" style={{ background: '#106EFB' }}>
                  <Quote className="h-10 w-10 text-white fill-current" />
                </div>
              </div>

              {/* Testimony Text */}
              <div className="flex flex-col gap-8 max-w-xl">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#EAB308] text-[#EAB308]" />
                  ))}
                </div>

                <p className="text-2xl md:text-3xl font-medium leading-relaxed italic text-gray-800 tracking-tight">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{testimonials[activeIndex].name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest" style={{ color: '#106EFB' }}>{testimonials[activeIndex].role}</span>
                    <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                    <span className="text-sm font-medium text-gray-500">{testimonials[activeIndex].result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 md:-px-12">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="pointer-events-auto h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100 cursor-pointer lg:absolute lg:-left-24"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="pointer-events-auto h-14 w-14 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100 cursor-pointer lg:absolute lg:-right-24"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 p-8 md:p-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {[
            { value: '1,200+', label: "Muvaffaqiyatli bitiruvchilar" },
            { value: '95%', label: 'Goethe-Institut natijalari' },
            { value: '8 yil', label: 'Benazir tajriba' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">{stat.value}</h4>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
