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

  notify() {
    this.listeners.forEach(listener => listener());
  }
  /**
   * Удаление товара из корзины
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({
      ...this.state, // Сохраняем текущее состояние
      cart: this.state.cart.filter(item => item.code !== code),
    });
    this.notify();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const updatedCart = this.state.cart.some(cartItem => cartItem.code === code)
      ? this.state.cart.map(cartItem =>
          cartItem.code === code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      : [
          ...this.state.cart,
          {
            code,
            title: item.title,
            quantity: 1,
            price: this.state.list.find(item => item.code === code).price,
          },
        ];
    this.setState({
      ...this.state,
      cart: updatedCart,
    });
    this.notify();
  }
}

export default Store;
