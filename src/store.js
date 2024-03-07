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
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
      sum: this.state.sum -
        (this.state.cart.find(item => item.code === code)?.count ?? 0) *
          this.state.list.find(item => item.code === code).price,
      num: this.state.cart.find(item => item.code === code)?.count ? this.state.num - 1 : this.state.num,
    })
  }
  /*deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.map(item => {
        if (item.code === code) {
          delete item.count;
        }
        return item;
      })
    })
    //console.log(this.state.list)
  };*/

  /**
   * Добавление 1 штуки товара по коду
   * @param code
   */
  addItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.find(item => item.code === code)?.count ?
        this.state.cart.map(item => item.code === code ? { code, count: item.count + 1 } : item) :
        [...this.state.cart, { code, count: 1 }],
      sum: this.state.sum + this.state.list.find(item => item.code === code).price,
      num: this.state.cart.find(item => item.code === code)?.count ? this.state.num : this.state.num + 1,
    })
  }
  /*addItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            count: item.count + 1 || 1,
          };
        }
        return item
      })
    })
    //console.log(this.state.list)
  }*/
}

export default Store;
