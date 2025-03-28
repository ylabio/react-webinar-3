import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {
    list: [],
    cart: []
  }) {
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
   * Добавление новой записи
   */

  addToCart(itemCode) {
    if (!Array.isArray(this.state.list) || !Array.isArray(this.state.cart)) {
      console.error("list или cart не является массивом.");
      return;
    }

    const item = this.state.list.find(i => i.code === itemCode);
    if (item) {
      const existingItem = this.state.cart.find(i => i.code === itemCode);
      if (existingItem) {
        this.setState({
          ...this.state,
          cart: this.state.cart.map(i =>
            i.code === itemCode ? { ...i, count: (i.count || 0) + 1 } : i
          ),
        });
      } else {
        this.setState({
          ...this.state,
          cart: [...this.state.cart, { ...item, count: 1 }],
        });
      }
    } else {
      console.error(`Товар с кодом ${itemCode} не найден:`);
    }
  }

  onRemoveCart(code) {
    this.state.cart = this.state.cart.filter(item => item.code !== code); // Удаляем товар по коду
  }


  getTotalCount() {
    return this.state.cart ? this.state.cart.reduce((total, item) => total + (item.count || 0), 0) : 0;
  }


  getTotalPrice() {
    return this.state.cart ? this.state.cart.reduce((total, item) => total + (item.price * (item.count || 0)), 0) : 0;
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
}

export default Store;
