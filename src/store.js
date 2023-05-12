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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
    this.uniqeId();
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.state.id,
          title: "Новая запись",
          count: 0,
        },
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
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const newList = this.state.list.map((item) => {
      if (item.code === code && !item.selected) {
        item.selected = !item.selected;
        if (item.selected === true) {
          item.count++;
        }
      } else {
        item.selected = false;
      }
      return item;
    });
    this.setState({ ...this.state, list: newList });
  }

  uniqeId() {
    this.setState({
      ...this.state,
      id: this.state.id + 1,
    });
  }
}

export default Store;
