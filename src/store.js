/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.id = 8; // Слушатели изменений состояния
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
   * Добавление новой записи
   */

addItem() {
  const newCode = this.id++;
  this.setState({
    ...this.state,
    list: [...this.state.list, { code: newCode, title: 'Новая запись' }]
  });
}

  /**
   * Удаление записи по коду
   * @param code
  //  */

  deleteItem(code) {
  const updatedList = this.state.list.filter(item => item.code !== code);
  this.setState({
    list: updatedList
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
        item.selectedCount = item.selected ? (item.selectedCount || 0) + 1 : (item.selectedCount || 0);
      } else {
        item.selected = false;
      }
      return item;
    })
  })
}
}

export default Store;