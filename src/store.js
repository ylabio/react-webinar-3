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
      this.listeners = this.listeners.filter((item) => item !== listener);
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

  setCartItems(items) {
    this.setState({
      ...this.state,
      cart: {
        items,
        total: items.length,
        sum: items.reduce((sum, item) => sum + item.price * item.count, 0),
      },
    });
  }

  addItemToCart(code) {
    const index = this.state.cart.items.findIndex((item) => item.code === code);
    let items;

    if (index === -1) {
      items = [
        ...this.state.cart.items,
        { ...this.state.list.find((item) => item.code === code), count: 1 },
      ];
    } else {
      items = [...this.state.cart.items];
      items[index] = { ...items[index], count: items[index].count + 1 };
    }

    this.setCartItems(items);
  }

  removeItemFromCart(code) {
    const index = this.state.cart.items.findIndex((item) => item.code === code);
    const items = [...this.state.cart.items];
    items.splice(index, 1);

    this.setCartItems(items);
  }
}

export default Store;
