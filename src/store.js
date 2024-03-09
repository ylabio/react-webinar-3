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
      this.listeners = this.listeners.filter((item) => item !== listener);
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

  changeCartVisability() {
    this.setState({
      ...this.state,
      showCart: !this.state.showCart});
  }

  /**
   * Добавление новой записи
   * @param code
   */
  addItem(code) {
    if (this.state.cart.filter((item) => item.code == code)[0])
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) =>
          item.code == code
            ? { code: item.code, title: item.title, price: item.price, quantity: item.quantity + 1 }
            : item
        ),
      });
    else {
      const good = this.state.list.filter((item) => item.code == code)[0];
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          {
            code: code,
            title: good.title,
            price: good.price,
            quantity: 1,
          },
        ],
      });
    }
    this.setState({
      ...this.state,
      cost : this.state.cost + this.state.list.filter((item) => item.code == code)[0].price })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    var good = this.state.cart.filter(item => item.code == code)[0];
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cost: this.state.cost - good.price * good.quantity ? this.state.cost - good.price * good.quantity : 0,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;

