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
  addItem(e) {
    e.stopPropagation();
    const maxCode = this.state.list.reduce((max, item) => Math.max(max, item.code), 0);
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: maxCode + 1, title: 'Новая запись', click: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, e) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  pluralization(count) {
    const digit = count % 10;
    const number = count % 100;

    if (number >= 12 && number <= 14) {
      return `${count} раз`;
    }

    if (digit >= 2 && digit <= 4) {
      return `${count} раза`;
    }

    return `${count} раз`;
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    const isCtrlPressed = e.ctrlKey || e.metaKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {      
        if (item.code === code) {
          if (!item.selected) {
            item.selected = true;
            item.click++;
          } else {
            item.selected = false;
          }
        } else if (!isCtrlPressed) {
          item.selected = false;
        }

        return item;
      }),
    });
  }
}

export default Store;