/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    //задача 2.1
    this.lastCode = Math.max(0, ...initState.list.map(item => item.code)); // Находим максимальный код
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
    this.lastCode += 1; // Увеличиваем код на 1
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.list.length + 1, title: 'Новая запись' }],
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
  //Задача 1
  /* selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        // Сброс выделения у всех записей
        item.selected = item.code === code ? !item.selected : false;
        return item;
      }),
    });
  } */

  //Задача 3
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectionCount = (item.selectionCount || 0) + 1; // Увеличение счётчика
          }
        } else {
          item.selected = false; // Сброс выделения у других записей
        }
        return item;
      }),
    });
  }
}

export default Store;
