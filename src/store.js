
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

  addToCart(item) {
    item.countInCart ++;
    const cartItems = [...this.state.cart.items, item]

    this.setState({
      ...this.state,
      cart: {
        items: cartItems,
        totalSumm: this.getTotalSumm(cartItems),
        itemsCount: (new Set(cartItems)).size,
      },
    })
  };

  removeFromCart(item) {
    item.countInCart = 0;
    const cartItems = this.state.cart.items.filter(element => element.code !== item.code);

    this.setState({
      ...this.state,
      cart: {
        items: cartItems,
        totalSumm: this.getTotalSumm(cartItems),
        itemsCount: (new Set(cartItems)).size,
      }
    })
  }

  getTotalSumm(cartItems){
    let totalSumm = 0;
    if(cartItems) {
      totalSumm = cartItems.reduce((summ, item) => +item.price + summ, 0);
    }
    return totalSumm;
  }
}

export default Store;
