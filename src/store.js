/**
 * Хранилище состояния приложения
 */
class Store {
  selectedItems = [];
  newCode = 1;
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
    this.newCode = this.state.list[this.state.list.length - 1].code + 1; 
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


  addTimes(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${number} раз`;
    }
  
    if (lastDigit === 1) {
      return `${number} раз`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${number} раза`;
    } else {
      return `${number} раз`;
    }
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.newCode, title: 'Новая запись' }],
    });
    this.newCode++;
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
  if (item.code === code) {
    item.selected = !item.selected;
    if (item.selected) {
      keyPush ? this.selectedItems.push(code) : this.selectedItems = [code];;
      item.selectedTimes = (item.selectedTimes || 0) + 1;
    } else {
      keyPush ? this.selectedItems = this.selectedItems.filter(selectedCode => selectedCode !== code) : this.selectedItems = [];
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
