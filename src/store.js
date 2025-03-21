/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      selectedItems: []
    };
    this.listeners = [];// Слушатели изменений состояния
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
   * Добавление новой записи
   */

  addItem(newCode) {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, count: 0,title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    if (event.ctrlKey || event.metaKey) {
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            item.selected = !item.selected;
          }
          return item;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        list: this.state.list.map(item => {
          if (item.code === code) {
            item.selected = !item.selected;
          } else {
            item.selected = false;
          }
          return item;
        }),
      });
    }
  }

  getSelectedItems() {
    return this.state.selectedItems;
  }

  setSelectedItems(item) {
    this.state.selectedItems = item;
  }
}

export default Store;
