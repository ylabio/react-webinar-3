import { getNewItem } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Добавление товара
   * @param code {number} Идентификатор товара
   */
  addItem(code) {
     if (!this.state.cart) {
      this.setState({
        ...this.state,
        cart: [getNewItem(this.state.list, code)]
      })
      return;
    }

    const existingItem = this.state.cart.find(item => item.code === code);

    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => (item.code === code)
          ? {...item, amount: item.amount + 1} 
          : item
        )
      })
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart, 
          getNewItem(this.state.list, code)
        ]
      })
    }
  };

  /**
   * Удаление товара
   * @param code {number} Идентификатор товара
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;
