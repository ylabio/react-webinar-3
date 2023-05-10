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
    const newCode = this.state.list.length > 0 ? Math.max(...this.state.list.map(item => item.code)) + 1 : 1;
  
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись ' }]
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
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
    const newList = this.state.list.map(item => {
      if (item.code === code) {
        item.selected = !item.selected;
      } else {
        item.selected = false; // сброс выделения у других записей
      }
      return item;
    });
  
    this.setState({
      ...this.state,
      list: newList
    });
  }
  
  
  
  
  
}

export default Store;
