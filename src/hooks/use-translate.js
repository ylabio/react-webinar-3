import {useCallback, useContext, useEffect, useState} from 'react';
import {I18nContext} from '../i18n/context';
import I18NService from '../i18n';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const [lang, setLang] = useState(i18n.lang)

  const t = (text, plural) => i18n.translate(text, plural)

  useEffect(() => {
    function onLangChange(lang){
      setLang(lang)
    }

    const unsubscribe = i18n.subscribe(onLangChange);
    return () => {
      unsubscribe();
    }
  }, [lang])

  return {t, lang, setLang: i18n.setLang};
}
// export default function useTranslate() {
//   const i18n = useServices().i18n;
//   useEffect(() => {
//     console.log(i18n);
//   }, [i18n])
//   return useContext(I18nContext);
// }
