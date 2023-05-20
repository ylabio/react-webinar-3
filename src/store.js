import {getTotalPrice} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cartList = [];
    this.state.cartInfo = {
      uniqueCountProducts: 0,
      totalPrice: 0,
    };
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
    for (const listener of this.listeners)
      listener();
  }

  addToCart(code) {
    const existingProduct = this.state.cartList.find((item) => item.code === code)
    if (existingProduct) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map((item) => {
          if (item.code === code) {
            return {...item, count: item.count + 1}
          }
          return item
        })
      });
    } else {
      const product = this.state.list.find((item) => item.code === code)
      this.setState({
        ...this.state,
        cartList: [
          ...this.state.cartList,
          {
            ...product,
            count: 1
          }
        ]
      });
    }
    this.setState({
      ...this.state,
      cartInfo: {
        uniqueCountProducts: this.state.cartList.length,
        totalPrice: getTotalPrice(this.state.cartList)
      },
    });
  }

  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter((item) => item.code !== code)
    });
    this.setState({
      ...this.state,
      cartInfo: {
        uniqueCountProducts: this.state.cartList.length,
        totalPrice: getTotalPrice(this.state.cartList)
      },
    });
  }
}

export default Store;
