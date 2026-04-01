import { useRef } from 'react'
import { Medal, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

const teachers = [
  {
    name: "Komilov Furqatbek",
    degree: "C1 Goethe and CEFR",
    age: 29,
    img: "/Teachers/1.png"
  },
  {
    name: "Tamila Iminova",
    degree: "Test DaF B2",
    age: 18,
    img: "/Teachers/2.png"
  },
  {
    name: "Fotimaxon Adhamova",
    degree: "CEFR B2",
    age: 21,
    img: "/Teachers/3.png"
  },
  {
    name: "Nilufar Orifjonova",
    degree: "Goethe B2",
    age: 21,
    img: "/Teachers/4.png"
  },
  {
    name: "Doniyorbek Khoshimov",
    degree: "Goethe B2",
    age: 24,
    img: "/Teachers/5.png"
  },
  {
    name: "Lobarxon Hamidova",
    degree: "Test DaF C1, Goethe C1, CEFR C1",
    age: 20,
    img: "/Teachers/6.png"
  },
  {
    name: "Tursunali Sodirjonov",
    degree: "ECL B2",
    age: 23,
    img: "/Teachers/7 (2).png"
  },
  {
    name: "Azima Ahmadova",
    degree: "DSD C1, CEFR C1",
    age: 20,
    img: "/Teachers/8.png"
  },
  {
    name: "Samariddin Tolibjonov",
    degree: "ÖSD B2",
    age: 24,
    img: "/Teachers/9.png"
  },
  {
    name: "Umidaxon Ne'matova",
    degree: "Goethe B2",
    age: 22,
    img: "/Teachers/10.png"
  }
]

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
      aria-label="Teachers section"
    >
      <div className="w-content mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row gap-8 md:items-end justify-between"
        >
          <div className="flex flex-col gap-6 max-w-3xl">
            <motion.div variants={itemVariants}>
              <div className="badge-pill">
                <Medal className="h-3.5 w-3.5" />
                <span>MUTAXASSIS O'QITUVCHILAR</span>
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
              Bilim beruvchi eng yaxshi jamoa
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
              Wegweiser-dagi har bir o'qituvchi Goethe-Institut sertifikatiga ega bo'lib, 
              talabalarga nemis tilini eng samarali usullarda o'rgatadi.
            </motion.p>
          </div>

          <motion.div variants={itemVariants}>
            {isTruncated ? (
               <Link
               to="/teachers"
               className="group h-14 px-8 rounded-2xl bg-primary text-white font-bold text-[15px] flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
               style={{ background: '#106EFB' }}
             >
               Hammasini ko'rish
               <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
             </Link>
            ) : (
                <button
                onClick={() => scrollTo('contact')}
                className="group h-14 px-8 rounded-2xl bg-primary text-white font-bold text-[15px] flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                style={{ background: '#106EFB' }}
              >
                Hammasini ko'rish
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Teachers Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
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
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-2xl tracking-tight leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-[#106EFB] font-bold text-sm tracking-wide">
                      {t.degree}
                    </p>
                  </div>
                  
                  {/* Age Badge */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-[11px] font-bold text-white/80">
                    {t.age} yosh
                  </div>
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
