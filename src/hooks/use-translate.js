import {useMemo, useState, useEffect} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // Получаем ссылку на инстанс сервиса
  const {i18n} = useServices();

  // Создаем useState для отслеживаемого хранения текущей локали
  const [lang, setLang] = useState(i18n.lang);

  // Сохраняем текущий язык в localStorage
  localStorage.setItem('lang', lang);

  // Отписка и подписка на смену локали
  const unsubscribe = useMemo(() => {
    i18n.subscribe((newLang) => {
      setLang(newLang);
    })
  }, [])

  // Отслеживаем реакцию смены локали
  useEffect(() => {
    unsubscribe;
    i18n.setLang(lang);
  }, [unsubscribe, lang]);

  return useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang: (lang) => i18n.setLang(lang),
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number, lang) => i18n.translate(lang, text, number),
  }), [lang])
}