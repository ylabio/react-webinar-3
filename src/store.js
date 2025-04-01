/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [], // оставляем list как было
      cart: {}, // корзина будет хранить { [code]: quantity }
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

  notify() {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  // Добавление товара в корзину (новая версия)
  addToCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: (this.state.cart[code] || 0) + 1,
      },
    });
  }

  // Полное удаление товара из корзины (все количество)
  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  setState(newState) {
    this.state = newState;
    this.notify();
  }
}

export default Store;
