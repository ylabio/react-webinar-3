import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {...initState, cart: { cartList: [], count: 0, sum: 0 }};
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

  /**
   * Добавление новой записи
   */
  addItemInCart(code) {
    const itemInCart = this.state.cart.cartList.find(currItem => currItem.code === code);
    const itemInList = this.state.list.find(currItem => currItem.code === code);
    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartList: this.state.cart.cartList.map((currItem) => 
            currItem.code === code ? { ...currItem, count: currItem.count + 1 } : currItem),
          sum: this.state.cart.sum + itemInList.price,
        }
      })
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartList: [...this.state.cart.cartList, { ...itemInList, count: 1 }],
          sum: this.state.cart.sum + itemInList.price,
          count: this.state.cart.count + 1,
        }
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const itemInCart = this.state.cart.cartList.find(currItem => currItem.code === code);
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartList: this.state.cart.cartList.filter(item => item.code !== code),
        count: this.state.cart.count - 1,
        sum: this.state.cart.sum - itemInCart.count * itemInCart.price,
      }
      // Новый список, в котором не будет удаляемой записи
    });
  }
}

export default Store;
