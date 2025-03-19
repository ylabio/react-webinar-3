/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map(item => ({ ...item, selectionCount: 0 })),
    };
    this.listeners = [];
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

  generateUniqueCode() {
    const maxCode = this.state.list.reduce((max, item) => Math.max(max, item.code), 0);
    return maxCode + 1;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateUniqueCode(); // Генерируем уникальный код
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
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
  selectItem(code, isMultiSelect) {
    this.setState({
      ...this.state,

      list: this.state.list.map(item => {
        if (item.code === code) {
          const newSelected = !item.selected;
          return {
            ...item,
            selected: newSelected,
            selectionCount: newSelected ? item.selectionCount + 1 : item.selectionCount,
          };
        }

        return isMultiSelect ? item : { ...item, selected: false };
      }),
    });
  }
}

export default Store;
