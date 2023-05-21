import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    //Добавляем всем товарам count = 0 для обозначения изначального количества товара в корзине
    this.state.list = this.state.list.map(item => ({...item, count: 0}));
    //Объявляем переменную итоговой цены товара в store (требование правки)
    this.state.totalPrice = 0;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление элемента в корзину
   * @param item
   */
  addCartItem(item) {
    //Инкрементируем количество добавленного товара в корзину
    this.setState({
      ...this.state,
      //Прибавляем к итоговой цене цену 1 единицы добавленного товара
      totalPrice: this.state.totalPrice + item.price,
      list: this.state.list.map(storeItem => {
        if (storeItem.code === item.code) {
          return {
            ...storeItem,
            count: storeItem.count + 1,
          };
        }
        return storeItem;
      }),
    })
    
  };

  /**
   * Удаление элемента из корзины
   * @param item
   */
  deleteCartItem(item) {
    this.setState({
      ...this.state,
      //Отнимаем от итоговой цены цену удаленного из корзины товара
      totalPrice: this.state.totalPrice - item.price * item.count,
      //При удалении элемента из корзины сбрасываем количество товара в корзине
      list: this.state.list.map(storeItem => {
        if (storeItem.code === item.code) {
          return {
            ...storeItem,
            count: 0,
          };
        }
        return storeItem;
      })
    })
  };
}

export default Store;
