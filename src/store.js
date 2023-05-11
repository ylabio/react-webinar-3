/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.number = this.state.count;
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
   * Добавление номера записи
   */

  addItemNumber() {
    this.number += 1;
    return this.number;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.addItemNumber(), title: 'Новая запись', selectCount: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, e) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    e.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        (item.code !== code && item.selected) ? item.selected = !item.selected : item.selected = item.selected;
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) item.selectCount = item.selectCount + 1;
        }
        return item;
      })
    })
  }
}

export default Store;
