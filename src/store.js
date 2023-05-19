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
      cart: this.addToCartHandler(this.state.list.find((listItem) => listItem.code === code), this.state.cart)
    })
  };

  /** Ф-я удаления товара из корзины по коду товара
   * @param item {Object}
   * @param cart {Array}
   * @returns {Array}
   */
  deleteFromCartHandler(item, cart) {
    const index = cart.findIndex((cartItem) => cartItem.code === item.code)
    // кол-во товара > 1
    if (cart[index].count > 1) {
      cart[index].count = cart[index].count - 1
      return cart
    }
    // если последний
    cart.splice(index, 1);
    return cart
  }

  /** Удаление записи по коду
   * @param code {number}
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.deleteFromCartHandler(this.state.list.find((listItem) => listItem.code === code), this.state.cart)
    })
  };

}

export default Store;
