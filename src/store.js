/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list,
      cart: {},
      itemsCount: 0,
      totalPrice: 0,
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
   * Добавление товара в корзину
   */
  addItem(id, name, price) {
    const newCart = {...this.state.cart};
    if (!newCart[id]) {
      newCart[id] = { id, name, price, count: 1 };
    } else {
      newCart[id] = {
        ...newCart[id],
        count: newCart[id].count + 1,
      };
    }
    this.setState({
      ...this.state,
      cart: newCart,
      totalPrice: this.state.totalPrice + price,
      itemsCount: Object.keys(newCart).length,
    });
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(id) {
    const newCart = {...this.state.cart};
    if (!newCart[id]) return;
    
    const item = newCart[id];
    const newItemsCount = this.state.itemsCount - 1;
    const newTotalPrice = this.state.totalPrice - (item.price * item.count);
    
    delete newCart[id];
    
    this.setState({
      ...this.state,
      cart: newCart,
      itemsCount: newItemsCount,
      totalPrice: newTotalPrice
    });
  }

  getItemsCount() {
    return this.state.itemsCount
  }

  getTotalPrice() {
    return this.state.totalPrice
  }

  getCart() {
    return this.state.cart
  }
}

export default Store;
