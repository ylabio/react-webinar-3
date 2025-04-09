import { createContext, useContext, useState } from 'react';
import { translation } from './translation';
import useSelector from '../store/use-selector';
import useStore from '../store/use-store';

// Создаем контекст
const LanguageContext = createContext();

// Провайдер контекста
export function LanguageProvider({ children }) {
  const select = useSelector(state => ({
    lang: state.catalog.lang,
  }));

  const value = {
    translation: translation[select.lang],
  };

  console.log(select.lang);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
