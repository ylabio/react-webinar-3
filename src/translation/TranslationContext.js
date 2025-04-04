import { createContext, useState, useContext, useMemo } from 'react';
import { translations } from './translations';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const translate = key => {
    return translations[language]?.[key] || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translate,
    }),
    [language],
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};
