import { useCallback, useContext, useState, useMemo, useLayoutEffect } from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";

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

  const { multilang } = useServices();


  const [state, setState] = useState({
    lang: multilang.lang,
    t: multilang.t,
    setLang: multilang.setLang
  });

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return multilang.subscribe(() => {
      const newState = {
        lang: multilang.lang,
        t: multilang.t,
        setLang: multilang.setLang
      }
      setState(prevState => newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state
}

