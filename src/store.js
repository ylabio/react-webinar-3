import { getTotalCost } from './utils';

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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
   * Добавление товара в корзину
   * @param code
   */
  addCartItem(code) {
    const itemCodeCb = (item) => item.code === code;
    const listItem = this.state.list.find(itemCodeCb);
    const cartItem = this.state.cart.find(itemCodeCb);

    const cart = cartItem
      ? this.state.cart.map((item) =>
          item.code === cartItem.code
            ? { ...cartItem, count: cartItem.count + 1 }
            : item
        )
      : [...this.state.cart, { ...listItem, count: 1 }];

    this.setState({
      ...this.state,
      cart,
      count: cart.length,
      sum: getTotalCost(cart),
    });
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteCartItem(code) {
    const cart = this.state.cart.filter((item) => item.code !== code);

    this.setState({
      ...this.state,
      cart,
      count: cart.length,
      sum: getTotalCost(cart),
    });
  }
}

export default Store;
