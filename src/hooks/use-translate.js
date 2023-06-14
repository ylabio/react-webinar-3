import {useEffect, useLayoutEffect,useCallback, useContext, useState, useMemo} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
// import {I18nContext} from "../i18n/context";
import useServices from "../hooks/use-services"

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
   const service = useServices();
   const [lang, setLang] = useState(service.i18n.lang);

   useEffect(() => {
    service.i18n.setLang(lang);
  }, [lang]);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return service.i18n.subscribe(() => {
      setLang(service.i18n.lang);
    });
  }, []); // Нет зависимостей - исполнится один раз

    // Отписка от store при демонтировании компонента
    useLayoutEffect(() => unsubscribe, [unsubscribe]);

    const t = useCallback(
      (text, number) => {
        return service.i18n.translate(text, lang, number)},
      [lang],
    );

  return {lang, setLang, t};
  // return useContext(I18nContext);
}
