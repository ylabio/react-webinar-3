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
   * Поиск Максимального значения this.state.list.code
   */
  getCountCodeMax() {
    let codeMax = 0;

    this.state.list.forEach(item => {
      if (item.code > codeMax) {
        codeMax = item.code;
      }
    });

    return codeMax;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getCountCodeMax() + 1, title: "Новая запись"}],
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (!item.hasOwnProperty("selectCount")) {
          item.selectCount = 0;
        }

        if (item.code === code) {
          if (!item.selected) {
            item.selectCount += 1;
          }

          item.selected = !item.selected;
        } else {
          item.selected = false;
        }

        return item;
      }),
    });
    // console.log(this.state.list);
  }
}

export default Store;
