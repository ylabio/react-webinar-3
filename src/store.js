/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cart: {
        items: [],
        isOpen: false,
        totalCount: 0,
        totalAmount: 0
      },
      ...initState
    };
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
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  calculateCartTotals(items) {
    return {
      totalCount: items.length,
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
  }

  updateCart(items) {
    const { totalCount, totalAmount } = this.calculateCartTotals(items);
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items,
        totalCount,
        totalAmount
      }
    });
  }

  addToCart(item) {
    const existingItem = this.state.cart.items.find(i => i.code === item.code);
    let newItems;

    if (existingItem) {
      newItems = this.state.cart.items.map(i =>
        i.code === item.code
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newItems = [...this.state.cart.items, { ...item, quantity: 1 }];
    }

    this.updateCart(newItems);
  }

  removeFromCart(code) {
    const newItems = this.state.cart.items.filter(item => item.code !== code);
    this.updateCart(newItems);
  }

  toggleCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpen: !this.state.cart.isOpen
      }
    });
  }
}

export default Store;
