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
   * Добавление товара
   */
  addItem(item) {
    this.setState({
      ...this.state,
      items: [...this.state.items, item]
    })
  };

  /**
   * Удаление товара
   */
  deleteItem(deletedItem) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет товара по code
      items: this.state.items.filter(item => item.code !== deletedItem.code)
    })
  };

}

export default Store;
