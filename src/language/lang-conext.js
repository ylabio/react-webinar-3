import React, { useContext, useState } from 'react';
import { translate } from '../utils';

export const LangContext = React.createContext({
  lang:'',
  switchLang:()=>{}
});

export function LangProvider({children}){
  const [lang, setLang]= useState("ru");
  const provider = {
    lang,
    changeLang: newLang=> setLang(newLang)
  }
  return <LangContext.Provider value={provider}>
    {children}
  </LangContext.Provider>
}

export function useTranslate(){
  const {lang}= useContext(LangContext);
  return function(path) {return translate(path, lang)}
}