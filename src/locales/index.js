import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from "prop-types";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('locale') || 'ru');

  useEffect(() => {
    const loadTranslations = async () => {
      const translationsJson = await import(`./${currentLanguage}.json`);
      setTranslations(translationsJson.default);
    };

    loadTranslations();
  }, [currentLanguage]);

  const t = useCallback((key) => {
    if (!translations) {
      return key;
    }

    return translations[key] || key;
  }, [translations]);

  const changeLanguage = useCallback((language) => {
    setCurrentLanguage(language);
    localStorage.setItem('locale', language);
  }, [])

  const i18n = useMemo(() => {
    return {
      currentLanguage,
      changeLanguage
    }
  }, [currentLanguage])

  return (
    <TranslationContext.Provider value={{ t, i18n }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);

TranslationProvider.propTypes = {
  children: PropTypes.node
}
