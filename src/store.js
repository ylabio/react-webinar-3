import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cartList: [],
      sum: 0,
    };
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

  addItemToCartList(item) {
    const itemIndex = this.state.cartList.findIndex(itemList => itemList.code === item.code);
    let price = 0;
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };

      price = item.price;

      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, newItem],
        sum: this.state.sum + price,
      });
    } else {
      const newCartList = this.state.cartList.map((cartItem, index) => {
        if (itemIndex === index) {
          price = cartItem.price;
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });

      this.setState({
        ...this.state,
        cartList: newCartList,
        sum: this.state.sum + price,
      });
    }
  }
  deleteItemFromCartList(code) {
    let sum = 0;
    const cartList = this.state.cartList.filter(item => {
      if (item.code === code) return false;
      sum += item.price * item.quantity;
      return true;
    });

    this.setState({
      ...this.state,
      cartList,
      sum,
    });
  }
}

export default Store;
