// import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      totalCost: 0,
    };
    this.listeners = []; // Слушатели изменений состояния
    this.cartOpen = false;
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

  setState(newState) {
    this.state = newState;
    this.notifyListeners();
  }

  // Уведомление слушателей об изменении
  notifyListeners() {
    for (const listener of this.listeners) listener(this.state);
  }

  /**
   * Добавление новой записи
   */
  addItem(code) {
    const cart = this.state.cart ? [...this.state.cart] : [];
    const list = this.state.list;
    const itemIndex = cart.findIndex((item) => item.code === code);
    const itemInList = list.find((item) => item.code === code);

    if (itemIndex > -1) {
      const findItem = cart[itemIndex];
      cart[itemIndex] = {
        ...findItem,
        quantity: findItem.quantity + 1,
      };
    } else {
      cart.push({
        ...itemInList,
        quantity: 1,
      });
    }

    const totalCost = cart.reduce((total, item) => {
      const itemDetails = list.find((listItem) => listItem.code === item.code);
      return total + itemDetails.price * item.quantity;
    }, 0);

    this.setState({
      ...this.state,
      cart: cart,
      totalCost: totalCost,
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
      cart: this.state.cart.filter((item) => item.code !== code),
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

  // Добавление методов для управления состоянием корзины
  openCart() {
    this.cartOpen = true;
    this.notifyListeners(); // Уведомляем слушателей об изменении
  }

  closeCart() {
    this.cartOpen = false;
    this.notifyListeners(); // Уведомляем слушателей об изменении
  }
}

export default Store;
