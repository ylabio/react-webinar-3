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
   * Обновление состояния корзины
   * @param item {Object}
   */
  setCart(item) {
    const currentCart = this.state.cart;
    const findItem = currentCart.find(elem => elem.code === item.code);
    if (findItem) {
      const updatedCart = currentCart.map(elem => {
        if (elem.code === item.code) {
          return { ...elem, count: elem.count + 1 }
        }
        return elem;
      })

      this.setState({
        ...this.state,
        cart: updatedCart,
      })
    } else {
      const newElem = { ...item, count: 1 }
      this.setState({
        ...this.state,
        cart: [
          ...currentCart,
          newElem,
        ]
      })
    }
  }
  /**
   * Удаление товара из корзины
   * @param code {Number}
   */
  deleteFromCart(code) {
    const currentCart = this.state.cart;
    const newCart = currentCart.filter(item => item.code !== code);
    this.setState({
      ...this.state,
      cart: newCart,
    })
  }
}

export default Store;
