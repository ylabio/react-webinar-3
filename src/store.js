/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.calculatePrice = 0;
    this.state.totalGoods = 0;
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
    const foundItem = this.state.basket.find(e => e.code === code)
    this.setState({
      ...this.state,
      calculatePrice: this.state.calculatePrice - (foundItem.price * foundItem.quantity),
      totalGoods: (this.state.totalGoods - 1),
      basket: this.state.basket.filter(item => item.code !== code)
      })
  };

  // добавление товара
  addItemToBasket(code, title, price ) {
    const foundItem = this.state.basket.find(e => e.code === code)
    foundItem ?
    this.setState({...this.state,
      calculatePrice: (this.state.calculatePrice + price),
      basket: this.state.basket.map(item => {
      if (item.code === code){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }else return {...item}
    })
    })
    : this.setState({...this.state,
      calculatePrice:(this.state.calculatePrice + price),
      totalGoods: (this.state.totalGoods + 1),
      basket: [...this.state.basket, {code, title, price, quantity: 1}]
    })
  };
}


export default Store;
