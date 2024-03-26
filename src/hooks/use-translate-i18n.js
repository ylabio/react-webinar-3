import {useEffect, useMemo, useState} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslateI18n() {

  const i18nServices = useServices().i18n;

  const [lang, setLang] = useState(i18nServices.getLang());

  // Подписка с возвратом функции для отписки
  const unsubscribe = i18nServices.subscribe((value) => {
    setLang(value);
  })

  const i18n = useMemo(() => ({
   
    // Код локали
    langTranslate: i18nServices.getLang(),

    // Функция для смены локали
    setLangTranslate: function (lang) {
      setLang(lang);
      i18nServices.setLang(lang);
    },

    // Функция для локализации текстов
    translate: (text, number) => i18nServices.translate(text, number)

  }), [lang]);

  // Отписка
  useEffect(() => unsubscribe, [unsubscribe]);

  return (
    i18n
  );

}