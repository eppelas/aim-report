import React, { useMemo, useState } from 'react';
import { useLanguage } from '../LanguageContext';

export type LeadInfo = {
  email?: string;
  telegram?: string;
};

const normalizeEmail = (v: string): string => v.trim().toLowerCase();
const normalizeTelegram = (v: string): string => {
  const t = v.trim();
  if (!t) return '';
  return t.startsWith('@') ? t : `@${t}`;
};

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidTelegram = (handle: string): boolean => {
  const t = handle.trim();
  if (!t) return false;
  const raw = t.startsWith('@') ? t.slice(1) : t;
  // Telegram usernames: 5–32 chars, letters/numbers/underscore (no spaces)
  return /^[a-zA-Z0-9_]{5,32}$/.test(raw);
};

type Props = {
  open: boolean;
  defaultEmail?: string;
  defaultTelegram?: string;
  passwordRequired?: boolean;
  expectedPassword?: string;
  passwordHint?: string;
  onCancel: () => void;
  onSubmit: (lead: LeadInfo) => Promise<void> | void;
};

export const LeadGateModal: React.FC<Props> = ({
  open,
  defaultEmail = '',
  defaultTelegram = '',
  passwordRequired = false,
  expectedPassword = '',
  passwordHint,
  onCancel,
  onSubmit,
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState(defaultEmail);
  const [telegram, setTelegram] = useState(defaultTelegram);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalized = useMemo(() => {
    const e = normalizeEmail(email);
    const tg = normalizeTelegram(telegram);
    return { email: e, telegram: tg };
  }, [email, telegram]);

  if (!open) return null;

  const submit = async (mode: 'download' | 'skip') => {
    setError(null);

    const hasEmail = !!normalized.email;
    const hasTelegram = !!normalized.telegram;

    // Password gate (optional): required for download/skip when configured.
    if (passwordRequired) {
      const pw = password.trim();
      const expected = expectedPassword.trim();
      if (!expected || pw !== expected) {
        setError('Password is required.');
        return;
      }
    }

    // Soft validation - show warning but still allow download
    if (hasEmail && !isValidEmail(normalized.email)) {
      setError('Email looks invalid. Example: name@domain.com');
      // Still allow download with invalid email for now (placeholder mode)
    }
    if (hasTelegram && !isValidTelegram(normalized.telegram)) {
      setError('Telegram username looks invalid. Example: @username');
      // Still allow download with invalid telegram for now (placeholder mode)
    }

    setIsSubmitting(true);
    try {
      if (mode === 'skip') {
        await onSubmit({});
      } else {
        await onSubmit({
          email: hasEmail ? normalized.email : undefined,
          telegram: hasTelegram ? normalized.telegram : undefined,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] no-print">
      <div className="absolute inset-0 bg-black/30" onClick={isSubmitting ? undefined : onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white shadow-2xl">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold tracking-tight text-black">{t.leadGateTitle}</h3>
                <p className="mt-1 text-xs font-mono text-neutral-500">
                  {t.leadGateSubtitle}
                </p>
              </div>
              <button
                className="rounded-md border border-neutral-200 px-2 py-1 text-xs font-mono text-neutral-600 hover:border-red-200 hover:text-red-600 disabled:opacity-50"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {t.cancel}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                  {t.enterEmail}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-mono text-neutral-800 outline-none focus:border-red-300"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                  {t.enterTelegram}
                </label>
                <input
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder={t.telegramPlaceholder}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-mono text-neutral-800 outline-none focus:border-red-300"
                  disabled={isSubmitting}
                />
              </div>

              {passwordRequired && (
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                    {t.password}
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm font-mono text-neutral-800 outline-none focus:border-red-300"
                    disabled={isSubmitting}
                  />
                  {passwordHint && (
                    <div className="text-[11px] font-mono text-neutral-400">
                      {passwordHint}
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-mono text-red-700">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => submit('download')}
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-mono text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {t.download}
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => submit('skip')}
                  disabled={isSubmitting}
                  className="text-xs font-mono text-neutral-400 hover:text-neutral-600 underline underline-offset-2"
                >
                  {t.skip} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


