import { createContext, useState } from "react";


export const LanguageContext = createContext()

export function LanguageProvider (props) { 
    const [ ln, setLanguage ] = useState("ru")

    const switchLanguage = (e) => {
        setLanguage(e.target.value)
    }

    return (
        <LanguageContext.Provider value={{ln, switchLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider;