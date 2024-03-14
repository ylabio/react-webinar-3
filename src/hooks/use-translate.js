import { useEffect } from "react";
import useStore from "../store/hooks/use-store";
import useSelector from "../store/hooks/use-selector";

export default function useTranslate() {
  const store = useStore();

  const select = useSelector((state) => ({
    defaultLocale: state.intl.defaultLocale,
    currentLocale: state.intl.currentLocale,
    resourse: state.intl.resourse,
    resourseIsLoading: state.intl.resourseIsLoading,
  }));

  useEffect(() => {
    const locale = select.defaultLocale;

    loadLang(locale);
  }, []);

  function translate(resourseKey) {
    if (!select.resourse) return;

    return select.resourse[resourseKey];
  }

  function loadLang(locale) {
    store.actions.intl.setCurrentLocale(locale);
    store.actions.intl.loadLocaleResourse(locale);
  }

  function constructOptionsByLocale(valueName) {
    let values;

    const locale = select.currentLocale || select.defaultLocale;

    switch (locale) {
      case "ru":
        values = [`${valueName}_one`, `${valueName}_few`, `${valueName}_many`];
        break;

      case "en":
        values = [`${valueName}_one`, `${valueName}_other`];
        break;
    }

    return values.reduce((obj, el) => {
      const objKey = el.split("_")[1];

      return { ...obj, [objKey]: translate(el) };
    }, {});
  }

  return {
    translate,
    constructOptionsByLocale,
    changeLang: loadLang,
    resourseIsLoading: select.resourseIsLoading,
    currentLocale: select.currentLocale,
    defaultLocale: select.defaultLocale,
  };
}
