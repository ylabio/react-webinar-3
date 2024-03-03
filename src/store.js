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

  addToCart(item) {
    const { items, totalPrice } = this.state.cart;
    const itemInCart = items.find((cartItem) => cartItem.code === item.code);

    if (itemInCart) {
      const updatedItems = items.map((cartItem) =>
        cartItem.code === item.code
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      );
      this.setState({
        ...this.state,
        cart: {
          items: updatedItems,
          totalPrice: totalPrice + item.price,
        },
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          items: [...items, { ...item, count: 1 }],
          totalPrice: totalPrice + item.price,
        },
      });
    }
  }

  removeFromCart(item) {
    this.setState({
      ...this.state,
      cart: {
        items: this.state.cart.items.filter(
          (cartItem) => cartItem.code !== item.code
        ),
        totalPrice: this.state.cart.totalPrice - item.price * item.count,
      },
    });
  }
}

export default Store;
