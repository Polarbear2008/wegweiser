import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Lang } from './languages'
import { LANGUAGES } from './languages'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  availableLangs: Lang[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  const raw = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null
  if (raw && LANGUAGES.includes(raw as Lang)) return raw as Lang
  return 'UZ'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem('lang', next)
    } catch {
      // Ignore storage failures (private mode, blocked cookies, etc.)
    }
  }

  // Keep in sync if other tabs update localStorage.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'lang' || !e.newValue) return
      if (LANGUAGES.includes(e.newValue as Lang)) setLangState(e.newValue as Lang)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, availableLangs: LANGUAGES }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}

