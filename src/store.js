/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.allList = this.state.list; // Весь список list с учетом всех добавлений, удаления не фиксируются
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

  setAllList(newState) {
    this.allList = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**;
   * Добавление новой записи
   */
  addItem() {
    // Добавление в список allList и формирование кода объекта на основе длины этого независимого списка, который не уменьшается, а фиксирует все добавления
    this.setAllList([
      ...this.allList,
      {
        code: this.allList.length,
        title: "Новая запись",
        countSelected: 0,
      },
    ]);
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.allList.length, // Уставнока кода в соответствии с независимым списком
          title: "Новая запись",
          countSelected: 0,
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
      list: this.state.list.filter((item) => {
        return item.code !== code;
      }),
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
        } else item.selected = false;
        return item;
      }),
    });
  }

  // Изменение счетчика выделений
  setCountSelected(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          ++item.countSelected;
          return item;
        } else return item;
      }),
    });
  }
}

export default Store;
