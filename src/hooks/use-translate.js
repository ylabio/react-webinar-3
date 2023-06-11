import {useCallback, useContext, useEffect, useMemo, useState} from "react";
// import useStore from "../store/use-store";
// import useSelector from "../store/use-selector";
// import translate from "../i18n/translate";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  const [rerenderKey, setRerenderKey] = useState(0);

  const services = useServices();

  const rerenderCb = useCallback(() => {
    setRerenderKey(prev => prev + 1)
  }, [])

  useEffect(() => {
    const id = services.i18n.addSubscriber(rerenderCb);

    return () => {
      services.i18n.deleteSubscriber(id);
    }
  }, [])

  return useMemo(() => ({
    lang: services.i18n.lang,

    setLang(lang) {
      services.i18n.lang = lang;

    },

    t: services.i18n.translate

  }), [rerenderKey]);
}

