'use client';

import { useEffect, useState } from 'react';
import { Languages, X } from 'lucide-react';
import { getLanguagePromptStorageKey, useI18n } from '@/lib/i18n/I18nProvider';
import { localeLabels, locales } from '@/lib/i18n/translations';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isDismissed = window.localStorage.getItem(getLanguagePromptStorageKey()) === 'true';
    const timer = window.setTimeout(() => {
      setShowPrompt(!isDismissed);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const dismissPrompt = () => {
    window.localStorage.setItem(getLanguagePromptStorageKey(), 'true');
    setShowPrompt(false);
  };

  return (
    <div className="relative flex items-center">
      <div
        className="inline-flex h-10 items-center rounded-xl border border-orange-100 bg-orange-50/70 p-1 shadow-sm"
        aria-label={t('common.languageSwitch')}
      >
        <Languages size={16} className="mx-2 text-orange-700" aria-hidden="true" />
        {locales.map((item) => (
          <button
            key={item}
            type="button"
            className={`h-8 rounded-lg px-2.5 text-xs font-black transition-colors ${
              locale === item
                ? 'bg-white text-orange-700 shadow-sm'
                : 'text-slate-500 hover:text-orange-700'
            }`}
            aria-pressed={locale === item}
            onClick={() => {
              setLocale(item);
              dismissPrompt();
            }}
          >
            {localeLabels[item]}
          </button>
        ))}
      </div>

      {showPrompt && (
        <div className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-orange-100 bg-white p-4 text-left shadow-2xl shadow-orange-700/10">
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
            aria-label={t('common.close')}
            onClick={dismissPrompt}
          >
            <X size={15} />
          </button>
          <div className="pr-7">
            <p className="text-sm font-black text-slate-950">{t('languagePrompt.title')}</p>
            <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">
              {t('languagePrompt.body')}
            </p>
          </div>
          <button
            type="button"
            className="mt-4 rounded-lg bg-orange-50 px-3 py-2 text-xs font-black text-orange-700 transition-colors hover:bg-orange-100"
            onClick={dismissPrompt}
          >
            {t('languagePrompt.action')}
          </button>
        </div>
      )}
    </div>
  );
}
