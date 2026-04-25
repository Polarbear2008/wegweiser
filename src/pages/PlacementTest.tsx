import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardCheck, ArrowRight, ArrowLeft, Clock, CheckCircle2, XCircle, Printer, RotateCcw, Award } from 'lucide-react'
import { useLang } from '../i18n/LanguageProvider'
import type { Lang } from '../i18n/languages'
import { questions, sectionLabels, determineLevel, levelDescriptions } from '../data/placementQuestions'

const ui: Record<Lang, Record<string, string>> = {
  UZ: {
    title: "Darajangizni aniqlang", subtitle: "30 ta savolga javob bering va nemis tili darajangizni bilib oling",
    start: "Testni boshlash", next: "Keyingi", prev: "Oldingi", finish: "Yakunlash",
    question: "Savol", of: "/", timeLeft: "Qolgan vaqt", min: "daq",
    yourLevel: "Sizning darajangiz", score: "Ball", outOf: "dan",
    correct: "To'g'ri", wrong: "Noto'g'ri", print: "Sertifikatni saqlash",
    retry: "Qayta topshirish", name: "Ismingiz", namePlace: "Ism va familiya",
    startTest: "Boshlash", badge: "PLACEMENT TEST", backHome: "Bosh sahifa",
    enterName: "Iltimos, ismingizni kiriting", certificate: "SERTIFIKAT",
    certText: "ushbu test natijasida quyidagi daraja aniqlandi",
    certDate: "Sana", certScore: "Natija", sections: "Bo'limlar bo'yicha",
    instructionsTitle: "Test Qoidalari",
    instructionsText: "Test 30 ta savoldan iborat. Har bir savolga faqat bitta to'g'ri javob bor. Lug'at yoki tarjimondan foydalanmang, aks holda natija noaniq bo'lishi mumkin. Tayyor bo'lsangiz, ismingizni kiriting va boshlang.",
  },
  EN: {
    title: "Find Your Level", subtitle: "Answer 30 questions to discover your German language level",
    start: "Start Test", next: "Next", prev: "Previous", finish: "Finish",
    question: "Question", of: "/", timeLeft: "Time left", min: "min",
    yourLevel: "Your Level", score: "Score", outOf: "out of",
    correct: "Correct", wrong: "Wrong", print: "Save Certificate",
    retry: "Retake Test", name: "Your Name", namePlace: "Full name",
    startTest: "Start", badge: "PLACEMENT TEST", backHome: "Home",
    enterName: "Please enter your name", certificate: "CERTIFICATE",
    certText: "has achieved the following level based on the placement test",
    certDate: "Date", certScore: "Result", sections: "Results by section",
    instructionsTitle: "Test Instructions",
    instructionsText: "The test consists of 30 questions. There is only one correct answer per question. Do not use dictionaries or translators, otherwise the result may be inaccurate. When you are ready, enter your name and start.",
  },
  RU: {
    title: "Определите свой уровень", subtitle: "Ответьте на 30 вопросов и узнайте свой уровень немецкого",
    start: "Начать тест", next: "Далее", prev: "Назад", finish: "Завершить",
    question: "Вопрос", of: "/", timeLeft: "Осталось", min: "мин",
    yourLevel: "Ваш уровень", score: "Баллы", outOf: "из",
    correct: "Правильно", wrong: "Неправильно", print: "Сохранить сертификат",
    retry: "Пройти снова", name: "Ваше имя", namePlace: "Имя и фамилия",
    startTest: "Начать", badge: "PLACEMENT TEST", backHome: "Главная",
    enterName: "Пожалуйста, введите имя", certificate: "СЕРТИФИКАТ",
    certText: "по результатам теста достиг(ла) следующего уровня",
    certDate: "Дата", certScore: "Результат", sections: "Результаты по разделам",
    instructionsTitle: "Правила Теста",
    instructionsText: "Тест состоит из 30 вопросов. На каждый вопрос есть только один правильный ответ. Не используйте словари или переводчики, иначе результат может быть неточным. Когда будете готовы, введите свое имя и начните.",
  },
  DE: {
    title: "Finden Sie Ihr Niveau", subtitle: "Beantworten Sie 30 Fragen und entdecken Sie Ihr Deutschniveau",
    start: "Test starten", next: "Weiter", prev: "Zurück", finish: "Abschließen",
    question: "Frage", of: "/", timeLeft: "Verbleibend", min: "Min",
    yourLevel: "Ihr Niveau", score: "Punkte", outOf: "von",
    correct: "Richtig", wrong: "Falsch", print: "Zertifikat speichern",
    retry: "Erneut versuchen", name: "Ihr Name", namePlace: "Vor- und Nachname",
    startTest: "Starten", badge: "PLACEMENT TEST", backHome: "Startseite",
    enterName: "Bitte geben Sie Ihren Namen ein", certificate: "ZERTIFIKAT",
    certText: "hat im Einstufungstest folgendes Niveau erreicht",
    certDate: "Datum", certScore: "Ergebnis", sections: "Ergebnisse nach Bereich",
    instructionsTitle: "Testanweisungen",
    instructionsText: "Der Test besteht aus 30 Fragen. Es gibt nur eine richtige Antwort pro Frage. Bitte benutzen Sie keine Wörterbücher oder Übersetzer, da das Ergebnis sonst ungenau sein könnte. Wenn Sie bereit sind, geben Sie Ihren Namen ein und beginnen Sie.",
  },
}

