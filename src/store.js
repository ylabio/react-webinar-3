
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
    }
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
   * Удаление товара по коду из корзины
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartItems: this.state.cartItems.filter(item => item.code !== code)
    })
  };

  /**
   * Добавление товара по коду в корзину
   */
  addCartItem(code) {
    const findItem = this.state.list.find(item => item.code === code);
    const cartItem = this.state.cartItems.find(item => item.code === code);
    if (!!findItem) {
      if (!cartItem) {
        this.setState({
          ...this.state,
          cartItems: this.state.cartItems.concat(findItem),
        });
      }
      return this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map(item => {
          if (item.code === code) {
            return {
              ...item,
              count: isNaN(item.count) ? 1 : item.count + 1,
            }
          }
          return item;
        }),
      });
    }
  }

  /**
   * Расчет суммы товара в корзине
   */
  setTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.cartItems.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0),
    });
  }

  /**
   * Расчет количества уникальных товаров в корзине
   */
  setTotalCount() {
    this.setState({
      ...this.state,
      totalCount: this.state.cartItems.length,
    });
  }
}

export default Store;
