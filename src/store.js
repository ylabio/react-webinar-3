/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: [],
    },
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
   * @param code {Number} Код товара
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const cartItem = this.state.cart.find(item => item.code === code);

    let newCart;

    if (cartItem) {
      newCart = this.state.cart.map(cartItem =>
        cartItem.code === code ? { ...cartItem, count: cartItem.count + 1 } : cartItem
      );
    } else {
      newCart = [...this.state.cart, { code: item.code, title: item.title, price: item.price, count: 1 }];
    }

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

  /**
   * Удаление записи по коду из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    const newCart = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: newCart,
    });
  }

}

export default Store;
