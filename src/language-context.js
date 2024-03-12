import React, { createContext, useContext, useState } from 'react';
import translations from './translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const translate = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = () => {
    setLanguage(prevLanguage => prevLanguage === 'ru' ? 'en' : 'ru');
  };

  return (
    <LanguageContext.Provider value={{ language, translate, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
