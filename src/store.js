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
    const itemInCart = this.state.cart.items.find(
      (cartItem) => cartItem.code === item.code
    );

    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: {
          items: this.state.cart.items.map((cartItem) => {
            if (cartItem.code === item.code) {
              return {
                ...cartItem,
                count: cartItem.count + 1,
              };
            }
            return cartItem;
          }),
          totalCount: this.state.cart.items.length + 1,
          totalPrice: this.state.cart.totalPrice + item.price,
        },
      });
    } else {
      this.setState({
        ...this.state,
        cart: {
          items: [...this.state.cart.items, { ...item, count: 1 }],
          totalCount: this.state.cart.items.length + 1,
          totalPrice: this.state.cart.totalPrice + item.price,
        },
      });
    }
  }

  removeFromCart(item) {
    this.setState({
      ...this.state,
      cart: {
        items: this.state.cart.items.filter((cartItem) => {
          return cartItem.code !== item.code;
        }),
        totalCount: this.state.cart.items.length - 1,
        totalPrice: this.state.cart.totalPrice - item.price,
      },
    });
  }
}

export default Store;
