/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: {},
      cartTotalPrice: 0,
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
   * @param productFromList
   */
  addToCart(productFromList) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [productFromList.code]:
          this.state.cart[productFromList.code]?.length > 0 ?
            [...this.state.cart[productFromList.code], productFromList] :
            [productFromList]
      },
      cartTotalPrice: this.state.cartTotalPrice + productFromList.price
    })
  }

  /**
   * Удаление товара из корзины
   * @param productFromCart
   */

  deleteFromCart(productFromCart) {
    this.setState({
      ...this.state,
      cart: Object.keys(this.state.cart).reduce((acc, cur) => {
        if (Number(cur) === productFromCart.code) {
          return acc;
        }

        if (Number(cur) !== productFromCart.code) {
          return {
            ...acc,
            [cur]: [...this.state.cart[Number(cur)]],
          }
        }
      }, {}),
      cartTotalPrice: this.state.cartTotalPrice - this.state.cart[productFromCart.code].reduce((acc, cur) => (acc + Number(cur.price)), 0)
    })
  }
}

export default Store;
