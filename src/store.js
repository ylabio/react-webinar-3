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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Добавление товара в корзину
   */
  addToCart(code){
    const cart = this.state.cart;
    // проверяем есть ли в корзине товар с таким же кодом
    // присваиваем переменной i индекс товара в корзине, если товара нет то i = -1
    const i = cart.findIndex((item) => item.code === code);

    if (i > -1) {
      // // если товар в корзине есть увеличиваем у него count
      this.state.cart[i].count++;
      // обновляем стейт
      this.setState({
        ...this.state,
        cart: [ ...this.state.cart]
      })
      

    } else if (i === -1) {
      // если товара в корзине нет, добавляем его в корзину
      this.setState({
        ...this.state,
        cart: [ ...this.state.cart, ...this.state.list.filter((item) => item.code === code)]
      });
    } 
    // console.log(cart)
  }  

  removeFromCart(code){
    this.setState({
      ...this.state,
      // Новая корзина, в которой не будет удаляемого товара
      cart: this.state.cart.filter((item) => item.code !== code)
    })
  }

  getCartPrice(){
    let totalPrice = 0;
    for (let item of this.state.cart) {
      totalPrice += item.price * item.count;
    }
    return totalPrice;
  }
}

export default Store;
