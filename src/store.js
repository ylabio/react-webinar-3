/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = Math.max(...this.state.list.map(({code}) => code)) || 0;
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
    const newItem = {
      code: this.generateCode(),
      title: 'Новая запись',
      selectedTimes: 0,
    }
    this.setState({
      ...this.state,
      list: [...this.state.list, newItem]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const isChanged = code !== this.state.selectedItemCode;
    const newList = !isChanged
      ? this.state.list
      : this.state.list.map(item => code !== item.code ? item :
      {...item, selectedTimes: item.selectedTimes + 1}
      )
    this.setState({
      ...this.state,
      list: newList,
      selectedItemCode: isChanged ? code : undefined
    })
  }

  generateCode() {
    return ++this.lastCode
  }
}

export default Store;
