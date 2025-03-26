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
   * Добавление товара в корзину
   * @param {Object}
   */
  addItem(product) {
    // Проверяем есть ли товар в корзине
    if (this.state.cart.length === 0 || !this.state.cart.find(item => item.code === product.code)) {
      // Добавляем новый, если его нет
      this.setState({ ...this.state, cart: [...this.state.cart, { ...product, count: 1 }] });
    } else {
      // Увеличиваем количество, если товар есть
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item =>
          item.code === product.code ? { ...item, count: item.count + 1 } : item,
        ),
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({ ...this.state, cart: this.state.cart.filter(item => item.code !== code) });
  }
}

export default Store;
