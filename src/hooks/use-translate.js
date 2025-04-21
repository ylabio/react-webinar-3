import { useState, useEffect, useMemo } from 'react';
import useServices from './use-services'

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n
  const [lang, setLang] = useState(i18n.getLang())

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe(newLang => {
      setLang(newLang)
    })
  }, [])

  useEffect(() => unsubscribe, [unsubscribe])

  const i18nServ = useMemo(
      () => ({
        // Код локали
        lang,
        // Функция для смены локали
        setLang: (lang) => i18n.setLang(lang),
        // Функция для локализации текстов с замыканием на код языка
        t: (text, number) => i18n.translate(text, number),
      }),
      [lang],
    );


  return i18nServ
}
