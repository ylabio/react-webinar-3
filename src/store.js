
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
   * Получение заказа
   */


  getOrder() {
    return this.getState().list.filter(item => item.inOrder);
  }

  /**
   * Добавление нового товара
   */

  addItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item =>
        item.code === code
          ? { ...item, inOrder: (item.inOrder || 0) + 1 }
          : item,
      ),
    });
  }

  /**
   * Удаление товара
   */

  delItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item =>
        item.code === code
          ? { ...item, inOrder: 0 }
          : item,
      ),
    });
  }
}

export default Store;
