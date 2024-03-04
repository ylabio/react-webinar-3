import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.basket = [];
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
   * Добавление новой записи
   */
  goToBasketItem() {
    this.setState({
      ...this.state,
      basket: [...this.basket]
    });
  };

  /**
   * Удаление записи по коду
   * @param {Object} item
   */
  addToBasketItem(item) {
    this.basket.push(item);
    for (const listener of this.listeners) listener();
  }

  getBasketItemCount() {
    if (this.state && this.state.basket && Array.isArray(this.state.basket)) {
      return this.state.basket.length;
    } else {
      return 0;
    }
  }
}

export default Store;
