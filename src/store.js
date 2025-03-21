/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.nextCode = Math.max(...initState.list.map(item => item.code), 0) + 1;

    if (initState.list) {
      initState.list.forEach(item => {
        if (!item.selectionCount) {
          item.selectionCount = 0;
        }
      });
    }
  }
  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
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
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */

  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.nextCode, title: 'Новая запись', selectionCount: 0 }],
    });
    this.nextCode++;
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
  selectItem(code) {
    this.setState({
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = true;
          item.selectionCount = (item.selectionCount || 0) + 1;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
  toggleItemSelection(code) {
    this.setState({
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectionCount = (item.selectionCount || 0) + 1;
          }
        }
        return item;
      }),
    });
  }
}

export default Store;

