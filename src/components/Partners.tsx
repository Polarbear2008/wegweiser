import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'

const partners = [
  {
    name: "Tank & Rast",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Tank_%26_Rast_logo.svg",
    fallbackText: "Tank & Rast",
  },
  {
    name: "Kastenholz Hotel",
    logo: "https://www.eifel.info/images/d9tnbxOKaHk/rs:fill:761:428/cb:/g:ce/aHR0cHM6Ly9yZXNjLmRlc2tsaW5lLm5ldC9pbWFnZXMvUlBULzEvMWIwOGNkNjAtNTkzOC00YTI5LWE5MzUtYzk1NWNiZjY1OTJlLzk5L2ltYWdlLnBuZw",
    fallbackText: "Kastenholz Hotel",
  },
  {
    name: "Linqado GmbH",
    logo: "https://images.squarespace-cdn.com/content/v1/683762fa6368d67f7fa9bec7/53087d23-490b-49e1-b895-50fc5f56dc81/Linqado-090725-Lang-1.png",
    fallbackText: "Linqado GmbH",
  },
  {
    name: "GfM Gruppe",
    logo: "https://www.gfm-gruppe.de/wp-content/uploads/2023/07/GfM-Gruppe_2024-1024x309.png",
    fallbackText: "GfM Gruppe",
  },
  {
    name: "ifins Institut",
    logo: "https://siwi-lebt-vielfalt.de/wp-content/uploads/2020/04/Logo_400x240-570x570.jpg",
    fallbackText: "ifins Institut",
  },
  {
    name: "Kaltech GmbH",
    logo: "https://kaltechgmbh.de/wp-content/uploads/2021/04/Kaltech-logo-1.svg",
    fallbackText: "Kaltech GmbH",
  },
  {
    name: "McDonald's Deutschland",
    logo: "https://static.wikia.nocookie.net/logopedia/images/c/cd/Mcdonalds_logo.svg/revision/latest?cb=20220514151346",
    fallbackText: "McDonald's",
  },
  {
    name: "Victoria Internationale Hochschule",
    logo: "https://www.victoria-hochschule.de/wp-content/uploads/VICTORIA-Logo_Int_Hochschule_RGB.png",
    fallbackText: "Victoria Hochschule",
  },
  {
    name: "Projektanci Kariery",
    logo: "https://projektancikariery.pl/wp-content/uploads/2016/05/logo-projektanci-kariery.png",
    fallbackText: "Projektanci Kariery",
  },
]

// Duplicate for seamless infinite scroll
const allPartners = [...partners, ...partners]

export default function Partners() {
  return (
    <section
      id="partners"
      aria-label="Partners and sponsors"
      className="relative py-20 w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Subtle top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="w-content mx-auto flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="badge-pill"
          >
            <Handshake className="h-3.5 w-3.5" />
            <span>HAMKORLAR VA HOMIYLAR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="font-bold text-balance"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'var(--color-foreground)',
              letterSpacing: '-0.03em',
              lineHeight: '1.1',
            }}
          >
            Bizning ishonchli hamkorlarimiz
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            style={{
              color: 'rgba(0,6,18,0.5)',
              fontSize: 'var(--text-base)',
              maxWidth: '480px',
            }}
          >
            Wegweiser jamoasi bu kompaniyalar bilan hamkorlikda ishlamoqda
          </motion.p>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="relative mt-10 overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
        />

        {/* Pure CSS marquee — GPU composited, zero JS frame cost */}
        <div
          className="marquee-track"
          style={{ willChange: 'transform' }}
        >
          {allPartners.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 h-20 px-8 rounded-2xl border border-black/[0.06] bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ minWidth: '180px', maxWidth: '220px' }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto object-contain"
                style={{ maxWidth: '160px' }}
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const sibling = target.nextElementSibling as HTMLElement
                  if (sibling) sibling.style.display = 'flex'
                }}
              />
              {/* Fallback text shown if image fails */}
              <span
                className="font-bold text-sm text-center hidden items-center justify-center"
                style={{ color: 'rgba(0,6,18,0.6)' }}
              >
                {partner.fallbackText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
