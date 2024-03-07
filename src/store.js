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
   * Добавление товара в корзину.
   * @param code
   */
  addToBasket(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code && item.count) {
          return {
            ...item,
            count: item.count + 1
          } 
        } else if (item.code === code && !item.count) {
          return {
            ...item,
            count: 1
          }
        }
        return item;
      })
    })
  }

  /**
   * Удаление товара из корзины.
   * @param code
   */
  deleteFromBasket(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code === code) {
          return {
            ...item,
            count: 0
          }
        }
        return item;
      })
    })
  }

  /**
   * Подсчет стоимости товара и его количества в корзине
   * @param code
   */
  calculateSummary() {
    this.setState({
      ...this.state,
      summaryPrice: this.state.list.reduce((totalPrice, item) => item.count > 0 ? totalPrice += item.price * item.count : totalPrice, 0),
      quantityProducts: this.state.list.reduce((totalCount, item) => item.count > 0 ? totalCount + 1 : totalCount, 0)
    })
  }
}

export default Store;
