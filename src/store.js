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
   * @param code
   */
  addItem(code) {
    const findItemCart = this.state.cart.find(item => item.code === code);
    const findItemList = this.state.list.find(item => item.code === code);
    if (findItemCart) {
      findItemCart.quantity++;
      this.setState({
        ...this.state,
        totalItem: [
          this.state.cart.reduce((sum, obj) => {
            return obj.quantity + sum;
          }, 0),
        ],
        totalPrice: [
          this.state.cart.reduce((sum, obj) => {
            return obj.price * obj.quantity + sum;
          }, 0),
        ],
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...findItemList, quantity: 1 }],
      });
    }
    this.state.totalPrice = this.state.cart.reduce((sum, obj) => {
      return obj.price * obj.quantity + sum;
    }, 0);
    this.state.totalItem = this.state.cart.reduce((sum, obj) => {
      return obj.quantity + sum;
    }, 0);
    console.log(this.state.totalItem);
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
    this.state.totalItem = this.state.cart.reduce((sum, obj) => {
      return obj.quantity + sum;
    }, 0);
    this.state.totalPrice = this.state.cart.reduce((sum, obj) => {
      return obj.price * obj.quantity + sum;
    }, 0);
  }
}

export default Store;
