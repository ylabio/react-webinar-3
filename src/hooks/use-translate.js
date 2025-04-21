import { useEffect, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  // Получаем сервис i18n при помощи кастомного хука useService
  const { i18n } = useServices();

  // Создаем локальное состояние для текущего языка
  // Инициализируем его текущим значением из i18n сервиса
  const [lang, setLang] = useState(i18n.getLang());

  // Эффект для подписки на изменения языка
  useEffect(() => {
    // Обработчик изменения языка - обновляет локальное состояние
    const langChangeHandler = newLang => {
      setLang(newLang);
    };

    // Подписываемся на изменения языка в i18n сервисе
    i18n.subscribe(langChangeHandler);

    // Функция очистки эффекта - отписываемся от изменений при размонтировании
    return () => {
      i18n.unsubscribe(langChangeHandler);
    };
  }, [lang]);

  const t = (text, number) => i18n.translate(text, number, lang);

  return {
    lang,
    t,
    setLang: i18n.setLang.bind(i18n), // Метод для изменения языка, привязанный к контексту сервиса i18n
  };
}
