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
   * Добавление товара в корзину
   * @param item
   */
  addToCart(item) {
    const itemIndex = this.state.cart.findIndex(cartItem => cartItem.code === item.code);

    if (itemIndex === -1) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }],
      });
    } else {
      const newCart = [...this.state.cart];
      newCart[itemIndex] = { ...newCart[itemIndex], quantity: newCart[itemIndex].quantity + 1 };
      this.setState({ ...this.state, cart: newCart });
    }

    this.updateCartSummary();
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  removeFromCart(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(cartItem => cartItem.code !== item.code),
    });

    this.updateCartSummary();
  }

  /**
   * Обновление суммарной информации о корзине
   */
  updateCartSummary() {
    const totalUniqueItems = this.state.cart.length;
    const totalPrice = this.state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    this.setState({
      ...this.state,
      totalUniqueItems,
      totalPrice,
    });
  }

  /**
   * Переключение состояния модального окна
   * @param type {string|null} Тип модалки (например, 'cart') или null для закрытия
   */
  toggleModal(type = null) {
    this.setState({
      ...this.state,
      modalType: type,
    });
  }
}

export default Store;
