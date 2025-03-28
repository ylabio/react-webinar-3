import { generateCode } from './utils';

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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * добавление в корзину
   * @param code
   */
  addToCart(code) {
    const currentCart = this.state.cartItems || [];
    const existingItemIndex = currentCart.findIndex(item => item.code === code);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      updatedCart = currentCart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const matchingProduct = this.state.list.find(item => item.code === code);
      updatedCart = [
        ...currentCart,
        { code: matchingProduct.code, title: matchingProduct.title, price: matchingProduct.price, quantity: 1 },
      ];
    }

    this.setState({
      ...this.state,
      cartItems: updatedCart,
    });
  }

  /**
   * удаление из корзины
   * @param code
   */
  removeFromCart(code) {
    const currentCart = this.state.cartItems || [];
    const updatedCart = currentCart.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      cartItems: updatedCart,
    });
  }

  calculateTotalPrice() {
    const cartItems = this.state.cartItems || [];
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  calculateTotalItems() {
    const cartItems = this.state.cartItems || [];
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
}

export default Store;
