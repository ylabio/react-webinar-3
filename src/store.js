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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
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


  //Добавление товара в корзину
  addToCart(item) {
    if (this.state.cartList.find(cartItem => cartItem.code === item.code)) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map(cartItem => {
          if (item.code === cartItem.code) {
            return {
              ...cartItem,
              count: cartItem.count + 1
            }
          }
          return cartItem
        })
      })
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, {
          code: item.code,
          title: item.title,
          price: item.price,
          count: 1,
        }]
      })
    }
  };

  //Удаление товара из корзины
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code)
    })
  };

  //Подсчёт суммы товаров
  setTotalSum() {
    this.setState({
      ...this.state,
      totalSum: this.state.cartList.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0),
    });
  }
}

export default Store;
