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
   * Добавление товара в корзину
   * @param product
   */
  addToCart(product) {

    const newProduct = this.state.cart.findIndex(cartItem => cartItem.code === product.code);

    if (newProduct !== -1) {
      const newCart = [...this.state.cart];
      newCart[newProduct].quantity += 1;
      this.setState({
        ...this.state,
        sum: +this.state.sum + +this.state.cart[newProduct].price || +this.state.cart[newProduct].price,
        cart: newCart
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1 }],
        sum: +this.state.sum + +product.price || +product.price,
      });
    }
  };


  /**
   * Удаление товара из корзины
   * @param product
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;
