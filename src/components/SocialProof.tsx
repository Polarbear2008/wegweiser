import { motion } from 'framer-motion'

const partners = [
  { name: 'Goethe-Institut', logo: 'GOETHE' },
  { name: 'TestDaF', logo: 'TestDaF' },
  { name: 'DAAD', logo: 'DAAD' },
  { name: 'DSD', logo: 'DSD' },
  { name: 'ÖSD', logo: 'ÖSD' },
  { name: 'Telc', logo: 'TELC' },
  { name: 'Humboldt', logo: 'Humboldt' },
]

export default function SocialProof() {
  return (
    <section
      id="socialproof"
      className="relative py-24 w-full overflow-hidden"
      style={{ background: '#070a11' }}
      aria-label="Social proof section"
    >
      <div className="w-content mx-auto flex flex-col gap-16">
        <div className="items-center text-center flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="badge-pill"
            style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <span>HAMKORLARIMIZ</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold text-center text-white"
            style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', 
              letterSpacing: '-0.03em',
              lineHeight: '1.2'
            }}
          >
            Xalqaro miqyosda tan olingan <br /> ta'lim muassasalari bilan hamkorlik
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-center max-w-2xl text-lg leading-relaxed"
          >
            Wegweiser Germaniyaning eng nufuzli muassasalari va xalqaro ta'lim tarmoqlari bilan hamkorlik qilib keladi.
          </motion.p>
        </div>

        {/* Premium Marquee */}
        <div className="relative flex overflow-hidden group">
          <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#070a11] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#070a11] to-transparent" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-12 whitespace-nowrap py-4"
            style={{ willChange: 'transform' }}
          >
            {[...partners, ...partners].map((p, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center px-12 py-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/item"
              >
                <span className="text-3xl md:text-4xl font-black text-white/20 group-hover/item:text-[#106EFB] transition-colors duration-500 tracking-tighter">
                  {p.logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
