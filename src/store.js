import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = { ...initState, selected: {} };
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
    return {
      ...this.state,
      total: this.total,
      cart: this.cart,
    };
  }

  get cart() {
    return this.state.list
      .filter((item) => {
        return item.code.toString() in this.state.selected;
      })
      .map((item) => ({
        ...item,
        count: this.state.selected[item.code],
      }));
  }

  get total() {
    return this.cart.reduce((result, item) => ({
      count: result.count += item.count,
      price: result.price += item.price * item.count,
    }), {
      price: 0,
      count: 0,
    });
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
      selected: Object.fromEntries(
        Object
          .entries(this.state.selected)
          .filter(([key]) => key !== code.toString()),
      ),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      selected: {
        ...this.state.selected,
        [code]: this.state.selected[code] + 1 || 1,
      },
    });
  }
}

export default Store;
