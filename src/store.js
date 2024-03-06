/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.itemsInCart = new Set(); // Товары в корзине
    this.amount = 0;
    this.sum = 0;
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

  addItemInCart(code) {
    this.state.list.map(item => {
      if (item.code === code) {
        this.itemsInCart.add(item);
      }
    });
  }

  deleteItemInCart(code) {
    this.setState({
      ...this.state,
      itemsInCart: this.itemsInCart.forEach((item) => {
        if (item.code === code) {
          item.count = 0;
          this.itemsInCart.delete(item);
        }
      })
    });
  }

  calculateAmountItems() {
    this.amount = 0;
    this.sum = 0;
    this.state.list.map((item) => {
      if (item.count) {
        this.amount ++;
        this.sum += item.price * item.count;
      }
    });
    this.setState({
      ...this.state,
      amount: this.amount,
      sum: this.sum.toLocaleString()
    });
  }
}

export default Store;
