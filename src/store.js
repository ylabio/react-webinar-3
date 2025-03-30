import { generateCode, getTotalCartPrice } from './utils';

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
    const cartItem = this.state.cart.find(item => item.code === code);

    if (cartItem) {
      const cart = this.state.cart.map(item => {
        if (item.code === code) {
          return {
            ...item,
            quantity: (item.quantity += 1),
          };
        }
        return item;
      });

      this.setState({
        ...this.state,
        cartTotalPrice: getTotalCartPrice(cart),
        cart,
      });
    } else {
      const listItem = this.state.list.find(item => item.code === code);
      const cart = [...this.state.cart, { ...listItem, quantity: 1 }];

      this.setState({
        ...this.state,
        cartItemsCount: (this.state.cartItemsCount += 1),
        cartTotalPrice: getTotalCartPrice(cart),
        cart,
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const cart = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cartItemsCount: (this.state.cartItemsCount -= 1),
      cartTotalPrice: getTotalCartPrice(cart),
      cart,
    });
  }
}

export default Store;
