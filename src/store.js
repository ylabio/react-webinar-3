import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      ...initState
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
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
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
   * Функция добавления товара в корзину
   * @param {Object} item Товар для добавления
   */
  addToCart(item) {
    const { cart } = this.state;
    const existingItem = cart.find(i => i.code === item.code);
    const newCart = [...cart];
    if (existingItem) {
      newCart.forEach(cartItem => {
        if (cartItem.code === item.code) {
          cartItem.quantity = (cartItem.quantity || 1) + 1;
        }
      });
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    this.setState({
      ...this.state,
      cart: newCart
    });
  }

  /**
   * Функция вычисления общего количесвта товаров и сумму этих товаров в корзине
   * @returns {Object} Общее количество товаров и сумму
   */
  getCartTotals() {
    return {
      count: this.state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
      sum: this.state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    };
  }

  /**
   * Функция удаления товара из корзины
   * @param {number|string} code id-код товара
   */
  removeFromCart(code) {
      this.setState({
        ...this.state,
        cart: this.state.cart.filter(item => item.code !== code)
      });
    }
}

export default Store;
