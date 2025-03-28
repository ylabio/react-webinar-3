import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  order = {
    items: [],
    total: 0,
  };

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

  getOrder() {
    return this.order;
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
  addItem(item) {
    if (this.order.items.some(i => i.code === item.code)) {
      item.count++;
    } else {
      item.count = 1;
      this.order.items.push(item);
    }
    this.setState({ ...this.state });
  }

  getTotal(data) {
    return (this.order.total = data.reduce((acc, item) => acc + item.price * item.count, 0));
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.order.items = this.order.items.filter(item => item.code !== code);
    this.getTotal(this.order.items);
    this.setState({ ...this.state });
  }

}

export default Store;
