import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: initState.cart || [],
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

  /**
   * Добавление товаров в корзину
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);

    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);

    let updatedCart;

    if (existingItem) {
      updatedCart = this.state.cart.map(cartItem =>
        cartItem.code === code ? { ...cartItem, count: cartItem.count + 1 } : cartItem,
      );
    } else {
      updatedCart = [...this.state.cart, { ...item, count: 1 }];
    }

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }

  /**
   * Удаление товара по коду
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
