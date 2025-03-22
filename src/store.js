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
    const newItem = {
      code: this.state.maxId + 1,
      title: 'Новая запись',
      selected: false,
      selectionCount: 0,
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });

    this.incrementMaxId();
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
   * @param isMultipleChoiceKeyPressed
   */
  selectItem(code, isMultipleChoiceKeyPressed) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return { ...item, selected: !item.selected };
        }
        return { ...item, selected: isMultipleChoiceKeyPressed && item.selected };
      }),
    });
  }

  /**
   * Увеличение счетчика совершенных выделений
   * @param code
   */
  incrementSelectionCount(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && !item.selected) {
          item.selectionCount += 1;
        }
        return item;
      }),
    });
  }

  /**
   * Увеличение максимального значения id
   */
  incrementMaxId() {
    this.setState({
      ...this.state,
      maxId: this.state.maxId + 1,
    });
  }
}

export default Store;
