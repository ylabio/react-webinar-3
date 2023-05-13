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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.state.list[this.state.list.length - 1].code + 1, title: 'Новая запись',
                                  id: new Date().getTime().toString(), selectedCount: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(id) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.id !== id)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(id) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.id === id) {
          item.selected = !item.selected;
          item.selected && (item.selectedCount = item.selectedCount + 1)
        }else{
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
