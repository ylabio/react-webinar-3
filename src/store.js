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
   * @param code
   */
  addItem(code) {
    let priceToAdd = 0;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          priceToAdd = item.price;

          return {
            ...item,
            cartCount: (item.cartCount || 0) + 1,
          };
        }

        return item;
      }),
      totalPrice: (this.state.totalPrice || 0) + priceToAdd,
      totalCartCount: (this.state.totalCartCount || 0) + 1,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    let itemPrice = 0;
    let itemCount = 0;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          itemPrice = item.price;
          itemCount = item.cartCount;

          return {
            ...item,
            cartCount: 0,
          };
        }

        return item;
      }),
      totalPrice: this.state.totalPrice - itemPrice * itemCount,
      totalCartCount: this.state.totalCartCount - itemCount,
    });
  }

  getCartItems() {
    return this.state.list.filter(item => item.cartCount > 0);
  }
}

export default Store;
