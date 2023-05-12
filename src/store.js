/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

  }
  getMaxCode() {
    return this.state.list.reduce((maxCode, item) => Math.max(maxCode, item.code), 0);
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
    const code = this.getMaxCode() + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code, title: 'Новая запись', selectedValue: 0, isSelected: false}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const list = this.state.list.filter(item => item.code !== code);
    const newList = list.map(item => {
      if (item.code > code) {
        item.code--;
      }
      return item;
    });
    this.setState({
      ...this.state,
      list: newList
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }
        return item;
      })
    })
  }
}

export default Store;
