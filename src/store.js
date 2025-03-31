/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState,
      this.isVisible = false,
      this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   * 
   * 
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


  addItem(item) {
    const index = this.state.newlist.findIndex(newItem => newItem.code === item.code);
    if (index !== -1) {
      this.setState({
        ...this.state,
        newlist: [
          ...this.state.newlist.slice(0, index),
          { ...this.state.newlist[index], count: this.state.newlist[index].count + 1 },
          ...this.state.newlist.slice(index + 1),
        ],
      });
    } else {
      this.setState({
        ...this.state,
        newlist: [...this.state.newlist, { type: 'modalItem', code: item.code, title: item.title, price: item.price, count: 1 }],
      });
    }
  }

  getTotalPrice() {
    return this.state.newlist.reduce((total, item) => total + item.price * item.count, 0);
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      newlist: this.state.newlist.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */

  handleClose() {
    this.state.isVisible = false;
    this.notify();
  }

  handleOpen() {
    this.state.isVisible = true;
    this.notify();
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

}

export default Store;
