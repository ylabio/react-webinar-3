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
  addToBasket(product) {
    this.setState({
      ...this.state,
      listInBasket: this.state.listInBasket.filter(item => item.code === product.code).length > 0 ? this.state.listInBasket.map(item => {
        if (item.code === product.code) {
          return {
            ...item,
            count: item.count + 1,
          };
        } 
        return item }) : [...this.state.listInBasket, {...product, count: 1}]
    })
  }

  /**
   * Удаление товара из корзины.
   * @param code
   */
  deleteFromBasket(product) {
    this.setState({
      ...this.state,
      listInBasket: this.state.listInBasket.filter(item => item !== product)
    })
  }

  /**
   * Подсчет стоимости товара и его количества в корзине
   * @param code
   */
  calculateSummary() {
    this.setState({
      ...this.state,
      summaryPrice: this.state.listInBasket.length > 0 ? this.state.listInBasket.reduce((totalPrice, item) => totalPrice += item.price * item.count, 0) : 0,
      quantityProducts: this.state.listInBasket.length > 0 ?  this.state.listInBasket.reduce((totalCount , item) => totalCount += item.count, 0) : 0,
    })
  }
}

export default Store;
