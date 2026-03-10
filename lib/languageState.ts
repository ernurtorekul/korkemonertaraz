'use client';

import { useState, useEffect } from 'react';
import type { Language } from '@/lib/translations';

// Global language state
let globalLanguage: Language = 'kk';
const languageListeners: Set<(lang: Language) => void> = new Set();

export function getLanguage(): Language {
  return globalLanguage;
}

export function setLanguage(lang: Language) {
  globalLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
  languageListeners.forEach(listener => listener(lang));
}

export function useLanguageState(): [Language, (lang: Language) => void] {
  // Always start with default 'kk' to prevent hydration mismatch
  const [language, setLanguageState] = useState<Language>('kk');
  const [initialized, setInitialized] = useState(false);

  // Initialize from localStorage on client side (each component independently)
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'kk' || saved === 'ru') {
        setLanguageState(saved);
      }
      setInitialized(true);
    }
  }, [initialized]);

  // Listen for language changes from other components
  useEffect(() => {
    const listener = (lang: Language) => {
      setLanguageState(lang);
    };
    languageListeners.add(listener);
    return () => {
      languageListeners.delete(listener);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    // The listener will handle state update
  };

  return [language, changeLanguage];
}
