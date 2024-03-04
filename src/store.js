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
   */
  addToCart(code) {
    const item = this.state.list.find((item) => item.code === code);
    const cartItem = this.state.cart.find((item) => item.code === code);
    this.setState({
      ...this.state,
      totalPrice: this.state.totalPrice + item.price,
      totalCount: this.state.totalCount + 1,
    }) 
    if (cartItem) {
      cartItem.count++;
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, title: item.title, price: item.price, count: 1}],
      })
    }
  };

  /**
   * Удаление товаров из корзины
   * @param code
   */
  deleteFromCart(code) {
    const item = this.state.list.find((item) => item.code === code);
    const cartItem = this.state.cart.find((item) => item.code === code);
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalCount: this.state.totalCount - cartItem.count,
      totalPrice: this.state.totalPrice - item.price * cartItem.count,
    })
  };
  
}

export default Store;
