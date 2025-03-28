import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.lastCode = initState.list[initState.list.length - 1].code;
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

  getStateCart() {
    return this.cart;
  }

  setStateCart(newState) {
    this.cart = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItemCart(newItem) {
    this.setState({
      ...this.state,
      cart: this.state.cart.some(item => item.code === newItem.code)
        ? this.state.cart.map(item =>
            item.code === newItem.code
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          )
        : [...this.state.cart, { ...newItem, quantity: 1 }],
    });
  }

  removeItemCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  openModal() {
    this.setState({ ...this.state, isCartOpen: true });
  }

  closeModal() {
    this.setState({ ...this.state, isCartOpen: false });
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись', price: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, e) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
