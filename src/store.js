import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: initState.cart || [],
      cartTotalCount: 0, // общее количество всех штук
      cartTotalPrice: 0, // общая сумма всех товаров
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
   * Добавление товаров в корзину
   * @param code {Number} - Код товара
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;
    const cart = [...this.state.cart];
    const index = cart.findIndex(cartItem => cartItem.code === code);

    if (index >= 0) {
      cart[index] = { ...cart[index], count: cart[index].count + 1 };
    } else {
      cart.push({ ...item, count: 1 });
    }
    this.updateCart(cart);
  }

  /**
   * Обновление корзины и общей суммы
   * @param cart {Array} - Массив товаров в корзине
   */

  updateCart(cart) {
    const cartTotalCount = cart.length;
    const cartTotalPrice = cart.reduce((sum, i) => sum + i.price * i.count, 0);
    this.setState({
      ...this.state,
      cart,
      cartTotalCount,
      cartTotalPrice,
    });
  }

  /**
   * Удаление товара по коду
   * @param code {Number} - Код товара
   */
  removeItemFromCart(code) {
    const updatedCart = this.state.cart.filter(cartItem => cartItem.code !== code);
    this.updateCart(updatedCart);
  }
}

export default Store;
