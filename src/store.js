import { generateCode } from './utils';

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
    };
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
   * Удаление товара в корзину
   * @param code
   */

  addToCart(code) {
    const items = this.state.list.map(item => {
      if (item.code === code) {
        item.quantity = item.quantity ? (item.quantity += 1) : 1;
      }
      return item;
    });

    this.setState({
      ...this.state,
      cart: items.filter(item => item.quantity),
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const cart = this.state.cart.filter(item => item.code !== code);
    const list = this.state.list.map(item => {
      if (item.code === code) {
        item.quantity = 0;
      }
      return item;
    });

    this.setState({
      ...this.state,
      cart,
      list,
    });
  }
}

export default Store;
