/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      maxCode: Math.max(...(initState.list?.map(item => item.code) || [0])),
    };
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
    const newCode = this.state.maxCode + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      maxCode: newCode,
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
   * @param event {MouseEvent} Событие клика
   */
  selectItem(code, event) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (item.selected) {
            return { ...item, selected: false };
          } 
          if (event.ctrlKey || event.metaKey) {
            return { ...item, selected: true, selectionCount: (item.selectionCount || 0) + 1 };
          }
          return { ...item, selected: true, selectionCount: (item.selectionCount || 0) + 1};
        }
        return event.ctrlKey || event.metaKey ? item : { ...item, selected: false };
      }),
    });
  }
}

export default Store;
