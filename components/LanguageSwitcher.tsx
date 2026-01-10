import React from 'react';
import { Language, LANGUAGE_LABELS } from '../i18n';
import { useLanguage } from '../LanguageContext';

const LANGS: Language[] = ['en', 'ru', 'by'];

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-neutral-200 bg-white/90 backdrop-blur overflow-hidden">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
            lang === l
              ? 'bg-red-600 text-white'
              : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
          }`}
        >
          {LANGUAGE_LABELS[l]}
        </button>
      ))}
    </div>
  );
};
