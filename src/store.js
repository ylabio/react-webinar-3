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
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(item) {
    
    const existingItemIndex = this.state.cart.findIndex(cartItem => cartItem.code === item.code);  

    if (existingItemIndex !== -1) {
      // Если товар уже есть в корзине, увеличиваем его количество
      const updatedCart = [...this.state.cart];
      updatedCart[existingItemIndex].quantity += 1;
      this.setState({
        ...this.state,
        cart: updatedCart
      });
    } else {
      // Если товара нет в корзине, добавляем его с начальным количеством 1
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }]
      });
    }
  };

  /**
     * Удаление товара из корзины по коду
     * @param code
     */
  removeItemFromCart(item) {
    const code = item.code;
    
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(c => c.code !== code)
    });
  };


  /**
   * Подсчет количества товаров в корзине
   * @returns {number}
   */
  countItemsInCart() {    
    return this.state.cart.length;
  }

  /**
   * Подсчет общей стоимости товаров в корзине
   * @returns {number}
   */
  totalPriceInCart() {
    return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

export default Store;
