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
   * Добавление товара в корзину
   * @param item
   */
  addInCart(item) {
    this.setState({
      ...this.state,
      cart: [...this.state.cart, item],
    })
  };

  /**
   * Переключатель функций
   * @param item 
   */
  toggleAdd(item) {
    // Проверяем наличие элемента в списке
    if (this.state.cart.includes(item)) {
      item.count++;
      this.setState(this.state);
    } else {
      item.count = 1;
      this.addInCart(item);
    }
  }

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItem(item) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(i => i !== item)
    })
  };

}

export default Store;
