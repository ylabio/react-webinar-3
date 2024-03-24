import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../i18n/context";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // const i18n = useServices().i18n;

  // const [lang, setLangState] = useState("ru");

  // // const setLang = useCallback(
  // //   (newLang) => {
  // //     i18n.setLang(newLang);
  // //     setLangState(newLang);
  // //   },
  // //   [i18n]
  // // );

  // useEffect(() => {
  //   if (i18n.locale !== lang) {
  //     console.log("use effect");
  //     i18n.setLang(lang);
  //     // setLangState(i18n.locale);
  //   }
  // }, [i18n, lang]);

  // const t = useCallback(
  //   (text, number) => {
  //     console.log("useCallback");
  //     return i18n.translate(lang, text, number);
  //   },
  //   [i18n, lang]
  // );

  // // const t = (text, number) => {
  // //   return i18n.translate(lang, text, number);
  // // };

  // const locale = useMemo(
  //   () => ({
  //     t: (text, number) => {
  //       console.log("t in hook");
  //       console.log(lang);
  //       return i18n.translate(lang, text, number);
  //     },
  //   }),
  //   [i18n, lang]
  // );

  // return {
  //   t: locale.t,
  //   lang: lang,
  //   setLang: setLangState,
  // };

  return useContext(I18nContext);
}
