import { useState, useRef } from 'react'
import { Rocket, Check, Flame, Zap, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const sharedFeatures = [
  'shared_all_levels',
  'shared_lessons_3',
  'shared_duration',
  'shared_events',
  'shared_teachers',
  'shared_support_teacher',
  'shared_facilities',
  'shared_coworking',
]

const intensiveFeatures = [
  'shared_all_levels',
  'intensive_lessons_5',
  'shared_duration',
  'shared_events',
  'shared_teachers',
  'shared_support_teacher',
  'shared_facilities',
  'shared_coworking',
]

const individualFeatures = [
  'individual_lessons',
  'shared_duration',
  'shared_events',
  'shared_teachers',
  'shared_facilities',
  'shared_coworking',
]

const pricingCategories = [
  { id: 'standard', label: 'Standart', icon: Zap },
  { id: 'intensive', label: 'Intensiv', icon: Flame },
  { id: 'individual', label: 'Individual', icon: User },
]

const pricingData: any = {
  standard: [
    { price: '639 000', period: 'month', features: sharedFeatures, popular: true },
  ],
  intensive: [
    { price: '990 000', period: 'month', features: intensiveFeatures, popular: true },
  ],
  individual: [
    { price: '1 899 000', period: 'month', icon: User, features: individualFeatures, popular: true },
  ],
}

export default function Pricing() {
  const { lang } = useLang()
  const [activeTab, setActiveTab] = useState<'standard' | 'intensive' | 'individual'>('standard')
  const sectionRef = useRef<HTMLElement>(null)

  const c: Record<
    Lang,
    {
      ariaLabel: string
      badge: string
      headerLine1: string
      headerLine2: string
      tabs: { standard: string; intensive: string; individual: string }
      groupWord: string
      allLevels: string
      individualTitle: string
      currencyUnit: string
      monthWord: string
      cta: string
      scheduleNote: string
      priceNote: string
      features: Record<string, string>
    }
  > = {
    UZ: {
      ariaLabel: 'Narxlar va rejalar bo‘limi',
      badge: 'NARX VA REJALAR',
      headerLine1: "O'zingizga mos o'quv",
      headerLine2: 'shaklini tanlang',
      tabs: { standard: 'Standart', intensive: 'Intensiv', individual: 'Individual' },
      groupWord: 'GURUH',
      allLevels: 'Barcha darajalar (A1–C1)',
      individualTitle: 'Shaxsiy darslar',
      currencyUnit: "so'm",
      monthWord: 'oy',
      cta: 'Boshlash',
      scheduleNote: '📅 Siz uchun qulay kun va vaqtda darslar qo‘yib beriladi',
      priceNote: '📌 Yagona narx — barcha darajalar uchun bir xil. 2026-yil sentyabr oyidan amal qiladi.',
      features: {
        shared_all_levels: 'Barcha darajalar uchun yagona narx',
        individual_lessons: 'Shaxsiy darslar (1:1)',
        shared_lessons_3: 'Haftada 3 marotaba dars',
        intensive_lessons_5: 'Haftada 5 marotaba dars',
        shared_duration: 'Har bir dars 1.5 soat',
        shared_events: 'Bepul tadbirlar (har oyda)',
        shared_teachers: 'Malakali o‘qituvchilar',
        shared_support_teacher: "Ko‘makchi o‘qituvchi",
        shared_facilities: 'Zamonaviy jihozlar',
        shared_coworking: '22:00gacha bepul co-working zona',
      },
    },
    EN: {
      ariaLabel: 'Pricing section',
      badge: 'PRICING & PLANS',
      headerLine1: 'Choose the study',
      headerLine2: 'format that suits you',
      tabs: { standard: 'Standard', intensive: 'Intensive', individual: 'Individual' },
      groupWord: 'GROUP',
      allLevels: 'All levels (A1–C1)',
      individualTitle: 'Private lessons',
      currencyUnit: 'UZS',
      monthWord: 'month',
      cta: 'Get started',
      scheduleNote: '📅 We will schedule lessons at a convenient day and time for you.',
      priceNote: '📌 One price for all levels. Effective from September 2026.',
      features: {
        shared_all_levels: 'One price for all levels',
        individual_lessons: 'Private lessons (1:1)',
        shared_lessons_3: 'Classes 3 times a week',
        intensive_lessons_5: 'Classes 5 times a week',
        shared_duration: 'Each class 1.5 hours',
        shared_events: 'Free events (every month)',
        shared_teachers: 'Qualified teachers',
        shared_support_teacher: 'Support teacher',
        shared_facilities: 'Modern facilities',
        shared_coworking: 'Free co-working area until 22:00',
      },
    },
    RU: {
      ariaLabel: 'Раздел “Цены и планы”',
      badge: 'ЦЕНЫ И ПЛАНЫ',
      headerLine1: 'Выберите подходящий',
      headerLine2: 'формат обучения',
      tabs: { standard: 'Стандарт', intensive: 'Интенсив', individual: 'Индивидуально' },
      groupWord: 'ГРУППА',
      allLevels: 'Все уровни (A1–C1)',
      individualTitle: 'Индивидуальные занятия',
      currencyUnit: 'СУМ',
      monthWord: 'мес.',
      cta: 'Начать',
      scheduleNote: '📅 Мы подберем удобный для вас день и время занятий.',
      priceNote: '📌 Единая цена для всех уровней. Действует с сентября 2026 года.',
      features: {
        shared_all_levels: 'Единая цена для всех уровней',
        individual_lessons: 'Индивидуальные занятия (1:1)',
        shared_lessons_3: 'Занятия 3 раза в неделю',
        intensive_lessons_5: 'Занятия 5 раз в неделю',
        shared_duration: 'Каждое занятие 1,5 часа',
        shared_events: 'Бесплатные мероприятия (каждый месяц)',
        shared_teachers: 'Квалифицированные преподаватели',
        shared_support_teacher: 'Сопровождающий преподаватель',
        shared_facilities: 'Современные оснащенные классы',
        shared_coworking: 'Бесплатная co-working зона до 22:00',
      },
    },
    DE: {
      ariaLabel: 'Preise & Pläne',
      badge: 'PREISE & PLÄNE',
      headerLine1: 'Wählen Sie den',
      headerLine2: 'passenden Kursmodus',
      tabs: { standard: 'Standard', intensive: 'Intensiv', individual: 'Individuell' },
      groupWord: 'GRUPPE',
      allLevels: 'Alle Niveaus (A1–C1)',
      individualTitle: 'Einzelunterricht',
      currencyUnit: 'UZS',
      monthWord: 'Monat',
      cta: 'Loslegen',
      scheduleNote: '📅 Wir legen die Stunden an einem für Sie passenden Tag und zur passenden Zeit fest.',
      priceNote: '📌 Einheitlicher Preis für alle Niveaus. Gültig ab September 2026.',
      features: {
        shared_all_levels: 'Einheitlicher Preis für alle Niveaus',
        individual_lessons: 'Einzelunterricht (1:1)',
        shared_lessons_3: 'Kurse 3-mal pro Woche',
        intensive_lessons_5: 'Kurse 5-mal pro Woche',
        shared_duration: 'Jede Stunde 1,5 Stunden',
        shared_events: 'Kostenlose Events (jeden Monat)',
        shared_teachers: 'Qualifizierte Lehrkräfte',
        shared_support_teacher: 'Betreuungslehrer',
        shared_facilities: 'Moderne Ausstattung',
        shared_coworking: 'Kostenlose Co-Working Zone bis 22:00',
      },
    },
  }[lang]

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-label={c.ariaLabel}
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
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="badge-pill" 
            style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>{c.badge}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-balance font-bold text-white text-center"
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              letterSpacing: '-0.04em',
              lineHeight: '1.05',
            }}
          >
            {c.headerLine1} <br /> {c.headerLine2}
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
                  <span className="relative z-10">{c.tabs[cat.id as keyof typeof c.tabs]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 max-w-md mx-auto w-full gap-6"
            >
              {pricingData[activeTab].map((plan: any) => (
                <motion.div
                  key={activeTab}
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
                    {/* Plan */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[#106EFB] font-black text-[10px] tracking-widest uppercase opacity-70">
                        {c.tabs[activeTab]} {activeTab === 'individual' ? '' : c.groupWord}
                      </span>
                      <h3 className="text-white text-2xl font-black tracking-tight">
                        {activeTab === 'individual' ? c.individualTitle : c.allLevels}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-white text-3xl sm:text-4xl font-black tracking-tighter shrink-0">
                          {plan.price}
                        </span>
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                          {c.currencyUnit}
                        </span>
                      </div>
                      <span className="text-white/30 text-sm font-medium mt-1">/ {c.monthWord}</span>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    {/* Features */}
                    <ul className="flex flex-col gap-4 flex-grow">
                      {plan.features.map((feat: string) => (
                        <li key={feat} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-[#106EFB]" />
                          <span className="text-white/60 text-[13px] font-medium leading-snug">
                            {c.features[feat] ?? feat}
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
                      {c.cta}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2 text-center mt-2">
          <p className="text-white/40 text-sm font-medium">{c.scheduleNote}</p>
          <p className="text-white/30 text-sm font-medium">{c.priceNote}</p>
        </div>
      </div>
    </section>
  )
}
