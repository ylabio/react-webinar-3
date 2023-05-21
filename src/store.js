// import {cartTotalSum} from '../../utils';
// import {plural} from '../../utils';
// import cartItem from './components/cart-item';

import {cartTotalSum} from './utils';

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
      this.listeners = this.listeners.filter((item) => item !== listener);
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
  addItemToCart(item) {
    const existingItem = this.state.cart.find(
      (cartItem) => cartItem.code === item.code
    );

    if (!existingItem) {
      const newCart = [...this.state.cart, {...item, quantity: 1}];
      this.setState({
        ...this.state,
        cart: newCart,
        cartItems: newCart.length,
        cartTotal: cartTotalSum(newCart),
      });
    } else {
      const newCart = this.state.cart.map((cartItem) => {
        if (cartItem.code === item.code) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
      this.setState({
        ...this.state,
        cart: newCart,
        cartTotal: cartTotalSum(newCart),
      });
    }
  }

  /**
   * Удаление товара из корзины
   */
  clearItemFromCart(item) {
    const newCart = this.state.cart.filter(
      (cartItem) => cartItem.code !== item.code
    );
    this.setState({
      ...this.state,
      cart: newCart,
      cartItems: newCart.length,
    });
  }

  /**
   * Открытие корзины в модальном окне
   */
  setCartOpen() {
    this.setState({
      ...this.state,
      isCartOpen: true,
    });
  }

  /**
   * Закрыть корзину в модальном окне
   */
  setCartClose() {
    this.setState({
      ...this.state,
      isCartOpen: false,
    });
  }
}

export default Store;
