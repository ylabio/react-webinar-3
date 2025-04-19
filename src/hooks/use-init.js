import { useEffect } from 'react';
import useTranslate from '../hooks/use-translate';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 * @param initFunc {Function} Пользовательская функция
 * @param depends {Array} Значения при смене которых callback снова исполнится.
 * @param options {{backForward: boolean, watchLanguage: boolean}} Опции хука
 */
export default function useInit(initFunc, depends = [], options = {}) {
  const { backForward = false, watchLanguage = false } = options;
  const { onLanguageChange } = useTranslate();

  useEffect(() => {
    // Выполняем инициализацию при монтировании или изменении depends
    initFunc(false);

    let unsubscribeLanguageChange = () => {};
    if (watchLanguage) {
      unsubscribeLanguageChange = onLanguageChange(() => initFunc(true));
    }

    // Если в истории браузера меняются только search-параметры, то react-router не оповестит
    // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
    // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
    if (backForward) {
      window.addEventListener('popstate', initFunc);
    }

    return () => {

      if (backForward) {
        window.removeEventListener('popstate', initFunc);
      }

      unsubscribeLanguageChange();
    };
  }, [JSON.stringify(depends), backForward, watchLanguage]);
}
