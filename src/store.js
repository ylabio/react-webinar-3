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
  addIntoBasket(code) {
    const itemInBasket = this.state.basket.find(item => item.code === code);
    const listItem = this.state.list.findIndex(item => item.code === code);
    itemInBasket ? this.setState({
                      ...this.state,
                      basket: this.state.basket.map((item) => {
                        if (item.code === code) {
                          return {
                            code: code,
                            quantity: item.quantity + 1,
                            title: this.state.list[listItem].title,
                            totalPrice: this.state.list[listItem].price * (item.quantity + 1),
                          }
                        } else return {...item}
                      })
                    })
                  : this.setState({
                    ...this.state,
                    basket: this.state.basket.concat({
                      code: code,
                      quantity: 1,
                      title: this.state.list[listItem].title,
                      totalPrice: this.state.list[listItem].price
                    }),
                  })
  };

  /**
   * Удаление товара из корзины по коду
   * @param product
   */
  deleteFromBasket(code) {
    const listItem = this.state.list.findIndex(item => item.code === code);
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => {
        if (item.code !== code) {
          return {...item}
        } 
      })
    })
  };

   /**
   * Подсчет корзины
   */
  countBasket() {
    const basket = {
      productsQuantity: this.state.basket.reduce((sum, item) => item.quantity > 0 ? sum += 1 : sum, 0),
      productsCost: this.state.basket.reduce((sum, item) => item.quantity > 0 ? sum += item.totalPrice : sum, 0)
    }
    return basket ;
  }
}

export default Store;
