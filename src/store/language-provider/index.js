import React, { createContext, useCallback, useContext, useMemo } from "react";
import useStore from "../use-store";
import useSelector from "../use-selector";
import { messages } from "../../messages";

const LanguageContext = createContext();

export default function LanguageProvider ({children}){
    const store = useStore()

    const {lang} = useSelector(state => ({
        lang: state.inter.lang,
      }));

    const localeMessage = useMemo( ()=> messages[lang], [lang]);
    
    const changeLang = useCallback(lang => store.actions.inter.changeLang(lang), [store]);
    
    const ctxValue ={
        localeMessage,
        changeLang,
        lang
    }
    
    return(
        <LanguageContext.Provider value={ctxValue}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useTranslation = () => useContext(LanguageContext);