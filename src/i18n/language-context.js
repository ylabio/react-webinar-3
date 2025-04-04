import React, { createContext, useContext, useState } from 'react';
import {translations} from "./translations";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ t, setLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => {
  return useContext(LanguageContext);
}
