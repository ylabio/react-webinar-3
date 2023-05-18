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

  /**
   * Подсчёт суммы товаров в корзине
   */
  calcCartSum() {
    this.setState({
      ...this.state,
      cart: {...this.state.cart, cartSum: this.state.cart.cartList.reduce((accum, current) => accum += current.price * current.count, 0)}
    })
  }

  /**
   * Подсчёт количества товаров в корзине (может можно объединить с методом подсчётом суммы)
   */
  calcCartQuantity() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartQuantity: this.state.cart.cartList.length
      }
    })
  }
  /**
   * Добавление товаров в корзину
   */
  addToCart(code) {
    const itemExist = this.state.cart.cartList.find(item => item.code === code);

    if (itemExist) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartList: [...this.state.cart.cartList.filter(item => item.code !== code), {...itemExist, count: itemExist.count ? itemExist.count + 1 : 1 }]
        }
      })
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartList: [...this.state.cart.cartList, {...this.state.list.filter(item => item.code === code)[0], count: 1}]
        }
      })
    }

    this.calcCartSum();
    this.calcCartQuantity();
  };

  /**
   * Удаление товаров из корзины
   */
  deleteFromCart(code) {
    const newElems = this.state.cart.cartList.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartList: [...newElems]
      } 
    })

    this.calcCartSum();
    this.calcCartQuantity();
  };


}

export default Store;
