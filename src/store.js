// import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      totalQuantity: 0,
      totalPrice: 0,
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
   * Вычисление общей стоимости и количества
   */
  calculateTotals() {
    const totalQuantity = this.state.cart.length;
    const totalPrice = this.state.cart.reduce((price, item) => price + item.quantity * item.price, 0);

    this.setState({
      ...this.state,
      totalQuantity,
      totalPrice,
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const cartItem = this.state.list.find(item => item.code === code);
    if (!cartItem) return;

    const exCartItem = this.state.cart.find(item => item.code === code);

    const cartList = exCartItem
      ? this.state.cart.map(item => {
          if (item.code === code) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      : [
          ...this.state.cart,
          {
            ...cartItem,
            quantity: 1,
          },
        ];

    this.setState({
      ...this.state,
      cart: cartList,
    });

    this.calculateTotals();
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemFromCart(code) {
    const cartList = this.state.cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: cartList,
    });

    this.calculateTotals();
  }
}

export default Store;
