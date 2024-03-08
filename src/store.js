/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
    const code = this.getState().nextCode
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: code, title: 'Новая запись', amount: 0}],
      nextCode: code + 1
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(event, code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
      })
    event.stopPropagation()
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code !== code) item.selected = false;
        if (item.code === code) {
          if(!item.selected) item.amount++
          item.selected = !item.selected;
        }
        return item;
      })
    })
  }

}

export default Store;
