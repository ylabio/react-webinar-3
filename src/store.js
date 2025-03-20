/**
 * Хранилище состояния приложения
 */
class Store {
  selectedItems = [];
  code = 1;
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.code = this.state.list[this.state.list.length - 1].code; 
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
  getSelectedItems() {
    return this.selectedItems;
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
    const newCode = this.code + 1;
    console.log('newCode', newCode);
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
    });
    this.code = newCode;
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
  selectItem(code, keyPush) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (keyPush) {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              this.selectedItems.push(code);
              item.selectedTimes > 0 ? (item.selectedTimes += 1) : (item.selectedTimes = 1);
              console.log('1', this.selectedItems);
            } else {
              this.selectedItems = this.selectedItems.filter(selectedCode => selectedCode !== code);
            }
          }
        } else {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              this.selectedItems = [code];
              item.selectedTimes > 0 ? (item.selectedTimes += 1) : (item.selectedTimes = 1);
              console.log('2', item.selectedTimes);
            } else {
              this.selectedItems = [];
            }
          } else {
            item.selected = false;
          }
        }
        return item;
      }),
    });
  }
}

export default Store;
