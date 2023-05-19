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

  onAddToCart(code) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        [code]: this.state.cart[code] ? this.state.cart[code] + 1 : 1
      }
    })
  }

  onDeleteFromCart(code) {
    const cart = {...this.state.cart};
    delete cart[code];
    this.setState({
      ...this.state,
      cart
    });
  }

  getTotal() {
    const cart = this.state.cart;
    const list = this.state.list;
    let price = 0;
    let count = 0;

    const codeList = Object.keys(cart);
    codeList.forEach(code => {
      const item = list.find(item => item.code === Number.parseInt(code));
      if (item) {
        price += item.price * cart[code];
        count += cart[code];
      }
    });

    return {price, count};

  }

  getCartList() {
    const result = [];
    const cart = this.state.cart;

    [...this.state.list].forEach(item => {
      if (cart[item.code]) {
        const resultItem = {...item, count: cart[item.code]}
        result.push(resultItem);
      }
    });

    return result;
  }


}

export default Store;
