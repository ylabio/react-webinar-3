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
      this.listeners = this.listeners.filter((item) => item !== listener);
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

  addBasket(item) {
    if (this.state.basket.filter((el) => el.code === item.code)[0]) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map((el) => {
          if (el.code === item.code) {
            el.count = el.count + 1;
          }
          return el;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...item, count: 1 }],
      });
    }
  }

  deleteBasket(item) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((el) => el.code !== item.code),
    });
  }
}

export default Store;
