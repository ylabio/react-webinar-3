import React, { useState } from "react";
import ru from "./lang/ru.json";
import en from "./lang/en.json";
import { plural } from "../utils";

/**
 * Контекст для Store
 * @type {React.Context<Store>}
 */
export const LangContext = React.createContext();

const dictionary = {
  en,
  ru,
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ru");

  function changeLanguage(lang) {
    setLang(lang);
  }

  function t(key, count = null) {
    if (count) {
      return plural(count, dictionary[lang][key], lang);
    }
    return dictionary[lang][key];
  }

  return (
    <LangContext.Provider value={{ changeLanguage, t, lang }}>
      {children}
    </LangContext.Provider>
  );
}
