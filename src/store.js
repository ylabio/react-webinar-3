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
    }
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
    const newCode = this.state.lastCode + 1;
    this.setState({
      ...this.state,
      lastCode: newCode,
      list: [...this.state.list, {code: newCode, title: 'Новая запись', selectedCount: 0}]
    })
  };

  /**
   * Удаление записи по code
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по code
   * @param code
   */
  selectItem(code) {
    const isSelected = this.state.selectedCode === code ? false : true;
    this.setState({
      ...this.state,
      selectedCode: isSelected ? code : -1,
      list: this.state.list.map(item => {
        if (item.code === code && isSelected) {
          item.selectedCount++;
        }
        return item;
      }),
    });
  }
}

export default Store;
