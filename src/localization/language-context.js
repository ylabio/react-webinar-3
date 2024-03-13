import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? storedLanguage : 'ru';
  });

  const toggleLanguage = () => {
    setLanguage(prevLanguage => {
      const newLanguage = prevLanguage === 'ru' ? 'en' : 'ru';
      localStorage.setItem('language', newLanguage);
      return newLanguage;
    });
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};