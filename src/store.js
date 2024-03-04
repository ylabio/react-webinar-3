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
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
      basket: [...this.basket]
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  addToBasketItem(item) {
    this.basket.push(item);
    // Notify listeners about the change in the basket
    for (const listener of this.listeners) listener();
  }

  getBasketItemCount() {
    return this.basket.length;
  }
}

export default Store;
