/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const list = initState.list || [];
    const maxCode = list.length > 0
      ? Math.max(...list.map(item => item.code))
      : 0;
    this.state = {...initState, nextCode: maxCode + 1} //Инициализация nextCode на основе максимального существующего кода

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
    const newCode = this.state.nextCode;
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись' }],
      nextCode: newCode + 1 // Увеличить для следующего добавления
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
    const isCtrlOrCmdPressed = event ? (event.ctrlKey || event.metaKey) : false;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {...item, selected: !item.selected};
        } else {
          return isCtrlOrCmdPressed ? item : {...item, selected: false};
        }
      }),
    });
  }
}

export default Store;
