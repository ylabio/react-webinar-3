import {generateCode} from "./utils";

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

  addToCart(code) {
    const cart = {
      ...this.state.cart,
      [code]: this.state.cart[code] ? this.state.cart[code] + 1 : 1
    }

    let price = this.state.price;
    const cartList = [];

    [...this.state.list].forEach(item => {
      if (cart[item.code]) {
        const resultItem = {...item, count: cart[item.code]}
        cartList.push(resultItem);
        if (item.code === code) {
          price += item.price;
        }
      }
    });

    this.setState({
      ...this.state,
      cart,
      price,
      cartList
    })
  }

  deleteFromCart(code) {
    const cart = {...this.state.cart};
    const cartList = this.state.cartList.filter(item => item.code !== code);
    const count = cart[code];
    delete cart[code];
    const item = this.state.list.find(item => item.code === code);
    let price = this.state.price;
    if (item) {
      price -= item.price * count;
    }


    this.setState({
      ...this.state,
      cart,
      cartList,
      price
    });
  }



}

export default Store;
