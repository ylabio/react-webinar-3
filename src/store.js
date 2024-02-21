/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.selectionCount = {}; // Количество выделений для каждой записи
    this.selectionMessages = {};
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
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return {
      ...this.state,
      selectionCount: this.selectionCount,
    };
  }

  // Состояние вывода сообщения
  getSelectionMessages() {
    return this.selectionMessages[code] || '';
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
    let uniqueCode = Math.floor(Math.random() * 1000);
    while (this.state.list.some((item) => item.code === uniqueCode)) {
      uniqueCode = Math.floor(Math.random() * 1000);
    }

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.list.length + 1, title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });

    if (this.state.list.some((item) => item.selected)) {
      this.selectionCount[code] = (this.selectionCount[code] || 0) + 1;
    } else {
      delete this.selectionCount[code];
      delete this.selectionMessages[code];
    }
    this.selectionMessages[code] = `Выделяли ${this.selectionCount[code]} раз`;
    let message = this.selectionMessages[code];
    console.log(message);
  }
}

export default Store;
