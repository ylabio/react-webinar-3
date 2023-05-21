import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: [],
      cartSum: 0,
      totalProduct: 0,
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
  countTotalPrice(items) {
    return items.reduce((sum, item) => {
      return item.price * item.count + sum;
    }, 0);
  }
  /**
   * Добавление в корзину
   */
  addItemToCart(item) {
    const itemAdded = this.state.cart.find((elem) => item.code === elem.code);
    if (itemAdded) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((elem) => {
          if (elem.code === item.code) {
            return {
              ...elem,
              count: elem.count + 1,
            };
          }
          return elem;
        }),
      });
    } else {
      const newItem = {
        ...item,
        count: 1,
      };
      this.setState({
        ...this.state,
        cart: [...this.state.cart, newItem],
      });
    }
    this.setState({
      ...this.state,
      totalProduct: this.state.cart.length,
      cartSum: this.countTotalPrice(this.state.cart),
    });
  }

  /**
   * Удаление товара
   *
   */
  deleteItemFromCart(item) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((elem) => item.code !== elem.code),
    });
    this.setState({
      ...this.state,
      totalProduct: this.state.cart.length,
      cartSum: this.countTotalPrice(this.state.cart),
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
}

export default Store;
