'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translations, Lang, TranslationKeys } from '@/i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKeys) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => translations.en[key] as string,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang | null;
    if (saved === 'en' || saved === 'ar') setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('portfolio-lang', l);
    const html = document.documentElement;
    html.setAttribute('lang', l);
    html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    // Swap body font for Arabic
    if (l === 'ar') {
      html.classList.add('lang-ar');
    } else {
      html.classList.remove('lang-ar');
    }
  }, []);

  useEffect(() => {
    // Apply persisted on mount
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (lang === 'ar') {
      html.classList.add('lang-ar');
    } else {
      html.classList.remove('lang-ar');
    }
  }, [lang]);

  const t = useCallback(
    (key: TranslationKeys): string => {
      const val = (translations[lang] as Record<string, unknown>)[key];
      if (typeof val === 'string') return val;
      // Fallback to English
      const en = (translations.en as Record<string, unknown>)[key];
      if (typeof en === 'string') return en;
      return String(key);
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
