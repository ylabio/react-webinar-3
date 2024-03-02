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
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const cartItems = this.getState().cartItems.filter(item => item.code !== code);
    const totalPrice = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.counter)
    }, 0);
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartItems,
      totalPrice
    })
  };

  addItemToCart(code) {

    let repeatProduct = false;

    let data = this.getState().cartItems.map(item => {
      if (item.code === code) {
        repeatProduct = true;
        return { ...item, counter: ++item.counter }
      } else {
        return item
      }
    });

    if (!repeatProduct) {
      const item = this.getState().list.find(item => item.code === code);
      data.push({ ...item, counter: 1 })
    }

    const count = data.length;

    const totalPrice = data.reduce((sum, item) => {
      return sum + (item.price * item.counter)
    }, 0);

    this.setState({
      ...this.state,
      cartItems: data,
      count,
      totalPrice,
    })

  }

  openModal() {
    const modal = true;
    this.setState({
      ...this.state,
      modal
    })
  }

  closeModal() {
    const modal = false;
    this.setState({
      ...this.state,
      modal
    })
  }

}

export default Store;
