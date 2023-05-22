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
   * Добавление товара по коду в массив cart
   * @param code
   */
  addItemToCart(code) {
    let listItem = this.state.list.find(i => i.code === code)
    let cartItem = this.state.cart.find(i => i.code === code)

    if(cartItem){
      cartItem.count++
    }
    else {
      this.state.cart.push({ ...listItem, count: 1 });
    }

    this.setState({
      ...this.state, ...this.state.cart,
    })
  }

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;