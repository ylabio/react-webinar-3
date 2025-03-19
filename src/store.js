/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = initState.list?.length > 0
      ? Math.max(...initState.list.map(item => item.code))
      : 0;
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
    this.lastCode += 1;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.lastCode, title: 'Новая запись', selected: false, selectCount: 0 }
      ],
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
  selectItem(code, event) {
    const isMultiSelect = event.ctrlKey || event.metaKey;

    const list = this.state.list.map(item => {
      if (item.code === code) {
        const newSelected = !item.selected;
        return {
          ...item,
          selected: newSelected,
          selectCount: newSelected ? (item.selectCount || 0 ) + 1 : (item.selectCount || 0),
        };
      } else {
        return isMultiSelect ? item : {...item, selected: false};
      }
    });

    this.setState({
      ...this.state,
      list,
    });
  }
}

export default Store;
