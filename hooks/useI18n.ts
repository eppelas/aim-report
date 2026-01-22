import { useState, useEffect } from 'react';

type TranslationKeys = {
  ui: {
    openFull: string;
    close: string;
    next: string;
    prev: string;
    showPreview: string;
    openLink: string;
  };
};

const cache: Record<string, TranslationKeys> = {};

export const useI18n = (lang: 'en' | 'ru' | 'by' | 'ro' = 'en') => {
  const [t, setT] = useState<TranslationKeys | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const effectiveLang = ['en', 'ru'].includes(lang) ? lang : 'en';
      
      if (cache[effectiveLang]) {
        setT(cache[effectiveLang]);
        return;
      }

      try {
        const basePath = import.meta.env.MODE === 'production' 
          ? (import.meta.env.BASE_URL || '/') 
          : '/';
        const response = await fetch(`${basePath}i18n/${effectiveLang}.json`);
        const data = await response.json();
        cache[effectiveLang] = data;
        setT(data);
      } catch (error) {
        console.warn(`Failed to load ${effectiveLang} translations, falling back to en`);
        if (effectiveLang !== 'en') {
          const basePath = import.meta.env.MODE === 'production' 
            ? (import.meta.env.BASE_URL || '/') 
            : '/';
          const fallbackResponse = await fetch(`${basePath}i18n/en.json`);
          const fallbackData = await fallbackResponse.json();
          cache['en'] = fallbackData;
          setT(fallbackData);
        }
      }
    };

    loadTranslations();
  }, [lang]);

  return t;
};
