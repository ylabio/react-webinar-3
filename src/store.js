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
   * Открытие/закрытие модалки
   */
  setModalState() {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    })
  }

  /**
   * Добавление в корзину
   * @param code
   */
  addToCart(code) {
    const cart = this.state.cart;
    const isInCart = cart.find(item => item.code === code);

    if (!isInCart) {
      const itemToCart = this.state.list.find(item => item.code === code);

      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...itemToCart, count: 1}],
      });
    } else {
        this.setState({
          ...this.state,
          cart: this.state.cart.map(item => {
            if (item.code === code) {
              return {
                ...item,
                count: item.count + 1,
              }
            } return item;
          }),
        });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    })
  }

}

export default Store;
