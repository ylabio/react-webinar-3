

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: {},
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

  /**
   * Добавление новой записи
   */
  addToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: {
          ...item,
          quantity: (this.state.cart[code]?.quantity || 0) + 1,
        },
      },
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  removeFromCart(code) {
    const newCart = { ...this.state.cart };
    delete newCart[code];
    this.setState({
      ...this.state,
      cart: newCart,
    });
  }
}

export default Store;
