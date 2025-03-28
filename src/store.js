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
   * Добавление новой записи
   * @param {number} code
   */
  addToCart(code) {
    const product = this.state.cart.find(item => item.code === code);

    if (!product) {
      const product = this.state.list.find(item => item.code === code);
      return this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1 }],
      });
    }

    const cart = this.state.cart.map(item => {
      if (item.code === code) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return this.setState({ ...this.state, cart });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
