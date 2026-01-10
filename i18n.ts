export type Language = 'en' | 'ru' | 'by';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  ru: 'RU',
  by: 'BY',
};

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
  by: 'Беларуская',
};

// UI strings that appear in the app chrome (not slide content)
export const UI_STRINGS: Record<Language, {
  contents: string;
  sources: string;
  deckPdf: string;
  slidePdf: string;
  downloadDeckPdf: string;
  downloadSlidePdf: string;
  exportingPdf: string;
  pdfExportFailed: string;
  joinTelegram: string;
  shortcuts: string;
  tip: string;
  source: string;
  askAimPassword: string;
  enterEmail: string;
  enterTelegram: string;
  download: string;
  skip: string;
  cancel: string;
  password: string;
  emailPlaceholder: string;
  telegramPlaceholder: string;
  passwordPlaceholder: string;
  leadGateTitle: string;
  leadGateSubtitle: string;
}> = {
  en: {
    contents: 'Contents',
    sources: 'Sources',
    deckPdf: 'Deck PDF',
    slidePdf: 'Slide PDF',
    downloadDeckPdf: 'Download deck PDF',
    downloadSlidePdf: 'Download slide PDF',
    exportingPdf: 'Exporting PDF',
    pdfExportFailed: 'PDF export failed (fallback opened print dialog).',
    joinTelegram: 'Join Telegram',
    shortcuts: 'Shortcuts: ← → navigate, T menu, S sources, P deck PDF, Shift+P slide PDF',
    tip: 'Tip: export runs in-browser. If it fails, we fall back to the print dialog.',
    source: 'Source',
    askAimPassword: 'Ask AIM for the download password.',
    enterEmail: 'Email (optional)',
    enterTelegram: 'Telegram (optional)',
    download: 'Download',
    skip: 'Skip',
    cancel: 'Cancel',
    password: 'Password',
    emailPlaceholder: 'your@email.com',
    telegramPlaceholder: '@username',
    passwordPlaceholder: 'Enter password',
    leadGateTitle: 'Get the report',
    leadGateSubtitle: 'Leave your contact to receive updates (optional)',
  },
  ru: {
    contents: 'Содержание',
    sources: 'Источники',
    deckPdf: 'Скачать всё',
    slidePdf: 'Скачать слайд',
    downloadDeckPdf: 'Скачать всю презентацию',
    downloadSlidePdf: 'Скачать текущий слайд',
    exportingPdf: 'Экспорт PDF',
    pdfExportFailed: 'Ошибка экспорта (открыт диалог печати).',
    joinTelegram: 'Telegram',
    shortcuts: 'Клавиши: ← → навигация, T меню, S источники, P скачать всё, Shift+P слайд',
    tip: 'Экспорт выполняется в браузере. При ошибке откроется диалог печати.',
    source: 'Источник',
    askAimPassword: 'Запросите пароль у AIM.',
    enterEmail: 'Email (необязательно)',
    enterTelegram: 'Telegram (необязательно)',
    download: 'Скачать',
    skip: 'Пропустить',
    cancel: 'Отмена',
    password: 'Пароль',
    emailPlaceholder: 'your@email.com',
    telegramPlaceholder: '@username',
    passwordPlaceholder: 'Введите пароль',
    leadGateTitle: 'Получить отчёт',
    leadGateSubtitle: 'Оставьте контакт для обновлений (необязательно)',
  },
  by: {
    contents: 'Змест',
    sources: 'Крыніцы',
    deckPdf: 'Спампаваць усё',
    slidePdf: 'Спампаваць слайд',
    downloadDeckPdf: 'Спампаваць усю прэзентацыю',
    downloadSlidePdf: 'Спампаваць бягучы слайд',
    exportingPdf: 'Экспарт PDF',
    pdfExportFailed: 'Памылка экспарту (адкрыты дыялог друку).',
    joinTelegram: 'Telegram',
    shortcuts: 'Клавішы: ← → навігацыя, T меню, S крыніцы, P спампаваць усё, Shift+P слайд',
    tip: 'Экспарт выконваецца ў браўзеры. Пры памылцы адкрыецца дыялог друку.',
    source: 'Крыніца',
    askAimPassword: 'Запытайце пароль у AIM.',
    enterEmail: 'Email (неабавязкова)',
    enterTelegram: 'Telegram (неабавязкова)',
    download: 'Спампаваць',
    skip: 'Прапусціць',
    cancel: 'Адмена',
    password: 'Пароль',
    emailPlaceholder: 'your@email.com',
    telegramPlaceholder: '@username',
    passwordPlaceholder: 'Увядзіце пароль',
    leadGateTitle: 'Атрымаць справаздачу',
    leadGateSubtitle: 'Пакіньце кантакт для абнаўленняў (неабавязкова)',
  },
};

// Helper to get language from localStorage
const LANG_STORAGE_KEY = 'aim_annual_report_2025_lang';

export const loadLanguage = (): Language => {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY);
    if (raw && (raw === 'en' || raw === 'ru' || raw === 'by')) {
      return raw;
    }
    // Default based on browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ru')) return 'ru';
    if (browserLang.startsWith('be')) return 'by';
    return 'en';
  } catch {
    return 'en';
  }
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // no-op
  }
};
