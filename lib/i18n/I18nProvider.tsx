'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  defaultLocale,
  Locale,
  locales,
  TranslationTree,
  translations,
} from './translations';

type TranslationValue = string | string[] | TranslationTree;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: <T = unknown>(key: string) => T[];
};

const STORAGE_KEY = 'reactchullin-locale';
const PROMPT_KEY = 'reactchullin-language-prompt-dismissed';

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }

  const language = window.navigator.language.toLowerCase();
  return language.startsWith('zh') ? 'zh-TW' : 'en';
}

function getValue(source: TranslationTree, key: string): TranslationValue | undefined {
  return key.split('.').reduce<TranslationValue | undefined>((current, segment) => {
    if (!current || typeof current === 'string' || Array.isArray(current)) {
      return undefined;
    }

    return current[segment] as TranslationValue | undefined;
  }, source);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(detectBrowserLocale());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : 'en';
  }, [isHydrated, locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = translations[locale] as TranslationTree;
    const fallback = translations[defaultLocale] as TranslationTree;

    return {
      locale,
      setLocale,
      t(key) {
        const value = getValue(dictionary, key) ?? getValue(fallback, key);
        return typeof value === 'string' ? value : key;
      },
      tArray<T = unknown>(key: string) {
        const value = getValue(dictionary, key) ?? getValue(fallback, key);
        return Array.isArray(value) ? (value as T[]) : [];
      },
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
}

export function getLanguagePromptStorageKey() {
  return PROMPT_KEY;
}
