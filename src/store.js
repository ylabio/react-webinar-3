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
   * @param item {number}
   */
    addItemToCart(code) {
      const existingItemIndex = this.state.cart.findIndex(cartItem => cartItem.code === code);
      const item = this.state.list.find(item => item.code === code);

      if (existingItemIndex !== -1 && item) {
          const updatedCart = this.state.cart.map((cartItem, index) => {
            
              if (index === existingItemIndex) {
                  return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
          });

          this.setState({
              ...this.state,
              cart: updatedCart
          });
      } else if (item) {    
          const newItem = { code, title: item.title, price: item.price, quantity: 1 };
                
          this.setState({
              ...this.state,
              cart: [...this.state.cart, newItem]
          });
      }
  }

  /**
     * Удаление товара из корзины по коду
     * @param code
     */
    removeItemFromCart(code) {
      this.setState({
          ...this.state,
          cart: this.state.cart.filter(cartItem => cartItem.code !== code)
      });
  }


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
      return this.state.cart.reduce((total, item) => {
          const product = this.state.list.find(product => product.code === item.code);
          return total + (product ? product.price * item.quantity : 0);
      }, 0);
  }

}

export default Store;
