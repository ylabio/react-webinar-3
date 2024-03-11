// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
import translations from './locale/translation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState('ru');

  const tr = (key) => translations[language][key];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
