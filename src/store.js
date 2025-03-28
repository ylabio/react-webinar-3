import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cart: {}};
    // this.cart = {};
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

  addToCart(code) {
    const item = this.state.list.find((item) => item.code === code);
    if (!item ) return;

    const existing = this.state.cart[code];

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: existing
          ? { ...existing, quantity: existing.quantity + 1 }
          : { ...item, quantity: 1 },
      },
    });
  }

  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];
  
    this.setState({
      ...this.state,
      cart: newCart,
    });
  }
  
}

export default Store;
