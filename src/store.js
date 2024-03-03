import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = [];
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
   * Добавление новой записи
   * @param item {Object}
   * @returns {Object}
   */
  addItemToCart(item) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === item.code);
    if (existingItem) {
        const updatedCart = this.state.cart.map(cartItem => {
            if (cartItem.code === item.code) {
                return { ...cartItem, count: cartItem.count + 1 };
            }
            return cartItem;
        });
        this.setState({
            ...this.state,
            cart: updatedCart
        });
    } else {
        this.setState({
            ...this.state,
            cart: [...this.state.cart, { ...item, count: 1 }]
        });
    }
  }
  /**
   * Удаление записи по коду
   * @param item {Object}
   * @returns {Object}
   */
  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(cartItem => cartItem.code !== item.code)
    })
  };

    /**
   * Получение итоговой суммы корзины 
   * @returns {Number}
   */
  getCartAmount() {
    return this.state.cart.reduce((total, item) => total + item.price * item.count, 0);
  }

  /**
   * Получение количества уникальных товаров
   * @returns {Number}
   */
  getCartQuantity() {
    return this.state.cart.length;
  }
}

export default Store;
