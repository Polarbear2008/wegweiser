import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from '@tanstack/react-router'

const footerLinks = [
  {
    title: "PLATFORMA",
    items: [
      { label: 'Kurslar', href: 'courses' },
      { label: 'Qiymatlar', href: 'pricing' },
      { label: 'Muvaffaqiyyatlar', href: 'testimonials' },
      { label: 'FAQ', href: 'faq' },
    ],
  },
  {
    title: "KOMPANIYA",
    items: [
      { label: 'Biz haqida', href: 'about' },
      { label: "O'qituvchilar", href: 'teachers', isPage: true },
      { label: 'Blog', href: '#' },
      { label: 'Hamkorlar', href: '#' },
    ],
  },
  {
    title: "BOG'LANISH",
    items: [
      { label: '+998 95 202 05 50', href: 'tel:+998952020550' },
      { label: 'Telegram Admin', href: 'https://t.me/Wegweiser_admin2' },
      { label: 'Email', href: 'mailto:info@wegweiser.uz' },
    ],
  },
  {
    title: "IJTIMOIY TARMOQLAR",
    items: [
      { label: 'Instagram', href: 'https://instagram.com/wegweisergroup' },
      { label: 'Telegram Kanal', href: 'https://t.me/wegweisergroup' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/17wLYCRhqs/' },
    ],
  },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleNav(href: string, isPage?: boolean) {
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
      window.open(href, '_blank')
      return
    }

    if (isPage) {
      navigate({ to: '/teachers' })
      return
    }

    if (location.pathname === '/') {
      const el = document.getElementById(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate({ to: '/', hash: href })
    }
  }

  return (
    <footer
      className="w-full py-24 flex justify-center relative z-10 overflow-hidden"
      style={{ background: '#070a11' }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="w-content mx-auto flex flex-col gap-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Wegweiser Logo"
                className="h-10 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm">
              Germaniyada ta'lim va karyera qurish yo'lidagi sizning ishonchli hamrohingiz. Professional nemis tili markazi.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {footerLinks.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-6">
                <h4 className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase">{col.title}</h4>
                <div className="flex flex-col gap-4">
                  {col.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item.href, (item as any).isPage)}
                      className="text-white/50 hover:text-[#106EFB] transition-all duration-300 text-sm font-medium flex items-center gap-2 group w-fit text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big brand name watermark */}
        <div className="relative w-full select-none pointer-events-none pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="footer-display-text text-[15vw] leading-none font-black text-center whitespace-nowrap overflow-hidden"
            style={{ color: 'rgba(255, 255, 255, 0.03)', letterSpacing: '-0.05em', maxWidth: '100vw' }}
          >
            Wegweiser
          </motion.h1>
        </div>

        {/* Bottom bar */}
        <div className="w-full pt-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <span className="text-xs font-medium text-white/30 text-center md:text-left">
            © {new Date().getFullYear()} Wegweiser. Barcha huquqlar himoyalangan.
          </span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <span className="text-xs font-semibold tracking-wide text-white/40">
              O'ZBEKISTON
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/40">
              DESIGNED FOR EXCELLENCE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
