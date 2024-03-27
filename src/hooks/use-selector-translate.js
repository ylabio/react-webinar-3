import {useEffect, useMemo, useState} from 'react';
import shallowequal from 'shallowequal';
import useStoreTranslate from './use-store-translate';

export function useSelectorTranslate(selectorFunc) {
  const store = useStoreTranslate();

  const [state, setState] = useState(() => selectorFunc(store.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = selectorFunc(store.getState());
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
