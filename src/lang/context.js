import {createContext, useState, useEffect} from "react";
import {traductions} from './data';

export const LanguagesContext = createContext();

export function LanguagesProvider({children}) {
  const [lang, setLang] = useState('RU');
  const [data, setData] = useState(traductions[lang]);
    
  useEffect(() => {
    setData(traductions[lang]);
  }, [lang])
    
  return (
    <LanguagesContext.Provider value={{setLang, data}}>
      {children}
    </LanguagesContext.Provider>
  )
}