import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';
import { getFromLS, saveToLS } from '../utils';

// Создаём контекст
const LanguageContext = createContext({});
// Ключ для хранения языка в localstorage
const LOCALSTORAGE_KEY = 'language';

// Провайдер для i18n
export const LanguageProvider = ({ children }) => {
  // храним значение языка и инициализируем его значением из localstorage
  // или устанавливаем 'ru', если в localstorage значения по такому ключу не найдено
  const [language, setLanguage] = useState(getFromLS(LOCALSTORAGE_KEY) || 'ru');

  // Функция перевода
  // Достаем нужное значение из словаря по значению языка и ключу
  // Пример: translations['ru']['Shop'] - в словаре translations соответсвует значению 'Магазин'
  const t = key => translations[language][key] || key;

  // При изменении языка сохраняем в localStorage
  useEffect(() => {
    saveToLS(LOCALSTORAGE_KEY, language);
  }, [language]);

  //Создаем Provider - для доступа к контексту всем дочерним компонентам
  return (
    <LanguageContext.Provider value={{ t, setLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук useTranslation для простого доступа к кконтексту выбора языка
// возвращает объект { t, setLanguage, language }
//  t - функция для получения перевода
//  setLanguage - функция смены языка
//  language - текущий язык
export const useTranslation = () => {
  return useContext(LanguageContext);
};
