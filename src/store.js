import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, cart: [], totalItems: 0, totalPrice: 0 }; //Добавляем корзину
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
   * Добавление в корзину
   */
  addToCart(code) {
    const { cart, list } = this.state;
    const product = list.find(item => item.code === code);

    if (product) {
      const productInCart = cart.find(item => item.code === code);
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      const totalItems = cart.length;
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      this.setState({
        ...this.state,
        cart: [...cart],
        totalItems,
        totalPrice,
      });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteFromCart(code) {
    const { cart } = this.state;
    const updatedCart = cart.filter(item => item.code !== code);
    const totalItems = updatedCart.length;
    const totalPrice = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({ ...this.state, cart: updatedCart, totalItems, totalPrice });
  }
}

export default Store;
