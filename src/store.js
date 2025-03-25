/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: (initState.list || []).map(item => ({
        ...item,
        selected: item.selected || false,
        counter: item.counter || 0,
      })),
      lastUsedCode: initState.list.reduce((max, item) => (item.code > max ? item.code : max), 0),
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
    const newUsedCode = this.state.lastUsedCode + 1;
    this.setState({
      ...this.state,
      lastUsedCode: newUsedCode,
      list: [
        ...this.state.list,
        { code: newUsedCode, title: 'Новая запись', counter: 0 }
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
      list: this.state.list.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, multipleEntries) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            counter: item.selected ? item.counter : item.counter + 1 };
        }
        if (!multipleEntries) {
          return { ...item, selected: false };
        }
        return item;
      }),
    });
  }
}

export default Store;
