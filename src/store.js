/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.uniqueId = this.state.list.length; // Устанавливаем начальное значение идентификатора по длине массива list
    this.state.list = this.state.list.map((item) => {
      return { ...item, counter: 0 }; // Устанавливаем значение по умолчанию для счетчика
    });
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
      uniqueId, // При добавлении новой записи записываем в state увеличенное значение идентификатора на 1
      list: [
        ...this.state.list,
        {
          code: uniqueId, // Записываем идентификатор в code новой записи
          counter: 0, // Добавляем счетчик
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
        if (item.code === code) {
          if (!item.selected) item.counter += 1; // Обновляем счетчик, если item не выбран
          item.selected = !item.selected;
        } else {
          item.selected = false; // Сбрасываем selected у остальных items
        }
        return item;
      }),
    });
  }
}

export default Store;
