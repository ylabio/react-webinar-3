import React, {useContext, useEffect, useState} from 'react';
import {LanguageContext} from "../contexts";
import rus from '../locales/rus.locale.json';
import eng from '../locales/eng.locale.json';

export function useLanguage() {
  const {language, setLanguage} = useContext(LanguageContext)
  const [translation, setTranslation] = useState(null)

  function switchLanguage() {
    setLanguage(prevState => prevState === "rus" ? "eng" : "rus")
  }

  function t(key) {
    if (translation) {
      return translation[key]
    }
  }

  useEffect(() => {
    const json = language === "rus" ? rus : eng

    setTranslation(json)
  }, [language]);

  return {language, t, switchLanguage}
}