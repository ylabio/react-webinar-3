import { useState, createContext, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState('ru');

    const changeLocale = (language) => {
        setLocale(language);
    }

    const value = {
        locale,
        changeLocale,
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export const
    useLocale = () => useContext(LanguageContext);