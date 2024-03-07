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
    }) 
    if (cartItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartItem) => {
          if (cartItem.code === code) {
            return {
              ...cartItem,
              count: cartItem.count + 1
            }
          }
          return cartItem;
        })
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, count: 1}],
        totalCount: this.state.totalCount + 1,
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
      totalCount: this.state.totalCount - 1,
      totalPrice: this.state.totalPrice - item.price * cartItem.count,
    })
  };
  
}

export default Store;
