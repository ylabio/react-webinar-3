/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = [];
    this.nextCode = Math.max(...initialState.list.map(item => item.code)) + 1;
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */

  getState() {
    return this.state;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */

  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * уведомление слушателей на изменение состояния
   *
   */
  notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Добавление новой записи
   */

  addItem() {
    const newItem = {
      code: this.nextCode++,
      title: 'Новый элемент',
      selected: false,
      selectionCount: 0,
    };
    this.state.list.push(newItem);
    this.notify();
  }

  deleteItem(code) {
    this.state.list = this.state.list.filter(item => item.code !== code);
    this.notify();
  }

  selectItem(code, isCtrlPressed) {
    this.state.list = this.state.list.map(item => {
      if (item.code === code) {
        if (!isCtrlPressed) {
          this.state.list.forEach(i => {
            if (i.code !== code) i.selected = false;
          });
        }
        item.selected = !item.selected;
        if (item.selected) {
          item.selectionCount = (item.selectionCount || 0) + 1;
        }
      }
      return item;
    });
    this.notify();
  }
}

export default Store;
