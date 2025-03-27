import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cart: {} }; //Добавляем корзину
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
   * Добавление в корзину
   */
  addToCart(code) {
    const { cart, list } = this.state;
    if (!cart[code]) {
      const product = list.find(item => item.code === code);
      if (product) {
        cart[code] = { ...product, quantity: 1 };
      }
    } else {
      cart[code].quantity += 1;
    }
    this.setState({
      ...this.state,
      cart: { ...cart },
    });
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteFromCart(code) {
    const { cart } = this.state;
    delete cart[code];
    this.setState({ ...this.state, cart: { ...cart } });
  }

  getTotalItems() {
    return Object.values(this.state.cart).reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return Object.values(this.state.cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }
}

export default Store;
