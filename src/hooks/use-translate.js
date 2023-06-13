import { useEffect, useMemo, useState } from "react";
import useServices from "./use-services";

export default function useTranslate() {
  const service = useServices();
  const [lang, setLang] = useState(service.I18n.lang);

  useEffect(() => {
    service.I18n.subscribe((lang) => setLang(lang));;
  }, []);

  const i18n = useMemo(() => ({
    lang,
    setLang: (lang) => service.I18n.setLang(lang),
    t: (text, number) => service.I18n.translate({ text, plural: number }),
  }), [lang]);

  return i18n;
}