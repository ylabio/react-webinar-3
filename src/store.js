class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.initSelectionCount();
    this.id = 8;
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

  initSelectionCount() {
    this.state.list.forEach(item => {
      if (!item.selectionCount) {
        item.selectionCount = 0;
      }
    });
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
    const newItemCode = this.id++;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newItemCode, title: 'Новая запись',selectionCount: 0 }]
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
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
  User
  
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (!item.selected) {
            item.selectionCount += 1;
          }
          item.selected = !item.selected;
        } else {
          // Снимаем выделение со всех остальных элементов
          item.selected = false;
        }
        return item;
      })
    });
  }
  
}

export default Store;