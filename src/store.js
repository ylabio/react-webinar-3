import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: initState.cart || [],
      cartTotalCount: 0, // общее количество всех штук
      cartTotalPrice: 0, // общая сумма всех товаров
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
    if (!item) return;

    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);

    let updatedCart;

    if (existingItem) {
      updatedCart = this.state.cart.map(cartItem =>
        cartItem.code === code ? { ...cartItem, count: cartItem.count + 1 } : cartItem,
      );
    } else {
      updatedCart = [...this.state.cart, { ...item, count: 1 }];
    }

    const cartTotalCount = updatedCart.length;
    const cartTotalPrice = updatedCart.reduce((sum, i) => sum + i.price * i.count, 0);

    this.setState({
      ...this.state,
      cart: updatedCart,
      cartTotalCount,
      cartTotalPrice,
    });
  }

  /**
   * Удаление товара по коду
   * @param code
   */
  removeItemFromCart(code) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);
    if (!existingItem) return;

    const updatedCart = this.state.cart.filter(cartItem => cartItem.code !== code);

    const cartTotalCount = updatedCart.length;
    const cartTotalPrice = updatedCart.reduce((sum, i) => sum + i.price * i.count, 0);

    this.setState({
      ...this.state,
      cart: updatedCart,
      cartTotalCount,
      cartTotalPrice,
    });
  }
}

export default Store;
