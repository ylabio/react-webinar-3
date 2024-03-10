import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');
  const [localization, setLocalization] = useState({});

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const loadTranslations = async () => {
    const translationFile = await import(`../localization/${language}/local.json`);
    return translationFile.default;
  };

  useEffect(() => {
      loadTranslations().then(setLocalization);
  }, [language]);

  const wordsTranslate = (key) => {
    return localization[key];
  };

  return (
    <LanguageContext.Provider value={{ language, wordsTranslate, changeLanguage,  }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;