import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  // Try to load preferred language from localStorage, defaults to English
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('safeher_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('safeher_lang', language);
  }, [language]);

  // Translation helper function
  // Usage: t('home.heroTitle')
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if translation is missing in current language
        let enFallback = translations['en'];
        for (const enKey of keys) {
          if (enFallback && enFallback[enKey] !== undefined) {
            enFallback = enFallback[enKey];
          } else {
            return path; // Return the path string itself if not found anywhere
          }
        }
        return enFallback;
      }
    }
    
    return current;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
