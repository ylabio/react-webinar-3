import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      totalUnicItems: 0,
      totalPrice: 0,
    };
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

  calculateCart() {
    const totalUnicItems = this.state.cart.length;
    const totalPrice = this.state.cart.reduce((sum, item) => sum + item.count * item.price, 0);

    this.setState({
      ...this.state,
      totalUnicItems,
      totalPrice,
    });
  }

  addToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);

    const updatedCart = existingItem
      ? this.state.cart.map(cartItem =>
          cartItem.code === code
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        )
      : [...this.state.cart, { ...item, count: 1 }];

    this.setState({
      ...this.state,
      cart: updatedCart,
    });

    this.calculateCart();
  }

  removeFromCart(code) {
    const updatedCart = this.state.cart.filter(cartItem => cartItem.code !== code);

    this.setState({
      ...this.state,
      cart: updatedCart,
    });

    this.calculateCart();
  }
}

export default Store;
