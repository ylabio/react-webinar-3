/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.codeCounter; // Задача 2. Добавление уникального кода для новой записи.
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
    this.codeCounter = !this.codeCounter ? this.state.list.length + 1 : this.codeCounter + 1; // Задача 2. Добавление уникального кода для новой записи.
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.codeCounter, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    if (!this.codeCounter) this.codeCounter = this.state.list.length; // Задача 2. Добавление уникального кода для новой записи.
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
        if (item.code !== code || item.selected) {  // Задача 1. Изменение состояния выделения элемента
          item.selected = false;
        } else {
          item.selected = !item.selected;
          item.value = !item.value ? 1 : item.value + 1; // Задача 3. Подсчет количества кликов по элементу
        }
        return item;
      })
    })
  }
}

export default Store;
