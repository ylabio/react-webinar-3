import { generateCode } from './utils';

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

  /**
   * Добавление товара в корзину
   * @param item {Object} - товар
   */
  addToBasket(item) {
    if(!item.count) {
      item.count = 1;
    } else {
      item.count +=1;
    }

    this.setState({
      ...this.state,
      basket: new Map( [...this.state.basket,  [item.code, item]]),
    });
  }

  removeFromBasket(code) {
    this.state.basket.get(code).count = 0;
    this.state.basket.delete(code);

    if ( this.state.basket.size === 0 ) {
      this.hideModal();
    }

    this.setState({
      ...this.state,
      basket: new Map( [...this.state.basket]),
      modal: this.state.modal,
    });
  }

  showModal() {
    this.setState({
      ...this.state,
      modal: { isActiv: true },
    });
  }

  hideModal() {
    this.setState({
      ...this.state,
      modal: { isActiv: false },
    });
  }
}

export default Store;
