/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Клонирование объектов в массиве
   * @param list {Array}
   * @returns {Array}
   */
  cloneList(list) {
    return list.map(item => ({ ...item }));
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
   * @returns {Array}
   */
  getStateList() {
    return this.cloneList(this.state.list);
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
    const cartList = this.cloneList(this.state.list.filter(item => item.count));
    const sizeCart = cartList.length;
    const total = cartList.reduce((acc, item) => acc + (item.total || 0), 0);
    return { total, sizeCart, cartList };
  }

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  clearCartProductCard(code) {
    const clonedList = this.cloneList(this.state.list);
    const updatedList = clonedList.map(item =>
      item.code === code
        ? { ...item, count: 0, total: 0 }
        : item
    );

    this.setState({
      ...this.state,
      list: updatedList,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  addCartProductCard(code) {
    const list = this.cloneList(this.state.list);
    const updatedList = list.map(item => {
      if (item.code === code) {
        return this.updateItem(item);
      }
      return item;
    });

    this.setState({
      ...this.state,
      list: updatedList,
    });
  }

  updateItem(item) {
    return {
      ...item,
      count: item.count ? item.count + 1 : 1,
      total: item.total ? item.total + item.price : item.price,
    };
  }
}

export default Store;
