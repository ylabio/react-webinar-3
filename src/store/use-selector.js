import useStore from "./use-store";
import {useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selector {Function}
 * @return {*}
 */
export default function useSelector(selector) {
  //Функция selector принимает state
  const store = useStore();//Используем нашу функцию для взятия StoreContext

  const [state, setState] = useState(() => selector(store.getState()));//Заносим новую функцию в переменную state

  const unsubscribe = useMemo(() => {//переменная для отписки слушателя
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = selector(store.getState());//новая переменная с новым состоянием store
      setState((prevState) => shallowequal(prevState, newState) ? prevState : newState);//Изменяем переменную state которая есть функция
              //данная запись имеет двойную функцию(матрёшку)
                            //сравнием две переменные на эдентичность, если эдентичны, то возвразаем
                                                                //старое состояние,
                                                                      //если нет, то возвращаем
                                                                            //новое состояние
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);//заносим функцию отписки слушателя при изменения расположения слоя

  return state;//useSelector отдаёт переменную state
}
