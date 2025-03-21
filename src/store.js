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
   * Добавление новой записи
   */
  addItem() {
    const lastEl = this.state.list[this.state.list.length - 1];
    const code = lastEl.code + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: code, title: 'Новая запись', count: 0 }],
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
  selectItem(e, code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          this.checkCount(item);
          item.selected = !item.selected;
        }
        if (item.code !== code && item.selected && !e.ctrlKey) {
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }

  checkCount(item) {
    if (!item.selected) {
      item.count += 1;
    };
  }

  getCount(number, var1, var2) {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return var1;
    }
    number %= 10;
    if (number === 1) {
      return var1;
    }
    if (number >= 2 && number <= 4) {
      return var2;
    }
    return var1;
  }
}

export default Store;
