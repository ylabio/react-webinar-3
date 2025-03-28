
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
  addItem(item) {
    const itemIndex = this.state.cart.findIndex(cartItem => cartItem.code === item.code);

    if (itemIndex) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }],
      });
    } else {
      const newCart = [...this.state.cart];
      newCart[itemIndex] = { ...newCart[itemIndex], quantity: newCart[itemIndex].quantity + 1 };
      this.setState({ ...this.state, cart: newCart });
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(cartItem => cartItem.code !== item.code),
    });
  }

  /**
   * Переключение состояния модального окна
   */
  clickModal() {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen,
    });
  }
}

export default Store;
