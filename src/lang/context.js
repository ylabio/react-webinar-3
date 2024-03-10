import {createContext, useState, useEffect} from "react";
import datas from './data';

export const LanguagesContext = createContext();

export default function LanguagesProvider({children}) {
  const [ lang, setLang ] = useState(navigator.language.split('-')[1]);
  const [ data, setData ] = useState(datas[`${lang}`]);
    
  useEffect(() => {
    setData(datas[`${lang}`]);
  }, [lang])
    
  return (
    <LanguagesContext.Provider value={{setLang, data}}>
      {children}
    </LanguagesContext.Provider>
  )
}