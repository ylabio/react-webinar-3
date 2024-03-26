import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from './use-services';
import shallowEqual from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices()
  
  const [state, setState] = useState(services.i18n.getCurrentLanguage())
  
  const unsubscribe = useMemo(() => {
    return services.i18n.subscribe(() => {
      const newState = services.i18n.getCurrentLanguage()
      setState(prev => shallowEqual(prev, newState) ? prev : newState)
    })
  }, [])
  
  useEffect(() => unsubscribe, [unsubscribe])
  
  const i18n = useMemo(() => ({
    lang: state,
    t: (text, number) => services.i18n.translate(state, text, number),
    setLang: (langCode) => services.i18n.setLanguage(langCode)
  }), [state])
  
  return i18n
}
