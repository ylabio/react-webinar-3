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
   * Добавление товара в корзину по коду
   */
  addToCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.find(item => item.code === code)
        ? this.state.cart.map(item =>
            item.code === code ? { ...item, count: item.count + 1 } : item,
          )
        : [
            ...this.state.cart,
            { ...this.state.list.filter(item => item.code === code)[0], count: 1 },
          ],
    });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }
}

export default Store;
