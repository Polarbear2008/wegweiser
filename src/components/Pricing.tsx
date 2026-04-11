import { useState, useRef } from 'react'
import { Rocket, Check, Flame, Zap, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const sharedFeatures = [
  "Haftada 3 marotaba dars",
  "Har bir dars 1.5 soat",
  "Bepul tadbirlar (har oyda)",
  "Malakali o'qituvchilar",
  "Support teacher",
  "Zamonaviy jihozlar",
  "22:00gacha bepul co-working zona",
]

const intensiveFeatures = [
  "Haftada 5 marotaba dars",
  "Har bir dars 1.5 soat",
  "Bepul tadbirlar (har oyda)",
  "Malakali o'qituvchilar",
  "Support teacher",
  "Zamonaviy jihozlar",
  "22:00gacha bepul co-working zona",
]

const pricingCategories = [
  { id: 'standard', label: 'Standart', icon: Zap },
  { id: 'intensive', label: 'Intensiv', icon: Flame },
  { id: 'individual', label: 'Individual', icon: User },
]

const pricingData: any = {
  standard: [
    { level: 'A1', price: '350 000', period: 'oy', features: sharedFeatures },
    { level: 'A2', price: '370 000', period: 'oy', features: sharedFeatures },
    { level: 'B1', price: '400 000', period: 'oy', features: sharedFeatures, popular: true },
    { level: 'B2', price: '450 000', period: 'oy', features: sharedFeatures },
  ],
  intensive: [
    { level: 'A1', price: '600 000', period: 'oy', features: intensiveFeatures },
    { level: 'A2', price: '700 000', period: 'oy', features: intensiveFeatures },
    { level: 'B1', price: '800 000', period: 'oy', features: intensiveFeatures, popular: true },
    { level: 'B2', price: '850 000', period: 'oy', features: intensiveFeatures },
  ],
  individual: [
    { level: 'Individual', price: '1 300 000', period: 'oy', icon: User, features: sharedFeatures, popular: true },
  ],
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('standard')
  const sectionRef = useRef<HTMLElement>(null)

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-label="Pricing section"
      className="relative py-24 w-full dark-section overflow-hidden"
      style={{ background: '#070a11' }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10"
           style={{ background: 'radial-gradient(circle at 70% 30%, rgba(16, 110, 251, 0.2) 0%, transparent 60%)', filter: 'blur(100px)' }} />

      <div className="w-content mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="badge-pill" 
            style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>NARX VA REJALAR</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-balance font-bold text-white text-center"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
            }}
          >
            O'zingizga mos o'quv <br /> shaklini tanlang
          </motion.h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex md:justify-center mb-4 overflow-x-auto scrollbar-hide px-4 -mx-4 pb-4">
          <div className="flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl shrink-0">
            {pricingCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeTab === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#106EFB] rounded-xl shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`relative z-10 h-4 w-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`grid gap-6 ${activeTab === 'individual' ? 'grid-cols-1 max-w-sm mx-auto w-full' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}
            >
              {pricingData[activeTab].map((plan: any, idx: number) => (
                <motion.div
                  key={plan.level}
                  whileHover={{ y: -8 }}
                  className={`relative flex flex-col rounded-[2rem] border p-6 md:p-7 transition-all duration-500 overflow-hidden ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-white/20' 
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-6 right-6 h-9 w-9 rounded-full bg-[#106EFB] flex items-center justify-center shadow-lg shadow-primary/20 z-10">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div className="flex flex-col gap-6 h-full">
                    {/* Level */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[#106EFB] font-black text-[10px] tracking-widest uppercase opacity-70">
                        {activeTab.toUpperCase()} DAROJA
                      </span>
                      <h3 className="text-white text-2xl font-black tracking-tight">
                        {plan.level}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-white text-3xl sm:text-4xl font-black tracking-tighter shrink-0">
                          {plan.price}
                        </span>
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                          so'm
                        </span>
                      </div>
                      <span className="text-white/30 text-sm font-medium mt-1">/ {plan.period}</span>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* Features */}
                    <ul className="flex flex-col gap-4 flex-grow">
                      {plan.features.map((feat: string) => (
                        <li key={feat} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-[#106EFB]" />
                          <span className="text-white/60 text-[13px] font-medium leading-snug">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                        plan.popular
                          ? 'bg-[#106EFB] text-white shadow-lg shadow-primary/20'
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => scrollTo('contact')}
                    >
                      Boshlash
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Schedule note */}
        <p className="text-center text-white/40 text-sm font-medium mt-2">
          📅 Siz uchun qulay kun va vaqtda darslar qo'yib beriladi
        </p>
      </div>
    </section>
  )
}
