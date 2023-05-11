/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.codeCounter = this.state.list.length;
    this.state.list = this.state.list.map((item) => ({
      ...item,
      selectСounter: 0,
      selected: false,
    }));
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
    this.codeCounter += 1;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.codeCounter,
          title: 'Новая запись',
          selectСounter: 0,
          selected: false,
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
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        const selected = item.code === code && !item.selected;
        const selectСounter =
          selected && !item.selected
            ? (item.selectСounter += 1)
            : item.selectСounter;
        return { ...item, selected, selectСounter };
      }),
    });
  }
}

export default Store;
