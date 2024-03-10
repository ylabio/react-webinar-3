import React, { useState, createContext } from 'react'
import { languageOptions, dictionaryList } from '../languages'

export const LanguageContext = createContext({
  userLanguage: 'ru',
  dictionary: dictionaryList.ru
})

export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem('currentLanguage')
  const [userLanguage, setUserLanguage] = useState(defaultLanguage)

  const provider = {
    userLanguage,
    dict: dictionaryList[userLanguage],
    userLanguageChange: (lang) => {
      setUserLanguage(lang)
      window.localStorage.setItem('currentLanguage', lang)
    }
  }

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  )
}
