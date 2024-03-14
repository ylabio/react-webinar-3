import {createContext, useState, useEffect} from "react";
import { traductions } from "../../language";

export const LanguagesContext = createContext();

export function LanguagesProvider({children}) {
  const [lang, setLang] = useState(localStorage.getItem('lang_param') || 'RU');
  const [langData, setLangData] = useState(traductions[lang]);

  useEffect(() => {
    setLangData(traductions[lang]);
  }, [lang])

  return (
    <LanguagesContext.Provider value={{setLang, langData}}>
      {children}
    </LanguagesContext.Provider>
  )
}