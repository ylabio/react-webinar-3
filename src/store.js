import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cartList = initState.cartList || [];
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
  addItemInCart(item) {
    const itemInCart = this.state.cartList.find(currItem => currItem.code === item.code);
    if (itemInCart) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map((currItem) => 
          currItem.code === item.code ? { ...currItem, count: currItem.count + 1 } : currItem)
      })
    } else {
      this.setState({
        ...this.state,
        cartList: [...this.state.cartList, { ...item, count: 1 }]
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cartList: this.state.cartList.filter(item => item.code !== code),
    });
  }
}

export default Store;
