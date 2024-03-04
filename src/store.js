/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.index = initState.list.length;
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
    this.incrementIndex();
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.index, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code код записи, которая удаляется
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code код записи, которая выделяется
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
          if (item.selected) {
            item.selectedTimes = item.selectedTimes === undefined ? 1 : item.selectedTimes + 1;
          } 
        } 
        else if (item.selected) {
            item.selected = false;
          }

        return item; 
      })
    })
  }

  /**
   * Увеличивает значение счетчика
   */
  incrementIndex() {
    this.index = this.index + 1;
  }
}

export default Store;
