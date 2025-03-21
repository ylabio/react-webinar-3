/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: (initState.list || []).map(item => ({
        ...item,
        selectionCount: item.selectionCount || 0,
      })),
    };
    this.listeners = []; // Слушатели изменений состояния
    this.currentMaxCode = Math.max(...initState.list.map(item => item.code), 0);
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
    this.currentMaxCode += 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, {
        code: this.currentMaxCode,
        title: 'Новая запись',
        selectionCount: 0, }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const updatedList = this.state.list.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      list: updatedList,
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
          item.selected = !item.selected;
          if (item.selected) {
            item.selectionCount += 1;
          }
        } else if (!isMultiSelect) {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
