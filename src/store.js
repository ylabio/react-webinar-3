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
   * @param code
   */
  addToCart(code) {
    const itemInCart = this.state.cartItems.find((item) => item.code === code);
    const itemToAdd = itemInCart
      ? {...itemInCart, amount: itemInCart.amount + 1}
      : {...this.state.list.find((item) => item.code === code), amount: 1}
    const newCartItems = itemInCart
    ? this.state.cartItems.map((item) => item.code === code ? itemToAdd : item)
    : [...this.state.cartItems, itemToAdd];

    this.setState({
      ...this.state,
      cartItems: newCartItems,
      cartCost: this.state.cartCost += itemToAdd.price,
      cartTotal: itemInCart ? this.state.cartTotal : this.state.cartTotal + 1,
    })
  };
  /**
  * Удаление товара из корзины
  * @param code
  */
  removeFromCart(code) {
    const {price, amount} = this.state.cartItems.find((item) => item.code === code);
    const newCartItems = this.state.cartItems.filter((item) => item.code !== code);
    const total = this.state.cartTotal - 1;
    const cost = this.state.cartCost - (price * amount)
    this.setState({
      ...this.state,
      cartItems: newCartItems,
      cartTotal: total,
      cartCost: cost,
    })
  };
}

export default Store;
