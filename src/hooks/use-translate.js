import {useEffect, useMemo, useState} from 'react';
import shallowequal from 'shallowequal';
import useI18n from './use-i18n';


export default function useTranslate() {
  const i18n = useI18n();

  const [lang, setState] = useState(() => i18n.getLang());

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(() => {
      const newLang = i18n.getLang();
      setState(prevLang => shallowequal(prevLang, newLang) ? prevLang : newLang);
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return useMemo(() => ({
    lang: i18n.lang,
    setLang: (lang) => i18n.setLang(lang),
    t: (text, number, lang) => i18n.translate(text, number, lang)
  }), [lang]);
}
