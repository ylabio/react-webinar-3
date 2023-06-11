// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";

import { useEffect, useMemo, useState } from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // const store = useStore();
  // // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  // // Функция для смены локали
  // const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // // Функция для локализации текстов
  // const t = useCallback((text, number) => translate(lang, text, number), [lang]);
  //
  // return {lang, setLang, t};

  const i = useServices().I18n;
  const [lang, setLang] = useState(i.lang);

	useEffect(() => {
    const unsub = i.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  return useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang: (l) => i.setLang(l),
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i.translate({text, plural: number}),
    }),
    [lang]
  );
}
