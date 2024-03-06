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
   * Добавление новой записи
   */
  addToCart(code) {
    const addedItem = this.state.list.find(item => item.code === code)
    const cartItem = this.state.cart.items.find(item => item.code === code)
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: cartItem ? this.state.cart.items.map(item => ({
          ...item,
          count: item.code === code ? item.count + 1 : item.count
        })) :
          [...this.state.cart.items, { ...addedItem, count: 1 }],
        sum: this.state.cart.sum + addedItem.price
      }
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteFromCart(code) {
    const cartItem = this.state.cart.items.find(item => item.code === code)
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: {
        items: this.state.cart.items.filter(item => item.code !== code),
        sum: this.state.cart.sum - (cartItem.price * cartItem.count)
      }
    })
  };

}

export default Store;
