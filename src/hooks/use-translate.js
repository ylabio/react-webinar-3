import {useEffect, useMemo, useState} from 'react';
import useServices from './use-services';
import shallowEqual from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n
  
  const [state, setState] = useState(i18nService.getCurrentLanguage())
  
  const unsubscribe = useMemo(() => {
    return i18nService.subscribe(() => {
      const newState = i18nService.getCurrentLanguage()
      setState(prev => shallowEqual(prev, newState) ? prev : newState)
    })
  }, [])
  
  useEffect(() => unsubscribe, [unsubscribe])
  
  const i18n = useMemo(() => ({
    lang: state,
    setLang: (langCode) => i18nService.setLanguage(langCode),
    t: (text, number) => i18nService.translate(state, text, number),
  }), [state])
  
  return i18n
}
