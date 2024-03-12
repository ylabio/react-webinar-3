import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru');
    const [translations, setTranslations] = useState({});

    const loadTranslations = async (lang) => {
        try {
            const response = await import(`../locales/${lang}.json`);
            setTranslations(response.default);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    const switchLanguage = () => {
        const newLanguage = language === 'en' ? 'ru' : 'en';
        setLanguage(newLanguage);
        loadTranslations(newLanguage);
    };

    useEffect(() => {
        loadTranslations(language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};
