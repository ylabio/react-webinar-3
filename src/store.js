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

  addToCart(code) {
    const itemToAdd = this.state.list.find(item => item.code === code)
    const itemInCart = this.state.cart.find(item => item.code === code)

    const newCart = itemInCart
      ? this.state.cart.map(item => item.code === code ? { ...item, amount: item.amount + 1 } : item)
      : [...this.state.cart, { ...itemToAdd, amount: 1 }]

    this.setState({
      ...this.state,
      cart: newCart
    })
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  }
}

export default Store;
