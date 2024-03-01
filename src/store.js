/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = {};
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
   * @param code
   */
  addToCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: this.state.cart[code] ? this.state.cart[code] + 1 : 1
      }
    })
  };

  /**
  * Удаление товара из корзины
  * @param code
  */
  removeFromCart(code) {
    const newCart = {...this.state.cart};
    delete newCart[code];
    this.setState({
      ...this.state,
      cart: newCart
    })
  };
}


export default Store;
