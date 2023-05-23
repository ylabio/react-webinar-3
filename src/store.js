/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [], cart: { list: [], totalQuantity: 0, sum: 0 } }) {
    this.state = initState;
    if (!Object.hasOwn(initState, 'cart')) {
      this.state.cart = { list: [], totalQuantity: 0, sum: 0 };
    }
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
  #setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  removeItemFromCart(code) {
    const removedItem = this.state.cart.list.find((item) => item.code === code);
    this.#setState({
      ...this.state,
      cart: {
        list: [...this.state.cart.list.filter((item) => item.code !== code)],
        totalQuantity: this.state.cart.totalQuantity - 1,
        sum: this.state.cart.sum - removedItem.price * removedItem.quantity
      }
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {
    const newItem = this.state.list.find(item => item.code === code);
    const foundItem = this.state.cart.list.find((item) => item.code === newItem.code);
    console.log(this.state.cart);
    if(foundItem) {
      this.#setState({
        ...this.state,
        cart: {
          list: [
            ...this.state.cart.list.filter((item) => item.code !== newItem.code),
            {...foundItem, quantity: foundItem.quantity + 1}
          ],
          totalQuantity: this.state.cart.totalQuantity,
          sum: this.state.cart.sum + foundItem.price
        }
      });
    } else {
      this.#setState({
        ...this.state,
        cart: {
          list: [...this.state.cart.list, {...newItem, quantity: 1}],
          totalQuantity: this.state.cart.totalQuantity + 1 ,
          sum: this.state.cart.sum + newItem.price
          }
        }
      );
    }
    console.log(this.state.cart);
  }

  getTotalQuantity() {
    return this.state.cart.totalQuantity;
  }
  getCartSum() {
    return this.state.cart.sum;
  }
}

export default Store;
