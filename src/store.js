import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: new Map(),
      modal: false,
      totalCount: 0,
      totalPrice: 0,
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

  /**
   * Открытие модального окна
   */
  modalOpen() {
    this.setState({
      ...this.state,
      modal: true,
    });
  }

  /**
   * Закрытие модального окна
   */
  modalClose() {
    this.setState({
      ...this.state,
      modal: false,
    });
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: 'Новая запись' },
      ],
    });
  }

  /**
   * Добавление  товара в корзину
   * @param code
   */
  addToCart({ code, title, price }) {
    const item = this.state.cart.get(code);
    const count = item ? item.count + 1 : 1;

    const sum = price * count;
    const newItem = { code, title, price, count, sum };
    this.setState({
      ...this.state,
      cart: this.state.cart.set(code, newItem),
      totalCount: this.state.cart.size,
      totalPrice: this.state.totalPrice + price,
    });
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  dropFromCart({ code, sum }) {
    const newCart = new Map(this.state.cart);
    newCart.delete(code);
    this.setState({
      ...this.state,
      cart: newCart,
      totalCount: newCart.size,
      totalPrice: this.state.totalPrice - sum,
    });
  }
}

export default Store;
