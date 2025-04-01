/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: [],
      cartSummary: {
        totalCount: 0,
        totalPrice: 0,
      },
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

    let itemAdded = false;

    const newCart = this.state.cart.map(cartItem => {
      if (cartItem.code === code) {
        itemAdded = true;
        return { ...cartItem, count: cartItem.count + 1 };
      }
      return cartItem;
    });

    if (!itemAdded) {
      newCart.push({ code: item.code, title: item.title, price: item.price, count: 1 });
    }

    this.setState({
      ...this.state,
      cart: newCart,
      cartSummary: {
        totalCount: this.state.cartSummary.totalCount + (itemAdded ? 0 : 1),
        totalPrice: this.state.cartSummary.totalPrice + item.price,
      },
    });
  }

  /**
   * Удаление записи по коду из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    const deletedItem = this.state.cart.find(item => item.code === code);
    if (!deletedItem) return;

    const newCart = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: newCart,
      cartSummary: {
        totalCount: this.state.cartSummary.totalCount - 1,
        totalPrice: this.state.cartSummary.totalPrice - deletedItem.price * deletedItem.count,
      },
    });
  }

}

export default Store;
