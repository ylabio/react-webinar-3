import { useEffect, useMemo, useState } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLang);
    // отписка
    return unsubscribe;
  }, [i18n]);

  const translate = useMemo(
    () => ({
      t: (text, number) => i18n.translate(lang, text, number),
    }),
    [lang]
  );

  return { lang, setLang: i18n.setLang, t: translate.t };
}
