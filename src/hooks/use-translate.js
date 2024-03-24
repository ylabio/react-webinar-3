import { useEffect, useMemo, useState } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  useEffect(() => {
    const unsubscribe = i18n.subscribe(setLang);
    return unsubscribe;
  }, [i18n]);

  const t = useMemo(
    () => ({
      translate: (text, number) => i18n.t(lang, text, number),
    }),
    [lang]
  );

  return { lang, setLang: i18n.setLang, t: t.translate };
}
