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
   * Добавление товара  в корзину по коду
   * @param product
   */
  addIntoBasket(product) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === product.code) {
          return {
            ...item,
            quantity: item.quantity ? item.quantity + 1 : 1,
          } 
        } else return {...item};
      })
    })
    console.log(this.state)
  };

  /**
   * Удаление товара из корзины по коду
   * @param product
   */
  deleteFromBasket(product) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === product.code) {
          return {
            ...item,
            quantity: 0,
          }
        } else return {...item};
      })
    })
  };

   /**
   * Подсчет корзины
   */
  countBasket() {
    const basket = {
      productsQuantity: this.state.list.reduce((sum, item) => item.quantity > 0 ? sum += item.quantity : sum, 0),
      productsCost: this.state.list.reduce((sum, item) => item.quantity > 0 ? sum += item.price * item.quantity : sum, 0)
    }
    return basket ;
  }
}

export default Store;
