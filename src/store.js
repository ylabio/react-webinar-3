/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    this.lastUsedCode = this.findMaxCode();
  }

  /**
   * Находит максимальный существующий код в списке
   * @returns {Number} Максимальный код
   */
  findMaxCode() {
    if (!this.state.list || this.state.list.length === 0) {
      return 0;
    }
    return Math.max(...this.state.list.map(item => item.code));
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
    this.lastUsedCode += 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.lastUsedCode, title: 'Новая запись' }],
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
  selectItem(code, isMultiSelect = false) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return { ...item, selected: !item.selected };
        }

        if (!isMultiSelect) {
          return { ...item, selected: false };
        }
        return item;
      }),
    });
  }
}

export default Store;
