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
   */
  addItem(code) {
    const newList = this.state.list.map(item => {
        if (item.code === code) {
          return { ...item, score: item.score + 1 };
        }
        return item;
      })
     this.setState({
      ...this.state,
      list: newList,
      cart: newList.filter(item => item.score > 0)
    })
  }


  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.score = 0;
        }
        return item;
      })
    });
  }

getCartLength() {
  const length = this.state.cart.length;
  return length;
}

getCartSummary() {
  const sum = this.state.cart.reduce((total, item) => total + item.price * item.score, 0);
  return sum;
}


}

export default Store;
