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

  addItemToCart(item) {
    const findItem = this.state.cart.find((obj) => obj.code === item.code);
    if (findItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartItem) => {
          if (cartItem.code === item.code) {
            return {
              ...cartItem,
              count: cartItem.count + 1,
            };
          }
          return cartItem;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          { code: item.code, title: item.title, price: item.price, count: 1 },
        ],
      });
    }
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0),
    });
  }

  deleteItemFromCard(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0),
    });
  }
}

export default Store;
