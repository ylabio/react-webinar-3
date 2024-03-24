import { useEffect, useMemo, useState } from 'react';
import useServices from './use-services';
import shallowequal from 'shallowequal';

/**
 * Хук для выборки локали и отслеживания её изменения
 * @param selectorFunc {Function}
 * @return {*}
 */
export default function useTranslate(selectorFunc) {
  const i18n = useServices().i18n;

  const [state, setState] = useState(() => selectorFunc(i18n.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe(() => {
      const newState = selectorFunc(i18n.getState());
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка при демонтировании компонента
  useEffect(() => unsubscribe, [unsubscribe]);

  return {
    lang: state.lang,
    t: i18n.translate.bind(i18n),
    setLang: i18n.setLang.bind(i18n)
  };
}




/**
 * Хук возвращает объкат для локализации текстов
 */
export function useTranslate1() {
  return useServices().i18n;

  const i18n = useServices().i18n;

  const [lang, setLang] = useState(i18n.lang);

  return {
    lang,
    setLang: value => { setLang(value); i18n.setLang(value); },
    toggle: () => { const l = i18n.lang === 'ru' ? 'en' : 'ru'; setLang(l); i18n.setLang(l); },
    t: (text, plural, lang) => i18n.translate(text, plural, lang)
  };

  /*
  return useMemo(
    () => ({
      lang,
      setLang: value => { setLang(value); i18n.setLang(value); },
      t: (text, plural, lang) => i18n.translate(text, plural, lang)
    }),
    [lang]
  );
  */

  const t = useMemo(
    () => {
      return (text, plural, lang) => i18n.translate(text, plural, lang);
    },
    [lang]
  );

  return {
    lang,
    setLang: value => { setLang(value); i18n.setLang(value); },
    t
  }

  /*
  return {
    lang: useServices().i18n.lang,
    setLang: useServices().i18n.setLang,
    t: useServices().i18n.translate
  }
  */

  /*
  return {
    lang: useServices().i18n.lang,
    setLang: value => {}, //useServices().i18n.lang(value),
    t: (text, number, lang) => useServices().i18n.translate(text, number, lang)
  }*/
}

/*
import {useCallback, useContext} from 'react';
import {I18nContext} from '../i18n/context';
export default function useTranslate() {
  return useContext(I18nContext);
}
*/