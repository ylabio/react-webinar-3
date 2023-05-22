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
   * Добавление товара в корзину
   */
  addItem(item) {
    let itemAlreadyInCart = false
    const arr = this.state.cart.map(el => {
      if (el.code === item.code) {
        el.value++
        itemAlreadyInCart = true
        return el
      } else {
        return el
      }
    })
    if (itemAlreadyInCart) {
      this.setState({ ...this.state, cart: [...arr] })
    } else {
      this.setState({ ...this.state, cart: [...this.state.cart, { code: item.code, title: item.title, price: item.price, value: 1 }] })
    }
  }

  // /**
  //  * Удаление товара из корзины
  //  */
  deleteItem(item) {
    this.setState({ ...this.state, cart: [...this.state.cart.filter(el => el.code !== item.code)] })
  }

  // /**
  //  * Возвращает сумму стоимости всех товаров в корзине
  // @returns number
  //  */
  calculateSumInCart() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.value), 0)
  }

  // /**
  //  * Возвращает количество уникальных товаров в корзине
  // @returns number
  //  */
  calculateQuantityItemsInCart() {
    return this.state.cart.length
  }
}

export default Store;
