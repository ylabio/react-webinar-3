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
   * Добавление в корзину
   */

  addItemCart(item) {
    const reviseItem = this.state.cartList.find((el) => el.code === item.code);

    if (!reviseItem) {
      this.setState({
        ...this.state,
        cartList: [
          ...this.state.cartList,
          { code: item.code, title: item.title, price: item.price, count: 1 },
        ],
      });
    } else {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map((item) => {
          if (item.code === reviseItem.code) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        }),
      });
    }

    const cartSum = this.state.cartList.reduce(
      (accumulator, current) => accumulator + current.price * current.count,
      0
    );

    this.setState({
      ...this.state,
      totalPrice: cartSum,
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
      cartList: this.state.cartList.filter((item) => item.code !== code.code),
    });

    const cartSum = this.state.cartList.reduce(
      (accumulator, current) => accumulator + current.price * current.count,
      0
    );

    this.setState({
      ...this.state,
      totalPrice: cartSum,
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
