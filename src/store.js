import { generateCode } from "./utils";

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
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись" },
      ],
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
      list: this.state.list.filter((item) => item.code !== code),
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

  isItemInCart(cart, code) {
    return cart.some((item) => item.code === code);
  }

  updateCart(cart, item) {
    if (!this.isItemInCart(cart, item.code)) {
      return [...cart, { ...item, count: 1 }];
    }

    return [
      ...cart.map((cartItem) => {
        if (cartItem.code === item.code) {
          return { ...cartItem, count: cartItem.count + 1 };
        }
        return cartItem;
      }),
    ];
  }

  addItemToCart(item) {
    this.setState({
      ...this.state,
      cart: this.updateCart(this.state.cart, item),
      totalPrice: this.state.totalPrice + item.price,
    });
  }

  deleteItemFromCart(item) {
    console.log(item);
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((cartItem) => item.code !== cartItem.code),
      totalPrice: this.state.totalPrice - item.price * item.count,
    });
  }
}

export default Store;
