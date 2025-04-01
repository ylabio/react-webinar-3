import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cart: {
        items: [],
        totalPrice: 0,
        count: 0
      },
      ...initState
    };
    this.listeners = [];
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
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }

  addToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const cartItems = [...this.state.cart.items];
    const existingItem = cartItems.find(item => item.code === code);

    const updatedItems = existingItem
      ? cartItems.map(item =>
          item.code === code
            ? { ...item, count: item.count + 1 }
            : item
        )
      : [...cartItems, { ...item, count: 1 }];

    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.count), 0);
    const count = updatedItems.reduce((sum, item) => sum + item.count, 0);

    this.setState({
      ...this.state,
      cart: {
        items: updatedItems,
        totalPrice,
        count
      }
    });
  }

  removeFromCart(code) {
    const updatedItems = this.state.cart.items.filter(item => item.code !== code);
    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.count), 0);
    const count = updatedItems.reduce((sum, item) => sum + item.count, 0);

    this.setState({
      ...this.state,
      cart: {
        items: updatedItems,
        totalPrice,
        count
      }
    });
  }

}

export default Store;
