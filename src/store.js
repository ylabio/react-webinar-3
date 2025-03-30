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
   */
  addItem(code) {
    const item = this.state.list.find(o => o.code === code);
    const isExists = this.state.cart.some(o => o.code === code);

    if (isExists) {
      const updateItem = this.state.cart.map(itemCart => {
        if (itemCart.code === item.code) {
          return {
            ...itemCart,
            price: itemCart.price + item.price,
            count: itemCart.count + 1,
          }
        }
        return itemCart;
      });
      
      this.setState({
        ...this.state,
        cart: updateItem,
        cartTotalPrice: this.state.cartTotalPrice + item.price,
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, count: 1 }],
        cartItemsCount: this.state.cartItemsCount + 1,
        cartTotalPrice: this.state.cartTotalPrice + item.price,
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItem(code) {
    const item = this.state.cart.find(o => o.code === code);

    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      cartItemsCount: this.state.cartItemsCount - 1,
      cartTotalPrice: this.state.cartTotalPrice - item.price,
    });
  }

  /**
* Показ/скрытие корзины
*/
  visibleCart() {
    this.setState({
      ...this.state,
      isVisibleCart: !this.state.isVisibleCart,
    });
  }
}

export default Store;
