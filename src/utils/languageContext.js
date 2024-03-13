import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('appLang') || 'ru');
    useEffect(() => {
        localStorage.setItem('appLang', lang);
    }, [lang]);
    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ru' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};