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

  // получить конечную сумму корзины
  getCalculatePrice(){
    if(this.state.basket === undefined) {
      return 0 ;
    }else if (this.state.basket === 0) {
      return 0;
    }else {
      return this.state.basket.reduce((acc, curr) => {return acc + (curr.price * curr.quantity)}, 0);
    }
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
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  // добавление товара
  addItemToBasket(code, title, price ) {
    console.log(code, title, price)
    this.setState({
      ...this.state,
      basket: this.state.basket.map(item => {
      if (item.code === code){
        return {
          ...item,
          quantity: item.quantity + 1
        }
        } else {
        return {
          basket: [...this.state.basket, {code, title, price, quantity: 1}]
        }
      }
    })
    })
  };
}

export default Store;
