import { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ru');

  const changeLanguage = lang => {
    setLanguage(lang);
  };

  function translate(key) {
    return translations[language][key] || key; // если нет перевода, возвращаем ключ
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}
