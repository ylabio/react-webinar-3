/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = [];
    this.total = {amount: 0, cost: 0}
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
  calculateTotal() {
    const uniqueCodes = [];
    const {cart, list} = this.state
    return cart.reduce((prev, code) => {
      if(!uniqueCodes.includes(code)) {
        uniqueCodes.push(code);
        prev.amount++
      }
      prev.cost += code * list[code].price
      return prev;
    },{amount: 0, cost: 0});
  }
  /**
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {
    const newCart = [...this.state.cart, code];
    this.setState({
      ...this.state,
      cart: newCart,
      total: this.calculateTotal(newCart),
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
