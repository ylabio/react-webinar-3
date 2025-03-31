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
   * @param product
   */
  addProductToCart(product) {
    const existingItem = this.state.cart.find(i => i.code === product.code);
    if (existingItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => {
          if (item.code === product.code) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + item.price,
            };
          }
          return item;
        }),
        totalCartPrice: (this.state.totalCartPrice || 0) +  product.price,
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1, totalPrice: product.price }],
        totalCartPrice: (this.state.totalCartPrice || 0) + product.price,
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteProductFromCart(code) {
    const product = this.state.cart.find(i => i.code === code);
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      totalCartPrice: this.state.totalCartPrice - product.price * product.quantity,
    });
  }
}

export default Store;
