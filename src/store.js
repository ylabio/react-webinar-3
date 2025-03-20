/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [], codes: [] }) {
    this.state = initState;
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
    const { list, codes } = this.state;

    const highestCode = codes.reduce((max, code) => (code > max ? code : max), 0);

    const newCode = highestCode + 1;

    this.setState({
      ...this.state,
      list: [...list, { code: newCode, title: 'Новая запись', counter: 0 }],
      codes: [...codes, newCode],
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
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (!isCtrlPressed) {
          item.selected = item.code === code ? !item.selected : false;
          if (item.selected) {
            item.counter += 1;
          }
        } else {
          if (item.code === code) {
            item.selected = !item.selected;
            if (item.selected) {
              item.counter += 1;
            }
          }
        }
        return item;
      }),
    });
  }
}

export default Store;
