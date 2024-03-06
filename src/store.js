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
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter(item => item.code !== code)
    })
    this.__calculateTotalSum()
    this.__calculateAmountOfUniqueItems()
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const item = this.state.list.find(item => {
      if (item.code === code) return true
    })

    const index = this.state.basket.findIndex(product => product.code === code)


    if (index === -1) {
      item.count = 1
      this.setState({
        ...this.state,
        basket: [...this.state.basket, item]
      })
    } else {
      const newState = this.state.basket.map(item => {
        if (item.code === code) {
          item.count += 1
        }
        return item
      })

      this.setState({
        ...this.state,
        basket: [...newState]
      })
    }
    this.__calculateTotalSum()
    this.__calculateAmountOfUniqueItems()
  }


  
  __calculateTotalSum() {
    const total = this.state.basket.reduce((acc, item) => {
      return acc + item.price * item.count
    }, 0)
    this.setState({
      ...this.state,
      total: total
    })
  }

  __calculateAmountOfUniqueItems(){
    this.setState({
      ...this.state,
      amount: this.state.basket.length
    })
  }
}

export default Store;
