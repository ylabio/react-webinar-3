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

  /** Ф-я добавления товара в корзину по коду товара
   * @param item {Object}
   * @param cart {Array}
   * @returns {Array}
   */
  addToCartHandler(item, cart) {
    // товар есть в корзине
    if (cart.some((cartItem) => cartItem.code === item.code)) {
      const index = cart.findIndex((cartItem) => cartItem.code === item.code)
      cart[index].count = cart[index].count + 1
      return cart
    }
    // товара нет в корзине
    return [...cart, {...item, count: 1}]
  }

  /** Добавление товара в корзину по коду
   * @param code {number}
   */
  addItem(code) {
    this.setState({
      ...this.state,
      cart: this.addToCartHandler(this.state.list.find((listItem) => listItem.code === code), this.state.cart),
      totalCount: ++ this.state.totalCount,
      totalPrice: this.state.totalPrice + parseInt(this.state.list.find((item) => item.code === code).price, 10)
    })
  };

  /** Удаление записи по коду
   * @param code {number}
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalCount: this.state.totalCount - this.state.cart.find((item) => item.code === code).count,
      totalPrice: this.state.totalPrice - (this.state.cart.find((item) => item.code === code).price * this.state.cart.find((item) => item.code === code).count)
    })
  };

}

export default Store;
