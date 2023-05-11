/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    if (
      new Set(initState.list.map((item) => item.code)).size !==
      initState.list.length
    ) {
      throw new Error("code should be unique");
    }

    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.lastCode = [...initState.list].sort((a, b) => b.code - a.code)[0].code;
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
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: ++this.lastCode, title: "Новая запись" },
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
        if (item.code === code) {
          item.selected = !item.selected;

          if (item.selected) {
            item.selectCount ??= 0;
            item.selectCount++;
          }
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
