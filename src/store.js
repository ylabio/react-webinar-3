import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = [];
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
   * Добавление новой записи
   * @param item {Object}
   * @returns {Object}
   */
  addItemToCart(item) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === item.code);
    if (existingItem) {
      const updatedCart = this.state.cart.map(cartItem => {
        if (cartItem.code === item.code) {
          return { code: cartItem.code, count: cartItem.count + 1 };
        }
        return cartItem;
      });
      this.setState({
        ...this.state,
        cart: updatedCart
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { code: item.code, count: 1 }]
      });
    }
  }
  /**
   * Удаление записи по коду
   * @param item {Object}
   * @returns {Object}
   */
  deleteItemFromCart(item) {
    const updatedCart = this.state.cart.filter(cartItem => cartItem.code !== item.code);
    this.setState({
      ...this.state,
      cart: updatedCart
    });
  }

    /**
   * Получение итоговой суммы корзины 
   * @returns {Number}
   */
  getCartAmount() {
    let totalAmount = 0;
    for (const cartItem of this.state.cart) {
      const item = this.state.list.find(item => item.code === cartItem.code);
      if (item) {
        totalAmount += item.price * cartItem.count;
      }
    }
    return totalAmount;
  }

  /**
   * Получение количества уникальных товаров
   * @returns {Number}
   */
  getCartQuantity() {
    return this.state.cart.length;
  }
}

export default Store;
