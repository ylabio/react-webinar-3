/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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

  addToCart(item) {
    const { code, price } = item
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: (this.state.cart[code] || 0) + 1
      },
      total: {
        price: this.state.total.price + price,
        count: !this.state.cart[code] ? this.state.total.count + 1 : this.state.total.count 
      }
    });
  }

  removeFromCart(item) {
    const { code, price, quantity } = item

    const spreadCart = {...this.state.cart}
    delete spreadCart[code]

    this.setState({
      ...this.state,
      cart: spreadCart,
      total: {
        count: !spreadCart[code] ? this.state.total.count - 1 : this.state.total.count,
        price: !spreadCart[code] ? this.state.total.price - price * quantity : this.state.total.price
      }
    });
  }
}

export default Store;
