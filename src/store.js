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
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  addToCart(item) {
    const { code, title, price } = item;
    const isInCart = this.state.cart.find(product => product.code === item.code);
    this.setState({
      ...this.state,
      // проверка: если предмет уже есть в корзине, увеличивается его count
      // если нет - в корзину добавляется новый предмет
      cart: isInCart ? 
        this.state.cart.map(product => {
          return {
            ...product,
            count: product.code === item.code ? product.count + 1 : product.count,
          };
        }) : 
        [...this.state.cart, { code, title, price, count: 1 }]
    });
  }
}

export default Store;
