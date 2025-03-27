/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
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
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление или удаление записи в корзине
   * @param code {number} - Код товара
   * @param action {'add' | 'remove'} - Действие: добавить или удалить
   */
  changeItem(code, action) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          if (action === 'add') {
            return {
              ...item,
              quantity: (item.quantity || 0) + 1,
            };
          } else if (action === 'remove') {
            return {
              ...item,
              quantity: 0,
            };
          }
        }
        return item;
      }),
    });
  }

  getUniqueItemCount() {
    return this.state.list.filter(item => item.quantity > 0).length;
  }

  getTotalPrice() {
    return this.state.list
      .filter(item => item.quantity > 0)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export default Store;
