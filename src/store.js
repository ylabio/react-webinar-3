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

  addItemToBasket(item) {
    if(this.state.basketList.length !== 0) {
      const existingItem = this.state.basketList.find((i) => i.code === item.code)
      if(existingItem) {
        existingItem.count +=1;
        this.setState({
          ...this.state,
          basketList: this.state.basketList
        })
      } else {
        this.setState({
          ...this.state,
          basketList: [...this.state.basketList, {...item, count: 1}]
        })
      }
    } else {
      this.setState({
        ...this.state,
        basketList: [...this.state.basketList, {...item, count: 1}]
      })
    }
  }

  removeItemFromBasket(item) {
    this.setState({
      ...this.state,
      basketList: this.state.basketList.filter((i) => i.code !== item.code)
    })
  }
}

export default Store;
