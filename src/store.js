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
    const newId = this.state.lastId + 1;
    this.setState({
      ...this.state,
      lastId: newId,
      list: [...this.state.list, {id: newId, code: this.state.list.length + 1, selectedCount: 0, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по id
   * @param id
   */
  deleteItem(id) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.id !== id)
    })
  };

  /**
   * Выделение записи по id
   * @param id
   */
  selectItem(id) {
    const isSelected = this.state.selectedId === id ? false : true;
    this.setState({
      ...this.state,
      selectedId: isSelected ? id : -1,
      list: this.state.list.map(item => {
        if (item.id === id && isSelected) {
          item.selectedCount++;
        }
        return item;
      }),
    });
  }
}

export default Store;
