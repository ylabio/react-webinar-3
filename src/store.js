/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, list: initState.list.map(e => ({ ...e, count: 0 })) };
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
    console.log(this.state);
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  /**
   * Изменение стейта ctrlIsActive
   */
  setCtrlIsActive(newState) {
    this.setState({
      ...this.state,
      ctrlIsActive: newState,
    });
  }
  /**
   * Изменение стейта ctrlIsActive
   */
  setIdQueueIncrement() {
    this.setState({
      ...this.state,
      idQueue: this.state.idQueue === 0 ? this.state.list.length : this.state.idQueue + 1,
    });
  }
  /**
   * Добавление новой записи
   */
  addItem() {
    this.setIdQueueIncrement();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.idQueue, title: 'Новая запись', count: 0 }],
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
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (this.state.ctrlIsActive) {
          if (item.code === code) {
            item.selected = !item.selected;
            item.selected && (item.count += 1);
          }
        } else {
          if (item.code === code) {
            item.selected = !item.selected;
            item.selected && (item.count += 1);
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
