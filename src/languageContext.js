import React, { createContext, useState, useContext } from 'react';
import translation from './components/languageSwitch/translation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

  const [Language, setLanguage] = useState('ru');

  const tr = (key) => translation[Language][key];

  return (
    <LanguageContext.Provider value={{ Language, setLanguage, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};