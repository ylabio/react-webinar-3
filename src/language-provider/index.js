import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const LANGUAGE_STORAGE_KEY = 'app_language';

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage || 'ru';
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
  };  

  const loadTranslations = async () => {
    const translationFile = await import(`../locales/${language}/translation.json`);
    return translationFile.default;
  };

  const [translations, setTranslations] = useState({});
  useEffect(() => {
    loadTranslations().then(setTranslations);
  }, [language]);

  const t = (key) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
