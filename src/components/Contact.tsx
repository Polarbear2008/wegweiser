import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'

async function sendToTelegram(data: {
  name: string
  phone: string
  telegram: string
  level: string
  feedback: string
}): Promise<boolean> {
  const now = new Date()
  const dateStr = now.toLocaleDateString('uz-UZ', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })

  const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const message = [
    `📋 <b>YANGI ARIZA</b>`,
    ``,
    `👤 <b>Ism:</b> ${escapeHtml(data.name)}`,
    `📞 <b>Telefon:</b> ${escapeHtml(data.phone)}`,
    `✈️ <b>Telegram:</b> ${escapeHtml(data.telegram)}`,
    `📊 <b>Daraja:</b> ${escapeHtml(data.level)}`,
    data.feedback ? `💬 <b>Izoh:</b> ${escapeHtml(data.feedback)}` : null,
    ``,
    `🕐 <b>Vaqt:</b> ${dateStr}`,
    `🌐 <b>Manba:</b> wegweiser.uz`,
  ].filter((line) => line !== null).join('\n')

  try {
    const res = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
        parse_mode: 'HTML',
      }),
    })
    const json = await res.json()
    return json.ok === true
  } catch {
    return false
  }
}

const content: Record<Lang, {
  badge: string
  headingLine1: string
  headingAccent: string
  description: string
  writeUs: string
  nameLabel: string
  namePlaceholder: string
  phoneLabel: string
  phonePlaceholder: string
  telegramLabel: string
  telegramPlaceholder: string
  levelLabel: string
  levelPlaceholder: string
  levelOptions: Array<{ value: string; label: string }>
  feedbackLabel: string
  feedbackPlaceholder: string
  submitButton: string
  submitting: string
  successTitle: string
  successMessage: string
  errorTitle: string
  errorMessage: string
  tryAgain: string
}> = {
  UZ: {
    badge: "Bog'lanish",
    headingLine1: 'Darslarga yozilish uchun',
    headingAccent: 'ariza qoldiring',
    description: "Shunchaki o'z ma'lumotlaringizni qoldiring va bizning administratorlarimiz tez orada siz bilan bog'lanishadi.",
    writeUs: 'Bizga yozing',
    nameLabel: 'Ism va Familiya',
    namePlaceholder: 'Abdulla Oripov',
    phoneLabel: 'Telefon raqam',
    phonePlaceholder: '+998 __ ___ __ __',
    telegramLabel: 'Telegram username',
    telegramPlaceholder: '@username',
    levelLabel: 'Nemis tilini bilish darajasi',
    levelPlaceholder: 'Darajangizni tanlang',
    levelOptions: [
      { value: 'Noldan', label: 'Noldan' },
      { value: 'A1', label: 'A1' },
      { value: 'A2', label: 'A2' },
      { value: 'B1', label: 'B1' },
      { value: 'B2', label: 'B2' },
      { value: 'C1', label: 'C1' },
    ],
    feedbackLabel: "Qo'shimcha fikr (ixtiyoriy)",
    feedbackPlaceholder: 'Savol yoki fikrlaringiz...',
    submitButton: 'Ariza qoldirish',
    submitting: 'Yuborilmoqda...',
    successTitle: 'Arizangiz qabul qilindi! ✅',
    successMessage: "Tez orada siz bilan bog'lanamiz.",
    errorTitle: 'Xatolik yuz berdi',
    errorMessage: "Iltimos, qayta urinib ko'ring yoki biz bilan to'g'ridan-to'g'ri bog'laning.",
    tryAgain: 'Qayta urinish',
  },
  EN: {
    badge: 'Contact',
    headingLine1: 'To enroll in classes',
    headingAccent: 'leave an application',
    description: 'Simply leave your details and our administrators will contact you shortly.',
    writeUs: 'Write to us',
    nameLabel: 'Full Name',
    namePlaceholder: 'John Doe',
    phoneLabel: 'Phone number',
    phonePlaceholder: '+998 __ ___ __ __',
    telegramLabel: 'Telegram username',
    telegramPlaceholder: '@username',
    levelLabel: 'German language level',
    levelPlaceholder: 'Select your level',
    levelOptions: [
      { value: 'Beginner', label: 'Beginner' },
      { value: 'A1', label: 'A1' },
      { value: 'A2', label: 'A2' },
      { value: 'B1', label: 'B1' },
      { value: 'B2', label: 'B2' },
      { value: 'C1', label: 'C1' },
    ],
    feedbackLabel: 'Additional comments (optional)',
    feedbackPlaceholder: 'Questions or comments...',
    submitButton: 'Submit application',
    submitting: 'Submitting...',
    successTitle: 'Application received! ✅',
    successMessage: 'We will contact you shortly.',
    errorTitle: 'Something went wrong',
    errorMessage: 'Please try again or contact us directly.',
    tryAgain: 'Try again',
  },
  RU: {
    badge: 'Контакт',
    headingLine1: 'Для записи на курсы',
    headingAccent: 'оставьте заявку',
    description: 'Просто оставьте ваши данные, и наши администраторы свяжутся с вами в кратчайшие сроки.',
    writeUs: 'Написать нам',
    nameLabel: 'Имя и фамилия',
    namePlaceholder: 'Иван Иванов',
    phoneLabel: 'Номер телефона',
    phonePlaceholder: '+998 __ ___ __ __',
    telegramLabel: 'Telegram username',
    telegramPlaceholder: '@username',
    levelLabel: 'Уровень немецкого языка',
    levelPlaceholder: 'Выберите ваш уровень',
    levelOptions: [
      { value: 'С нуля', label: 'С нуля' },
      { value: 'A1', label: 'A1' },
      { value: 'A2', label: 'A2' },
      { value: 'B1', label: 'B1' },
      { value: 'B2', label: 'B2' },
      { value: 'C1', label: 'C1' },
    ],
    feedbackLabel: 'Дополнительный комментарий (необязательно)',
    feedbackPlaceholder: 'Вопросы или комментарии...',
    submitButton: 'Отправить заявку',
    submitting: 'Отправка...',
    successTitle: 'Заявка принята! ✅',
    successMessage: 'Мы скоро с вами свяжемся.',
    errorTitle: 'Произошла ошибка',
    errorMessage: 'Пожалуйста, попробуйте снова или свяжитесь с нами напрямую.',
    tryAgain: 'Попробовать снова',
  },
  DE: {
    badge: 'Kontakt',
    headingLine1: 'Für die Kursanmeldung',
    headingAccent: 'Anfrage hinterlassen',
    description: 'Hinterlassen Sie einfach Ihre Daten und unsere Mitarbeiter werden sich in Kürze bei Ihnen melden.',
    writeUs: 'Schreiben Sie uns',
    nameLabel: 'Vor- und Nachname',
    namePlaceholder: 'Max Mustermann',
    phoneLabel: 'Telefonnummer',
    phonePlaceholder: '+998 __ ___ __ __',
    telegramLabel: 'Telegram-Benutzername',
    telegramPlaceholder: '@username',
    levelLabel: 'Deutschkenntnisse',
    levelPlaceholder: 'Wählen Sie Ihr Niveau',
    levelOptions: [
      { value: 'Anfänger', label: 'Anfänger' },
      { value: 'A1', label: 'A1' },
      { value: 'A2', label: 'A2' },
      { value: 'B1', label: 'B1' },
      { value: 'B2', label: 'B2' },
      { value: 'C1', label: 'C1' },
    ],
    feedbackLabel: 'Zusätzliche Anmerkungen (optional)',
    feedbackPlaceholder: 'Fragen oder Anmerkungen...',
    submitButton: 'Anfrage absenden',
    submitting: 'Wird gesendet...',
    successTitle: 'Anfrage eingegangen! ✅',
    successMessage: 'Wir werden uns in Kürze bei Ihnen melden.',
    errorTitle: 'Ein Fehler ist aufgetreten',
    errorMessage: 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
    tryAgain: 'Erneut versuchen',
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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const { lang } = useLang()
  const c = content[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      telegram: formData.get('username') as string,
      level: formData.get('level') as string,
      feedback: formData.get('feedback') as string || '',
    }

    const ok = await sendToTelegram(data)

    if (ok) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  function resetForm() {
    setStatus('idle')
  }

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
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full rounded-[2.5rem] py-16 px-8 md:py-20 md:px-16 overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent shadow-xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <MessageCircle className="h-24 w-24 md:h-32 md:w-32 text-[#106EFB]" />
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 max-w-5xl mx-auto w-full">
            {/* Left Column */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-8">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#106EFB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#106EFB]"></span>
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#106EFB] uppercase">{c.badge}</span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
                style={{ lineHeight: '1.2' }}
              >
                {c.headingLine1} <br className="hidden lg:block"/>
                <span className="inline-block py-1 -my-1 text-transparent bg-clip-text bg-gradient-to-r from-[#106EFB] to-[#5094ff]">
                  {c.headingAccent}
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-white/50 text-base md:text-lg leading-relaxed max-w-md mb-8 lg:mb-10"
              >
                {c.description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center lg:justify-start w-full">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+998952020550"
                  className="h-12 px-6 rounded-full bg-gradient-to-r from-[#106EFB] to-[#0a52c3] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-shadow duration-300 shadow-[0_0_15px_rgba(16,110,251,0.3)] hover:shadow-[0_0_25px_rgba(16,110,251,0.5)] w-full sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  +998 95 202 05 50
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  href="https://t.me/Wegweiser_admin2"
                  className="h-12 px-6 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-colors duration-300 w-full sm:w-auto hover:border-white/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  {c.writeUs}
                </motion.a>
              </motion.div>
            </div>

            {/* Application Form */}
            <motion.div variants={itemVariants} className="w-full lg:w-[440px] bg-[#0c121e] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden shrink-0">
              {/* Form Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#106EFB]/15 rounded-full blur-[60px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-6 py-12 relative z-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                      className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    >
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">{c.successTitle}</h3>
                      <p className="text-white/50 text-sm">{c.successMessage}</p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="mt-4 text-[#106EFB] font-bold text-sm hover:underline"
                    >
                      ← {c.submitButton}
                    </button>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-6 py-12 relative z-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                      className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center"
                    >
                      <AlertCircle className="h-10 w-10 text-red-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">{c.errorTitle}</h3>
                      <p className="text-white/50 text-sm">{c.errorMessage}</p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="mt-2 h-10 px-6 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-colors"
                    >
                      {c.tryAgain}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 relative z-10"
                  >
                    <div className="flex flex-col gap-1.5 group">
                      <label htmlFor="name" className="text-white/60 text-[11px] font-semibold uppercase tracking-wider ml-1 group-focus-within:text-[#106EFB] transition-colors">{c.nameLabel}</label>
                      <input required id="name" name="name" type="text" placeholder={c.namePlaceholder} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm" />
                    </div>

                    <div className="flex flex-col gap-1.5 group">
                      <label htmlFor="phone" className="text-white/60 text-[11px] font-semibold uppercase tracking-wider ml-1 group-focus-within:text-[#106EFB] transition-colors">{c.phoneLabel}</label>
                      <input required id="phone" name="phone" type="tel" placeholder={c.phonePlaceholder} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm" />
                    </div>

                    <div className="flex flex-col gap-1.5 group">
                      <label htmlFor="username" className="text-white/60 text-[11px] font-semibold uppercase tracking-wider ml-1 group-focus-within:text-[#106EFB] transition-colors">{c.telegramLabel}</label>
                      <input required id="username" name="username" type="text" placeholder={c.telegramPlaceholder} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm" />
                    </div>

                    <div className="flex flex-col gap-1.5 group">
                      <label htmlFor="level" className="text-white/60 text-[11px] font-semibold uppercase tracking-wider ml-1 group-focus-within:text-[#106EFB] transition-colors">{c.levelLabel}</label>
                      <div className="relative">
                        <select required id="level" name="level" defaultValue="" className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm appearance-none cursor-pointer">
                          <option value="" disabled className="text-black">{c.levelPlaceholder}</option>
                          {c.levelOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="text-black">{opt.label}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 group">
                      <label htmlFor="feedback" className="text-white/60 text-[11px] font-semibold uppercase tracking-wider ml-1 group-focus-within:text-[#106EFB] transition-colors">{c.feedbackLabel}</label>
                      <textarea id="feedback" name="feedback" placeholder={c.feedbackPlaceholder} rows={2} className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm resize-none"></textarea>
                    </div>

                    <motion.button
                      whileHover={status === 'submitting' ? {} : { scale: 1.02 }}
                      whileTap={status === 'submitting' ? {} : { scale: 0.98 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#106EFB] to-[#0a52c3] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-shadow duration-300 shadow-[0_0_15px_rgba(16,110,251,0.2)] hover:shadow-[0_0_25px_rgba(16,110,251,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {c.submitting}
                        </>
                      ) : (
                        <>
                          {c.submitButton}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
