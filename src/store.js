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
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: Math.max(...this.state.list.map(lists => lists.code)) + 1, title: 'Новая запись', clicks: 0, selected: false }],
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

  selectItem(code, isCtrlPressed) {
    let updatedList = this.state.list.map(item => {
      if (isCtrlPressed) {
        // Если Ctrl зажата
        if (item.code === code) {
          return { ...item, selected: !item.selected };
        }
        return item;
      } else {
        // Если Ctrl не зажата
        if (item.code === code) {
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      }
    });

    this.setState({
      ...this.state,
      list: updatedList,
    });
  }

  // Локальная функция для подсчета кликов на запись
  clickOnRow(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return { ...item, clicks: item.clicks + 1 };
        }
        return item;
      })
    });
  }
}

export default Store;

