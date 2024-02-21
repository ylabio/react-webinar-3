/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState
    };
    this.lastId = this.state.list[this.state.list.length - 1].code;
    this.listeners = []; // Слушатели изменений состояния
  }

  // Генерация уникального идентификатора
  generateId() {
    this.lastId += 1;
    return this.lastId;
  }

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
    const newItem = {
      code: this.generateId(),
      title: 'Новая запись',
      selectedCount: 0
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });
  }

  // Удаление записи по коду
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  getSelectedCount(code) {
    return this.state.list.find(item => item.code === code).selectedCount

  }

  // Выделение записи по коду
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectedCount += 1;
          }
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;