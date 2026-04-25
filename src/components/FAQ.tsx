import { useState, useRef } from 'react'
import { Plus, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

const faqsByLang: Record<Lang, Array<{ question: string; answer: string }>> = {
  UZ: [
    {
      question: "Nemis tilini bilmay, Wegweiser-ga kela olamanmi?",
      answer: "Ha, albatta! Yangi talabalarimiz uchun test sinovlari o'tkazamiz. Uning natijalariga ko'ra mutaxassislarimiz talabalarni guruhlarga ajratishadi.",
    },
    {
      question: "Nemis tili kurslariga necha yoshdan ariza topshirish mumkin?",
      answer: "Minimal yosh - 13. Shu bilan birga, barcha voyaga yetmaganlar uchun ularning ota-onalari yoki vasiylar to'g'risida ma'lumot taqdim etilishi shart.",
    },
    {
      question: "Onlayn o'rganish ham mumkinmi yoki faqat offline?",
      answer: "Ikkalasi ham! Intensive 3-oylik kurs klassik; Standard 6-oylik gibrid (onlayn + offline); Foundation 9-oylik o'zaro onlayn. O'z jadvalingizga moslab tanlang.",
    },
    {
      question: "O'quvchilarni kerakli adabiyotlar bilan taminlaysizlarmi?",
      answer: "Tanlangan nemis tili kursi uchun haq to'lagandan so'ng, markazimiz talabalarga barcha qo'llanmalar va boshqa o'quv materiallarini taqdim etadi.",
    },
    {
      question: "Bepul xizmatlardan qanday foydalanish mumkin?",
      answer: "Bepul sinov darsiga barcha xohlovchilar qatnashishlari mumkin. Buning uchun mazkur sahifaning yuqori qismidagi formadan foydalangan holda ro'yxatdan o'tish kifoya.",
    },
  ],
  EN: [
    {
      question: "Can I come to Wegweiser without knowing any German?",
      answer: "Absolutely! We conduct placement tests for new students. Based on the results, our specialists assign students to the appropriate groups.",
    },
    {
      question: "What is the minimum age to apply for German courses?",
      answer: "The minimum age is 13. For all minors, information about their parents or guardians must be provided.",
    },
    {
      question: "Is online learning available or only in-person?",
      answer: "Both! The 3-month Intensive course is in-person; the 6-month Standard is hybrid (online + offline); the 9-month Foundation is fully online. Choose what fits your schedule.",
    },
    {
      question: "Do you provide learning materials for students?",
      answer: "After paying for the chosen German course, our center provides students with all textbooks and other learning materials.",
    },
    {
      question: "How can I use the free services?",
      answer: "Anyone can attend a free trial lesson. Simply register through the form at the top of this page.",
    },
  ],
  RU: [
    {
      question: "Могу ли я прийти в Wegweiser без знания немецкого?",
      answer: "Конечно! Мы проводим тестирование для новых студентов. По результатам наши специалисты распределяют студентов по группам.",
    },
    {
      question: "С какого возраста можно подать заявку на курсы?",
      answer: "Минимальный возраст — 13 лет. Для всех несовершеннолетних необходимо предоставить информацию о родителях или опекунах.",
    },
    {
      question: "Доступно ли онлайн-обучение или только очное?",
      answer: "Оба варианта! 3-месячный Интенсив — очный; 6-месячный Стандарт — гибрид (онлайн + офлайн); 9-месячный Foundation — полностью онлайн.",
    },
    {
      question: "Предоставляете ли вы учебные материалы?",
      answer: "После оплаты выбранного курса наш центр предоставляет студентам все учебники и другие учебные материалы.",
    },
    {
      question: "Как воспользоваться бесплатными услугами?",
      answer: "Все желающие могут посетить бесплатный пробный урок. Для этого достаточно зарегистрироваться через форму вверху этой страницы.",
    },
  ],
  DE: [
    {
      question: "Kann ich zu Wegweiser kommen, ohne Deutsch zu können?",
      answer: "Natürlich! Wir führen Einstufungstests für neue Schüler durch. Anhand der Ergebnisse teilen unsere Experten die Schüler in passende Gruppen ein.",
    },
    {
      question: "Ab welchem Alter kann man sich für Deutschkurse anmelden?",
      answer: "Das Mindestalter beträgt 13 Jahre. Für alle Minderjährigen müssen Informationen über Eltern oder Erziehungsberechtigte vorgelegt werden.",
    },
    {
      question: "Gibt es Online-Unterricht oder nur Präsenzunterricht?",
      answer: "Beides! Der 3-monatige Intensivkurs ist Präsenz; der 6-monatige Standard ist hybrid (online + Präsenz); der 9-monatige Foundation ist komplett online.",
    },
    {
      question: "Stellen Sie Lernmaterialien zur Verfügung?",
      answer: "Nach der Bezahlung des gewählten Kurses stellen wir allen Schülern sämtliche Lehrbücher und Lernmaterialien zur Verfügung.",
    },
    {
      question: "Wie kann ich die kostenlosen Angebote nutzen?",
      answer: "Jeder kann an einer kostenlosen Probestunde teilnehmen. Melden Sie sich einfach über das Formular oben auf dieser Seite an.",
    },
  ],
}

const headerByLang: Record<Lang, {
  badge: string
  heading: string
  description: string
  helpTitle: string
  helpDescription: string
  helpLink: string
  imageCaption: string
  imageAlt: string
}> = {
  UZ: {
    badge: 'YORDAM MARKAZI',
    heading: "Tez-tez so'raladigan savollar",
    description: "Sizda tug'ilishi mumkin bo'lgan savollarga javob oling. Agar savolingiz bo'lsa, mutaxassislarimiz bilan bog'laning.",
    helpTitle: 'Yordam kerakmi?',
    helpDescription: "Bizning professional jamoamiz har qanday savolingizga javob berishga tayyor.",
    helpLink: "Biz bilan bog'lanish",
    imageCaption: 'Sizning muvaffaqiyatingiz — bizning maqsadimiz.',
    imageAlt: 'Wegweiser savollarga javoblar',
  },
  EN: {
    badge: 'HELP CENTER',
    heading: 'Frequently asked questions',
    description: 'Get answers to common questions. If you have more, contact our specialists.',
    helpTitle: 'Need help?',
    helpDescription: 'Our professional team is ready to answer any of your questions.',
    helpLink: 'Contact us',
    imageCaption: 'Your success is our mission.',
    imageAlt: 'Wegweiser FAQ',
  },
  RU: {
    badge: 'ЦЕНТР ПОМОЩИ',
    heading: 'Часто задаваемые вопросы',
    description: 'Получите ответы на распространённые вопросы. Если у вас остались вопросы, свяжитесь с нашими специалистами.',
    helpTitle: 'Нужна помощь?',
    helpDescription: 'Наша профессиональная команда готова ответить на любой ваш вопрос.',
    helpLink: 'Связаться с нами',
    imageCaption: 'Ваш успех — наша миссия.',
    imageAlt: 'FAQ Wegweiser',
  },
  DE: {
    badge: 'HILFEZENTRUM',
    heading: 'Häufig gestellte Fragen',
    description: 'Finden Sie Antworten auf häufige Fragen. Bei weiteren Fragen kontaktieren Sie unsere Experten.',
    helpTitle: 'Hilfe nötig?',
    helpDescription: 'Unser professionelles Team beantwortet gerne alle Ihre Fragen.',
    helpLink: 'Kontaktieren Sie uns',
    imageCaption: 'Ihr Erfolg ist unsere Mission.',
    imageAlt: 'Wegweiser FAQ',
  },
}

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

export default function FAQ() {
  const { lang } = useLang()
  const faqs = faqsByLang[lang]
  const h = headerByLang[lang]
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 w-full overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label={h.heading}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-5"
           style={{ background: 'radial-gradient(circle at 80% 20%, rgba(16, 110, 251, 0.4) 0%, transparent 50%)', filter: 'blur(100px)' }} />

      <div className="w-content mx-auto flex flex-col gap-16 relative z-10">
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-8 md:items-end justify-between"
        >
          <div className="flex flex-col gap-6 max-w-3xl">
            <motion.div variants={itemVariants}>
              <div className="badge-pill">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{h.badge}</span>
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
              {h.heading}
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
              {h.description}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image / Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80"
                alt={h.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#106EFB]/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-bold text-lg leading-tight">
                  {h.imageCaption}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
              <h4 className="font-bold text-gray-900">{h.helpTitle}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {h.helpDescription}
              </p>
              <button 
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-2 text-[#106EFB] font-bold text-sm flex items-center gap-2 hover:underline"
              >
                {h.helpLink} <Plus className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Accordion */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="lg:col-span-8 flex flex-col gap-4"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  openIndex === i 
                    ? 'bg-white border-[#106EFB]/30 shadow-xl shadow-primary/5' 
                    : 'bg-gray-50/50 border-gray-100 hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className="text-lg md:text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                  <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === i ? 'bg-[#106EFB] text-white rotate-45' : 'bg-white text-gray-400 border border-gray-100'
                  }`}>
                    <Plus className="h-5 w-5" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <div className="h-px w-full bg-gray-100 mb-6" />
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
