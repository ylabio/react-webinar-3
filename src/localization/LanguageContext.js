import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem("language");
    return storedLanguage || "ru"; // Установка языка по умолчанию, если он не был сохранён ранее
  });

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem("language", language); // Сохранение выбранного языка в localStorage
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
