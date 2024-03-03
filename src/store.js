import {generateCode} from "./utils";

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
   * Добавление товара в корзину
   * @param code
   */

  addItemToCart(code) {
    const itemToAdd = this.state.list.find(item => item.code === code);

    if (!itemToAdd) return;

    const existingCartItem = this.state.cart.find(item => item.code === code);

    const updatedCart = existingCartItem
      ? this.state.cart.map(item => (item.code === code ? { ...item, quantity: item.quantity + 1 } : item))
      : [...this.state.cart, { ...itemToAdd, quantity: 1 }];

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }

  /**
   * Удалям товар из корзины
   * @param code
   */

  removeItemFromCart(code) {
    const updatedCart = this.state.cart.filter(item => item.code !== code);

    if (updatedCart.length === this.state.cart.length) return;

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }

}

export default Store;
