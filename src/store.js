class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cartItems: [],
      itemCount: 0,
      totalPrice: 0,
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
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
    for (const listener of this.listeners) listener();
  }

  addItem(code) {
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        return {
          ...item,
          quantity: (item.quantity || 0) + 1,
        };
      }
      return item;
    });

    this.updateCartState(updatedList);
  }

  removeItem(code) {
    const updatedList = this.state.list.map(item => {
      if (item.code === code) {
        return {
          ...item,
          quantity: 0,
        };
      }
      return item;
    });

    this.updateCartState(updatedList);
  }

  updateCartState(updatedList) {
    const cartItems = updatedList.filter(item => item.quantity > 0);
    const itemCount = cartItems.length;
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      list: updatedList,
      cartItems,
      itemCount,
      totalPrice,
    });
  }
}

export default Store;
