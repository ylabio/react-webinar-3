/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.uniqueId = this.state.list.length; // Устанавливаем начальное значение идентификатора по длине массива
    this.state.list.map((item) => (item.сount = 0)); //Устанавливаем значение по умолчанию для счетчика select
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
    const uniqueId = this.state.uniqueId + 1;
    this.setState({
      ...this.state,
      uniqueId, // При добавлении новой записи записываем в state увеличенной значение идентификатора на 1
      list: [
        ...this.state.list,
        {
          code: uniqueId, // Записываем идентификатор в code новой записи
          title: "Новая запись",
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
        if (item.code !== code) item.selected = false;
        if (item.code === code) {
          !item.selected ? (item.сount = item.сount + 1) : item.count;
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }
}

export default Store;
