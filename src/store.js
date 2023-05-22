import { generateCode } from "./utils";

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
    }
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
   * Удаление товаров из корзины
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  /**
   * Добавление товаров в корзину
   * @param code
   */
  addCartItem(code) {

    const isCartItem = this.state.cart.find(item => item.code === code);

    if (isCartItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(item => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            }
          }
          return item;
        }),
      })
    } else {
      const item = this.state.list.find(el => el.code === code);
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, count: 1 }]
      })
    }
  }

  /**
 * Расчет общей суммы товаров в корзине
 */
  getTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((accum, current) => accum + current.price * current.count, 0)
    });
  }

  /**
   * Расчет количества уникальных товаров в корзине
   */
  getTotalCount() {
    this.setState({
      ...this.state,
      totalCount: this.state.cart.length
    });
  }
}

export default Store;
