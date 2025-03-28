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
   * Выбор состояния, только список
   * @returns {Object}
   */
  getStateList() {
    return [...this.state.list];
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
   * Выбор состояния корзины
   * @returns {Object}
   */
  getCartState() {
    const cartList = this.state.list.filter(item => item.count);
    const sizeCart = cartList.length;
    const total = cartList.reduce((acc, item) => acc + (item.total || 0), 0);
    return { total, sizeCart, cartList };
  }

  /**
   * Удаление записи из карзины по коду
   * @param code
   */
  clearCartItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            count: 0,
            total: 0,
          };
        }
        return item
      }),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  addCartItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            count: item.count ? item.count + 1 : 1,
            total: item.total ? item.total + item.price : item.price,
          };
        }
        return item
      }),
    });
  }
}

export default Store;
