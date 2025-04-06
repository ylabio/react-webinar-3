import React, { useContext, useState } from 'react';
import { LanguageContext } from './context';


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const setNewLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setNewLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};