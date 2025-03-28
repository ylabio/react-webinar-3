import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cart: {
        items: [],
        isOpen: false
      },
      ...initState
    };
    this.listeners = [];
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

  addToCart(item) {
    const existingItem = this.state.cart.items.find(cartItem => cartItem.code === item.code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: existingItem
          ? this.state.cart.items.map(cartItem =>
              cartItem.code === item.code
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          : [...this.state.cart.items, { ...item, quantity: 1 }]
      }
    });
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: this.state.cart.items.filter(item => item.code !== code)
      }
    });
  }

  toggleCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpen: !this.state.cart.isOpen
      }
    });
  }
}

export default Store;
