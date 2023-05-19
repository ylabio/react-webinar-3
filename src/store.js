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
   * Добавление новой записи
   */

  addItemToCart(code) {
    const cart = this.state.cartItems;
    const foundIndex = cart.findIndex((item) => item.code === code); // ищем товар с указанным кодом в корзине

    if (foundIndex !== -1) {
      // если товар найден в корзине
      const updatedItem = {
        ...cart[foundIndex],
        quantity: cart[foundIndex].quantity + 1,
      };
      const newCart = [
        ...cart.slice(0, foundIndex), // копируем все элементы до найденного товара
        updatedItem,
        ...cart.slice(foundIndex + 1), // копируем все элементы после найденного товара
      ];
      this.setState({ ...this.state, cartItems: newCart });
    } else { // если товара еще не было в корзине
      const item = this.state.list.find((item) => item.code === code);
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, { ...item, quantity: 1 }],
      });
    }
  }

  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter((el) => el.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          return item.selected ? { ...item, selected: false } : item;
        }
      }),
    });
  }
}

export default Store;
