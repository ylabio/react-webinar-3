import useStore from './use-store';
import { useLayoutEffect, useMemo, useState } from 'react';
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selector {Function}
 * @return {*}
 */
export default function useSelector(selector) {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  const unsubscribe = useMemo(() => {
    return store.subscribe(() => {
      const newState = selector(store.getState());
      setState(prevState => (shallowequal(prevState, newState) ? prevState : newState));
    });
  }, []);
  
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
