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

  addItemToCart(code) {
    const currentItem = this.state.list.find(item => item.code === code);
    if (!this.state.cartList.find(item => item.code === currentItem.code)) {
      currentItem.addCount = 1;
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, currentItem]
      });
    } else {
      const newState = structuredClone(this.state);
      const currentItemIndex = newState.cartList.findIndex(item => item.code === code);
      newState.cartList[currentItemIndex].addCount++;
      this.setState(newState);
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(item => item.code !== code)
    })
  };

}

export default Store;
