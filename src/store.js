import { generateCode } from './utils';

export const selectList = state => state.list;
export const selectCart = state => state.cart;

export const selectListItem = (state, code) => selectList(state).find(el => el.code === code);

export const selectCartItem = (state, code) => selectCart(state).find(el => el.code === code);

export const selectCartItemsUniqueCount = state => selectCart(state).length;
export const selectCartItemsTotalCost = state =>
  selectCart(state).reduce((acc, cur) => acc + cur.count * cur.price, 0);

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
   * @param {number} code
   */
  addToCart(code) {
    const item = selectListItem(this.state, code);
    const cart = selectCart(this.state);
    const cartItem = selectCartItem(this.state, code);
    const newCart = [...cart];

    if (cartItem) {
      const cartItemIndex = newCart.findIndex(el => el.code === code);
      newCart[cartItemIndex] = { ...cartItem, count: cartItem.count + 1 };
    } else {
      newCart.push({ ...item, count: 1 });
    }
    this.setState({
      ...this.state,
      cart: newCart,
    });
  }
  /**
   * Удаление товара из корзины
   * @param {number} code
   * @returns
   */
  removeFromCart(code) {
    const cartItem = selectCartItem(this.state, code);
    if (!cartItem) {
      return;
    }
    const cart = selectCart(this.state);
    const newCart = [...cart];

    const cartItemIndex = newCart.findIndex(el => el.code === code);

    if (cartItem.count > 1) {
      newCart[cartItemIndex] = { ...cartItem, count: cartItem.count - 1 };
    } else {
      newCart.splice(cartItemIndex, 1);
    }
    this.setState({
      ...this.state,
      cart: newCart,
    });
  }
}

export default Store;
