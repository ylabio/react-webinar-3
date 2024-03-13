import React, { useState, createContext } from 'react'
import { dictionaryList } from '.'

export const LanguageContext = createContext({
  userLanguage: 'ru',
  dict: dictionaryList.ru
})

export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem('currentLanguage')
  const [userLanguage, setUserLanguage] = useState(defaultLanguage|| 'ru')

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
