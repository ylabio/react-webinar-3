/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cartItems: [],
      cartTotal: 0,
      uniqueItemsCount: 0,
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

  /**
   * Добавление продукта в корзину
   * @param code
   */
  addToCart(code) {
    const isItemInCart = this.state.cartItems.find(cartItem => cartItem.code === code);

    if (isItemInCart) {
      this.state.cartItems = this.state.cartItems.map(cartItem =>
        cartItem.code === code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      );
    } else {
      const isItemInShop = this.state.list.find(item => item.code === code);
      if (isItemInShop) {
        this.state.cartItems = [...this.state.cartItems, { ...isItemInShop, quantity: 1 }];
      }
    }

    this.setState({ ...this.state, cartItems: [...this.state.cartItems] });
    this.getCartTotal();
  }

  removeFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: [...this.state.cartItems.filter(item => item.code !== code)],
    });

    this.getCartTotal();
  }

  /**
   * Рассчет общей суммы
   */
  getCartTotal() {
    const cartTotal = this.state.cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString('ru-RU');
    const uniqueItemsCount = this.state.cartItems.length;

    this.setState({
      ...this.state,
      cartTotal,
      uniqueItemsCount,
    });
  }
}

export default Store;
