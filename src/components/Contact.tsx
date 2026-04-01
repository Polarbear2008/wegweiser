import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight } from 'lucide-react'

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
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: "circOut" }
  }
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 w-full overflow-hidden"
      style={{ background: '#070a11' }}
      aria-label="Contact section"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20"
           style={{ background: 'radial-gradient(circle, rgba(16, 110, 251, 0.15) 0%, transparent 60%)', filter: 'blur(120px)' }} />

      <div className="w-content mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full rounded-[2.5rem] py-16 px-8 md:py-20 md:px-16 overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent shadow-xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MessageCircle className="h-24 w-24 md:h-32 md:w-32 text-[#106EFB]" />
          </div>

          <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <motion.div variants={itemVariants} className="badge-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span>BOG'LANISH</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-balance font-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.8rem)',
                color: '#fff',
                letterSpacing: '-0.04em',
                lineHeight: '1.1',
              }}
            >
              Orzungizdagi ta'lim sari <br /> <span className="text-[#106EFB]">ilk qadamni</span> hozir tashlang
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/50 text-xl leading-relaxed max-w-2xl"
            >
              Professional maslahatchilarimiz sizga nemis tili bo'yicha eng yaxshi o'quv rejasini tuzishda yordam berishadi.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: '#106EFB' }}
                whileTap={{ scale: 0.95 }}
                href="tel:+998952020550"
                className="h-16 px-10 rounded-2xl bg-[#106EFB] text-white font-bold text-lg flex items-center gap-3 transition-colors duration-300 shadow-xl shadow-[#106EFB]/20"
              >
                <Phone className="h-5 w-5" />
                +998 95 202 05 50
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                href="https://t.me/Wegweiser_admin2"
                className="h-16 px-10 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-lg flex items-center gap-3 transition-colors duration-300"
              >
                Telegram orqali yozish
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
