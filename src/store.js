import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.orders = []
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
    // Находим только уникальные товары, добавленные в корзину
    const cartItems = this.orders.reduce((acc, item) => {
      const uniqueItem = acc.find(el => el.code === item.code);
      if (uniqueItem) {
        uniqueItem.count += 1;
      } else {
        acc.push({...item, count: 1})
      }
      return acc;
    }, []);

    const totalCount = cartItems.length;

    const totalPrice = this.orders.reduce((acc, item) => acc + item.sum, 0);

    return {
      ...this.state,
      totalCount,
      totalPrice
    };
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
   * @param item
   */

  addItemToCart(item) {
    const currentItem = this.orders.find(order => order.code === item.code);

    if (currentItem) {
      currentItem.count += 1;
      currentItem.sum = currentItem.count * item.price;
    } else {
      this.orders.push({...item, count: 1, sum: item.price});
    }

    this.setState({
      ...this.state,
      orders: this.orders
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.orders = this.state.orders.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      orders: this.orders
    })
  };
}

export default Store;
