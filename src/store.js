import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    /**
     * @type {{ list: Array, cart: Object }}
     */
    this.state = {
      ...initState,
      cart: {},
    };
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
   * Возвращает содержимое корзины
   * @returns {Object} Объект корзины
   */
  getCart() {
    return this.state.cart;
  }

  /**
   * Добавляет товар в корзину
   * @param item {Object}
   */
  addToCart(item) {
    const cart = { ...this.state.cart };
    const existing = cart[item.code] || { ...item, count: 0 };
    cart[item.code] = { ...existing, count: existing.count + 1 };

    this.setState({
      ...this.state,
      cart,
    });
  }

  /**
   * Удаляет товар из корзины по коду
   * @param code {number}
   */
  removeFromCart(code) {
    const cart = { ...this.state.cart };
    delete cart[code];

    this.setState({
      ...this.state,
      cart,
    });
  }
  //
  // /**
  //  * Добавление новой записи
  //  */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
  //   });
  // }
  //
  // /**
  //  * Удаление записи по коду
  //  * @param code
  //  */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code),
  //   });
  // }
  //
  // /**
  //  * Выделение записи по коду
  //  * @param code
  //  */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? { ...item, selected: false } : item;
  //     }),
  //   });
  // }
}

export default Store;
