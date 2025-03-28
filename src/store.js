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
   * Удаление записи по коду
   * @param code
   */
  addItem(item) {
    if (this.getState().shoppingCart.find(arr => arr.code === item.code)) {
      this.setState({
        ...this.state,
        shoppingCart: this.getState().shoppingCart.map(obj => {
          item.code === obj.code ? ++obj.count : false;
          return obj;
        }),
      });
    } else {
      this.getState().shoppingCart.push({ ...item, count: 1 });
    }

    this.setState({
      ...this.state,
      sum: (this.state.sum += item.price),
      quantity: ++this.state.quantity,
    });
  }
  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }
  modalWindow() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    });
  }
  deleteItem(item) {
    this.setState({
      ...this.state,
      shoppingCart: this.state.shoppingCart.filter(el => {
        return el !== item;
      }),
      sum: this.state.sum - item.price * item.count,
      quantity: this.state.quantity - item.count,
    });
  }
}

export default Store;
