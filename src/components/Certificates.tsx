import { motion } from 'framer-motion'
import { Award, ShieldCheck } from 'lucide-react'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const row1 = [
  '/Certifiates/Cefr2.webp',
  '/Certifiates/Cefr4.webp',
  '/Certifiates/Cefr6.webp',
  '/Certifiates/Cefr8.webp',
  '/Certifiates/Cefr10.webp',
]

const row2 = [
  '/Certifiates/Cefr3.webp',
  '/Certifiates/Cefr5.webp',
  '/Certifiates/Cefr7.webp',
  '/Certifiates/Cefr9.webp',
  '/Certifiates/Cefr2.webp',
]

const content: Record<Lang, {
  badge: string
  heading: string
  subtitle: string
  footerLabel: string
}> = {
  UZ: {
    badge: "MUVAFFAQIYAT TASDIG'I",
    heading: 'Talabalarimizning natijalar',
    subtitle: 'CEFR imtihonlaridan olingan sertifikatlar',
    footerLabel: 'CEFR imtihonlaridan olingan sertifikatlar',
  },
  EN: {
    badge: 'PROOF OF SUCCESS',
    heading: "Our students' results",
    subtitle: 'Certificates from CEFR examinations',
    footerLabel: 'Certificates from CEFR examinations',
  },
  RU: {
    badge: 'ПОДТВЕРЖДЕНИЕ УСПЕХА',
    heading: 'Результаты наших студентов',
    subtitle: 'Сертификаты экзаменов CEFR',
    footerLabel: 'Сертификаты экзаменов CEFR',
  },
  DE: {
    badge: 'ERFOLGSNACHWEIS',
    heading: 'Ergebnisse unserer Studierenden',
    subtitle: 'Zertifikate der CEFR-Prüfungen',
    footerLabel: 'Zertifikate der CEFR-Prüfungen',
  },
}

const MarqueeRow = ({
  images,
  speed,
  reverse = false,
  altPrefix,
}: {
  images: string[]
  speed: number
  reverse?: boolean
  altPrefix: string
}) => {
  // Duplicate images for seamless loop
  const displayImages = [...images, ...images, ...images]

  return (
    <div className="flex overflow-hidden whitespace-nowrap mask-fade-x py-8">
      <motion.div
        animate={{
          x: reverse ? [0, -100 / 3 + '%'] : [-100 / 3 + '%', 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex gap-8 group"
        style={{ willChange: 'transform' }}
      >
        {displayImages.map((src, idx) => (
          <div
            key={idx}
            className="relative h-[140px] md:h-[180px] w-[200px] md:w-[260px] shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 group-hover:scale-[1.03] transition-all duration-500 bg-white"
          >
            <img
              src={src}
              alt={`${altPrefix} ${idx + 1}`}
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Certificates() {
  const { lang } = useLang()
  const c = content[lang]
  const altPrefixByLang: Record<Lang, string> = {
    UZ: 'Sertifikat',
    EN: 'Certificate',
    RU: 'Сертификат',
    DE: 'Zertifikat',
  }
  const altPrefix = altPrefixByLang[lang]

  return (
    <section id="certificates" className="relative py-16 w-full overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]"
        style={{ background: 'radial-gradient(circle at 10% 50%, #106EFB 0%, transparent 60%)', filter: 'blur(100px)' }} />

      <div className="w-content mx-auto flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="badge-pill"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{c.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-balance font-bold text-center"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: 'var(--color-foreground)',
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
            }}
          >
            {c.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-gray-500 text-base font-medium"
          >
            {c.subtitle}
          </motion.p>
        </div>

        {/* Gallery Tracks */}
        <div className="flex flex-col gap-2">
          <MarqueeRow images={row1} speed={50} reverse={true} altPrefix={altPrefix} />
          <MarqueeRow images={row2} speed={55} reverse={false} altPrefix={altPrefix} />
        </div>

        {/* Footer Stats Row */}
        <div className="flex justify-center mt-6">
          <div className="px-8 py-4 rounded-full bg-gray-50 border border-gray-100 flex items-center gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#106EFB]/10 flex items-center justify-center">
                <Award className="h-4 w-4 text-[#106EFB]" />
              </div>
              <span className="text-gray-600 font-bold text-xs tracking-tight whitespace-nowrap">
                {c.footerLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