type Phase = 'intro' | 'test' | 'result'

export default function PlacementTest() {
  const { lang } = useLang()
  const t = ui[lang]
  const [phase, setPhase] = useState<Phase>('intro')
  const [name, setName] = useState('')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const certRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = questions.length

  function startTest() {
    if (!name.trim()) return
    setPhase('test')
    setCurrent(0)
    setAnswers({})
    const now = Date.now()
    setStartTime(now)
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - now) / 1000)), 1000)
  }

  function selectAnswer(idx: number) {
    setAnswers(prev => ({ ...prev, [questions[current].id]: idx }))
  }

  function finishTest() {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('result')
  }

  function retry() {
    setPhase('intro')
    setName('')
    setCurrent(0)
    setAnswers({})
    setElapsed(0)
    window.scrollTo({ top: 0 })
  }

  function printCert() {
    window.print()
  }

  const score = questions.reduce((s, q) => s + (answers[q.id] === q.correct ? 1 : 0), 0)
  const level = determineLevel(score, total)
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  const sectionScores = (['grammar', 'vocabulary', 'reading'] as const).map(sec => {
    const qs = questions.filter(q => q.section === sec)
    const correct = qs.reduce((s, q) => s + (answers[q.id] === q.correct ? 1 : 0), 0)
    return { section: sec, correct, total: qs.length }
  })

  const levelColor: Record<string, string> = {
    A0: '#94a3b8', A1: '#22c55e', A2: '#10b981', B1: '#3b82f6', B2: '#8b5cf6', C1: '#f59e0b',
  }

  // ── INTRO ──
  if (phase === 'intro') return (
    <section className="min-h-screen pt-32 pb-20 flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto px-6 flex flex-col items-center text-center gap-8">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#106EFB] to-[#0a52c3] flex items-center justify-center shadow-lg shadow-[#106EFB]/20">
          <ClipboardCheck className="h-10 w-10 text-white" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="badge-pill mx-auto"><Award className="h-3.5 w-3.5" /><span>{t.badge}</span></div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-foreground)', letterSpacing: '-0.03em' }}>{t.title}</h1>
          <p className="text-base" style={{ color: 'rgba(0,6,18,0.5)' }}>{t.subtitle}</p>
        </div>

        {/* Instructions Block */}
        <div className="w-full text-left bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-5 mb-2">
          <h3 className="text-sm font-bold text-[#106EFB] uppercase tracking-wider mb-2">{t.instructionsTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.instructionsText}</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-[11px] font-semibold uppercase tracking-wider ml-1" style={{ color: 'rgba(0,6,18,0.5)' }}>{t.name}</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlace}
              onKeyDown={e => e.key === 'Enter' && startTest()}
              className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:border-[#106EFB]/60 focus:bg-[#106EFB]/5 transition-all font-medium text-sm"
              style={{ borderColor: 'rgba(0,6,18,0.1)', color: 'var(--color-foreground)' }} />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={startTest}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#106EFB] to-[#0a52c3] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,110,251,0.3)] hover:shadow-[0_0_25px_rgba(16,110,251,0.5)] transition-shadow">
            {t.startTest} <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full mt-2">
          {(['grammar', 'vocabulary', 'reading'] as const).map(s => (
            <div key={s} className="rounded-xl p-4 text-center border" style={{ borderColor: 'rgba(0,6,18,0.06)', background: 'rgba(16,110,251,0.03)' }}>
              <p className="text-xs font-bold text-[#106EFB] uppercase tracking-wider">{sectionLabels[s][lang]}</p>
              <p className="text-lg font-bold mt-1" style={{ color: 'var(--color-foreground)' }}>{questions.filter(q => q.section === s).length}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )

  // ── TEST ──
  if (phase === 'test') {
    const q = questions[current]
    const progress = ((current + 1) / total) * 100
    const answered = answers[q.id] !== undefined

    return (
      <section className="min-h-screen pt-28 pb-16" style={{ background: 'var(--color-background)' }}>
        <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: '#106EFB' }}>{t.question} {current + 1}{t.of}{total}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,110,251,0.1)', color: '#106EFB' }}>{q.level}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,6,18,0.5)' }}>{sectionLabels[q.section][lang]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'rgba(0,6,18,0.4)' }}>
              <Clock className="h-3.5 w-3.5" /> {mins}:{secs.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(16,110,251,0.1)' }}>
            <motion.div className="h-full rounded-full bg-[#106EFB]" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
              className="rounded-2xl border p-8 flex flex-col gap-6" style={{ borderColor: 'rgba(0,6,18,0.06)', background: '#fff' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-foreground)', lineHeight: 1.4 }}>{q.question}</h2>
              <div className="flex flex-col gap-3">
                {q.options.map((opt, i) => {
                  const selected = answers[q.id] === i
                  return (
                    <motion.button key={i} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => selectAnswer(i)}
                      className="w-full text-left px-5 py-4 rounded-xl border font-medium text-sm transition-all duration-200"
                      style={{
                        borderColor: selected ? '#106EFB' : 'rgba(0,6,18,0.08)',
                        background: selected ? 'rgba(16,110,251,0.06)' : 'transparent',
                        color: selected ? '#106EFB' : 'var(--color-foreground)',
                      }}>
                      <span className="inline-flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ borderColor: selected ? '#106EFB' : 'rgba(0,6,18,0.15)', background: selected ? '#106EFB' : 'transparent', color: selected ? '#fff' : 'rgba(0,6,18,0.4)' }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex justify-between items-center">
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-30"
              style={{ color: 'rgba(0,6,18,0.6)' }}>
              <ArrowLeft className="h-4 w-4" /> {t.prev}
            </button>
            {current < total - 1 ? (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrent(c => c + 1)} disabled={!answered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#106EFB] text-white text-sm font-bold shadow-md disabled:opacity-40 transition-all">
                {t.next} <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={finishTest} disabled={!answered}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#106EFB] to-[#0a52c3] text-white text-sm font-bold shadow-md disabled:opacity-40 transition-all">
                {t.finish} <CheckCircle2 className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Question dots */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-2">
            {questions.map((q, i) => (
              <button key={q.id} onClick={() => setCurrent(i)}
                className="h-2.5 w-2.5 rounded-full transition-all duration-200"
                style={{
                  background: i === current ? '#106EFB' : answers[q.id] !== undefined ? 'rgba(16,110,251,0.35)' : 'rgba(0,6,18,0.1)',
                  transform: i === current ? 'scale(1.4)' : 'scale(1)',
                }} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── RESULT ──
  return (
    <section className="min-h-screen pt-28 pb-20" style={{ background: 'var(--color-background)' }}>
      <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center gap-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="h-28 w-28 rounded-full flex items-center justify-center shadow-xl" style={{ background: levelColor[level] || '#106EFB', boxShadow: `0 20px 40px ${levelColor[level] || '#106EFB'}40` }}>
            <span className="text-white text-4xl font-black">{level}</span>
          </motion.div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: levelColor[level] }}>{t.yourLevel}</p>
            <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>{name}</h1>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(0,6,18,0.5)', maxWidth: 400 }}>{levelDescriptions[level]?.[lang]}</p>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>{score} {t.outOf} {total}</span>
            <span className="text-sm" style={{ color: 'rgba(0,6,18,0.4)' }}>({Math.round((score / total) * 100)}%)</span>
            <span className="text-sm" style={{ color: 'rgba(0,6,18,0.4)' }}>• {mins}:{secs.toString().padStart(2, '0')} {t.min}</span>
          </div>
        </motion.div>

        {/* Section breakdown */}
        <div className="grid grid-cols-3 gap-3">
          {sectionScores.map(s => (
            <div key={s.section} className="rounded-2xl border p-5 text-center" style={{ borderColor: 'rgba(0,6,18,0.06)' }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#106EFB' }}>{sectionLabels[s.section][lang]}</p>
              <p className="text-2xl font-black" style={{ color: 'var(--color-foreground)' }}>{s.correct}<span className="text-sm font-medium text-black/30">/{s.total}</span></p>
            </div>
          ))}
        </div>

        {/* Question review */}
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => {
            const isCorrect = answers[q.id] === q.correct
            return (
              <div key={q.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
                style={{ borderColor: 'rgba(0,6,18,0.05)', background: isCorrect ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)' }}>
                {isCorrect ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> : <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
                <span className="font-medium truncate" style={{ color: 'var(--color-foreground)' }}>{i + 1}. {q.question}</span>
                <span className="ml-auto shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.05)', color: 'rgba(0,6,18,0.4)' }}>{q.level}</span>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={printCert}
            className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#106EFB] to-[#0a52c3] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg">
            <Printer className="h-4 w-4" /> {t.print}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={retry}
            className="h-12 px-8 rounded-xl border font-bold text-sm flex items-center justify-center gap-2"
            style={{ borderColor: 'rgba(0,6,18,0.1)', color: 'var(--color-foreground)' }}>
            <RotateCcw className="h-4 w-4" /> {t.retry}
          </motion.button>
        </div>

        {/* Printable Certificate (hidden on screen, visible on print) */}
        <div className="print-certificate-container" style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div ref={certRef} className="print-certificate-content" style={{ width: 800, padding: 60, fontFamily: "'Inter', sans-serif", background: '#fff', position: 'relative', overflow: 'hidden' }}>
            {/* Border */}
            <div style={{ position: 'absolute', inset: 12, border: '3px solid #106EFB', borderRadius: 16, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(16,110,251,0.2)', borderRadius: 12, pointerEvents: 'none' }} />
            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: 30, left: 30, width: 60, height: 60, borderTop: '4px solid #106EFB', borderLeft: '4px solid #106EFB', borderRadius: '8px 0 0 0' }} />
            <div style={{ position: 'absolute', top: 30, right: 30, width: 60, height: 60, borderTop: '4px solid #106EFB', borderRight: '4px solid #106EFB', borderRadius: '0 8px 0 0' }} />
            <div style={{ position: 'absolute', bottom: 30, left: 30, width: 60, height: 60, borderBottom: '4px solid #106EFB', borderLeft: '4px solid #106EFB', borderRadius: '0 0 0 8px' }} />
            <div style={{ position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderBottom: '4px solid #106EFB', borderRight: '4px solid #106EFB', borderRadius: '0 0 8px 0' }} />

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <img src="/logo.svg" alt="Wegweiser" style={{ height: 50 }} />
              </div>
              <p style={{ fontSize: 11, letterSpacing: 6, color: '#106EFB', fontWeight: 700, textTransform: 'uppercase', marginBottom: 30 }}>WEGWEISER GERMAN LANGUAGE CENTER</p>
              <p style={{ fontSize: 13, letterSpacing: 8, color: '#999', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>{t.certificate}</p>
              <div style={{ width: 60, height: 3, background: '#106EFB', margin: '0 auto 30px' }} />
              <p style={{ fontSize: 32, fontWeight: 800, color: '#111', marginBottom: 8, letterSpacing: -1 }}>{name}</p>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 30, maxWidth: 400, margin: '0 auto 30px' }}>{t.certText}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderRadius: '50%', background: levelColor[level], marginBottom: 20 }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>{level}</span>
              </div>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>{levelDescriptions[level]?.[lang]}</p>
              <p style={{ fontSize: 13, color: '#aaa', marginBottom: 40 }}>{t.certScore}: {score}/{total} ({Math.round((score / total) * 100)}%)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '1px solid #eee' }}>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{t.certDate}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{new Date().toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: '#ccc' }}>wegweiser.uz</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ width: 120, borderBottom: '1px solid #ccc', marginBottom: 4 }} />
                  <p style={{ fontSize: 11, color: '#aaa' }}>Wegweiser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
