import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {

  const [currentLanguage, setCurrentLanguage] = useState('ru');

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) => (prevLanguage === 'ru' ? 'en' : 'ru'));
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
