/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const { list = [] } = initState;
    const codeCounter = Math.max(...list.map(({ code }) => code), 0);

    this.state = {
      ...initState,
      codeCounter,
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
    const { list, codeCounter } = this.state;
    const newItem = {
      code: codeCounter + 1,
      title: 'Новая запись',
      counter: 0,
    };

    this.setState({
      list: [...list, newItem],
      codeCounter: codeCounter + 1,
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
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.counter = item.counter + 1;
          }
        } else {
          item.selected = false;
        }
        return item;
      })
    })
  }
}

export default Store;
