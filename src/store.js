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
   * Добавление нового товара
   */
  addCart(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code === code) {
          item.amount++;
        }
        return item;
      })
    })
  };

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteCart(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code === code) {
          item.amount = 0;
        }
        return item;
      })
    })
  };

  /**
   * Общая цена
   * @param code
   */
  cartPrice(cartList){
    return cartList.reduce((acc, item) => acc + item.price * item.amount, 0);
  }
}

export default Store;