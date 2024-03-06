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
   * Удаление записи по коду
   * @param code
   */
  addToCart(code) {
    const existingCartList = this.state.cartList || []

    const itemChosen = this.state.list[code - 1]

    this.setState({
      ...this.state,
      itemsCount: (this.state.itemsCount || 0) + 1,
      sum: +this.state.sum + +itemChosen.price || +itemChosen.price,
      cartList: [...existingCartList, itemChosen]
    })
  };

  deleteFromCart(code) {

    const itemChosen = this.state.list[code - 1]

    const findItemsToDelete = this.state.cartList.filter(e => e.code === code)
    const sumToRemove = itemChosen.price * findItemsToDelete.length


    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(e => e.code !== code),
      itemsCount: this.state.itemsCount - findItemsToDelete.length,
      sum: +this.state.sum - +sumToRemove
    })
  }
}

export default Store;
