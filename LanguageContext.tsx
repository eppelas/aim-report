import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Language, UI_STRINGS, loadLanguage, saveLanguage } from './i18n';

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof UI_STRINGS['en'];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    return loadLanguage();
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    saveLanguage(newLang);
  }, []);

  // Persist on mount (in case browser detection changed default)
  useEffect(() => {
    saveLanguage(lang);
  }, [lang]);

  const t = useMemo(() => UI_STRINGS[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
