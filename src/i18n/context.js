import { createContext, useEffect, useMemo, useState } from "react";
import translate from "./translate";
import useStore from "../hooks/use-store";

/**
 * @type {React.Context<{}>}
 */
export const I18nContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function I18nProvider({ children }) {
  const urlParams = new URLSearchParams(window.location.search);

  const store = useStore();

  const [lang, setLang] = useState(urlParams.get("lang") || "ru");

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => translate(lang, text, number),
    }),
    [lang, urlParams]
  );

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
